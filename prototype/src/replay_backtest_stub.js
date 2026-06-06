"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { validateStrategySpec } = require("./validate_strategy_spec");

function replayBacktestStub(spec) {
  validateStrategySpec(spec);

  const universe = spec.strategy.universe;
  const scoreSum = universe.reduce((sum, asset) => sum + asset.strategyScore, 0);
  const avgScore = scoreSum / universe.length;
  const riskPenalty = spec.strategy.risk.maxPortfolioRiskPct / 10;
  const projectedReturnPct = Number(((avgScore * 8) - riskPenalty).toFixed(2));
  const maxDrawdownPct = Number((spec.strategy.risk.maxPortfolioRiskPct * 1.8).toFixed(2));
  const ruleAdherence = spec.dataBoundary.noLiveTrading && spec.dataBoundary.noTransaction ? 1 : 0;

  return {
    replayType: "fixture_backtest_stub",
    benchmark: spec.strategy.backtest.benchmark,
    windowDays: spec.strategy.backtest.windowDays,
    projectedReturnPct,
    maxDrawdownPct,
    sharpeLikeRatio: Number((projectedReturnPct / Math.max(maxDrawdownPct, 0.1)).toFixed(2)),
    winRateEstimatePct: Number(Math.min(72, 45 + avgScore * 30).toFixed(2)),
    ruleAdherence,
    caveat: "Fixture replay is a local proof of spec shape only; real historical CMC data requires approval-gated API/MCP access."
  };
}

if (require.main === module) {
  const fixturePath = path.resolve(__dirname, "..", "demo_strategy_fixture.json");
  const outPath = path.resolve(__dirname, "..", "demo_replay_result.json");
  const spec = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  const replay = replayBacktestStub(spec);
  fs.writeFileSync(outPath, `${JSON.stringify(replay, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outPath}`);
}

module.exports = { replayBacktestStub };
