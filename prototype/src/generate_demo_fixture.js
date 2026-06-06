"use strict";

const fs = require("node:fs");
const path = require("node:path");
const snapshot = require("./cmc_market_snapshot.json");
const { generateStrategySpec } = require("./strategy_skill");

const spec = generateStrategySpec(snapshot);
const outPath = path.resolve(__dirname, "..", "demo_strategy_fixture.json");
fs.writeFileSync(outPath, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
console.log(`Wrote ${outPath}`);
