"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");
const prototypeRoot = path.resolve(__dirname, "..");

const requiredFiles = [
  "README.md",
  "PROJECT_PLAN.md",
  "deliverables/requirements_matrix.md",
  "deliverables/go_no_go_report.md",
  "deliverables/judging_alignment.md",
  "deliverables/submission_story.md",
  "deliverables/cmc_access_research.md",
  "deliverables/final_review_packet_ja.md",
  "deliverables/cmc_api_mcp_approval_packet.md",
  "submission/DORAHACKS_SUBMISSION_DRAFT.md",
  "demo/index.html",
  "prototype/demo_strategy_fixture.json",
  "prototype/demo_replay_result.json",
  "prototype/human_strategy_report_fixture.html",
  "prototype/cmc_keyless_snapshot.json",
  "prototype/cmc_keyless_strategy_fixture.json",
  "prototype/cmc_keyless_replay_result.json",
  "prototype/human_strategy_report_keyless.html",
  "prototype/cmc_basic_snapshot.json",
  "prototype/cmc_basic_strategy_fixture.json",
  "prototype/cmc_basic_replay_result.json",
  "prototype/human_strategy_report_basic.html",
  "prototype/src/strategy_skill.js",
  "prototype/src/generate_human_strategy_report.js",
  "prototype/src/fetch_cmc_basic_snapshot.js",
  "prototype/src/fetch_cmc_keyless_snapshot.js",
  "prototype/src/validate_strategy_spec.js",
  "prototype/src/replay_backtest_stub.js"
];

const approvalGateTerms = [
  "DoraHacks registration",
  "public GitHub repo",
  "CMC API key / account",
  "CMC MCP or x402 paid access",
  "Trust Wallet Agent Kit",
  "BNB Chain SDK execution",
  "any live/test transaction",
  "final submission"
];

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const relativePath of requiredFiles) {
  assert(fs.existsSync(path.join(projectRoot, relativePath)), `Missing required file: ${relativePath}`);
}

const spec = JSON.parse(readProjectFile("prototype/demo_strategy_fixture.json"));
const replay = JSON.parse(readProjectFile("prototype/demo_replay_result.json"));
const keylessSnapshot = JSON.parse(readProjectFile("prototype/cmc_keyless_snapshot.json"));
const keylessSpec = JSON.parse(readProjectFile("prototype/cmc_keyless_strategy_fixture.json"));
const basicSnapshot = JSON.parse(readProjectFile("prototype/cmc_basic_snapshot.json"));
const basicSpec = JSON.parse(readProjectFile("prototype/cmc_basic_strategy_fixture.json"));
const fixtureReport = readProjectFile("prototype/human_strategy_report_fixture.html");
const keylessReport = readProjectFile("prototype/human_strategy_report_keyless.html");
const basicReport = readProjectFile("prototype/human_strategy_report_basic.html");
const readme = readProjectFile("README.md");
const demo = readProjectFile("demo/index.html");
const approvalPacket = readProjectFile("deliverables/cmc_api_mcp_approval_packet.md");

assert(spec.dataBoundary.noApiKeyUsed === true, "Strategy fixture must be no-API-key local proof.");
assert(spec.dataBoundary.noLiveTrading === true, "Strategy fixture must be no-live-trading.");
assert(spec.dataBoundary.noWalletConnection === true, "Strategy fixture must not connect wallets.");
assert(spec.dataBoundary.noTransaction === true, "Strategy fixture must not transact.");
assert(replay.replayType === "fixture_backtest_stub", "Replay must remain clearly marked as fixture stub.");
assert(replay.ruleAdherence === 1, "Replay must report full rule adherence for the fixture.");
assert(keylessSnapshot.sourceModel.includes("CMC Keyless Public API"), "Keyless snapshot must identify the CMC Keyless Public API source.");
assert(keylessSpec.dataBoundary.noApiKeyUsed === true, "Keyless strategy fixture must remain no-API-key.");
assert(keylessSpec.dataBoundary.noLiveTrading === true, "Keyless strategy fixture must remain no-live-trading.");
assert(basicSnapshot.sourceModel.includes("CMC Basic API"), "Basic snapshot must identify the CMC Basic API source.");
assert(basicSpec.dataBoundary.noLiveTrading === true, "Basic strategy fixture must remain no-live-trading.");
assert(basicSpec.dataBoundary.noWalletConnection === true, "Basic strategy fixture must not connect wallets.");
assert(fixtureReport.includes("Human Strategy Report"), "Fixture Human Strategy Report must identify itself.");
assert(fixtureReport.includes(spec.marketRegime.label), "Fixture Human Strategy Report must include the fixture regime.");
assert(keylessReport.includes("Decision Summary"), "Keyless Human Strategy Report must include a decision summary.");
assert(keylessReport.includes(keylessSpec.marketRegime.label), "Keyless Human Strategy Report must include the keyless regime.");
assert(basicReport.includes("Decision Summary"), "Basic Human Strategy Report must include a decision summary.");
assert(basicReport.includes(basicSpec.marketRegime.label), "Basic Human Strategy Report must include the Basic API regime.");

for (const term of approvalGateTerms) {
  assert(readme.includes(term), `README missing approval gate: ${term}`);
}

assert(approvalPacket.includes("Do not execute without explicit user approval."), "Approval packet must preserve external-action gate.");
assert(demo.includes(spec.marketRegime.label), "Demo must show generated market regime.");
assert(demo.includes(String(replay.projectedReturnPct)), "Demo must show replay metric.");

const scannedFiles = requiredFiles
  .filter((relativePath) => /\.(md|js|json|html)$/.test(relativePath))
  .map((relativePath) => ({ relativePath, text: readProjectFile(relativePath) }));

const riskyPatterns = [
  /BEGIN (RSA|OPENSSH|EC|PRIVATE) KEY/i,
  /sk-[A-Za-z0-9_-]{20,}/,
  /x-cmc_pro_api_key\s*[:=]\s*['"][^'"]+['"]/i,
  /private[_-]?key\s*[:=]\s*['"][^'"]+['"]/i
];

for (const { relativePath, text } of scannedFiles) {
  for (const pattern of riskyPatterns) {
    assert(!pattern.test(text), `Potential secret-like content in ${relativePath}`);
  }
}

console.log(`validate_local_package.js: ${requiredFiles.length} files checked; package remains local and approval-gated.`);
