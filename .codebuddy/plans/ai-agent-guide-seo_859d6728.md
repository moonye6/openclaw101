---
name: ai-agent-guide-seo
overview: 按照用户提供的SEO标准模板创建AI Agent Guide核心博客文章（id 24, slug ai-agent-guide），注册到博客数据汇总，在首页HeroSection添加CTA入口，在sitemap中设置0.9优先级。不包含i18n翻译任务。
todos:
  - id: create-article-data
    content: 创建 src/data/blog/posts-ai-agent-guide.ts 博客文章数据文件，包含完整的 8 章节英文正文、中文版本、SEO 关键词布局和内链网络，使用 [subagent:code-explorer] 参考现有 Telegram 系列文章格式
    status: completed
  - id: register-and-fix-links
    content: 修改 src/data/blog/index.ts 注册新文章，并在 BlogPostClient.tsx 的 markdownToHtml 中新增 Markdown 链接语法的正则转换规则
    status: completed
    dependencies:
      - create-article-data
  - id: homepage-cta-and-sitemap
    content: 修改 HeroSection.tsx 添加首页 CTA 入口链接，修改 sitemap.ts 将 ai-agent-guide 加入高优先级集合
    status: completed
    dependencies:
      - register-and-fix-links
  - id: save-seo-template
    content: 沉淀 SEO 标准模板到 docs/seo-article-template.md，作为后续创建类似 SEO 文章的参考模板
    status: completed
---

## 用户需求

沉淀 SEO 标准模板，并创建 "AI Agent Guide" 核心博客文章作为网站的 "Create 入口主文章"。

## 产品概述

基于用户提供的 SEO 标准模板，创建一篇高质量的 AI Agent Guide 博客文章，定位为网站的核心入口文章，通过精准的关键词布局吸引 "AI Agent" 相关搜索流量，并通过内链闭环串联网站已有的 Telegram Bot 系列文章、教程和学习路径。

## 核心功能

1. **创建核心博客文章** — slug 为 `ai-agent-guide`，包含完整的 8 段式结构（Introduction / Getting Started / Create Your First Agent / Examples / Automation / Advanced Tips / FAQ / Conclusion），每段精准布局核心关键词 "AI Agent"、次级关键词 "OpenClaw Agent / Beginner AI Agent"、长尾关键词 "How to create AI agent / AI agent tutorial / Build AI without coding"
2. **内链闭环** — 文章内部链接到 `/learn/1`（Day 1 安装教程）、`/blog/telegram-bot-examples`（案例）、`/blog/telegram-automation-guide`（自动化）、`/blog/telegram-bot-api-tutorial`（API）、`/blog/best-telegram-bot-tools`（工具），形成完整的内链网络
3. **首页 CTA 入口** — 在 HeroSection 添加醒目的 CTA 链接引导用户进入该文章，文案为 "Build Your First AI Agent -- Step by Step Guide for Beginners. Start Today!"
4. **Sitemap SEO 优化** — 将该文章 priority 提升至 0.9，与 Telegram 系列文章同级，确保搜索引擎优先收录

## 技术栈

- 前端框架：Next.js 16 + React 19 + TypeScript 5
- 样式方案：Tailwind CSS v4 + Framer Motion 12
- 国际化：next-intl 4（本次不涉及 i18n 翻译修改）
- 数据架构：纯静态 TS 数据文件

## 实现方案

### 整体策略

遵循项目现有的博客数据架构模式：在 `src/data/blog/` 下新建数据文件，导出符合 `BlogPost` 接口的文章数据，然后在 `index.ts` 中注册。博客详情页的 SEO metadata、JSON-LD 结构化数据、静态路径生成均由现有框架自动处理，无需修改页面代码。

### 关键技术决策

1. **文章数据文件独立** — 新建 `posts-ai-agent-guide.ts` 而非追加到现有文件，保持模块分离，遵循项目现有的按系列分文件模式（core/basics/advanced/telegram）
2. **内链使用 Markdown 链接语法** — 虽然 BlogPostClient 的 `markdownToHtml` 正则渲染器不支持 `[text](url)` 语法，但现有 Telegram 系列文章已大量使用该语法（57+ 处），说明这是项目既定惯例。内链仍用 `[text](/blog/slug)` 格式，与现有文章保持一致
3. **首页 CTA 直接硬编码英文文案** — 因用户明确跳过 i18n 任务，且网站已移除中文切换入口，CTA 文案直接写英文字符串即可
4. **Sitemap 优化采用扩展 Set 方式** — 将 `TELEGRAM_SLUGS` 重命名为更通用的 `SEO_CORE_SLUGS`，将 `ai-agent-guide` 加入该集合，统一管理高优先级文章

### Markdown 渲染器链接支持

经验证，现有渲染器不支持 `[text](url)` 链接语法转换为 HTML `<a>` 标签。需要在 `BlogPostClient.tsx` 的 `markdownToHtml` 函数中新增一条正则规则，使文章内的内链能正确渲染为可点击链接。这是必要的改动，否则新文章（以及现有 Telegram 系列文章）中的所有内链都无法正常工作。

## 实现注意事项

1. **BlogPost 中文字段** — 虽然网站只显示英文，但 `BlogPost` 类型要求 `title`、`excerpt`、`content` 中文字段必须填写，需提供对应中文内容
2. **文章 id 分配** — 现有最大 id 为 23（Telegram 系列），新文章使用 id 24
3. **日期格式** — 遵循现有格式 `YYYY-MM-DD`，设为 `2026-04-07`（当天）
4. **image 字段** — 使用已有的 `/og-image.png` 作为文章图片
5. **内链 slug 准确性** — 用户模板中提到 `telegram-bot-api-guide`，实际项目中的 slug 是 `telegram-bot-api-tutorial`，需使用正确的 slug
6. **Sitemap BUILD_DATE** — 更新为当前日期 `2026-04-07`

## 架构设计

```mermaid
graph TD
    A[首页 HeroSection] -->|CTA 链接| B[/blog/ai-agent-guide]
    B -->|内链| C[/learn/1 Day 1 安装教程]
    B -->|内链| D[/blog/telegram-bot-examples]
    B -->|内链| E[/blog/telegram-automation-guide]
    B -->|内链| F[/blog/telegram-bot-api-tutorial]
    B -->|内链| G[/blog/best-telegram-bot-tools]
    D -->|反向内链| B
    E -->|反向内链| B
    F -->|反向内链| B
    G -->|反向内链| B
    
    subgraph SEO
        H[sitemap.ts] -->|priority 0.9| B
        I[JSON-LD BlogPosting] --- B
        J[generateMetadata] --- B
    end
```

## 目录结构

```
src/
├── data/
│   └── blog/
│       ├── posts-ai-agent-guide.ts    # [NEW] AI Agent Guide 核心文章数据，包含完整的中英文 BlogPost 对象（id:24, slug:ai-agent-guide），contentEn 为约 3000 词的 Markdown 正文，覆盖 8 个 H2 章节、SEO 关键词布局和内链网络
│       └── index.ts                   # [MODIFY] 导入 postsAiAgentGuide 并合并到 blogPosts 数组
├── app/
│   ├── [locale]/
│   │   └── blog/
│   │       └── [slug]/
│   │           └── BlogPostClient.tsx # [MODIFY] 在 markdownToHtml 中新增 Markdown 链接语法 [text](url) 到 HTML <a> 标签的正则转换规则
│   └── sitemap.ts                     # [MODIFY] 将 TELEGRAM_SLUGS 重命名为 SEO_CORE_SLUGS，加入 ai-agent-guide，更新 BUILD_DATE
├── components/
│   └── home/
│       └── HeroSection.tsx            # [MODIFY] 在 CTA 按钮区域下方新增一行指向 /blog/ai-agent-guide 的 CTA 入口链接
└── docs/
    └── seo-article-template.md        # [NEW] 沉淀 SEO 标准模板文档，作为后续创建类似文章的参考模板
```

## Agent Extensions

### SubAgent

- **code-explorer**
- 用途：在创建文章数据文件时，快速查阅现有 Telegram 系列文章的完整内容格式和内链模式，确保新文章风格一致
- 预期结果：获取现有文章的 Markdown 结构、内链格式和 CTA 文案风格作为参考