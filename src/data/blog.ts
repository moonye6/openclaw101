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
    excerpt: "传统 AI 聊天机器人只能说不能做。OpenClaw 是一个真正能执行任务的 AI 助手，让你从顾问升级到执行者。",
    excerptEn: "Traditional AI chatbots can only talk, not do. OpenClaw is an AI assistant that can actually execute tasks.",
    content: `你是否有过这样的经历？

问 ChatGPT："帮我整理一下这个文件夹里的照片，按日期分类。"

它回答："你可以使用 Python 的 os 和 shutil 库来遍历文件夹，然后根据照片的 EXIF 信息提取日期，再创建对应的文件夹..."

然后你看着这堆建议，心里想："能不能直接帮我做了？"

这就是传统 AI 聊天机器人的痛点——它们只能说，不能做。

今天我们来聊聊 OpenClaw，一个真正能执行任务的 AI 助手，以及它和 ChatGPT 的核心差异。

## 核心差异：从顾问到执行者

### ChatGPT 能做什么？

ChatGPT 是一个优秀的顾问：

- 回答问题、解释概念
- 生成文本、翻译、写作
- 提供代码片段和建议
- 无法直接操作你的电脑
- 无法执行文件操作
- 无法实时搜索网络

你需要把它的建议复制出来，自己动手执行。

### OpenClaw 能做什么？

OpenClaw 是一个执行者：

- 直接创建、编辑、删除文件
- 运行代码、执行脚本
- 搜索网络、爬取页面
- 控制浏览器、操作应用
- 设置定时任务、发送通知

同样是整理照片的问题，OpenClaw 会直接写一个脚本并运行它。

## 技术架构：为什么 OpenClaw 能动手？

### ChatGPT 架构

用户 → 浏览器 → ChatGPT 服务器 → 返回文本

- 单一对话接口
- 无工具调用能力
- 数据上传到云端

### OpenClaw 架构

用户 → Telegram/Discord/飞书 → OpenClaw 本地服务 → 执行工具 → 返回结果

核心优势：

1. 本地运行 - 代码在你的机器上执行，数据不出你的电脑
2. 工具系统 - 内置 100+ 工具，涵盖文件、网络、浏览器等
3. 技能市场 - 5490+ 社区技能，可扩展任意功能
4. 多平台 - 支持 Telegram、Discord、WhatsApp、飞书、钉钉等
5. 多模型 - 可选 Claude、GPT、本地模型，不被单一厂商锁定`,
    contentEn: `Have you ever had this experience?

You ask ChatGPT: "Help me organize the photos in this folder by date."

It answers: "You can use Python's os and shutil libraries to iterate through the folder, then extract the date from the photos' EXIF information..."

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
- Cannot search the web in real-time

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

这篇文章手把手教你配置 OpenClaw + Telegram 机器人，10 分钟内完成，开始对话。

## 为什么选择 Telegram？

- 跨平台：iOS、Android、Desktop、Web 都能用
- 免费无广告：消息即时送达，无延迟
- API 开放：创建机器人非常简单
- 隐私友好：支持端到端加密

## 第一步：安装 OpenClaw

### 系统要求

- Node.js 18+（推荐 20+）
- 至少 2GB 可用内存
- macOS / Linux / Windows 都支持

### 安装命令

\`\`\`bash
# 全局安装 OpenClaw
npm install -g openclaw

# 验证安装成功
openclaw --version
\`\`\`

## 第二步：创建 Telegram Bot

### 获取 Bot Token

1. 打开 Telegram，搜索 @BotFather
2. 发送 /newbot 命令
3. 输入 Bot 名称
4. 输入 Bot 用户名（必须以 bot 结尾）
5. 保存返回的 API Token

## 第三步：配置 OpenClaw 连接 Telegram

\`\`\`bash
# 设置 Telegram Token
openclaw config set telegram.token YOUR_BOT_TOKEN

# 启动服务
openclaw start
\`\`\`

现在你可以在 Telegram 中与你的 AI 助手对话了！`,
    contentEn: `Want to turn Telegram into your AI personal assistant?

This article will guide you step-by-step to configure OpenClaw + Telegram bot, complete in 10 minutes.

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

### Get Bot Token

1. Open Telegram, search @BotFather
2. Send /newbot command
3. Enter Bot name
4. Enter Bot username (must end with bot)
5. Save the returned API Token

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
    excerpt: "从图像生成到视频分析，从飞书文档到网站搭建，这些技能将让你的 OpenClaw 如虎添翼。",
    excerptEn: "From image generation to video analysis, these skills will supercharge your OpenClaw.",
    content: `OpenClaw 的核心能力（文件、代码、网络）是通用的。但有些场景需要专业能力——比如生成图片、分析视频、操作飞书文档、搭建网站。

这些专业能力通过技能（Skills）实现。

ClawHub 是 OpenClaw 的技能市场，目前已有 5490+ 技能可供安装。

今天推荐 10 个最受欢迎、最实用的技能，帮你快速提升效率。

## 1. nano-banana-pro - AI 图像生成

用途：生成和编辑图片

\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`

使用场景：
- 生成博客封面图
- 创建 App 图标
- 编辑现有图片

## 2. feishu-doc - 飞书文档操作

用途：读写飞书文档、多维表格

\`\`\`bash
openclaw skills install feishu-doc
\`\`\`

使用场景：
- 自动生成周报文档
- 同步数据到飞书表格
- 批量处理文档内容

## 如何安装技能？

### 方法一：命令行

\`\`\`bash
# 搜索技能
openclaw skills search 图像生成

# 安装技能
openclaw skills install nano-banana-pro

# 查看已安装
openclaw skills list
\`\`\`

### 方法二：ClawHub 网站

访问 clawhub.com，浏览和安装技能。`,
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
    excerpt: "从创建飞书应用到配置机器人，从权限设置到实际使用，一篇文章解决所有问题。",
    excerptEn: "From creating Feishu app to configuring bot, solve all problems in one article.",
    content: `飞书是字节跳动旗下的企业协作平台，在国内企业中广泛使用。

将 OpenClaw 接入飞书，你可以：

- 在飞书群聊中与 AI 对话
- 自动处理飞书文档
- 同步数据到多维表格
- 发送消息通知

这篇文章将带你完成完整的配置流程。

## 第一步：创建飞书应用

### 1.1 访问开发者后台

打开飞书开放平台，登录你的飞书账号。

### 1.2 创建企业自建应用

1. 点击创建企业自建应用
2. 填写应用名称（如：OpenClaw 助手）
3. 选择应用图标
4. 点击创建

### 1.3 获取凭证

在应用详情页，找到：

- App ID
- App Secret

保存这两个值，后面配置要用。

## 第二步：配置权限

在权限管理页面，添加以下权限：

- im:message - 获取与发送消息
- im:message:send_as_bot - 以应用身份发消息
- docs:doc:readonly - 查看文档
- docs:doc - 编辑文档

## 第三步：配置 OpenClaw

\`\`\`bash
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw start
\`\`\`

## 第四步：添加机器人到群聊

1. 在飞书中创建一个群聊
2. 点击群设置 → 添加机器人
3. 选择你创建的应用
4. 完成！

现在你可以在群聊中 @机器人 与 AI 对话了。`,
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
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category || post.categoryEn === category);
}
