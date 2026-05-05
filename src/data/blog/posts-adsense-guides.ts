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
    titleEn: "OpenClaw Workflow Guide – Real Use Cases (2026)",
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

🎯 **延伸场景阅读**：
- [OpenClaw 个人知识管理（PKM）工作流](/blog/openclaw-pkm)
- [OpenClaw + n8n 自动化终极组合](/blog/openclaw-n8n-automation)
- [OpenClaw + Browser Use — 让 AI 自动操控浏览器](/blog/openclaw-browser-use-integration)

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
*Content reviewed by the OpenClaw 101 editorial team*

## FAQ

**Q: How long does each workflow take to set up?**

Most of these take 15–30 minutes for first setup. Reusing them afterward is a single command or a scheduled cron.

**Q: Can workflows be combined?**

Yes. One workflow can invoke another by calling its entry command. A daily report workflow can trigger code-review for flagged PRs, which can then post to Slack via the channel adapter.

**Q: Do workflows run locally or in the cloud?**

Both. The same workflow definition runs on your laptop with \`openclaw start\` or on a VPS/container in production. See the [deployment guide](/blog/openclaw-deployment-guide) for production patterns.

**Q: How do I debug a workflow that breaks?**

Run it with \`--log-level debug\` to see every Skill invocation. Each Skill logs its inputs, outputs, and elapsed time — so you can pinpoint the slow or failing step quickly.

---

🎯 **More workflow patterns**:
- [OpenClaw personal knowledge management (PKM)](/blog/openclaw-pkm)
- [OpenClaw + n8n — automation playbook](/blog/openclaw-n8n-automation)
- [OpenClaw + Browser Use — let AI drive the browser](/blog/openclaw-browser-use-integration)
`,
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
- 了解 [OpenClaw API Reference](/blog/openclaw-api-reference) 看 Skill SDK 细节
- 浏览器控制场景：[OpenClaw + Browser Use 集成](/blog/openclaw-browser-use-integration)
- 个人知识管理场景：[OpenClaw PKM 工作流](/blog/openclaw-pkm)`,
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
| Discord | — | ✅ | 可用 | [Discord 接入完整教程](/blog/openclaw-discord-integration) |
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
| Discord | — | ✅ | Usable | [Discord integration tutorial](/blog/openclaw-discord-integration) |
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
  {
    id: 35,
    slug: "openclaw-vscode-extension",
    title: "OpenClaw VS Code 集成指南（2026）——在编辑器里直接跑 Agent",
    titleEn: "OpenClaw VS Code Extension & Setup (2026) – Run Agents Inside Your Editor",
    excerpt: "如何在 VS Code 里使用 OpenClaw：终端集成、MCP 连接、任务触发、调试 Skill。不需要额外插件，开箱即用。",
    excerptEn: "How to use OpenClaw inside VS Code — terminal integration, MCP connection, task triggers, and Skill debugging. Works out of the box, no custom extension required.",
    content: `如果你每天的开发时间都在 VS Code 里，把 OpenClaw 接进编辑器能省掉频繁切终端的成本。本文给出 3 种在 VS Code 里跑 OpenClaw 的方式，覆盖轻量使用到深度集成的场景。

## 为什么要在 VS Code 里跑 OpenClaw？

- **上下文更近**：Agent 直接看到你当前文件、git 分支、选中代码
- **调用更顺**：选中代码 → 右键 → 让 OpenClaw 处理，不用复制粘贴
- **调试更快**：Skill 执行日志、中间输出直接在编辑器里查看
- **团队一致**：把启动配置 commit 到 \`.vscode/tasks.json\`，新人 clone 下来立刻能用

## 方式 1：集成终端（最简单）

最低门槛的接法——OpenClaw CLI 在 VS Code 内置终端里直接跑：

\`\`\`bash
openclaw start --platform telegram
\`\`\`

配合 VS Code Tasks，把启动命令写进 \`.vscode/tasks.json\`：

\`\`\`json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start OpenClaw",
      "type": "shell",
      "command": "openclaw start --platform telegram",
      "isBackground": true,
      "presentation": { "panel": "dedicated" }
    }
  ]
}
\`\`\`

之后 \\\`Cmd/Ctrl+Shift+P\\\` → Run Task → Start OpenClaw。这是 80% 场景下最推荐的接法。

## 方式 2：MCP 连接（深度集成）

MCP（Model Context Protocol）让 VS Code 里支持 MCP 的 AI 助手直接调用 OpenClaw Skills。适用于你在 VS Code 里用 Claude Code、Cursor、Continue 的场景。

1. 启用 MCP 端口：\\\`openclaw start --mcp-port 8765\\\`
2. 在 AI 助手的 MCP 配置里加 OpenClaw：
   \`\`\`json
   {
     "mcpServers": {
       "openclaw": { "url": "http://localhost:8765" }
     }
   }
   \`\`\`
3. AI 助手会自动发现 OpenClaw 已安装的全部 Skills 并按指令调用。

典型用法：在 Claude Code 里说"用 telegram-send 把构建状态推给我"，Claude 走 MCP 调 OpenClaw 的 Telegram Skill。

## 方式 3：Keybinding + Launch 配置（高频用户）

每天启停 Agent 十几次的话，绑快捷键最省时间。

VS Code \`keybindings.json\`：

\`\`\`json
[
  { "key": "cmd+shift+o", "command": "workbench.action.tasks.runTask", "args": "Start OpenClaw" },
  { "key": "cmd+shift+x", "command": "workbench.action.tasks.terminate", "args": "Start OpenClaw" }
]
\`\`\`

配合 \`.vscode/launch.json\` 可以 Debug 某个 Skill，单步断点：

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug OpenClaw Skill",
      "program": "\${workspaceFolder}/skills/my-skill/handler.js",
      "cwd": "\${workspaceFolder}"
    }
  ]
}
\`\`\`

## 关于"OpenClaw VS Code Extension"

OpenClaw 官方目前**没有**在 Marketplace 上架独立 VS Code 扩展。上面三种方式覆盖了扩展能提供的大部分价值（启动、调试、快捷键、MCP）。Marketplace 里社区扩展搜 \`openclaw\` 有几个早期版本，但更新不稳定，生产环境建议 CLI + Tasks 的路子更可靠。

## FAQ

**Q: 能在 Remote SSH / Dev Container 里跑吗？**

可以。VS Code Remote SSH 连上远端之后，CLI 和 Tasks 都照常。MCP 的 localhost 端口需要 VS Code port forwarding。

**Q: 调试 Skill 的时候能看到完整的 Agent 决策吗？**

开 \\\`--log-level debug\\\` 启动，每一步调用、参数、返回值都打到终端。用 VS Code Output 面板过滤，比翻日志文件快。

**Q: 多项目切配置怎么搞？**

OpenClaw 支持 \`--config <path>\`。每个项目的 \`.vscode/tasks.json\` 里写 \\\`openclaw start --config ./.openclaw.yaml\\\`，项目级配置随 workspace 加载。

**Q: Skill 代码热重载？**

默认不热重载。\\\`--watch\\\` 可以让 Skill 文件变化后自动重启，但运行中的会话会断。开发期用，生产不建议。

## 下一步

- 先装 OpenClaw？读 [How to Install OpenClaw](/blog/how-to-install-openclaw).
- 挑 Skill 试？看 [OpenClaw Skills List (2026)](/blog/best-openclaw-skills-2026).
- 搞自动化？读 [OpenClaw Workflow Guide](/blog/best-openclaw-workflows-productivity).
- 深入 API？参考 [OpenClaw API Reference](/blog/openclaw-api-reference).`,
    contentEn: `If you spend your dev day in VS Code, wiring OpenClaw into the editor saves the context-switch tax. This guide gives you 3 ways to run OpenClaw inside VS Code — from lightweight to deeply integrated.

## Why Run OpenClaw Inside VS Code?

- **Context is closer** — the agent sees your current file, git branch, selected code
- **Invocations are smoother** — select code, right-click, hand it to OpenClaw
- **Debugging is faster** — Skill logs and intermediate output show up in the editor
- **Team-consistent** — commit the startup config to \`.vscode/tasks.json\` and teammates can run it immediately

## Method 1: Integrated Terminal (Simplest)

Lowest friction. Run the OpenClaw CLI in VS Code's built-in terminal:

\`\`\`bash
openclaw start --platform telegram
\`\`\`

Combine with VS Code Tasks — \`.vscode/tasks.json\`:

\`\`\`json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start OpenClaw",
      "type": "shell",
      "command": "openclaw start --platform telegram",
      "isBackground": true,
      "presentation": { "panel": "dedicated" }
    }
  ]
}
\`\`\`

Then \\\`Cmd/Ctrl+Shift+P\\\` → Run Task → Start OpenClaw. Recommended for 80% of use cases.

## Method 2: MCP Integration (Deep)

MCP (Model Context Protocol) lets any MCP-aware AI assistant in VS Code invoke OpenClaw Skills directly. Useful with Claude Code, Cursor, or Continue.

1. Enable the MCP port: \\\`openclaw start --mcp-port 8765\\\`
2. Add OpenClaw to the AI assistant's MCP config:
   \`\`\`json
   {
     "mcpServers": {
       "openclaw": { "url": "http://localhost:8765" }
     }
   }
   \`\`\`
3. The AI assistant auto-discovers OpenClaw-installed Skills and routes requests.

Typical use: in Claude Code, say "push the build status via telegram-send" and Claude routes through MCP to OpenClaw's Telegram Skill.

## Method 3: Keybindings + Launch Config (Power Users)

If you start/stop agents dozens of times a day, bind keys. In \`keybindings.json\`:

\`\`\`json
[
  { "key": "cmd+shift+o", "command": "workbench.action.tasks.runTask", "args": "Start OpenClaw" },
  { "key": "cmd+shift+x", "command": "workbench.action.tasks.terminate", "args": "Start OpenClaw" }
]
\`\`\`

Pair with \`.vscode/launch.json\` for step-through debugging:

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug OpenClaw Skill",
      "program": "\${workspaceFolder}/skills/my-skill/handler.js",
      "cwd": "\${workspaceFolder}"
    }
  ]
}
\`\`\`

## About "OpenClaw VS Code Extension"

OpenClaw ships **no** first-party VS Code Marketplace extension today. The three methods above cover most of what an extension would provide (startup, debugging, shortcuts, MCP). Marketplace has a few community extensions under \`openclaw\` — they update irregularly, so for production stick with CLI + Tasks.

## FAQ

**Q: Does it work in Remote SSH or Dev Containers?**

Yes. CLI and Tasks work normally once Remote SSH is connected. For MCP, use VS Code port forwarding to reach the localhost MCP port.

**Q: Can I see the full agent decision trace when debugging?**

Start OpenClaw with \\\`--log-level debug\\\`. Every Skill invocation, inputs, and return values print to the terminal. VS Code Output panel filter is faster than tailing log files.

**Q: How do I switch configs across projects?**

Use \`--config <path>\` in each project's \`.vscode/tasks.json\`: \\\`openclaw start --config ./.openclaw.yaml\\\`. Project config loads with the workspace.

**Q: Can Skill code hot-reload?**

Not by default. \\\`--watch\\\` restarts Skills on file change but drops in-flight sessions. Dev only.

## Next Steps

- New to OpenClaw? Start with [How to Install OpenClaw](/blog/how-to-install-openclaw).
- Pick Skills to try — see [OpenClaw Skills List (2026)](/blog/best-openclaw-skills-2026).
- Automate real work — [OpenClaw Workflow Guide](/blog/best-openclaw-workflows-productivity).
- Go deeper — [OpenClaw API Reference](/blog/openclaw-api-reference).`,
    author: "OpenClaw 101",
    date: "2026-04-14",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw", "vscode", "vs-code", "extension", "editor", "mcp", "2026"],
    readingTime: 6,
    image: "/og-image.png"
  },
  {
    id: 36,
    slug: "openclaw-pkm",
    title: "OpenClaw 个人知识管理指南（2026）——用 AI Agent 搭你的 PKM 工作流",
    titleEn: "OpenClaw for Personal Knowledge Management (PKM) (2026)",
    excerpt: "用 OpenClaw 把笔记、书签、待办、日记串成一个可以自动索引、自动整理、自动回顾的 PKM 系统。对接 Obsidian、Notion、Logseq。",
    excerptEn: "Use OpenClaw to wire notes, bookmarks, tasks, and journals into a PKM workflow that auto-indexes, auto-organizes, and auto-reviews — with Obsidian, Notion, or Logseq.",
    content: `PKM 的痛点从来不是工具不够——Obsidian、Notion、Logseq 都足够强——而是串不成"真的在用"的系统。OpenClaw 作为 Agent 运行时正好填这个缝：自动索引、标签整理、周期回顾、跨工具同步，全部走 Skill 完成。

这篇给一套**今天就能搭**起来的 PKM 工作流，覆盖 Obsidian / Notion / Logseq。

## PKM 里 OpenClaw 能做什么

不是取代笔记工具，是补齐自动化空白：

- **自动入库**：邮件、文章、聊天记录 → 自动摘要 → 存进笔记库
- **标签与反向链接**：扫孤立笔记，自动打标签、补 backlink
- **周期回顾**：每天/每周自动拉"过去同时期"的笔记做复盘
- **跨工具同步**：Notion task 同步到 Obsidian Daily Note
- **对话式检索**：问自然语言，Agent 在笔记库做 RAG 并回答

## 方案 A：Obsidian + OpenClaw

Obsidian 本地 Markdown，OpenClaw 直接读写最顺。

**需要的 Skill**：
- \\\`@official/file-read\\\`、\\\`@official/file-write\\\`
- \\\`@official/llm-summarize\\\`
- \\\`@community/obsidian-index\\\`（读 Obsidian 的 backlinks 元数据）

**周复盘 Agent**：每周日晚上扫 \`~/vault/journal/\` 过去 7 天的日记，写一篇"本周发生了什么 + 下周关注点"到 \`weekly-review/YYYY-WW.md\`。

\`\`\`yaml
agents:
  - name: obsidian-weekly
    schedule: "0 21 * * 0"
    task: |
      Read all notes in ~/vault/journal/ modified in the last 7 days.
      Summarize recurring themes, unresolved items, and key insights.
      Write to ~/vault/weekly-review/\\\${YYYY-WW}.md.
    skills: [file-read, file-write, llm-summarize]
\`\`\`

## 方案 B：Notion + OpenClaw

Notion 官方 API 成熟，适合团队 PKM 或重度依赖数据库视图。

**需要的 Skill**：
- \\\`@community/notion-api\\\`
- \\\`@community/web-fetch\\\`
- \\\`@official/llm-tag\\\`

**书签自动入库**：发 URL 给 CLI → Agent 抓页面 → LLM 摘要+打标签 → 存进 Notion "Reading List"。

\`\`\`yaml
agents:
  - name: notion-bookmark
    trigger: cli
    task: |
      Given a URL, fetch its content, generate a 3-sentence summary,
      tag with 3-5 relevant tags, and insert into Notion database
      "Reading List" with title, URL, summary, tags, added_at.
    skills: [web-fetch, llm-tag, notion-api]
\`\`\`

\`openclaw run notion-bookmark --url https://example.com/article\` — 10 秒搞定。

## 方案 C：Logseq + OpenClaw

Logseq 基于块（block），适合"快速捕获→后期整理"。

**需要的 Skill**：
- \\\`@community/logseq-graph\\\`
- \\\`@official/llm-cluster\\\`

**孤立块聚类**：orphaned blocks（无 backlink 的块）是最容易被遗忘的知识。Agent 每周扫一次，语义聚类，建议合并或建立 backlink。

## 整合建议

- **入口单一**：所有 PKM Agent 走同一个 OpenClaw 实例，不要分散
- **幂等设计**：给每条入库加唯一 ID（URL hash/timestamp），入库前查重
- **回看友好**：每次 Agent 执行日志写到 \`~/vault/agent-log/\`，方便你人工审查
- **避免幻觉**：标签和摘要只给 LLM 看原文，不要让它"补充背景"

## FAQ

**Q: 我用的是 Roam Research？**

Roam API 有限，双向编辑弱。\`@community/roam-read-only\` 做单向拉取，反向写入走 Markdown 导出。

**Q: 一定要用云端 LLM 吗？**

不。参考 [OpenClaw + LocalAI Integration](/blog/openclaw-localai-integration)，本地 LLM 做摘要和标签够用。

**Q: 能自动把浏览历史转成笔记吗？**

可以但要慎重。加过滤（停留 > 2 min、有正文、排除社交媒体），Agent 只处理"值得记住"的页面。

**Q: 每月多少钱？**

主要是 LLM API——个人用云端大约 \$2–$5/月。本地 LLM 零 API 成本。

## 下一步

- [OpenClaw AgentSkills Explained](/blog/openclaw-agentskills-clawhub) —— 看 Skills 怎么工作
- [OpenClaw Workflow Guide](/blog/best-openclaw-workflows-productivity) —— 完整工作流模板
- [OpenClaw + LocalAI Integration](/blog/openclaw-localai-integration) —— 本地 LLM
- [OpenClaw VS Code Extension](/blog/openclaw-vscode-extension) —— 把 PKM Agent 装进编辑器`,
    contentEn: `PKM pain isn't about tools — Obsidian, Notion, and Logseq are all powerful enough. The pain is wiring them into a system you actually use. OpenClaw as an agent runtime fills that gap: auto-indexing, tag cleanup, periodic review, cross-tool sync.

This guide gives you a PKM workflow you can stand up today, across Obsidian, Notion, and Logseq.

## What Can OpenClaw Do in a PKM Stack?

It doesn't replace your note tool. It covers the automation gap your note tool leaves behind:

- **Auto-capture**: emails, articles, chats → auto-summary → into notes
- **Tag and backlink maintenance**: scan orphan notes, auto-tag, add backlinks
- **Periodic review**: pull "on this date" notes daily/weekly for reflection
- **Cross-tool sync**: Notion tasks surface in Obsidian's Daily Note
- **Conversational retrieval**: ask natural-language questions, agent runs RAG over your notes

## Approach A: Obsidian + OpenClaw

Obsidian stores plain Markdown locally — OpenClaw reads and writes it directly.

**Skills**: \\\`@official/file-read\\\`, \\\`@official/file-write\\\`, \\\`@official/llm-summarize\\\`, \\\`@community/obsidian-index\\\`.

**Weekly review agent**: Sunday evening, agent scans \`~/vault/journal/\` for the last 7 days, writes "what happened + focus for next week" to \`weekly-review/YYYY-WW.md\`.

\`\`\`yaml
agents:
  - name: obsidian-weekly
    schedule: "0 21 * * 0"
    task: |
      Read all notes in ~/vault/journal/ modified in the last 7 days.
      Summarize recurring themes, unresolved items, and key insights.
      Write to ~/vault/weekly-review/\\\${YYYY-WW}.md.
    skills: [file-read, file-write, llm-summarize]
\`\`\`

## Approach B: Notion + OpenClaw

Notion has a mature official API. Good for team PKM or database-heavy workflows.

**Skills**: \\\`@community/notion-api\\\`, \\\`@community/web-fetch\\\`, \\\`@official/llm-tag\\\`.

**Bookmark ingestion**: send a URL (email, CLI, share sheet) → agent fetches → LLM summarizes + tags → inserts into Notion "Reading List".

\`\`\`yaml
agents:
  - name: notion-bookmark
    trigger: cli
    task: |
      Given a URL, fetch its content, generate a 3-sentence summary,
      tag with 3-5 relevant tags, and insert into Notion database
      "Reading List" with title, URL, summary, tags, added_at.
    skills: [web-fetch, llm-tag, notion-api]
\`\`\`

\`openclaw run notion-bookmark --url https://example.com/article\` — 10 seconds for what used to be manual.

## Approach C: Logseq + OpenClaw

Logseq is block-based. Good for "capture fast, organize later."

**Skills**: \\\`@community/logseq-graph\\\`, \\\`@official/llm-cluster\\\`.

**Orphan block clustering**: orphan blocks (no backlinks) are Logseq's dark matter — likely forgotten knowledge. Agent scans weekly, clusters semantically similar ones, suggests merges or backlinks.

## Integration Principles

- **Single entry point** — run all PKM agents from one OpenClaw instance with one credential store
- **Idempotent by design** — each ingestion has a unique ID (URL hash or timestamp); dedupe before insert
- **Review-friendly** — log every agent execution to \`~/vault/agent-log/\` for auditability
- **Avoid LLM drift** — for tagging and summarizing, feed only the source text. Don't let the LLM "add background context." A knowledge base needs accuracy, not completeness.

## FAQ

**Q: I use Roam Research — does this work?**

Roam's API is limited and bi-directional editing is weak. Use \`@community/roam-read-only\` for one-way pulls. For writes, go through Markdown export.

**Q: Do I have to use a cloud LLM?**

No. Run a local LLM — see [OpenClaw + LocalAI Integration](/blog/openclaw-localai-integration). Local models are accurate enough for PKM-scale summarization and tagging.

**Q: Can I auto-capture browser history into notes?**

Yes, but carefully. Raw history is noisy. Add filters (dwell > 2 min, clear article content, no social feeds) so the agent only ingests pages worth remembering.

**Q: What does this cost per month?**

Mostly LLM API — personal cloud use is \$2–$5/month. Local LLM is zero API cost but you maintain hardware.

## Next Steps

- [OpenClaw AgentSkills Explained](/blog/openclaw-agentskills-clawhub) — how Skills work under the hood
- [OpenClaw Workflow Guide](/blog/best-openclaw-workflows-productivity) — full workflow templates
- [OpenClaw + LocalAI Integration](/blog/openclaw-localai-integration) — local LLM
- [OpenClaw VS Code Extension](/blog/openclaw-vscode-extension) — PKM agents inside the editor`,
    author: "OpenClaw 101",
    date: "2026-04-14",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw", "pkm", "personal-knowledge-management", "obsidian", "notion", "logseq", "2026"],
    readingTime: 8,
    image: "/og-image.png"
  },
  {
    id: 37,
    slug: "openclaw-discord-integration",
    title: "OpenClaw Discord Bot 接入教程（2026）",
    titleEn: "OpenClaw Discord Integration Guide (2026)",
    excerpt: "用 OpenClaw 搭一个 Discord Bot：创建 App、配置 Gateway Intent、连接 OpenClaw、自定义 Slash Command。",
    excerptEn: "Set up an OpenClaw Discord bot: create the App, configure Gateway Intents, wire to OpenClaw, add slash commands.",
    content: `OpenClaw 官方支持多种渠道接入，Discord 是其中最受开发者社区欢迎的一个。无论你是想搭一个团队内部的 AI 助手机器人，还是为开源项目提供自动化答疑，这篇教程都会带你完整走完整个流程。

> 相关阅读：[OpenClaw 支持哪些渠道接入？](/blog/openclaw-supported-channels)

---

## 为什么选择 Discord Bot？

Discord 已经成为开发者、游戏社区和开源项目的核心协作平台。把 OpenClaw 接入 Discord 有以下几个典型场景：

- **团队内部助手**：在私有服务器里，让 OpenClaw 回答技术问题、执行代码审查 Skill。
- **社区自动答疑**：在开源项目服务器里，自动回复常见问题，减轻维护者负担。
- **工作流触发器**：通过 Slash Command 触发 CI/CD 流程或远程脚本执行。
- **学习陪练**：在学习型社区中，让 Bot 陪学员做编程练习和代码 Review。

---

## 前置条件

在开始之前，请确认以下几项：

1. **已安装 OpenClaw**（版本 ≥ 1.4.0）——参见 [OpenClaw 安装教程](/blog/how-to-install-openclaw)
2. **Discord 账号**，并拥有目标服务器的"管理服务器"权限
3. **Node.js 18+** 或 **Python 3.10+**（取决于你选择的适配器）
4. 一个可以公网访问的服务器，或使用 [ngrok](https://ngrok.com) 做本地隧道测试

---

## 五步完成接入

### 第一步：在 Discord Developer Portal 创建应用

1. 访问 [https://discord.com/developers/applications](https://discord.com/developers/applications)，点击 **New Application**。
2. 填写应用名称（如 \`OpenClaw Bot\`），点击 **Create**。
3. 进入左侧菜单 **Bot**，点击 **Add Bot**，确认添加。
4. 在 Bot 页面，找到 **TOKEN** 一栏，点击 **Reset Token** 生成令牌，**立即复制保存**（只显示一次）。
5. 向下滚动，在 **Privileged Gateway Intents** 区域，开启以下两项：
   - \`MESSAGE CONTENT INTENT\`
   - \`SERVER MEMBERS INTENT\`（如需成员信息功能）

> **安全提示**：Bot Token 是最高权限凭证，绝对不要提交到 Git 或写在代码里。

### 第二步：安装 OpenClaw Discord 适配器

OpenClaw 官方提供 \`@openclaw/adapter-discord\` 包：

\`\`\`bash
npm install @openclaw/adapter-discord
\`\`\`

如果你使用 Python 环境：

\`\`\`bash
pip install openclaw-discord
\`\`\`

### 第三步：配置 OpenClaw

在 OpenClaw 配置文件（默认 \`~/.openclaw/config.yml\`）中添加 Discord 适配器配置：

\`\`\`yaml
adapters:
  discord:
    enabled: true
    token: \${DISCORD_BOT_TOKEN}
    prefix: "/"
    allowedChannels:
      - "general"
      - "ai-help"
    skills:
      - code-review
      - explain
      - summarize
\`\`\`

然后在你的 Shell 环境中设置 Token：

\`\`\`bash
export DISCORD_BOT_TOKEN="your_bot_token_here"
\`\`\`

推荐把这一行加到 \`.env\` 文件，再通过 \`dotenv\` 或 \`direnv\` 自动加载。

### 第四步：生成邀请链接，将 Bot 拉入服务器

1. 回到 Discord Developer Portal，进入你的应用页面，选择左侧 **OAuth2 → URL Generator**。
2. 在 **SCOPES** 中勾选 \`bot\` 和 \`applications.commands\`。
3. 在 **BOT PERMISSIONS** 中勾选：
   - \`Send Messages\`
   - \`Read Message History\`
   - \`Use Slash Commands\`
   - \`Embed Links\`（可选，用于富文本回复）
4. 复制底部生成的 URL，在浏览器打开，选择目标服务器，点击 **授权**。

### 第五步：启动 Bot

\`\`\`bash
openclaw start --adapter discord
\`\`\`

成功启动后，你会看到类似以下输出：

\`\`\`
[OpenClaw] Discord adapter connected.
[OpenClaw] Bot is online: OpenClaw Bot#1234
[OpenClaw] Listening on channels: general, ai-help
\`\`\`

此时在 Discord 服务器里发送 \`/ping\`，Bot 应当回复 \`Pong!\`。

---

## Slash Command 说明

OpenClaw Discord 适配器默认注册以下 Slash Commands：

| 命令 | 说明 |
|------|------|
| \`/ask [问题]\` | 向 OpenClaw 提问，支持自然语言 |
| \`/review [代码片段]\` | 触发代码审查 Skill |
| \`/explain [代码]\` | 解释代码逻辑 |
| \`/summarize [URL]\` | 总结网页或文档内容 |
| \`/skill [技能名]\` | 手动调用指定 Skill |

你也可以在配置文件中自定义命令映射：

\`\`\`yaml
commands:
  - name: "debug"
    skill: "code-debug"
    description: "分析并修复代码 Bug"
\`\`\`

---

## 常见错误

**错误：\`[DISALLOWED_INTENTS]\` 连接失败**

原因：没有在 Developer Portal 开启 \`MESSAGE CONTENT INTENT\`。回到 Bot 设置页面，打开该开关后重新启动。

**错误：Bot 在线但不响应 @提及**

原因：适配器默认只监听 Slash Command，不监听 @提及消息。在配置中加入 \`listenMentions: true\` 即可开启。

**错误：\`Missing Access\` 权限报错**

原因：邀请 Bot 时没有勾选 \`Use Slash Commands\` 权限。需要将 Bot 踢出服务器，重新生成邀请链接（勾选正确权限）后重新邀请。

---

## 常见问题（FAQ）

**Q：一个 OpenClaw 实例能同时接入多个 Discord 服务器吗？**

A：可以。Bot 一旦被邀请到多个服务器，默认对所有服务器生效。如果需要针对不同服务器配置不同的 Skill 白名单，可以在配置中使用 \`guildOverrides\` 字段做分服配置。

**Q：OpenClaw Discord Bot 支持私信（DM）吗？**

A：默认不开启私信功能，防止滥用。如需支持，在配置文件加入 \`allowDM: true\`，并建议同时配置速率限制（\`rateLimit\`）。

**Q：如何让 Bot 只在特定频道响应，而不是全服务器？**

A：在 \`config.yml\` 的 \`allowedChannels\` 字段中列出频道名称或频道 ID（推荐用 ID，频道改名后不失效）。留空则表示响应所有频道。

---

## 下一步

- 了解更多可用 Skill：[2026 年最佳 OpenClaw Skills 推荐](/blog/best-openclaw-skills-2026)
- 接入其他平台：[OpenClaw QQ Bot 原生接入指南](/blog/openclaw-qq-bot-native-integration)
- 深入了解频道适配器机制：[OpenClaw 支持哪些渠道？](/blog/openclaw-supported-channels)
`,
    contentEn: `OpenClaw supports multiple channel adapters, and Discord is one of the most popular among developer communities. Whether you want to build an internal AI assistant for your team server or provide automated Q&A for an open-source project, this guide walks you through the complete setup.

> Related reading: [Which channels does OpenClaw support?](/blog/openclaw-supported-channels)

---

## Why a Discord Bot?

Discord has become the central collaboration platform for developers, gaming communities, and open-source projects. Connecting OpenClaw to Discord unlocks several practical use cases:

- **Internal team assistant**: Run OpenClaw inside a private server to answer technical questions and trigger code review Skills.
- **Community auto-support**: Automatically reply to common questions in an open-source project server, reducing maintainer burden.
- **Workflow triggers**: Use Slash Commands to kick off CI/CD pipelines or remote script executions.
- **Learning companion**: Help learners in study communities with coding exercises and code reviews.

---

## Prerequisites

Before starting, confirm the following:

1. **OpenClaw installed** (version ≥ 1.4.0) — see [OpenClaw Installation Guide](/blog/how-to-install-openclaw)
2. **A Discord account** with "Manage Server" permission on your target server
3. **Node.js 18+** or **Python 3.10+** depending on your chosen adapter
4. A publicly accessible server, or use [ngrok](https://ngrok.com) for local tunnel testing

---

## Five Steps to Integration

### Step 1: Create an Application in the Discord Developer Portal

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and click **New Application**.
2. Enter a name (e.g., \`OpenClaw Bot\`) and click **Create**.
3. In the left menu, go to **Bot** and click **Add Bot**, then confirm.
4. Under the **TOKEN** section, click **Reset Token** to generate your token. **Copy it immediately** — it is only shown once.
5. Scroll down to **Privileged Gateway Intents** and enable:
   - \`MESSAGE CONTENT INTENT\`
   - \`SERVER MEMBERS INTENT\` (if you need member data)

> **Security note**: Your Bot Token is a full-access credential. Never commit it to Git or hardcode it in source files.

### Step 2: Install the OpenClaw Discord Adapter

The official \`@openclaw/adapter-discord\` package is available on npm:

\`\`\`bash
npm install @openclaw/adapter-discord
\`\`\`

For Python environments:

\`\`\`bash
pip install openclaw-discord
\`\`\`

### Step 3: Configure OpenClaw

Add the Discord adapter configuration to your OpenClaw config file (default: \`~/.openclaw/config.yml\`):

\`\`\`yaml
adapters:
  discord:
    enabled: true
    token: \${DISCORD_BOT_TOKEN}
    prefix: "/"
    allowedChannels:
      - "general"
      - "ai-help"
    skills:
      - code-review
      - explain
      - summarize
\`\`\`

Set the token as an environment variable in your shell:

\`\`\`bash
export DISCORD_BOT_TOKEN="your_bot_token_here"
\`\`\`

Add this line to a \`.env\` file and load it automatically with \`dotenv\` or \`direnv\` for convenience.

### Step 4: Generate an Invite Link and Add the Bot to Your Server

1. Back in the Developer Portal, navigate to **OAuth2 → URL Generator** for your application.
2. Under **SCOPES**, check \`bot\` and \`applications.commands\`.
3. Under **BOT PERMISSIONS**, check:
   - \`Send Messages\`
   - \`Read Message History\`
   - \`Use Slash Commands\`
   - \`Embed Links\` (optional, for rich reply formatting)
4. Copy the generated URL at the bottom, open it in a browser, select your target server, and click **Authorize**.

### Step 5: Start the Bot

\`\`\`bash
openclaw start --adapter discord
\`\`\`

On successful startup, you should see output like:

\`\`\`
[OpenClaw] Discord adapter connected.
[OpenClaw] Bot is online: OpenClaw Bot#1234
[OpenClaw] Listening on channels: general, ai-help
\`\`\`

Type \`/ping\` in your Discord server — the bot should respond with \`Pong!\`.

---

## Slash Commands Reference

The OpenClaw Discord adapter registers the following Slash Commands by default:

| Command | Description |
|---------|-------------|
| \`/ask [question]\` | Ask OpenClaw anything in natural language |
| \`/review [code]\` | Trigger the code review Skill |
| \`/explain [code]\` | Explain what a piece of code does |
| \`/summarize [URL]\` | Summarize a webpage or document |
| \`/skill [skill-name]\` | Manually invoke a specific Skill |

You can also define custom command mappings in the config file:

\`\`\`yaml
commands:
  - name: "debug"
    skill: "code-debug"
    description: "Analyze and fix code bugs"
\`\`\`

---

## Common Errors

**Error: \`[DISALLOWED_INTENTS]\` connection failure**

Cause: \`MESSAGE CONTENT INTENT\` was not enabled in the Developer Portal. Go to your Bot settings page, enable the toggle, and restart.

**Error: Bot is online but ignores @mentions**

Cause: The adapter listens for Slash Commands only by default, not @mentions. Add \`listenMentions: true\` to your config to enable this.

**Error: \`Missing Access\` permission error**

Cause: \`Use Slash Commands\` was not checked when generating the invite link. Kick the bot from the server, regenerate the invite URL with the correct permissions, and re-invite it.

---

## FAQ

**Q: Can a single OpenClaw instance serve multiple Discord servers at once?**

A: Yes. Once the bot is invited to multiple servers, it operates across all of them by default. To apply different Skill allowlists per server, use the \`guildOverrides\` field in your config.

**Q: Does the OpenClaw Discord Bot support Direct Messages (DMs)?**

A: DM support is disabled by default to prevent abuse. To enable it, add \`allowDM: true\` to your config file, and consider setting up rate limiting (\`rateLimit\`) at the same time.

**Q: How do I restrict the bot to respond only in specific channels?**

A: List channel names or channel IDs in the \`allowedChannels\` field of \`config.yml\`. Using channel IDs is recommended since they remain stable even if channels are renamed. An empty list means the bot responds in all channels.

---

## Next Steps

- Explore available Skills: [Best OpenClaw Skills for 2026](/blog/best-openclaw-skills-2026)
- Connect to other platforms: [OpenClaw QQ Bot Native Integration](/blog/openclaw-qq-bot-native-integration)
- Learn about the channel adapter architecture: [OpenClaw Supported Channels](/blog/openclaw-supported-channels)
`,
    author: "OpenClaw 101",
    date: "2026-04-20",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw","discord","bot","integration","2026","setup"],
    readingTime: 6,
    image: "/og-image.png"
  },
  {
    id: 38,
    slug: "can-openclaw-work-with-claude-code",
    title: "OpenClaw 能和 Claude Code 一起用吗？（2026）",
    titleEn: "Can OpenClaw Work with Claude Code? (2026)",
    excerpt: "OpenClaw 和 Claude Code 不是竞品。一个是 Agent 运行时，一个是编程助手。",
    excerptEn: "OpenClaw and Claude Code are not competitors. One is an agent runtime, the other a coding assistant.",
    content: `**可以，而且两者配合得很好。** OpenClaw 是 Agent 运行时平台，Claude Code 是面向编程任务的 AI 终端助手。它们定位不同，不存在功能上的替代关系，反而能形成互补。

> 相关对比：[OpenClaw vs Claude Code 深度对比](/blog/openclaw-vs-claude-code)

---

## 各自是什么？

### OpenClaw

OpenClaw 是一个 **Agent 运行时**。它的核心职责是：

- 加载并执行 Skill（技能模块）
- 管理多渠道接入（Discord、QQ、Telegram、CLI 等）
- 跨 Session 持久化记忆与上下文
- 统一调度工具调用（MCP、API、文件系统）

你可以把 OpenClaw 理解为一个"Agent 操作系统"——它不在乎具体用什么大模型，可以挂载 Claude、GPT、本地模型等任意后端。

### Claude Code

Claude Code 是 Anthropic 官方出品的 **CLI 编程助手**。它的核心职责是：

- 在终端中理解并修改代码库
- 执行复杂的多步骤编程任务
- 与 Git、测试框架、构建工具深度集成
- 通过 MCP 协议与外部工具通信

Claude Code 是专为"写代码、改代码、调代码"这一场景打磨的工具，底层固定使用 Claude 系列模型。

---

## 三种组合模式

### 模式 A：Claude Code 作为 OpenClaw 的后端模型

如果你在 OpenClaw 中配置了 Claude API，Claude Code 使用的底层能力（Claude 模型）和 OpenClaw 调用的是同一套。你可以在 OpenClaw 中定义好 Skill 和渠道，让 Claude 的推理能力驱动整个 Agent 流程。

\`\`\`yaml
# ~/.openclaw/config.yml
model:
  provider: anthropic
  name: claude-opus-4-5
  apiKey: \${ANTHROPIC_API_KEY}
\`\`\`

### 模式 B：Claude Code 负责开发，OpenClaw 负责部署运行

这是最常见的实际工作流：

1. 用 **Claude Code** 编写和调试 OpenClaw 的 Skill 文件（\`.skill.ts\` 或 \`.skill.py\`）
2. 编写完成后，通过 OpenClaw CLI 加载并运行这些 Skill
3. 用 Claude Code 持续迭代优化 Skill 逻辑

这个模式下，Claude Code 是开发工具，OpenClaw 是运行环境——职责分明。

### 模式 C：通过 MCP 双向互通

OpenClaw 支持 MCP（Model Context Protocol）协议。你可以把 OpenClaw 暴露为一个 MCP 服务端，让 Claude Code 在编程任务中直接调用 OpenClaw 的 Skill 和记忆系统。

\`\`\`bash
# 启动 OpenClaw MCP 服务
openclaw serve --protocol mcp --port 3100

# 在 Claude Code 中注册 MCP 服务
claude mcp add openclaw http://localhost:3100
\`\`\`

详细配置可参考：[OpenClaw LocalAI 集成指南](/blog/openclaw-localai-integration)

---

## 只用 OpenClaw 就够了的场景

- 需要同时接入多个渠道（Discord + QQ + Web UI）
- 需要跨会话持久化记忆
- 需要管理多个 Skill 模块，对外提供服务
- 你的团队成员不是程序员，需要通过对话界面使用 AI

---

## 只用 Claude Code 就够了的场景

- 纯粹的编程任务：写代码、重构、Debug、代码审查
- 项目内的一次性任务，不需要部署成持续运行的服务
- 需要深度操作文件系统、Git 历史、测试套件
- 个人开发者的日常编程辅助，不涉及多渠道发布

---

## 两者都需要的场景

| 场景 | OpenClaw 的角色 | Claude Code 的角色 |
|------|----------------|-------------------|
| 构建 Discord AI 助手 | 运行 Bot，管理渠道和 Skill | 开发和调试 Skill 代码 |
| 持续运行的编程辅助服务 | 提供 API 端点，持久化上下文 | 编写服务逻辑和集成测试 |
| 团队知识库 Bot | 接入多渠道，调度检索 Skill | 编写 RAG 逻辑和 Skill 文件 |
| 自动化代码审查 Bot | 监听 PR 事件，推送结果 | 实现代码审查 Skill 的具体逻辑 |

---

## 常见问题（FAQ）

**Q：OpenClaw 和 Claude Code 会互相冲突吗？**

A：不会。两者可以在同一台机器上同时运行，也可以通过 MCP 协议互相通信。它们共享同一个 Anthropic API Key，但调用是完全独立的。

**Q：OpenClaw 能调用 Claude Code 的 Slash Command（如 \`/commit\`）吗？**

A：不能直接调用。Claude Code 的 Slash Command 是 CLI 会话内的功能，不对外暴露为 API。但你可以在 OpenClaw Skill 中通过 \`exec\` 工具调用 \`claude\` CLI 命令来间接触发。

**Q：如果我只有一个 Anthropic API Key，两边同时用会有什么影响？**

A：两者共享同一个 Key 和同一个速率限制配额。在高并发场景下可能遇到 \`429 Too Many Requests\`。建议在 OpenClaw 中配置 \`rateLimitBuffer\` 参数，为 Claude Code 的交互式任务预留配额。

---

## 下一步

- 查看完整渠道支持：[OpenClaw 支持哪些渠道？](/blog/openclaw-supported-channels)
- 了解 Skill 生态：[2026 年最佳 OpenClaw Skills](/blog/best-openclaw-skills-2026)
- 深入对比三款工具：[OpenClaw vs Cursor vs Manus](/blog/openclaw-vs-cursor-vs-manus)
`,
    contentEn: `**Yes, and they work well together.** OpenClaw is an agent runtime platform; Claude Code is an AI terminal assistant purpose-built for programming tasks. They occupy different roles and do not replace each other — they complement each other.

> Related comparison: [OpenClaw vs Claude Code: Deep Dive](/blog/openclaw-vs-claude-code)

---

## What Each Tool Is

### OpenClaw

OpenClaw is an **agent runtime**. Its core responsibilities are:

- Loading and executing Skills (modular capability units)
- Managing multi-channel integrations (Discord, QQ, Telegram, CLI, and more)
- Persisting memory and context across sessions
- Orchestrating tool calls (MCP, APIs, file systems)

Think of OpenClaw as an "agent operating system." It is model-agnostic — you can attach Claude, GPT, a local model, or any compatible backend.

### Claude Code

Claude Code is Anthropic's official **CLI coding assistant**. Its core responsibilities are:

- Understanding and modifying codebases directly from the terminal
- Executing complex, multi-step programming tasks
- Deep integration with Git, test frameworks, and build tools
- Communicating with external tools via the MCP protocol

Claude Code is sharpened specifically for the "write, edit, debug code" use case, and it runs exclusively on Claude models.

---

## Three Combination Patterns

### Pattern A: Claude Code as OpenClaw's Underlying Model

When you configure the Claude API in OpenClaw, both tools draw on the same underlying model capability. You define Skills and channels in OpenClaw, and Claude's reasoning drives the entire agent pipeline.

\`\`\`yaml
# ~/.openclaw/config.yml
model:
  provider: anthropic
  name: claude-opus-4-5
  apiKey: \${ANTHROPIC_API_KEY}
\`\`\`

### Pattern B: Claude Code for Development, OpenClaw for Deployment

This is the most common real-world workflow:

1. Use **Claude Code** to write and debug OpenClaw Skill files (\`.skill.ts\` or \`.skill.py\`)
2. Once written, load and run those Skills using the OpenClaw CLI
3. Use Claude Code to continuously iterate on Skill logic

In this pattern, Claude Code is the development tool and OpenClaw is the runtime environment — clear separation of concerns.

### Pattern C: Two-Way Communication via MCP

OpenClaw supports the Model Context Protocol (MCP). You can expose OpenClaw as an MCP server, allowing Claude Code to call OpenClaw's Skills and memory system directly during coding tasks.

\`\`\`bash
# Start the OpenClaw MCP server
openclaw serve --protocol mcp --port 3100

# Register the MCP server in Claude Code
claude mcp add openclaw http://localhost:3100
\`\`\`

For detailed configuration, see: [OpenClaw LocalAI Integration Guide](/blog/openclaw-localai-integration)

---

## When OpenClaw Alone Is Enough

- You need to serve multiple channels simultaneously (Discord + QQ + Web UI)
- You need persistent memory across sessions
- You are managing multiple Skill modules and exposing them as a service
- Your users are not developers and need a conversational interface to interact with AI

---

## When Claude Code Alone Is Enough

- Pure programming tasks: writing code, refactoring, debugging, code review
- One-off project tasks that do not need to run as a persistent service
- Deep interaction with the file system, Git history, or test suites
- Day-to-day coding assistance for individual developers without multi-channel publishing needs

---

## When You Need Both

| Use Case | OpenClaw's Role | Claude Code's Role |
|----------|-----------------|--------------------|
| Building a Discord AI assistant | Run the bot, manage channels and Skills | Develop and debug the Skill code |
| Persistent coding assistance service | Provide API endpoints, persist context | Write service logic and integration tests |
| Team knowledge base bot | Connect multiple channels, orchestrate retrieval Skills | Write RAG logic and Skill files |
| Automated code review bot | Listen for PR events, push results | Implement the code review Skill logic |

---

## FAQ

**Q: Will OpenClaw and Claude Code conflict with each other?**

A: No. Both can run simultaneously on the same machine and communicate with each other via MCP. They may share the same Anthropic API key, but their calls are entirely independent.

**Q: Can OpenClaw call Claude Code's Slash Commands (like \`/commit\`)?**

A: Not directly. Claude Code's Slash Commands are session-internal features, not exposed as an external API. However, you can call the \`claude\` CLI binary from within an OpenClaw Skill using the \`exec\` tool to trigger them indirectly.

**Q: If I only have one Anthropic API key, what happens when both tools use it simultaneously?**

A: Both tools share the same key and the same rate-limit quota. Under high concurrency you may hit \`429 Too Many Requests\`. Consider configuring the \`rateLimitBuffer\` parameter in OpenClaw to reserve quota for Claude Code's interactive tasks.

---

## Next Steps

- See the full list of supported channels: [OpenClaw Supported Channels](/blog/openclaw-supported-channels)
- Explore the Skills ecosystem: [Best OpenClaw Skills for 2026](/blog/best-openclaw-skills-2026)
- Three-way comparison: [OpenClaw vs Cursor vs Manus](/blog/openclaw-vs-cursor-vs-manus)
`,
    author: "OpenClaw 101",
    date: "2026-04-20",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw","claude-code","comparison","mcp","2026"],
    readingTime: 5,
    image: "/og-image.png"
  },
  {
    id: 39,
    slug: "openclaw-vs-cursor",
    title: "OpenClaw vs Cursor（2026）",
    titleEn: "OpenClaw vs Cursor (2026) Comparison",
    excerpt: "OpenClaw 是 Agent 运行时，Cursor 是 AI 代码编辑器。区别、选择、配合。",
    excerptEn: "Compare OpenClaw vs Cursor: agent runtime vs AI code editor. Differences, choices, and how they work together.",
    content: `这个问题经常被问到。OpenClaw 和 Cursor 都在"AI + 开发"这个大赛道上，但它们解决的是完全不同的问题。搞清楚这一点，才能做出合理的工具选择，而不是被营销话术带跑偏。

> 延伸阅读：[OpenClaw vs Cursor vs Manus 三向对比](/blog/openclaw-vs-cursor-vs-manus)

---

## 核心差异一览

| 维度 | OpenClaw | Cursor |
|------|----------|--------|
| **本质** | Agent 运行时平台 | AI 代码编辑器（基于 VS Code） |
| **主要场景** | 部署和运行 AI Agent | 在 IDE 内辅助写代码 |
| **渠道支持** | Discord、QQ、Telegram、CLI、Web 等 | 仅 IDE 内部 |
| **跨会话记忆** | 原生支持 | 无 |
| **Skill/插件体系** | 开放 Skill 生态，可自定义 | Cursor Rules + 扩展，较封闭 |
| **模型灵活性** | 支持任意 LLM 后端 | 绑定 Claude、GPT、Gemini（官方支持列表） |
| **本地模型** | 支持（通过 LocalAI/Ollama） | 不支持 |
| **界面** | CLI 为主，可选 Web UI | 图形化 IDE |
| **使用门槛** | 需要配置，偏技术向 | 开箱即用，门槛低 |
| **定价** | 开源免费，API 费用自付 | 订阅制（$20/月起） |

---

## Cursor 擅长什么

Cursor 的核心优势在于**编辑器内的代码生成与补全体验**。如果你的主要需求是：

- **Tab 补全**：在打字过程中实时预测和补全代码，比 GitHub Copilot 的感知更强
- **多文件编辑（Composer）**：用自然语言描述需求，Cursor 自动跨多个文件做出修改
- **代码库问答（Codebase Chat）**：用 \`@codebase\` 提问，AI 理解整个项目结构后回答
- **视觉调试**：截图贴进 Cursor，让 AI 帮你定位界面问题
- **内联编辑（Cmd+K）**：选中代码块，一句话完成重构或 Bug 修复

对于独立开发者或小团队，Cursor 的**开箱即用**体验非常友好，几乎不需要额外配置就能提升日常编码效率。

---

## OpenClaw 擅长什么

OpenClaw 的核心优势在于**把 AI 能力部署为持续运行的服务**。如果你的主要需求是：

- **多渠道发布**：同一套 Agent 逻辑，同时服务 Discord、QQ、企业微信、API 端点
- **自定义 Skill**：把复杂的 AI 工作流封装为可复用的 Skill 模块
- **持久化记忆**：跨会话、跨用户记住上下文，构建有"记忆"的 AI 助手
- **本地/私有模型**：对数据隐私有要求，接入本地部署的 Ollama 或 LocalAI
- **自动化流程**：监听事件（如 GitHub PR、定时任务）并自动触发 Agent 执行

如果你是在**为用户或团队搭建 AI 服务**，而不只是辅助自己写代码，OpenClaw 是更合适的选择。

---

## 什么时候选 OpenClaw

- 你需要把 AI 助手部署到 Discord、Telegram 或企业内部平台
- 你在开发需要持久化状态的 AI 应用（客服 Bot、知识库问答、代码审查自动化）
- 你需要本地运行模型，不能把代码或数据发送到第三方 API
- 你的技术团队需要一个可编程、可扩展的 Agent 基础设施

---

## 什么时候选 Cursor

- 你的主要需求是让个人编码工作更快、更顺
- 你不想花时间配置 AI 工具，希望安装即用
- 你重度使用 VS Code 生态（插件、快捷键、主题），不想迁移工作流
- 预算充足，愿意为打磨精良的编辑器体验付费

---

## 什么时候两者都选

这是完全合理的组合。典型工作流：

1. 用 **Cursor** 编写 OpenClaw 的 Skill 文件和配置，享受智能补全和 Composer 多文件编辑
2. 用 **OpenClaw** 加载并运行这些 Skill，把它部署到 Discord 服务器或内部平台
3. 用 Cursor 继续迭代 Skill 逻辑，OpenClaw 热加载更新

两者的边界很清晰：Cursor 是**写代码的工具**，OpenClaw 是**运行 Agent 的平台**。

也可以参考：[OpenClaw 能和 Claude Code 一起用吗？](/blog/can-openclaw-work-with-claude-code)

---

## 常见问题（FAQ）

**Q：Cursor 能替代 OpenClaw 吗？**

A：不能。Cursor 没有渠道适配器、没有 Skill 系统、没有跨会话记忆，也无法部署成一个持续运行的 Bot 服务。Cursor 的定位是"更聪明的代码编辑器"，不是 Agent 运行时。

**Q：OpenClaw 能替代 Cursor 吗？**

A：对于日常编码来说，也不能。OpenClaw 没有 IDE 内联编辑、没有 Tab 补全、没有视觉调试这些功能。如果你想用 OpenClaw 辅助写代码，它更像 Claude Code（CLI 方式），而不像 Cursor（GUI 方式）。

**Q：Cursor 支持接入 OpenClaw 的 Skill 吗？**

A：目前 Cursor 不支持直接调用 OpenClaw Skill。但如果 OpenClaw 暴露了 MCP 服务端，理论上 Cursor 未来支持 MCP 后可以集成。目前更成熟的 MCP 集成是通过 [OpenClaw VSCode 扩展](/blog/openclaw-vscode-extension) 实现的。

---

## 下一步

- 安装 OpenClaw：[OpenClaw 安装完整指南](/blog/how-to-install-openclaw)
- 了解 OpenClaw VSCode 插件：[OpenClaw VSCode 扩展使用指南](/blog/openclaw-vscode-extension)
- 查看三款工具对比：[OpenClaw vs Cursor vs Manus](/blog/openclaw-vs-cursor-vs-manus)
`,
    contentEn: `This question comes up often. OpenClaw and Cursor both live in the "AI + development" space, but they solve fundamentally different problems. Getting that distinction right leads to smarter tool choices — not decisions driven by marketing noise.

> Extended comparison: [OpenClaw vs Cursor vs Manus: Three-Way Breakdown](/blog/openclaw-vs-cursor-vs-manus)

---

## Core Differences at a Glance

| Dimension | OpenClaw | Cursor |
|-----------|----------|--------|
| **What it is** | Agent runtime platform | AI code editor (VS Code–based) |
| **Primary use case** | Deploy and run AI agents | AI-assisted coding inside an IDE |
| **Channel support** | Discord, QQ, Telegram, CLI, Web, and more | IDE only |
| **Cross-session memory** | Native support | None |
| **Skill/plugin system** | Open Skill ecosystem, fully customizable | Cursor Rules + extensions, relatively closed |
| **Model flexibility** | Any LLM backend | Claude, GPT, Gemini (official support list) |
| **Local models** | Supported (via LocalAI/Ollama) | Not supported |
| **Interface** | CLI-first, optional Web UI | Graphical IDE |
| **Setup effort** | Configuration required, developer-oriented | Works out of the box, low barrier |
| **Pricing** | Open source, pay for your own API | Subscription ($20/month and up) |

---

## What Cursor Does Best

Cursor's core strength is the **in-editor code generation and completion experience**. If your primary needs are:

- **Tab completion**: Real-time code prediction as you type, with sharper awareness than GitHub Copilot
- **Multi-file editing (Composer)**: Describe what you need in natural language; Cursor makes coordinated changes across files
- **Codebase Q&A**: Ask questions with \`@codebase\` and get answers that reflect the full project structure
- **Visual debugging**: Paste a screenshot into Cursor and let AI help pinpoint UI issues
- **Inline editing (Cmd+K)**: Select a code block and refactor or fix it in a single sentence

For independent developers and small teams, Cursor's **zero-configuration start** is genuinely compelling — it improves daily coding velocity with almost no setup.

---

## What OpenClaw Does Best

OpenClaw's core strength is **deploying AI capabilities as persistent, running services**. If your primary needs are:

- **Multi-channel publishing**: Run the same agent logic across Discord, QQ, enterprise chat, and API endpoints simultaneously
- **Custom Skills**: Package complex AI workflows into reusable, composable Skill modules
- **Persistent memory**: Remember context across sessions and users, building AI assistants that actually remember things
- **Local or private models**: Meet data privacy requirements by connecting to self-hosted Ollama or LocalAI
- **Automated pipelines**: Listen for events (GitHub PRs, cron schedules) and automatically trigger agent execution

If you are **building AI services for users or a team** — rather than just augmenting your own coding — OpenClaw is the more appropriate choice.

---

## When to Pick OpenClaw

- You need to deploy an AI assistant to Discord, Telegram, or an internal enterprise platform
- You are building AI applications that require persistent state (support bots, knowledge-base Q&A, automated code review)
- You need to run models locally and cannot send code or data to third-party APIs
- Your engineering team needs a programmable, extensible agent infrastructure

---

## When to Pick Cursor

- Your primary goal is making your personal coding work faster and smoother
- You do not want to spend time configuring AI tools — install and go
- You are deeply invested in the VS Code ecosystem (extensions, keybindings, themes) and do not want to migrate your workflow
- You have budget for a polished, well-designed editor experience

---

## When to Use Both

This is a completely reasonable combination. A typical workflow:

1. Use **Cursor** to write OpenClaw Skill files and config, taking advantage of smart completion and multi-file Composer edits
2. Use **OpenClaw** to load and run those Skills, deploying them to a Discord server or internal platform
3. Keep iterating on Skill logic in Cursor; OpenClaw hot-reloads the updates

The boundary is clean: Cursor is the **tool for writing code**, OpenClaw is the **platform for running agents**.

Also relevant: [Can OpenClaw Work with Claude Code?](/blog/can-openclaw-work-with-claude-code)

---

## FAQ

**Q: Can Cursor replace OpenClaw?**

A: No. Cursor has no channel adapters, no Skill system, no cross-session memory, and no way to deploy a continuously running bot service. Cursor is positioned as "a smarter code editor," not an agent runtime.

**Q: Can OpenClaw replace Cursor?**

A: Not for day-to-day coding either. OpenClaw lacks inline IDE editing, tab completion, and visual debugging. If you want OpenClaw to help you write code, it behaves more like Claude Code (CLI mode) than Cursor (GUI mode).

**Q: Does Cursor support calling OpenClaw Skills?**

A: Not currently. Cursor does not natively invoke OpenClaw Skills. However, if OpenClaw exposes an MCP server, future MCP support in Cursor could make integration possible. The most mature MCP integration today is through the [OpenClaw VSCode Extension](/blog/openclaw-vscode-extension).

---

## Next Steps

- Install OpenClaw: [Complete OpenClaw Installation Guide](/blog/how-to-install-openclaw)
- Use OpenClaw inside VS Code: [OpenClaw VSCode Extension Guide](/blog/openclaw-vscode-extension)
- Three-way tool comparison: [OpenClaw vs Cursor vs Manus](/blog/openclaw-vs-cursor-vs-manus)
`,
    author: "OpenClaw 101",
    date: "2026-04-20",
    category: "OpenClaw 进阶",
    categoryEn: "OpenClaw Advanced",
    tags: ["openclaw","cursor","comparison","ai-editor","2026"],
    readingTime: 5,
    image: "/og-image.png"
  },
];
