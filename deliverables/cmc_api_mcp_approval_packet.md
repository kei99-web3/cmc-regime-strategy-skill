---
type: approval_packet
target: CMC API / MCP access for BNB HACK Track 2
updated: 2026-06-06
status: prepared_not_requested
---

# CMC API / MCP Approval Packet

Do not execute without explicit user approval.

## Purpose

Replace the local fixture-backed market snapshot with read-only CoinMarketCap API or Data MCP calls so the Track 2 submission can demonstrate real sponsor capability use.

## Exact Operation That Would Need Approval

- Register or log in to the required CMC / DoraHacks / Agent Hub surfaces if needed.
- Obtain or use a CMC API key or MCP access token.
- Configure a local `.env` or secure credential store.
- Run read-only market data calls for quotes, technicals, derivatives, sentiment/news, and historical replay inputs.
- Update the demo fixture to identify the real source and access date.

## Benefits

- Stronger compliance with the sponsor-capability requirement.
- Better shot at the CoinMarketCap Data & Signal special prize.
- Stronger judge confidence that the skill can run outside a mocked fixture.
- Clearer path from local proof to final submission.

## Main Risks

- API key or token handling creates secret-management risk.
- Some CMC/MCP access may require paid plan, x402 payment, account approval, or rate limits.
- Real data can change the current strategy output and require re-tuning tests.
- Login, registration, or account creation may create external commitments.

## Verification Plan

- Keep credentials out of git and reports.
- Run read-only data calls only.
- Re-run `npm test`, `npm run fixture`, `npm run verify`, `npm run validate`, `npm run replay`, and `npm run packcheck`.
- Document exact source, timestamp, endpoints/tools used, and remaining gaps.

## Current Recommendation

Use CMC Keyless Public API first because it requires no signup, no API key, and no payment while still demonstrating a real CoinMarketCap sponsor capability. Request CMC Basic API key / MCP access only if the user wants a stronger live MCP demo after reviewing the final packet.

## Keyless Finding

Official CMC pricing and documentation state that the Keyless Public API exposes a curated subset of Pro API endpoints at `https://pro-api.coinmarketcap.com/trial-pro-api` without signup or API key. This project now uses that route for a real-data proof.

## MCP Finding

Official CMC MCP documentation says MCP requires a CMC API key. A free Basic key exists, but account signup and credential handling are still external approval gates.
