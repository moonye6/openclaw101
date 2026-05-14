# OpenClaw 101 — TODOs

> Deferred work surfaced from CEO plan reviews. Each item: what / why / pros / cons / context / effort / priority / depends.

---

## Added from /plan-ceo-review (2026-05-14) — Reassessment Response

### TD-007 — Wk0 Manual Setup Bundle [P0, BLOCKING Approach C]

**What:** Three manual prerequisite actions before any Wk1 code change:
1. GSC URL Inspection — sample 20 random unindexed pages, classify by reason (`/zh/*` legacy / `/en/*` legacy / `/7days/*` legacy / real content / other). Record in `report/seo/wk0-investigation.md` §7.
2. Domain Rating lookup — visit https://ahrefs.com/website-authority-checker, enter `openclaw101.vip`, record DR. Or Moz DA via https://moz.com/domain-analysis.
3. GSC service account credentials — follow `docs/seo/gsc-setup.md`, create service account JSON at `~/.gsc/service-account.json`, grant access in Search Console, set env vars, run `pnpm sync:gsc` successfully one time. Verify `report/gsc/2026-05-14-weekly.md` written.

**Why:** Approach C from CEO plan v3 (2026-05-14) is hard-blocked on these three actions. Without baseline measurement, every subsequent change is blind. Without DR, we don't know if SEO is authority-bound. Without URL Inspection sample, we don't know if 186 unindexed pages are real or legacy redirects.

**Pros:**
- Unblocks Approach C execution
- Establishes measurement baseline for 4-week exit criteria
- Wk0 investigation has been deferred since 2026-05-05; this is the final commitment
- ~30 minutes total user effort

**Cons:**
- All three are user-side actions, no CC delegation possible
- Easy to procrastinate; sets Approach C clock running

**Context:** This is the operational floor for the 2026-05-14 reassessment-response plan. CP-3 GSC scaffold was built 2026-05-05 (commit 932b319). Credentials never configured. Three weeks of "I'll do it later" — now hard-locked. See ~/.gstack/projects/openclaw101/ceo-plans/2026-05-14-reassessment-response.md decision D3.

**Effort:** human ~30 min total / CC: 0 (cannot delegate)
**Priority:** P0 (blocks Wk1 of Approach C)
**Depends on:** none
**Decided:** 2026-05-14 — Add to TODOS.md

---

## Deferred from /plan-ceo-review (2026-05-05) — SEO Strategy Pivot

### TD-001 — Backlink Outreach Workflow [P1 → P0 conditional]

> **Priority elevation 2026-05-05 v2:** Outside voice review identified that 22 clicks/month + likely DR <5 means SEO is authority-bound, not quality-bound. If Wk0 root-cause investigation confirms DR < 5, this TODO becomes P0 and runs in parallel with Approach B Wk1 onwards.

**What:** Contact 5-10 relevant sites (AI agent listings, dev tool blogs, AI/automation newsletters) requesting backlinks to OpenClaw QQ Bot guide and Skills authority page.

**Why:** Current SEO plan (Approach B — cut/concentrate/rewrite) addresses on-site structure and content quality. It does NOT increase site authority (DR/DA). After 12 months, on-site optimization ceiling is reached and non-brand keyword competition will require external backlinks to rank.

**Pros:**
- Single highest-leverage move after Approach B completes
- Compounds: once a site links to you, it stays
- Differentiation from "just publish more content" SEO

**Cons:**
- Manual, slow process (2-4 weeks human / 3-5 days CC)
- Outreach response rates are typically 5-15%
- Requires a "link-worthy asset" — the rewritten authority page from B-4 must be 行业最强 first

**Context:**
- Current site DR/DA is unknown — measure before outreach
- Existing `report/link-builder/` directory has prior outreach plans (week1-pitches.md). Likely usable as foundation.
- Trigger this AFTER Approach B Week 5 (rewritten authority page is the asset to pitch)

**Effort:** human ~2-4 weeks / CC ~3-5 days
**Priority:** P0 if DR<5 confirmed in Wk0; else P1 post-B Wk5
**Depends on:** Wk0 DR check (escalation trigger) OR Approach B Week 5 (asset-readiness trigger)
**Decided:** 2026-05-05 v1 — Add to TODOS.md
**Revised:** 2026-05-05 v2 — Conditional P0 promotion based on Wk0 DR result

---

### TD-005 — Direct Distribution / Launch Workstream [P0 NEW v2]

**What:** Active distribution outside SEO channel:
1. Hacker News submission with thoughtful framing (one shot — needs prep)
2. Reddit posts to r/selfhosted, r/ChatGPTCoding, r/LocalLLaMA, r/devops as relevant
3. Product Hunt launch (requires polished landing + screenshots)
4. GitHub README polish — usage GIFs, quick-start, comparison table
5. Twitter/X dev-circle distribution

**Why:** Outside voice review (2026-05-05): "22 clicks/month = ~0.7/day. SEO ROI horizon is 6-12 months. A single HN front-page post yields 1000+ visits in 48h — equivalent to 12 months of optimistic SEO output." SEO + launch are not competitors; launch buys the authority that SEO needs to compound.

**Pros:**
- High-velocity audience acquisition (48h vs 12 months)
- Directly produces backlinks (resolves TD-001 P0 trigger)
- GitHub stars are a separate growth flywheel
- Tests product-market signal at scale, not just keyword fit

**Cons:**
- HN/PH are one-shot — can't relaunch, need polish first
- Requires landing page + GIFs + clear value prop
- Inviting feedback from a critical audience; quality bar is real
- Reddit subs have anti-promo norms; needs genuine value framing

**Context:**
- Catalyst: Outside voice tension #4 (Channel reframe), accepted 2026-05-05
- Existing assets: site is already live, /skills page works, blog has content
- Gap: GitHub README presentation, demo media, single-message value prop

**Effort:** human ~1-2 weeks (prep + execution) / CC ~2-3 days for landing/README polish
**Priority:** P0 (parallel with Approach B Wk0-Wk2)
**Depends on:** none — runs parallel
**Decided:** 2026-05-05 v2 — Channel mix dual track approved

---

### TD-006 — Wk0 Decision Branch Logic Documentation [P0 NEW v2]

**What:** Document the if/then decision tree for Wk0 root-cause investigation in `report/seo/wk0-decision-tree.md` so the branching is unambiguous when results come in.

**Why:** Three of the Wk0 outcomes (>40% legacy redirects / DR<5 / neither) have very different downstream actions. Without an explicit pre-committed decision tree, ambiguity at decision time will create rationalization opportunities.

**Pros:**
- Makes Wk0 results actionable instead of debatable
- Forces honest threshold setting (40%, DR 5) before bias kicks in

**Cons:**
- 30 minutes of "process" before "real work"

**Context:** Pre-commit decision criteria before observing data — classic practice from clinical trials.

**Effort:** human ~30 min / CC ~10 min
**Priority:** P0 (must complete before Wk0 investigation runs)
**Depends on:** none
**Decided:** 2026-05-05 v2

---

### TD-002 — 5 Supporting Pages (Approach A Remainder) [P3 — Conditional]

**What:** Build 5 new SEO-targeted pages: `/openclaw-qq-bot-setup`, `/openclaw-qq-bot-configuration`, `/openclaw-skills-list`, `/openclaw-skills-github`, `/openclaw-docker-compose`.

**Why:** Original SEO diagnosis recommended these. Currently rejected because index ratio is 33% — adding pages worsens the issue. Reconsider only if structural fix (Approach B) succeeds.

**Pros:**
- Granular keyword targeting at long-tail level
- Each page can rank independently if quality is high

**Cons:**
- ❌ Conflicts with index-rate goal at current 33%
- Brand-prefixed URLs reinforce brand-keyword ceiling
- Maintenance burden grows

**Context:**
- This was Approach A from the 2026-05-05 CEO review. User selected Approach B (cut + concentrate + rewrite) instead.
- Prerequisite: index ratio MUST be ≥75% AND non-brand traffic share ≥30% before building these.

**Trigger conditions (must ALL be met):**
1. Indexed page count ≥ 75% of total submitted
2. Non-brand traffic share ≥ 30% of total clicks (measured via GSC API report from CP-3)
3. At least 3 long-tail non-brand keywords ranking in top 10

**Effort:** human ~1-2 weeks / CC ~1 day
**Priority:** P3 (conditional)
**Depends on:** Approach B effects measured for ≥6 weeks
**Decided:** 2026-05-05 — Add to TODOS.md, condition-triggered

---

### TD-003 — Skills Explorer + Bot Setup Wizard (Approach C) [P2]

**What:** Build interactive product features:
1. **OpenClaw Skills Explorer** — interactive skill database with category filters, install command copy-paste
2. **OpenClaw Bot Setup Wizard** — 4-step form input → generate config file

**Why:** Tool pages naturally attract backlinks (dev community shares useful tools). Decouples site value from SEO content treadmill. Possible Q3 2026 product positioning move.

**Pros:**
- Differentiation from blog-only competitors
- Backlink-worthy assets (link bait)
- Direct user value, not SEO theater
- Reuses existing `/skills` API and `skill-categories` data

**Cons:**
- Higher technical implementation effort (~2-4 weeks human)
- ROI is slower (3-6 months for community traction)
- Out of scope for current SEO-focused work

**Context:**
- Originally proposed as Approach C in 2026-05-05 CEO review. User selected B; C deferred.
- Existing `/skills` and `/api/skills` already provide data foundation.
- Should follow successful Approach B execution to ensure SEO baseline is healthy.

**Effort:** human ~2-4 weeks / CC ~1-2 days
**Priority:** P2
**Depends on:** Approach B verified successful (4-week post-rollout review)
**Decided:** 2026-05-05 — Add to TODOS.md
