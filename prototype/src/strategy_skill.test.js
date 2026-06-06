"use strict";

const assert = require("node:assert/strict");
const snapshot = require("./cmc_market_snapshot.json");
const { classifyMarketRegime, generateStrategySpec, rankEligibleAssets } = require("./strategy_skill");
const { validateStrategySpec } = require("./validate_strategy_spec");
const { replayBacktestStub } = require("./replay_backtest_stub");

const regime = classifyMarketRegime(snapshot);
assert.equal(regime.label, "momentum_expansion");
assert.ok(regime.confidence >= 0.5);

const ranked = rankEligibleAssets(snapshot);
assert.equal(ranked[0].symbol, "CAKE");
assert.ok(ranked.every((asset) => asset.liquidityScore >= 0.55));
assert.ok(ranked.every((asset) => asset.rsi14 <= 72));

const spec = generateStrategySpec(snapshot);
assert.equal(spec.skillName, "CMC Regime Strategy Skill");
assert.equal(spec.track, "BNB HACK Track 2 - Strategy Skills");
assert.equal(spec.dataBoundary.noLiveTrading, true);
assert.equal(spec.dataBoundary.noWalletConnection, true);
assert.equal(spec.dataBoundary.noTransaction, true);
assert.ok(spec.strategy.universe.length >= 2);
assert.ok(spec.strategy.risk.maxPortfolioRiskPct <= 1.5);
assert.ok(spec.strategy.backtest.requiredMetrics.includes("max_drawdown"));
assert.ok(spec.sponsorCapabilityMapping.coinMarketCap.includes("Skills Marketplace"));
assert.equal(validateStrategySpec(spec), true);

const replay = replayBacktestStub(spec);
assert.equal(replay.replayType, "fixture_backtest_stub");
assert.equal(replay.ruleAdherence, 1);
assert.ok(replay.maxDrawdownPct <= 3);

console.log("strategy_skill.test.js: all local tests passed");
