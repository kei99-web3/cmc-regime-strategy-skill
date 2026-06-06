---
type: submission_story
target: BNB HACK / CoinMarketCap Track 2 Strategy Skills
updated: 2026-06-06
status: local_draft_not_submitted
---

# Submission Story Draft

## Project Name

CMC Regime Strategy Skill

## One-Line Pitch

A CoinMarketCap-native strategy skill that converts market data and signal into a backtestable, risk-bounded BNB ecosystem strategy spec without executing trades.

## Problem

Most autonomous trading demos jump straight from signal to execution. That is risky for Track 2 because the task is not to trade live; it is to generate a strategy that can be replayed, evaluated, and trusted. Judges need to see the logic, the risk boundary, and the rule adherence before any wallet or chain action.

## Solution

CMC Regime Strategy Skill reads CMC-style market snapshots, classifies the current regime, ranks BNB ecosystem assets, and outputs a structured strategy spec. The spec includes selected universe, entry rules, exit rules, invalidation rules, portfolio risk, replay metrics, and explicit no-live-trading constraints.

## What Is Built Locally

- Fixture-backed CMC-style market snapshot.
- Strategy skill engine.
- Unit tests for regime classification, ranking, and boundaries.
- Generated strategy fixture.
- Fixture replay stub with return, drawdown, risk-adjusted, win-rate, and rule-adherence fields.
- Static judge demo HTML.
- Requirements matrix and approval-gated integration plan.

## Sponsor Capability

Primary: CoinMarketCap Agent Hub / Data API / Data MCP / Skills Marketplace.

Future optional: x402 for paid data access, Trust Wallet Agent Kit and BNB AI Agent SDK as execution consumers if a separate Track 1-style version is approved.

## Why It Can Win

The project is built around the exact Track 2 phrasing: strategy skills, market data, backtestable spec, and quant research. It also targets the CoinMarketCap Data & Signal special prize by making CMC-style signal the central input rather than a decorative data source.

## Demo Script

1. Open `demo/index.html`.
2. Explain that the project is Track 2, not live trading.
3. Run `npm test`.
4. Run `npm run fixture`.
5. Run `npm run verify`.
6. Run `npm run validate`.
7. Run `npm run replay`.
8. Show `demo_strategy_fixture.json` and `demo_replay_result.json`.
9. Explain approval gates before CMC API/MCP, x402, wallet, chain execution, public repo, and final submission.

## Not Submitted Yet

This is a local draft. It has not been registered, published, uploaded, posted, or submitted externally.
