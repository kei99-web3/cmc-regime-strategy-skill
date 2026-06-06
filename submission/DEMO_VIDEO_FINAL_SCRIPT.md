---
type: demo_video_final_script
target: BNB HACK / CMC Regime Strategy Skill
updated: 2026-06-06
status: ready_to_record_after_user_approval
duration_target: 150_seconds
---

# Demo Video Final Script

## 0:00-0:15 - Product

CMC Regime Strategy Skill turns CoinMarketCap market data into two outputs: a Strategy Capsule for AI agents, and a Human Strategy Report for decision makers.

Show:

- project title
- `prototype/human_strategy_report_basic.html`
- `prototype/cmc_basic_strategy_fixture.json`

## 0:15-0:40 - CMC Data Proof

The skill can run with fixture data, CMC Keyless Public API, or the free CMC Basic API. The Basic API proof uses official CMC data with a free key.

Show:

- `npm run basic`
- `CMC Basic API` source in `cmc_basic_strategy_fixture.json`

## 0:40-1:05 - Regime-First Strategy Generation

The current Basic API run classifies the market as selective rotation. It selects BNB and CAKE, keeps max portfolio risk at 1%, and limits max open positions to 2.

Show:

- regime: `selective_rotation`
- selected universe: `BNB`, `CAKE`
- risk budget: `1%`

## 1:05-1:35 - Strategy Capsule

The Strategy Capsule is the machine-readable output. It includes data provenance, selected universe, signal rationale, entry rules, exit rules, invalidation rules, risk budget, replay window, and scoring metrics.

Show:

- `cmc_basic_strategy_fixture.json`

## 1:35-2:05 - Human Strategy Report

The Human Strategy Report is the decision-maker-readable output. It explains the same strategy in HTML: regime, rationale, rules, risk, replay readout, and sponsor mapping.

Show:

- `human_strategy_report_basic.html`

## 2:05-2:25 - Verification

The package validates that the capsule and report are reproducible, schema-checked, approval-gated, and free of secret-like content.

Show:

- `npm run report`
- `npm run validate`
- `npm run packcheck`

## 2:25-2:35 - Track 2 Boundary

This is a Track 2 strategy skill. It prepares a decision and replay layer before execution. Wallet connection, x402 payment, transaction signing, and BNB Chain execution are intentionally outside this submission.
