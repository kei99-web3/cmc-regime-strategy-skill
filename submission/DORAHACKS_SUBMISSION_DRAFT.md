---
type: dorahacks_submission_draft
target: BNB HACK / Track 2 Strategy Skills
updated: 2026-06-06
status: draft_not_submitted
---

# DoraHacks Submission Draft

## Project Name

CMC Regime Strategy Skill

## Track

Track 2: Strategy Skills

## Short Description

CMC Regime Strategy Skill turns CoinMarketCap market data into a backtestable, risk-bounded BNB ecosystem strategy specification. It is not a live trading bot: it does not connect wallets, execute orders, use x402 payments, or submit transactions.

## Long Description

BNB HACK Track 2 asks builders to create CMC Skills that generate trading strategies from market data and ship a backtestable spec, not a live agent.

CMC Regime Strategy Skill follows that intent directly. It reads CoinMarketCap-style market snapshots, classifies the current market regime, ranks BNB ecosystem assets, and emits a structured strategy spec with selected universe, entry rules, exit rules, invalidation rules, risk limits, replay instructions, and rule-adherence fields.

The package includes two proof modes:

- A deterministic fixture demo for judge walkthroughs.
- A CMC Keyless Public API demo that fetches real CoinMarketCap data without signup, API key, paid plan, wallet, x402, or transactions.

The current keyless run classifies the market as selective rotation, selects BNB and CAKE, lowers max portfolio risk to 1%, and produces a replay result with full rule adherence. This demonstrates that the skill does not blindly force risk-on trades; it adapts strategy shape to current CMC data.

## Sponsor Capability Used

CoinMarketCap Data/API capability:

- CMC Keyless Public API trial endpoint
- CMC-style quotes/latest data
- global metrics
- fear-and-greed input
- strategy spec designed for CMC Agent Hub / Data MCP / Skills Marketplace compatibility

CMC MCP is documented as an optional stronger integration path, but it requires an API key. x402 is intentionally not used because it introduces pay-per-call payment behavior.

## What Was Built

- Strategy generation engine
- CMC-style fixture snapshot
- CMC Keyless Public API fetcher
- Strategy fixture generation
- Schema validation
- Replay stub
- Static judge demo
- Judge quickstart
- Demo video script
- Requirements and judging alignment documents
- Publication and API/MCP approval packets

## How To Run

```powershell
cd prototype
npm test
npm run fixture
npm run verify
npm run validate
npm run replay
npm run keyless
npm run packcheck
```

Open:

```text
demo/index.html
```

## Safety Boundary

This project does not:

- use a private API key in the local proof;
- connect Trust Wallet;
- execute on BNB Chain;
- place live or test trades;
- use x402 payment;
- sign transactions;
- submit any order.

## Links

To be filled after user approval:

- Public GitHub repo:
- Demo video:
- DoraHacks project page:
