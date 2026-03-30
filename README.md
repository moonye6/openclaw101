# OpenClaw 101

> Your comprehensive guide to OpenClaw AI agent skills — 你的 OpenClaw AI 助手学习资源中心

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/moonye6/openclaw101)

## 🌟 About

OpenClaw 101 is a curated learning resource hub for [OpenClaw](https://openclaw.ai), the open-source AI assistant platform. It features 414+ tutorials, 5490+ skill listings, and a structured 7-day learning path — available in both English and Chinese.

**Live site**: [https://openclaw101.vip](https://openclaw101.vip)

## ✨ Features

- 📚 **414+ Curated Tutorials** — from official docs, cloud platforms, and community contributors
- 🧩 **5490+ Skill Listings** — browse and discover AI agent skills across 31 categories
- 🗓️ **7-Day Learning Path** — beginner to advanced, one topic per day
- 🌍 **Bilingual (EN/ZH)** — full i18n support via next-intl
- 📰 **SEO Optimized** — sitemap, robots.txt, RSS feed, JSON-LD, hreflang, Open Graph
- ⚡ **ISR Caching** — Incremental Static Regeneration for blazing-fast page loads

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 + Framer Motion 12 |
| Language | TypeScript 5 (strict mode) |
| i18n | next-intl 4 |
| Testing | Playwright (E2E) |
| Deploy | Vercel |
| Package Manager | pnpm |

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Setup

```bash
# Clone the repository
git clone https://github.com/moonye6/openclaw101.git
cd openclaw101

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local and fill in required values

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Build & Preview

```bash
pnpm build
pnpm start
```

### Lint & Validate

```bash
pnpm lint              # ESLint
pnpm lint:structure    # Custom structural checks (i18n keys, exports, etc.)
pnpm validate          # Both
```

### E2E Tests

```bash
pnpm test:e2e          # Run Playwright tests
pnpm test:ui           # Run with Playwright UI
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # i18n routes (en|zh)
│   ├── api/                # API routes
│   └── feed.xml/           # RSS feed
├── components/             # React components
│   ├── home/               # Homepage sections
│   ├── layout/             # Header & Footer
│   ├── seo/                # JSON-LD, FAQ, Breadcrumbs
│   ├── skills/             # Skills page components
│   ├── tutorials/          # Tutorials page components
│   └── ui/                 # Reusable UI primitives
├── data/                   # Static data files
├── i18n/                   # en.json / zh.json / routing
├── lib/                    # Utility functions
└── types/                  # TypeScript type definitions
```

## 🌐 Environment Variables

See [`.env.example`](.env.example) for the full list.

| Variable | Required | Description |
|----------|----------|-------------|
| `CRON_SECRET` | Yes | Auth token for Vercel Cron jobs |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics tracking ID |
| `BASE_URL` | No | Site base URL for RSS/links |

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read [AGENTS.md](AGENTS.md) for development conventions and workflow guidelines.
