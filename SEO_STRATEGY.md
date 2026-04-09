# OpenClaw 101 SEO Optimization Strategy

## Phase 0: Fix Critical Blockers (Day 1)

### 0.1 Verify Google Can Crawl the Site
- [ ] Log in to Google Search Console (https://search.google.com/search-console)
- [ ] Check "Pages" report — how many pages indexed?
- [ ] Check "Sitemaps" — is sitemap.xml submitted and readable?
- [ ] Use "URL Inspection" tool to test homepage crawl
- [ ] Check if Cloudflare/Vercel WAF blocks Googlebot (check server logs)

### 0.2 Fix robots.txt Conflict
- [ ] Verify the LIVE robots.txt at openclaw101.vip/robots.txt matches the code
- [ ] If CDN/hosting is injecting extra rules, disable that feature
- [ ] robots.txt should ONLY contain:
  ```
  User-agent: *
  Allow: /
  Disallow: /api/
  Sitemap: https://openclaw101.vip/sitemap.xml
  ```

### 0.3 Submit Sitemap to Google
- [ ] Go to Search Console > Sitemaps
- [ ] Submit: https://openclaw101.vip/sitemap.xml
- [ ] Verify it returns 200 (not 403)

---

## Phase 1: Keyword Research & Competitor Analysis (Day 2-3)

### 1.1 Target Keywords (by search volume tier)

**Tier 1 — High Volume (1K-10K/mo):**
- "what is an AI agent"
- "how to create telegram bot"
- "telegram bot tutorial 2026"
- "AI agent framework comparison"
- "open source AI assistant"

**Tier 2 — Medium Volume (500-1K/mo):**
- "openclaw tutorial"
- "openclaw vs chatgpt"
- "openclaw installation guide"
- "self-hosted AI agent"
- "telegram bot automation"

**Tier 3 — Long Tail (<500/mo, high conversion):**
- "openclaw common errors fix"
- "openclaw installation troubleshooting"
- "openclaw vs langchain comparison"
- "how to install openclaw on mac"
- "openclaw feishu integration"

### 1.2 Competitor Sites to Analyze

| Competitor | Why | What to Learn |
|-----------|-----|--------------|
| n8n.io/blog | Automation tool, strong SEO | Content structure, internal linking |
| langchain.com/docs | AI framework, ranks for "AI agent" | Doc organization, keyword targeting |
| core.telegram.org/bots | Official Telegram docs | Ranks for all "telegram bot" queries |
| autoGPT.net | AI agent competitor | Blog strategy, comparison articles |
| docs.anthropic.com | Claude docs | Technical content SEO |

### 1.3 Competitor Analysis Checklist
For each competitor:
- [ ] What keywords do they rank for? (use Ahrefs/Semrush free tools)
- [ ] What content format works? (tutorial, comparison, list, guide)
- [ ] How many backlinks? From where?
- [ ] What's their content update frequency?
- [ ] What topics do they cover that we don't?

---

## Phase 2: Content Gap Analysis & New Content Plan (Day 4-7)

### 2.1 Missing High-Value Content

Based on competitor analysis, these topics are likely gaps:

| Topic | Target Keyword | Expected Volume | Priority |
|-------|---------------|----------------|----------|
| "What is an AI Agent" (pillar page) | what is ai agent | 5K+ | HIGH |
| "OpenClaw vs AutoGPT" | openclaw vs autogpt | 500+ | HIGH |
| "How to Automate with AI" (pillar) | ai automation guide | 2K+ | HIGH |
| "Telegram Bot for Business" | telegram bot business use | 1K+ | MEDIUM |
| "Self-Hosted AI: Complete Guide" | self hosted ai assistant | 800+ | MEDIUM |
| "OpenClaw Docker Setup" | openclaw docker | 300+ | MEDIUM |
| "Free AI Agent Tools 2026" | free ai agent tools | 1K+ | HIGH |
| "AI Agent Security Best Practices" | ai agent security | 500+ | MEDIUM |

### 2.2 Content Improvement Plan (Existing Pages)

| Current Page | Issue | Action |
|-------------|-------|--------|
| Homepage | No body text for Google to index (mostly components) | Add 300+ words of crawlable text |
| /guide | Check if content is server-rendered | Ensure SSR, not client-only |
| Blog posts | Some may lack internal links | Add 2-3 internal links per post |
| All pages | Missing breadcrumbs in some | Ensure BreadcrumbList schema everywhere |

---

## Phase 3: Technical SEO Hardening (Day 7-10)

### 3.1 Core Web Vitals
- [ ] Run PageSpeed Insights on top 5 pages
- [ ] Fix LCP (Largest Contentful Paint) — target < 2.5s
- [ ] Fix CLS (Cumulative Layout Shift) — target < 0.1
- [ ] Fix INP (Interaction to Next Paint) — target < 200ms

### 3.2 Internal Linking Strategy
Every blog post should link to:
- 2-3 other related blog posts
- 1 pillar page (guide, skills, or use-cases)
- The relevant learning path day

Every pillar page should link to:
- 5+ relevant blog posts
- Other pillar pages

### 3.3 Schema Markup Audit
- [ ] Verify all blog posts have BlogPosting schema
- [ ] Verify FAQ pages have FAQPage schema
- [ ] Add HowTo schema to tutorial posts
- [ ] Verify BreadcrumbList on all detail pages
- [ ] Test with Google Rich Results Test tool

### 3.4 Page Speed Optimizations
- [ ] Lazy load below-fold images
- [ ] Preload critical fonts
- [ ] Minimize JS bundle size
- [ ] Enable Brotli compression (Vercel default)

---

## Phase 4: Off-Site SEO (Ongoing)

### 4.1 Backlink Strategy
- [ ] Submit to directories: Product Hunt, AlternativeTo, ToolFinder
- [ ] Write guest posts on dev.to, hashnode, medium
- [ ] Answer questions on Stack Overflow, Reddit (r/selfhosted, r/artificial)
- [ ] Create GitHub discussions/issues with links back
- [ ] Reach out to AI tool comparison sites for listing

### 4.2 Social Signals
- [ ] Share new articles on Twitter/X with relevant hashtags
- [ ] Post tutorials on Reddit (r/telegram, r/selfhosted, r/artificial)
- [ ] Cross-post to dev.to and hashnode

---

## Phase 5: Monitoring & Continuous Iteration (Weekly)

### 5.1 Weekly SEO Check (every Monday)
```
1. Check Search Console:
   - Impressions trend (up or down?)
   - Click-through rate by page
   - Any crawl errors?
   - New indexed pages?

2. Check rankings for target keywords:
   - Use free rank tracker (e.g., whatsmyserp.com)
   - Track top 15 keywords

3. Identify this week's action:
   - Which page has high impressions but low CTR? → Improve title/description
   - Which keyword is on page 2? → Strengthen that content
   - Any new crawl errors? → Fix immediately
```

### 5.2 Monthly Content Calendar
- Week 1: Publish 1 new article (target a specific keyword)
- Week 2: Update 2 existing articles (add depth, fix outdated info)
- Week 3: Build 2-3 backlinks (guest post, directory, forum)
- Week 4: Technical audit + fix any issues

### 5.3 Quarterly Review
- Compare rankings vs. 3 months ago
- Identify top 5 performing pages — double down
- Identify bottom 5 pages — improve or consolidate
- Update competitor analysis
- Adjust keyword targets based on data

---

## Automation with Claude Code

You can automate parts of this with Claude Code:

### Daily: Check site health
```bash
# Verify sitemap is accessible
curl -s -o /dev/null -w "%{http_code}" https://openclaw101.vip/sitemap.xml

# Check page response times
curl -s -o /dev/null -w "%{time_total}" https://openclaw101.vip/
```

### Weekly: Content audit
Use Claude Code to:
- Scan all blog posts for word count, internal links, schema markup
- Compare against competitor content on same keywords
- Generate improvement suggestions

### Monthly: New content generation
Use Claude Code to:
- Research trending keywords in the AI agent space
- Draft new articles based on content gaps
- Update existing articles with latest information

---

## Priority Action Items (Start Here)

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| 1 | Verify Google can crawl site (Search Console) | CRITICAL | 30 min |
| 2 | Fix robots.txt / sitemap 403 issue | CRITICAL | 1 hour |
| 3 | Submit sitemap to Google Search Console | HIGH | 10 min |
| 4 | Run keyword research with free tools | HIGH | 2 hours |
| 5 | Add internal links to all blog posts | HIGH | 2 hours |
| 6 | Write 2-3 new pillar content pages | HIGH | 1 day |
| 7 | Submit to Product Hunt / directories | MEDIUM | 1 hour |
| 8 | Set up weekly monitoring routine | MEDIUM | 30 min |
