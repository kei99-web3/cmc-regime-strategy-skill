---
type: bounty_lane_plan
status: active_local
target: BNB HACK / CoinMarketCap Track 2 Strategy Skills
updated: 2026-06-06
approval_boundary: registration, public repo, API keys, x402, wallet, BNB execution, and final submission require user approval
---

# BNB HACK CMC Strategy Skill Plan

## Target

BNB HACK: Build the Autonomous Trading Agent Stack.

Primary lane: Track 2 Strategy Skills.

## Organizer Intent

CoinMarketCap, Trust Wallet, and BNB Chain are trying to seed an agent-native trading stack. Track 2 is the safer quant-research lane: build CMC Skills that generate trading strategies from market data and ship a backtestable specification, not a live trading agent.

## Winning Logic

If CMC wants agent-native market data adoption, then a winning Track 2 submission should show a CMC skill that converts CMC data into structured, backtestable strategy specs, because that proves CMC is the signal layer for autonomous agents.

## Proposed Project

CMC Regime Strategy Skill

An agent-native skill that reads CMC-style market snapshots, classifies the current market regime, and outputs a risk-bounded strategy specification that a future autonomous trading agent could backtest or execute under user-defined rules.

## Local MVP Scope

- Fixture-backed CMC-style market data, no API key.
- Strategy spec JSON with:
  - market regime
  - eligible assets
  - signal inputs
  - entry / exit / invalidation rules
  - risk constraints
  - backtest window
  - no-live-trading boundary
- CLI demo and HTML judge demo.
- Tests for regime classification, risk limits, and no-trade boundary.

## Approval Gates

- DoraHacks registration
- public GitHub repo
- CMC API key / account
- CMC MCP or x402 paid access
- Trust Wallet Agent Kit
- BNB Chain SDK execution
- any live/test transaction
- final submission

## Next Local Steps

1. Build local skill engine and tests.
2. Generate deterministic demo fixture.
3. Create judge-facing HTML demo.
4. Draft requirements matrix and README.
5. Produce go/no-go report for real CMC integration.
