# WRE-92 Baseline Freeze

Generated: 2026-03-18T23:02:13Z (UTC)

## Branch strategy confirmation
- Delivery strategy: **feature branches only**, no direct pushes to `main`.
- Baseline work branch: `quill/wre-92-baseline-freeze`
- Baseline captured from default branch lineage: `main`

## Repository identity
- Repository path: `/Users/clawd/.openclaw/workspace-quill/0xClaw-site`
- Baseline HEAD before this artifact commit: `efd707dcb9369fccdcc538bc1efbfee7befe64af`
- Verify HEAD command output: `efd707dcb9369fccdcc538bc1efbfee7befe64af`

## Working tree baseline
```bash
## quill/wre-92-baseline-freeze
 M docs/index.html
 M index.html
```

### Dirty/untracked triage
Current non-clean files before freeze:
```bash
 M docs/index.html
 M index.html
```

Triage:
- `docs/index.html` — likely intentional in-progress docs/site parity edits; requires explicit review and either commit or revert.
- `index.html` — likely intentional in-progress homepage parity edits; requires explicit review and either commit or revert.

No untracked files were detected at baseline capture time.

## Last 20 commits (baseline)
```text
efd707d fix: sync docs navbar height and mobile menu interactions
249fe74 fix: allow docs page scroll when mobile menu is open
b32b091 fix: align docs mobile nav/menu behavior and gutters
3ce7ded style: tighten hero copy-to-cta spacing
6b31d34 copy: trim hero subheadline sentence
3712371 chore: remove redundant hero mobile overflow rule
fa88a6b feat: update WrenOS site + docs experience
4f3238f Update social share titles to WrenOS
14df679 Mobile optimize navigation, hero scaling, and signal flow timeline
2de32cb Update site typography and hero styling refinements
3f2800c Apply WrenOS site updates from working session
a33c204 sync: align site with latest wrenOS build (menu, logo, favicon, hero copy)
1597f96 fix(hero): update wording and favicon assets references
7419719 Refine hero cards, resources section, nav/footer, and interaction polish
add2ac3 Refine signal and infrastructure copy with updated quote placement
85857f0 Update signal narrative copy and simplify conclusion flow
edf8d7d Refine narrative flow, copy, spacing, icons, and links
0386a82 Refine layout, timeline flow, links, and merged start cards
1f26731 Initial 0xClaw site
```

## Verify outputs
- `git rev-parse --verify HEAD` succeeded.
- `git status` snapshot captured.
- `git log --oneline -20` snapshot captured.

## Follow-up cleanup actions
- Open cleanup issue to triage/resolve dirty files in `docs/index.html` and `index.html` before downstream feature work.
