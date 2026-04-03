import type { BlogPost } from './types';

// OpenClaw 进阶系列 (id 17-20)
export const postsOpenclawAdvanced: BlogPost[] = [
  {
    id: 17,
    slug: "openclaw-browser-use-integration",
    title: "OpenClaw + Browser Use：让 AI 助手自动操控浏览器",
    titleEn: "OpenClaw + Browser Use: Let Your AI Assistant Control the Browser",
    excerpt: "Browser Use 是 2026 年最热门的开源浏览器自动化项目，几个月内获得 78,000+ GitHub Stars。本文教你如何将其与 OpenClaw 集成，打造能自动浏览网页、填表单、抢票的 AI 助手。",
    excerptEn: "Browser Use is the hottest open-source browser automation project of 2026, gaining 78,000+ GitHub Stars in months. Learn how to integrate it with OpenClaw to build an AI assistant that can browse websites, fill forms, and book tickets automatically.",
    content: `Browser Use 是 2026 年增长最快的开源项目之一，由 Magnus Müller 和 Gregor Žunić 开发，几个月内 GitHub Stars 从 0 增长到 78,000+。

它让 AI Agent 能够像人类一样操控浏览器：点击、输入、滚动、截图。

## 为什么需要 Browser Use + OpenClaw？

OpenClaw 是一个强大的 AI Agent 平台，但默认情况下它只能：

- 回答问题
- 操作本地文件
- 调用 API

加上 Browser Use 后，它能：

- 🌐 **浏览网页**：打开任意网站，阅读内容
- 📝 **填写表单**：自动注册、登录、提交
- 🛒 **电商操作**：下单、比价、抢购
- 📊 **数据采集**：抓取网页数据，生成报告

## 架构设计

\`\`\`
┌─────────────────────────────────────────────────────┐
│                    OpenClaw                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Brain     │  │   Memory    │  │   Skills    │ │
│  │  (LLM)      │  │  (SQLite)   │  │  (Plugins)  │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                          │                          │
│                    ┌─────▼─────┐                    │
│                    │  Browser  │                    │
│                    │  Use      │                    │
│                    │  Skill    │                    │
│                    └─────┬─────┘                    │
└──────────────────────────┼──────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Playwright │
                    │  (Browser)  │
                    └─────────────┘
\`\`\`

## 安装步骤

### 1. 安装 Browser Use

\`\`\`bash
# 安装 Browser Use
pip install browser-use

# 或使用 pipx（推荐）
pipx install browser-use
\`\`\`

### 2. 安装 Playwright

\`\`\`bash
# 安装 Playwright 浏览器
playwright install chromium
\`\`\`

### 3. 创建 Browser Use Skill

在 OpenClaw 的 skills 目录创建新技能：

\`\`\`bash
mkdir -p ~/.openclaw/skills/browser-use
\`\`\`

创建 \`~/.openclaw/skills/browser-use/SKILL.md\`：

\`\`\`markdown
---
name: browser-use
description: Control web browser with AI - browse, click, type, scrape
tools:
  - exec
---

# Browser Use Skill

This skill enables OpenClaw to control a web browser using Browser Use.

## Capabilities

- Navigate to any URL
- Click elements by description
- Type text into input fields
- Take screenshots
- Extract page content
- Fill and submit forms

## Usage

### Navigate to URL

\`\`\`bash
browser-use navigate "https://example.com"
\`\`\`

### Click Element

\`\`\`bash
browser-use click "Sign in button"
\`\`\`

### Type Text

\`\`\`bash
browser-use type "username input" "myemail@example.com"
\`\`\`

### Take Screenshot

\`\`\`bash
browser-use screenshot
\`\`\`

### Extract Content

\`\`\`bash
browser-use extract "product prices"
\`\`\`

## Examples

### Google Search

\`\`\`bash
browser-use navigate "https://google.com"
browser-use type "search box" "OpenClaw AI agent"
browser-use click "Google Search button"
browser-use extract "first 5 results"
\`\`\`

### Fill Form

\`\`\`bash
browser-use navigate "https://example.com/register"
browser-use type "name field" "John Doe"
browser-use type "email field" "john@example.com"
browser-use click "Submit button"
\`\`\`
\`\`\`

### 4. 配置 OpenClaw

在 \`~/.openclaw/openclaw.json\` 中添加：

\`\`\`json
{
  "skills": {
    "enabled": ["browser-use"]
  }
}
\`\`\`

### 5. 重启 OpenClaw

\`\`\`bash
openclaw restart
\`\`\`

## 实战案例

### 案例 1：自动比价

**用户需求**：帮我对比京东和淘宝的 iPhone 16 Pro 价格

**OpenClaw 操作流程**：

\`\`\`
1. 用户: 帮我对比京东和淘宝的 iPhone 16 Pro 价格
2. OpenClaw: 
   - 调用 browser-use 导航到京东
   - 搜索 "iPhone 16 Pro"
   - 提取价格
   - 导航到淘宝
   - 搜索 "iPhone 16 Pro"
   - 提取价格
   - 生成对比报告
3. 输出:
   - 京东: ¥7,999 (官方旗舰店)
   - 淘宝: ¥7,899 (百亿补贴)
   - 推荐: 淘宝更便宜 ¥100
\`\`\`

### 案例 2：自动预约

**用户需求**：帮我预约明天的羽毛球馆

**OpenClaw 操作流程**：

\`\`\`
1. 用户: 帮我预约明天下午 3 点的羽毛球馆
2. OpenClaw:
   - 打开预约网站
   - 登录（使用保存的密码）
   - 选择日期：明天
   - 选择时间：15:00-17:00
   - 选择场地：3号场
   - 确认预约
3. 输出: 预约成功！场地已锁定，请准时到场
\`\`\`

### 案例 3：监控抢购

**用户需求**：帮我监控 RTX 5090 的库存，有货立即通知

**OpenClaw 操作流程**：

\`\`\`
1. 用户: 帮我监控 RTX 5090 的库存，有货立即通知
2. OpenClaw:
   - 设置定时任务（每 5 分钟检查一次）
   - 打开电商网站
   - 搜索 "RTX 5090"
   - 检查库存状态
   - 如果有货 → 发送 Telegram 通知
3. 输出: 🎉 RTX 5090 有货了！[立即购买链接]
\`\`\`

## 高级配置

### 使用代理

\`\`\`bash
browser-use config set proxy "http://127.0.0.1:7890"
\`\`\`

### 无头模式

\`\`\`bash
browser-use config set headless true
\`\`\`

### 用户数据目录（保持登录状态）

\`\`\`bash
browser-use config set user-data-dir "~/.browser-use/profile"
\`\`\`

### 截图保存

\`\`\`bash
browser-use config set screenshot-dir "~/.browser-use/screenshots"
\`\`\`

## 安全注意事项

### ⚠️ 风险提示

1. **账号安全**：浏览器自动化可能触发网站的反机器人检测
2. **隐私泄露**：不要在公共网站上保存敏感信息
3. **法律风险**：遵守网站的使用条款，不要用于违规操作

### 🔒 安全配置

\`\`\`json
{
  "skills": {
    "browser-use": {
      "allowedDomains": ["*.google.com", "*.github.com"],
      "blockedActions": ["delete", "remove"],
      "requireConfirmation": ["checkout", "payment"]
    }
  }
}
\`\`\`

## 常见问题

### Q: Browser Use 和 Selenium 有什么区别？

| 特性 | Browser Use | Selenium |
|------|-------------|----------|
| 控制方式 | AI 自然语言 | CSS 选择器 |
| 学习曲线 | 低 | 高 |
| 维护成本 | 低（自适应） | 高（选择器易失效） |
| 适用场景 | 动态网站 | 固定流程 |

### Q: 网站检测到自动化怎么办？

**解决方案**：

1. 使用 Browser Use Cloud（官方托管）
2. 配置 \`stealth\` 模式
3. 降低操作速度
4. 使用住宅代理

### Q: 如何保持登录状态？

\`\`\`bash
# 设置用户数据目录
browser-use config set user-data-dir "~/.browser-use/profile"

# 首次登录后，session 会保存在该目录
\`\`\`

## 替代方案对比

| 方案 | 优势 | 劣势 |
|------|------|------|
| **Browser Use** | 开源免费、AI 驱动 | 需要自己部署 |
| **OpenAI Operator** | 开箱即用 | 仅限 ChatGPT Plus、功能受限 |
| **Browserbase** | 云端托管 | 按用量付费 |
| **Puppeteer** | 成熟稳定 | 需要编程 |

## 总结

Browser Use + OpenClaw = **最强大的浏览器自动化方案**

- 🤖 AI 驱动：用自然语言控制浏览器
- 🔓 完全开源：代码透明，数据本地
- 🔧 高度定制：支持任意网站和流程
- 💰 零成本：自托管，无需付费

立即开始你的浏览器自动化之旅吧！`,
    contentEn: `Browser Use is one of the fastest-growing open-source projects of 2026, developed by Magnus Müller and Gregor Žunić. It grew from 0 to 78,000+ GitHub Stars in just a few months.

It enables AI Agents to control browsers like humans: clicking, typing, scrolling, and taking screenshots.

## Why Browser Use + OpenClaw?

OpenClaw is a powerful AI Agent platform, but by default it can only:

- Answer questions
- Operate local files
- Call APIs

With Browser Use, it can:

- 🌐 **Browse websites**: Open any website, read content
- 📝 **Fill forms**: Auto-register, login, submit
- 🛒 **E-commerce**: Order, compare prices, grab deals
- 📊 **Data collection**: Scrape web data, generate reports

## Installation

### 1. Install Browser Use

\`\`\`bash
pip install browser-use
\`\`\`

### 2. Install Playwright

\`\`\`bash
playwright install chromium
\`\`\`

### 3. Create Browser Use Skill

\`\`\`bash
mkdir -p ~/.openclaw/skills/browser-use
\`\`\`

### 4. Configure OpenClaw

\`\`\`json
{
  "skills": {
    "enabled": ["browser-use"]
  }
}
\`\`\`

## Use Cases

1. **Price Comparison**: Compare prices across e-commerce sites
2. **Auto Booking**: Book appointments automatically
3. **Stock Monitoring**: Get notified when products are in stock

## Summary

Browser Use + OpenClaw = **The Most Powerful Browser Automation Solution**

- 🤖 AI-driven: Control browsers with natural language
- 🔓 Open source: Transparent code, local data
- 🔧 Highly customizable: Support any website and workflow
- 💰 Zero cost: Self-hosted, no fees`,
    author: "Marco Liu",
    date: "2026-04-01",
    category: "集成教程",
    categoryEn: "Integration",
    tags: ["browser-use", "automation", "playwright", "web-scraping", "浏览器自动化"],
    readingTime: 12,
    image: "/og-image.png"
  },
  {
    id: 18,
    slug: "openclaw-n8n-automation",
    title: "OpenClaw + n8n：构建自动化工作流的终极组合",
    titleEn: "OpenClaw + n8n: The Ultimate Automation Workflow Combo",
    excerpt: "n8n 是 2026 年最受欢迎的工作流自动化平台，150,000+ GitHub Stars。本文教你如何将其与 OpenClaw 集成，实现从 AI 对话到自动化执行的完整闭环。",
    excerptEn: "n8n is the most popular workflow automation platform of 2026, with 150,000+ GitHub Stars. Learn how to integrate it with OpenClaw to achieve a complete loop from AI conversation to automated execution.",
    content: `n8n 是一个开源的工作流自动化平台，被誉为 "AI Agent 的 Action Layer"。它让你可以用可视化的方式连接各种服务和应用。

2026 年，n8n GitHub Stars 突破 150,000，成为自动化领域的绝对王者。

## 为什么是 n8n + OpenClaw？

| 能力 | OpenClaw 单独 | n8n 单独 | 组合后 |
|------|--------------|---------|--------|
| AI 对话 | ✅ | ❌ | ✅ |
| 工作流编排 | ⚠️ 有限 | ✅ | ✅ |
| 多应用连接 | ❌ | ✅ | ✅ |
| 自然语言触发 | ✅ | ❌ | ✅ |
| 定时执行 | ⚠️ 有限 | ✅ | ✅ |
| 可视化设计 | ❌ | ✅ | ✅ |

**组合效果**：用自然语言告诉 AI 你想做什么，AI 自动调用 n8n 工作流完成。

## 快速开始

### 1. 安装 n8n

\`\`\`bash
npm install n8n -g
n8n start
\`\`\`

### 2. 创建第一个工作流

在 n8n 界面中：

1. 点击 **Add workflow**
2. 添加 **Webhook** 触发器
3. 添加你想要的节点（如 HTTP Request、Slack、Email）
4. 激活工作流

### 3. 获取 Webhook URL

\`\`\`
https://your-n8n-instance.com/webhook/openclaw-trigger
\`\`\`

### 4. 配置 OpenClaw

创建技能文件 \`~/.openclaw/skills/n8n/SKILL.md\`

## 实战案例

### 案例 1：每日新闻摘要

\`\`\`
用户: 发送今天的科技新闻摘要到我的邮箱
OpenClaw → n8n → 获取新闻 → AI总结 → 发送邮件
\`\`\`

### 案例 2：Slack 群发通知

\`\`\`
用户: 通知所有开发团队，明早 10 点有站会
OpenClaw → n8n → Slack群发 → 返回结果
\`\`\`

## 总结

**OpenClaw + n8n = 自然语言 + 自动化执行**

- 🗣️ 用人话控制复杂工作流
- 🔗 连接 400+ 应用和服务
- 📊 可视化设计，无需编程
- 🔐 完全自托管，数据安全`,
    contentEn: `n8n is an open-source workflow automation platform, known as the "Action Layer for AI Agents". It lets you connect various services and applications visually.

In 2026, n8n GitHub Stars exceeded 150,000, becoming the absolute king in the automation field.

## Why n8n + OpenClaw?

| Capability | OpenClaw Alone | n8n Alone | Combined |
|------------|----------------|-----------|----------|
| AI Chat | ✅ | ❌ | ✅ |
| Workflow Orchestration | ⚠️ Limited | ✅ | ✅ |
| Multi-app Connection | ❌ | ✅ | ✅ |
| Natural Language Trigger | ✅ | ❌ | ✅ |
| Scheduled Execution | ⚠️ Limited | ✅ | ✅ |
| Visual Design | ❌ | ✅ | ✅ |

**Combined Effect**: Tell AI what you want in natural language, AI automatically calls n8n workflow to complete.

## Quick Start

### 1. Install n8n

\`\`\`bash
npm install n8n -g
n8n start
\`\`\`

### 2. Create Your First Workflow

1. Click **Add workflow**
2. Add **Webhook** trigger
3. Add desired nodes (HTTP Request, Slack, Email, etc.)
4. Activate workflow

### 3. Get Webhook URL

\`\`\`
https://your-n8n-instance.com/webhook/openclaw-trigger
\`\`\`

## Use Cases

1. **Daily News Summary**: AI fetches news, summarizes, and emails you
2. **Slack Notifications**: Send messages to multiple channels
3. **Data Sync**: Sync between Google Sheets and Notion

## Summary

**OpenClaw + n8n = Natural Language + Automation**

- 🗣️ Control complex workflows with human language
- 🔗 Connect 400+ apps and services
- 📊 Visual design, no coding required
- 🔐 Fully self-hosted, data secure`,
    author: "Marco Liu",
    date: "2026-04-01",
    category: "集成教程",
    categoryEn: "Integration",
    tags: ["n8n", "automation", "workflow", "integration", "自动化工作流"],
    readingTime: 15,
    image: "/og-image.png"
  },
  {
    id: 19,
    slug: "openclaw-qq-bot-native-integration",
    title: "重磅！OpenClaw v2026.3.31 原生集成 QQ 机器人——国内首个官方接入的社交平台",
    titleEn: "Breaking: OpenClaw v2026.3.31 Natively Integrates QQ Bot — First Official Social Platform in China",
    excerpt: "OpenClaw 正式发布 v2026.3.31 版本，原生内置 QQ Bot 官方插件。QQ 成为国内首个被 OpenClaw 官方原生接入的社交平台，仅需三步即可完成部署。",
    excerptEn: "OpenClaw officially releases v2026.3.31 with native QQ Bot plugin built-in. QQ becomes the first social platform in China to be natively integrated into OpenClaw, deployable in just 3 steps.",
    content: `4 月 1 日凌晨，OpenClaw 正式发布 v2026.3.31 版本。此次更新最大的亮点是：**原生内置 QQ 机器人（QQ Bot）官方插件**，QQ 成为国内首个被 OpenClaw 官方原生接入的社交平台。

腾讯轻量云协同 QQ 团队贡献的 QQ Bot 代码已正式合入 OpenClaw 主仓库，OpenClaw 创始人 Peter Steinberger 也公开点赞了这一里程碑事件。

## 为什么这次更新意义重大？

在此前的版本中，开发者要将 OpenClaw 智能体接入 QQ 等国内社交平台，通常需要借助第三方桥接工具（如 go-cqhttp 等），配置复杂且稳定性难以保证。

本次原生集成意味着：

- **官方维护**：插件代码由腾讯 QQ 团队贡献并持续维护
- **零外部依赖**：无需安装任何第三方桥接工具
- **开箱即用**：安装 OpenClaw 后直接可用

## 核心功能一览

| 功能 | 支持情况 |
|------|---------|
| 私聊消息 | ✅ 完整支持 |
| 群聊消息 | ✅ 完整支持 |
| 频道消息 | ✅ 完整支持 |
| 多媒体收发（图片/音频/视频） | ✅ 完整支持 |
| 多账号管理 | ✅ |
| 凭证管理（SecretRef） | ✅ |
| Slash 命令 | ✅ |
| 定时提醒 | ✅ |

## 三步部署，极速上手

**第一步**：在 OpenClaw 安装流程中选择 "QQ Bot channel"

\`\`\`bash
openclaw init
# 选择 QQ Bot 作为渠道
\`\`\`

**第二步**：在 [QQ 开放平台](https://q.qq.com) 创建机器人，获取 AppID 和 Token

**第三步**：填入 Key 即可启动

\`\`\`bash
openclaw config set gateway.qq.appId YOUR_APP_ID
openclaw config set gateway.qq.token YOUR_TOKEN
openclaw start
\`\`\`

如果使用腾讯云 Lighthouse，只需将 Key 复制粘贴到部署配置中即可。

## 与传统 AI 工具的区别

传统 AI 工具的使用方式：打开 App → 输入问题 → 获取回答 → 回到工作场景。

OpenClaw + QQ Bot 的方式：**直接在 QQ 对话中完成一切**。这种嵌入式能力意味着 AI 不再是一个需要切换的工具，而是融入你日常沟通场景的"数字同事"。

## 更深远的影响

据接近腾讯内部的消息人士透露，QQ 内的社区产品——腾讯频道正在秘密内测"AI 开放计划"，核心操作将交由 OpenClaw 接管，实现从自动创建社区、自动化管理到内容生成与引流的全链路闭环。

这标志着 AI Agent 正在从"工具"向"基础设施"演进。

## 总结

OpenClaw v2026.3.31 的 QQ Bot 原生集成，不仅仅是一个技术更新，更是 AI Agent 融入国内社交生态的标志性事件：

- 🎯 **国内首个**：QQ 是首个被 OpenClaw 官方原生支持的国内社交平台
- ⚡ **三步部署**：极简配置，零门槛使用
- 🔌 **全场景覆盖**：私聊、群聊、频道一网打尽
- 🎬 **富媒体支持**：图片、音频、视频全量支持

想试试在 QQ 里和你的 AI 助手聊天吗？现在就升级到最新版本吧！`,
    contentEn: `On April 1st, OpenClaw officially released v2026.3.31. The biggest highlight: **native QQ Bot plugin built-in**, making QQ the first social platform in China to be officially integrated into OpenClaw.

The QQ Bot code, contributed by Tencent Lighthouse team in collaboration with the QQ team, has been merged into the OpenClaw main repository. OpenClaw founder Peter Steinberger publicly endorsed this milestone.

## Why This Update Matters

Previously, developers needed third-party bridging tools to connect OpenClaw agents to Chinese social platforms like QQ, involving complex configuration and questionable stability.

Native integration means:

- **Official maintenance**: Plugin code contributed and maintained by Tencent QQ team
- **Zero external dependencies**: No third-party bridge tools needed
- **Works out of the box**: Available immediately after OpenClaw installation

## Core Features

| Feature | Support |
|---------|---------|
| Private chat | ✅ Full support |
| Group chat | ✅ Full support |
| Channel messages | ✅ Full support |
| Rich media (image/audio/video) | ✅ Full support |
| Multi-account management | ✅ |
| Credential management (SecretRef) | ✅ |
| Slash commands | ✅ |
| Scheduled reminders | ✅ |

## Deploy in 3 Steps

**Step 1**: Select "QQ Bot channel" during OpenClaw setup

\`\`\`bash
openclaw init
# Select QQ Bot as your gateway
\`\`\`

**Step 2**: Create a bot on [QQ Open Platform](https://q.qq.com) and get your AppID and Token

**Step 3**: Enter your keys and start

\`\`\`bash
openclaw config set gateway.qq.appId YOUR_APP_ID
openclaw config set gateway.qq.token YOUR_TOKEN
openclaw start
\`\`\`

## How It Differs from Traditional AI Tools

Traditional AI tools: Open app → Enter question → Get answer → Return to workflow.

OpenClaw + QQ Bot: **Do everything directly in QQ conversations**. This embedded capability means AI is no longer a separate tool but a "digital colleague" integrated into your daily communication.

## Summary

- 🎯 **First in China**: QQ is the first natively supported Chinese social platform
- ⚡ **3-step deploy**: Minimal configuration, zero barrier
- 🔌 **Full coverage**: Private chat, group chat, and channels
- 🎬 **Rich media**: Images, audio, and video fully supported

Ready to chat with your AI assistant in QQ? Upgrade to the latest version now!`,
    author: "OpenClaw 101",
    date: "2026-04-02",
    category: "新闻动态",
    categoryEn: "News",
    tags: ["QQ Bot", "v2026.3.31", "腾讯", "社交平台", "原生集成", "Tencent"],
    readingTime: 8,
    image: "/og-image.png"
  },
  {
    id: 20,
    slug: "openclaw-security-patent-risk-warning",
    title: "国家知识产权局发布风险提示：使用 OpenClaw 等智能体撰写专利文件需警惕三大风险",
    titleEn: "China IP Office Warns: Three Major Risks of Using OpenClaw for Patent Applications",
    excerpt: "国家知识产权局正式发布风险提示，指出 OpenClaw 等 AI 智能体默认安全配置脆弱，用于专利申请文件撰写可能引发技术泄露、实质缺陷、不诚信申请三大风险。",
    excerptEn: "China's National Intellectual Property Administration (CNIPA) officially warns about three major risks of using AI agents like OpenClaw for patent applications: information leakage, substantive defects, and dishonest filing.",
    content: `4 月 1 日，国家知识产权局发布重磅风险提示：OpenClaw（"小龙虾"，曾用名 Clawdbot、Moltbot）等 AI 智能体工具被曝光**默认安全配置脆弱**，不仅自身存在安全隐患，用于专利申请文件撰写还可能引发多重不可逆风险。

这是国家级机构首次针对 AI Agent 工具在知识产权领域的应用发出正式警告，值得所有 OpenClaw 用户关注。

## 三大核心风险

### 风险一：技术信息泄露

OpenClaw 等智能体存在以下安全隐患：

- **权限过高**：默认配置下，智能体可访问系统文件和网络
- **安全漏洞**：开源项目存在被利用的风险
- **插件投毒**：第三方插件可能包含恶意代码

使用其撰写专利申请文件时，技术交底书、核心研发方案等机密信息极易泄露。一旦核心技术外流：

- 专利申请因丧失**新颖性**而无法授权
- 可能被他人抢先申请专利
- 代理机构需承担违约赔偿责任

### 风险二：AI 幻觉导致实质缺陷

AI 在生成专利文件时可能出现"幻觉"问题：

- 内容逻辑矛盾
- 技术特征表述不清
- 权利要求范围不当
- 凭空编造技术方案

这些缺陷可能导致申请在初审阶段即被驳回，无法获得有效保护。

### 风险三：不诚信申请的法律后果

通过智能体**凭空生成、随机编造、内容拼凑**形成的专利申请，属于违反诚实信用原则的不诚信行为。后果包括：

| 行为主体 | 可能处罚 |
|---------|---------|
| 申请人 | 警告、罚款等行政处罚 |
| 代理机构 | 吊销执业许可证 |
| 代理师 | 注销代理资格证 |
| 情节严重者 | 列入严重违法失信名单 |

## 对 OpenClaw 用户的建议

这份风险提示并不意味着 OpenClaw 不能用，而是提醒我们**合理使用**的边界：

### ✅ 可以做的

- **辅助检索**：用 AI 搜索现有技术和专利文献
- **文本润色**：改善文件的语言表达
- **格式整理**：帮助规范文件格式
- **头脑风暴**：辅助梳理技术方案

### ❌ 不应该做的

- 让 AI 直接生成完整的专利申请文件
- 将核心技术交底书原文输入 AI 工具
- 使用 AI 编造不存在的技术方案
- 批量生成"垃圾专利"

## 安全加固建议

如果你确实需要在知识产权相关工作中使用 OpenClaw，请务必：

1. **本地部署**：确保数据不离开你的设备

\`\`\`bash
# 使用本地模型，数据完全留在本地
openclaw config set model ollama/llama3
\`\`\`

2. **收紧权限**：限制文件访问和网络权限

\`\`\`yaml
# ~/.openclaw/config.yaml
security:
  fileAccess: restricted
  networkAccess: local-only
  sandboxMode: strict
\`\`\`

3. **审计插件**：仅使用经过验证的官方插件
4. **人工审核**：AI 输出必须经过专业人员审核
5. **脱敏处理**：不要将核心技术细节直接输入 AI

## 总结

国家知识产权局的这份风险提示传递了一个明确信号：**AI 工具是辅助手段，不是替代方案**。

在知识产权这样涉及核心商业利益的领域，OpenClaw 可以帮助提升效率，但绝不能替代专业的人工判断。建立"AI 辅助 + 人工把关"的工作流程，才是负责任的使用方式。

> 💡 **关键原则**：AI 做初稿，人类做终审。核心创新，永远由人来把关。`,
    contentEn: `On April 1st, China's National Intellectual Property Administration (CNIPA) issued an official risk warning: AI agent tools like OpenClaw ("the Lobster", formerly Clawdbot/Moltbot) have been found to have **weak default security configurations**, posing serious risks when used for patent application drafting.

This is the first time a national-level institution has formally warned about AI Agent tools in the intellectual property field.

## Three Core Risks

### Risk 1: Technical Information Leakage

OpenClaw and similar agents have security concerns:

- **Excessive permissions**: Default config allows system file and network access
- **Security vulnerabilities**: Open-source projects carry exploitation risks
- **Plugin poisoning**: Third-party plugins may contain malicious code

When used for patent drafting, confidential information like technical disclosure documents can easily leak, potentially destroying patent novelty.

### Risk 2: AI Hallucination Causing Substantive Defects

AI may generate patent documents with:

- Logical contradictions
- Unclear technical feature descriptions
- Inappropriate claim scope
- Fabricated technical solutions

These defects can lead to application rejection during preliminary examination.

### Risk 3: Legal Consequences of Dishonest Filing

Patent applications formed through AI fabrication, random generation, or content stitching violate the principle of good faith. Consequences include:

| Entity | Potential Penalty |
|--------|-----------------|
| Applicant | Warnings, fines |
| Agency | License revocation |
| Attorney | Qualification cancellation |
| Severe cases | Blacklisted |

## Recommendations for OpenClaw Users

This warning doesn't mean you can't use OpenClaw — it reminds us of **responsible usage boundaries**:

### ✅ Acceptable Uses

- **Research assistance**: Search existing patents and prior art
- **Text polishing**: Improve document language
- **Format organization**: Help standardize document formats
- **Brainstorming**: Assist in organizing technical solutions

### ❌ What to Avoid

- Having AI generate complete patent applications
- Inputting core technical disclosures directly into AI tools
- Using AI to fabricate non-existent technical solutions
- Batch-generating "junk patents"

## Security Hardening Tips

If you need to use OpenClaw for IP-related work:

1. **Local deployment**: Keep data on your device

\`\`\`bash
openclaw config set model ollama/llama3
\`\`\`

2. **Tighten permissions**: Restrict file and network access
3. **Audit plugins**: Use only verified official plugins
4. **Human review**: All AI output must be reviewed by professionals
5. **Data sanitization**: Never input core technical details directly

## Summary

CNIPA's warning sends a clear message: **AI tools are aids, not replacements**.

In IP fields involving core business interests, OpenClaw can boost efficiency but must never replace professional human judgment. The responsible approach is "AI assists, humans verify."

> 💡 **Key Principle**: AI drafts, humans finalize. Core innovation must always be human-led.`,
    author: "OpenClaw 101",
    date: "2026-04-02",
    category: "安全与合规",
    categoryEn: "Security",
    tags: ["安全", "知识产权", "专利", "风险提示", "合规", "security", "patent"],
    readingTime: 10,
    image: "/og-image.png"
  },
];
