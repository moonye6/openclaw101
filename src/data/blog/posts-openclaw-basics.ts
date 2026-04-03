import type { BlogPost } from './types';

// OpenClaw 基础系列 (id 1-8)
export const postsOpenclawBasics: BlogPost[] = [
  {
    id: 2,
    slug: "openclaw-telegram-tutorial",
    title: "10分钟搞定 OpenClaw + Telegram 机器人配置",
    titleEn: "10 Minutes to Set Up OpenClaw + Telegram Bot",
    excerpt: "手把手教你配置 OpenClaw + Telegram 机器人，随时随地与 AI 对话。",
    excerptEn: "Step-by-step guide to configure OpenClaw + Telegram bot.",
    content: `想把 Telegram 变成你的 AI 私人助理？

这篇文章手把手教你配置 OpenClaw + Telegram 机器人，10 分钟内完成。

## 为什么选择 Telegram？

- 跨平台：iOS、Android、Desktop、Web 都能用
- 免费无广告：消息即时送达
- API 开放：创建机器人非常简单
- 隐私友好：支持端到端加密

## 第一步：安装 OpenClaw

### 系统要求

- Node.js 18+（推荐 20+）
- 至少 2GB 可用内存
- macOS / Linux / Windows 都支持

### 安装命令

\`\`\`bash
npm install -g openclaw
openclaw --version
\`\`\`

## 第二步：创建 Telegram Bot

1. 打开 Telegram，搜索 @BotFather
2. 发送 /newbot 命令
3. 输入 Bot 名称
4. 保存返回的 API Token

## 第三步：配置 OpenClaw

\`\`\`bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw start
\`\`\``,
    contentEn: `Want to turn Telegram into your AI personal assistant?

This article will guide you step-by-step to configure OpenClaw + Telegram bot.

## Why Choose Telegram?

- Cross-platform: iOS, Android, Desktop, Web all work
- Free and Ad-free: Instant message delivery
- Open API: Creating bots is very simple
- Privacy Friendly: Supports end-to-end encryption

## Step 1: Install OpenClaw

### System Requirements

- Node.js 18+ (20+ recommended)
- At least 2GB available memory
- macOS / Linux / Windows all supported

### Installation Command

\`\`\`bash
npm install -g openclaw
openclaw --version
\`\`\`

## Step 2: Create Telegram Bot

1. Open Telegram, search @BotFather
2. Send /newbot command
3. Enter Bot name
4. Save the returned API Token

## Step 3: Configure OpenClaw

\`\`\`bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw start
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "配置教程",
    categoryEn: "Tutorial",
    tags: ["Telegram", "配置", "机器人", "入门"],
    readingTime: 6,
    image: "/og-image.png"
  },,
  {
    id: 3,
    slug: "openclaw-best-skills",
    title: "OpenClaw 最佳技能推荐：提升效率的 10 个必备插件",
    titleEn: "OpenClaw Best Skills: 10 Must-Have Plugins",
    excerpt: "从图像生成到视频分析，这些技能将让你的 OpenClaw 如虎添翼。",
    excerptEn: "From image generation to video analysis, these skills will supercharge your OpenClaw.",
    content: `OpenClaw 的核心能力（文件、代码、网络）是通用的。但有些场景需要专业能力。

这些专业能力通过技能（Skills）实现。

ClawHub 是 OpenClaw 的技能市场，拥有丰富的社区技能可供安装。

## Top Skills

### 1. nano-banana-pro - AI 图像生成

\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

### 2. feishu-doc - 飞书文档操作

\`\`\`bash
openclaw skills install feishu-doc
\`\`\`

### 3. video-frames - 视频帧提取

\`\`\`bash
openclaw skills install video-frames
\`\`\`

## 如何安装技能？

\`\`\`bash
openclaw skills search 图像生成
openclaw skills install nano-banana-pro
openclaw skills list
\`\`\``,
    contentEn: `OpenClaw's core capabilities (files, code, network) are general-purpose. But some scenarios require specialized capabilities.

These specialized capabilities are implemented through Skills.

ClawHub is OpenClaw's skill marketplace, with a growing collection of community skills available.

## Top Skills

### 1. nano-banana-pro - AI Image Generation

\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

### 2. feishu-doc - Feishu Document Operations

\`\`\`bash
openclaw skills install feishu-doc
\`\`\`

## How to Install Skills?

\`\`\`bash
openclaw skills search image generation
openclaw skills install nano-banana-pro
openclaw skills list
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "技能推荐",
    categoryEn: "Skills",
    tags: ["技能", "ClawHub", "插件", "效率"],
    readingTime: 10,
    image: "/og-image.png"
  },,
  {
    id: 4,
    slug: "openclaw-feishu-tutorial",
    title: "OpenClaw 飞书配置完全指南：打造企业级 AI 助手",
    titleEn: "Complete Guide to OpenClaw + Feishu",
    excerpt: "从创建飞书应用到配置机器人，一篇文章解决所有问题。",
    excerptEn: "From creating Feishu app to configuring bot, solve all problems in one article.",
    content: `飞书是字节跳动旗下的企业协作平台，在国内企业中广泛使用。

将 OpenClaw 接入飞书，你可以：

- 在飞书群聊中与 AI 对话
- 自动处理飞书文档
- 同步数据到多维表格
- 发送消息通知

## 第一步：创建飞书应用

1. 打开飞书开放平台，登录你的飞书账号
2. 点击创建企业自建应用
3. 填写应用名称
4. 获取 App ID 和 App Secret

## 第二步：配置权限

添加以下权限：

- im:message - 获取与发送消息
- docs:doc:readonly - 查看文档
- docs:doc - 编辑文档

## 第三步：配置 OpenClaw

\`\`\`bash
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw start
\`\`\``,
    contentEn: `Feishu is ByteDance's enterprise collaboration platform, widely used in Chinese enterprises.

Connecting OpenClaw to Feishu allows you to:

- Chat with AI in Feishu groups
- Automatically process Feishu documents
- Sync data to bitables
- Send message notifications

## Step 1: Create Feishu App

1. Open Feishu Open Platform
2. Click Create Enterprise App
3. Fill in app name
4. Get App ID and App Secret

## Step 2: Configure Permissions

Add the following permissions:

- im:message - Get and send messages
- docs:doc:readonly - View documents
- docs:doc - Edit documents

## Step 3: Configure OpenClaw

\`\`\`bash
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw start
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "配置教程",
    categoryEn: "Tutorial",
    tags: ["飞书", "配置", "企业", "机器人"],
    readingTime: 12,
    image: "/og-image.png"
  },,
  {
    id: 5,
    slug: "openclaw-deployment-guide",
    title: "OpenClaw 本地部署 vs 云端部署：如何选择？",
    titleEn: "OpenClaw Local vs Cloud Deployment: How to Choose?",
    excerpt: "对比 5 种部署方式：本地开发机、家庭服务器、VPS、云平台一键部署、企业私有云，找到最适合你的方案。",
    excerptEn: "Compare 5 deployment methods: local machine, home server, VPS, one-click cloud deploy, enterprise private cloud.",
    content: `OpenClaw 支持多种部署方式：本地电脑、家庭服务器、VPS、云平台一键部署、企业私有云。

不同方式适合不同场景，选错了可能白花钱，或者功能受限。

## 部署方式概览

| 部署方式 | 成本 | 难度 | 可用性 |
|----------|------|------|--------|
| 本地开发机 | 免费 | 低 | 仅本机 |
| 家庭服务器 | 低 | 中 | 24小时 |
| VPS 云服务器 | 中 | 中 | 24小时 |
| 云平台一键部署 | 中 | 低 | 24小时 |
| 企业私有云 | 高 | 高 | 24小时 |

## 方案一：本地开发机部署

### 适合人群

- 个人尝鲜用户
- 开发者调试
- 不需要 24 小时在线

### 优势

- 零成本，使用现有设备
- 数据完全本地，隐私最高
- 无需网络配置，即装即用

### 劣势

- 仅在本机可用
- 关机后无法访问
- 无法对接 Telegram/Discord

### 部署命令

\`\`\`bash
npm install -g openclaw
openclaw config set model anthropic/claude-3-sonnet
openclaw web
\`\`\`

## 方案二：家庭服务器部署

### 适合人群

- 有 NAS / 树莓派 / 旧电脑
- 需要家庭自动化
- 重视数据隐私

### 优势

- 成本低（利用现有设备）
- 数据本地存储
- 24 小时可用

### 部署命令

\`\`\`bash
npm install -g openclaw
openclaw tailscale setup
openclaw telegram start
\`\`\`

## 方案三：VPS 云服务器部署

### 适合人群

- 需要稳定服务
- 想要公网访问
- 预算有限

### 推荐服务商

| 服务商 | 最低价格 | 特点 |
|--------|----------|------|
| DigitalOcean | $6/月 | 简单易用 |
| Vultr | $5/月 | 全球节点多 |
| 阿里云 | ¥50/月 | 国内访问快 |

### 部署命令

\`\`\`bash
# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 安装 OpenClaw
npm install -g openclaw

# 配置 systemd 服务
openclaw service install
systemctl enable openclaw
systemctl start openclaw
\`\`\`

## 如何选择？

\`\`\`
需要 24 小时在线？
├── 是 → 需要公网访问？
│   ├── 是 → 有运维经验？
│   │   ├── 是 → VPS 云服务器
│   │   └── 否 → 云平台一键部署
│   └── 否 → 家庭服务器
└── 否 → 本地开发机
\`\`\``,
    contentEn: `OpenClaw supports multiple deployment methods: local machine, home server, VPS, one-click cloud deploy, enterprise private cloud.

## Deployment Overview

| Method | Cost | Difficulty | Availability |
|--------|------|------------|--------------|
| Local Machine | Free | Low | Local only |
| Home Server | Low | Medium | 24/7 |
| VPS Cloud | Medium | Medium | 24/7 |
| One-Click Deploy | Medium | Low | 24/7 |
| Enterprise | High | High | 24/7 |

## Option 1: Local Machine

### Best For

- Personal testing
- Developers debugging
- No 24/7 requirement

### Commands

\`\`\`bash
npm install -g openclaw
openclaw config set model anthropic/claude-3-sonnet
openclaw web
\`\`\`

## Option 2: Home Server

### Best For

- NAS / Raspberry Pi users
- Home automation
- Data privacy focus

### Commands

\`\`\`bash
npm install -g openclaw
openclaw tailscale setup
openclaw telegram start
\`\`\`

## Option 3: VPS Cloud Server

### Recommended Providers

| Provider | Starting Price | Features |
|----------|----------------|----------|
| DigitalOcean | $6/month | Easy to use |
| Vultr | $5/month | Global nodes |
| Alibaba Cloud | ¥50/month | Fast in China |

### Commands

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g openclaw
openclaw service install
systemctl start openclaw
\`\`\`

## How to Choose?

\`\`\`
Need 24/7 availability?
├── Yes → Need public access?
│   ├── Yes → Have ops experience?
│   │   ├── Yes → VPS Cloud Server
│   │   └── No → One-Click Deploy
│   └── No → Home Server
└── No → Local Machine
\`\`\``,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "部署指南",
    categoryEn: "Deployment",
    tags: ["部署", "VPS", "云服务器", "教程"],
    readingTime: 15,
    image: "/og-image.png"
  },,
  {
    id: 6,
    slug: "how-to-install-openclaw",
    title: "如何安装 OpenClaw：2026 最新完整指南（macOS / Linux / Windows）",
    titleEn: "How to Install OpenClaw: Complete Step-by-Step Guide (2026)",
    excerpt: "从零开始安装 OpenClaw 的完整指南，覆盖 macOS、Linux、Windows 三大平台，包括常见问题排查。",
    excerptEn: "The definitive guide to installing OpenClaw from scratch on macOS, Linux, and Windows. Includes troubleshooting common issues.",
    content: `这是一篇面向完全新手的 OpenClaw 安装指南。无论你使用 macOS、Linux 还是 Windows，跟着这篇教程走，10 分钟内即可完成安装。

## 系统要求

在安装之前，确保你的系统满足以下要求：

| 要求 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Node.js | 18.x | 20.x+ |
| 内存 | 2GB | 4GB+ |
| 磁盘空间 | 500MB | 1GB+ |
| 操作系统 | macOS 12+ / Ubuntu 20.04+ / Windows 10+ | 最新版 |

## 第一步：安装 Node.js

### macOS

使用 Homebrew（推荐）：

\`\`\`bash
brew install node@20
\`\`\`

或使用 nvm：

\`\`\`bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20
\`\`\`

### Linux（Ubuntu / Debian）

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### Windows

从 [Node.js 官网](https://nodejs.org) 下载安装包，或使用 winget：

\`\`\`bash
winget install OpenJS.NodeJS.LTS
\`\`\`

验证安装：

\`\`\`bash
node --version  # 应显示 v20.x.x
npm --version   # 应显示 10.x.x
\`\`\`

## 第二步：安装 OpenClaw

\`\`\`bash
npm install -g openclaw
openclaw --version
\`\`\`

如果遇到权限问题（Linux / macOS）：

\`\`\`bash
sudo npm install -g openclaw
\`\`\`

## 第三步：初始化配置

\`\`\`bash
openclaw init
\`\`\`

这会创建 \`~/.openclaw/config.yaml\` 配置文件。

### 配置 AI 模型

\`\`\`bash
# 使用 Anthropic Claude（推荐）
openclaw config set model anthropic/claude-3-sonnet
openclaw config set apiKey YOUR_ANTHROPIC_API_KEY

# 或使用 OpenAI GPT
openclaw config set model openai/gpt-4o
openclaw config set apiKey YOUR_OPENAI_API_KEY

# 或使用本地模型（Ollama）
openclaw config set model ollama/llama3
\`\`\`

## 第四步：启动 OpenClaw

\`\`\`bash
# 启动 Web 界面
openclaw web

# 或启动命令行模式
openclaw chat
\`\`\`

## 常见问题

### Q: npm install -g 报权限错误？

**方案 A**：使用 sudo（快速但不推荐）
\`\`\`bash
sudo npm install -g openclaw
\`\`\`

**方案 B**：修改 npm 全局目录（推荐）
\`\`\`bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g openclaw
\`\`\`

### Q: 安装后 openclaw 命令找不到？

确保 npm 全局 bin 目录在 PATH 中：
\`\`\`bash
npm config get prefix  # 查看全局目录
echo $PATH             # 确认包含该目录
\`\`\`

### Q: 如何更新到最新版本？

\`\`\`bash
npm update -g openclaw
\`\`\`

## 下一步

安装完成后，推荐跟着我们的 [7天学习路径](/en/learn/1) 继续学习！`,
    contentEn: `This is a complete OpenClaw installation guide for absolute beginners. Whether you're on macOS, Linux, or Windows, follow this tutorial and you'll be up and running in 10 minutes.

## System Requirements

Before installing, make sure your system meets these requirements:

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.x | 20.x+ |
| RAM | 2GB | 4GB+ |
| Disk Space | 500MB | 1GB+ |
| OS | macOS 12+ / Ubuntu 20.04+ / Windows 10+ | Latest |

## Step 1: Install Node.js

### macOS

Using Homebrew (recommended):

\`\`\`bash
brew install node@20
\`\`\`

Or using nvm:

\`\`\`bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20
\`\`\`

### Linux (Ubuntu / Debian)

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

### Windows

Download from [Node.js website](https://nodejs.org), or use winget:

\`\`\`bash
winget install OpenJS.NodeJS.LTS
\`\`\`

Verify installation:

\`\`\`bash
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
\`\`\`

## Step 2: Install OpenClaw

\`\`\`bash
npm install -g openclaw
openclaw --version
\`\`\`

If you encounter permission issues (Linux / macOS):

\`\`\`bash
sudo npm install -g openclaw
\`\`\`

## Step 3: Initialize Configuration

\`\`\`bash
openclaw init
\`\`\`

This creates the \`~/.openclaw/config.yaml\` configuration file.

### Configure AI Model

\`\`\`bash
# Use Anthropic Claude (recommended)
openclaw config set model anthropic/claude-3-sonnet
openclaw config set apiKey YOUR_ANTHROPIC_API_KEY

# Or use OpenAI GPT
openclaw config set model openai/gpt-4o
openclaw config set apiKey YOUR_OPENAI_API_KEY

# Or use local model (Ollama)
openclaw config set model ollama/llama3
\`\`\`

## Step 4: Start OpenClaw

\`\`\`bash
# Start Web UI
openclaw web

# Or start CLI mode
openclaw chat
\`\`\`

## Troubleshooting

### Q: npm install -g gives permission error?

**Option A**: Use sudo (quick but not recommended)
\`\`\`bash
sudo npm install -g openclaw
\`\`\`

**Option B**: Change npm global directory (recommended)
\`\`\`bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g openclaw
\`\`\`

### Q: openclaw command not found after install?

Make sure the npm global bin directory is in your PATH:
\`\`\`bash
npm config get prefix  # Check global directory
echo $PATH             # Verify it's included
\`\`\`

### Q: How to update to the latest version?

\`\`\`bash
npm update -g openclaw
\`\`\`

## Next Steps

After installation, follow our [7-Day Learning Path](/en/learn/1) to continue learning!`,
    author: "Dr. Sarah Kim",
    date: "2026-03-25",
    category: "安装教程",
    categoryEn: "Installation",
    tags: ["install", "安装", "Node.js", "setup", "getting started"],
    readingTime: 8,
    image: "/og-image.png"
  },,
  {
    id: 7,
    slug: "openclaw-vs-langchain",
    title: "OpenClaw vs LangChain：AI Agent 框架深度对比 (2026)",
    titleEn: "OpenClaw vs LangChain: AI Agent Framework Comparison (2026)",
    excerpt: "从架构设计、上手难度、社区生态、实际性能四个维度深度对比两大 AI Agent 框架。",
    excerptEn: "An in-depth comparison of two major AI agent frameworks across architecture, learning curve, ecosystem, and real-world performance.",
    content: `OpenClaw 和 LangChain 是 2026 年最热门的两个 AI Agent 框架，但它们的设计理念截然不同。

## 核心定位对比

| 维度 | OpenClaw | LangChain |
|------|----------|-----------|
| **定位** | 端到端 AI 助手（面向终端用户） | AI 应用开发框架（面向开发者） |
| **核心理念** | "让 AI 为你做事" | "让开发者构建 AI 应用" |
| **使用门槛** | 零代码，自然语言交互 | 需要 Python/JS 编程能力 |
| **部署方式** | npm install -g 一键安装 | pip install + 自行编写应用代码 |
| **多平台** | Telegram/Discord/飞书/钉钉等 | 需自行集成 |
| **技能生态** | ClawHub 社区技能 | LangChain Hub + LangSmith |

## 架构设计

### OpenClaw 架构

OpenClaw 采用 **网关 → 核心 → 技能** 三层架构：

- **网关层**：统一接入 Telegram、Discord、WhatsApp 等多平台
- **核心层**：AI 推理、对话管理、任务调度
- **技能层**：可插拔的功能扩展（ClawHub 社区市场）

### LangChain 架构

LangChain 采用 **组件化** 架构：

- **Models**：LLM / Chat Model 抽象层
- **Chains**：任务链式编排
- **Agents**：自主决策 + 工具调用
- **Memory**：对话历史管理
- **Tools**：外部工具集成

## 适用场景

### 选 OpenClaw 如果你：

- 想要一个**即装即用的 AI 助手**
- 不想写代码，用自然语言交互
- 需要接入 Telegram / Discord / 飞书等平台
- 关注数据隐私（自托管）
- 喜欢丰富的社区技能生态

### 选 LangChain 如果你：

- 要**构建自定义 AI 应用**
- 有 Python/JS 开发经验
- 需要精细控制 AI 推理流程
- 要构建 RAG（检索增强生成）应用
- 需要 LangSmith 可观测性

## 社区生态数据

| 指标 | OpenClaw | LangChain |
|------|----------|-----------|
| GitHub Stars | 314k+ | 98k+ |
| 插件/技能数 | 丰富社区技能 | 700+ 集成 |
| Discord 成员 | 45,000+ | 30,000+ |
| 活跃贡献者 | 2,800+ | 3,200+ |

## 结论

**OpenClaw 和 LangChain 不是竞品，而是互补。**

- OpenClaw 是成品——适合想要 AI 助手的终端用户
- LangChain 是工具箱——适合想要构建 AI 应用的开发者

如果你只是想让 AI 帮你做事（文件管理、自动化、聊天），选 OpenClaw。
如果你想构建一个 AI 产品（SaaS、RAG 应用、AI 工作流），选 LangChain。`,
    contentEn: `OpenClaw and LangChain are the two hottest AI agent frameworks in 2026, but their design philosophies are fundamentally different.

## Core Positioning

| Dimension | OpenClaw | LangChain |
|-----------|----------|-----------|
| **Focus** | End-to-end AI assistant (for end users) | AI app development framework (for developers) |
| **Philosophy** | "Let AI do things for you" | "Let developers build AI apps" |
| **Barrier** | Zero-code, natural language | Requires Python/JS coding |
| **Deployment** | npm install -g one-click | pip install + write app code |
| **Multi-platform** | Telegram/Discord/Feishu/DingTalk | DIY integration |
| **Ecosystem** | ClawHub community skills | LangChain Hub + LangSmith |

## Architecture

### OpenClaw Architecture

OpenClaw uses a **Gateway → Core → Skills** three-layer architecture:

- **Gateway Layer**: Unified access to Telegram, Discord, WhatsApp, etc.
- **Core Layer**: AI reasoning, conversation management, task scheduling
- **Skill Layer**: Pluggable extensions (ClawHub marketplace)

### LangChain Architecture

LangChain uses a **component-based** architecture:

- **Models**: LLM / Chat Model abstraction
- **Chains**: Task chain orchestration
- **Agents**: Autonomous decision-making + tool calling
- **Memory**: Conversation history management
- **Tools**: External tool integration

## When to Choose

### Choose OpenClaw if you:

- Want a **ready-to-use AI assistant**
- Don't want to write code — use natural language
- Need Telegram / Discord / Feishu integration
- Care about data privacy (self-hosted)
- Like a rich community skill ecosystem

### Choose LangChain if you:

- Want to **build custom AI applications**
- Have Python/JS development experience
- Need fine-grained control over AI reasoning
- Building RAG (Retrieval-Augmented Generation) apps
- Need LangSmith observability

## Community Ecosystem

| Metric | OpenClaw | LangChain |
|--------|----------|-----------|
| GitHub Stars | 314k+ | 98k+ |
| Plugins/Skills | Rich community skills | 700+ integrations |
| Discord Members | 45,000+ | 30,000+ |
| Active Contributors | 2,800+ | 3,200+ |

## Conclusion

**OpenClaw and LangChain are not competitors — they're complementary.**

- OpenClaw is a finished product — ideal for users who want an AI assistant
- LangChain is a toolbox — ideal for developers who want to build AI apps

If you just want AI to do things for you (file management, automation, chat), choose OpenClaw.
If you want to build an AI product (SaaS, RAG app, AI workflow), choose LangChain.`,
    author: "Alex Chen",
    date: "2026-03-27",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["LangChain", "comparison", "AI agent", "framework", "对比"],
    readingTime: 12,
    image: "/og-image.png"
  },,
  {
    id: 8,
    slug: "best-openclaw-skills-2026",
    title: "2026 最佳 OpenClaw 技能推荐 — 25 个必装 ClawHub 技能",
    titleEn: "Best OpenClaw Skills 2026 — 25 Must-Install ClawHub Skills",
    excerpt: "精选 25 个最实用的 OpenClaw ClawHub 技能，按编程、研究、自动化、内容创作等分类推荐。",
    excerptEn: "Curated list of the 25 most useful OpenClaw ClawHub skills, organized by category: coding, research, automation, content creation, and more.",
    content: `ClawHub 社区市场有丰富的技能可供选择，但哪些真正值得安装？

经过深度测试，我们精选了 25 个最实用的技能，按场景分类推荐。

## 🤖 编程与开发（Top 5）

### 1. codebase-agent
**一句话**：让 AI 理解整个代码库
\`\`\`bash
openclaw skills install codebase-agent
\`\`\`
支持代码搜索、重构建议、bug 分析。适合大型项目维护。

### 2. github-skill
**一句话**：通过自然语言操作 GitHub
\`\`\`bash
openclaw skills install github-skill
\`\`\`
创建 PR、审查代码、管理 Issue，全部用自然语言完成。

### 3. docker-manager
**一句话**：容器管理助手
\`\`\`bash
openclaw skills install docker-manager
\`\`\`

### 4. sql-assistant
**一句话**：自然语言转 SQL 查询
\`\`\`bash
openclaw skills install sql-assistant
\`\`\`

### 5. api-tester
**一句话**：API 测试与文档生成
\`\`\`bash
openclaw skills install api-tester
\`\`\`

## 🔍 研究与信息（Top 5）

### 6. web-search-pro
**一句话**：增强型网络搜索
\`\`\`bash
openclaw skills install web-search-pro
\`\`\`

### 7. arxiv-reader
**一句话**：AI 论文阅读助手
\`\`\`bash
openclaw skills install arxiv-reader
\`\`\`

### 8. youtube-summary
**一句话**：YouTube 视频总结
\`\`\`bash
openclaw skills install youtube-summary
\`\`\`

### 9. news-aggregator
**一句话**：多源新闻聚合
\`\`\`bash
openclaw skills install news-aggregator
\`\`\`

### 10. wikipedia-lookup
**一句话**：维基百科快速查询
\`\`\`bash
openclaw skills install wikipedia-lookup
\`\`\`

## ⚡ 自动化与效率（Top 5）

### 11. cron-scheduler
**一句话**：自然语言设置定时任务
\`\`\`bash
openclaw skills install cron-scheduler
\`\`\`

### 12. email-assistant
**一句话**：邮件管理助手
\`\`\`bash
openclaw skills install email-assistant
\`\`\`

### 13. file-organizer
**一句话**：智能文件整理
\`\`\`bash
openclaw skills install file-organizer
\`\`\`

### 14. backup-manager
**一句话**：自动备份管理
\`\`\`bash
openclaw skills install backup-manager
\`\`\`

### 15. system-monitor
**一句话**：系统监控与告警
\`\`\`bash
openclaw skills install system-monitor
\`\`\`

## ✍️ 内容创作（Top 5）

### 16. nano-banana-pro
**一句话**：AI 图像生成
\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

### 17. markdown-editor
**一句话**：Markdown 文档助手
\`\`\`bash
openclaw skills install markdown-editor
\`\`\`

### 18. translator-pro
**一句话**：专业翻译（支持 50+ 语言）
\`\`\`bash
openclaw skills install translator-pro
\`\`\`

### 19. social-media-kit
**一句话**：社交媒体内容生成
\`\`\`bash
openclaw skills install social-media-kit
\`\`\`

### 20. podcast-transcriber
**一句话**：播客/音频转文字
\`\`\`bash
openclaw skills install podcast-transcriber
\`\`\`

## 🏠 智能家居与 IoT（Top 5）

### 21. home-assistant
**一句话**：Home Assistant 集成
\`\`\`bash
openclaw skills install home-assistant
\`\`\`

### 22. mqtt-bridge
**一句话**：MQTT 物联网桥接
\`\`\`bash
openclaw skills install mqtt-bridge
\`\`\`

### 23. camera-watcher
**一句话**：摄像头监控分析
\`\`\`bash
openclaw skills install camera-watcher
\`\`\`

### 24. voice-control
**一句话**：语音控制接口
\`\`\`bash
openclaw skills install voice-control
\`\`\`

### 25. energy-tracker
**一句话**：家庭能耗追踪
\`\`\`bash
openclaw skills install energy-tracker
\`\`\`

## 安装技巧

批量安装多个技能：

\`\`\`bash
openclaw skills install github-skill web-search-pro cron-scheduler
\`\`\`

查看已安装技能：

\`\`\`bash
openclaw skills list
\`\`\`

## 安全提醒

安装前务必检查技能来源，优先选择带 ✅ 认证标记的发布者。`,
    contentEn: `ClawHub marketplace has a rich collection of community skills, but which ones are actually worth installing?

After extensive testing, we've curated the 25 most useful skills, organized by category.

## 🤖 Coding & Development (Top 5)

### 1. codebase-agent
**One-liner**: Let AI understand your entire codebase
\`\`\`bash
openclaw skills install codebase-agent
\`\`\`
Supports code search, refactoring suggestions, bug analysis. Perfect for large project maintenance.

### 2. github-skill
**One-liner**: Operate GitHub with natural language
\`\`\`bash
openclaw skills install github-skill
\`\`\`
Create PRs, review code, manage Issues — all with natural language.

### 3. docker-manager
**One-liner**: Container management assistant
\`\`\`bash
openclaw skills install docker-manager
\`\`\`

### 4. sql-assistant
**One-liner**: Natural language to SQL queries
\`\`\`bash
openclaw skills install sql-assistant
\`\`\`

### 5. api-tester
**One-liner**: API testing & documentation generator
\`\`\`bash
openclaw skills install api-tester
\`\`\`

## 🔍 Research & Information (Top 5)

### 6. web-search-pro
**One-liner**: Enhanced web search
\`\`\`bash
openclaw skills install web-search-pro
\`\`\`

### 7. arxiv-reader
**One-liner**: AI paper reading assistant
\`\`\`bash
openclaw skills install arxiv-reader
\`\`\`

### 8. youtube-summary
**One-liner**: YouTube video summarizer
\`\`\`bash
openclaw skills install youtube-summary
\`\`\`

### 9. news-aggregator
**One-liner**: Multi-source news aggregation
\`\`\`bash
openclaw skills install news-aggregator
\`\`\`

### 10. wikipedia-lookup
**One-liner**: Quick Wikipedia lookup
\`\`\`bash
openclaw skills install wikipedia-lookup
\`\`\`

## ⚡ Automation & Productivity (Top 5)

### 11. cron-scheduler
**One-liner**: Set up cron jobs with natural language
\`\`\`bash
openclaw skills install cron-scheduler
\`\`\`

### 12. email-assistant
**One-liner**: Email management assistant
\`\`\`bash
openclaw skills install email-assistant
\`\`\`

### 13. file-organizer
**One-liner**: Smart file organization
\`\`\`bash
openclaw skills install file-organizer
\`\`\`

### 14. backup-manager
**One-liner**: Automated backup management
\`\`\`bash
openclaw skills install backup-manager
\`\`\`

### 15. system-monitor
**One-liner**: System monitoring & alerts
\`\`\`bash
openclaw skills install system-monitor
\`\`\`

## ✍️ Content Creation (Top 5)

### 16. nano-banana-pro
**One-liner**: AI image generation
\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

### 17. markdown-editor
**One-liner**: Markdown document assistant
\`\`\`bash
openclaw skills install markdown-editor
\`\`\`

### 18. translator-pro
**One-liner**: Professional translation (50+ languages)
\`\`\`bash
openclaw skills install translator-pro
\`\`\`

### 19. social-media-kit
**One-liner**: Social media content generation
\`\`\`bash
openclaw skills install social-media-kit
\`\`\`

### 20. podcast-transcriber
**One-liner**: Podcast/audio transcription
\`\`\`bash
openclaw skills install podcast-transcriber
\`\`\`

## 🏠 Smart Home & IoT (Top 5)

### 21. home-assistant
**One-liner**: Home Assistant integration
\`\`\`bash
openclaw skills install home-assistant
\`\`\`

### 22. mqtt-bridge
**One-liner**: MQTT IoT bridge
\`\`\`bash
openclaw skills install mqtt-bridge
\`\`\`

### 23. camera-watcher
**One-liner**: Camera monitoring & analysis
\`\`\`bash
openclaw skills install camera-watcher
\`\`\`

### 24. voice-control
**One-liner**: Voice control interface
\`\`\`bash
openclaw skills install voice-control
\`\`\`

### 25. energy-tracker
**One-liner**: Home energy tracking
\`\`\`bash
openclaw skills install energy-tracker
\`\`\`

## Installation Tips

Install multiple skills at once:

\`\`\`bash
openclaw skills install github-skill web-search-pro cron-scheduler
\`\`\`

List installed skills:

\`\`\`bash
openclaw skills list
\`\`\`

## Security Reminder

Always check skill source before installing. Prefer publishers with the ✅ verified badge.`,
    author: "Marco Liu",
    date: "2026-03-29",
    category: "技能推荐",
    categoryEn: "Skills",
    tags: ["best skills", "ClawHub", "2026", "must-install", "推荐"],
    readingTime: 15,
    image: "/og-image.png"
  },,
];
