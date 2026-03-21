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
    id: 6,
    slug: "build-ai-product-in-3-days",
    title: "3天上线一个 AI 产品：从需求到收钱的完整复盘",
    titleEn: "Build an AI Product in 3 Days: From Idea to Revenue",
    excerpt: "用 Next.js + PayPal + Replicate，3天完成 AvatarDoll 玩偶头像生成器。踩过的坑、解决思路、关键代码全公开。",
    excerptEn: "Built AvatarDoll doll avatar generator in 3 days with Next.js + PayPal + Replicate. All the pitfalls, solutions, and key code revealed.",
    content: `## 背景

我有一个想法：AI 生成玩偶风格头像，用户上传照片，选择风格（Barbie/Anime/Chibi），一键生成个性化头像。

3天后，产品上线了：[avatardoll.online](https://avatardoll.online)

这篇文章复盘整个开发过程，重点讲**我踩过的坑**。

## 技术选型

| 需求 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 16 | App Router + Server Components |
| 数据库 | Turso | SQLite 兼容，免费，边缘部署 |
| 支付 | PayPal | 全球支持，沙盒完善 |
| 认证 | Google OAuth | 用户基数大，实现简单 |
| 图片生成 | Replicate | API 简单，按量付费 |

## 坑 1：配额计算错误

**现象**：Header 显示 20 次，Create 页面显示 18 次

**原因**：
\`\`\`typescript
// 错误：重复计算
const total = usedToday + pointsBalance;
// usedToday 已经包含了免费使用次数
\`\`\`

**解决**：
\`\`\`typescript
// 正确：分离计算
const freeRemaining = Math.max(0, dailyQuota - usedToday);
const total = freeRemaining + pointsBalance;
\`\`\`

## 坑 2：积分扣除缺失（严重！）

**现象**：用户生成 4 次图片，积分余额仍然是 20

**原因**：
\`\`\`typescript
// 只更新 usedToday，不扣除积分
await prisma.user.update({
  data: { usedToday: { increment: 1 } }
});
\`\`\`

**后果**：用户可以无限生成！

**解决**：
\`\`\`typescript
const freeRemaining = dailyQuota - usedToday;

if (freeRemaining > 0) {
  // 使用免费额度
  await prisma.user.update({
    data: { usedToday: { increment: 1 } }
  });
} else {
  // 扣除积分
  await prisma.pointsAccount.update({
    data: { balance: { decrement: 1 } }
  });
  await prisma.pointsTransaction.create({
    data: { type: 'USAGE', amount: -1, ... }
  });
}
\`\`\`

## 坑 3：PayPal 沙盒陷阱

**问题 1**：订单状态一直是 PENDING
- 原因：没有正确处理 webhook
- 解决：添加 webhook 验证和状态轮询

**问题 2**：支付成功后积分没到账
- 原因：capture 接口调用失败，没有事务回滚
- 解决：添加详细日志，使用数据库事务

## 关键代码：PayPal 支付流程

\`\`\`typescript
// 1. 创建订单
const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
  method: 'POST',
  headers: {
    'Authorization': \`Basic \${credentials}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: '2.99' },
      custom_id: 'POINTS_20',
    }],
  }),
});

// 2. 前端批准后 capture
const capture = await fetch(
  \`https://api-m.sandbox.paypal.com/v2/checkout/orders/\${orderId}/capture\`,
  { method: 'POST', ... }
);

// 3. 更新积分
await prisma.pointsAccount.update({
  where: { userId },
  data: { balance: { increment: 20 } }
});
\`\`\`

## 数据模型

\`\`\`prisma
model User {
  id           String   @id
  email        String   @unique
  dailyQuota   Int      @default(1)  // 每日免费额度
  usedToday    Int      @default(0)  // 今日已用
}

model PointsAccount {
  userId   String   @id
  balance  Int      @default(0)  // 积分余额
}

model PointsTransaction {
  id           String   @id
  userId       String
  type         String   // PURCHASE, USAGE, REFUND
  amount       Int
  balanceAfter Int
}
\`\`\`

## 部署架构

\`\`\`
用户 → Cloudflare (CDN/防护) → Vercel (应用) → Turso (数据库)
                                      ↓
                                Replicate (AI)
\`\`\`

## 教训总结

1. **支付逻辑必须闭环**：测试要覆盖完整流程
2. **配额计算要清晰**：数据模型避免语义混淆
3. **日志要详细**：出问题时能快速定位
4. **第三方 API 要先读文档**：不要想当然

## 成本分析

| 项目 | 成本 |
|------|------|
| 域名 | $12/年 |
| Vercel | 免费额度足够 |
| Turso | 免费额度足够 |
| Replicate | ~$0.002/次 |
| 总计 | ~$15/月起步 |

---

**完整代码**：[github.com/moonye6/AvatarDoll](https://github.com/moonye6/AvatarDoll)

**在线体验**：[avatardoll.online](https://avatardoll.online)`,
    contentEn: `## Background

I had an idea: AI-generated doll-style avatars. Users upload a photo, choose a style (Barbie/Anime/Chibi), and get a personalized avatar.

3 days later, the product went live: [avatardoll.online](https://avatardoll.online)

This article reviews the entire development process, focusing on **the pitfalls I encountered**.

## Tech Stack

| Need | Choice | Reason |
|------|------|------|
| Framework | Next.js 16 | App Router + Server Components |
| Database | Turso | SQLite compatible, free, edge deployment |
| Payment | PayPal | Global support, good sandbox |
| Auth | Google OAuth | Large user base, simple implementation |
| Image Gen | Replicate | Simple API, pay-per-use |

## Pitfall 1: Quota Calculation Error

**Symptom**: Header shows 20, Create page shows 18

**Cause**:
\`\`\`typescript
// Wrong: double counting
const total = usedToday + pointsBalance;
// usedToday already includes free usage
\`\`\`

**Solution**:
\`\`\`typescript
// Correct: separate calculation
const freeRemaining = Math.max(0, dailyQuota - usedToday);
const total = freeRemaining + pointsBalance;
\`\`\`

## Pitfall 2: Points Not Deducted (Critical!)

**Symptom**: User generated 4 images, balance still 20

**Cause**:
\`\`\`typescript
// Only update usedToday, never deduct points
await prisma.user.update({
  data: { usedToday: { increment: 1 } }
});
\`\`\`

**Result**: Users can generate infinitely!

**Solution**:
\`\`\`typescript
const freeRemaining = dailyQuota - usedToday;

if (freeRemaining > 0) {
  // Use free quota
  await prisma.user.update({
    data: { usedToday: { increment: 1 } }
  });
} else {
  // Deduct points
  await prisma.pointsAccount.update({
    data: { balance: { decrement: 1 } }
  });
}
\`\`\`

## Pitfall 3: PayPal Sandbox Traps

**Problem 1**: Order status stuck at PENDING
- Cause: Not handling webhook correctly
- Solution: Add webhook verification and status polling

**Problem 2**: Points not credited after payment
- Cause: Capture API failed, no transaction rollback
- Solution: Add detailed logs, use database transactions

## Key Code: PayPal Payment Flow

\`\`\`typescript
// 1. Create order
const order = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
  method: 'POST',
  body: JSON.stringify({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: { currency_code: 'USD', value: '2.99' },
      custom_id: 'POINTS_20',
    }],
  }),
});

// 2. Capture after user approval
const capture = await fetch(
  \`https://api-m.sandbox.paypal.com/v2/checkout/orders/\${orderId}/capture\`,
  { method: 'POST', ... }
);

// 3. Update points
await prisma.pointsAccount.update({
  where: { userId },
  data: { balance: { increment: 20 } }
});
\`\`\`

## Lessons Learned

1. **Payment logic must be complete**: Test the full flow
2. **Clear quota calculation**: Avoid semantic confusion
3. **Detailed logs**: Quick troubleshooting
4. **Read third-party API docs**: Don't assume

---

**Full Code**: [github.com/moonye6/AvatarDoll](https://github.com/moonye6/AvatarDoll)

**Try It**: [avatardoll.online](https://avatardoll.online)`,
    author: "OpenClaw 101",
    date: "2026-03-21",
    category: "实战案例",
    categoryEn: "Case Study",
    tags: ["Next.js", "PayPal", "AI产品", "实战"],
    readingTime: 12,
    image: "/og-image.png"
  },
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
