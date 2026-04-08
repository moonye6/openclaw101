import type { BlogPost } from './types';

// Google AdSense 过审核心 Guides 文章 (id 27-28)
export const postsAdSenseGuides: BlogPost[] = [
  {
    id: 27,
    slug: "is-openclaw-free-pricing-guide",
    title: "OpenClaw 免费吗？定价、使用方式和限制完整解析",
    titleEn: "Is OpenClaw Free? Pricing, Access, and Limitations Explained",
    excerpt: "深入了解 OpenClaw 的定价模式——它完全免费吗？使用时有哪些费用？本文全面解析 OpenClaw 的成本结构、免费功能和付费部分。",
    excerptEn: "Understand OpenClaw's pricing model in full. Is it completely free? What costs are involved? This guide covers the cost structure, free features, and what you may need to pay for.",
    content: `很多人在了解 OpenClaw 时首先会问的问题就是：它免费吗？

简短回答是：**OpenClaw 本身完全免费且开源**。但使用过程中可能涉及一些额外费用。让我们详细解析。

## OpenClaw 是什么？

在谈论定价之前，先快速回顾一下。OpenClaw 是一个开源 AI 智能体框架，它在你的本地计算机上运行，可以执行代码、管理文件、搜索网络、连接消息平台等。它不是一个云服务——而是你自己安装和运行的软件。

## 完全免费的部分

以下是 OpenClaw 中完全免费的内容：

### 核心软件
- OpenClaw 框架本身是 100% 开源的（MIT 许可证）
- 你可以从 [GitHub](https://github.com/openclaw/openclaw) 免费下载
- 没有付费墙、没有高级版、没有订阅费
- 目前已有 314,000+ GitHub Star，是最受欢迎的开源 AI 项目之一

### 社区技能
- ClawHub 上的 97+ 社区技能全部免费
- 包括 GitHub 集成、网页搜索、天气查询、代码生成等
- 你也可以免费创建和发布自己的技能

### 平台连接器
- Telegram、Discord、WhatsApp、Slack、飞书等平台连接器免费
- 配置过程简单，无需额外付费

## 可能需要付费的部分

虽然 OpenClaw 本身免费，但以下部分可能产生费用：

### 1. AI 模型 API 费用

这是使用 OpenClaw 的**主要费用**。OpenClaw 需要连接一个 AI 大模型来工作：

| 模型提供商 | 费用范围 | 说明 |
|-----------|---------|------|
| Anthropic Claude | ~$3-15/百万 token | 推荐用于复杂任务 |
| OpenAI GPT | ~$2-60/百万 token | 根据模型版本不同 |
| Google Gemini | 免费层级可用 | 有每日限额 |
| 本地模型 (Ollama) | 免费 | 需要较强硬件 |

**节省费用的建议：**
- 简单任务用便宜的模型（如 GPT-4o-mini）
- 复杂任务才用高端模型
- 使用本地模型（如 Llama 3）可以完全免费
- 大多数个人用户每月费用在 $5-20 之间

### 2. 服务器托管费用（可选）

如果你想 24/7 运行 OpenClaw（比如作为 Telegram Bot 全天服务），你需要一台服务器：

| 方案 | 费用 | 适合场景 |
|------|------|---------|
| 本地电脑 | 免费（电费） | 偶尔使用 |
| 树莓派 | 一次性 ~$50-100 | 家庭自动化 |
| 云服务器 | ~$5-20/月 | 全天候运行 |
| 阿里云/腾讯云 | ~¥30-100/月 | 国内用户 |

### 3. 第三方服务费用（可选）

某些高级用法可能涉及第三方服务：
- 网页搜索 API（如 Google Search API）
- 图片生成 API（如 DALL-E）
- 特定数据库或存储服务

## 免费替代方案

如果你想完全零成本使用 OpenClaw，这是可能的：

1. **使用本地 AI 模型**：通过 Ollama 运行 Llama 3、Mistral 或 Qwen，完全在本地运行，无需 API 费用
2. **在自己的电脑上运行**：不需要云服务器
3. **使用免费技能**：ClawHub 上所有技能都是免费的
4. **使用免费层级 API**：Google Gemini 等提供一定的免费额度

## 与其他工具的费用对比

| 工具 | 月费用 | 说明 |
|------|--------|------|
| ChatGPT Plus | $20/月 | 固定订阅费 |
| Claude Pro | $20/月 | 固定订阅费 |
| GitHub Copilot | $10-19/月 | 仅编程辅助 |
| OpenClaw | $0-20/月 | 按 API 使用量计费，可完全免费 |

OpenClaw 的优势在于：你只为实际使用量付费，没有固定订阅费。而且因为它是开源的，你永远不会被锁定在某个服务中。

## 总结

| 问题 | 答案 |
|------|------|
| OpenClaw 软件免费吗？ | 是的，100% 免费开源 |
| 使用时有费用吗？ | AI 模型 API 可能有少量费用 |
| 能完全免费使用吗？ | 可以，使用本地模型即可 |
| 月均费用是多少？ | 大多数用户 $0-20 |
| 有付费高级版吗？ | 没有，所有功能免费 |

## 下一步

如果你准备开始使用 OpenClaw：
- 阅读我们的[新手入门指南](/en/guide)
- 查看[安装教程](/en/blog/how-to-install-openclaw)
- 浏览[实战案例](/en/examples)

---

*本文最后更新：2026 年 4 月*
*内容由 OpenClaw 101 编辑团队审核*`,
    contentEn: `One of the first questions people ask when learning about OpenClaw is: is it free?

The short answer is: **OpenClaw itself is completely free and open source**. But there may be some additional costs involved in using it. Let's break it down.

## What is OpenClaw?

Before discussing pricing, a quick recap. OpenClaw is an open-source AI agent framework that runs locally on your computer. It can execute code, manage files, search the web, connect to messaging platforms, and more. It's not a cloud service — it's software you install and run yourself.

## What's Completely Free

Here's everything in OpenClaw that costs nothing:

### Core Software
- The OpenClaw framework is 100% open source (MIT license)
- You can download it for free from [GitHub](https://github.com/openclaw/openclaw)
- No paywalls, no premium tiers, no subscription fees
- With 314,000+ GitHub stars, it's one of the most popular open-source AI projects

### Community Skills
- All 97+ community skills on ClawHub are free
- This includes GitHub integration, web search, weather, code generation, and more
- You can also create and publish your own skills for free

### Platform Connectors
- Telegram, Discord, WhatsApp, Slack, Feishu connectors are all free
- Simple configuration, no extra charges

## What May Cost Money

While OpenClaw itself is free, these parts may involve costs:

### 1. AI Model API Fees

This is the **primary cost** of using OpenClaw. OpenClaw needs an AI language model to function:

| Provider | Cost Range | Notes |
|----------|-----------|-------|
| Anthropic Claude | ~$3-15/million tokens | Recommended for complex tasks |
| OpenAI GPT | ~$2-60/million tokens | Varies by model version |
| Google Gemini | Free tier available | Daily limits apply |
| Local Models (Ollama) | Free | Requires decent hardware |

**Tips to save money:**
- Use cheaper models for simple tasks (e.g., GPT-4o-mini)
- Reserve expensive models for complex work
- Use local models (like Llama 3) for completely free usage
- Most personal users spend $5-20 per month

### 2. Server Hosting (Optional)

If you want OpenClaw running 24/7 (e.g., as a Telegram bot), you'll need a server:

| Option | Cost | Best For |
|--------|------|----------|
| Local computer | Free (electricity) | Occasional use |
| Raspberry Pi | ~$50-100 one-time | Home automation |
| Cloud server | ~$5-20/month | Always-on bots |
| AWS/DigitalOcean | ~$5-20/month | International users |

### 3. Third-Party Service Fees (Optional)

Some advanced use cases may involve third-party services:
- Web search APIs (e.g., Google Search API)
- Image generation APIs (e.g., DALL-E)
- Specific databases or storage services

## Completely Free Alternatives

If you want to use OpenClaw at zero cost, it's absolutely possible:

1. **Use local AI models**: Run Llama 3, Mistral, or Qwen through Ollama — completely local, no API fees
2. **Run on your own computer**: No cloud server needed
3. **Use free skills**: All ClawHub skills are free
4. **Use free-tier APIs**: Google Gemini and others offer free allowances

## Cost Comparison with Other Tools

| Tool | Monthly Cost | Notes |
|------|-------------|-------|
| ChatGPT Plus | $20/month | Fixed subscription |
| Claude Pro | $20/month | Fixed subscription |
| GitHub Copilot | $10-19/month | Coding only |
| OpenClaw | $0-20/month | Pay per API usage, can be free |

OpenClaw's advantage: you only pay for what you actually use. No fixed subscriptions. And since it's open source, you're never locked into any service.

## Summary

| Question | Answer |
|----------|--------|
| Is OpenClaw software free? | Yes, 100% free and open source |
| Are there usage costs? | AI model APIs may have small fees |
| Can I use it completely free? | Yes, with local models |
| Average monthly cost? | Most users: $0-20 |
| Is there a paid premium version? | No, all features are free |

## Next Steps

Ready to get started with OpenClaw?
- Read our [Beginner Guide](/en/guide)
- Check the [Installation Tutorial](/en/blog/how-to-install-openclaw)
- Browse [Real Examples](/en/examples)

---

*Last updated: April 2026*
*Content reviewed by the OpenClaw 101 editorial team*`,
    author: "Alex Chen",
    date: "2026-04-08",
    category: "OpenClaw 入门",
    categoryEn: "OpenClaw Basics",
    tags: ["openclaw", "pricing", "free", "cost", "beginner"],
    readingTime: 8,
    image: "/images/blog/openclaw-pricing.webp"
  },
  {
    id: 28,
    slug: "best-openclaw-workflows-productivity",
    title: "最佳 OpenClaw 工作流：用 AI 智能体提升 10 倍生产力",
    titleEn: "Best OpenClaw Workflows for Productivity: 10x Your Output with AI Agents",
    excerpt: "发现最实用的 OpenClaw 工作流——从自动化日报到代码审查，从数据分析到内容创作。每个工作流都包含具体配置步骤和命令示例。",
    excerptEn: "Discover the most practical OpenClaw workflows — from automated daily reports to code reviews, data analysis to content creation. Each workflow includes specific setup steps and command examples.",
    content: `OpenClaw 不只是一个 AI 聊天工具——它的真正威力在于自动化工作流。

本文介绍 8 个最实用的 OpenClaw 工作流，帮你把重复性工作自动化，释放时间做更有价值的事。

## 工作流 1：自动化每日简报

**适合：** 团队管理者、创业者、信息密集型工作

每天早上自动收集关键信息，生成一份简洁的日报推送到 Telegram。

### 工作流程

1. 定时触发（每天早上 8:00）
2. 收集数据：GitHub 通知、日历事件、新闻摘要
3. AI 总结为简洁格式
4. 推送到 Telegram

### 配置步骤

\`\`\`yaml
# 在 OpenClaw 配置中添加定时任务
schedules:
  - name: morning_briefing
    cron: "0 8 * * *"
    prompt: |
      Please prepare my morning briefing:
      1. Check GitHub notifications for openclaw/openclaw
      2. Summarize top 3 HackerNews stories about AI
      3. List my calendar events for today
      Format as a clean, scannable summary.
    channel: telegram
\`\`\`

### 实际效果

> 每天节省 30-45 分钟的信息收集时间。一位产品经理用这个工作流跟踪 5 个不同项目的进度更新。

---

## 工作流 2：智能代码审查助手

**适合：** 开发者、技术团队 Lead

让 AI 帮你审查代码变更，发现潜在问题。

### 工作流程

1. 提交代码到 GitHub
2. OpenClaw 自动拉取 diff
3. AI 分析代码质量、安全性和性能
4. 生成审查报告

### 使用方式

\`\`\`bash
# 审查最近的 commit
claw "review the last commit, focus on security and performance"

# 审查特定 PR
claw "review PR #42 in our repo, check for edge cases"

# 审查整个文件
claw "analyze src/auth.ts for security vulnerabilities"
\`\`\`

### 审查项目

AI 会自动检查：
- 安全漏洞（SQL 注入、XSS、硬编码密钥等）
- 性能问题（N+1 查询、内存泄漏等）
- 代码风格一致性
- 边界情况处理
- 类型安全性

---

## 工作流 3：研究助手与报告生成

**适合：** 研究人员、分析师、学生

自动化研究流程：搜索 → 收集 → 分析 → 报告。

### 工作流程

\`\`\`bash
# 研究一个主题并生成报告
claw "Research the current state of AI agents in 2026. 
Search for recent developments, compare top 5 frameworks, 
and create a detailed report with pros/cons table. 
Save as research-report.md"
\`\`\`

### 高级用法：持续监控

\`\`\`yaml
schedules:
  - name: arxiv_monitor
    cron: "0 9 * * 1"  # 每周一
    prompt: |
      Search arxiv for papers about "AI agents" from the past week.
      Summarize the top 5 most relevant papers.
      Save to ~/research/weekly-digest.md
\`\`\`

### 实际效果

> 一个大学研究实验室每月自动处理 10,000+ 篇论文的筛选和摘要工作。

---

## 工作流 4：自动化文件整理

**适合：** 所有人

让 AI 帮你整理下载文件夹、归类文档。

### 使用方式

\`\`\`bash
# 整理下载文件夹
claw "Organize my Downloads folder: 
move images to ~/Pictures, 
documents to ~/Documents, 
code files to ~/Projects/misc, 
delete files older than 30 days"

# 批量重命名
claw "Rename all photos in ~/Photos/vacation 
to format: 2026-03-vacation-001.jpg"

# 查找重复文件
claw "Find and list duplicate files in ~/Documents, 
sort by size, suggest which to keep"
\`\`\`

---

## 工作流 5：Telegram Bot 自动客服

**适合：** 小型企业、社区运营

搭建一个 24/7 在线的智能客服 Bot。

### 配置

\`\`\`yaml
# Telegram Bot 配置
channels:
  telegram:
    token: BOT_TOKEN
    system_prompt: |
      You are the customer support bot for [Company Name].
      Answer questions about our products and services.
      Be friendly, concise, and helpful.
      If you don't know the answer, say so and suggest 
      contacting support@company.com.
    knowledge_base: ./docs/faq.md
\`\`\`

### 最佳实践

- 准备一份详细的 FAQ 文档作为知识库
- 设置关键词触发人工介入
- 定期审查 AI 的回复质量
- 在非工作时间自动回复，工作时间人机协作

---

## 工作流 6：数据分析管道

**适合：** 数据分析师、运营人员

用自然语言分析数据，生成可视化报告。

### 使用方式

\`\`\`bash
# 分析 CSV 数据
claw "Analyze sales-data.csv: 
show monthly revenue trends, 
top 10 products by sales volume, 
identify seasonal patterns. 
Create charts and save as report.html"

# 数据库查询
claw "Query our PostgreSQL database: 
find users who signed up in the last 30 days 
but haven't made a purchase. 
Export to inactive-users.csv"

# 实时监控
claw "Monitor our API response times from logs/api.log.
Alert me on Telegram if average response time exceeds 500ms"
\`\`\`

---

## 工作流 7：内容创作助手

**适合：** 博主、社交媒体运营、内容创作者

AI 辅助内容创作——从大纲到初稿到优化。

### 工作流程

\`\`\`bash
# 生成文章大纲
claw "Create an outline for a blog post about 
'How to automate your home with AI'. 
Target audience: tech-savvy beginners. 
Include SEO keywords."

# 扩展为完整文章
claw "Expand the outline in draft-outline.md into a 
full 1500-word blog post. Use conversational tone, 
include practical examples, add a FAQ section."

# 多语言翻译
claw "Translate blog-post.md from English to Chinese. 
Maintain the technical accuracy and natural tone."
\`\`\`

### 批量内容

\`\`\`bash
# 批量生成社交媒体内容
claw "Based on blog-post.md, create:
1. A Twitter thread (5 tweets)
2. A LinkedIn post summary
3. An Instagram caption
4. 3 potential YouTube Shorts scripts
Save each to separate files in ~/content/social/"
\`\`\`

---

## 工作流 8：DevOps 自动化

**适合：** 系统管理员、DevOps 工程师

自动化服务器管理和部署流程。

### 使用方式

\`\`\`bash
# 服务器健康检查
claw "Check the health of our production server:
- CPU/memory/disk usage
- Running services status
- Recent error logs
- SSL certificate expiry dates
Format as a status report"

# 自动化部署
claw "Deploy the latest changes from main branch:
1. Pull latest code
2. Run tests
3. Build the project
4. Restart the service
5. Verify it's running
Report any issues"

# 日志分析
claw "Analyze nginx access logs from the last 24 hours:
- Top 10 most visited pages
- Error rate by status code
- Geographic distribution of visitors
- Suspicious activity patterns"
\`\`\`

---

## 如何选择适合你的工作流

| 你的角色 | 推荐工作流 |
|---------|-----------|
| 开发者 | 代码审查 + DevOps 自动化 |
| 研究人员 | 研究助手 + 数据分析 |
| 内容创作者 | 内容助手 + 社交媒体 |
| 团队管理者 | 每日简报 + 文件整理 |
| 创业者 | Telegram 客服 + 数据分析 |

## 入门建议

1. **从一个简单工作流开始**：选择对你日常工作影响最大的一个
2. **先手动运行，再自动化**：确保效果满意后再设置定时任务
3. **迭代优化 Prompt**：根据输出质量不断调整指令
4. **记录和分享**：把有效的工作流记录下来，分享给团队

## 下一步

- 阅读[AI Agent 入门指南](/en/guide)了解基础设置
- 查看[OpenClaw 安装教程](/en/blog/how-to-install-openclaw)
- 浏览 [97+ 社区技能](/en/skills)扩展更多能力
- 加入[社区](https://discord.com/invite/clawd)分享你的工作流

---

*本文最后更新：2026 年 4 月*
*内容由 OpenClaw 101 编辑团队审核*`,
    contentEn: `OpenClaw isn't just an AI chat tool — its real power lies in automated workflows.

This article covers 8 of the most practical OpenClaw workflows to help you automate repetitive tasks and free up time for more valuable work.

## Workflow 1: Automated Daily Briefing

**Best for:** Team leads, founders, information-heavy roles

Automatically collect key information every morning and push a concise daily briefing to Telegram.

### How It Works

1. Scheduled trigger (every day at 8:00 AM)
2. Collect data: GitHub notifications, calendar events, news summaries
3. AI summarizes into a clean format
4. Push to Telegram

### Configuration

\`\`\`yaml
# Add a scheduled task in OpenClaw config
schedules:
  - name: morning_briefing
    cron: "0 8 * * *"
    prompt: |
      Please prepare my morning briefing:
      1. Check GitHub notifications for openclaw/openclaw
      2. Summarize top 3 HackerNews stories about AI
      3. List my calendar events for today
      Format as a clean, scannable summary.
    channel: telegram
\`\`\`

### Real Results

> Saves 30-45 minutes of information gathering daily. One product manager uses this workflow to track progress updates across 5 different projects.

---

## Workflow 2: Smart Code Review Assistant

**Best for:** Developers, tech leads

Let AI help review code changes and catch potential issues.

### How It Works

1. Push code to GitHub
2. OpenClaw automatically pulls the diff
3. AI analyzes code quality, security, and performance
4. Generates a review report

### Usage

\`\`\`bash
# Review the latest commit
claw "review the last commit, focus on security and performance"

# Review a specific PR
claw "review PR #42 in our repo, check for edge cases"

# Review an entire file
claw "analyze src/auth.ts for security vulnerabilities"
\`\`\`

### What AI Checks

- Security vulnerabilities (SQL injection, XSS, hardcoded keys, etc.)
- Performance issues (N+1 queries, memory leaks, etc.)
- Code style consistency
- Edge case handling
- Type safety

---

## Workflow 3: Research Assistant & Report Generation

**Best for:** Researchers, analysts, students

Automate the research pipeline: search → collect → analyze → report.

### Usage

\`\`\`bash
# Research a topic and generate a report
claw "Research the current state of AI agents in 2026. 
Search for recent developments, compare top 5 frameworks, 
and create a detailed report with pros/cons table. 
Save as research-report.md"
\`\`\`

### Advanced: Continuous Monitoring

\`\`\`yaml
schedules:
  - name: arxiv_monitor
    cron: "0 9 * * 1"  # Every Monday
    prompt: |
      Search arxiv for papers about "AI agents" from the past week.
      Summarize the top 5 most relevant papers.
      Save to ~/research/weekly-digest.md
\`\`\`

### Real Results

> A university research lab automatically processes 10,000+ papers per month for screening and summarization.

---

## Workflow 4: Automated File Organization

**Best for:** Everyone

Let AI organize your downloads folder and sort documents.

### Usage

\`\`\`bash
# Organize downloads folder
claw "Organize my Downloads folder: 
move images to ~/Pictures, 
documents to ~/Documents, 
code files to ~/Projects/misc, 
delete files older than 30 days"

# Batch rename
claw "Rename all photos in ~/Photos/vacation 
to format: 2026-03-vacation-001.jpg"

# Find duplicates
claw "Find and list duplicate files in ~/Documents, 
sort by size, suggest which to keep"
\`\`\`

---

## Workflow 5: Telegram Bot Customer Support

**Best for:** Small businesses, community managers

Build a 24/7 intelligent customer support bot.

### Configuration

\`\`\`yaml
# Telegram Bot configuration
channels:
  telegram:
    token: BOT_TOKEN
    system_prompt: |
      You are the customer support bot for [Company Name].
      Answer questions about our products and services.
      Be friendly, concise, and helpful.
      If you don't know the answer, say so and suggest 
      contacting support@company.com.
    knowledge_base: ./docs/faq.md
\`\`\`

### Best Practices

- Prepare a detailed FAQ document as the knowledge base
- Set up keyword triggers for human escalation
- Regularly review AI response quality
- Auto-reply after hours, human-AI collaboration during business hours

---

## Workflow 6: Data Analysis Pipeline

**Best for:** Data analysts, operations teams

Analyze data with natural language and generate visual reports.

### Usage

\`\`\`bash
# Analyze CSV data
claw "Analyze sales-data.csv: 
show monthly revenue trends, 
top 10 products by sales volume, 
identify seasonal patterns. 
Create charts and save as report.html"

# Database queries
claw "Query our PostgreSQL database: 
find users who signed up in the last 30 days 
but haven't made a purchase. 
Export to inactive-users.csv"

# Real-time monitoring
claw "Monitor our API response times from logs/api.log.
Alert me on Telegram if average response time exceeds 500ms"
\`\`\`

---

## Workflow 7: Content Creation Assistant

**Best for:** Bloggers, social media managers, content creators

AI-assisted content creation — from outline to draft to optimization.

### Workflow

\`\`\`bash
# Generate an article outline
claw "Create an outline for a blog post about 
'How to automate your home with AI'. 
Target audience: tech-savvy beginners. 
Include SEO keywords."

# Expand into full article
claw "Expand the outline in draft-outline.md into a 
full 1500-word blog post. Use conversational tone, 
include practical examples, add a FAQ section."

# Multilingual translation
claw "Translate blog-post.md from English to Chinese. 
Maintain the technical accuracy and natural tone."
\`\`\`

### Batch Content

\`\`\`bash
# Batch social media content
claw "Based on blog-post.md, create:
1. A Twitter thread (5 tweets)
2. A LinkedIn post summary
3. An Instagram caption
4. 3 potential YouTube Shorts scripts
Save each to separate files in ~/content/social/"
\`\`\`

---

## Workflow 8: DevOps Automation

**Best for:** System administrators, DevOps engineers

Automate server management and deployment processes.

### Usage

\`\`\`bash
# Server health check
claw "Check the health of our production server:
- CPU/memory/disk usage
- Running services status
- Recent error logs
- SSL certificate expiry dates
Format as a status report"

# Automated deployment
claw "Deploy the latest changes from main branch:
1. Pull latest code
2. Run tests
3. Build the project
4. Restart the service
5. Verify it's running
Report any issues"

# Log analysis
claw "Analyze nginx access logs from the last 24 hours:
- Top 10 most visited pages
- Error rate by status code
- Geographic distribution of visitors
- Suspicious activity patterns"
\`\`\`

---

## Choosing the Right Workflow

| Your Role | Recommended Workflows |
|-----------|---------------------|
| Developer | Code Review + DevOps Automation |
| Researcher | Research Assistant + Data Analysis |
| Content Creator | Content Assistant + Social Media |
| Team Manager | Daily Briefing + File Organization |
| Founder | Telegram Support + Data Analysis |

## Getting Started Tips

1. **Start with one simple workflow**: Pick the one with the biggest daily impact
2. **Run manually first, automate later**: Make sure you're happy with the results
3. **Iterate on your prompts**: Keep refining instructions based on output quality
4. **Document and share**: Record effective workflows and share with your team

## Next Steps

- Read the [AI Agent Guide](/en/guide) for basic setup
- Check the [OpenClaw Installation Tutorial](/en/blog/how-to-install-openclaw)
- Browse [97+ Community Skills](/en/skills) for more capabilities
- Join the [Community](https://discord.com/invite/clawd) to share your workflows

---

*Last updated: April 2026*
*Content reviewed by the OpenClaw 101 editorial team*`,
    author: "Marco Liu",
    date: "2026-04-08",
    category: "OpenClaw 入门",
    categoryEn: "OpenClaw Basics",
    tags: ["openclaw", "workflow", "productivity", "automation", "beginner"],
    readingTime: 12,
    image: "/images/blog/openclaw-workflows.webp"
  },
];
