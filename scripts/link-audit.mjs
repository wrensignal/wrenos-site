#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = ['index.html', 'docs/index.html', 'docs/site-ownership.md', 'docs/homepage-claim-audit.md', 'docs/cta-behavior-contract.md', 'docs/parity-matrix.md', 'README.md']
  .filter((p) => existsSync(path.join(root, p)));

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel = path.relative(root, full);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, acc);
    else if (rel.endsWith('.html') || rel.endsWith('.md')) acc.push(rel);
  }
  return acc;
}

const files = [...new Set([...targets, ...walk(path.join(root, 'docs'))])].filter((f) => existsSync(path.join(root, f)));
const hrefRegex = /(href|src)="([^"]+)"/g;

const links = [];
for (const rel of files) {
  const text = readFileSync(path.join(root, rel), 'utf8');
  for (const m of text.matchAll(hrefRegex)) {
    links.push({ file: rel, attr: m[1], url: m[2] });
  }
}

function isExternal(u) { return /^https?:\/\//.test(u); }
function isAnchor(u) { return u.startsWith('#'); }
function isData(u) { return u.startsWith('data:') || u.startsWith('mailto:') || u.startsWith('tel:') || u.startsWith('javascript:'); }

const broken = [];
for (const l of links) {
  const u = l.url;
  if (isAnchor(u) || isExternal(u) || isData(u)) continue;

  const noQuery = u.split('#')[0].split('?')[0];
  const relBase = path.dirname(l.file);
  let target;
  if (noQuery.startsWith('/')) target = path.join(root, noQuery.replace(/^\//, ''));
  else target = path.join(root, relBase, noQuery);

  if (!existsSync(target)) {
    broken.push({ ...l, reason: 'missing_local_target', resolved: path.relative(root, target) });
  }
}

const legacyRefs = [];
for (const rel of files) {
  const text = readFileSync(path.join(root, rel), 'utf8');
  const matches = text.match(/0xclaw|0x-claw/gi) || [];
  if (matches.length) legacyRefs.push({ file: rel, count: matches.length });
}

const report = {
  ok: broken.length === 0,
  filesScanned: files.length,
  linksScanned: links.length,
  broken,
  legacyRefs,
  generatedAt: new Date().toISOString()
};

console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
