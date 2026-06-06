"use strict";

const fs = require("node:fs");
const https = require("node:https");
const path = require("node:path");
const { generateStrategySpec } = require("./strategy_skill");
const { replayBacktestStub } = require("./replay_backtest_stub");

const BASE_URL = "https://pro-api.coinmarketcap.com";
const TARGET_IDS = {
  BNB: 1839,
  CAKE: 7186,
  TWT: 5964
};

function round(value, digits = 4) {
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function firstQuote(asset) {
  if (Array.isArray(asset.quote)) {
    return asset.quote.find((quote) => quote.symbol === "USD") || asset.quote[0] || {};
  }
  return asset.quote && asset.quote.USD ? asset.quote.USD : {};
}

function proxyRsi(change24h, change7d) {
  return Math.round(clamp(50 + change24h * 1.4 + change7d * 0.45, 28, 78));
}

function trendScore(change24h, change7d) {
  return round(clamp(0.5 + change24h / 40 + change7d / 70, 0.05, 0.95));
}

function liquidityScore(rank, volume24hUsd, marketCapUsd) {
  const rankComponent = rank ? clamp(1 - rank / 250, 0.15, 1) : 0.2;
  const volumeComponent = clamp(Math.log10(Math.max(volume24hUsd, 1)) / 10, 0, 1);
  const capComponent = clamp(Math.log10(Math.max(marketCapUsd || 1, 1)) / 12, 0, 1);
  return round(rankComponent * 0.45 + volumeComponent * 0.35 + capComponent * 0.2);
}

function normalizeAsset(asset) {
  const quote = firstQuote(asset);
  const change24h = quote.percent_change_24h || 0;
  const change7d = quote.percent_change_7d || 0;
  const volumeChange = quote.volume_change_24h || 0;
  const liquidity = liquidityScore(asset.cmc_rank, quote.volume_24h, quote.market_cap);
  const trend = trendScore(change24h, change7d);

  return {
    symbol: asset.symbol,
    name: asset.name,
    priceUsd: round(quote.price || 0, 8),
    marketCapRank: asset.cmc_rank,
    volume24hUsd: round(quote.volume_24h || 0, 2),
    volumeChange24hPct: round(volumeChange, 4),
    priceChange24hPct: round(change24h, 4),
    priceChange7dPct: round(change7d, 4),
    rsi14: proxyRsi(change24h, change7d),
    trendScore: trend,
    liquidityScore: liquidity,
    derivativesFundingPct: 0,
    openInterestChange24hPct: 0,
    socialMomentumScore: round(clamp(0.35 + Math.max(volumeChange, 0) / 120 + Math.max(change24h, 0) / 80, 0.2, 0.8)),
    newsMomentumScore: round(clamp(0.35 + Math.max(change7d, 0) / 120 + liquidity * 0.2, 0.2, 0.75)),
    cmcBasicSource: {
      id: asset.id,
      slug: asset.slug,
      lastUpdated: asset.last_updated || quote.last_updated
    }
  };
}

function getApiKey() {
  const key = process.env.CMC_API_KEY || process.env.CMC_PRO_API_KEY || process.env.X_CMC_PRO_API_KEY;
  if (!key) {
    throw new Error("Missing CMC API key. Set CMC_API_KEY in the current shell or in an ignored local .env loader.");
  }
  return key;
}

async function fetchJson(url, apiKey) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "user-agent": "cmc-regime-strategy-skill/0.1",
            "X-CMC_PRO_API_KEY": apiKey
          }
        },
        (response) => {
          let body = "";
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            body += chunk;
          });
          response.on("end", () => {
            if (response.statusCode < 200 || response.statusCode >= 300) {
              reject(new Error(`CMC Basic API request failed: ${response.statusCode} ${body.slice(0, 240)}`));
              return;
            }
            try {
              resolve(JSON.parse(body));
            } catch (error) {
              reject(new Error(`CMC Basic API JSON parse failed: ${error.message}`));
            }
          });
        }
      )
      .on("error", reject);
  });
}

async function buildBasicSnapshot() {
  const apiKey = getApiKey();
  const ids = Object.values(TARGET_IDS).join(",");
  const quotesUrl = `${BASE_URL}/v3/cryptocurrency/quotes/latest?id=${ids}&convert=USD`;
  const globalUrl = `${BASE_URL}/v1/global-metrics/quotes/latest?convert=USD`;
  const fearGreedUrl = `${BASE_URL}/v3/fear-and-greed/latest`;

  const [quotesResponse, globalResponse, fearGreedResponse] = await Promise.all([
    fetchJson(quotesUrl, apiKey),
    fetchJson(globalUrl, apiKey),
    fetchJson(fearGreedUrl, apiKey)
  ]);

  const quoteRows = Array.isArray(quotesResponse.data) ? quotesResponse.data : Object.values(quotesResponse.data || {});
  const activeRows = quoteRows.filter((asset) => Object.values(TARGET_IDS).includes(asset.id) && asset.is_active === 1);
  const byId = new Map(activeRows.map((asset) => [asset.id, asset]));
  const symbols = Object.values(TARGET_IDS)
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map(normalizeAsset);

  const globalQuote = firstQuote(globalResponse.data || {});
  const fearGreed = fearGreedResponse.data || {};
  const avgVolumeChange = symbols.reduce((sum, asset) => sum + asset.volumeChange24hPct, 0) / Math.max(symbols.length, 1);

  return {
    asOf: new Date().toISOString(),
    sourceModel: "CMC Basic API; free key, read-only market data.",
    sourceUrls: {
      quotes: quotesUrl,
      globalMetrics: globalUrl,
      fearGreed: fearGreedUrl
    },
    symbols,
    marketContext: {
      btcDominancePct: round(globalResponse.data && globalResponse.data.btc_dominance ? globalResponse.data.btc_dominance : 0),
      totalMarketCapChange24hPct: round(globalQuote.total_market_cap_yesterday_percentage_change || 0),
      totalVolumeChange24hPct: round(avgVolumeChange),
      fearGreed: Number(fearGreed.value || 50),
      stablecoinLiquidityTrend: avgVolumeChange >= 0 ? "rising" : "falling",
      macroRisk: Number(fearGreed.value || 50) >= 75 ? "high" : "moderate"
    }
  };
}

async function main() {
  const snapshot = await buildBasicSnapshot();
  const spec = generateStrategySpec(snapshot, { horizonDays: 7 });
  const replay = replayBacktestStub(spec);

  const prototypeRoot = path.resolve(__dirname, "..");
  fs.writeFileSync(path.join(prototypeRoot, "cmc_basic_snapshot.json"), `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(prototypeRoot, "cmc_basic_strategy_fixture.json"), `${JSON.stringify(spec, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(prototypeRoot, "cmc_basic_replay_result.json"), `${JSON.stringify(replay, null, 2)}\n`, "utf8");

  console.log("fetch_cmc_basic_snapshot.js: wrote Basic API snapshot, strategy fixture, and replay result.");
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = { buildBasicSnapshot };
