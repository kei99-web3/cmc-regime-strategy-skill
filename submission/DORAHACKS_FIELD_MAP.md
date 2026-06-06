---
type: dorahacks_field_map
target: BNB HACK / DoraHacks submission
updated: 2026-06-06
status: ready_for_user_review_not_submitted
---

# DoraHacks Field Map

## Project Name

CMC Regime Strategy Skill

## Track

Track 2: Strategy Skills

## Short Description

CMC Regime Strategy Skill generates an agent-readable Strategy Capsule and a decision-maker-readable Human Strategy Report from CoinMarketCap market data for BNB ecosystem strategy evaluation.

## Long Description

CMC Regime Strategy Skill turns CoinMarketCap market data and signals into two coordinated outputs:

1. Strategy Capsule: a machine-readable, backtest-ready package for AI agents, replay evaluators, and future execution-agent handoff.
2. Human Strategy Report: a browser-readable HTML report for decision makers to understand regime, selected assets, signal rationale, risk budget, invalidation, and replay scoring.

The skill uses a regime-first workflow. It classifies the current market state, ranks BNB ecosystem assets, adjusts risk budget and maximum positions, and emits replayable rules instead of one-off buy/sell signals.

The package includes three proof modes:

- deterministic fixture mode for stable demo playback;
- CMC Keyless Public API mode for no-signup real CMC data proof;
- CMC Basic API mode for official free-key CMC Data API proof.

Current Basic API output classifies the market as selective rotation, selects BNB and CAKE, limits max portfolio risk to 1%, and generates both a Strategy Capsule and Human Strategy Report.

The project is designed as the decision layer before execution agents. Strategy Capsules can be consumed by evaluators or future Trust Wallet / BNB Chain execution agents, while Human Strategy Reports support operator and portfolio-manager review.

## Built With

- Node.js
- CoinMarketCap Keyless Public API
- CoinMarketCap Basic API
- CMC-style market quotes and global metrics
- Fixture replay stub
- Static HTML Human Strategy Report generator

## Repository URL

To be filled after public repo approval.

## Demo Video URL

To be filled after video recording/upload approval.

## Submission Notes

No wallet connection, x402 payment, live order, test order, transaction signing, or BNB Chain execution is performed in this Track 2 package.

## User Approval Gates Remaining

- Create/push public GitHub repository.
- Upload demo video.
- Fill and submit DoraHacks form.
