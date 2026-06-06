---
type: requirements_matrix
target: BNB HACK / CoinMarketCap Track 2 Strategy Skills
updated: 2026-06-06
status: local_draft
---

# Requirements Matrix

| Requirement / signal | Official evidence | Local response | Status |
| --- | --- | --- | --- |
| Build the Autonomous Trading Agent Stack | Official page headline and sponsor positioning. | Position project as an agent-native strategy skill that produces execution-ready specs. | mapped |
| Track 2 Strategy Skills | Official page asks for CMC Skills that generate trading strategies from market data. | `CMC Regime Strategy Skill` generates structured strategy specs from CMC-style snapshots. | mapped |
| Backtestable spec, not live agent | Official Track 2 wording. | No live trading, no wallet, no transaction. Backtest window and metrics are included in generated spec. | mapped |
| Use at least one sponsor capability | Official FAQ says at least one sponsor capability is required. | CMC Agent Hub / Data API / Data MCP / Skills Marketplace mapped as primary capability. | local-fixture only |
| CMC data and signal special prize | Official special prize for Best Use of CoinMarketCap Data & Signal. | CMC-style data is the main input and shown during the central action. | mapped |
| Stack all three for strongest shot | Official page recommends CMC + TWT + BNB. | Trust Wallet and BNB are future execution consumers, explicitly approval-gated. | future/approval |
| x402 optional | Official Track 2 lists x402 optional. | x402 is included as optional paid-data design, not used locally. | future/approval |

## Open Questions

- DoraHacks submission field requirements.
- Whether CMC Skills Marketplace accepts a local/reference skill package or requires live hosted execution.
- Whether CMC Agent Hub/Data MCP can be used in read-only mode without paid credentials.
- Whether official judging requires actual CMC API/MCP calls or accepts fixture-backed proof plus clear integration plan.
