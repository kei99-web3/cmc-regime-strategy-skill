"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const snapshot = require("./cmc_market_snapshot.json");
const { generateStrategySpec } = require("./strategy_skill");

const fixturePath = path.resolve(__dirname, "..", "demo_strategy_fixture.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const expected = generateStrategySpec(snapshot);

assert.deepEqual(fixture, expected);
console.log("verify_demo_fixture.js: demo fixture matches current engine");
