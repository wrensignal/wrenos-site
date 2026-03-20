# WRE-111 Naming + Link Hygiene Sweep

Date: 2026-03-19

## Scope
- Home page (`index.html`)
- Docs shell (`docs/index.html`)
- Footer/meta/canonical/OG/Twitter surfaces
- Repo metadata (`README.md`)
- Automated link check (`scripts/link-audit.mjs`)

## Changes made

1. **Site naming cleanup**
   - `README.md`
     - `# 0xClaw Site` → `# WrenOS Site`
     - Updated description to WrenOS naming.

2. **Docs/footer routing hygiene**
   - Home footer Docs link now routes to `/docs/` (live docs target) instead of GitHub repo root.

3. **Dead link removal**
   - Replaced docs note reference from `/SKILL.md` (missing in site repo) to canonical source path:
     - `https://github.com/wrensignal/wrenOS/blob/main/SKILL.md`

4. **Docs metadata hygiene**
   - Added canonical/OG/Twitter tags to `docs/index.html` with `https://wrenos.ai/docs` target.

## Legacy reference policy (explicitly retained)

These 0xClaw references remain intentionally:
- migration/history content in `docs/index.html` ("Migrating from 0xClaw", changelog rebrand entry)
- repository naming references where technically accurate (`0xClaw-site` repo path)
- baseline historical audit artifacts

No accidental legacy naming remains in homepage/meta/footer routes.

## Automated link audit

Script: `scripts/link-audit.mjs`

Latest run (`docs/reports/link-audit-report.json`):
- `ok: true`
- `broken links: 0`
- local/doc link targets resolved successfully
