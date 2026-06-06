---
type: go_no_go_report
target: BNB HACK / CMC Regime Strategy Skill
date: 2026-06-06
status: local_go_for_phase_1
---

# Go / No-Go Report

## Decision

Local Phase 1 is a GO.

Full external submission is not approved and remains gated.

## Why

The project fits the organizer intent for Track 2:

- CMC data is central to the main action.
- The output is a backtestable strategy specification, not a live trading agent.
- The MVP avoids wallets, Trust Wallet execution, BNB transactions, CMC API keys, and x402.
- Existing Crypto_BOT knowledge can help later without defining the idea.

## Local Evidence

- Prototype engine: `prototype/src/strategy_skill.js`
- Fixture-backed CMC-style data: `prototype/src/cmc_market_snapshot.json`
- Generated demo fixture: `prototype/demo_strategy_fixture.json`
- Generated replay result: `prototype/demo_replay_result.json`
- CMC Keyless Public API snapshot: `prototype/cmc_keyless_snapshot.json`
- CMC Keyless Public API strategy spec: `prototype/cmc_keyless_strategy_fixture.json`
- CMC Keyless Public API replay result: `prototype/cmc_keyless_replay_result.json`
- Tests: `npm test`
- Fixture verification: `npm run fixture` then `npm run verify`
- Schema validation: `npm run validate`
- Replay stub: `npm run replay`
- Keyless real-data run: `npm run keyless`
- Demo: `demo/index.html`
- Requirements matrix: `deliverables/requirements_matrix.md`
- Judging alignment: `deliverables/judging_alignment.md`
- Submission story draft: `deliverables/submission_story.md`
- CMC access research: `deliverables/cmc_access_research.md`
- Final user review packet: `deliverables/final_review_packet_ja.md`
- CMC API/MCP approval packet: `deliverables/cmc_api_mcp_approval_packet.md`

## Verification Results

```text
npm test
strategy_skill.test.js: all local tests passed

npm run fixture
Wrote prototype/demo_strategy_fixture.json

npm run verify
verify_demo_fixture.js: demo fixture matches current engine

npm run validate
validate_strategy_spec.js: strategy spec schema checks passed

npm run replay
Wrote prototype/demo_replay_result.json

npm run keyless
fetch_cmc_keyless_snapshot.js: wrote keyless CMC snapshot, strategy fixture, and replay result.

npm run packcheck
validate_local_package.js: 17 files checked; package remains local and approval-gated.
```

## User Approval Gates

The user does not need to do anything for local Phase 1.

User approval is required before:

- DoraHacks registration
- public GitHub repo
- CMC account / API key
- CMC MCP or x402 paid access
- Trust Wallet Agent Kit
- BNB Chain SDK execution
- any live/test transaction
- final submission

## Next Local Work

1. User reviews `deliverables/final_review_packet_ja.md`.
2. After approval, publish the sanitized public repo candidate.
3. After approval, record/upload demo video.
4. After approval, fill DoraHacks final submission.
5. CMC Basic API key / MCP remains optional; use only if user approves account/API-key handling.
