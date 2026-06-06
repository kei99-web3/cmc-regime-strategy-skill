"use strict";

const fs = require("node:fs");
const path = require("node:path");

const prototypeRoot = path.resolve(__dirname, "..");

const REPORT_TARGETS = [
  {
    label: "Fixture Demo",
    spec: "demo_strategy_fixture.json",
    replay: "demo_replay_result.json",
    output: "human_strategy_report_fixture.html"
  },
  {
    label: "CMC Keyless Live Data",
    spec: "cmc_keyless_strategy_fixture.json",
    replay: "cmc_keyless_replay_result.json",
    output: "human_strategy_report_keyless.html"
  },
  {
    label: "CMC Basic API Live Data",
    spec: "cmc_basic_strategy_fixture.json",
    replay: "cmc_basic_replay_result.json",
    output: "human_strategy_report_basic.html",
    optional: true
  }
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(prototypeRoot, relativePath), "utf8"));
}

function exists(relativePath) {
  return fs.existsSync(path.join(prototypeRoot, relativePath));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pct(value) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return "n/a";
  return `${escapeHtml(value)}%`;
}

function decisionFor(spec, replay) {
  const regime = spec.marketRegime && spec.marketRegime.label;
  const drawdown = Number(replay.maxDrawdownPct || 0);
  const ruleAdherence = Number(replay.ruleAdherence || 0);

  if (regime === "overheated_risk" || ruleAdherence < 1 || drawdown > 4) {
    return {
      label: "No-Go",
      className: "danger",
      summary: "Current conditions or rule adherence do not support strategy activation."
    };
  }

  if (regime === "selective_rotation") {
    return {
      label: "Caution",
      className: "warn",
      summary: "Proceed only with reduced universe, tighter risk, and explicit invalidation."
    };
  }

  return {
    label: "Go",
    className: "ok",
    summary: "Market regime supports a bounded strategy candidate for replay evaluation."
  };
}

function listItems(items) {
  return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function universeRows(universe) {
  return (universe || [])
    .map((asset) => {
      const rationale = (asset.rationale || []).map(escapeHtml).join("<br>");
      return `<tr><td>${escapeHtml(asset.symbol)}</td><td>${escapeHtml(asset.name)}</td><td>${escapeHtml(asset.strategyScore)}</td><td>${rationale}</td></tr>`;
    })
    .join("\n");
}

function sponsorRows(mapping) {
  return Object.entries(mapping || {})
    .map(([name, value]) => {
      const rendered = Array.isArray(value) ? value.map(escapeHtml).join(", ") : escapeHtml(value);
      return `<tr><td>${escapeHtml(name)}</td><td>${rendered}</td></tr>`;
    })
    .join("\n");
}

function renderReport({ label, spec, replay }) {
  const decision = decisionFor(spec, replay);
  const regime = spec.marketRegime || {};
  const strategy = spec.strategy || {};
  const risk = strategy.risk || {};
  const boundary = spec.dataBoundary || {};

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(spec.skillName)} - Human Strategy Report</title>
  <style>
    :root {
      --ink: #17212b;
      --muted: #5d6872;
      --line: #d8e0e6;
      --soft: #f5f8fa;
      --ok: #11613b;
      --warn: #9a6500;
      --danger: #9d2b2b;
      --blue: #2459a6;
    }
    body { margin: 0; font-family: Inter, "Segoe UI", Arial, sans-serif; color: var(--ink); background: #fff; line-height: 1.58; }
    header { padding: 28px 34px 18px; border-bottom: 1px solid var(--line); }
    main { max-width: 1120px; padding: 24px 34px 48px; }
    h1 { margin: 0 0 8px; font-size: 30px; letter-spacing: 0; }
    h2 { margin: 28px 0 12px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 19px; letter-spacing: 0; }
    p { margin: 0 0 12px; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0 16px; }
    th, td { border: 1px solid var(--line); padding: 8px 10px; text-align: left; vertical-align: top; }
    th { background: #eef3f6; }
    ul { margin: 0 0 12px 1.2em; padding: 0; }
    li { margin: 4px 0; }
    code { background: #eef3f6; padding: 2px 5px; border-radius: 4px; }
    .pill { display: inline-block; border: 1px solid var(--line); border-radius: 999px; padding: 4px 10px; margin: 4px 6px 0 0; font-size: 13px; background: #fff; }
    .panel { background: var(--soft); border: 1px solid var(--line); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
    .decision { border-left: 5px solid var(--blue); padding: 12px 14px; background: var(--soft); margin: 12px 0; }
    .decision.ok { border-left-color: var(--ok); }
    .decision.warn { border-left-color: var(--warn); }
    .decision.danger { border-left-color: var(--danger); }
    .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 12px 0; }
    .metric { border: 1px solid var(--line); border-radius: 8px; padding: 11px; background: #fff; min-height: 70px; }
    .metric strong { display: block; font-size: 18px; }
    .metric span { color: var(--muted); font-size: 13px; }
    @media (max-width: 820px) { header, main { padding-left: 18px; padding-right: 18px; } .metric-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(spec.skillName)}: Human Strategy Report</h1>
    <p>This report translates the machine-readable Strategy Capsule into a decision-maker-readable view.</p>
    <span class="pill">${escapeHtml(label)}</span>
    <span class="pill">${escapeHtml(spec.track)}</span>
    <span class="pill">Generated: ${escapeHtml(spec.generatedAt)}</span>
  </header>
  <main>
    <section class="decision ${escapeHtml(decision.className)}">
      <h2>Decision Summary</h2>
      <p><strong>${escapeHtml(decision.label)}:</strong> ${escapeHtml(decision.summary)}</p>
      <p>${escapeHtml(regime.reason || "No regime reason provided.")}</p>
    </section>

    <section>
      <h2>Market Regime</h2>
      <div class="metric-grid">
        <div class="metric"><strong>${escapeHtml(regime.label || "n/a")}</strong><span>Regime</span></div>
        <div class="metric"><strong>${escapeHtml(regime.confidence || "n/a")}</strong><span>Confidence</span></div>
        <div class="metric"><strong>${escapeHtml((strategy.universe || []).length)}</strong><span>Selected assets</span></div>
        <div class="metric"><strong>${pct(risk.maxPortfolioRiskPct)}</strong><span>Max portfolio risk</span></div>
      </div>
    </section>

    <section>
      <h2>Selected Universe</h2>
      <table>
        <thead><tr><th>Symbol</th><th>Name</th><th>Score</th><th>Signal rationale</th></tr></thead>
        <tbody>${universeRows(strategy.universe)}</tbody>
      </table>
    </section>

    <section>
      <h2>Rules And Invalidation</h2>
      <div class="panel">
        <p><strong>Entry rules</strong></p>
        <ul>${listItems(strategy.entryRules)}</ul>
        <p><strong>Exit rules</strong></p>
        <ul>${listItems(strategy.exitRules)}</ul>
        <p><strong>Invalidation rules</strong></p>
        <ul>${listItems(strategy.invalidationRules)}</ul>
      </div>
    </section>

    <section>
      <h2>Risk Budget</h2>
      <table>
        <tbody>
          <tr><th>Max portfolio risk</th><td>${pct(risk.maxPortfolioRiskPct)}</td></tr>
          <tr><th>Max position risk</th><td>${pct(risk.maxPositionRiskPct)}</td></tr>
          <tr><th>Max open positions</th><td>${escapeHtml(risk.maxOpenPositions || "n/a")}</td></tr>
          <tr><th>Stop loss</th><td>${escapeHtml(risk.stopLossRule || "n/a")}</td></tr>
          <tr><th>Take profit</th><td>${escapeHtml(risk.takeProfitRule || "n/a")}</td></tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Replay Readout</h2>
      <div class="metric-grid">
        <div class="metric"><strong>${pct(replay.projectedReturnPct)}</strong><span>Projected return</span></div>
        <div class="metric"><strong>${pct(replay.maxDrawdownPct)}</strong><span>Max drawdown</span></div>
        <div class="metric"><strong>${escapeHtml(replay.sharpeLikeRatio || "n/a")}</strong><span>Risk-adjusted ratio</span></div>
        <div class="metric"><strong>${escapeHtml(replay.ruleAdherence || "n/a")}</strong><span>Rule adherence</span></div>
      </div>
      <p>${escapeHtml(replay.caveat || "")}</p>
    </section>

    <section>
      <h2>Data And Sponsor Mapping</h2>
      <table>
        <tbody>
          <tr><th>Data source</th><td>${escapeHtml(boundary.source || "n/a")}</td></tr>
          <tr><th>No live trading</th><td>${escapeHtml(boundary.noLiveTrading)}</td></tr>
          <tr><th>No wallet connection</th><td>${escapeHtml(boundary.noWalletConnection)}</td></tr>
          <tr><th>No transaction</th><td>${escapeHtml(boundary.noTransaction)}</td></tr>
        </tbody>
      </table>
      <table>
        <thead><tr><th>Capability</th><th>Mapping</th></tr></thead>
        <tbody>${sponsorRows(spec.sponsorCapabilityMapping)}</tbody>
      </table>
    </section>

    <section>
      <h2>Strategy Capsule Reference</h2>
      <p>The paired Strategy Capsule remains the source of truth for replay and downstream agent handoff. This HTML report is the decision-maker-readable interpretation of that capsule.</p>
    </section>
  </main>
</body>
</html>
`;
}

function generateReports() {
  const written = [];

  for (const target of REPORT_TARGETS) {
    if (!exists(target.spec) || !exists(target.replay)) {
      if (target.optional) continue;
      throw new Error(`Missing report input for ${target.label}: ${target.spec} / ${target.replay}`);
    }

    const spec = readJson(target.spec);
    const replay = readJson(target.replay);
    const html = renderReport({ label: target.label, spec, replay });
    const outPath = path.join(prototypeRoot, target.output);
    fs.writeFileSync(outPath, html, "utf8");
    written.push(outPath);
  }

  return written;
}

if (require.main === module) {
  const written = generateReports();
  console.log(`generate_human_strategy_report.js: wrote ${written.length} Human Strategy Report file(s).`);
}

module.exports = { generateReports, renderReport };
