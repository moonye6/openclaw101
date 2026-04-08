---
name: ai-agent-hub-upgrade
overview: 将 OpenClaw 101 从"教程展示站"升级为"AI Agent 入门 Hub"，新建 /guide、/use-cases（含 6 个子页面）、/examples 三大 Hub 页面，改造首页 HeroSection 为流量分发器，更新导航结构和内链网络。
todos:
  - id: create-data-and-i18n
    content: 创建 use-cases.ts 数据文件，并在 en.json 和 zh.json 中新增 guidePage、useCasesPage、examplesPage、internalLinks、nav.guide、nav.useCases 全部翻译 key
    status: completed
  - id: create-internal-links
    content: 创建 src/components/shared/InternalLinks.tsx 通用内链导航组件，支持 currentPage 高亮和 5 个 Hub 入口链接
    status: completed
    dependencies:
      - create-data-and-i18n
  - id: create-guide-page
    content: 创建 /guide 页面：src/app/[locale]/guide/page.tsx（Server Component + SEO）和 src/components/guide/GuidePageClient.tsx（TOC + 内容渲染 + InternalLinks）
    status: completed
    dependencies:
      - create-internal-links
  - id: create-use-cases-pages
    content: 创建 /use-cases 总页面和 [slug] 动态子页面：src/app/[locale]/use-cases/page.tsx、src/app/[locale]/use-cases/[slug]/page.tsx、src/components/use-cases/UseCaseDetail.tsx
    status: completed
    dependencies:
      - create-internal-links
  - id: create-examples-page
    content: 创建 /examples 聚合页面 src/app/[locale]/examples/page.tsx，展示案例列表并链接到对应博客和教程
    status: completed
    dependencies:
      - create-internal-links
  - id: update-homepage-and-nav
    content: 改造 HeroSection.tsx CTA 按钮指向新 Hub 页面，更新 Header.tsx 导航增加 Guide 和 Use Cases 入口
    status: completed
    dependencies:
      - create-guide-page
      - create-use-cases-pages
      - create-examples-page
---

## 产品概述

将 OpenClaw 101 网站从"OpenClaw 教程展示站"升级为"AI Agent Beginner Hub（流量入口站）"。通过新建 Hub 页面体系、改造首页流量分发、建立内链网络，构建以 AI Agent 为核心关键词的 SEO 驱动型网站架构。

## 核心功能

1. **新建 /guide 页面（AI Agent Guide 核心入口页）**：全站 SEO 权重中心，长页面结构含 TOC 导航，内容覆盖"定义 - 方法 - 工具 - 示例 - 教程入口"，密集内链到其他 Hub 页面

2. **新建 /use-cases 页面体系（总页 + 6 个子页）**：将首页 UseCases 组件的 6 个场景（编程/研究/自动化/内容/智能家居/数据）拆分为独立 SEO 页面，每个子页含场景描述、推荐教程、推荐技能和内链导航

3. **新建 /examples 页面（案例聚合页）**：列表型高 CTR 页面，聚合 Telegram Bot 示例和 AI Agent 使用案例，每个案例可点击跳转到对应教程或博客文章

4. **首页 HeroSection 改造为流量分发器**：主 CTA 指向 /guide，次 CTA 指向 /use-cases，第三入口指向 /skills，突出三大流量入口

5. **导航结构升级**：Header 导航从 4 项扩展为 6 项（新增 Guide 和 Use Cases），建立清晰的站点层级

6. **内链网络组件**：创建通用 InternalLinks 组件，在所有 Hub 页面底部嵌入标准化内链导航模块，形成 Guide - Use Cases - Tutorials - Examples - Skills 的网状互链结构

## 技术栈

- 框架：Next.js 16 + React 19 + TypeScript 5 (strict)
- 样式：Tailwind CSS v4 + Framer Motion 12
- 国际化：next-intl 4（en/zh 双语）
- 数据架构：纯静态数据文件（src/data/）
- SEO：JSON-LD 结构化数据 + generateMetadata
- 部署：Vercel

## 实现方案

采用渐进式 Hub 页面扩展策略。基于现有 Next.js App Router 的 [locale] 动态路由体系，新增 3 个顶级路由段（guide / use-cases / examples），复用已有的数据层（posts-ai-agent-guide.ts / UseCases 组件数据 / posts-telegram.ts）构建 Hub 页面内容。所有新页面遵循项目既有的 Server Component + Client Component 分离模式（page.tsx 做 SEO metadata + JSON-LD，Client 组件做交互渲染），确保 ISR 缓存策略一致（revalidate = 3600）。

关键技术决策：

- Guide 页面采用独立页面模式而非博客文章渲染，因为 Hub 页面需要自定义的 TOC 导航、内链模块和独特的页面布局，与博客文章模板（BlogPostClient）的展示逻辑不同
- Use Cases 采用 [slug] 动态路由 + generateStaticParams 静态生成 6 个子页面，数据从新建的 use-cases.ts 数据文件读取
- InternalLinks 通用组件采用 useTranslations 获取文本，通过 props 控制当前页面类型以高亮/隐藏自身链接

## 实现注意事项

- 所有新增页面文本必须同步更新 en.json 和 zh.json，key 结构保持对称，否则 lint:structure 校验会失败
- 新页面使用 `<section>` 或 `<div>` 作为根元素，不能用 `<main>`（layout.tsx 已包裹 `<main>`）
- HeroSection 中 H1 标题文本已通过 i18n 获取（`t('title')`），CTA 按钮文本也需走 i18n
- Header 导航项数组从 navItems 硬编码改为 6 项时，需考虑移动端汉堡菜单的空间布局
- 博客内页已有的内链（如 /blog/telegram-bot-examples）需确保路由仍然有效

## 架构设计

```mermaid
graph TB
    HP[Homepage<br/>流量分发器] -->|主CTA| G[/guide<br/>AI Agent Guide<br/>SEO权重中心]
    HP -->|次CTA| UC[/use-cases<br/>Use Cases 总页<br/>流量池]
    HP -->|第三入口| SK[/skills<br/>Tools/Skills<br/>转化页]
    
    G --> UC
    G --> SK
    G --> TU[/tutorials<br/>教程承接页]
    G --> EX[/examples<br/>案例聚合页]
    
    UC --> UC1[/use-cases/coding]
    UC --> UC2[/use-cases/research]
    UC --> UC3[/use-cases/automation]
    UC --> UC4[/use-cases/content]
    UC --> UC5[/use-cases/smarthome]
    UC --> UC6[/use-cases/data]
    
    UC -->|内链| TU
    UC -->|内链| SK
    
    EX -->|内链| TU
    EX -->|内链| SK
    EX -->|内链| G
    
    TU -->|内链| EX
    TU -->|内链| SK
    
    SK -->|内链| G

    style G fill:#2563eb,color:#fff
    style UC fill:#8b5cf6,color:#fff
    style EX fill:#f59e0b,color:#000
    style SK fill:#10b981,color:#fff
    style HP fill:#ef4444,color:#fff
```

## 目录结构

```
src/
├── app/[locale]/
│   ├── guide/
│   │   └── page.tsx                    # [NEW] AI Agent Guide Hub 页面。Server Component，含 generateMetadata（目标关键词：how to build ai agent without coding）、Article JSON-LD、BreadcrumbList JSON-LD。渲染 GuidePageClient 组件
│   ├── use-cases/
│   │   ├── page.tsx                    # [NEW] Use Cases 总页面。Server Component，含 CollectionPage JSON-LD。展示 6 个 use case 卡片网格，每个链接到子页面
│   │   └── [slug]/
│   │       └── page.tsx                # [NEW] Use Case 子页面。动态路由，generateStaticParams 生成 6 个静态页面。每个含场景描述、推荐教程列表、推荐技能列表、InternalLinks
│   └── examples/
│       └── page.tsx                    # [NEW] Examples 聚合页面。Server Component，含 ItemList JSON-LD。列表展示 10+ 案例条目，每个链接到对应 blog/tutorial
├── components/
│   ├── guide/
│   │   └── GuidePageClient.tsx         # [NEW] Guide 页面客户端组件。包含：粘性 TOC 侧边栏、Markdown 内容渲染（复用 BlogPostClient 的 markdownToHtml 逻辑）、底部 InternalLinks、FAQ Schema
│   ├── use-cases/
│   │   └── UseCaseDetail.tsx           # [NEW] Use Case 子页面客户端组件。场景 Hero 区 + 推荐教程卡片 + 推荐技能卡片 + InternalLinks
│   ├── shared/
│   │   └── InternalLinks.tsx           # [NEW] 通用内链导航组件。接收 currentPage prop 控制高亮，渲染 5 个 Hub 链接（Guide/Use Cases/Skills/Tutorials/Examples），使用 i18n 文本，Framer Motion 入场动画
│   └── home/
│       └── HeroSection.tsx             # [MODIFY] 改造 CTA 按钮：主按钮指向 /guide，次按钮指向 /use-cases，移除现有的 AI Agent Guide 文字链接（已升级为主 CTA）
├── layout/
│   └── Header.tsx                      # [MODIFY] 导航项从 4 个扩展为 6 个，新增 Guide（/guide）和 Use Cases（/use-cases），调整移动端菜单布局
├── data/
│   └── use-cases.ts                    # [NEW] Use Case 数据文件。定义 UseCase 接口（slug/titleKey/descriptionKey/icon/gradient/relatedTutorialIds/relatedSkillIds/seoKeywords），导出 6 条数据及查询函数
├── i18n/
│   ├── en.json                         # [MODIFY] 新增 guidePage/useCasesPage/examplesPage/internalLinks/nav.guide/nav.useCases 翻译模块
│   └── zh.json                         # [MODIFY] 同步新增对应中文翻译模块
└── components/ui/
    └── index.ts                        # [MODIFY] 导出 InternalLinks 组件（如果放在 shared/ 则不需要改此文件）
```

## Agent Extensions

### SubAgent

- **code-explorer**
- 用途：在实现过程中按需搜索现有组件模式、数据结构和翻译 key 格式，确保新代码与项目约定一致
- 预期结果：获取精确的代码引用和模式示例，避免实现偏差