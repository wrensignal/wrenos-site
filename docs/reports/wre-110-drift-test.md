# WRE-110 Drift Detection Validation

## Commands executed

```bash
node scripts/check-docs-drift.mjs --strict
node scripts/check-docs-drift.mjs --strict --current-sha=0000000000000000000000000000000000000000
```

## Expected behavior
- First command passes when `docs/provenance.json` matches upstream commit.
- Second command intentionally induces drift and must fail in strict mode.

## Re-sync workflow
1. Fetch latest upstream commit:
   - `gh api repos/wrensignal/wrenOS/commits/main --jq .sha`
2. Update `docs/provenance.json` (`syncedCommit`, `syncedAt`).
3. Re-run `node scripts/check-docs-drift.mjs --strict`.
4. Commit updated provenance + drift report.
