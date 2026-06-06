---
type: demo_video_script
target: BNB HACK Track 2 public repo candidate
updated: 2026-06-06
status: local_draft
duration_target: 150_seconds
---

# Demo Video Script

## 0:00-0:15 - Problem

"BNB HACK Track 2 asks for strategy skills: market data in, backtestable strategy spec out. This project focuses on the trust layer before execution."

## 0:15-0:35 - Project

"CMC Regime Strategy Skill uses CoinMarketCap-style market data to classify the current regime, rank BNB ecosystem assets, and produce a structured strategy spec."

Show `demo/index.html`.

## 0:35-1:05 - Generated Spec

Show:

- market regime: `momentum_expansion`
- selected universe: `CAKE`, `BNB`, `TWT`
- risk: max portfolio risk `1.5%`, max open positions `3`
- replay stub: projected return `5.09%`, max drawdown `2.7%`, rule adherence `1.00`

## 1:05-1:35 - Local Verification

Run:

```powershell
cd prototype
npm test
npm run fixture
npm run verify
npm run validate
npm run replay
npm run packcheck
```

Explain that this proves the skill output is reproducible, schema-checked, and bounded.

## 1:35-2:05 - Sponsor Fit

"The primary integration target is CoinMarketCap Agent Hub, Data API, Data MCP, and Skills Marketplace. The local demo uses a fixture, while real read-only CMC API/MCP access is the next approved integration step."

## 2:05-2:30 - Safety Boundary

"This is Track 2, not live trading. It does not use an API key, connect Trust Wallet, execute on BNB Chain, use x402, or submit transactions. Those are deliberately gated for a later approved phase."
