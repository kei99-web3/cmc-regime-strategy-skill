---
type: judge_quickstart
target: BNB HACK Track 2 public repo candidate
updated: 2026-06-06
status: local_draft
---

# Judge Quickstart

## What This Is

CMC Regime Strategy Skill is a Track 2 strategy skill concept for BNB HACK. It converts CoinMarketCap-style market data into a backtestable, risk-bounded strategy specification for the BNB ecosystem.

This is not a live trading bot. It does not connect a wallet, sign transactions, place orders, or use an API key in the local fixture demo.

## Run Locally

```powershell
cd prototype
npm test
npm run fixture
npm run verify
npm run validate
npm run replay
npm run packcheck
```

## View Demo

Open:

```text
demo/index.html
```

## What To Look For

- `marketRegime.label` shows the regime classification.
- `strategy.universe` shows selected assets and rationale.
- `strategy.risk` shows portfolio and position boundaries.
- `strategy.backtest` shows the replay contract.
- `dataBoundary` confirms no API key, no live trading, no wallet connection, and no transaction.

## Sponsor Mapping

Primary sponsor capability: CoinMarketCap Agent Hub / Data API / Data MCP / Skills Marketplace.

The local version uses fixture-backed CMC-style data. Real CMC API/MCP access is a separate approval-gated step.
