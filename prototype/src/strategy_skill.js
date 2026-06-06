"use strict";

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value, digits = 4) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function classifyMarketRegime(snapshot) {
  const symbols = snapshot.symbols || [];
  const avgTrend = average(symbols.map((asset) => asset.trendScore));
  const avgVolumeChange = average(symbols.map((asset) => asset.volumeChange24hPct));
  const avgFunding = average(symbols.map((asset) => asset.derivativesFundingPct));
  const avgRsi = average(symbols.map((asset) => asset.rsi14));
  const context = snapshot.marketContext || {};

  if (avgTrend >= 0.66 && avgVolumeChange >= 12 && avgRsi < 72) {
    return {
      label: "momentum_expansion",
      confidence: Math.max(0.56, round((avgTrend + Math.min(avgVolumeChange / 40, 1) + (72 - avgRsi) / 72) / 3)),
      reason: "Trend, volume, and sentiment support risk-on continuation without extreme RSI."
    };
  }

  if (avgFunding > 0.02 || avgRsi >= 72 || context.macroRisk === "high") {
    return {
      label: "overheated_risk",
      confidence: 0.7,
      reason: "Funding, RSI, or macro risk indicates elevated reversal risk."
    };
  }

  return {
    label: "selective_rotation",
    confidence: round(Math.max(0.45, avgTrend)),
    reason: "Market is constructive but uneven; prefer higher-liquidity assets and tighter invalidation."
  };
}

function rankEligibleAssets(snapshot) {
  return [...(snapshot.symbols || [])]
    .map((asset) => {
      const score =
        asset.trendScore * 0.28 +
        asset.liquidityScore * 0.24 +
        Math.min(asset.volumeChange24hPct / 50, 1) * 0.18 +
        asset.socialMomentumScore * 0.14 +
        asset.newsMomentumScore * 0.08 +
        (asset.rsi14 <= 70 ? 0.08 : -0.08);
      return { ...asset, strategyScore: round(score) };
    })
    .filter((asset) => asset.liquidityScore >= 0.55 && asset.rsi14 <= 72)
    .sort((a, b) => b.strategyScore - a.strategyScore);
}

function riskProfileForRegime(regime) {
  if (regime.label === "momentum_expansion") {
    return {
      maxPortfolioRiskPct: 1.5,
      maxPositionRiskPct: 0.5,
      maxOpenPositions: 3,
      stopLossRule: "Exit if asset closes below 3-day VWAP or loses 4.5% from entry.",
      takeProfitRule: "Scale out 50% at 1.8R and trail the remainder by 2-day low.",
      invalidationRule: "Invalidate if total market volume falls by more than 20% or BTC dominance spikes above 53%."
    };
  }

  if (regime.label === "overheated_risk") {
    return {
      maxPortfolioRiskPct: 0.6,
      maxPositionRiskPct: 0.25,
      maxOpenPositions: 1,
      stopLossRule: "Use tight invalidation at prior 24h low.",
      takeProfitRule: "Take profit at 1R; no trailing expansion.",
      invalidationRule: "Do not enter if funding or RSI remains elevated for two consecutive checks."
    };
  }

  return {
    maxPortfolioRiskPct: 1.0,
    maxPositionRiskPct: 0.35,
    maxOpenPositions: 2,
    stopLossRule: "Exit if asset breaks regime support or underperforms BNB by 3%.",
    takeProfitRule: "Scale out at 1.4R and close if volume momentum fades.",
    invalidationRule: "Invalidate if liquidity score drops below 0.55 or stablecoin liquidity trend turns falling."
  };
}

function generateStrategySpec(snapshot, options = {}) {
  const regime = classifyMarketRegime(snapshot);
  const rankedAssets = rankEligibleAssets(snapshot);
  const risk = riskProfileForRegime(regime);
  const selectedAssets = rankedAssets.slice(0, risk.maxOpenPositions);
  const horizonDays = options.horizonDays || 7;

  return {
    specVersion: "0.1.0",
    skillName: "CMC Regime Strategy Skill",
    track: "BNB HACK Track 2 - Strategy Skills",
    generatedAt: new Date("2026-06-06T12:00:00Z").toISOString(),
    dataBoundary: {
      source: snapshot.sourceModel,
      noApiKeyUsed: true,
      noLiveTrading: true,
      noWalletConnection: true,
      noTransaction: true
    },
    marketRegime: regime,
    strategy: {
      name: `${regime.label}_bnb_ecosystem_rotation`,
      objective: "Generate a backtestable BNB ecosystem strategy capsule from CMC market signals.",
      universe: selectedAssets.map((asset) => ({
        symbol: asset.symbol,
        name: asset.name,
        strategyScore: asset.strategyScore,
        rationale: [
          `trend=${asset.trendScore}`,
          `liquidity=${asset.liquidityScore}`,
          `volumeChange24h=${asset.volumeChange24hPct}%`,
          `rsi14=${asset.rsi14}`
        ]
      })),
      signals: [
        "CMC quotes/latest style price and volume momentum",
        "CMC technical indicator style RSI and trend score",
        "CMC derivatives style funding and open-interest change",
        "CMC social/news momentum style inputs"
      ],
      entryRules: [
        "Enter only assets in the selected universe.",
        "Require positive 24h and 7d price momentum.",
        "Require volume expansion above the market-context baseline.",
        "Reject entries if RSI exceeds 72 or liquidity score falls below 0.55."
      ],
      exitRules: [risk.stopLossRule, risk.takeProfitRule],
      invalidationRules: [risk.invalidationRule],
      risk,
      backtest: {
        windowDays: horizonDays,
        benchmark: "BNB",
        requiredMetrics: ["return", "max_drawdown", "sharpe_like_ratio", "win_rate", "rule_adherence"],
        replayInstruction: "Replay against historical CMC-style snapshots and compare rule adherence, benchmark return, and drawdown."
      }
    },
    sponsorCapabilityMapping: {
      coinMarketCap: ["Agent Hub", "Data API", "Data MCP", "Skills Marketplace"],
      x402: "Optional pay-per-call premium data access design; not used in local fixture.",
      trustWallet: "Future execution consumer only; not used in local fixture.",
      bnbChain: "Future execution venue only; not used in local fixture."
    }
  };
}

module.exports = {
  classifyMarketRegime,
  generateStrategySpec,
  rankEligibleAssets,
  riskProfileForRegime
};
