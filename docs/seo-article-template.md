# SEO 标准模板 — OpenClaw 101

> 本模板用于创建 SEO 优化的核心博客文章，确保关键词布局、内链闭环和首页入口的一致性。

---

## 1️⃣ 页面信息

| 字段 | 说明 | 示例 |
|------|------|------|
| **Title** | 包含核心关键词，60 字符以内 | `AI Agent Guide — Build Your First OpenClaw AI Agent Step by Step` |
| **H1** | 与 Title 相近但不完全相同，包含核心关键词 | `AI Agent Guide: Create Your First AI Agent with OpenClaw 101` |
| **Meta Description** | 150-160 字符，包含核心关键词和 CTA | `Learn how to build your first AI agent using OpenClaw 101. Step-by-step beginner-friendly guide with real examples, no coding required. Start today!` |
| **URL Slug** | 简短、包含核心关键词、kebab-case | `ai-agent-guide` |

---

## 2️⃣ 核心关键词布局

| 类型 | 关键词 | 出现位置 |
|------|--------|---------|
| **核心** | 主关键词（如 AI Agent） | Title, H1, 首段, Meta Description, URL |
| **次级** | 品牌词+核心词（如 OpenClaw Agent） | H2/H3, 正文段落, 内链 anchor text |
| **长尾** | 问句/教程型（如 How to create AI agent） | 正文小节、列表、FAQ、内部链接文案 |

---

## 3️⃣ 文章结构（8 段式）

### H2: Introduction — Why [Topic] Matters
- 核心关键词出现在首段
- 说明价值和适用人群

### H2: Getting Started — Installing/Setup
- 步骤说明安装配置
- **内链**：指向 Day 1 安装教程 (`/learn/1`)

### H2: Create Your First [Topic]
- 分步骤指南（Step 1-4）
- 涵盖多平台（Telegram/Discord/WhatsApp）
- **内链**：Create Guide、Examples

### H2: Examples — Real Use Cases
- 展示 3-5 个真实案例
- **内链**：具体案例文章（如 `/blog/telegram-bot-examples`）

### H2: Automation Workflows
- 说明自动化架构和工作流
- **内链**：自动化指南（如 `/blog/telegram-automation-guide`）

### H2: Advanced Tips & Tools
- 进阶技巧和工具推荐
- **内链**：API 指南 + 工具对比文章

### H2: FAQ / Common Issues
- 针对长尾关键词设计 Q&A
- **内链**回 Create Guide + Examples
- 每个问题用 `### 问题` 格式

### H2: Conclusion — Start Building Today
- 强调行动 CTA
- 提供完整的学习路径链接

---

## 4️⃣ 内链闭环策略

```
首页 → 核心文章（本文）
核心文章 → Examples / Automation / API / Tools
相关文章 → 核心文章（反向链接）
CTA 路径：Day 1 → Create → Examples → Automation → Tools
```

### 内链规则
- 每篇相关文章的底部添加指向核心文章的链接
- 核心文章中每个 H2 至少包含 1 个内链
- 使用描述性 anchor text，包含关键词

---

## 5️⃣ CTA 与首页挂载

### 首页入口文案
> Build Your First [Topic] — Step by Step Guide for Beginners. Start Today!

### 文章内 CTA
> Ready to build your [topic]? Start with OpenClaw 101 Day 1 tutorial →

### CTA 放置位置
- 文章开头（Quick Navigation 表格）
- 文章中间（Examples 之后）
- 文章结尾（Final Learning Path 表格）

---

## 6️⃣ 技术实现清单

- [ ] 新建 `src/data/blog/posts-[slug].ts` 数据文件
- [ ] 在 `src/data/blog/index.ts` 中注册
- [ ] 在 `src/app/sitemap.ts` 中设置高优先级（0.9）
- [ ] 在 `src/components/home/HeroSection.tsx` 添加首页 CTA
- [ ] 确保 `BlogPostClient.tsx` 的 markdown 渲染器支持所有用到的语法
- [ ] 填写中英文双语内容（BlogPost 类型要求）
- [ ] 设置合适的 tags 和 category

---

## 7️⃣ 数据文件格式参考

```typescript
import type { BlogPost } from './types';

export const postsExample: BlogPost[] = [
  {
    id: <下一个可用 id>,
    slug: "<关键词-kebab-case>",
    title: "<中文标题>",
    titleEn: "<英文标题，包含核心关键词>",
    excerpt: "<中文摘要>",
    excerptEn: "<英文 Meta Description，150-160 字符>",
    content: `<中文 Markdown 正文>`,
    contentEn: `<英文 Markdown 正文，包含完整 SEO 内容>`,
    author: "OpenClaw 101",
    date: "<YYYY-MM-DD>",
    category: "<中文分类>",
    categoryEn: "<英文分类>",
    tags: ["关键词1", "关键词2", ...],
    readingTime: <阅读分钟数>,
    image: "/og-image.png"
  },
];
```

---

## 8️⃣ SEO 检查清单

- [ ] 核心关键词出现在 Title、H1、首段、Meta Description、URL
- [ ] 每个 H2 段落包含次级或长尾关键词
- [ ] FAQ 部分覆盖主要长尾关键词
- [ ] 内链完整覆盖所有相关文章
- [ ] 相关文章底部有反向链接到本文
- [ ] 文章长度 2000-3000 词（英文）
- [ ] 包含表格、列表、代码块等结构化内容
- [ ] Sitemap 优先级设为 0.9

---

*最后更新: 2026-04-07*
