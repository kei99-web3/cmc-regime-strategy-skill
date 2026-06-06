---
type: publication_approval_packet
target: public GitHub repo candidate
updated: 2026-06-06
status: local_only_not_published
---

# Publication Approval Packet

Do not publish this repository without explicit user approval.

## Purpose

Prepare a sanitized local candidate for a public GitHub repository that can support a BNB HACK Track 2 submission.

## Exact External Operation That Would Need Approval

- Create or update a public GitHub repository.
- Push the contents of this local candidate to that public repository.
- Add the public repository URL to DoraHacks or any BNB HACK submission field.

## Included Local Materials

- `README.md`
- `PROJECT_PLAN.md`
- `prototype/`
- `demo/index.html`
- `deliverables/requirements_matrix.md`
- `deliverables/judging_alignment.md`
- `deliverables/submission_story.md`
- `deliverables/go_no_go_report.md`
- `deliverables/cmc_api_mcp_approval_packet.md`
- `submission/DORAHACKS_SUBMISSION_REWRITE_JA.md`
- `submission/DUAL_OUTPUT_STRATEGY_JA.md`
- `prototype/cmc_basic_strategy_fixture.json`
- `prototype/human_strategy_report_basic.html`
- `JUDGE_QUICKSTART.md`
- `DEMO_VIDEO_SCRIPT.md`

## Publication Risks

- Accidentally publishing private workspace context.
- Accidentally implying x402, wallet, or transaction execution.
- Publishing before the user approves the public repository name and final description.
- Publishing before the user decides whether BNB HACK should stay ahead of Splunk/Hedera work.

## Verification Before Approval

- Run the local tests inside `prototype`.
- Run a secret-like string scan.
- Confirm claims distinguish fixture, Keyless Public API, and Basic API proof modes.
- Confirm no `.env`, credential, private key, private customer data, or internal-only workspace material is present.
- Confirm the target repo name, visibility, and final submission strategy.

## Current Status

Ready for local review. Not published.
