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

简短回答是：**OpenClaw 本身完全免费且开源**。但使用过程中可能涉及一些额外费用，主要来自 LLM API 调用。本文将从各个角度全面解析 OpenClaw 的真实使用成本，帮助你做出明智的决策。

## OpenClaw 是什么？

在谈论定价之前，先快速回顾一下。OpenClaw 是一个开源 AI 智能体框架，它在你的本地计算机上运行，可以执行代码、管理文件、搜索网络、连接消息平台等。它不是一个云服务——而是你自己安装和运行的软件。与 ChatGPT、Claude Pro 等订阅制产品不同，OpenClaw 不收取任何软件使用费。你拥有完全的控制权，可以选择任何 AI 模型供应商，甚至在本地运行完全免费的开源模型。

## 完全免费的部分

以下是 OpenClaw 中完全免费的内容：

### 核心软件
- OpenClaw 框架本身是 100% 开源的（MIT 许可证）
- 你可以从 [GitHub](https://github.com/openclaw/openclaw) 免费下载
- 没有付费墙、没有高级版、没有订阅费
- 目前已有 314,000+ GitHub Star，是最受欢迎的开源 AI 项目之一
- 所有更新和版本升级永久免费

### 社区技能
- ClawHub 上的 97+ 社区技能全部免费
- 包括 GitHub 集成、网页搜索、天气查询、代码生成等
- 你也可以免费创建和发布自己的技能
- 社区贡献的技能质量不断提升，数量持续增长

### 平台连接器
- Telegram、Discord、WhatsApp、Slack、飞书等平台连接器免费
- 配置过程简单，无需额外付费
- 支持多平台同时连接

## LLM API 费用详细分解

这是使用 OpenClaw 的**主要费用**。OpenClaw 需要连接一个 AI 大模型来工作。不同供应商的定价差异很大，下面是 2026 年 4 月的最新价格：

### 主流 LLM 供应商价格对比

| LLM 供应商 | 模型 | 输入费用 (每百万 token) | 输出费用 (每百万 token) |
|-----------|------|----------------------|----------------------|
| Anthropic | Claude 3.5 Sonnet | $3 | $15 |
| Anthropic | Claude 3 Haiku | $0.25 | $1.25 |
| Anthropic | Claude 3.5 Opus | $15 | $75 |
| OpenAI | GPT-4o | $2.50 | $10 |
| OpenAI | GPT-4o-mini | $0.15 | $0.60 |
| OpenAI | GPT-4 Turbo | $10 | $30 |
| Google | Gemini 1.5 Pro | $1.25 | $5 |
| Google | Gemini 1.5 Flash | $0.075 | $0.30 |
| Google | Gemini 2.0 Flash | 免费层级可用 | 免费层级可用 |
| DeepSeek | DeepSeek V3 | $0.27 | $1.10 |
| 本地 (Ollama) | Llama 3 | 免费 | 免费 |
| 本地 (Ollama) | Mistral 7B | 免费 | 免费 |
| 本地 (Ollama) | Qwen 2.5 | 免费 | 免费 |

### Token 到底是什么？

简单说，1 个 token 约等于 0.75 个英文单词或 0.5 个中文字符。一次典型的对话（问一个问题 + 得到回答）大约消耗 1,000-3,000 个 token。一百万 token 足以支持数百次普通对话。

## 不同使用量的月度费用估算

为了帮助你更直观地了解费用，这里是基于不同使用场景的月度成本估算：

### 轻度使用（每天 5-10 次对话）

| 模型选择 | 月均 token 消耗 | 预估月费用 |
|---------|---------------|-----------|
| Claude 3.5 Sonnet | ~300 万 token | $5-8 |
| GPT-4o | ~300 万 token | $4-7 |
| GPT-4o-mini | ~300 万 token | $0.50-1 |
| Gemini 1.5 Flash | ~300 万 token | $0.30-0.60 |
| 本地模型 (Ollama) | 不限 | $0（仅电费） |

### 中度使用（每天 20-50 次对话，含代码生成）

| 模型选择 | 月均 token 消耗 | 预估月费用 |
|---------|---------------|-----------|
| Claude 3.5 Sonnet | ~1500 万 token | $20-35 |
| GPT-4o | ~1500 万 token | $15-30 |
| GPT-4o-mini | ~1500 万 token | $2-4 |
| 混合策略（简单用 mini，复杂用高端） | ~1500 万 token | $8-15 |
| 本地模型 (Ollama) | 不限 | $0（仅电费） |

### 重度使用（全天候 Bot 运行 / 团队使用）

| 模型选择 | 月均 token 消耗 | 预估月费用 |
|---------|---------------|-----------|
| Claude 3.5 Sonnet | ~5000 万+ token | $60-120 |
| GPT-4o | ~5000 万+ token | $50-100 |
| 混合策略 | ~5000 万+ token | $20-50 |
| 本地模型 (Ollama) | 不限 | $0（仅电费 + 硬件折旧） |

## 自托管费用

如果你想 24/7 运行 OpenClaw（比如作为 Telegram Bot 全天服务），你需要考虑托管成本：

### 服务器托管方案对比

| 方案 | 初始费用 | 月费用 | 适合场景 | 优缺点 |
|------|---------|-------|---------|--------|
| 本地电脑 | $0 | ~$5-10 电费 | 偶尔使用 | 简单，但不稳定 |
| 树莓派 5 | ~$80-120 | ~$2-3 电费 | 轻量 Bot | 低功耗，性能有限 |
| VPS (DigitalOcean) | $0 | $6-24/月 | 全天候运行 | 稳定可靠，按需扩展 |
| VPS (Vultr) | $0 | $5-20/月 | 全天候运行 | 性价比高 |
| AWS Lightsail | $0 | $5-40/月 | 生产环境 | 生态完善 |
| 阿里云/腾讯云 | $0 | ¥30-150/月 | 国内用户 | 国内访问快 |

### 运行本地模型的硬件需求

如果你选择使用 Ollama 运行本地模型来避免 API 费用，需要注意硬件要求：

| 模型大小 | 最低 RAM | 推荐 GPU | 适合硬件 |
|---------|---------|---------|---------|
| 7B 参数 (如 Llama 3 8B) | 8GB | 可选 | 普通笔记本/台式机 |
| 13B 参数 | 16GB | 8GB VRAM | 中端台式机 |
| 70B 参数 | 64GB | 24GB+ VRAM | 高端工作站 |

大多数用户使用 7B-13B 参数的模型就能获得不错的效果。

## 第三方服务费用（可选）

某些高级用法可能涉及第三方服务：
- **网页搜索 API**：Google Search API（$5/1000次查询）、Bing Search API（有免费层级）
- **图片生成 API**：DALL-E 3（$0.04-0.12/张）、Stable Diffusion（可本地免费运行）
- **数据库服务**：Supabase（免费层级可用）、PlanetScale（免费层级可用）
- **向量数据库**：Pinecone（免费层级可用）、ChromaDB（本地免费）

大多数个人用户不需要这些额外服务。

## 节省费用的 8 个实用技巧

1. **混合模型策略**：简单任务用廉价模型（GPT-4o-mini、Gemini Flash），复杂任务才用高端模型。这一招可以节省 60-80% 的费用。
2. **使用本地模型**：通过 Ollama 运行 Llama 3 或 Qwen，完全免费，适合日常简单任务。
3. **优化 Prompt 长度**：简洁的 Prompt 消耗更少 token。避免在系统提示中放入不必要的长文本。
4. **启用对话缓存**：OpenClaw 支持上下文缓存，减少重复 token 消耗。
5. **设置使用限额**：在 API 供应商后台设置月度预算上限，避免意外超支。
6. **利用免费额度**：Google Gemini、DeepSeek 等提供免费层级，充分利用。
7. **批量处理任务**：将多个小任务合并为一次请求，减少系统提示的重复消耗。
8. **监控用量**：定期检查 API 使用量仪表盘，及时发现异常消耗。

## 与付费替代品的详细对比

| 工具 | 月费用 | 定价模式 | 功能范围 | 自定义程度 | 数据隐私 |
|------|--------|---------|---------|-----------|---------|
| Cursor Pro | $20/月 | 固定订阅 | 编程辅助 | 中等 | 代码上传到云端 |
| GitHub Copilot Individual | $10/月 | 固定订阅 | 编程辅助 | 低 | 代码上传到云端 |
| GitHub Copilot Business | $19/月 | 固定订阅 | 编程辅助 | 中等 | 可配置隐私 |
| ChatGPT Plus | $20/月 | 固定订阅 | 通用对话 | 低 | 对话存储在 OpenAI |
| Claude Pro | $20/月 | 固定订阅 | 通用对话 | 低 | 对话存储在 Anthropic |
| Windsurf Pro | $15/月 | 固定订阅 | 编程辅助 | 中等 | 代码上传到云端 |
| OpenClaw + 云端 API | $0-30/月 | 按量计费 | 全能智能体 | 极高 | 可选本地运行 |
| OpenClaw + 本地模型 | $0/月 | 完全免费 | 全能智能体 | 极高 | 100% 本地隐私 |

### 为什么 OpenClaw 更划算？

1. **按量计费，没有浪费**：你只为实际使用的 token 付费。如果这个月出差没怎么用，费用自动降低。固定订阅产品无论你用不用都要收费。
2. **没有供应商锁定**：随时可以切换模型供应商。Claude 涨价了？切换到 GPT-4o。需要更便宜的？用 DeepSeek 或本地模型。
3. **功能更全面**：Cursor 和 Copilot 只做编程辅助，OpenClaw 还能做自动化工作流、Bot 搭建、数据分析等。
4. **数据隐私可控**：使用本地模型时，你的数据完全不离开电脑。
5. **开源透明**：你可以审查代码，确保没有隐藏收费或数据收集。

## 常见问题 (FAQ)

### Q1: OpenClaw 真的完全免费吗？

OpenClaw 软件本身 100% 免费开源，遵循 MIT 许可证。你不需要为软件付费。但如果你使用云端 LLM（如 Claude、GPT-4o），需要为 API 调用付费。使用本地模型（通过 Ollama）可以实现完全零成本。

### Q2: 一个月大概要花多少钱？

取决于你的使用量和模型选择。轻度用户（每天几次对话）每月约 $1-8。中度用户每月约 $8-35。如果使用混合策略（简单任务用廉价模型），大多数人每月 $5-15 就足够了。使用本地模型则完全免费。

### Q3: 有没有隐藏费用？

没有。OpenClaw 没有高级版、没有功能限制、没有使用上限。唯一的费用来自你选择的 LLM 供应商的 API 调用费，这些费用是透明的、按量计费的。你可以在供应商后台实时查看用量。

### Q4: 跟 ChatGPT Plus/Claude Pro 比，哪个更划算？

对于轻度到中度用户，OpenClaw 通常更划算。ChatGPT Plus 和 Claude Pro 每月固定 $20，而 OpenClaw 用户平均每月只需 $5-15。但如果你是重度用户（每天上百次复杂对话），固定订阅可能更划算。OpenClaw 的优势在于灵活性——你可以混合使用不同模型来优化成本。

### Q5: 本地模型的效果怎么样？够用吗？

2026 年的本地模型已经非常强大。Llama 3 8B 在大多数日常任务（文本生成、简单编程、翻译、总结等）上表现出色。对于复杂推理、长文档分析等高级任务，云端大模型（Claude 3.5 Sonnet、GPT-4o）仍然有明显优势。建议的策略是：日常任务用本地模型，复杂任务按需使用云端 API。

## 总结

| 问题 | 答案 |
|------|------|
| OpenClaw 软件免费吗？ | 是的，100% 免费开源 |
| 使用时有费用吗？ | AI 模型 API 可能有少量费用 |
| 能完全免费使用吗？ | 可以，使用本地模型即可 |
| 轻度用户月费？ | $1-8（或使用本地模型 $0） |
| 中度用户月费？ | $8-35（混合策略 $5-15） |
| 重度用户月费？ | $20-120（混合策略 $20-50） |
| 有付费高级版吗？ | 没有，所有功能免费 |
| 比 Cursor/Copilot 划算吗？ | 对大多数用户来说，是的 |

## 下一步

如果你准备开始使用 OpenClaw：
- 阅读我们的[新手入门指南](/guide)
- 查看[安装教程](/blog/how-to-install-openclaw)
- 浏览[实战案例](/examples)
- 了解如何[配置本地模型](/blog/openclaw-localai-integration)节省费用

---

*本文最后更新：2026 年 4 月*
*内容由 OpenClaw 101 编辑团队审核*`,
    contentEn: `One of the first questions people ask when learning about OpenClaw is: is it free?

The short answer is: **OpenClaw itself is completely free and open source**. But there may be some additional costs involved in using it, primarily from LLM API calls. This comprehensive guide breaks down every cost you might encounter, compares pricing across providers, estimates monthly budgets for different usage levels, and shows you how to minimize expenses.

## What is OpenClaw?

Before discussing pricing, a quick recap. OpenClaw is an open-source AI agent framework that runs locally on your computer. It can execute code, manage files, search the web, connect to messaging platforms, and more. It is not a cloud service — it is software you install and run yourself. Unlike subscription products such as ChatGPT Plus or Claude Pro, OpenClaw charges no software licensing fee whatsoever. You have full control over which AI model provider to use, and you can even run completely free open-source models locally.

## What is Completely Free

Here is everything in OpenClaw that costs absolutely nothing:

### Core Software
- The OpenClaw framework is 100% open source (MIT license)
- You can download it for free from [GitHub](https://github.com/openclaw/openclaw)
- No paywalls, no premium tiers, no subscription fees
- With 314,000+ GitHub stars, it is one of the most popular open-source AI projects
- All updates and version upgrades are permanently free

### Community Skills
- All 97+ community skills on ClawHub are free
- This includes GitHub integration, web search, weather, code generation, and more
- You can also create and publish your own skills for free
- Community-contributed skills are growing in quantity and quality every month

### Platform Connectors
- Telegram, Discord, WhatsApp, Slack, Feishu connectors are all free
- Simple configuration, no extra charges
- Multiple platforms can be connected simultaneously

## LLM API Costs: A Detailed Breakdown

This is the **primary cost** of using OpenClaw. OpenClaw needs a large language model to function, and different providers charge very different rates. Below are the latest prices as of April 2026.

### LLM Provider Pricing Comparison

| LLM Provider | Model | Cost per 1M tokens (input) | Cost per 1M tokens (output) |
|---|---|---|---|
| Anthropic | Claude 3.5 Sonnet | $3 | $15 |
| Anthropic | Claude 3 Haiku | $0.25 | $1.25 |
| Anthropic | Claude 3.5 Opus | $15 | $75 |
| OpenAI | GPT-4o | $2.50 | $10 |
| OpenAI | GPT-4o-mini | $0.15 | $0.60 |
| OpenAI | GPT-4 Turbo | $10 | $30 |
| Google | Gemini 1.5 Pro | $1.25 | $5 |
| Google | Gemini 1.5 Flash | $0.075 | $0.30 |
| Google | Gemini 2.0 Flash | Free tier available | Free tier available |
| DeepSeek | DeepSeek V3 | $0.27 | $1.10 |
| Local (Ollama) | Llama 3 | Free | Free |
| Local (Ollama) | Mistral 7B | Free | Free |
| Local (Ollama) | Qwen 2.5 | Free | Free |

### What Exactly is a Token?

In simple terms, one token is roughly 0.75 English words or about 0.5 Chinese characters. A typical conversation (one question plus one answer) consumes approximately 1,000 to 3,000 tokens. One million tokens can support hundreds of regular conversations, so even at cloud API prices, individual requests cost fractions of a cent.

## Monthly Cost Estimates by Usage Level

To help you understand real-world costs, here are monthly estimates based on different usage patterns.

### Light Usage (5-10 conversations per day)

This covers casual personal use — asking a few questions, generating short code snippets, or summarizing articles.

| Model Choice | Estimated Monthly Tokens | Estimated Monthly Cost |
|---|---|---|
| Claude 3.5 Sonnet | ~3M tokens | $5-8 |
| GPT-4o | ~3M tokens | $4-7 |
| GPT-4o-mini | ~3M tokens | $0.50-1 |
| Gemini 1.5 Flash | ~3M tokens | $0.30-0.60 |
| Local model (Ollama) | Unlimited | $0 (electricity only) |

### Moderate Usage (20-50 conversations per day, including code generation)

This covers active developers and professionals who use OpenClaw throughout their workday for coding assistance, content creation, and analysis tasks.

| Model Choice | Estimated Monthly Tokens | Estimated Monthly Cost |
|---|---|---|
| Claude 3.5 Sonnet | ~15M tokens | $20-35 |
| GPT-4o | ~15M tokens | $15-30 |
| GPT-4o-mini | ~15M tokens | $2-4 |
| Mixed strategy (cheap for simple, premium for complex) | ~15M tokens | $8-15 |
| Local model (Ollama) | Unlimited | $0 (electricity only) |

### Heavy Usage (24/7 bot operation or team use)

This covers always-on bots, team deployments, or power users running complex multi-step agent workflows throughout the day.

| Model Choice | Estimated Monthly Tokens | Estimated Monthly Cost |
|---|---|---|
| Claude 3.5 Sonnet | ~50M+ tokens | $60-120 |
| GPT-4o | ~50M+ tokens | $50-100 |
| Mixed strategy | ~50M+ tokens | $20-50 |
| Local model (Ollama) | Unlimited | $0 (electricity + hardware depreciation) |

## Self-Hosting Costs

If you want OpenClaw running 24/7 (for example, as a Telegram bot serving your team around the clock), you need to consider hosting costs.

### Server Hosting Options

| Option | Upfront Cost | Monthly Cost | Best For | Pros/Cons |
|---|---|---|---|---|
| Local computer | $0 | ~$5-10 electricity | Occasional use | Simple but unreliable uptime |
| Raspberry Pi 5 | ~$80-120 | ~$2-3 electricity | Lightweight bots | Low power, limited performance |
| VPS (DigitalOcean) | $0 | $6-24/month | Always-on operation | Stable, scalable on demand |
| VPS (Vultr) | $0 | $5-20/month | Always-on operation | Good value for money |
| AWS Lightsail | $0 | $5-40/month | Production environments | Complete ecosystem |

### Hardware Requirements for Running Local Models

If you choose to run local models through Ollama to avoid API fees entirely, here is what you need:

| Model Size | Minimum RAM | Recommended GPU | Suitable Hardware |
|---|---|---|---|
| 7B parameters (e.g., Llama 3 8B) | 8GB | Optional (CPU works) | Standard laptop or desktop |
| 13B parameters | 16GB | 8GB VRAM | Mid-range desktop |
| 70B parameters | 64GB | 24GB+ VRAM | High-end workstation |

Most users will get excellent results with 7B to 13B parameter models running on everyday hardware. You do not need a gaming rig to get started.

## Third-Party Service Fees (Optional)

Some advanced use cases may involve additional third-party services:

- **Web search APIs**: Google Search API ($5 per 1,000 queries), Bing Search API (free tier available)
- **Image generation APIs**: DALL-E 3 ($0.04-0.12 per image), Stable Diffusion (can run locally for free)
- **Database services**: Supabase (free tier available), PlanetScale (free tier available)
- **Vector databases**: Pinecone (free tier available), ChromaDB (free and local)

Most personal users will never need any of these extra services. They become relevant only for specialized agent workflows like automated research or RAG-based knowledge systems.

## 8 Practical Tips to Reduce Costs

1. **Use a mixed model strategy**: Route simple tasks to cheap models (GPT-4o-mini, Gemini Flash) and reserve premium models for complex reasoning. This single technique can cut costs by 60-80%.

2. **Run local models for daily tasks**: Install Ollama and run Llama 3 or Qwen locally. For everyday tasks like text generation, simple coding, translation, and summarization, local models perform remarkably well — at zero cost.

3. **Optimize prompt length**: Concise prompts consume fewer tokens. Avoid stuffing unnecessary context into your system prompts. Every token in your system prompt is billed on every single request.

4. **Enable conversation caching**: OpenClaw supports context caching, which reduces repeated token consumption when you have long-running conversations.

5. **Set spending limits**: Configure monthly budget caps in your API provider dashboard (Anthropic, OpenAI, and Google all support this). This prevents surprise bills from runaway agents or misconfigured automations.

6. **Take advantage of free tiers**: Google Gemini 2.0 Flash, DeepSeek, and several other providers offer generous free tiers. Use these for experimentation and low-priority tasks.

7. **Batch your tasks**: Combine multiple small requests into a single conversation. This reduces the overhead of system prompts being sent repeatedly.

8. **Monitor your usage**: Regularly check your API usage dashboards. Most providers offer real-time usage tracking. Set up alerts at 50% and 80% of your monthly budget.

## Detailed Comparison with Paid Alternatives

Here is how OpenClaw stacks up against popular paid AI coding and productivity tools:

| Tool | Monthly Cost | Pricing Model | Feature Scope | Customization | Data Privacy |
|---|---|---|---|---|---|
| Cursor Pro | $20/month | Fixed subscription | Coding assistant | Medium | Code uploaded to cloud |
| GitHub Copilot Individual | $10/month | Fixed subscription | Coding assistant | Low | Code uploaded to cloud |
| GitHub Copilot Business | $19/month | Fixed subscription | Coding assistant | Medium | Configurable privacy |
| ChatGPT Plus | $20/month | Fixed subscription | General chat | Low | Conversations stored at OpenAI |
| Claude Pro | $20/month | Fixed subscription | General chat | Low | Conversations stored at Anthropic |
| Windsurf Pro | $15/month | Fixed subscription | Coding assistant | Medium | Code uploaded to cloud |
| OpenClaw + cloud API | $0-30/month | Pay per use | Full agent capabilities | Very high | Optional local processing |
| OpenClaw + local models | $0/month | Completely free | Full agent capabilities | Very high | 100% local privacy |

### Why OpenClaw Offers Better Value

1. **Pay only for what you use**: Your bill scales with actual usage. If you travel for two weeks and barely touch it, you barely pay anything. Subscription products charge the same whether you use them daily or not at all.

2. **No vendor lock-in**: You can switch model providers at any time. If Anthropic raises prices, switch to GPT-4o. Need something cheaper? Use DeepSeek or a local model. You are never trapped.

3. **Broader capabilities**: Cursor and Copilot only do coding assistance. OpenClaw can also build automated workflows, run Telegram bots, analyze data, manage files, and connect to dozens of platforms.

4. **Data privacy you control**: When using local models, your data never leaves your computer. Even when using cloud APIs, OpenClaw sends only the conversation context — it does not upload your entire codebase the way some coding assistants do.

5. **Open source transparency**: You can audit the code yourself. There are no hidden fees, no telemetry you cannot disable, and no surprise changes to terms of service.

## Frequently Asked Questions (FAQ)

### Q1: Is OpenClaw really completely free?

The OpenClaw software itself is 100% free and open source under the MIT license. You never pay for the software. However, if you use cloud-based LLMs (such as Claude, GPT-4o, or Gemini Pro), you will pay the API provider for token usage. By using local models through Ollama, you can achieve truly zero-cost operation.

### Q2: How much will I spend per month?

It depends on your usage volume and model choice. Light users (a few conversations per day) typically spend $1-8 per month. Moderate users spend $8-35. If you adopt a mixed strategy — routing simple tasks to cheap models — most people find $5-15 per month covers their needs comfortably. Local models are always free.

### Q3: Are there any hidden fees?

None. OpenClaw has no premium tier, no feature gates, and no usage caps. The only costs come from the LLM provider you choose, and those fees are transparent and usage-based. You can monitor your spending in real time through your provider's dashboard.

### Q4: Is OpenClaw cheaper than ChatGPT Plus or Claude Pro?

For light to moderate users, OpenClaw is almost always cheaper. ChatGPT Plus and Claude Pro charge a flat $20 per month regardless of usage. Most OpenClaw users spend $5-15 per month. However, if you are an extremely heavy user (hundreds of complex conversations daily), a fixed subscription might work out cheaper per query. OpenClaw's real advantage is flexibility — you can mix models and providers to optimize your cost-to-quality ratio.

### Q5: How good are local models? Are they usable?

Local models in 2026 are remarkably capable. Llama 3 8B performs well on most everyday tasks including text generation, simple programming, translation, and summarization. For advanced tasks like complex multi-step reasoning, long document analysis, or nuanced coding problems, cloud models (Claude 3.5 Sonnet, GPT-4o) still hold a clear edge. The recommended strategy is to use local models for routine work and switch to cloud APIs on demand for challenging tasks.

## Summary

| Question | Answer |
|---|---|
| Is OpenClaw software free? | Yes, 100% free and open source |
| Are there usage costs? | AI model APIs may have small fees |
| Can I use it completely free? | Yes, with local models via Ollama |
| Light user monthly cost? | $1-8 (or $0 with local models) |
| Moderate user monthly cost? | $8-35 (mixed strategy: $5-15) |
| Heavy user monthly cost? | $20-120 (mixed strategy: $20-50) |
| Is there a paid premium version? | No, all features are free |
| Cheaper than Cursor/Copilot? | For most users, yes |

## Next Steps

Ready to get started with OpenClaw?
- Read our [Beginner Guide](/guide)
- Check the [Installation Tutorial](/blog/how-to-install-openclaw)
- Browse [Real Examples](/examples)
- Learn how to [set up local models](/blog/openclaw-localai-integration) to save money

---

*Last updated: April 2026*
*Content reviewed by the OpenClaw 101 editorial team*`,
    author: "Alex Chen",
    date: "2026-04-08",
    category: "OpenClaw 入门",
    categoryEn: "OpenClaw Basics",
    tags: ["openclaw", "pricing", "free", "cost", "beginner"],
    readingTime: 18,
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

本文介绍 10 个最实用的 OpenClaw 工作流，帮你把重复性工作自动化，释放时间做更有价值的事。

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

## 工作流 9：邮件自动分类与回复

**适合：** 收件箱爆炸的任何人

每天花在邮件上的时间远比你想象的多。让 AI 帮你分类、优先排序，甚至起草回复。

### 使用方式

\`\`\`bash
# 连接邮箱（支持 Gmail、Outlook）
openclaw skills install email-assistant
openclaw config set email.provider gmail
openclaw config set email.address your@gmail.com

# 自动分类收件箱
claw "Scan my inbox from the last 24 hours.
Categorize emails into: urgent, action-needed, FYI, spam.
Summarize the urgent ones."

# 批量起草回复
claw "Draft replies for all action-needed emails.
Tone: professional but friendly.
Save drafts, don't send yet."
\`\`\`

### 定时触发

\`\`\`yaml
schedules:
  - name: email_triage
    cron: "0 7 * * 1-5"  # 工作日早上 7 点
    prompt: |
      Scan my inbox for unread emails.
      Categorize and summarize the top priority items.
      Draft replies for urgent ones.
      Send me a summary on Telegram.
    channel: telegram
\`\`\`

### 实际效果

> 一位创业者每天用这个工作流处理 100+ 封邮件，把邮件时间从 2 小时压缩到 20 分钟。

---

## 工作流 10：会议纪要与待办提取

**适合：** 经常开会的管理者、产品经理

会议结束后，AI 自动生成纪要并提取 Action Items。

### 使用方式

\`\`\`bash
# 从录音生成纪要
claw "Transcribe meeting-recording.mp3 and create meeting notes:
- Key decisions made
- Action items with owners and deadlines
- Open questions
- Next meeting agenda suggestions
Save as meeting-notes-2026-04-08.md"

# 从聊天记录生成纪要
claw "Read the Slack channel #product-meeting history from today.
Extract action items, assign to mentioned people,
and create a summary. Post to #meeting-notes channel."
\`\`\`

### 自动化配置

\`\`\`yaml
schedules:
  - name: meeting_notes
    cron: "0 18 * * 1-5"  # 每个工作日下午 6 点
    prompt: |
      Check my calendar for meetings today.
      For each meeting that has a recording, transcribe and summarize.
      Extract action items and post to Telegram.
\`\`\`

### 实际效果

> 一个 10 人产品团队每周节省 5 小时的纪要整理时间。AI 提取的 Action Items 准确率超过 90%。

---

## 如何选择适合你的工作流

| 你的角色 | 推荐工作流 |
|---------|-----------|
| 开发者 | 代码审查 + DevOps 自动化 |
| 研究人员 | 研究助手 + 数据分析 |
| 内容创作者 | 内容助手 + 社交媒体 |
| 团队管理者 | 每日简报 + 会议纪要 + 文件整理 |
| 创业者 | Telegram 客服 + 邮件分类 + 数据分析 |
| 产品经理 | 会议纪要 + 研究助手 |

## 入门建议

1. **从一个简单工作流开始**：选择对你日常工作影响最大的一个
2. **先手动运行，再自动化**：确保效果满意后再设置定时任务
3. **迭代优化 Prompt**：根据输出质量不断调整指令
4. **记录和分享**：把有效的工作流记录下来，分享给团队

## 常见问题

**Q：工作流执行失败了怎么排查？**

先运行 \`openclaw logs --last 50\` 查看最近的日志。最常见的失败原因是 API Key 过期或额度用完。其次是网络问题导致的超时。日志里会有明确的错误信息和建议的解决方案。

**Q：定时任务会消耗多少 API 额度？**

取决于任务复杂度。一个简单的每日简报大约消耗 2000-5000 tokens（不到 $0.01）。复杂的数据分析任务可能消耗 10000-30000 tokens。建议先手动运行一次，用 \`openclaw usage\` 查看消耗量，再决定是否设为定时任务。

**Q：可以同时运行多个定时工作流吗？**

可以。OpenClaw 的调度器支持多个并发任务。但要注意 LLM API 的并发限制——如果多个任务同时触发，可能会被限流。建议把定时任务错开几分钟。

**Q：工作流的输出质量不稳定怎么办？**

三个技巧：一是把 Prompt 写得更具体，给出格式要求和示例；二是使用更强的模型（Claude 3.5 Sonnet 在长文本任务上比 GPT-4o-mini 稳定很多）；三是在 Prompt 里加上"如果信息不足，请说明缺少什么"来避免 AI 编造内容。

## 下一步

- 阅读[AI Agent 入门指南](/zh/guide)了解基础设置
- 查看[OpenClaw 安装教程](/zh/blog/how-to-install-openclaw)
- 浏览 [97+ 社区技能](/zh/skills)扩展更多能力
- 加入[社区](https://discord.com/invite/clawd)分享你的工作流

---

*本文最后更新：2026 年 4 月*
*内容由 OpenClaw 101 编辑团队审核*`,
    contentEn: `OpenClaw isn't just an AI chat tool — its real power lies in automated workflows.

This article covers 10 of the most practical OpenClaw workflows to help you automate repetitive tasks and free up time for more valuable work.

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

## Workflow 9: Email Auto-Triage and Reply Drafting

**Best for:** Anyone drowning in their inbox

You probably spend more time on email than you realize. Let AI classify, prioritize, and even draft replies for you.

### Usage

\`\`\`bash
# Connect your email (supports Gmail, Outlook)
openclaw skills install email-assistant
openclaw config set email.provider gmail
openclaw config set email.address your@gmail.com

# Auto-classify your inbox
claw "Scan my inbox from the last 24 hours.
Categorize emails into: urgent, action-needed, FYI, spam.
Summarize the urgent ones."

# Batch draft replies
claw "Draft replies for all action-needed emails.
Tone: professional but friendly.
Save drafts, don't send yet."
\`\`\`

### Scheduled Trigger

\`\`\`yaml
schedules:
  - name: email_triage
    cron: "0 7 * * 1-5"  # Weekdays at 7 AM
    prompt: |
      Scan my inbox for unread emails.
      Categorize and summarize the top priority items.
      Draft replies for urgent ones.
      Send me a summary on Telegram.
    channel: telegram
\`\`\`

### Real Results

> A startup founder uses this workflow to process 100+ emails daily, cutting email time from 2 hours to 20 minutes.

---

## Workflow 10: Meeting Notes and Action Item Extraction

**Best for:** Managers, product managers, anyone in frequent meetings

After a meeting ends, AI automatically generates notes and extracts action items.

### Usage

\`\`\`bash
# Generate notes from a recording
claw "Transcribe meeting-recording.mp3 and create meeting notes:
- Key decisions made
- Action items with owners and deadlines
- Open questions
- Next meeting agenda suggestions
Save as meeting-notes-2026-04-08.md"

# Generate notes from chat history
claw "Read the Slack channel #product-meeting history from today.
Extract action items, assign to mentioned people,
and create a summary. Post to #meeting-notes channel."
\`\`\`

### Automated Configuration

\`\`\`yaml
schedules:
  - name: meeting_notes
    cron: "0 18 * * 1-5"  # Every weekday at 6 PM
    prompt: |
      Check my calendar for meetings today.
      For each meeting that has a recording, transcribe and summarize.
      Extract action items and post to Telegram.
\`\`\`

### Real Results

> A 10-person product team saves 5 hours per week on meeting notes. AI-extracted action items have over 90% accuracy.

---

## Choosing the Right Workflow

| Your Role | Recommended Workflows |
|-----------|---------------------|
| Developer | Code Review + DevOps Automation |
| Researcher | Research Assistant + Data Analysis |
| Content Creator | Content Assistant + Social Media |
| Team Manager | Daily Briefing + Meeting Notes + File Organization |
| Founder | Telegram Support + Email Triage + Data Analysis |
| Product Manager | Meeting Notes + Research Assistant |

## Getting Started Tips

1. **Start with one simple workflow**: Pick the one with the biggest daily impact
2. **Run manually first, automate later**: Make sure you are happy with the results before scheduling
3. **Iterate on your prompts**: Keep refining instructions based on output quality
4. **Document and share**: Record effective workflows and share with your team

## Frequently Asked Questions

**Q: How do I debug a failing workflow?**

Start by running \`openclaw logs --last 50\` to check recent logs. The most common failure cause is an expired or exhausted API key. Network timeouts are the second most frequent issue. The logs will show a clear error message and suggested resolution.

**Q: How much API quota do scheduled tasks consume?**

It depends on task complexity. A simple daily briefing consumes roughly 2,000-5,000 tokens (less than $0.01). Complex data analysis tasks might use 10,000-30,000 tokens. Run the task manually first and check consumption with \`openclaw usage\` before setting it as a scheduled job.

**Q: Can I run multiple scheduled workflows at the same time?**

Yes. OpenClaw's scheduler supports multiple concurrent tasks. However, watch out for LLM API concurrency limits — if several tasks fire simultaneously, you might get rate-limited. Stagger your scheduled times by a few minutes to avoid this.

**Q: The output quality of my workflow is inconsistent. How do I fix it?**

Three tips: first, make your prompt more specific by including format requirements and examples; second, use a stronger model (Claude 3.5 Sonnet is much more consistent than GPT-4o-mini on long-form tasks); third, add "if information is insufficient, state what is missing" to your prompt to prevent the AI from fabricating content.

## Next Steps

- Read the [AI Agent Guide](/guide) for basic setup
- Check the [OpenClaw Installation Tutorial](/blog/how-to-install-openclaw)
- Browse [97+ Community Skills](/skills) for more capabilities
- Join the [Community](https://discord.com/invite/clawd) to share your workflows

---

*Last updated: April 2026*
*Content reviewed by the OpenClaw 101 editorial team*`,
    author: "Marco Liu",
    date: "2026-04-08",
    category: "OpenClaw 入门",
    categoryEn: "OpenClaw Basics",
    tags: ["openclaw", "workflow", "productivity", "automation", "beginner"],
    readingTime: 16,
    image: "/images/blog/openclaw-workflows.webp"
  },
  {
    id: 32,
    slug: "openclaw-agentskills-clawhub",
    title: "OpenClaw AgentSkills 完全指南（2026）——ClawHub 新功能详解",
    titleEn: "OpenClaw AgentSkills Explained (2026) – ClawHub New Features",
    excerpt: "AgentSkills 是 OpenClaw 里最小的可复用能力单元，ClawHub 是它们的官方市场。本文讲清 AgentSkills 的结构、ClawHub 的 2026 新特性，以及安装和发布流程。",
    excerptEn: "AgentSkills are the smallest reusable capability unit in OpenClaw; ClawHub is where they live. This guide covers how AgentSkills work, 2026 ClawHub features, and how to install or publish skills.",
    content: `AgentSkills 是 OpenClaw 生态里最核心的抽象——每一个 Skill 都是一段可以被 Agent 按需调用的能力，例如"发送 Telegram 消息"、"查询数据库"、"调用一个外部 API"。ClawHub 则是 OpenClaw 官方的 Skill 发行市场，负责把社区写好的 Skill 分发到每个人的本地环境。

这篇文章覆盖 AgentSkills 的结构、ClawHub 在 2026 年的新功能，以及作为使用者和发布者你分别要做什么。

## AgentSkills 是什么？

一个 AgentSkill 本质上是一个带有元数据的函数——它对外暴露一个名字、一段自然语言描述、一组参数，以及实际的执行逻辑。Agent 在运行时根据用户输入和任务规划，挑出合适的 Skill 来执行。

和传统 SDK 或 Plugin 的区别在于：

- Skill 的描述是给 LLM 看的，不是给人看的——写得好不好直接决定 Agent 能不能挑对
- Skill 是沙箱化的，默认只能拿到它声明过的资源和权限
- Skill 可以组合：一个 Skill 内部可以调用另一个 Skill

## ClawHub 在 2026 做了什么

2026 版 ClawHub 有几个关键升级：

- **一键安装**：\`openclaw skill install <name>\` 直接拉取并校验签名
- **版本锁定**：每个 Skill 支持 semver，生产环境可以锁死版本避免上游意外变更
- **权限可见**：安装前 CLI 会打印 Skill 声明的权限清单（网络、文件、Secrets），你确认后才会继续
- **本地沙箱**：Skill 默认在隔离目录里运行，越界访问会被拒绝并记录审计日志
- **社区评分**：每个 Skill 有下载量、平均评分和最近问题列表

## 安装一个 Skill

最常见的流程就是三行命令：

\`\`\`bash
openclaw skill search telegram
openclaw skill install @official/telegram-send
openclaw skill list
\`\`\`

安装完可以在 \`~/.openclaw/skills/\` 看到对应的目录。启用 Skill 之后 Agent 会在启动时把它的描述注入到可用工具清单里。

## 发布你自己的 Skill

1. 用 \`openclaw skill init my-skill\` 生成脚手架
2. 编辑 \`skill.yaml\` 声明参数、权限、返回值
3. 在 \`handler.ts\` 里实现执行逻辑
4. 本地测试：\`openclaw skill test my-skill\`
5. 发布：\`openclaw skill publish\`

发布需要注册 ClawHub 账号并通过人工审核（主要看权限声明和描述质量）。审核通过后你的 Skill 会出现在 ClawHub 市场。

## 挑选 Skill 的几条建议

不要装来路不明的 Skill。ClawHub 对官方和社区 Skill 做了区分，官方 \`@official/*\` 命名空间下的是 OpenClaw 团队维护的。社区 Skill 在安装时 CLI 会明确告知作者和签名状态。

挑 Skill 的时候重点看：权限声明是否最小化、近 30 天是否有更新、issue 里有没有未解决的严重问题。

## FAQ

**Q: AgentSkills 和 ClawHub Skills 是同一个东西吗？**

本质是同一个概念。AgentSkills 是开发者视角的称呼（强调它是给 Agent 用的），ClawHub Skills 是从分发角度说（强调它在 Hub 里）。

**Q: Skill 之间的依赖怎么管理？**

skill.yaml 里 \`requires\` 字段声明依赖，安装时自动拉起。循环依赖会在发布时被检测并拒绝。

**Q: 可以在企业内网搭私有 Skill 仓库吗？**

可以。\`openclaw skill registry add <url>\` 添加私有源，支持 HTTPS + Token 鉴权。很多团队把内部工具 Skill 放在自建仓库里，对外只暴露 ClawHub 公共 Skill。

## 下一步

- 浏览 [Best OpenClaw Skills 2026](/blog/best-openclaw-skills-2026) 查看推荐的 25 个 Skill
- 读 [OpenClaw Best Skills](/blog/openclaw-best-skills) 了解必装的 10 款核心 Skill
- 了解 [OpenClaw API Reference](/blog/openclaw-api-reference) 看 Skill SDK 细节`,
    contentEn: `AgentSkills are the core abstraction in the OpenClaw ecosystem — each Skill is a reusable piece of capability an agent can invoke on demand, like "send a Telegram message", "query a database", or "call an external API". ClawHub is the official distribution registry where community-built Skills are published and installed from.

This guide covers what AgentSkills are, the 2026 ClawHub upgrades, and what you need to do as both a user and a publisher.

## What Is an AgentSkill?

An AgentSkill is essentially a function wrapped with metadata — a name, a natural-language description, a parameter schema, and an execution body. At runtime, the agent reads user intent, plans the task, and picks the right Skill to execute.

A few things make Skills different from a traditional SDK or plugin:

- The description is written for the LLM, not for humans — bad descriptions mean the agent picks wrong tools
- Skills are sandboxed: they only get the resources and permissions they explicitly declare
- Skills are composable: one Skill can invoke another Skill internally
- Skills have a deterministic interface: same input, same output, which makes evals reliable

## What's New in ClawHub (2026)

ClawHub 2026 brings several meaningful upgrades:

- **One-line install**: \`openclaw skill install <name>\` pulls the Skill and verifies its signature
- **Version pinning**: every Skill follows semver, so production can lock exact versions and avoid surprise upstream changes
- **Permission surface**: before install, the CLI prints the Skill's declared permissions (network, files, secrets) — you confirm before it proceeds
- **Local sandbox**: by default each Skill runs in an isolated directory; out-of-scope access is rejected and audited
- **Community signals**: download counts, average ratings, and a recent-issues feed surface on every Skill page

## Installing a Skill

The common flow is three commands:

\`\`\`bash
openclaw skill search telegram
openclaw skill install @official/telegram-send
openclaw skill list
\`\`\`

After install you'll find the Skill under \`~/.openclaw/skills/\`. Once enabled, the agent injects its description into the available-tools list at startup.

## Publishing Your Own Skill

1. Run \`openclaw skill init my-skill\` to scaffold
2. Edit \`skill.yaml\` — declare params, permissions, return schema
3. Implement the handler in \`handler.ts\` (or \`handler.py\`)
4. Test locally: \`openclaw skill test my-skill\`
5. Publish: \`openclaw skill publish\`

Publishing requires a ClawHub account and a lightweight human review (mainly checking permission declarations and description quality). Once approved, the Skill appears on the ClawHub marketplace.

## Picking Skills Safely

Don't install random Skills. ClawHub separates official from community: the \`@official/*\` namespace is maintained by the OpenClaw team. For community Skills the CLI clearly shows the author and signature status at install time.

When evaluating a Skill, look at three things: is the permission declaration minimal (a Skill that asks for network + filesystem + secrets to "send a message" is suspicious), has it been updated in the last 30 days, and are there any unresolved serious issues in the tracker.

## FAQ

**Q: Are AgentSkills and ClawHub Skills the same thing?**

They refer to the same concept. "AgentSkills" is the developer-facing term (emphasizing they're consumed by agents); "ClawHub Skills" is the distribution angle (they live in the Hub).

**Q: How do Skill-to-Skill dependencies work?**

The \`requires\` field in skill.yaml declares dependencies; install-time resolves and fetches them. Circular dependencies are detected at publish time and rejected.

**Q: Can I host a private Skill registry inside my company?**

Yes. \`openclaw skill registry add <url>\` adds a private source with HTTPS + token auth. Many teams keep internal tools in a private registry and only expose public ClawHub Skills alongside.

**Q: Are Skills versioned per agent or globally?**

Per agent. Your config file pins specific Skill versions for a given agent, so upgrading ClawHub-wide won't silently change behavior for bots that are already deployed.

## Next Steps

- Browse the [best openclaw skills 2026](/blog/best-openclaw-skills-2026) list of 25 recommended Skills
- Read [openclaw best skills](/blog/openclaw-best-skills) for the 10 must-install core Skills
- See the [openclaw api reference](/blog/openclaw-api-reference) for Skill SDK details`,
    author: "OpenClaw 101",
    date: "2026-04-14",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw", "agentskills", "clawhub", "skills", "marketplace", "2026"],
    readingTime: 7,
    image: "/og-image.png"
  },
  {
    id: 33,
    slug: "openclaw-supported-channels",
    title: "OpenClaw 支持的消息平台（2026）——QQ、Discord、WhatsApp 等全平台接入清单",
    titleEn: "OpenClaw Supported Channels (2026) – QQ, Discord, WhatsApp",
    excerpt: "OpenClaw 在 2026 年支持哪些消息平台？本文给出 QQ、Telegram、Discord、Feishu、Slack、WhatsApp 的接入方式、成熟度和上手链接。",
    excerptEn: "Which messaging platforms does OpenClaw support in 2026? This guide lists QQ, Telegram, Discord, Feishu, Slack, and WhatsApp — with integration path, maturity level, and setup links.",
    content: `OpenClaw 的目标是做一个统一的 Agent 运行时，把同一个 Agent 逻辑挂到不同的消息平台上。本文给出 2026 年 OpenClaw 官方和社区支持的 6 个主要消息平台、各自的接入方式、成熟度、以及具体的上手链接。

## 一张表看完全平台支持

| 平台 | 官方原生 | 社区适配 | 成熟度 | 入口文档 |
|------|---------|---------|--------|----------|
| Telegram | ✅ | — | 稳定 | [10 分钟搭建教程](/blog/openclaw-telegram-tutorial) |
| QQ | ✅ (v2026.3.31) | — | 稳定 | [QQ Bot 配置指南](/blog/openclaw-qq-bot-native-integration) |
| Feishu / 飞书 | ✅ | — | 稳定 | [Feishu 完整教程](/blog/openclaw-feishu-tutorial) |
| Discord | — | ✅ | 可用 | ClawHub 搜索 \`discord-bridge\` |
| Slack | — | ✅ | 可用 | ClawHub 搜索 \`slack-adapter\` |
| WhatsApp | — | ✅ (Cloud API) | 实验 | [WhatsApp 接入指南](/blog/openclaw-whatsapp-integration) |

## 官方原生接入：Telegram / QQ / Feishu

这三个是 OpenClaw 官方直接维护的 Channel。

- **Telegram** 是最早支持的平台，Bot API 开放度高，适合从零快速跑通，参考 [10 分钟上手教程](/blog/openclaw-telegram-tutorial)
- **QQ** 是 2026.3.31 原生加入的平台，国内第一个官方接入的社交平台，参考 [QQ Bot 集成文档](/blog/openclaw-qq-bot-native-integration)
- **Feishu** 主要服务企业场景，支持消息、消息卡片、群机器人，参考 [Feishu 教程](/blog/openclaw-feishu-tutorial)

官方 Channel 的共同特点：直接通过 \`openclaw --platform <name>\` 启动，Token 在 config 里配置，升级由官方统一推送。

## 社区适配：Discord / Slack

Discord 和 Slack 目前通过 ClawHub 上的社区 Adapter 接入。

- **Discord**：\`openclaw skill install @community/discord-bridge\`，需要在 Discord 开发者后台创建 Bot 并填入 Token
- **Slack**：\`openclaw skill install @community/slack-adapter\`，支持 Slack App 的 Events API 和 Slash Commands

社区 Adapter 的好处是迭代快，缺点是你要自己跟进上游 API 变更。如果你的团队重度依赖某个平台，建议 fork 一份到内部私有仓库锁版本。

## 实验支持：WhatsApp

WhatsApp 目前通过 Meta 官方的 Cloud API 对接，属于实验性支持：

- 需要通过 Meta Business 审核才能获得 Cloud API 凭证
- 官方模板消息和客户发起的 24 小时对话窗口有严格区分
- 社区 Adapter 处理了模板消息、Webhook 签名校验、Media 上传

详细步骤见 [OpenClaw WhatsApp Integration 指南](/blog/openclaw-whatsapp-integration)。

## 怎么选 Channel？

几个经验规则：

- 快速验证想法 → 用 Telegram，零审核、API 最成熟
- 国内用户为主 → QQ 或 Feishu，延迟低、合规友好
- 企业内部协作 → Feishu 或 Slack，看团队现有工具栈
- 2C 触达海外客户 → WhatsApp（实验），或 Telegram（成熟）

一个 Agent 可以同时挂到多个 Channel——在 config 里声明多个 platform，同一套业务逻辑会并行工作。

## FAQ

**Q: 一个 Bot 能同时跑在 QQ 和 Telegram 吗？**

可以。OpenClaw 的 Agent 核心是 Channel 无关的，只要在启动时 \`--platform telegram --platform qq\` 同时声明即可。

**Q: WhatsApp 什么时候会升级到官方原生支持？**

目前官方没有公开 ETA。Meta 的 Cloud API 审核门槛和商业条款是主要瓶颈。关注 [OpenClaw 发布日志](/blog/openclaw-qq-bot-native-integration) 获取最新官方 Channel 信息。

**Q: 我想接微信，有办法吗？**

微信个人号目前没有合规方案，OpenClaw 不提供也不推荐。企业微信可以通过 Feishu 类似的 API 接入，社区有相关 Adapter。

## 下一步

- 想马上跑一个 Bot？从 [Telegram 教程](/blog/openclaw-telegram-tutorial) 开始最快
- 想了解每个 Channel 的配置细节？读 [OpenClaw Configuration Guide](/blog/openclaw-configuration-guide)
- 想自己写 Adapter？参考 [OpenClaw API Reference](/blog/openclaw-api-reference)`,
    contentEn: `OpenClaw aims to be a unified agent runtime you can plug into any messaging platform, so the same agent logic can reach users wherever they are. This guide lists the 6 main messaging platforms OpenClaw officially or community-supports in 2026, how each is integrated, its maturity level, and the concrete setup path.

## Full Platform Support Table

| Platform | Official native | Community adapter | Maturity | Docs |
|----------|-----------------|-------------------|----------|------|
| Telegram | ✅ | — | Stable | [10-minute setup](/blog/openclaw-telegram-tutorial) |
| QQ | ✅ (v2026.3.31) | — | Stable | [QQ Bot setup guide](/blog/openclaw-qq-bot-native-integration) |
| Feishu | ✅ | — | Stable | [Feishu complete guide](/blog/openclaw-feishu-tutorial) |
| Discord | — | ✅ | Usable | ClawHub: \`discord-bridge\` |
| Slack | — | ✅ | Usable | ClawHub: \`slack-adapter\` |
| WhatsApp | — | ✅ (Cloud API) | Experimental | [WhatsApp integration](/blog/openclaw-whatsapp-integration) |

## Official Native: Telegram / QQ / Feishu

These three are first-party channels maintained directly by the OpenClaw team.

- **Telegram** was the first supported channel — the Bot API is open, rate-limits are generous, and it's the fastest way to get a working bot end-to-end. See the [10-minute openclaw + telegram tutorial](/blog/openclaw-telegram-tutorial).
- **QQ** landed natively in v2026.3.31 — the first Chinese social platform with official OpenClaw support. Full setup in the [qq bot integration guide](/blog/openclaw-qq-bot-native-integration).
- **Feishu** targets enterprise workflows — messages, message cards, group bots, and webhooks all supported. See the [feishu complete guide](/blog/openclaw-feishu-tutorial).

Common traits of official channels: launch with \`openclaw --platform <name>\`, tokens live in config, upgrades ship through the official release channel.

## Community Adapters: Discord / Slack

Discord and Slack are currently integrated via community adapters published on ClawHub.

- **Discord**: \`openclaw skill install @community/discord-bridge\`. You'll create a bot in the Discord Developer Portal and paste the token into your OpenClaw config.
- **Slack**: \`openclaw skill install @community/slack-adapter\`. Supports Slack App Events API and Slash Commands out of the box.

Community adapters iterate fast — the trade-off is you track upstream API changes yourself. If your team depends heavily on one platform, fork the adapter into a private registry and pin the version.

## Experimental: WhatsApp

WhatsApp integration currently rides on Meta's Cloud API and is flagged experimental:

- You need Meta Business verification to get Cloud API credentials
- Template messages vs the 24-hour customer-initiated conversation window have strict, separate rules
- The community adapter handles template messages, webhook signature verification, and media uploads

Step-by-step in the [openclaw whatsapp integration guide](/blog/openclaw-whatsapp-integration).

## How to Pick a Channel

A few heuristics:

- **Fastest prototype** → Telegram. Zero approval, most mature Bot API.
- **China-first user base** → QQ or Feishu. Low latency, compliance-friendly.
- **Internal team tools** → Feishu or Slack, depending on existing stack.
- **Global B2C reach** → WhatsApp (experimental) or Telegram (mature).

A single agent can bind to multiple channels at once — declare multiple platforms in config and the same agent logic runs in parallel on each.

## FAQ

**Q: Can one bot run on QQ and Telegram at the same time?**

Yes. OpenClaw's agent core is channel-agnostic. Just pass \`--platform telegram --platform qq\` at startup or declare both in config.

**Q: When will WhatsApp become an official native channel?**

No public ETA. Meta's Cloud API approval and commercial terms are the main blocker. Watch the [OpenClaw release notes](/blog/openclaw-qq-bot-native-integration) for future channel announcements.

**Q: Can I integrate WeChat?**

Personal WeChat has no compliant API path, so OpenClaw doesn't support it. Enterprise WeChat (企业微信) has a Feishu-style API that community adapters cover.

**Q: Do I need a separate bot token per channel?**

Yes. Each channel has its own auth model — one bot, N tokens, all in your OpenClaw config.

## Next Steps

- Want a working bot today? Start with the [openclaw telegram tutorial](/blog/openclaw-telegram-tutorial).
- Need per-channel config details? Read the [openclaw configuration guide](/blog/openclaw-configuration-guide).
- Building your own adapter? Start from the [openclaw api reference](/blog/openclaw-api-reference).`,
    author: "OpenClaw 101",
    date: "2026-04-14",
    category: "OpenClaw 入门",
    categoryEn: "OpenClaw Basics",
    tags: ["openclaw", "channels", "qq", "discord", "whatsapp", "telegram", "feishu", "slack"],
    readingTime: 6,
    image: "/og-image.png"
  },
  {
    id: 34,
    slug: "openclaw-whatsapp-integration",
    title: "OpenClaw WhatsApp 接入指南（2026）——Cloud API 完整配置步骤",
    titleEn: "OpenClaw WhatsApp Integration (2026) – Step-by-Step Setup Guide",
    excerpt: "把 OpenClaw Agent 接入 WhatsApp 的完整流程：Meta Business 账号准备、Cloud API 获取凭证、Webhook 配置、模板消息发送、常见报错排查。",
    excerptEn: "Connect your OpenClaw agent to WhatsApp in under an hour: Meta Business setup, Cloud API credentials, webhook config, template messages, and common error troubleshooting.",
    content: `WhatsApp 全球月活超过 20 亿，是 B2C 触达海外客户最有效的渠道之一。OpenClaw 通过 Meta 官方的 WhatsApp Cloud API 接入——本文给出完整的 Step-by-Step 流程，从 Meta Business 账号准备到第一条消息发出，大约 45 分钟。

> ⚠️ WhatsApp 接入目前是实验性支持（社区 Adapter）。如果你的业务要求官方原生，可以先用 [Telegram](/blog/openclaw-telegram-tutorial) 或 [QQ](/blog/openclaw-qq-bot-native-integration) 跑通。

## 开始前你需要

- Meta Business 账号（免费，需完成营业信息验证）
- 一个未被其他 WhatsApp App 占用的手机号（用于接收验证码）
- OpenClaw 本地或服务器环境（参考 [安装教程](/blog/how-to-install-openclaw)）
- 一个公网可达的 HTTPS Endpoint（用来接收 WhatsApp Webhook，本地开发可以用 ngrok）

## Step 1：在 Meta 后台创建 App

1. 打开 [developers.facebook.com/apps](https://developers.facebook.com/apps)
2. 点 "Create App" → 选 "Business" 类型
3. 添加 "WhatsApp" 产品到 App
4. 在 "Quickstart" 页面记下 Phone Number ID、WhatsApp Business Account ID，以及临时 Access Token（24 小时有效）

## Step 2：生成长期 Access Token

临时 Token 仅用于测试，生产需要系统用户 Token：

1. 进入 Meta Business Settings → Users → System Users
2. 新建一个 System User，角色选 "Employee"
3. 给 System User 授予对应 WhatsApp Business Account 的权限
4. 点 "Generate New Token"，勾选 \`whatsapp_business_messaging\` 和 \`whatsapp_business_management\` 权限
5. 复制生成的永久 Token 并妥善保存（⚠️ 只显示一次）

## Step 3：安装 OpenClaw WhatsApp Adapter

\`\`\`bash
openclaw skill install @community/whatsapp-cloud-api
\`\`\`

安装时 CLI 会列出 Adapter 声明的权限（网络访问 graph.facebook.com、读取 config 里的 secrets）。确认后继续。

## Step 4：配置凭证

在 \`~/.openclaw/config.yaml\` 添加：

\`\`\`yaml
channels:
  whatsapp:
    phone_number_id: "YOUR_PHONE_NUMBER_ID"
    access_token: "${ 'WHATSAPP_TOKEN' }"  # 从 env var 读取
    verify_token: "pick-a-random-string"   # Webhook 校验用
    api_version: "v20.0"
\`\`\`

把 Access Token 放到环境变量里，不要直接写进 config：

\`\`\`bash
export WHATSAPP_TOKEN="EAAxxxx..."
\`\`\`

## Step 5：配置 Webhook

WhatsApp 通过 Webhook 推送入站消息：

1. 启动 OpenClaw：\`openclaw start --platform whatsapp\`，默认监听 \`/webhooks/whatsapp\`
2. 本地开发用 ngrok 暴露：\`ngrok http 3000\`
3. 回到 Meta App → WhatsApp → Configuration → Webhooks
4. 填 \`https://your-ngrok.ngrok.io/webhooks/whatsapp\` 作为 Callback URL
5. Verify Token 填步骤 4 里的 \`verify_token\`
6. 订阅 \`messages\` 事件

## Step 6：发第一条测试消息

Meta 要求首次会话必须是预先审核过的 Template。测试阶段有内置的 \`hello_world\` 模板：

\`\`\`bash
openclaw whatsapp send \\
  --to "8613800138000" \\
  --template hello_world \\
  --lang en_US
\`\`\`

对方回复后，你有 24 小时窗口可以发送自由格式消息（称为 "Service Conversation"）。窗口过期后再次主动联系必须走模板。

## 常见错误

- **131051 Parameter value is not valid**：模板参数数量对不上模板定义，检查模板变量
- **132000 Not Authorized**：Access Token 没有 \`whatsapp_business_messaging\` 权限，或已过期
- **Webhook verify 失败**：\`verify_token\` 与 Meta 后台填的不一致
- **一直收不到消息**：检查 Meta 后台 Webhook 是否订阅了 \`messages\` 事件

## 上线前的 Checklist

- [ ] Access Token 通过 env var 注入，不在 git 里
- [ ] Webhook Endpoint 启用了 HTTPS + 签名校验（\`x-hub-signature-256\`）
- [ ] 对接 Meta Business 审核，提交至少一个生产用模板
- [ ] 明确 24 小时会话窗口的业务逻辑，避免超窗再推被降权
- [ ] 接入监控：入站消息数、发送失败率、模板审核状态

## FAQ

**Q: 必须通过 Meta 审核才能发消息吗？**

开发测试有 test number 额度可以发给验证过的号码，不需要业务审核。但正式上线必须走 Business Verification + 模板审核。

**Q: OpenClaw 支持 WhatsApp Business App（手机版）吗？**

不支持。手机版 Business App 没有公开 API，只能走 Cloud API 或 Business Platform（BSP）。

**Q: 每条消息多少钱？**

按 Meta 定价分类别和地区计费——Marketing、Utility、Authentication 费率不同。具体见 [Meta Pricing](https://developers.facebook.com/docs/whatsapp/pricing)。

## 下一步

- 完成 WhatsApp 后想加 Telegram？看 [Telegram 教程](/blog/openclaw-telegram-tutorial)
- 想对比全平台支持情况？读 [OpenClaw Supported Channels](/blog/openclaw-supported-channels)
- 自己写适配器？参考 [OpenClaw API Reference](/blog/openclaw-api-reference)`,
    contentEn: `WhatsApp has over 2 billion monthly active users, making it one of the highest-reach B2C channels for global customers. OpenClaw integrates with WhatsApp via Meta's official Cloud API. This guide walks through the full setup end-to-end — Meta Business account, Cloud API credentials, webhook config, first message — in about 45 minutes.

> ⚠️ WhatsApp support is currently experimental (community adapter). If you need official first-party support today, start with [Telegram](/blog/openclaw-telegram-tutorial) or [QQ](/blog/openclaw-qq-bot-native-integration).

## Before You Start

- A Meta Business account (free, requires business verification)
- A phone number not currently used by any WhatsApp app (for verification codes)
- A running OpenClaw environment (see the [installation guide](/blog/how-to-install-openclaw))
- A public HTTPS endpoint to receive webhooks (ngrok works for local dev)

## Step 1: Create an App in Meta's Dashboard

1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps)
2. Click "Create App" → choose the "Business" type
3. Add the "WhatsApp" product to the app
4. On the Quickstart page, note down: Phone Number ID, WhatsApp Business Account ID, and the temporary Access Token (valid 24 hours)

## Step 2: Generate a Permanent Access Token

Temporary tokens are for testing only. For production you need a System User token:

1. Go to Meta Business Settings → Users → System Users
2. Create a new System User with the "Employee" role
3. Grant the System User access to your WhatsApp Business Account
4. Click "Generate New Token" and tick the \`whatsapp_business_messaging\` and \`whatsapp_business_management\` scopes
5. Copy the generated token and store it securely (⚠️ shown only once)

## Step 3: Install the OpenClaw WhatsApp Adapter

\`\`\`bash
openclaw skill install @community/whatsapp-cloud-api
\`\`\`

During install, the CLI lists the permissions the adapter declares (network access to graph.facebook.com, reading secrets from config). Confirm to continue.

## Step 4: Configure Credentials

Add to \`~/.openclaw/config.yaml\`:

\`\`\`yaml
channels:
  whatsapp:
    phone_number_id: "YOUR_PHONE_NUMBER_ID"
    access_token: "${ 'WHATSAPP_TOKEN' }"  # read from env
    verify_token: "pick-a-random-string"   # used for webhook verification
    api_version: "v20.0"
\`\`\`

Keep the access token in an environment variable, never in the config file itself:

\`\`\`bash
export WHATSAPP_TOKEN="EAAxxxx..."
\`\`\`

## Step 5: Wire Up the Webhook

WhatsApp delivers inbound messages via webhook:

1. Start OpenClaw: \`openclaw start --platform whatsapp\`. It listens on \`/webhooks/whatsapp\` by default.
2. For local development, expose it with ngrok: \`ngrok http 3000\`
3. In the Meta App dashboard → WhatsApp → Configuration → Webhooks
4. Set the Callback URL to \`https://your-ngrok.ngrok.io/webhooks/whatsapp\`
5. Set Verify Token to the value from Step 4
6. Subscribe to the \`messages\` event

## Step 6: Send Your First Test Message

Meta requires the first message to be a pre-approved template. In testing, the built-in \`hello_world\` template is available:

\`\`\`bash
openclaw whatsapp send \\
  --to "14155551234" \\
  --template hello_world \\
  --lang en_US
\`\`\`

Once the user replies, you have a 24-hour "Service Conversation" window to send free-form messages. After that window closes, any outbound message must again be a template.

## Common Errors

- **131051 Parameter value is not valid**: template parameter count doesn't match the template definition — check template variables
- **132000 Not Authorized**: access token is missing \`whatsapp_business_messaging\` scope or has expired
- **Webhook verify failure**: the \`verify_token\` doesn't match what's set in the Meta dashboard
- **No inbound messages arriving**: confirm the Meta dashboard has the \`messages\` event subscribed

## Pre-Launch Checklist

- [ ] Access token injected via env var, not committed to git
- [ ] Webhook endpoint uses HTTPS and verifies \`x-hub-signature-256\`
- [ ] Submitted at least one production template for Meta approval
- [ ] 24-hour window logic is explicit — avoid over-window sends that hurt sender quality
- [ ] Monitoring in place: inbound message count, send failure rate, template approval status

## FAQ

**Q: Do I need Meta Business verification to send messages?**

For dev/test there's a free test-number quota you can send to verified recipients without full business verification. For production you need Business Verification plus template approval.

**Q: Does OpenClaw support the WhatsApp Business App (mobile)?**

No. The mobile Business App has no public API. You must use Cloud API or a BSP (Business Solution Provider).

**Q: How much does each message cost?**

Meta prices per conversation category (Marketing, Utility, Authentication) and region. See [Meta's WhatsApp pricing](https://developers.facebook.com/docs/whatsapp/pricing) for current rates.

**Q: Can I send images, videos, and documents?**

Yes. The adapter supports media uploads via the Cloud API Media endpoint. Each media type has size limits (image 5MB, video 16MB, document 100MB as of 2026).

## Next Steps

- Want to add Telegram too? See the [telegram bot tutorial](/blog/openclaw-telegram-tutorial).
- Need the full channel matrix? Read [openclaw supported channels](/blog/openclaw-supported-channels).
- Writing your own adapter? Start from the [openclaw api reference](/blog/openclaw-api-reference).`,
    author: "OpenClaw 101",
    date: "2026-04-14",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw", "whatsapp", "integration", "cloud-api", "2026", "setup"],
    readingTime: 7,
    image: "/og-image.png"
  },
];
