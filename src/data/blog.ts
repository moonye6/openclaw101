export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  author: string;
  date: string;
  category: string;
  categoryEn: string;
  tags: string[];
  readingTime: number;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "openclaw-vs-chatgpt",
    title: "OpenClaw vs ChatGPT：为什么你需要一个能动的 AI 助手",
    titleEn: "OpenClaw vs ChatGPT: Why You Need an AI Assistant That Can Act",
    excerpt: "传统 AI 聊天机器人只能说不能做。OpenClaw 是一个真正能执行任务的 AI 助手。",
    excerptEn: "Traditional AI chatbots can only talk, not do. OpenClaw is an AI assistant that can actually execute tasks.",
    content: `你是否有过这样的经历？

问 ChatGPT："帮我整理一下这个文件夹里的照片，按日期分类。"

它回答："你可以使用 Python 的 os 和 shutil 库来遍历文件夹..."

然后你看着这堆建议，心里想："能不能直接帮我做了？"

这就是传统 AI 聊天机器人的痛点——它们只能说，不能做。

## 核心差异：从顾问到执行者

### ChatGPT 能做什么？

ChatGPT 是一个优秀的顾问：

- 回答问题、解释概念
- 生成文本、翻译、写作
- 提供代码片段和建议
- 无法直接操作你的电脑
- 无法执行文件操作

### OpenClaw 能做什么？

OpenClaw 是一个执行者：

- 直接创建、编辑、删除文件
- 运行代码、执行脚本
- 搜索网络、爬取页面
- 控制浏览器、操作应用
- 设置定时任务、发送通知

## 如何选择？

### 选 ChatGPT 如果你：

- 只需要文本生成、翻译、写作辅助
- 不需要 AI 执行实际操作
- 希望有简单的 Web 界面

### 选 OpenClaw 如果你：

- 希望自动化日常任务，提高效率
- 需要代码执行、文件操作能力
- 看重数据隐私（本地运行）
- 想在 Telegram/Discord 等平台使用 AI`,
    contentEn: `Have you ever had this experience?

You ask ChatGPT: "Help me organize the photos in this folder by date."

It answers: "You can use Python's os and shutil libraries to iterate through the folder..."

Then you look at this pile of suggestions and think: "Can't you just do it for me?"

This is the pain point of traditional AI chatbots—they can only talk, not do.

## Core Difference: From Consultant to Executor

### What Can ChatGPT Do?

ChatGPT is an excellent consultant:

- Answer questions, explain concepts
- Generate text, translate, write
- Provide code snippets and suggestions
- Cannot directly operate your computer
- Cannot execute file operations

### What Can OpenClaw Do?

OpenClaw is an executor:

- Directly create, edit, delete files
- Run code, execute scripts
- Search the web, crawl pages
- Control browsers, operate applications
- Set up scheduled tasks, send notifications`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["ChatGPT", "对比", "AI助手", "自动化"],
    readingTime: 8,
    image: "/og-image.png"
  },
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
  },
  {
    id: 3,
    slug: "openclaw-best-skills",
    title: "OpenClaw 最佳技能推荐：提升效率的 10 个必备插件",
    titleEn: "OpenClaw Best Skills: 10 Must-Have Plugins",
    excerpt: "从图像生成到视频分析，这些技能将让你的 OpenClaw 如虎添翼。",
    excerptEn: "From image generation to video analysis, these skills will supercharge your OpenClaw.",
    content: `OpenClaw 的核心能力（文件、代码、网络）是通用的。但有些场景需要专业能力。

这些专业能力通过技能（Skills）实现。

ClawHub 是 OpenClaw 的技能市场，目前已有 5490+ 技能可供安装。

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

ClawHub is OpenClaw's skill marketplace, currently with 5490+ skills available.

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
  },
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
  },
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
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category || post.categoryEn === category);
}
