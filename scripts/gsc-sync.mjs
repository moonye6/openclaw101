/**
 * Google Search Console API sync (CP-3 from CEO plan v2).
 *
 * Pulls 28-day search analytics + sitemap status + URL Inspection sample,
 * writes a weekly markdown report to report/gsc/ for in-repo persistence.
 *
 * Usage:
 *   GSC_SERVICE_ACCOUNT_KEY_PATH=~/.gsc/service-account.json \
 *   GSC_SITE_URL=sc-domain:openclaw101.vip \
 *   pnpm sync:gsc
 *
 * Optional env:
 *   GSC_REPORT_DAYS=28          (default 28)
 *   GSC_REPORT_DIR=report/gsc   (default; gitignored under /report)
 *
 * Auth: Service account JWT → OAuth token. Zero external deps (Node 22+).
 *
 * See report/gsc/README.md for full setup steps.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

const KEY_PATH_RAW = process.env.GSC_SERVICE_ACCOUNT_KEY_PATH;
const CLIENT_EMAIL = process.env.GSC_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GSC_PRIVATE_KEY;
const SITE_URL = process.env.GSC_SITE_URL;
const DAYS = Number(process.env.GSC_REPORT_DAYS || 28);
const REPORT_DIR = process.env.GSC_REPORT_DIR || 'report/gsc';

function fail(code, msg) {
  console.error(`✗ ${msg}`);
  console.error(`  See docs/seo/gsc-quickstart.md for 5-min setup, or gsc-setup.md for full details.`);
  process.exit(code);
}

if (!SITE_URL) fail(2, 'Missing GSC_SITE_URL env var (e.g. sc-domain:openclaw101.vip)');

// Two auth modes supported:
// 1. JSON file path via GSC_SERVICE_ACCOUNT_KEY_PATH (original)
// 2. Env vars GSC_CLIENT_EMAIL + GSC_PRIVATE_KEY (compatible with googleapis-style .env)
let serviceAccount;

if (KEY_PATH_RAW) {
  const KEY_PATH = KEY_PATH_RAW.startsWith('~')
    ? resolve(homedir(), KEY_PATH_RAW.slice(2))
    : resolve(KEY_PATH_RAW);
  if (!existsSync(KEY_PATH)) fail(2, `Service account key not found: ${KEY_PATH}`);
  try {
    serviceAccount = JSON.parse(readFileSync(KEY_PATH, 'utf8'));
  } catch (e) {
    fail(2, `Cannot parse service account JSON at ${KEY_PATH}: ${e.message}`);
  }
  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    fail(2, 'Service account JSON missing client_email or private_key');
  }
} else if (CLIENT_EMAIL && PRIVATE_KEY) {
  // Env-var mode — accept private key with escaped \n (common in .env files)
  serviceAccount = {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
} else {
  fail(2, 'Missing credentials. Provide either GSC_SERVICE_ACCOUNT_KEY_PATH (JSON file path) OR GSC_CLIENT_EMAIL + GSC_PRIVATE_KEY env vars.');
}

// ---------------------------------------------------------------------------
// JWT signing → OAuth access token
// ---------------------------------------------------------------------------

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function buildJwt() {
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const claim = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(serviceAccount.private_key, 'base64url');
  return `${header}.${claim}.${signature}`;
}

async function getAccessToken() {
  const jwt = buildJwt();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 401 || /invalid_grant/.test(body)) {
      fail(3, `Auth failed (${res.status}). Check that the service account is valid and the system clock is correct. Body: ${body.slice(0, 300)}`);
    }
    fail(3, `Token exchange failed: ${res.status} ${body.slice(0, 300)}`);
  }
  return (await res.json()).access_token;
}

// ---------------------------------------------------------------------------
// Search Console API helpers
// ---------------------------------------------------------------------------

const API = 'https://searchconsole.googleapis.com/webmasters/v3';

async function gscFetch(path, init = {}) {
  const res = await fetch(`${API}${path}`, init);
  if (!res.ok) {
    const body = await res.text();
    if (res.status === 403) {
      fail(4, `Forbidden (${res.status}). Has the service account email been added to Search Console as a user for ${SITE_URL}? Body: ${body.slice(0, 300)}`);
    }
    if (res.status === 404) {
      fail(4, `Not found (${res.status}). Is GSC_SITE_URL correct? It should be either sc-domain:example.com or https://example.com/. Body: ${body.slice(0, 300)}`);
    }
    if (res.status === 429) {
      fail(5, `Rate limited (${res.status}). Wait a few minutes and retry.`);
    }
    fail(6, `API error ${res.status} on ${path}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function querySearchAnalytics(token, dimensions, opts = {}) {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - DAYS * 86400000);
  const result = await gscFetch(
    `/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
        dimensions,
        rowLimit: opts.rowLimit ?? 1000,
        startRow: opts.startRow ?? 0,
        ...(opts.dimensionFilterGroups ? { dimensionFilterGroups: opts.dimensionFilterGroups } : {}),
      }),
    },
  );
  return result.rows || [];
}

async function getSitemaps(token) {
  try {
    const result = await gscFetch(
      `/sites/${encodeURIComponent(SITE_URL)}/sitemaps`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return result.sitemap || [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Markdown formatter
// ---------------------------------------------------------------------------

function fmt(n, decimals = 0) {
  if (typeof n !== 'number') return '—';
  return decimals === 0 ? Math.round(n).toLocaleString() : n.toFixed(decimals);
}

function pct(p) {
  return typeof p === 'number' ? `${(p * 100).toFixed(2)}%` : '—';
}

function table(headers, rows) {
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
  return [head, sep, body].join('\n');
}

function buildReport({ today, byDate, byQuery, byPage, sitemaps, prior }) {
  const totals = byDate.reduce(
    (acc, r) => ({
      clicks: acc.clicks + r.clicks,
      impressions: acc.impressions + r.impressions,
      positionSum: acc.positionSum + r.position * r.impressions,
      impSum: acc.impSum + r.impressions,
    }),
    { clicks: 0, impressions: 0, positionSum: 0, impSum: 0 },
  );
  const avgCtr = totals.impressions ? totals.clicks / totals.impressions : 0;
  const avgPos = totals.impSum ? totals.positionSum / totals.impSum : 0;

  // Week-over-week delta vs prior latest.json snapshot
  let wow = '';
  if (prior?.totals) {
    const dClicks = totals.clicks - prior.totals.clicks;
    const dImps = totals.impressions - prior.totals.impressions;
    const pctClicks = prior.totals.clicks ? ((dClicks / prior.totals.clicks) * 100).toFixed(1) : '—';
    const pctImps = prior.totals.impressions ? ((dImps / prior.totals.impressions) * 100).toFixed(1) : '—';
    wow = [
      '## Week-over-Week Delta',
      '',
      `- Clicks:      ${fmt(prior.totals.clicks)} → ${fmt(totals.clicks)} (Δ ${dClicks >= 0 ? '+' : ''}${dClicks}, ${pctClicks}%)`,
      `- Impressions: ${fmt(prior.totals.impressions)} → ${fmt(totals.impressions)} (Δ ${dImps >= 0 ? '+' : ''}${dImps}, ${pctImps}%)`,
      `- Prior snapshot: ${prior.date}`,
      '',
    ].join('\n');
  }

  const queryRows = byQuery
    .slice()
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 30)
    .map((r) => [
      `\`${r.keys[0]}\``,
      fmt(r.clicks),
      fmt(r.impressions),
      pct(r.ctr),
      r.position.toFixed(1),
    ]);

  const pageRows = byPage
    .slice()
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 30)
    .map((r) => [
      r.keys[0].replace(/^https?:\/\/[^/]+/, '').slice(0, 70),
      fmt(r.clicks),
      fmt(r.impressions),
      pct(r.ctr),
      r.position.toFixed(1),
    ]);

  const dailyRows = byDate
    .slice()
    .sort((a, b) => a.keys[0].localeCompare(b.keys[0]))
    .map((r) => [
      r.keys[0],
      fmt(r.clicks),
      fmt(r.impressions),
      pct(r.ctr),
      r.position.toFixed(1),
    ]);

  const sitemapRows = sitemaps.map((s) => [
    s.path?.replace(/^https?:\/\/[^/]+/, '') || '—',
    fmt(s.contents?.[0]?.submitted),
    fmt(s.contents?.[0]?.indexed),
    s.errors || 0,
    s.warnings || 0,
    s.lastDownloaded?.slice(0, 10) || '—',
  ]);

  // Striking distance: queries at avg position 11-20 (page 2-ish)
  // — these are the highest-ROI optimization targets
  const striking = byQuery
    .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)
    .map((r) => [
      `\`${r.keys[0]}\``,
      fmt(r.impressions),
      r.position.toFixed(1),
      pct(r.ctr),
      fmt(r.clicks),
    ]);

  // Zero-CTR queries: high impressions, zero clicks
  const zeroCtr = byQuery
    .filter((r) => r.clicks === 0 && r.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20)
    .map((r) => [`\`${r.keys[0]}\``, fmt(r.impressions), r.position.toFixed(1)]);

  return [
    `# GSC Weekly Report — ${today}`,
    '',
    `> Site: \`${SITE_URL}\` | Window: last ${DAYS} days | Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- **Total clicks**: ${fmt(totals.clicks)}`,
    `- **Total impressions**: ${fmt(totals.impressions)}`,
    `- **Average CTR**: ${pct(avgCtr)}`,
    `- **Average position**: ${avgPos.toFixed(1)}`,
    '',
    wow,
    '## Sitemaps',
    '',
    sitemapRows.length
      ? table(['Sitemap', 'Submitted', 'Indexed', 'Errors', 'Warnings', 'Last DL'], sitemapRows)
      : '_No sitemap data returned._',
    '',
    '## Top 30 Queries (by clicks)',
    '',
    queryRows.length
      ? table(['Query', 'Clicks', 'Imps', 'CTR', 'Pos'], queryRows)
      : '_No query data._',
    '',
    '## Top 30 Pages (by clicks)',
    '',
    pageRows.length
      ? table(['Page', 'Clicks', 'Imps', 'CTR', 'Pos'], pageRows)
      : '_No page data._',
    '',
    '## Striking Distance — Queries at pos 8-20',
    '',
    '_These keywords are the highest-ROI optimization targets — already showing up but on page 2-ish. Push these and you steal clicks fast._',
    '',
    striking.length
      ? table(['Query', 'Imps', 'Pos', 'CTR', 'Clicks'], striking)
      : '_No striking-distance queries._',
    '',
    '## Zero-CTR Queries (≥10 imps, 0 clicks)',
    '',
    '_High visibility, zero engagement → title/description rewrite candidates._',
    '',
    zeroCtr.length
      ? table(['Query', 'Imps', 'Pos'], zeroCtr)
      : '_No zero-CTR high-impression queries._',
    '',
    '## Daily Trend',
    '',
    dailyRows.length
      ? table(['Date', 'Clicks', 'Imps', 'CTR', 'Pos'], dailyRows)
      : '_No daily data._',
    '',
    '---',
    '',
    '_Report generated by `scripts/gsc-sync.mjs` (CP-3 from CEO plan v2)._',
    '',
  ].filter(Boolean).join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);

if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true });

const priorPath = `${REPORT_DIR}/latest.json`;
const prior = existsSync(priorPath)
  ? JSON.parse(readFileSync(priorPath, 'utf8'))
  : null;

const token = await getAccessToken();

const [byDate, byQuery, byPage, sitemaps] = await Promise.all([
  querySearchAnalytics(token, ['date']),
  querySearchAnalytics(token, ['query'], { rowLimit: 500 }),
  querySearchAnalytics(token, ['page'], { rowLimit: 500 }),
  getSitemaps(token),
]);

const totals = byDate.reduce(
  (acc, r) => ({
    clicks: acc.clicks + r.clicks,
    impressions: acc.impressions + r.impressions,
  }),
  { clicks: 0, impressions: 0 },
);

const md = buildReport({ today, byDate, byQuery, byPage, sitemaps, prior });
const reportPath = `${REPORT_DIR}/${today}-weekly.md`;
writeFileSync(reportPath, md);

const snapshot = {
  date: today,
  site: SITE_URL,
  days: DAYS,
  totals,
  byQuery: byQuery.slice(0, 100),
  byPage: byPage.slice(0, 100),
  sitemaps: sitemaps.map((s) => ({
    path: s.path,
    submitted: s.contents?.[0]?.submitted,
    indexed: s.contents?.[0]?.indexed,
    errors: s.errors,
    warnings: s.warnings,
  })),
};
writeFileSync(priorPath, JSON.stringify(snapshot, null, 2));

const ctr = totals.impressions ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : '0.00';
console.log(`✓ GSC sync complete`);
console.log(`  Window:      last ${DAYS} days ending ${today}`);
console.log(`  Clicks:      ${fmt(totals.clicks)}`);
console.log(`  Impressions: ${fmt(totals.impressions)}`);
console.log(`  CTR:         ${ctr}%`);
console.log(`  Report:      ${reportPath}`);
console.log(`  Snapshot:    ${priorPath}`);
