# GSC Sync — 5-Minute Quickstart

> Condensed copy-paste setup for `pnpm sync:gsc`. For full context see `gsc-setup.md`.

You should be sitting at the terminal in this repo, logged into Google with the account that owns the openclaw101.vip Search Console property.

## Step 1 — Create service account (Google Cloud Console)

Open: https://console.cloud.google.com/iam-admin/serviceaccounts

1. Top-left project selector → **Create new project** → name it `openclaw-seo` → Create
2. Once project is active, click **+ Create service account**
3. Name: `gsc-sync` → Create and continue → Skip optional steps → Done
4. Click into the new service account → **Keys** tab → **Add key** → **Create new key** → **JSON** → Create
5. Browser downloads `openclaw-seo-XXXXXX.json`. Move it:

```bash
mkdir -p ~/.gsc
mv ~/Downloads/openclaw-seo-*.json ~/.gsc/service-account.json
chmod 600 ~/.gsc/service-account.json
```

## Step 2 — Enable the API (Google Cloud Console)

Open: https://console.cloud.google.com/apis/library/searchconsole.googleapis.com

Confirm the same `openclaw-seo` project is selected (top-left). Click **Enable**.

## Step 3 — Grant access in Search Console

Get the service account email:

```bash
grep client_email ~/.gsc/service-account.json
```

Looks like `gsc-sync@openclaw-seo.iam.gserviceaccount.com`. Copy it.

Open: https://search.google.com/search-console

1. Top-left property selector → choose `openclaw101.vip` (domain property recommended)
2. Settings (gear icon, bottom-left) → **Users and permissions**
3. **Add user** → paste the service account email → Permission: **Restricted** (read-only is enough) → Add

## Step 4 — Export env vars

Add to `.env.local` (gitignored) or just export in current shell:

```bash
export GSC_SERVICE_ACCOUNT_KEY_PATH=~/.gsc/service-account.json
export GSC_SITE_URL=sc-domain:openclaw101.vip
```

Verify the file is readable:

```bash
ls -la ~/.gsc/service-account.json
# should show -rw------- (chmod 600), your user, with size 2-3 KB
```

## Step 5 — Run the sync

```bash
pnpm sync:gsc
```

Expected output:

```
✓ GSC sync complete
  Window:      last 28 days ending 2026-05-14
  Clicks:      13
  Impressions: 1,898
  CTR:         0.68%
  Report:      report/gsc/2026-05-14-weekly.md
  Snapshot:    report/gsc/latest.json
```

If you see `✗ Auth failed (401)` → check system clock (`date`) is current.
If you see `✗ Forbidden (403)` → service account email not added to Search Console (redo Step 3).
If you see `✗ Not found (404)` → wrong `GSC_SITE_URL`, try `https://openclaw101.vip/` instead of `sc-domain:`.

## Step 6 — Verify and record baseline

```bash
# Read the generated report
cat report/seo/wk0-investigation.md | head -20

# View the weekly markdown
ls -la report/gsc/
```

Open `report/seo/wk0-investigation.md` section 7.3 and tick off the checkboxes + fill in baseline numbers.

Then move to:
- Section 7.1 — pick 20 unindexed URLs from GSC, fill the table
- Section 7.2 — check Ahrefs DR, record
- Section 7.4 — apply decision tree

When all done, tell CC: "Wk0 done, decided branch X" and Wk1 begins.

## One-line shell aliases (optional)

```bash
# Add to your .zshrc / .bashrc
alias gsc-sync='cd ~/openclaw101 && pnpm sync:gsc'
alias gsc-baseline='cat ~/openclaw101/report/gsc/latest.json | jq .totals'
```
