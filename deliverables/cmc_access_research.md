---
type: cmc_access_research
target: BNB HACK / CMC data access
updated: 2026-06-06
status: source_checked
---

# CMC Access Research

## Short Answer

We do not need a paid CMC plan for the first serious submission proof.

The best route is:

1. Use the official CMC Keyless Public API for the demo proof.
2. Keep CMC MCP as an optional upgrade because it requires a CMC API key.
3. Avoid x402 unless the user explicitly approves pay-per-call wallet/payment behavior.

## Official Findings

| Topic | Finding | Source |
| --- | --- | --- |
| BNB HACK Track 2 | Build CMC Skills that generate strategies from market data; ship a backtestable spec, not a live agent. | https://coinmarketcap.com/api/hackathon/ |
| Sponsor requirement | At least one sponsor capability is required. CMC Data/API/MCP/Skills Marketplace count as the data layer. | https://coinmarketcap.com/api/hackathon/ |
| Keyless Public API | Official trial endpoint supports a curated subset without signup or API key. | https://coinmarketcap.com/api/documentation/pro-api-reference/trial-pro-api |
| Free Basic API | Basic is free, no subscription required, with 15K call credits/month and personal-use scope. | https://coinmarketcap.com/api/pricing/ |
| MCP | CMC MCP requires an API key. The free Basic key can be used, but account/API-key handling is still an approval gate. | https://coinmarketcap.com/api/mcp/ |
| x402 | No API key, but pay-per-call at 0.01 USDC per MCP call. This is a payment/wallet gate. | https://coinmarketcap.com/api/mcp/ |

## Implemented Local Proof

`npm run keyless` calls:

- `https://pro-api.coinmarketcap.com/trial-pro-api/v3/cryptocurrency/quotes/latest`
- `https://pro-api.coinmarketcap.com/trial-pro-api/v1/global-metrics/quotes/latest`
- `https://pro-api.coinmarketcap.com/trial-pro-api/v3/fear-and-greed/latest`

It writes:

- `prototype/cmc_keyless_snapshot.json`
- `prototype/cmc_keyless_strategy_fixture.json`
- `prototype/cmc_keyless_replay_result.json`

The generated strategy uses real CMC data but still does not use an API key, wallet, live trading, transaction, or payment.

## Recommendation

For the user review version, present two proofs:

- Stable fixture proof: deterministic, polished judge walkthrough.
- CMC keyless proof: real-data sponsor capability proof with no paid plan.

Do not request CMC API/MCP credentials unless the user wants a stronger "live MCP" story after reviewing the packet.
