---
type: judging_alignment
target: BNB HACK / CoinMarketCap Track 2 Strategy Skills
updated: 2026-06-06
status: local_draft
source_checked: https://coinmarketcap.com/api/hackathon/ on 2026-06-06 JST
---

# Judging Alignment

## Organizer Intent

BNB HACK is framed around an agent-native trading stack: CoinMarketCap for data and signal, Trust Wallet for custody/execution, and BNB Chain for venue primitives. Track 2 narrows that intent to strategy skills: generate trading strategies from market data and ship a backtestable spec, not a live agent.

## Winning Logic

The strongest Track 2 version should avoid looking like a generic trading bot. It should look like a reusable CMC-native skill that:

- treats CMC data and signal as the core product surface;
- converts noisy market state into a structured, replayable strategy specification;
- gives judges explicit risk, invalidation, and rule-adherence hooks;
- remains compatible with future Trust Wallet and BNB execution without pretending to be a live trading agent;
- can be scored in a held-out replay window.

## How This Package Maps

| Judge signal | Local implementation | Why it matters |
| --- | --- | --- |
| CMC Data & Signal | Fixture-backed CMC-style quotes, technicals, derivatives, social/news, and market context. | Aims directly at the CMC special prize and Track 2 core. |
| Backtestable spec | `demo_strategy_fixture.json` includes universe, entry/exit, invalidation, risk, and required metrics. | Gives judges a concrete replay contract instead of a vague idea. |
| Rule adherence | `demo_replay_result.json` and `validate_strategy_spec.js` check no-live-trading boundaries and required rules. | The FAQ says replay scoring includes rule adherence. |
| Sponsor capability | CMC Agent Hub / Data API / Data MCP / Skills Marketplace are the primary mapped capability. | Meets the at-least-one-sponsor requirement locally, pending real access approval. |
| Stack awareness | Trust Wallet and BNB are modeled as future execution consumers, not current dependencies. | Shows understanding of the full stack while keeping Track 2 risk low. |

## Judge Demo Narrative

1. Ask the skill for a 7-day BNB ecosystem strategy.
2. Show the CMC-style snapshot as the input boundary.
3. Generate a regime label and ranked universe.
4. Emit a machine-readable strategy spec with risk and invalidation.
5. Run fixture replay and schema validation.
6. Point out that live wallet, execution, API key, x402, and final submission are intentionally approval-gated.

## Current Gap

The remaining uncertainty is whether judges require actual CMC API/MCP calls for Track 2, or whether a fixture-backed local proof plus integration plan is enough before submission. That requires account/API/MCP access and therefore user approval.
