"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

function validateStrategySpec(spec) {
  assert.equal(spec.specVersion, "0.1.0");
  assert.equal(spec.skillName, "CMC Regime Strategy Skill");
  assert.equal(spec.track, "BNB HACK Track 2 - Strategy Skills");
  assert.equal(spec.dataBoundary.noLiveTrading, true);
  assert.equal(spec.dataBoundary.noWalletConnection, true);
  assert.equal(spec.dataBoundary.noTransaction, true);
  assert.ok(spec.marketRegime.label);
  assert.ok(spec.marketRegime.confidence >= 0 && spec.marketRegime.confidence <= 1);
  assert.ok(Array.isArray(spec.strategy.universe));
  assert.ok(spec.strategy.universe.length > 0);
  assert.ok(Array.isArray(spec.strategy.entryRules));
  assert.ok(Array.isArray(spec.strategy.exitRules));
  assert.ok(Array.isArray(spec.strategy.invalidationRules));
  assert.ok(spec.strategy.risk.maxPortfolioRiskPct <= 2);
  assert.ok(spec.strategy.risk.maxPositionRiskPct <= 0.75);
  assert.ok(spec.strategy.backtest.windowDays >= 1);
  assert.ok(spec.strategy.backtest.requiredMetrics.includes("max_drawdown"));
  assert.ok(spec.sponsorCapabilityMapping.coinMarketCap.includes("Data MCP"));
  return true;
}

if (require.main === module) {
  const fixturePath = path.resolve(__dirname, "..", "demo_strategy_fixture.json");
  const spec = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  validateStrategySpec(spec);
  console.log("validate_strategy_spec.js: strategy spec schema checks passed");
}

module.exports = { validateStrategySpec };
