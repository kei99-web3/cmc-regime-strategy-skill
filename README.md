# CMC Regime Strategy Skill

Local MVP for BNB HACK / CoinMarketCap Track 2 Strategy Skills.

This project turns CMC-style market data into an agent-readable Strategy Capsule and a decision-maker-readable Human Strategy Report. It does not trade, connect wallets, use API keys in the keyless proof, or submit anything externally.

## Why This Fits Track 2

BNB HACK Track 2 asks builders to create CMC Skills that generate trading strategies from market data and ship a backtestable spec, not a live agent.

This MVP demonstrates:

- CMC-style market data as the main input.
- Regime classification as the reasoning step.
- A structured Strategy Capsule as the agent-ready output.
- A Human Strategy Report as the decision-maker-readable output.
- Explicit boundaries before Trust Wallet, BNB execution, x402 payment, or any live/test transaction.

## Submission Story

The judge-facing story is intentionally simple:

1. CoinMarketCap-style data is the source of truth.
2. The skill turns that data into a market regime and ranked universe.
3. The machine-readable output is a replayable Strategy Capsule with entries, exits, invalidation, risk, and required metrics.
4. The human-readable output is a browser-ready Human Strategy Report for decision makers.
5. Fixture replay proves the shape of the evaluation loop.
6. Real CMC API/MCP access, x402, wallet connection, chain execution, public repo, and final submission remain approval-gated.

The package now includes a no-signup CMC Keyless Public API path. This gives the submission a real-data proof without a paid plan, API key, wallet, x402 payment, or MCP credential.

See:

- `deliverables/judging_alignment.md`
- `deliverables/submission_story.md`
- `deliverables/cmc_access_research.md`
- `deliverables/final_review_packet_ja.md`
- `deliverables/cmc_api_mcp_approval_packet.md`

## Local Commands

```powershell
cd prototype
npm test
npm run fixture
npm run verify
npm run validate
npm run replay
npm run keyless
npm run basic
npm run report
npm run packcheck
```

Open the local demo:

```text
demo/index.html
```

Open the generated decision-maker reports:

```text
prototype/human_strategy_report_fixture.html
prototype/human_strategy_report_keyless.html
prototype/human_strategy_report_basic.html
```

## Approval Boundary

The following require explicit user approval:

- DoraHacks registration
- public GitHub repo
- CMC API key / account
- CMC MCP or x402 paid access
- Trust Wallet Agent Kit
- BNB Chain SDK execution
- any live/test transaction
- final submission
