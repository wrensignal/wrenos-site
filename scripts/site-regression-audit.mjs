#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import https from 'node:https';

const checks = [];
function ok(name, pass, details = '') { checks.push({ name, pass, details }); }

function getStatus(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({ url, status: res.statusCode || 0 });
      res.resume();
    });
    req.on('error', (err) => resolve({ url, status: 0, error: String(err.message || err) }));
    req.setTimeout(10000, () => req.destroy(new Error('timeout')));
  });
}

const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const docsHtml = await readFile(new URL('../docs/index.html', import.meta.url), 'utf8');

ok('homepage canonical tag present', /<link\s+rel="canonical"\s+href="https:\/\/wrenos\.ai\/?"/i.test(indexHtml));
ok('docs canonical tag present', /<link\s+rel="canonical"\s+href="https:\/\/wrenos\.ai\/docs\/?"/i.test(docsHtml));
ok('homepage meta description present', /<meta\s+name="description"\s+content="[^"]+"/i.test(indexHtml));
ok('docs meta description present', /<meta\s+name="description"\s+content="[^"]+"/i.test(docsHtml));

const requiredHomepageLinks = ['/docs/', 'https://github.com/wrensignal/wrenOS'];
for (const href of requiredHomepageLinks) ok(`homepage link exists: ${href}`, indexHtml.includes(href));

const requiredDocsAnchors = ['#quick-start', '#configuration', '#architecture'];
for (const anchor of requiredDocsAnchors) ok(`docs nav anchor exists: ${anchor}`, docsHtml.includes(anchor));

const routeChecks = await Promise.all([
  getStatus('https://wrenos.ai/'),
  getStatus('https://wrenos.ai/docs')
]);
for (const r of routeChecks) ok(`route status < 400: ${r.url}`, r.status > 0 && r.status < 400, `status=${r.status}${r.error ? ` error=${r.error}` : ''}`);

const failed = checks.filter((c) => !c.pass);
const report = {
  generatedAt: new Date().toISOString(),
  summary: { total: checks.length, passed: checks.length - failed.length, failed: failed.length },
  checks
};

await mkdir(new URL('../docs/reports', import.meta.url), { recursive: true });
await writeFile(new URL('../docs/reports/site-regression-report.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exit(failed.length ? 1 : 0);
