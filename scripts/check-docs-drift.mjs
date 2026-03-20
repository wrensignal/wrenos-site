#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const forcedShaArg = args.find((a) => a.startsWith('--current-sha='));
const currentShaForced = forcedShaArg ? forcedShaArg.split('=')[1] : null;

const prov = JSON.parse(readFileSync('docs/provenance.json', 'utf8'));
const latest = currentShaForced || execSync(`gh api repos/${prov.sourceRepo}/commits/${prov.sourceRef} --jq .sha`, { encoding: 'utf8' }).trim();
const drift = latest !== prov.syncedCommit;

const report = {
  generatedAt: new Date().toISOString(),
  sourceRepo: prov.sourceRepo,
  sourceRef: prov.sourceRef,
  syncedCommit: prov.syncedCommit,
  latestCommit: latest,
  drift,
  mode: strict ? 'strict' : 'warn'
};
mkdirSync('docs/reports', { recursive: true });
writeFileSync('docs/reports/docs-drift-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (drift && strict) process.exit(1);
