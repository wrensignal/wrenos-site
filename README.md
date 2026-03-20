# WrenOS Site

Landing page and docs shell for WrenOS (`wrenos.ai`).

## Site regression harness

Run the site/docs regression checks locally:

```bash
./scripts/run-site-regression.sh
```

Artifacts are written to `docs/reports/site-regression-report.json`.


## Docs provenance
- Provenance marker source: `docs/provenance.json`
- Drift check: `node scripts/check-docs-drift.mjs --strict`
