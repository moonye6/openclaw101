# Google Search Console API Sync — Setup Guide

> CP-3 from CEO plan v2 (2026-05-05). Pulls 28-day GSC data into `report/gsc/`
> as in-repo markdown reports for weekly review and WoW (week-over-week) tracking.

## What this does

Running `pnpm sync:gsc` does the following:
1. Authenticates with Google via a service account JWT
2. Pulls 28-day search analytics from Search Console
   - Daily totals (clicks, impressions, CTR, position)
   - Top queries (up to 500)
   - Top pages (up to 500)
3. Pulls sitemap submission status (submitted vs indexed)
4. Generates a markdown report at `report/gsc/YYYY-MM-DD-weekly.md`
5. Saves a JSON snapshot at `report/gsc/latest.json` for WoW comparison
6. Highlights two action lists:
   - **Striking distance**: queries at position 8-20 (top optimization targets)
   - **Zero-CTR queries**: ≥10 impressions, 0 clicks (rewrite candidates)

`report/` is gitignored, so reports stay local-only — operational artifacts, not source.

## One-time setup (~10 minutes)

### Step 1 — Create a Google Cloud service account

1. Go to https://console.cloud.google.com/iam-admin/serviceaccounts
2. Pick or create a project (any project works; "openclaw-seo" recommended)
3. Click **Create Service Account**
   - Name: `gsc-sync` (or anything)
   - Skip optional roles
4. After creation, click into the new account → **Keys** tab → **Add key** → **Create new key** → **JSON**
5. Save the downloaded `*.json` file somewhere outside the repo. Recommended: `~/.gsc/service-account.json`

```bash
mkdir -p ~/.gsc
mv ~/Downloads/openclaw-seo-*.json ~/.gsc/service-account.json
chmod 600 ~/.gsc/service-account.json   # readable only by you
```

### Step 2 — Enable Search Console API

1. Go to https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
2. Make sure the same project is selected
3. Click **Enable**

### Step 3 — Grant the service account access in Search Console

The service account email looks like `gsc-sync@openclaw-seo.iam.gserviceaccount.com`. Find it in the JSON file under `client_email`.

1. Go to https://search.google.com/search-console
2. Pick the property `openclaw101.vip` (domain property recommended)
3. Click **Settings** → **Users and permissions** → **Add user**
4. Email: paste the `client_email` value from the JSON
5. Permission: **Restricted** is enough (read-only data access)
6. Click **Add**

### Step 4 — Set environment variables

Add to your `.env.local` (or export in your shell):

```bash
GSC_SERVICE_ACCOUNT_KEY_PATH=~/.gsc/service-account.json
GSC_SITE_URL=sc-domain:openclaw101.vip
# Optional:
# GSC_REPORT_DAYS=28
# GSC_REPORT_DIR=report/gsc
```

**Important:** `GSC_SITE_URL` format depends on how the property is verified in GSC:
- Domain property → `sc-domain:openclaw101.vip` (preferred — covers all subdomains and protocols)
- URL prefix property → `https://openclaw101.vip/` (must match exactly, including trailing slash)

### Step 5 — Run the sync

```bash
pnpm sync:gsc
```

Expected output:

```
✓ GSC sync complete
  Window:      last 28 days ending 2026-05-05
  Clicks:      22
  Impressions: 2,649
  CTR:         0.83%
  Report:      report/gsc/2026-05-05-weekly.md
  Snapshot:    report/gsc/latest.json
```

## Weekly cadence

Run `pnpm sync:gsc` once per week. The script:
- Compares against `latest.json` from the prior run → emits Week-over-Week delta
- Writes a fresh dated report so you keep history
- Overwrites `latest.json` with the new snapshot

Optional cron (macOS/Linux):

```cron
# Run every Sunday at 09:00 local time
0 9 * * 0 cd /path/to/openclaw101 && /usr/bin/env -i PATH=$PATH HOME=$HOME pnpm sync:gsc >> ~/.gsc/sync.log 2>&1
```

## Troubleshooting

### `Auth failed (401)` / `invalid_grant`

- System clock skew → JWT signed with future/past `iat`. Run `sudo ntpdate pool.ntp.org` (Linux) or check Date & Time settings.
- Wrong key file → verify `client_email` and `private_key` are in the JSON.

### `Forbidden (403)`

- Service account hasn't been added to Search Console for `openclaw101.vip`. Repeat Step 3.
- The Search Console API isn't enabled for the project. Repeat Step 2.

### `Not found (404)`

- `GSC_SITE_URL` is wrong. Try the alternate format (domain property vs URL prefix).
- The property doesn't exist in this account.

### `Rate limited (429)`

- Default GSC quotas are 1,200 QPM. The script issues 4 calls per run. Should never trip unless cron runs too frequently. Wait 5 minutes and retry.

## Credential rotation (every 6 months)

Service account keys don't auto-expire but should be rotated:

1. In Cloud Console, create a NEW key (Step 1.4) before deleting the old
2. Update `~/.gsc/service-account.json` to the new file
3. Test with `pnpm sync:gsc` succeeding once
4. In Cloud Console → Keys tab, delete the OLD key

Calendar reminder recommended: 5 months from initial setup.

## What's in the report

Each weekly markdown contains:

| Section | Purpose |
|---------|---------|
| **Summary** | Headline numbers (clicks, imps, CTR, avg position) |
| **WoW Delta** | Change vs prior week's snapshot |
| **Sitemaps** | Submitted vs indexed counts per sitemap |
| **Top 30 Queries** | Best-performing search terms |
| **Top 30 Pages** | Best-performing landing pages |
| **Striking Distance** | Position 8-20 queries — your highest-ROI targets |
| **Zero-CTR** | High-impression / no-click queries — title/description rewrite candidates |
| **Daily Trend** | Day-by-day breakdown |

The Striking Distance and Zero-CTR sections are the key actionable outputs. Review them weekly and:
- Move striking-distance queries to title position 1-7 by improving the matching page (more inbound links, deeper content, schema)
- Rewrite the title/description for zero-CTR queries → reposition for the search intent

## Privacy

- The service account JSON contains a private key — **NEVER commit it**. `~/.gsc/` is outside the repo by design.
- The report markdown contains query terms users searched for. `report/` is gitignored. If you want to share a redacted version, manually scrub before sharing.
- The `latest.json` snapshot is also gitignored.

## Why this script doesn't use `googleapis` npm package

Zero new dependencies = zero supply-chain risk. Node 22+ has built-in `fetch` and `crypto` — enough for service account JWT auth and JSON HTTP. The script is ~250 lines and easy to audit.

If you outgrow it (e.g., need URL Inspection API or batch operations), `pnpm add -D googleapis` and rewrite from this baseline.
