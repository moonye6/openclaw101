import type { BlogPost } from './types';

// Telegram 系列 (id 21-23)
export const postsTelegram: BlogPost[] = [
  {
    id: 21,
    slug: "how-to-create-telegram-bot",
    title: "如何创建 Telegram Bot（2026 最新分步指南）",
    titleEn: "How to Create a Telegram Bot (Step-by-Step Guide 2026)",
    excerpt: "零基础也能做！本指南带你一步步创建 Telegram Bot，涵盖 BotFather 注册、无代码搭建、AI 集成等全部流程，适合完全没有编程经验的新手。",
    excerptEn: "Learn how to create a Telegram bot step by step. Beginner-friendly guide with no-code options and AI integration.",
    content: `创建 Telegram Bot 比你想象的要简单得多，但网上大部分教程要么太浅、要么已经过时了。这篇指南会带你从零开始，一步步完成一个真正能跑起来的 Telegram Bot，包含完整的代码示例和实际操作步骤。

我们会用到 BotFather 注册 Bot、获取 Token、通过 OpenClaw 连接和管理 Bot、发送第一条消息、添加自定义命令，以及处理常见的报错。整个过程大概需要 15-20 分钟。

## 什么是 Telegram Bot？

Telegram Bot 本质上是一个运行在 Telegram 平台上的自动化账号。它不是一个真人，而是一段程序，通过 Telegram 的 Bot API 接收和发送消息。

Bot 能做的事情非常多：

- 自动回复消息和处理命令
- 定时推送通知（比如服务器告警、新闻摘要）
- 对接外部 API 拉取数据（天气、股价、加密货币行情）
- 接入 LLM 充当 AI 助手
- 连接数据库做增删改查
- 处理文件上传和下载

Telegram 的 Bot 生态非常成熟，API 文档也很完善，是目前最适合做自动化的即时通讯平台之一。

## 为什么选择 Telegram Bot？

和微信公众号、Discord Bot 相比，Telegram Bot 有几个明显的优势：

- **完全免费**：创建和使用不收任何费用，没有消息条数限制
- **API 开放度高**：几乎所有功能都可以通过 API 控制
- **无需审核**：创建即可用，不需要等待平台审批
- **全球可用**：不受地区限制（当然需要能访问 Telegram）
- **丰富的消息格式**：支持 Markdown、内联键盘、自定义菜单等

## 第一步：通过 BotFather 创建 Bot

BotFather 是 Telegram 官方提供的 Bot 管理工具，所有 Bot 的创建都必须通过它。

1. 打开 Telegram，在搜索栏输入 \`@BotFather\`，点击进入对话
2. 发送 \`/start\` 开始交互
3. 发送 \`/newbot\` 创建新 Bot

\`\`\`
/newbot
\`\`\`

4. BotFather 会问你两个问题：
   - **Bot 名称**：这是显示名，可以是中文，比如"我的自动化助手"
   - **Bot 用户名**：必须是英文，必须以 \`bot\` 结尾，比如 \`my_automation_bot\`

5. 创建成功后，BotFather 会返回一个 Bot Token，格式类似：

\`\`\`
110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
\`\`\`

> 这个 Token 是你 Bot 的唯一身份凭证。任何拿到这个 Token 的人都能完全控制你的 Bot，所以务必妥善保管。不要把它提交到 Git 仓库，不要贴在公开的地方。

### 配置 Bot 的基本信息

创建完 Bot 后，建议马上做几个基础设置：

\`\`\`
/setdescription    — 设置 Bot 描述（用户首次打开时看到的）
/setabouttext      — 设置 Bot 简介
/setuserpic        — 上传 Bot 头像
/setcommands       — 设置命令列表菜单
\`\`\`

设置命令菜单特别有用，用户在输入框里打 \`/\` 的时候会自动弹出命令列表：

\`\`\`
start - 开始使用
help - 查看帮助
status - 查看运行状态
\`\`\`

## 第二步：安装和配置 OpenClaw

OpenClaw 提供了一种高效的方式来管理和运行 Telegram Bot，不需要自己搭建服务器和处理 Webhook。

### 安装 OpenClaw

\`\`\`bash
# macOS / Linux
curl -fsSL https://get.openclaw.com | sh

# 验证安装
openclaw --version
\`\`\`

### 配置 Telegram Token

把刚才从 BotFather 拿到的 Token 配置到 OpenClaw：

\`\`\`bash
# 设置 Bot Token
openclaw config set telegram.token BOT_TOKEN_HERE

# 设置允许使用 Bot 的用户 ID（安全措施）
openclaw config set telegram.allowed_users YOUR_TELEGRAM_ID
\`\`\`

如何获取你的 Telegram 用户 ID？在 Telegram 里搜索 \`@userinfobot\`，给它发一条消息就能看到。

### 验证配置

\`\`\`bash
# 检查配置是否正确
openclaw config get telegram

# 输出应该类似：
# telegram.token: 110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
# telegram.allowed_users: 123456789
\`\`\`

## 第三步：启动 Bot 并连接 Telegram

配置完成后，一条命令就能启动：

\`\`\`bash
openclaw start --platform telegram
\`\`\`

启动成功后你会看到类似的输出：

\`\`\`
[INFO] Telegram bot connected successfully
[INFO] Bot username: @my_automation_bot
[INFO] Listening for messages...
\`\`\`

## 第四步：发送第一条消息

现在去 Telegram 里找到你的 Bot，发一条消息试试。如果一切正常，Bot 应该会有响应。

你也可以通过命令行主动发送消息：

\`\`\`bash
# 给指定的聊天发一条消息
openclaw telegram send --chat-id YOUR_CHAT_ID "Hello from OpenClaw!"
\`\`\`

chat-id 可以是你的个人用户 ID，也可以是群组 ID。

### 发送更丰富的消息

\`\`\`bash
# 发送 Markdown 格式的消息
openclaw telegram send --chat-id YOUR_CHAT_ID --format markdown "**粗体** 和 *斜体* 都支持"

# 发送带按钮的消息
openclaw telegram send --chat-id YOUR_CHAT_ID --buttons "按钮1:url1,按钮2:url2" "请选择操作"
\`\`\`

## 第五步：添加自定义命令

真正有用的 Bot 需要能响应特定的命令。通过 OpenClaw 的配置文件可以快速添加：

创建或编辑 \`openclaw.yaml\` 配置文件：

\`\`\`yaml
# openclaw.yaml
platform: telegram
commands:
  /start:
    response: "欢迎！我是你的自动化助手。输入 /help 查看可用命令。"
  /help:
    response: |
      可用命令列表：
      /start - 开始使用
      /help - 查看帮助
      /weather - 查询天气
      /status - 系统状态
  /weather:
    action: fetch_weather
    params:
      default_city: "Shanghai"
  /status:
    action: system_status
\`\`\`

保存后重启 Bot：

\`\`\`bash
# 停止当前实例
openclaw stop

# 重新启动，加载新配置
openclaw start --platform telegram
\`\`\`

## 第六步：接入 AI 能力

让 Bot 变成一个真正的 AI 助手，只需要几步配置：

\`\`\`bash
# 设置 AI 模型（支持多种 LLM）
openclaw config set ai.provider openai
openclaw config set ai.model gpt-4
openclaw config set ai.api_key YOUR_OPENAI_API_KEY

# 启用 AI 模式
openclaw config set telegram.ai_mode true
\`\`\`

在 \`openclaw.yaml\` 里可以定制 AI 的行为：

\`\`\`yaml
ai:
  system_prompt: "你是一个乐于助人的中文助手，回答简洁明了。"
  max_tokens: 1000
  temperature: 0.7
  context_window: 10  # 记住最近 10 条对话
\`\`\`

这样用户在 Telegram 里发送任何非命令消息时，Bot 都会用 AI 来生成回复。

## 第七步：错误处理和日志

生产环境下，错误处理非常重要。OpenClaw 内置了日志系统：

\`\`\`bash
# 查看实时日志
openclaw logs --follow

# 查看最近的错误
openclaw logs --level error --tail 50
\`\`\`

在配置中启用错误通知，当 Bot 出问题时会直接通过 Telegram 通知你：

\`\`\`yaml
monitoring:
  error_notification: true
  notify_chat_id: YOUR_CHAT_ID  # 错误通知发到哪个聊天
  health_check_interval: 300     # 每 5 分钟检查一次健康状态
\`\`\`

## 故障排除

### Bot 没有响应消息

1. **检查 Token 是否正确**：运行 \`openclaw config get telegram.token\`，确认没有多余的空格或换行
2. **检查 Bot 是否在运行**：运行 \`openclaw status\`
3. **检查用户权限**：如果设置了 \`allowed_users\`，确认你的用户 ID 在列表里
4. **查看日志**：\`openclaw logs --tail 20\` 看看有没有报错

### Token 无效或过期

\`\`\`bash
# 重新从 BotFather 获取 Token（发送 /token 选择你的 Bot）
# 然后更新配置
openclaw config set telegram.token NEW_TOKEN_HERE

# 重启 Bot
openclaw restart --platform telegram
\`\`\`

### 群组里 Bot 不回复

Bot 默认只处理私聊消息。要在群组里使用，需要：

1. 把 Bot 添加到群组
2. 在 BotFather 里关闭 Privacy Mode（发送 \`/setprivacy\`，选择你的 Bot，选择 \`Disable\`）
3. 在 OpenClaw 配置里启用群组模式：

\`\`\`bash
openclaw config set telegram.group_mode true
\`\`\`

### 消息发送失败（429 Too Many Requests）

Telegram 对消息发送有频率限制。如果你遇到 429 错误：

- 单个聊天：每秒不超过 1 条消息
- 群组：每分钟不超过 20 条消息
- 全局：每秒不超过 30 条消息

OpenClaw 内置了自动限速功能，但如果你通过脚本批量发送，需要自己控制频率。

### 中文消息显示乱码

确保你的配置文件使用 UTF-8 编码。如果用命令行发送中文有问题，试试：

\`\`\`bash
# 指定编码
openclaw telegram send --chat-id YOUR_CHAT_ID --encoding utf-8 "你好世界"
\`\`\`

## 安全最佳实践

- **永远不要把 Token 提交到代码仓库**。用环境变量或 \`.env\` 文件，并把 \`.env\` 加到 \`.gitignore\`
- **限制允许的用户**。通过 \`allowed_users\` 配置项控制谁能使用你的 Bot
- **定期轮换 Token**。在 BotFather 里通过 \`/revoke\` 可以重新生成 Token
- **监控异常使用**。设置日志告警，发现异常流量及时处理

## 常见问题

### 如何获取 Telegram Bot Token？

在 Telegram 里搜索 \`@BotFather\`，发送 \`/newbot\` 按照提示操作即可。BotFather 会返回一个格式为 \`数字:字母数字字符串\` 的 Token。如果你丢失了已有 Bot 的 Token，可以发送 \`/token\` 给 BotFather，选择对应的 Bot 重新获取。

### Telegram Bot 创建和使用需要付费吗？

完全免费。Telegram 不对 Bot 的创建、消息收发或 API 调用收取任何费用。唯一可能产生费用的是你自己的服务器资源和接入的第三方 API（比如 OpenAI）。

### 没有编程经验也能创建 Bot 吗？

可以。OpenClaw 提供了配置化的方式来构建 Bot，大部分功能通过 YAML 配置文件和命令行就能完成，不需要写代码。如果你需要更复杂的自定义逻辑，也可以结合简单的脚本来扩展。

### Bot 可以同时在多个群组里工作吗？

可以。一个 Bot 可以被添加到多个群组，并且同时处理来自不同群组的消息。你可以在 OpenClaw 配置里为不同群组设置不同的响应规则。

### 如何让 Bot 24 小时在线？

Bot 需要一个持续运行的进程来接收消息。你可以用 OpenClaw 的后台模式运行：

\`\`\`bash
openclaw start --platform telegram --daemon
\`\`\`

或者部署到云服务器（比如 AWS EC2、DigitalOcean Droplet）上运行。如果你用的是 VPS，建议配合 systemd 或 pm2 来管理进程。

---

👉 **下一步阅读**：
- [Telegram Bot 应用案例大全](/blog/telegram-bot-examples)
- [Telegram 自动化完整指南](/blog/telegram-automation-guide)
- [AI Agent 入门指南](/blog/ai-agent-guide)`,
    contentEn: `Most Telegram bot tutorials online either stop at "talk to BotFather" or dump a wall of framework-specific code without explaining what's actually happening. This guide is different. We'll go from zero to a fully working Telegram bot with real code examples, custom commands, AI integration, and proper error handling.

The whole process takes about 15-20 minutes. By the end, you'll have a bot that responds to messages, handles commands, and can even act as an AI assistant.

## What Exactly Is a Telegram Bot?

A Telegram bot is an automated account that runs on the Telegram platform. It's not a human — it's a program that communicates through Telegram's Bot API. Bots receive messages, process them, and send responses back.

Here's what bots can do:

- Respond to messages and handle slash commands
- Push notifications on a schedule (server alerts, news digests, price updates)
- Pull data from external APIs (weather, stocks, crypto prices)
- Act as an AI assistant powered by LLMs
- Handle file uploads and downloads
- Connect to databases for CRUD operations

Telegram's bot ecosystem is mature, the API documentation is solid, and there are no costs involved. That makes it one of the best platforms for building automation around a messaging app.

## Why Telegram Over Other Platforms?

Compared to Discord bots, WhatsApp Business API, or Slack apps, Telegram bots have a few clear advantages:

- **Completely free** — no per-message fees, no tier limits, no premium plans required
- **Open API** — nearly every feature is accessible through the API
- **No approval process** — create a bot and it works immediately
- **Global availability** — no region-locked features
- **Rich message formats** — Markdown, inline keyboards, custom menus, media groups

## Step 1: Create Your Bot with BotFather

Every Telegram bot starts with BotFather. It's the official bot for managing bots (yes, it's a bot that creates bots).

1. Open Telegram and search for \`@BotFather\` in the search bar
2. Start a conversation and send \`/start\`
3. Send \`/newbot\` to create a new bot

\`\`\`bash
/newbot
\`\`\`

4. BotFather asks two questions:
   - **Bot display name** — can be anything, like "My Automation Bot"
   - **Bot username** — must be in English, must end with \`bot\`, like \`my_automation_bot\`

5. Once created, BotFather returns your Bot Token. It looks something like this:

\`\`\`
110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
\`\`\`

> This token is the master key to your bot. Anyone who has it can fully control the bot. Do not commit it to a Git repository. Do not paste it in public channels. Treat it like a password.

### Configure Basic Bot Settings

Right after creating the bot, set up the basics:

\`\`\`bash
/setdescription    # What users see when they first open the bot
/setabouttext      # Short bio shown in the bot's profile
/setuserpic        # Upload an avatar for your bot
/setcommands       # Define the command menu
\`\`\`

Setting up the command menu is especially useful. When users type \`/\` in the chat input, Telegram shows a dropdown of available commands:

\`\`\`
start - Get started
help - Show available commands
status - Check bot status
\`\`\`

## Step 2: Install and Configure OpenClaw

OpenClaw gives you a streamlined way to manage and run your Telegram bot without dealing with server setup, webhook configuration, or polling loops.

### Install OpenClaw

\`\`\`bash
# macOS / Linux
curl -fsSL https://get.openclaw.com | sh

# Verify the installation
openclaw --version
\`\`\`

### Set Up Your Telegram Token

Feed the token from BotFather into OpenClaw:

\`\`\`bash
# Configure the bot token
openclaw config set telegram.token BOT_TOKEN_HERE

# Restrict who can interact with the bot (security best practice)
openclaw config set telegram.allowed_users YOUR_TELEGRAM_ID
\`\`\`

Not sure what your Telegram user ID is? Search for \`@userinfobot\` on Telegram, send it any message, and it'll reply with your numeric user ID.

### Verify the Configuration

\`\`\`bash
# Check that everything is set correctly
openclaw config get telegram

# Expected output:
# telegram.token: 110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
# telegram.allowed_users: 123456789
\`\`\`

## Step 3: Start the Bot

Once configured, starting the bot is a single command:

\`\`\`bash
openclaw start --platform telegram
\`\`\`

You should see output like:

\`\`\`
[INFO] Telegram bot connected successfully
[INFO] Bot username: @my_automation_bot
[INFO] Listening for messages...
\`\`\`

That means the bot is live and waiting for messages.

## Step 4: Send Your First Message

Open Telegram, find your bot by its username, and send it a message. If everything is configured correctly, the bot should respond.

You can also send messages from the command line:

\`\`\`bash
# Send a test message to a specific chat
openclaw telegram send --chat-id YOUR_CHAT_ID "Hello from OpenClaw!"
\`\`\`

The chat ID can be your personal user ID or a group chat ID.

### Richer Message Formats

\`\`\`bash
# Send a Markdown-formatted message
openclaw telegram send --chat-id YOUR_CHAT_ID --format markdown "**Bold** and *italic* both work"

# Send a message with inline buttons
openclaw telegram send --chat-id YOUR_CHAT_ID --buttons "Button1:url1,Button2:url2" "Choose an action"
\`\`\`

## Step 5: Add Custom Commands

A bot that just echoes messages back isn't very useful. Let's add some real commands.

Create or edit an \`openclaw.yaml\` configuration file in your project directory:

\`\`\`yaml
# openclaw.yaml
platform: telegram
commands:
  /start:
    response: "Welcome! I'm your automation assistant. Type /help to see what I can do."
  /help:
    response: |
      Available commands:
      /start - Get started
      /help - Show this help message
      /weather - Check the weather
      /status - System status
  /weather:
    action: fetch_weather
    params:
      default_city: "New York"
  /status:
    action: system_status
\`\`\`

After saving the file, restart the bot to pick up the new configuration:

\`\`\`bash
# Stop the current instance
openclaw stop

# Start again with the updated config
openclaw start --platform telegram
\`\`\`

Now when someone sends \`/help\` to your bot, they get the command list. When they send \`/weather\`, the bot fetches weather data and replies.

## Step 6: Add AI Capabilities

Turning your bot into an AI assistant takes just a few configuration changes:

\`\`\`bash
# Set up the AI provider
openclaw config set ai.provider openai
openclaw config set ai.model gpt-4
openclaw config set ai.api_key YOUR_OPENAI_API_KEY

# Enable AI mode for Telegram
openclaw config set telegram.ai_mode true
\`\`\`

You can customize the AI behavior in \`openclaw.yaml\`:

\`\`\`yaml
ai:
  system_prompt: "You are a helpful assistant. Keep answers concise and practical."
  max_tokens: 1000
  temperature: 0.7
  context_window: 10  # Remember the last 10 messages
\`\`\`

With this setup, any non-command message sent to the bot gets routed through the AI model. The bot maintains conversation context, so follow-up questions work naturally.

## Step 7: Error Handling and Logging

Running a bot without logging is flying blind. OpenClaw has built-in log management:

\`\`\`bash
# Stream logs in real time
openclaw logs --follow

# Show only recent errors
openclaw logs --level error --tail 50
\`\`\`

Set up error notifications so the bot alerts you directly on Telegram when something breaks:

\`\`\`yaml
monitoring:
  error_notification: true
  notify_chat_id: YOUR_CHAT_ID  # Where to send error alerts
  health_check_interval: 300     # Health check every 5 minutes
\`\`\`

## Troubleshooting

### Bot Doesn't Respond to Messages

1. **Check the token** — Run \`openclaw config get telegram.token\` and make sure there are no extra spaces or newline characters
2. **Check if the bot is running** — Run \`openclaw status\`
3. **Check user permissions** — If you set \`allowed_users\`, verify your user ID is in the list
4. **Read the logs** — \`openclaw logs --tail 20\` usually reveals the issue

### Invalid or Expired Token

\`\`\`bash
# Get a fresh token from BotFather (send /token and select your bot)
# Then update the config
openclaw config set telegram.token NEW_TOKEN_HERE

# Restart the bot
openclaw restart --platform telegram
\`\`\`

### Bot Doesn't Reply in Group Chats

By default, bots only process direct messages. To make your bot work in groups:

1. Add the bot to the group
2. Disable Privacy Mode in BotFather — send \`/setprivacy\`, select your bot, choose \`Disable\`
3. Enable group mode in OpenClaw:

\`\`\`bash
openclaw config set telegram.group_mode true
\`\`\`

### Rate Limiting (429 Too Many Requests)

Telegram enforces rate limits on message sending:

- **Per chat**: no more than 1 message per second
- **Per group**: no more than 20 messages per minute
- **Global**: no more than 30 messages per second across all chats

OpenClaw handles rate limiting automatically, but if you're sending messages through custom scripts, you need to throttle on your end.

### Messages Not Displaying Correctly

If special characters or formatting look wrong, make sure your config files are saved as UTF-8. When sending messages from the terminal:

\`\`\`bash
# Explicitly set encoding
openclaw telegram send --chat-id YOUR_CHAT_ID --encoding utf-8 "Testing special characters: ñ, ü, 中文"
\`\`\`

## Security Best Practices

- **Never commit your token to version control.** Use environment variables or a \`.env\` file, and add \`.env\` to your \`.gitignore\`.
- **Restrict allowed users.** The \`allowed_users\` config prevents random people from interacting with your bot.
- **Rotate tokens periodically.** Send \`/revoke\` to BotFather to generate a new token for any bot.
- **Monitor for unusual activity.** Set up log alerts and review them regularly.

## FAQ

### How do I get a Telegram Bot Token?

Search for \`@BotFather\` on Telegram, send \`/newbot\`, and follow the prompts. BotFather returns a token in the format \`numbers:alphanumeric_string\`. If you've lost the token for an existing bot, send \`/token\` to BotFather and select the bot to get a new one.

### Does creating a Telegram bot cost anything?

No. Telegram does not charge for bot creation, message delivery, or API usage. The only costs you might incur are for your own hosting and any third-party APIs you connect (like OpenAI for AI features).

### Can I build a bot without any programming experience?

Yes. OpenClaw lets you configure bots through YAML files and CLI commands — no code required for most use cases. If you need more advanced custom logic down the road, you can extend the bot with simple scripts.

### Can a single bot work in multiple group chats?

Absolutely. One bot can be added to as many groups as you want and handles messages from all of them simultaneously. OpenClaw lets you define different response rules for different groups if needed.

### How do I keep the bot running 24/7?

The bot process needs to stay alive to receive messages. You can run it as a daemon:

\`\`\`bash
openclaw start --platform telegram --daemon
\`\`\`

For production deployments, put it on a cloud server (AWS EC2, DigitalOcean Droplet, etc.) and manage the process with systemd or pm2 to handle automatic restarts.

---

**Keep reading:**
- [Telegram Bot Examples](/blog/telegram-bot-examples)
- [Telegram Automation Guide](/blog/telegram-automation-guide)
- [AI Agent Guide](/blog/ai-agent-guide)`,
    author: "OpenClaw 101",
    date: "2026-04-03",
    category: "教程",
    categoryEn: "Tutorial",
    tags: ["Telegram", "Bot", "教程", "Tutorial", "自动化", "Automation", "AI", "No-Code", "Beginner"],
    readingTime: 15,
    image: "/og-image.png"
  },
  {
    id: 22,
    slug: "telegram-bot-examples",
    title: "10 个 Telegram Bot 实战案例：今天就能上手搭建（2026）",
    titleEn: "10 Telegram Bot Examples You Can Build Today (Step-by-Step)",
    excerpt: "精选 10 个实用 Telegram Bot 案例——从简单自动化到 AI 智能助手，零基础友好，今天就能动手实现。",
    excerptEn: "Discover 10 practical Telegram bot examples you can build right now. Step-by-step ideas, automation workflows, and tools included.",
    content: `想找一些真正能动手做出来的 Telegram Bot 灵感？网上大部分"案例合集"都是清单式罗列，看完之后还是不知道该怎么做。这篇不一样——我们挑了 **10 个真正实用的 Telegram Bot 案例**，每一个都告诉你它能干什么、具体怎么用、以及用 OpenClaw 搭建的配置示例。

不需要编程基础，大部分 Bot 从配置到上线不超过 30 分钟。

## 前置准备

在开始之前，你需要完成这些基础设置：

### 1. 创建 Telegram Bot

在 Telegram 中找到 \`@BotFather\`，发送 \`/newbot\`，按提示设置名称和用户名，获得你的 Bot Token。

### 2. 安装 OpenClaw

\`\`\`bash
npm install -g openclaw
\`\`\`

### 3. 配置 Telegram 连接

\`\`\`bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw config set telegram.chat_id YOUR_CHAT_ID
\`\`\`

Chat ID 可以通过向 Bot 发一条消息，然后访问 \`https://api.telegram.org/botYOUR_TOKEN/getUpdates\` 来获取。

准备好了？下面进入正题。

---

## 1. 每日天气播报 Bot

**它能做什么：** 每天固定时间给你发送指定城市的天气预报，包含温度、降水概率、穿衣建议等信息。

**使用场景：** 早上出门前看一眼天气，决定要不要带伞。对于需要管理多个城市出差行程的人来说尤其方便——给每个目的地城市都配一个播报。

**配置示例：**

\`\`\`bash
openclaw "set up daily weather alerts for San Francisco, send to Telegram at 8am"
\`\`\`

OpenClaw 会自动调用天气 API、格式化消息、设置定时任务。你也可以在配置文件中自定义更多细节，比如增加空气质量指数、紫外线等级等。

---

## 2. 记账 Bot

**它能做什么：** 你在 Telegram 里直接输入消费记录（比如"午饭 35 元"），Bot 自动分类、记录，并定期生成消费报表。

**使用场景：** 不想装额外的记账 App，直接在 Telegram 对话框里随手记一笔。月底 Bot 自动汇总，告诉你钱花在了哪里。

**配置示例：**

\`\`\`yaml
skills:
  - expense-tracker:
      categories:
        - 餐饮
        - 交通
        - 购物
        - 娱乐
        - 其他
      currency: CNY
      summary_schedule: "0 20 * * 0"  # 每周日晚 8 点发送周报
      notify: telegram
\`\`\`

Bot 会根据关键词自动分类（"打车"归入交通，"咖啡"归入餐饮），你也可以手动指定分类。每周日会收到一份包含饼图和分类明细的消费周报。

---

## 3. RSS 新闻聚合 Bot

**它能做什么：** 自动监控你订阅的 RSS 源，有新文章时立即推送到 Telegram，或者按固定间隔汇总推送。

**使用场景：** 关注多个技术博客、新闻网站、行业媒体，但不想一个个去刷。让 Bot 帮你盯着，有新内容直接送到手机上。

**配置示例：**

\`\`\`yaml
skills:
  - rss-reader:
      feeds:
        - https://techcrunch.com/feed
        - https://hnrss.org/frontpage
        - https://feeds.arstechnica.com/arstechnica/index
      interval: 1h
      notify: telegram
      max_items: 5
      format: "title + summary + link"
\`\`\`

你可以针对每个源设置不同的推送频率。比如重要的行业新闻每小时检查一次，技术博客每天汇总一次就够了。

---

## 4. 提醒 / 待办 Bot

**它能做什么：** 通过自然语言设置提醒和待办事项。说"明天下午3点提醒我交报告"，Bot 到时间就会发消息提醒你。

**使用场景：** 替代手机上的提醒应用。好处是 Telegram 的通知你一定会看到——不像某些提醒 App，通知权限被系统杀掉了都不知道。

**配置示例：**

\`\`\`bash
openclaw "create a reminder bot on Telegram that accepts natural language input like 'remind me to call dentist tomorrow at 2pm'"
\`\`\`

Bot 支持以下格式的输入：
- "提醒我明天上午10点开会"
- "每周五下午5点提醒我写周报"
- "30分钟后提醒我取快递"
- "/todo 买牛奶、鸡蛋、面包"

待办列表可以用 \`/list\` 查看，用 \`/done 1\` 标记完成。

---

## 5. 翻译 Bot

**它能做什么：** 把你发送的任何文本翻译成目标语言。支持自动检测源语言，也可以指定翻译方向。

**使用场景：** 在国际团队的 Telegram 群里，有人发了看不懂的语言，直接转发给翻译 Bot 就能看到结果。或者你在阅读外文资料时，随手复制一段发过去。

**配置示例：**

\`\`\`yaml
skills:
  - translator:
      default_target: zh-CN
      supported_languages:
        - en
        - zh-CN
        - ja
        - ko
        - es
        - fr
      auto_detect: true
      notify: telegram
\`\`\`

在群组里使用时，可以用 \`/translate en 这段话需要翻译成英文\` 的格式指定目标语言。私聊时直接发文本就行，Bot 会自动翻译成你设定的默认语言。

---

## 6. 文件格式转换 Bot

**它能做什么：** 把你发到 Telegram 的文件转换成其他格式。比如 PDF 转 Word、图片转 PDF、音频转文字等。

**使用场景：** 手机上收到一个 PDF 需要编辑，但没装相关软件。直接发给 Bot，几秒后就能拿到 Word 版本。或者把多张图片合并成一个 PDF 发给客户。

**配置示例：**

\`\`\`bash
openclaw "build a Telegram bot that converts files: PDF to Word, images to PDF, audio to text transcription"
\`\`\`

Bot 支持的转换类型：
- PDF → DOCX / TXT
- 图片（JPG/PNG）→ PDF
- 音频（MP3/WAV）→ 文字（语音转写）
- Markdown → PDF
- CSV → Excel

发送文件后，Bot 会自动识别格式并提供可用的转换选项。

---

## 7. 代码审查 Bot

**它能做什么：** 把代码片段或 Git diff 发给 Bot，它用 AI 分析代码质量，指出潜在问题、安全隐患和改进建议。

**使用场景：** 独立开发者没有团队成员帮忙 review 代码。提交前先让 Bot 过一遍，抓出低级错误和安全问题。也可以集成到 CI/CD 流程中，每次 push 自动把 diff 发到 Telegram。

**配置示例：**

\`\`\`yaml
skills:
  - code-reviewer:
      languages:
        - javascript
        - python
        - typescript
        - go
      checks:
        - security
        - performance
        - best-practices
        - error-handling
      notify: telegram
      severity_threshold: medium
\`\`\`

发送代码的方式有三种：直接在消息里贴代码块、发送代码文件、或者发送一个 GitHub PR 链接。Bot 会返回逐行注释，按严重程度分级（严重/高/中/低）。

---

## 8. 社交媒体监控 Bot

**它能做什么：** 监控 Twitter、Reddit、Hacker News 等平台上的特定关键词或账号动态，有新内容时推送到 Telegram。

**使用场景：** 品牌舆情监控——有人在 Twitter 上提到你的产品名，立刻收到通知。或者监控竞品动态、行业关键词、招聘信息等。

**配置示例：**

\`\`\`yaml
skills:
  - social-monitor:
      platforms:
        - twitter:
            keywords: ["openclaw", "telegram bot"]
            accounts: ["@OpenClaw"]
        - reddit:
            subreddits: ["telegrambot", "automation"]
            keywords: ["bot recommendation"]
        - hackernews:
            keywords: ["telegram", "chatbot"]
      check_interval: 30m
      notify: telegram
      deduplicate: true
\`\`\`

Bot 会对重复内容自动去重，避免同一条消息推送多次。你也可以设置情感分析，只在出现负面评价时才推送告警。

---

## 9. 会议日程管理 Bot

**它能做什么：** 连接你的 Google Calendar 或其他日历服务，每天早上推送今日议程，会议前15分钟发送提醒，并支持在 Telegram 里直接创建新会议。

**使用场景：** 不用打开日历 App 就能掌握今天的安排。在群组里直接用 Bot 发起会议邀请，自动找到所有人的空闲时段。

**配置示例：**

\`\`\`bash
openclaw "create a meeting scheduler bot for Telegram that syncs with Google Calendar, sends daily agenda at 8am, and reminds me 15 minutes before each meeting"
\`\`\`

在 Telegram 里的操作方式：
- \`/today\` — 查看今日所有会议
- \`/tomorrow\` — 查看明天的安排
- \`/schedule 周五下午2点 产品评审会 1小时\` — 创建新会议
- \`/free 明天下午\` — 查询明天下午的空闲时段

Bot 还能自动检测时区冲突，如果你在群组里发起会议，它会显示每位参与者所在时区的对应时间。

---

## 10. 智能家居控制 Bot

**它能做什么：** 通过 Telegram 消息控制你的智能家居设备——灯光、空调、摄像头、扫地机器人等。

**使用场景：** 出门在外突然想到家里灯没关，掏出手机在 Telegram 里发一条"关客厅灯"就行了。或者设置自动化场景：到家前10分钟自动开空调、开灯。

**配置示例：**

\`\`\`yaml
skills:
  - smart-home:
      platform: home-assistant
      api_url: "http://your-home-assistant:8123"
      devices:
        - name: 客厅灯
          entity_id: light.living_room
          commands: ["开", "关", "调暗", "调亮"]
        - name: 空调
          entity_id: climate.bedroom
          commands: ["开", "关", "设置温度"]
        - name: 摄像头
          entity_id: camera.front_door
          commands: ["截图", "录像"]
      notify: telegram
\`\`\`

在 Telegram 里直接发自然语言指令即可：
- "开客厅灯"
- "空调调到 24 度"
- "前门摄像头截一张图"
- "启动扫地机器人"

Bot 会返回执行结果确认，摄像头截图会直接以图片形式发送到聊天中。

---

## 从零开始的完整搭建流程

不管你选上面哪个案例，整体流程都是一样的：

1. **创建 Bot** — 在 BotFather 获取 Token
2. **安装 OpenClaw** — \`npm install -g openclaw\`
3. **配置连接** — 设置 Token 和 Chat ID
4. **选择技能** — 从上面的案例中选一个，复制配置
5. **启动 Bot** — \`openclaw start --platform telegram\`
6. **后台运行** — \`openclaw start --platform telegram --daemon\`

如果你想让 Bot 24 小时在线，建议部署到云服务器上，配合 systemd 或 pm2 做进程管理。

## 常见问题

### 这些 Bot 案例哪个最适合新手入门？

天气播报 Bot 和提醒 Bot 最简单，配置少、依赖少，10 分钟就能跑起来。如果你想要稍微有挑战性的，RSS 新闻聚合 Bot 也不错，配置 feed 地址就能用。

### 一个 Bot 可以同时具备多种功能吗？

可以。OpenClaw 支持给同一个 Bot 叠加多个 skill。比如你可以让一个 Bot 同时具备天气播报、提醒、翻译的功能。用户通过不同的命令前缀来调用不同功能。

### 这些 Bot 运行需要付费吗？

Telegram Bot 本身完全免费。OpenClaw 基础功能免费。可能产生费用的是你接入的第三方 API（比如翻译 API、天气 API）和服务器成本，但大部分 API 都有免费额度，个人使用通常够了。

### 如何保证 Bot 的安全性？

几个关键点：永远不要把 Token 提交到代码仓库；通过 \`allowed_users\` 配置限制谁能使用你的 Bot；定期在 BotFather 里轮换 Token；对于智能家居控制这类敏感 Bot，务必开启二次确认。

---

👉 **相关阅读**：
- [如何创建 Telegram Bot（分步指南）](/blog/how-to-create-telegram-bot)
- [Telegram 自动化完整指南](/blog/telegram-automation-guide)
- [AI Agent 入门指南](/blog/ai-agent-guide)`,
    contentEn: `Most "Telegram bot examples" articles give you a list of ideas with two sentences each and call it a day. You finish reading and still have no clue how to actually build any of them. This guide is different. We picked 10 practical Telegram bots that solve real problems, and for each one, we walk through what it does, a concrete use case where it shines, and an actual configuration or command example using OpenClaw.

No programming background required. Most of these bots go from zero to running in under 30 minutes.

## Prerequisites and Setup

Before diving into the examples, get the basics in place.

### 1. Create a Telegram Bot

Open Telegram, search for \`@BotFather\`, and send \`/newbot\`. Follow the prompts to choose a display name and username. BotFather hands you a Bot Token that looks like \`110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw\`. Keep it safe — this is the master key to your bot.

### 2. Install OpenClaw

\`\`\`bash
npm install -g openclaw
\`\`\`

### 3. Configure the Telegram Connection

\`\`\`bash
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw config set telegram.chat_id YOUR_CHAT_ID
\`\`\`

To find your Chat ID, send any message to your bot, then visit \`https://api.telegram.org/botYOUR_TOKEN/getUpdates\` in a browser. The \`chat.id\` field in the JSON response is what you need.

With that done, let's get into the bots.

---

## 1. Daily Weather Bot

**What it does:** Sends you a weather forecast for a specific city at a set time every day. The message includes temperature, precipitation probability, humidity, and a plain-language summary like "bring an umbrella today."

**Concrete use case:** You travel between cities for work. Instead of checking weather apps for three different locations each morning, you set up alerts for San Francisco, New York, and London. At 8 AM local time, each forecast lands in your Telegram chat before you even get out of bed.

**How to build it:**

\`\`\`bash
openclaw "set up daily weather alerts for San Francisco, send to Telegram at 8am"
\`\`\`

OpenClaw handles the weather API calls, message formatting, and cron scheduling behind the scenes. You can customize it further in the config file to add air quality index, UV levels, or wind speed if you want more detail.

---

## 2. Expense Tracker Bot

**What it does:** You type spending entries directly into Telegram — something like "lunch 12.50" or "uber 23" — and the bot categorizes the expense, stores it, and generates periodic spending reports.

**Concrete use case:** You are trying to stick to a monthly budget but hate opening dedicated finance apps. Every time you buy something, you fire off a quick message to the bot. On Sunday evening, it sends you a weekly breakdown with a pie chart showing where the money went. At month-end, you get a full summary comparing this month against last month.

**Configuration example:**

\`\`\`yaml
skills:
  - expense-tracker:
      categories:
        - Food
        - Transport
        - Shopping
        - Entertainment
        - Other
      currency: USD
      summary_schedule: "0 20 * * 0"  # Weekly report every Sunday at 8 PM
      notify: telegram
\`\`\`

The bot auto-categorizes based on keywords ("coffee" goes to Food, "uber" to Transport). You can override by writing "lunch 12.50 transport" to force a category. The weekly report includes total spending, per-category totals, and a comparison against your set budget.

---

## 3. RSS News Reader Bot

**What it does:** Monitors RSS feeds from blogs, news sites, or any source that publishes a feed. When new articles appear, the bot pushes a notification to your Telegram chat with the title, a short summary, and a direct link.

**Concrete use case:** You follow TechCrunch, Hacker News frontpage, and Ars Technica but don't want to check three websites throughout the day. The bot watches all three feeds and sends you a combined digest every hour. Important breaking news hits your phone without you lifting a finger.

**Configuration example:**

\`\`\`yaml
skills:
  - rss-reader:
      feeds:
        - https://techcrunch.com/feed
        - https://hnrss.org/frontpage
        - https://feeds.arstechnica.com/arstechnica/index
      interval: 1h
      notify: telegram
      max_items: 5
      format: "title + summary + link"
\`\`\`

You can set different intervals per feed. Tech news might warrant hourly checks, while a personal blog you follow could be checked once daily. The \`max_items\` setting prevents your chat from getting flooded when a site publishes ten articles at once.

---

## 4. Reminder and Todo Bot

**What it does:** Accepts natural language input to set reminders and manage a todo list. You type "remind me to call the dentist tomorrow at 2pm" and the bot sends you a message at exactly that time.

**Concrete use case:** You are in a meeting and someone mentions a deadline. Instead of switching apps, you type a quick message to the bot right there in Telegram. The reminder fires at the right time. For recurring tasks, you set it once ("remind me every Friday at 5pm to submit the weekly report") and forget about it.

**How to build it:**

\`\`\`bash
openclaw "create a reminder bot on Telegram that accepts natural language input like 'remind me to call dentist tomorrow at 2pm'"
\`\`\`

The bot understands various input formats:
- "remind me in 30 minutes to check the oven"
- "every Monday at 9am remind me to review pull requests"
- "tomorrow 3pm dentist appointment"
- "/todo buy milk, eggs, bread"

Use \`/list\` to see all active reminders and todos. Use \`/done 1\` to mark an item complete. Use \`/clear\` to wipe completed items.

---

## 5. Language Translator Bot

**What it does:** Translates any text you send into your target language. It auto-detects the source language, so you just paste text and get the translation back.

**Concrete use case:** You work in a Telegram group with people who speak different languages. Someone posts a message in Japanese that you can not read. Forward it to the translator bot, and the English version comes back in seconds. In private chat, you paste paragraphs from foreign-language documentation you are reading, and the bot translates them inline.

**Configuration example:**

\`\`\`yaml
skills:
  - translator:
      default_target: en
      supported_languages:
        - en
        - zh-CN
        - ja
        - ko
        - es
        - fr
      auto_detect: true
      notify: telegram
\`\`\`

In a group setting, use the command format: \`/translate es This needs to be in Spanish\`. In private chat, just send the text directly and the bot translates to your default target language. It preserves formatting, handles code blocks gracefully, and works with messages up to 4000 characters.

---

## 6. File Converter Bot

**What it does:** Converts files you send via Telegram into different formats. PDF to Word, images to PDF, audio to text transcription, Markdown to PDF, and more.

**Concrete use case:** A client sends you a contract as a PDF and you need to make edits. You forward the PDF to the bot and get a .docx file back within seconds. Or you have five product photos that need to go into a single PDF for a presentation — send them all to the bot and it merges them into one document.

**How to build it:**

\`\`\`bash
openclaw "build a Telegram bot that converts files: PDF to Word, images to PDF, audio to text transcription"
\`\`\`

Supported conversions:
- PDF to DOCX or TXT
- Images (JPG/PNG) to PDF (single or merged)
- Audio (MP3/WAV/OGG) to text transcription
- Markdown to styled PDF
- CSV to Excel

Send any file to the bot and it auto-detects the format, then presents conversion options as inline buttons. Tap the one you want and the converted file comes back as a Telegram attachment.

---

## 7. Code Review Bot

**What it does:** Accepts code snippets, files, or GitHub PR links and runs AI-powered analysis on the code. It flags security vulnerabilities, performance issues, error handling gaps, and style inconsistencies.

**Concrete use case:** You are a solo developer with no one to review your pull requests. Before merging, you paste the diff into the bot or send it a GitHub PR link. The bot returns line-by-line annotations ranked by severity — critical issues in red, suggestions in yellow. You catch a SQL injection vulnerability that would have gone to production without the review.

**Configuration example:**

\`\`\`yaml
skills:
  - code-reviewer:
      languages:
        - javascript
        - python
        - typescript
        - go
      checks:
        - security
        - performance
        - best-practices
        - error-handling
      notify: telegram
      severity_threshold: medium
\`\`\`

Three ways to submit code for review: paste a code block directly in the chat, send a source file as an attachment, or send a GitHub PR URL. The bot returns findings grouped by severity (critical / high / medium / low) with specific line references and suggested fixes.

---

## 8. Social Media Monitor Bot

**What it does:** Watches Twitter, Reddit, Hacker News, and other platforms for specific keywords or account activity. When it finds a match, it pushes a notification to your Telegram chat with the content, author, and a direct link.

**Concrete use case:** You launched a product called "Widgetly" and want to know whenever someone mentions it online. The bot watches Twitter for "widgetly," Reddit for posts in relevant subreddits, and Hacker News for any discussion threads. The moment someone tweets about your product or asks about it on Reddit, you get a Telegram notification and can respond within minutes instead of discovering it days later.

**Configuration example:**

\`\`\`yaml
skills:
  - social-monitor:
      platforms:
        - twitter:
            keywords: ["openclaw", "telegram bot"]
            accounts: ["@OpenClaw"]
        - reddit:
            subreddits: ["telegrambot", "automation"]
            keywords: ["bot recommendation"]
        - hackernews:
            keywords: ["telegram", "chatbot"]
      check_interval: 30m
      notify: telegram
      deduplicate: true
\`\`\`

The bot deduplicates automatically so you never see the same post twice. You can add sentiment filtering to only get notified about negative mentions, which is useful for brand reputation monitoring.

---

## 9. Meeting Scheduler Bot

**What it does:** Connects to your Google Calendar (or other calendar service), sends your daily agenda each morning, fires reminders 15 minutes before each meeting, and lets you create new events directly from Telegram.

**Concrete use case:** Your mornings are packed and you rarely remember to check your calendar app. At 8 AM, the bot sends you a clean list of today's meetings with times, locations, and attendee names. Fifteen minutes before each one, you get a tap on the shoulder. When someone in a Telegram group says "let's meet Friday afternoon," you type \`/schedule Friday 2pm Product review 1hr\` and the event lands on your calendar with invites sent automatically.

**How to build it:**

\`\`\`bash
openclaw "create a meeting scheduler bot for Telegram that syncs with Google Calendar, sends daily agenda at 8am, and reminds me 15 minutes before each meeting"
\`\`\`

Commands you can use in Telegram:
- \`/today\` — see all meetings for today
- \`/tomorrow\` — preview tomorrow's schedule
- \`/schedule Friday 2pm Product review 1hr\` — create a new event
- \`/free tomorrow afternoon\` — check available time slots

The bot also handles timezone differences. When you create a group meeting, it shows each participant the time converted to their local timezone.

---

## 10. Smart Home Controller Bot

**What it does:** Lets you control smart home devices through Telegram messages — lights, thermostat, cameras, robot vacuum, and anything else connected to your Home Assistant or similar hub.

**Concrete use case:** You left the house and suddenly wonder if you turned off the living room lights. Instead of driving back, you send "turn off living room lights" to the bot and get a confirmation message. On winter evenings, you message "set bedroom temperature to 72" twenty minutes before you get home so the room is warm when you arrive. You can also type "front door camera snapshot" and get a live photo from your security camera delivered right into the chat.

**Configuration example:**

\`\`\`yaml
skills:
  - smart-home:
      platform: home-assistant
      api_url: "http://your-home-assistant:8123"
      devices:
        - name: Living Room Lights
          entity_id: light.living_room
          commands: ["on", "off", "dim", "brighten"]
        - name: Thermostat
          entity_id: climate.bedroom
          commands: ["on", "off", "set temperature"]
        - name: Front Camera
          entity_id: camera.front_door
          commands: ["snapshot", "record"]
      notify: telegram
\`\`\`

Send natural language commands in the chat:
- "turn on living room lights"
- "set thermostat to 72"
- "front door camera snapshot"
- "start robot vacuum"

The bot confirms each action with a status message. Camera snapshots arrive as actual images in the chat. For sensitive operations like unlocking doors, you can enable a two-step confirmation that requires you to tap "Yes, I'm sure" before executing.

---

## The Build Process (Works for All 10 Bots)

Regardless of which bot you pick, the steps are the same:

1. **Create the bot** — Get your Token from BotFather
2. **Install OpenClaw** — \`npm install -g openclaw\`
3. **Configure the connection** — Set your Token and Chat ID
4. **Pick a skill** — Copy the configuration from the example above
5. **Start the bot** — \`openclaw start --platform telegram\`
6. **Run in background** — \`openclaw start --platform telegram --daemon\`

For 24/7 uptime, deploy to a cloud server (a $5/month VPS is more than enough) and manage the process with systemd or pm2.

## FAQ

### Which bot is the best starting point for a complete beginner?

The daily weather bot and the reminder bot have the simplest configurations and fewest external dependencies. You can have either one running in about 10 minutes. If you want something slightly more interesting, the RSS news reader is a good next step — just plug in feed URLs and you are done.

### Can a single bot handle multiple functions at once?

Yes. OpenClaw supports stacking multiple skills on the same bot. You could have one bot that does weather reports, reminders, and translations all at once. Users trigger different functions through different command prefixes (\`/weather\`, \`/remind\`, \`/translate\`). There is no need to create separate bots for each task unless you prefer the separation for organizational reasons.

### Do any of these bots cost money to run?

Telegram bots themselves are completely free — no per-message fees, no API charges from Telegram's side. OpenClaw's core functionality is free as well. The costs that might come up are third-party APIs (translation services, weather data providers) and server hosting. Most APIs have generous free tiers that cover personal use without spending a cent. A basic cloud server for 24/7 operation runs about $5 per month.

### How do I keep my bot secure?

A few non-negotiable practices: never commit your Bot Token to a git repository (use environment variables or a \`.env\` file that is in your \`.gitignore\`). Set \`allowed_users\` in your OpenClaw config to restrict who can interact with the bot. Rotate your Token periodically through BotFather's \`/revoke\` command. For high-stakes bots like the smart home controller, always enable two-step confirmation on destructive actions like unlocking doors or disabling alarms.

---

**Related reading:**
- [How to Create a Telegram Bot (Step-by-Step)](/blog/how-to-create-telegram-bot)
- [Telegram Automation Guide](/blog/telegram-automation-guide)
- [AI Agent Guide](/blog/ai-agent-guide)`,
    author: "OpenClaw 101",
    date: "2026-04-03",
    category: "实战案例",
    categoryEn: "Examples",
    tags: ["Telegram", "Bot", "Examples", "案例", "AI", "Automation", "自动化", "No-Code", "Beginner"],
    readingTime: 18,
    image: "/og-image.png"
  },
  {
    id: 23,
    slug: "telegram-automation-guide",
    title: "Telegram 自动化完整指南：无需编程，打造 24/7 运转的智能 Bot",
    titleEn: "Telegram Automation Guide (Build Powerful Bots Without Coding)",
    excerpt: "Telegram 自动化让你的 Bot 从简单程序变成全天候运转的智能系统。本指南教你如何自动化任务、连接工具、构建 AI 工作流——新手也能轻松上手。",
    excerptEn: "Turn simple Telegram bots into powerful 24/7 automation systems. Learn how to automate tasks, connect tools, and build AI workflows — no coding required.",
    content: `Telegram 自动化能让你的 Bot 从简单程序变成全天候运转的智能系统。借助 OpenClaw，你可以在不写代码的情况下构建复杂的自动化工作流——定时发送消息、自动回复、内容聚合、文件处理、监控告警、群组管理，全部一站搞定。

本指南将详细介绍 6 种实用的自动化工作流，每一种都附带具体的配置步骤和代码示例，帮助你从零搭建 24/7 运转的 Telegram 自动化系统。

## 什么是 Telegram 自动化？

Telegram 自动化是通过 Bot 和工具链实现任务自动执行的过程。传统方式需要你手动调用 API、编写逻辑、部署服务器。而 OpenClaw 将这些复杂性封装起来，让你通过简单的 CLI 命令和配置文件就能完成：

- **自动执行重复任务**——不再手动发送例行消息
- **基于事件或时间触发动作**——RSS 更新、服务器宕机、定时报表
- **对接 API 和第三方服务**——GitHub、Notion、Slack、数据库等
- **无需人工干预运行完整工作流**——Bot 7x24 小时值班

核心架构非常简单：

\`\`\`
触发器 → 处理逻辑 → 动作
\`\`\`

下面我们逐一拆解 6 种最实用的自动化工作流。

---

## 工作流 1：定时消息发送

**场景：** 每天固定时间向团队群组发送站会提醒、每周五发送周报模板、每月初发送账单提醒。

**配置步骤：**

\`\`\`bash
# 安装并初始化
npm install -g openclaw
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw config set telegram.chat_id YOUR_CHAT_ID

# 设置每日定时消息
openclaw schedule create --name "daily-standup" \\
  --cron "0 9 * * 1-5" \\
  --action "telegram.send" \\
  --message "早上好！请在 30 分钟内完成今日站会：\\n1. 昨天完成了什么\\n2. 今天计划做什么\\n3. 有什么阻碍"

# 设置每周五周报提醒
openclaw schedule create --name "weekly-report" \\
  --cron "0 16 * * 5" \\
  --action "telegram.send" \\
  --message "本周周报提醒：请在今天 18:00 前提交周报。模板链接：https://your-wiki.com/template"
\`\`\`

**进阶用法：** 你可以在消息中使用变量模板，动态插入日期、天气、待办事项等信息：

\`\`\`yaml
schedules:
  - name: morning-briefing
    cron: "0 8 * * *"
    action: telegram.send
    template: |
      早安！今天是 {{date}}，{{city}} 天气 {{weather}}。
      你有 {{todo_count}} 项待办事项。
      第一件事：{{first_todo}}
\`\`\`

---

## 工作流 2：自动回复

**场景：** Bot 根据用户发送的关键词或命令自动回复相应内容，比如 FAQ 机器人、客服 Bot、入群欢迎消息。

**配置步骤：**

\`\`\`yaml
# openclaw.yaml
auto_reply:
  rules:
    - trigger: "/start"
      response: "欢迎使用我们的服务！发送 /help 查看所有可用命令。"
    - trigger: "/help"
      response: |
        可用命令：
        /status — 查看服务状态
        /price — 查询最新价格
        /contact — 联系客服
    - trigger:
        contains: ["价格", "多少钱", "费用"]
      response: "我们的基础套餐 99 元/月，专业套餐 299 元/月。详情：https://your-site.com/pricing"
    - trigger:
        regex: "^订单[0-9]+"
      response: "正在查询您的订单，请稍候..."
      action: "lookup_order"
\`\`\`

\`\`\`bash
# 启用自动回复
openclaw config set telegram.auto_reply true
openclaw start --platform telegram
\`\`\`

Bot 支持精确匹配、包含匹配和正则匹配三种模式。你还可以为每条规则绑定后续动作，比如查询数据库、调用 API。

---

## 工作流 3：内容聚合

**场景：** 自动从多个来源收集信息——RSS 订阅、网页监控、API 数据——整合后推送到 Telegram。

**配置步骤：**

\`\`\`yaml
# openclaw.yaml
aggregation:
  sources:
    - type: rss
      url: "https://techcrunch.com/feed"
      label: "TechCrunch"
    - type: rss
      url: "https://hnrss.org/frontpage"
      label: "Hacker News"
    - type: web_monitor
      url: "https://your-competitor.com/pricing"
      selector: ".price-value"
      label: "竞品价格"
    - type: api
      url: "https://api.coindesk.com/v1/bpi/currentprice.json"
      extract: "bpi.USD.rate"
      label: "BTC 价格"
  schedule: "0 */2 * * *"  # 每 2 小时聚合一次
  output:
    platform: telegram
    format: digest  # 汇总成一条消息
    max_items_per_source: 3
\`\`\`

\`\`\`bash
# 启动内容聚合
openclaw aggregate start
\`\`\`

聚合模式支持去重（相同链接不重复推送）、AI 摘要（自动生成一句话总结）和重要性排序。

---

## 工作流 4：文件处理

**场景：** 用户发送文件到 Bot，自动进行处理——格式转换、数据提取、内容分析。

**配置步骤：**

\`\`\`yaml
# openclaw.yaml
file_processing:
  rules:
    - file_type: ["pdf"]
      action: extract_text
      response: "以下是 PDF 内容摘要：\\n{{summary}}"
    - file_type: ["csv", "xlsx"]
      action: analyze_data
      response: "数据分析完成：\\n共 {{row_count}} 行数据\\n{{analysis}}"
    - file_type: ["jpg", "png"]
      action: ocr
      response: "图片文字识别结果：\\n{{text}}"
    - file_type: ["mp3", "ogg"]
      action: transcribe
      response: "语音转文字：\\n{{transcript}}"
\`\`\`

\`\`\`bash
# 启用文件处理
openclaw config set telegram.file_processing true
openclaw start --platform telegram
\`\`\`

用户只需把文件发给 Bot，系统会自动识别类型并执行对应的处理逻辑。处理完成后结果直接以消息形式返回。

---

## 工作流 5：监控告警

**场景：** 监控服务器状态、网站可用性、API 响应时间、业务指标，异常时立即通过 Telegram 告警。

**配置步骤：**

\`\`\`yaml
# openclaw.yaml
monitoring:
  checks:
    - name: "网站可用性"
      type: http
      url: "https://your-site.com"
      interval: 60  # 每 60 秒检查一次
      timeout: 10
      alert_on:
        - status_code: "!= 200"
        - response_time: "> 3000ms"
    - name: "API 健康检查"
      type: http
      url: "https://api.your-site.com/health"
      interval: 120
      alert_on:
        - status_code: "!= 200"
    - name: "磁盘空间"
      type: system
      metric: disk_usage
      threshold: 85  # 超过 85% 告警
      interval: 300
    - name: "CPU 使用率"
      type: system
      metric: cpu_usage
      threshold: 90
      interval: 60
  notification:
    platform: telegram
    format: |
      ⚠️ 告警：{{check_name}}
      状态：{{status}}
      详情：{{details}}
      时间：{{timestamp}}
    cooldown: 300  # 同一告警 5 分钟内不重复发送
\`\`\`

\`\`\`bash
# 启动监控
openclaw monitor start
\`\`\`

告警支持冷却机制（避免短时间内重复告警轰炸）、升级策略（持续异常自动升级通知级别）和恢复通知（问题修复后发送恢复消息）。

---

## 工作流 6：群组管理

**场景：** 自动化管理 Telegram 群组——新成员欢迎、违规检测、关键词过滤、统计报表。

**配置步骤：**

\`\`\`yaml
# openclaw.yaml
group_management:
  welcome:
    enabled: true
    message: |
      欢迎 {{username}} 加入！
      请先阅读群规：/rules
      自我介绍后即可正常发言。
    auto_delete: 300  # 欢迎消息 5 分钟后自动删除

  moderation:
    spam_filter: true
    link_filter:
      enabled: true
      whitelist: ["github.com", "your-site.com"]
    keyword_filter:
      banned_words: ["广告", "加微信", "代购"]
      action: delete_and_warn
    flood_control:
      max_messages: 5
      time_window: 10  # 10 秒内超过 5 条消息视为刷屏
      action: mute_30m

  statistics:
    enabled: true
    schedule: "0 22 * * 0"  # 每周日晚 10 点
    report: |
      本周群组活跃报告：
      总消息数：{{total_messages}}
      活跃成员：{{active_members}}
      最活跃：{{top_member}}
\`\`\`

\`\`\`bash
# 启用群组管理
openclaw config set telegram.group_mode true
openclaw start --platform telegram
\`\`\`

---

## 自动化最佳实践

### 速率限制

Telegram 对消息发送有严格限制：

- **单聊**：每秒最多 1 条消息
- **群组**：每分钟最多 20 条消息
- **全局**：每秒最多 30 条消息

OpenClaw 内置了自动限速，但如果你通过自定义脚本发送消息，务必自行控制频率。超出限制会收到 429 错误，严重时 Bot 可能被临时封禁。

### 错误处理

\`\`\`yaml
# openclaw.yaml
error_handling:
  retry:
    max_attempts: 3
    backoff: exponential  # 1s, 2s, 4s
  fallback:
    action: "log_and_notify_admin"
    admin_chat_id: YOUR_ADMIN_CHAT_ID
  on_crash:
    auto_restart: true
    notify: true
\`\`\`

关键原则：所有自动化流程都必须有错误处理。没有错误处理的 Bot 就是一颗定时炸弹——它会在某个凌晨三点悄悄挂掉，你第二天才发现。

### 日志记录

\`\`\`bash
# 启用详细日志
openclaw config set logging.level debug
openclaw config set logging.file /var/log/openclaw/telegram.log

# 查看实时日志
openclaw logs --follow --platform telegram
\`\`\`

建议在生产环境中至少保留 7 天的日志，用于排查问题和审计。

### 安全建议

- **永远不要把 Token 硬编码**——使用环境变量或 \`.env\` 文件
- **限制允许使用的用户**——通过 \`allowed_users\` 配置白名单
- **定期轮换 Token**——在 BotFather 中使用 \`/revoke\` 生成新 Token
- **敏感操作二次确认**——比如删除数据、执行系统命令等

---

## 常见问题

### OpenClaw 的 Telegram 自动化能处理多复杂的工作流？

非常复杂的都能处理。你可以串联多个触发器和动作，构建多步骤、多条件的工作流。比如"当 GitHub 有新 PR → AI 自动审查代码 → 将审查结果发送到 Telegram 群组 → 如果有严重问题则 @相关负责人"。每个步骤都可以有条件分支和错误处理。

### 自动化流程会因为 Telegram 的速率限制而失败吗？

OpenClaw 内置了智能限速和自动重试机制，会自动遵守 Telegram 的速率限制。如果消息量确实很大（比如一次性向上千个用户推送），系统会自动排队，按照 Telegram 允许的最大速率逐步发送，确保不会触发 429 错误。

### 可以同时运行多少个自动化工作流？

没有硬性限制。OpenClaw 使用异步架构，你可以同时运行定时消息、自动回复、监控告警等多个工作流，它们互不干扰。实际上限取决于你的服务器资源和 Telegram 的全局速率限制（每秒 30 条消息）。

### 自动化流程出错时如何排查？

首先检查日志——\`openclaw logs --platform telegram\` 会显示详细的执行记录和错误信息。其次确认网络连接和 Token 是否有效。OpenClaw 还支持配置错误通知，当自动化流程异常时自动发送告警到管理员的 Telegram。

---

**下一步**：
- [10 个 Telegram Bot 实战案例](/blog/telegram-bot-examples)（找灵感，直接复用）
- [如何创建 Telegram Bot](/blog/how-to-create-telegram-bot)（从这里开始动手）
- [AI Agent 入门指南](/blog/ai-agent-guide)`,
    contentEn: `Telegram automation means using bots and toolchains to execute tasks without manual intervention. Instead of writing code from scratch, calling APIs by hand, and managing servers yourself, OpenClaw wraps that complexity into simple CLI commands and configuration files. The result is a bot that runs 24/7, handles repetitive work, reacts to events, and connects to external services on your behalf.

This guide walks through six practical automation workflows you can set up today. Each one includes step-by-step configuration, code examples, and tips for production use.

---

## What Telegram Automation Means with OpenClaw

At its core, every Telegram automation follows the same pattern:

\`\`\`
Trigger --> Process --> Action
\`\`\`

A trigger is the event that kicks things off: a cron schedule, an incoming message, an RSS update, a server going down. The process is the logic in the middle: filtering, transforming, summarizing with AI, looking up data. The action is the output: sending a Telegram message, uploading a file, updating a database.

OpenClaw lets you define all three stages through YAML configuration and CLI commands. You do not need to write application code, set up a web server, or manage message queues. The platform handles polling, webhooks, rate limiting, retries, and process management internally.

---

## Workflow 1: Scheduled Messages

**Use case:** Send standup reminders to a team group every weekday morning, weekly report templates on Fridays, or billing reminders on the first of each month.

**Setup:**

\`\`\`bash
# Install and initialize
npm install -g openclaw
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw config set telegram.chat_id YOUR_CHAT_ID

# Create a daily standup reminder (weekdays at 9 AM)
openclaw schedule create --name "daily-standup" \\
  --cron "0 9 * * 1-5" \\
  --action "telegram.send" \\
  --message "Good morning! Please post your standup within 30 minutes:\\n1. What did you finish yesterday?\\n2. What are you working on today?\\n3. Any blockers?"

# Create a weekly report reminder (Fridays at 4 PM)
openclaw schedule create --name "weekly-report" \\
  --cron "0 16 * * 5" \\
  --action "telegram.send" \\
  --message "Weekly report reminder: please submit by 6 PM today. Template: https://your-wiki.com/template"
\`\`\`

**Advanced usage with templates:**

\`\`\`yaml
schedules:
  - name: morning-briefing
    cron: "0 8 * * *"
    action: telegram.send
    template: |
      Good morning! Today is {{date}}, weather in {{city}}: {{weather}}.
      You have {{todo_count}} pending tasks.
      First up: {{first_todo}}
\`\`\`

Template variables are resolved at send time, so each message contains fresh data.

---

## Workflow 2: Auto-Replies

**Use case:** Build a FAQ bot, customer support responder, or onboarding assistant that answers common questions instantly.

\`\`\`yaml
# openclaw.yaml
auto_reply:
  rules:
    - trigger: "/start"
      response: "Welcome! Send /help to see all available commands."
    - trigger: "/help"
      response: |
        Available commands:
        /status - Check service status
        /price - Get current pricing
        /contact - Reach support
    - trigger:
        contains: ["pricing", "how much", "cost"]
      response: "Our starter plan is $9/month, pro plan is $29/month. Details: https://your-site.com/pricing"
    - trigger:
        regex: "^order[0-9]+"
      response: "Looking up your order, please wait..."
      action: "lookup_order"
\`\`\`

\`\`\`bash
# Enable auto-replies and start
openclaw config set telegram.auto_reply true
openclaw start --platform telegram
\`\`\`

Three matching modes are supported: exact match, substring contains, and regex. Each rule can optionally trigger a follow-up action like a database lookup or an API call, with the result sent back to the user.

---

## Workflow 3: Content Aggregation

**Use case:** Pull content from multiple sources (RSS feeds, web pages, APIs) and push a consolidated digest to Telegram on a schedule.

\`\`\`yaml
# openclaw.yaml
aggregation:
  sources:
    - type: rss
      url: "https://techcrunch.com/feed"
      label: "TechCrunch"
    - type: rss
      url: "https://hnrss.org/frontpage"
      label: "Hacker News"
    - type: web_monitor
      url: "https://competitor.com/pricing"
      selector: ".price-value"
      label: "Competitor Price"
    - type: api
      url: "https://api.coindesk.com/v1/bpi/currentprice.json"
      extract: "bpi.USD.rate"
      label: "BTC Price"
  schedule: "0 */2 * * *"
  output:
    platform: telegram
    format: digest
    max_items_per_source: 3
\`\`\`

\`\`\`bash
openclaw aggregate start
\`\`\`

The aggregator deduplicates by URL so the same article never appears twice. You can enable AI summaries to condense long articles into one-line descriptions, and set different check intervals per source.

---

## Workflow 4: File Processing

**Use case:** Users send files to the bot and get automatic processing: PDF text extraction, CSV analysis, image OCR, or audio transcription.

\`\`\`yaml
# openclaw.yaml
file_processing:
  rules:
    - file_type: ["pdf"]
      action: extract_text
      response: "PDF summary:\\n{{summary}}"
    - file_type: ["csv", "xlsx"]
      action: analyze_data
      response: "Analysis complete:\\n{{row_count}} rows\\n{{analysis}}"
    - file_type: ["jpg", "png"]
      action: ocr
      response: "Extracted text:\\n{{text}}"
    - file_type: ["mp3", "ogg"]
      action: transcribe
      response: "Transcription:\\n{{transcript}}"
\`\`\`

\`\`\`bash
openclaw config set telegram.file_processing true
openclaw start --platform telegram
\`\`\`

The bot detects file type automatically when a user sends an attachment. Processing happens server-side, and the result is delivered as a text message or file attachment depending on the output size.

---

## Workflow 5: Monitoring Alerts

**Use case:** Watch server health, website uptime, API response times, or business metrics. Get instant Telegram alerts when something goes wrong.

\`\`\`yaml
# openclaw.yaml
monitoring:
  checks:
    - name: "Website uptime"
      type: http
      url: "https://your-site.com"
      interval: 60
      timeout: 10
      alert_on:
        - status_code: "!= 200"
        - response_time: "> 3000ms"
    - name: "API health"
      type: http
      url: "https://api.your-site.com/health"
      interval: 120
      alert_on:
        - status_code: "!= 200"
    - name: "Disk usage"
      type: system
      metric: disk_usage
      threshold: 85
      interval: 300
    - name: "CPU usage"
      type: system
      metric: cpu_usage
      threshold: 90
      interval: 60
  notification:
    platform: telegram
    format: |
      Alert: {{check_name}}
      Status: {{status}}
      Details: {{details}}
      Time: {{timestamp}}
    cooldown: 300
\`\`\`

\`\`\`bash
openclaw monitor start
\`\`\`

The cooldown setting prevents alert fatigue by suppressing duplicate notifications for the same issue within a time window. Recovery notifications are sent automatically when the issue resolves.

---

## Workflow 6: Group Management

**Use case:** Automate Telegram group administration: welcome new members, filter spam, enforce rules, and generate activity reports.

\`\`\`yaml
# openclaw.yaml
group_management:
  welcome:
    enabled: true
    message: |
      Welcome {{username}}!
      Please read the group rules: /rules
      Introduce yourself to get started.
    auto_delete: 300

  moderation:
    spam_filter: true
    link_filter:
      enabled: true
      whitelist: ["github.com", "your-site.com"]
    keyword_filter:
      banned_words: ["spam", "promo", "buy now"]
      action: delete_and_warn
    flood_control:
      max_messages: 5
      time_window: 10
      action: mute_30m

  statistics:
    enabled: true
    schedule: "0 22 * * 0"
    report: |
      Weekly group activity:
      Total messages: {{total_messages}}
      Active members: {{active_members}}
      Most active: {{top_member}}
\`\`\`

\`\`\`bash
openclaw config set telegram.group_mode true
openclaw start --platform telegram
\`\`\`

Flood control automatically mutes users who send too many messages in a short window. The link filter blocks all URLs except those on your whitelist, which is effective against spam bots.

---

## Best Practices for Automation

### Respect Rate Limits

Telegram enforces strict rate limits on message sending:

- **Per chat:** maximum 1 message per second
- **Per group:** maximum 20 messages per minute
- **Global:** maximum 30 messages per second across all chats

OpenClaw handles rate limiting internally with automatic queuing. If you are sending messages through custom scripts alongside OpenClaw, you need to throttle on your end as well. Exceeding limits results in 429 errors, and persistent violations can lead to temporary bans.

### Implement Error Handling

\`\`\`yaml
# openclaw.yaml
error_handling:
  retry:
    max_attempts: 3
    backoff: exponential
  fallback:
    action: "log_and_notify_admin"
    admin_chat_id: YOUR_ADMIN_CHAT_ID
  on_crash:
    auto_restart: true
    notify: true
\`\`\`

Every automation workflow must have error handling configured. A bot without error handling will silently break at 3 AM and you will not know until users complain the next day. The exponential backoff retry strategy (1s, 2s, 4s) handles transient failures gracefully.

### Set Up Logging

\`\`\`bash
# Enable verbose logging
openclaw config set logging.level debug
openclaw config set logging.file /var/log/openclaw/telegram.log

# Watch logs in real time
openclaw logs --follow --platform telegram
\`\`\`

Keep at least 7 days of logs in production for troubleshooting and auditing. Log files help you understand exactly what happened when something goes wrong, which messages were sent, and which API calls failed.

### Security Checklist

- **Never hardcode tokens** -- use environment variables or a \`.env\` file
- **Restrict allowed users** -- configure a whitelist with \`allowed_users\`
- **Rotate tokens periodically** -- use \`/revoke\` in BotFather to generate new ones
- **Require confirmation for sensitive operations** -- deleting data, running system commands

---

## FAQ

### How complex can OpenClaw automation workflows get?

Very complex. You can chain multiple triggers and actions into multi-step, multi-condition workflows. For example: "When a new GitHub PR is opened, run AI code review, send the results to a Telegram group, and mention the responsible person if critical issues are found." Each step supports conditional branching and independent error handling.

### Will my automations fail because of Telegram rate limits?

OpenClaw includes built-in intelligent rate limiting and automatic retry logic. If you need to broadcast to thousands of users at once, the system queues messages and sends them at the maximum allowed rate. You will not trigger 429 errors under normal usage.

### How many automation workflows can run simultaneously?

There is no hard limit. OpenClaw uses an async architecture, so scheduled messages, auto-replies, monitoring alerts, and content aggregation all run concurrently without interfering with each other. The practical ceiling depends on your server resources and the global Telegram rate limit of 30 messages per second.

### How do I debug a failing automation workflow?

Start with the logs: \`openclaw logs --platform telegram\` shows detailed execution records and error messages. Check that your network connection is stable and your bot token is valid. OpenClaw also supports error notifications, so you can configure it to send an alert to your admin Telegram chat whenever a workflow fails.

---

Before setting up automation, make sure you have a working bot using this [Telegram bot creation guide](/blog/how-to-create-telegram-bot).

For real-world use cases, check out these [Telegram bot examples](/blog/telegram-bot-examples).

To implement advanced automation, you may need to understand these [Telegram bot tools](/blog/best-telegram-bot-tools) first.

---

## Build Your Own Telegram Bot Today

| | |
|---|---|
| Start from scratch | [How to Create a Telegram Bot](/blog/how-to-create-telegram-bot) |
| Explore real ideas | [Telegram Bot Examples](/blog/telegram-bot-examples) |
| Go advanced | [Telegram Bot API Guide](/blog/telegram-bot-api-tutorial) |
| Choose the right stack | [Best Telegram Bot Tools](/blog/best-telegram-bot-tools) |`,
    author: "OpenClaw 101",
    date: "2026-04-03",
    category: "自动化",
    categoryEn: "Automation",
    tags: ["Telegram", "Automation", "自动化", "Bot", "Workflow", "AI", "No-Code", "工作流", "Beginner"],
    readingTime: 14,
    image: "/og-image.png"
  },
  {
    id: 24,
    slug: "telegram-bot-api-tutorial",
    title: "Telegram Bot API 完整教程：新手从零上手指南（2026）",
    titleEn: "Telegram Bot API Tutorial (Complete Guide with Examples 2026)",
    excerpt: "Telegram Bot API 是控制机器人的 HTTP 接口，让你的 Bot 能收发消息、自动化任务、对接外部服务。本文从原理到实战，手把手带你掌握核心 API 用法。",
    excerptEn: "Learn how the Telegram Bot API works with real examples — send messages, set up webhooks, and build automation workflows step by step.",
    content: `Telegram Bot API 是一套基于 HTTP 的接口，让开发者可以完整控制 Telegram Bot 的行为——发送消息、接收用户输入、处理回调、管理群组、发送文件和多媒体内容。所有操作都通过标准的 HTTP POST 请求完成，返回 JSON 格式的响应。

本教程将深入讲解 Bot API 的核心概念、关键方法、交互元素和 Webhook 配置，并展示 OpenClaw 如何简化这些操作。全文包含大量代码示例，帮你从原理到实战全面掌握。

## Telegram Bot API 基础

### API 端点结构

所有 Bot API 请求都发送到同一个基础 URL：

\`\`\`
https://api.telegram.org/bot<YOUR_TOKEN>/<METHOD_NAME>
\`\`\`

其中 \`<YOUR_TOKEN>\` 是从 BotFather 获取的令牌，\`<METHOD_NAME>\` 是你要调用的 API 方法。每个请求返回一个 JSON 对象，包含 \`ok\`（布尔值）和 \`result\`（实际数据）字段。

### 两种接收消息的方式

#### 长轮询（Polling）

你的服务器不断向 Telegram 请求新消息。实现简单，适合本地开发和调试：

\`\`\`bash
# 获取最新消息
curl "https://api.telegram.org/bot<TOKEN>/getUpdates?offset=0&limit=10"

# 使用 OpenClaw 启动长轮询模式
openclaw start --platform telegram --mode polling
\`\`\`

长轮询的优点是不需要公网服务器和 HTTPS 证书。缺点是存在延迟（取决于轮询间隔）且效率较低。

#### Webhook

Telegram 主动将消息推送到你指定的 HTTPS URL。实时性更强，生产环境推荐使用：

\`\`\`bash
# 设置 Webhook
openclaw config set telegram.webhook_url https://your-server.com/webhook
openclaw config set telegram.webhook_secret YOUR_SECRET

# 或者直接调用 API 设置
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \\
  -d "url=https://your-server.com/webhook" \\
  -d "secret_token=YOUR_SECRET"

# 验证 Webhook 状态
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
\`\`\`

Webhook 要求你的服务器有有效的 SSL 证书和公网可访问的 URL。\`secret_token\` 用于验证请求确实来自 Telegram，防止伪造。

## OpenClaw 如何简化 API 复杂性

直接使用 Bot API 意味着你需要自己处理：HTTP 请求构建、错误重试、速率限制、消息队列、Webhook 服务器搭建、SSL 证书管理、长连接维护……

OpenClaw 将这些底层细节封装成简洁的 CLI 命令。你不需要写 curl 命令或管理 HTTP 连接，只需要描述你想做什么：

\`\`\`bash
# 发送一条消息（OpenClaw 自动处理 API 调用、错误重试、速率限制）
openclaw telegram send --chat-id 12345 "你好，这是一条测试消息"

# 发送带格式的消息
openclaw telegram send --chat-id 12345 --parse-mode markdown "**粗体** 和 _斜体_ 文本"

# 发送图片
openclaw telegram send-photo --chat-id 12345 --photo ./screenshot.png --caption "今日截图"

# 发送文件
openclaw telegram send-document --chat-id 12345 --file ./report.pdf --caption "月度报表"
\`\`\`

OpenClaw 在后台自动处理 Token 管理、请求签名、错误重试（指数退避）、速率限制遵守和响应解析。

## 核心 API 方法详解

### sendMessage — 发送文字消息

最基础也最常用的方法。支持纯文本、Markdown 和 HTML 格式：

\`\`\`bash
# 纯文本
openclaw telegram send --chat-id 12345 "普通消息"

# Markdown 格式
openclaw telegram send --chat-id 12345 --parse-mode markdown "**粗体**、_斜体_、\`代码\`、[链接](https://example.com)"

# HTML 格式
openclaw telegram send --chat-id 12345 --parse-mode html "<b>粗体</b> 和 <i>斜体</i>"

# 静默发送（不触发通知提示音）
openclaw telegram send --chat-id 12345 --silent "这条不会响"
\`\`\`

关键参数：\`chat_id\`（必填）、\`text\`（必填）、\`parse_mode\`（可选：Markdown / MarkdownV2 / HTML）、\`disable_notification\`（静默发送）。

### sendPhoto — 发送图片

支持本地文件上传和 URL 两种方式：

\`\`\`bash
# 发送本地图片
openclaw telegram send-photo --chat-id 12345 --photo ./image.jpg --caption "图片说明"

# 发送网络图片
openclaw telegram send-photo --chat-id 12345 --photo "https://example.com/image.jpg"
\`\`\`

图片大小限制为 10MB。如果需要发送更大的图片，使用 \`sendDocument\` 作为文件发送。

### sendDocument — 发送文件

支持所有常见文件格式，最大 50MB：

\`\`\`bash
# 发送 PDF
openclaw telegram send-document --chat-id 12345 --file ./report.pdf --caption "2026年Q1报告"

# 发送压缩包
openclaw telegram send-document --chat-id 12345 --file ./backup.zip
\`\`\`

### editMessageText — 编辑已发送的消息

可以修改之前发送的消息内容，常用于更新状态信息：

\`\`\`bash
# 编辑消息
openclaw telegram edit --chat-id 12345 --message-id 678 "更新后的内容"

# 实际应用：发送"处理中..."，完成后更新为结果
openclaw telegram send --chat-id 12345 "正在处理您的请求..." --save-id processing
openclaw telegram edit --chat-id 12345 --message-id \$processing "处理完成！结果：xxx"
\`\`\`

### answerCallbackQuery — 回应回调按钮

当用户点击 inline keyboard 上的按钮时，Telegram 发送一个 callback query。你需要调用这个方法来回应：

\`\`\`bash
# 回应回调（通常在自动回复规则中配置）
# OpenClaw 在 auto_reply 配置中自动处理 callback
\`\`\`

OpenClaw 在配置层面自动处理 callback query 的回应，你不需要手动调用这个 API。

## 交互元素：Inline Keyboard 和 Callback 按钮

Inline keyboard 让你的 Bot 消息带有可点击的按钮，大幅提升交互体验。

### 发送带按钮的消息

\`\`\`bash
# 发送带确认/取消按钮的消息
openclaw telegram send --chat-id 12345 \\
  --keyboard '[{"text":"确认","callback":"confirm"},{"text":"取消","callback":"cancel"}]' \\
  "是否确认执行此操作？"

# 发送多行按钮
openclaw telegram send --chat-id 12345 \\
  --keyboard '[{"text":"选项A","callback":"opt_a"},{"text":"选项B","callback":"opt_b"}],[{"text":"返回主菜单","callback":"main_menu"}]' \\
  "请选择："
\`\`\`

### 处理按钮回调

\`\`\`yaml
# openclaw.yaml
callbacks:
  confirm:
    response: "操作已确认，正在执行..."
    action: "execute_task"
  cancel:
    response: "操作已取消。"
  opt_a:
    response: "你选择了选项 A"
  opt_b:
    response: "你选择了选项 B"
  main_menu:
    response: "主菜单：\\n/help - 帮助\\n/status - 状态\\n/settings - 设置"
\`\`\`

按钮回调可以触发后续动作——更新消息内容、调用外部 API、启动工作流等。

## Webhook 设置与配置

### 完整的 Webhook 配置流程

\`\`\`bash
# 1. 配置基本参数
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw config set telegram.chat_id YOUR_DEFAULT_CHAT_ID

# 2. 设置 Webhook URL 和密钥
openclaw config set telegram.webhook_url https://your-server.com/webhook
openclaw config set telegram.webhook_secret YOUR_SECRET

# 3. 配置允许的更新类型
openclaw config set telegram.allowed_updates '["message","callback_query","edited_message"]'

# 4. 启动 Webhook 模式
openclaw start --platform telegram --mode webhook

# 5. 验证配置
openclaw telegram webhook-info
\`\`\`

### Webhook 要求

- **HTTPS**：必须使用有效的 SSL 证书（Let's Encrypt 免费证书即可）
- **端口**：支持 443、80、88、8443 四个端口
- **响应时间**：必须在 60 秒内返回响应，否则 Telegram 视为超时
- **幂等性**：同一个 update 可能被发送多次，你的处理逻辑需要做去重

### 调试 Webhook

\`\`\`bash
# 查看 Webhook 状态和最近的错误
openclaw telegram webhook-info

# 临时切换到轮询模式进行调试
openclaw start --platform telegram --mode polling --debug

# 查看接收到的原始消息
openclaw logs --platform telegram --level debug
\`\`\`

## 代码示例汇总

### 完整的 Bot 配置示例

\`\`\`yaml
# openclaw.yaml - 一个功能完整的 Bot 配置
telegram:
  token: \${TELEGRAM_BOT_TOKEN}
  mode: webhook
  webhook_url: "https://your-server.com/webhook"
  webhook_secret: \${WEBHOOK_SECRET}
  allowed_updates: ["message", "callback_query"]

auto_reply:
  rules:
    - trigger: "/start"
      response: "欢迎！请选择功能："
      keyboard:
        - [{"text": "查看帮助", "callback": "help"}, {"text": "查看状态", "callback": "status"}]
    - trigger:
        contains: ["你好", "hello", "hi"]
      response: "你好！有什么可以帮助你的吗？"

callbacks:
  help:
    response: "可用命令：\\n/start - 开始\\n/status - 状态\\n/report - 报表"
    edit_original: true
  status:
    response: "系统运行正常，已运行 {{uptime}}。"
    edit_original: true
\`\`\`

## 常见问题

### Webhook 和长轮询该选哪个？

开发和调试阶段用长轮询——不需要公网服务器，设置简单。生产环境用 Webhook——实时性更强、效率更高、不浪费服务器资源持续轮询。OpenClaw 两种模式都支持，切换只需改一个配置。

### Telegram Bot API 有速率限制吗？

有。单聊每秒最多 1 条消息，群组每分钟最多 20 条，全局每秒最多 30 条。超出限制会返回 429 错误。OpenClaw 内置了自动限速和排队机制，正常使用不会触发限制。

### 如何处理 Bot API 返回的错误？

API 返回的 JSON 中 \`ok\` 字段为 \`false\` 时表示出错，\`description\` 字段包含错误描述。常见错误包括：400（参数错误）、401（Token 无效）、403（Bot 被拉黑）、429（超出速率限制）。OpenClaw 自动处理重试和错误日志记录。

### 不懂编程可以使用 Bot API 吗？

可以。OpenClaw 把所有 API 操作封装成了 CLI 命令和 YAML 配置，你不需要编写任何代码就能使用 Bot API 的全部功能——发送消息、接收回调、配置 Webhook、设置自动回复等。

---

**下一步**：
- [如何创建 Telegram Bot](/blog/how-to-create-telegram-bot)
- [10 个 Telegram Bot 实战案例](/blog/telegram-bot-examples)
- [Telegram 自动化完整指南](/blog/telegram-automation-guide)`,
    contentEn: `The Telegram Bot API is an HTTP-based interface that gives developers full control over Telegram bots. Every operation -- sending messages, receiving user input, handling button callbacks, managing groups, sending files and media -- happens through standard HTTP POST requests that return JSON responses.

This tutorial covers the core concepts of the Bot API, walks through every key method with code examples, explains interactive elements like inline keyboards, and shows you how to configure webhooks for production. It also demonstrates how OpenClaw abstracts away the low-level API complexity so you can focus on what your bot actually does.

---

## Telegram Bot API Basics

### HTTP Endpoints

Every Bot API request targets the same base URL:

\`\`\`
https://api.telegram.org/bot<YOUR_TOKEN>/<METHOD_NAME>
\`\`\`

Replace \`<YOUR_TOKEN>\` with the token you got from BotFather and \`<METHOD_NAME>\` with the API method you want to call. Every response is a JSON object with an \`ok\` field (boolean) and a \`result\` field (the actual data). When something goes wrong, \`ok\` is \`false\` and a \`description\` field explains what happened.

### Webhooks vs. Polling

There are two ways your bot can receive messages from users.

#### Long Polling

Your server repeatedly asks Telegram "any new messages?" in a loop. Simple to implement and great for local development:

\`\`\`bash
# Fetch latest messages via API
curl "https://api.telegram.org/bot<TOKEN>/getUpdates?offset=0&limit=10"

# Start polling mode with OpenClaw
openclaw start --platform telegram --mode polling
\`\`\`

Polling does not require a public server or SSL certificate. The downside is latency (depends on your polling interval) and wasted resources from constant requests even when there are no new messages.

#### Webhooks

Telegram pushes new messages to an HTTPS URL you specify. Real-time, efficient, and the recommended approach for production:

\`\`\`bash
# Set up webhook with OpenClaw
openclaw config set telegram.webhook_url https://your-server.com/webhook
openclaw config set telegram.webhook_secret YOUR_SECRET

# Or call the API directly
curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \\
  -d "url=https://your-server.com/webhook" \\
  -d "secret_token=YOUR_SECRET"

# Verify webhook status
curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
\`\`\`

Webhooks require a valid SSL certificate and a publicly accessible URL. The \`secret_token\` parameter lets you verify that incoming requests genuinely come from Telegram and not from someone spoofing your endpoint.

---

## How OpenClaw Abstracts the API Complexity

Working with the Bot API directly means you handle HTTP request construction, error retries with backoff, rate limit compliance, message queuing, webhook server setup, SSL certificate management, and long-lived connection maintenance yourself.

OpenClaw wraps all of that into clean CLI commands. Instead of writing curl requests and parsing JSON, you describe what you want:

\`\`\`bash
# Send a message (OpenClaw handles the API call, retries, rate limiting)
openclaw telegram send --chat-id 12345 "Hello, this is a test message"

# Send with formatting
openclaw telegram send --chat-id 12345 --parse-mode markdown "**Bold** and _italic_ text"

# Send a photo with caption
openclaw telegram send-photo --chat-id 12345 --photo ./screenshot.png --caption "Today's screenshot"

# Send a document
openclaw telegram send-document --chat-id 12345 --file ./report.pdf --caption "Monthly report"
\`\`\`

Behind the scenes, OpenClaw manages token handling, request signing, exponential backoff retries, rate limit compliance, and response parsing. You get the results without touching the HTTP layer.

---

## Key API Methods

### sendMessage -- Send Text Messages

The most fundamental method. Supports plain text, Markdown, and HTML formatting:

\`\`\`bash
# Plain text
openclaw telegram send --chat-id 12345 "A simple message"

# Markdown formatting
openclaw telegram send --chat-id 12345 --parse-mode markdown "**bold**, _italic_, \\\`code\\\`, [link](https://example.com)"

# HTML formatting
openclaw telegram send --chat-id 12345 --parse-mode html "<b>bold</b> and <i>italic</i>"

# Silent send (no notification sound)
openclaw telegram send --chat-id 12345 --silent "This won't buzz"
\`\`\`

Key parameters: \`chat_id\` (required), \`text\` (required), \`parse_mode\` (optional: Markdown, MarkdownV2, or HTML), \`disable_notification\` (silent send).

### sendPhoto -- Send Images

Two approaches: upload a local file or pass a URL:

\`\`\`bash
# Local file
openclaw telegram send-photo --chat-id 12345 --photo ./image.jpg --caption "Photo caption here"

# Remote URL
openclaw telegram send-photo --chat-id 12345 --photo "https://example.com/image.jpg"
\`\`\`

Photos are limited to 10MB. For larger images, use \`sendDocument\` to send them as file attachments instead.

### sendDocument -- Send Files

Supports all common file formats, up to 50MB:

\`\`\`bash
# Send a PDF report
openclaw telegram send-document --chat-id 12345 --file ./report.pdf --caption "Q1 2026 Report"

# Send a zip archive
openclaw telegram send-document --chat-id 12345 --file ./backup.zip
\`\`\`

### editMessageText -- Edit Sent Messages

Modify the content of a message your bot already sent. Useful for updating status messages or showing progress:

\`\`\`bash
# Edit an existing message
openclaw telegram edit --chat-id 12345 --message-id 678 "Updated content here"

# Practical pattern: send "Processing..." then update with results
openclaw telegram send --chat-id 12345 "Processing your request..." --save-id processing
openclaw telegram edit --chat-id 12345 --message-id \$processing "Done! Result: xxx"
\`\`\`

### answerCallbackQuery -- Respond to Button Clicks

When a user taps a button on an inline keyboard, Telegram sends a callback query to your bot. You must acknowledge it with this method, or the user sees a loading spinner that never goes away. OpenClaw handles callback acknowledgment automatically when you define callback handlers in your configuration.

---

## Interactive Elements: Inline Keyboards and Callback Buttons

Inline keyboards attach clickable buttons directly to messages, which dramatically improves user interaction compared to text-only commands.

### Sending Messages with Buttons

\`\`\`bash
# Confirm/cancel buttons
openclaw telegram send --chat-id 12345 \\
  --keyboard '[{"text":"Yes","callback":"confirm"},{"text":"No","callback":"cancel"}]' \\
  "Do you confirm this action?"

# Multiple rows of buttons
openclaw telegram send --chat-id 12345 \\
  --keyboard '[{"text":"Option A","callback":"opt_a"},{"text":"Option B","callback":"opt_b"}],[{"text":"Back to menu","callback":"main_menu"}]' \\
  "Please choose:"
\`\`\`

### Handling Callbacks

\`\`\`yaml
# openclaw.yaml
callbacks:
  confirm:
    response: "Confirmed. Executing now..."
    action: "execute_task"
  cancel:
    response: "Cancelled."
  opt_a:
    response: "You chose Option A"
  opt_b:
    response: "You chose Option B"
  main_menu:
    response: "Main menu:\\n/help - Help\\n/status - Status\\n/settings - Settings"
\`\`\`

Callbacks can trigger follow-up actions: update the original message, call an external API, start an automation workflow, or chain into another set of buttons for multi-step interactions.

---

## Webhook Setup and Configuration

### Complete Webhook Configuration

\`\`\`bash
# 1. Set basic parameters
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw config set telegram.chat_id YOUR_DEFAULT_CHAT_ID

# 2. Configure webhook URL and secret
openclaw config set telegram.webhook_url https://your-server.com/webhook
openclaw config set telegram.webhook_secret YOUR_SECRET

# 3. Specify which update types to receive
openclaw config set telegram.allowed_updates '["message","callback_query","edited_message"]'

# 4. Start in webhook mode
openclaw start --platform telegram --mode webhook

# 5. Verify everything is working
openclaw telegram webhook-info
\`\`\`

### Webhook Requirements

- **HTTPS is mandatory.** You need a valid SSL certificate. A free Let's Encrypt certificate works fine.
- **Supported ports:** 443, 80, 88, or 8443.
- **Response timeout:** Your server must respond within 60 seconds or Telegram treats it as a failure.
- **Idempotency:** The same update may be delivered more than once. Your processing logic should handle deduplication.

### Debugging Webhooks

\`\`\`bash
# Check webhook status and recent errors
openclaw telegram webhook-info

# Temporarily switch to polling for debugging
openclaw start --platform telegram --mode polling --debug

# View raw incoming messages
openclaw logs --platform telegram --level debug
\`\`\`

If your webhook keeps failing, the most common causes are: expired SSL certificate, firewall blocking Telegram's IP ranges, the endpoint returning a non-200 status code, or the response taking longer than 60 seconds.

---

## Putting It All Together

Here is a complete bot configuration that combines auto-replies, inline keyboards, and callback handling:

\`\`\`yaml
# openclaw.yaml
telegram:
  token: \${TELEGRAM_BOT_TOKEN}
  mode: webhook
  webhook_url: "https://your-server.com/webhook"
  webhook_secret: \${WEBHOOK_SECRET}
  allowed_updates: ["message", "callback_query"]

auto_reply:
  rules:
    - trigger: "/start"
      response: "Welcome! Choose a feature:"
      keyboard:
        - [{"text": "View help", "callback": "help"}, {"text": "Check status", "callback": "status"}]
    - trigger:
        contains: ["hello", "hi", "hey"]
      response: "Hello! How can I help you?"

callbacks:
  help:
    response: "Available commands:\\n/start - Start\\n/status - Status\\n/report - Report"
    edit_original: true
  status:
    response: "System running normally. Uptime: {{uptime}}."
    edit_original: true
\`\`\`

This configuration gives you a bot that greets users with an interactive button menu, responds to casual greetings, and updates messages in place when buttons are clicked. No application code needed.

---

## FAQ

### Should I use webhooks or long polling?

Use long polling during development and debugging -- no public server needed, and setup is instant. Switch to webhooks for production -- they are real-time, more efficient, and do not waste resources polling when there are no new messages. OpenClaw supports both modes, and switching requires changing a single config value.

### Does Telegram Bot API have rate limits?

Yes. Per-chat limit is 1 message per second. Per-group limit is 20 messages per minute. Global limit is 30 messages per second across all chats. Exceeding these returns a 429 error. OpenClaw includes automatic rate limiting and queuing, so you will not hit these limits under normal usage.

### How do I handle errors from the Bot API?

When the API returns \`ok: false\`, the \`description\` field explains what went wrong. Common error codes: 400 (bad request / invalid parameters), 401 (invalid token), 403 (bot was blocked by the user), 429 (rate limit exceeded). OpenClaw automatically retries transient errors with exponential backoff and logs all failures for debugging.

### Can I use the Bot API without writing code?

Yes. OpenClaw wraps every API operation into CLI commands and YAML configuration. You can send messages, receive callbacks, configure webhooks, set up auto-replies, and build interactive keyboard menus without writing a single line of application code.

---

If you are new to Telegram bots, start with this [Telegram bot creation guide](/blog/how-to-create-telegram-bot) before diving into the API.

For practical use cases, explore these [Telegram bot examples](/blog/telegram-bot-examples).

To speed up development, check out [tools that handle the API layer for you](/blog/best-telegram-bot-tools).

---

## Build Your Own Telegram Bot Today

| | |
|---|---|
| Start from scratch | [How to Create a Telegram Bot](/blog/how-to-create-telegram-bot) |
| Explore real ideas | [Telegram Bot Examples](/blog/telegram-bot-examples) |
| Automate everything | [Telegram Automation Guide](/blog/telegram-automation-guide) |
| Choose the right stack | [Best Telegram Bot Tools](/blog/best-telegram-bot-tools) |`,
    author: "OpenClaw 101",
    date: "2026-04-03",
    category: "教程",
    categoryEn: "Tutorial",
    tags: ["Telegram", "Bot API", "API", "Tutorial", "教程", "Webhook", "Beginner", "自动化"],
    readingTime: 14,
    image: "/og-image.png"
  },
  {
    id: 25,
    slug: "best-telegram-bot-tools",
    title: "10 款最佳 Telegram Bot 工具（2026 年完整对比指南）",
    titleEn: "10 Best Telegram Bot Tools in 2026 (Complete Comparison Guide)",
    excerpt: "想找最好用的 Telegram Bot 搭建工具？本文深度对比 10 款主流工具——OpenClaw、python-telegram-bot、Telegraf.js、Aiogram、Botpress、n8n、Make、Rasa、BotKit、Telethon——帮你快速选出最适合自己的那一个。",
    excerptEn: "Compare 10 top Telegram bot tools in depth — OpenClaw, python-telegram-bot, Telegraf.js, Aiogram, Botpress, n8n, Make, Rasa, BotKit, and Telethon. Find the right tool for your project with our detailed comparison.",
    content: `想找最好用的 Telegram Bot 搭建工具？

2026 年，Telegram Bot 生态已经非常成熟。从无代码平台到专业开发框架，从 AI 驱动方案到自动化工作流引擎，开发者和非技术用户都有大量选择。但选择太多反而容易迷茫——每个工具都声称自己是"最好的"，实际体验却千差万别。

本文对比 **10 款主流 Telegram Bot 工具**——覆盖无代码平台、开发者框架、AI 驱动方案和自动化引擎——帮你根据自己的技术背景和项目需求，快速选出最适合的那一个。

## 2026 年 Telegram Bot 生态概览

Telegram 在 2026 年拥有超过 9.5 亿月活用户，Bot API 已迭代到 7.x 版本，支持 Mini App、内联支付、Webhook 2.0、频道管理等高级功能。围绕 Telegram Bot 的工具生态也随之爆发：

- **AI 原生工具**（如 OpenClaw、Botpress）让非技术用户也能构建智能对话体验
- **传统开发框架**（如 python-telegram-bot、Telegraf.js、Aiogram）依然是开发者的首选
- **自动化平台**（如 n8n、Make）让 Bot 成为更大工作流中的一环
- **对话式 AI 框架**（如 Rasa）适合需要深度 NLU 的企业场景
- **底层协议库**（如 Telethon）为高级用户提供完整的 Telegram 客户端能力

下面我们逐一分析这 10 款工具。

## 快速对比表

| 工具 | 语言/平台 | 开源 | 难度 | AI 支持 | 最适合 |
|------|----------|------|------|---------|--------|
| OpenClaw | Node.js (CLI) | ✅ 是 | ⭐ 简单 | ✅ 内置 | AI 自动化、无代码用户 |
| python-telegram-bot | Python | ✅ 是 | ⭐⭐⭐ 中等 | ❌ 无 | Python 开发者 |
| Telegraf.js | Node.js | ✅ 是 | ⭐⭐⭐ 中等 | ❌ 无 | Node.js 开发者 |
| Aiogram | Python (asyncio) | ✅ 是 | ⭐⭐⭐ 中等 | ❌ 无 | 高性能异步 Bot |
| Botpress | TypeScript | ✅ 是 | ⭐⭐⭐⭐ 较难 | ✅ 内置 | 企业级 AI Bot |
| n8n | Node.js (可视化) | ✅ 是 | ⭐⭐ 简单 | ✅ 有 | 自动化工作流 |
| Make (Integromat) | SaaS | ❌ 否 | ⭐ 简单 | ⚠️ 有限 | 快速集成 |
| Rasa | Python | ✅ 是 | ⭐⭐⭐⭐⭐ 困难 | ✅ 内置 NLU | 企业对话 AI |
| BotKit | Node.js | ✅ 是 | ⭐⭐⭐ 中等 | ❌ 无 | 多平台 Bot |
| Telethon | Python | ✅ 是 | ⭐⭐⭐⭐ 较难 | ❌ 无 | 高级用户/自动化脚本 |

## 1. OpenClaw（最佳 AI 自动化工具）

**是什么：** AI 原生的智能体平台，通过 CLI 和 YAML 配置即可构建多平台 Bot，内置 LLM 集成。

**优点：**
- 无代码工作流构建器，YAML 配置即可完成
- 内置 GPT-4、Claude 等 LLM 集成
- 多平台支持（Telegram、Discord、WhatsApp、QQ）
- 自动化 + 智能体能力，支持多步骤任务编排
- 活跃的开源社区和丰富的技能生态

**缺点：**
- 需要自托管或云部署，有一定配置门槛
- 高度定制化场景可能需要编写自定义技能

**最适合：** 希望快速构建 AI 驱动 Bot 的非技术用户和独立开发者。如果你想要的是 **AI 助手而不只是一个简单 Bot**，OpenClaw 是最佳选择。

## 2. python-telegram-bot（最成熟的 Python 框架）

**是什么：** Python 社区最流行的 Telegram Bot 库，提供对 Bot API 的完整封装。

**优点：**
- 成熟稳定，GitHub Star 超过 25k
- 文档详尽，案例丰富，中英文资料充足
- 支持异步和同步两种模式
- 与 Python 生态无缝集成（pandas、scikit-learn 等）

**缺点：**
- 纯代码方案，无可视化界面
- 需要自己处理部署、数据库、状态管理等基础设施
- AI 功能需要自行集成第三方 API

**最适合：** 有 Python 基础的开发者，特别是需要与数据科学或机器学习流水线结合的场景。

## 3. Telegraf.js（最佳 Node.js 开发框架）

**是什么：** 轻量级的 Node.js Telegram Bot 框架，基于中间件架构设计。

**优点：**
- 轻量级，灵活可扩展，中间件架构清晰
- 社区活跃，npm 周下载量超过 10 万
- TypeScript 原生支持
- 丰富的插件生态（session、i18n、rate-limit 等）

**缺点：**
- 必须手写代码，无 UI 界面
- 复杂 Bot 需要自己设计状态管理
- 学习曲线比无代码工具陡

**最适合：** 使用 JavaScript/TypeScript 的全栈开发者，希望对 Bot 行为有完全控制权。

## 4. Aiogram（最佳异步 Python 框架）

**是什么：** 基于 Python asyncio 的现代 Telegram Bot 框架，专为高并发场景设计。

**优点：**
- 完全异步，性能优于同步框架
- 支持 Bot API 7.x 的所有最新功能
- FSM（有限状态机）内置支持，适合复杂对话流
- 类型注解完善，开发体验好

**缺点：**
- 学习曲线比 python-telegram-bot 稍陡（需要理解 asyncio）
- 文档以英文和俄文为主，中文资料较少
- 社区规模较小

**最适合：** 追求高性能的 Python 开发者，特别是需要处理大量并发消息的 Bot。

## 5. Botpress（最佳企业级 AI Bot 平台）

**是什么：** 开源的企业级对话 AI 平台，提供可视化编辑器和强大的 NLU 引擎。

**优点：**
- 强大的 NLP/NLU 能力，支持意图识别和实体提取
- 可视化对话流编辑器 + 代码双模式
- 内置分析面板和 A/B 测试
- 支持多语言和多渠道部署

**缺点：**
- 配置较复杂，学习曲线陡峭
- 企业版功能需要付费
- 资源消耗较大，部署要求高

**最适合：** 有专业开发团队的企业，需要构建复杂对话 AI 系统的场景。

## 6. n8n（最佳自动化工作流工具）

**是什么：** 开源的可视化工作流自动化平台，支持 400+ 第三方集成。

**优点：**
- 可视化拖拽编排，支持复杂工作流
- 400+ 内置集成节点（Slack、GitHub、Google Sheets 等）
- 开源可自托管，数据完全可控
- 支持 AI 节点（调用 LLM API）

**缺点：**
- 不以 Telegram 为核心，Telegram 只是众多集成之一
- 复杂逻辑需要使用 Function 节点编写代码
- 自托管需要一定的服务器运维经验

**最适合：** 需要将 Telegram Bot 作为更大自动化工作流一环的用户。

## 7. Make（原 Integromat，最佳可视化集成工具）

**是什么：** SaaS 自动化平台，通过可视化界面连接各类应用和服务。

**优点：**
- 界面直观，操作简单
- 支持 1000+ 应用集成
- 内置错误处理和条件逻辑

**缺点：**
- 闭源 SaaS，数据经过第三方服务器
- 免费版有执行次数限制
- 复杂场景灵活性不如 n8n

**最适合：** 非技术用户，需要快速将 Telegram 与其他 SaaS 工具打通。

## 8. Rasa（最佳企业对话 AI 框架）

**是什么：** 开源的对话 AI 框架，提供完整的 NLU 管线和对话管理引擎。

**优点：**
- 工业级 NLU 引擎，支持自定义训练
- 完全开源，可本地部署，数据不出内网
- 支持复杂的多轮对话和上下文管理
- 与 Telegram 有官方集成文档

**缺点：**
- 学习曲线非常陡峭，需要 ML 基础
- 配置和训练过程复杂
- 资源消耗大，部署成本高

**最适合：** 有 ML 团队的企业，需要完全自主可控的对话 AI 系统。

## 9. BotKit（最佳多平台 Bot 框架）

**是什么：** 由 Microsoft 维护的开源 Bot 开发工具包，支持多平台部署。

**优点：**
- 一套代码部署到 Telegram、Slack、Teams 等多平台
- 中间件架构，扩展性好
- 与 Microsoft Bot Framework 深度集成

**缺点：**
- 近年更新频率下降
- Telegram 适配不如专门的 Telegram 框架完善
- 文档有些过时

**最适合：** 已经在使用 Microsoft 技术栈的团队，需要跨平台 Bot 方案。

## 10. Telethon（最佳底层协议库）

**是什么：** 基于 MTProto 协议的 Python Telegram 客户端库，提供完整的 Telegram 客户端 API 访问。

**优点：**
- 不局限于 Bot API，可以使用完整的 Telegram 用户 API
- 支持 User Bot（用户账号自动化）
- 可以访问聊天记录、频道管理等高级功能
- 异步设计，性能优秀

**缺点：**
- 使用门槛高，需要理解 Telegram 协议
- User Bot 存在被封号风险
- 不适合常规 Bot 开发

**最适合：** 高级用户和研究者，需要 Bot API 之外的 Telegram 功能。

## 如何选择适合你的工具？

选择工具的关键在于明确你的需求：

### 按技术背景选
- **零编程基础** → OpenClaw、Make
- **会写 Python** → python-telegram-bot、Aiogram
- **会写 JavaScript** → Telegraf.js
- **有 ML 团队** → Rasa

### 按项目类型选
- **AI 聊天助手** → OpenClaw、Botpress
- **通知/提醒 Bot** → n8n、Make
- **数据处理 Bot** → python-telegram-bot + pandas
- **企业客服系统** → Rasa、Botpress
- **自动化脚本** → Telethon

### 按预算选
- **完全免费** → OpenClaw（自托管）、python-telegram-bot、Telegraf.js、Aiogram
- **有预算** → Botpress Enterprise、Make Pro
- **最低成本运维** → OpenClaw（$5/月 VPS 即可）

## 如何开始？

如果你是新手：

👉 [如何创建 Telegram Bot（分步指南）](/blog/how-to-create-telegram-bot)

想要灵感？

👉 [10 个 Telegram Bot 实战案例](/blog/telegram-bot-examples)

准备好构建进阶工作流？

👉 [Telegram 自动化完整指南](/blog/telegram-automation-guide)

想深入了解底层 API？

👉 [Telegram Bot API 完整教程](/blog/telegram-bot-api-tutorial)

## 常见问题

### 哪款 Telegram Bot 工具最好？

没有绝对"最好"的工具，只有最适合你的工具。如果你没有编程经验且想要 AI 能力，OpenClaw 是最快的路径。如果你是 Python 开发者，python-telegram-bot 或 Aiogram 给你最大的灵活性。如果你需要企业级对话 AI，Botpress 或 Rasa 更合适。

### 不会编程也能搭建功能强大的 Telegram Bot 吗？

完全可以。OpenClaw 通过 YAML 配置和内置技能系统，让你无需写一行代码就能构建 AI 驱动的 Bot。n8n 和 Make 也支持可视化搭建。这些工具已经能覆盖 80% 以上的常见 Bot 使用场景。

### 这些工具可以组合使用吗？

可以，而且很常见。比如用 OpenClaw 处理 AI 对话逻辑，同时用 n8n 编排后端工作流；或者用 Telegraf.js 写核心 Bot 逻辑，用 Make 连接 CRM 系统。工具之间并不互斥。

### 哪款工具最适合中国开发者？

OpenClaw 对国内用户最友好——原生支持 QQ Bot 和微信生态，文档有中文版本，社区活跃度高。python-telegram-bot 和 Aiogram 在中文技术社区也有大量教程和案例分享。

## 总结

2026 年的 Telegram Bot 工具生态比以往更加丰富。选哪款工具取决于你的技术背景、项目需求和预算。

核心原则：**从最简单的工具开始，验证想法后再考虑更复杂的方案**。对大多数人来说，OpenClaw 或 python-telegram-bot 就能满足需求。随着项目增长，再引入 n8n、Rasa 等工具扩展能力。

不要在工具选择上花太多时间——选一个开始动手，比什么都重要。`,
    contentEn: `Looking for the best tools to build Telegram bots in 2026?

The Telegram bot ecosystem has matured significantly. From no-code platforms to professional developer frameworks, from AI-native solutions to workflow automation engines, both developers and non-technical users have plenty of options. But with so many choices, it is easy to get overwhelmed — every tool claims to be "the best," yet the actual experience varies wildly.

In this guide, we compare **10 of the most popular Telegram bot tools** — covering no-code platforms, developer frameworks, AI-powered solutions, and automation engines — so you can pick the right one based on your technical background and project requirements.

---

## Start Building Your Telegram Bot

| | Guide | |
|---|---|---|
| New here? | [How to Create a Telegram Bot](/blog/how-to-create-telegram-bot) |
| Need ideas? | [10 Telegram Bot Examples](/blog/telegram-bot-examples) |
| Want automation? | [Telegram Automation Guide](/blog/telegram-automation-guide) |
| Deep dive into API? | [Telegram Bot API Guide](/blog/telegram-bot-api-tutorial) |

---

## The Telegram Bot Ecosystem in 2026

Telegram now has over 950 million monthly active users. The Bot API has evolved to version 7.x with support for Mini Apps, inline payments, Webhook 2.0, and channel management. The tooling ecosystem around Telegram bots has exploded accordingly:

- **AI-native tools** (like OpenClaw and Botpress) let non-technical users build intelligent conversational experiences
- **Traditional developer frameworks** (like python-telegram-bot, Telegraf.js, and Aiogram) remain the go-to for developers who want full control
- **Automation platforms** (like n8n and Make) turn bots into components of larger workflows
- **Conversational AI frameworks** (like Rasa) serve enterprises that need deep NLU capabilities
- **Low-level protocol libraries** (like Telethon) give advanced users full Telegram client API access

Let us break down each of these 10 tools.

## Quick Comparison Table

| Tool | Language/Platform | Open Source | Difficulty | AI Support | Best For |
|------|-------------------|-------------|------------|------------|----------|
| OpenClaw | Node.js (CLI) | Yes | Easy | Built-in | AI automation, no-code users |
| python-telegram-bot | Python | Yes | Medium | None | Python developers |
| Telegraf.js | Node.js | Yes | Medium | None | Node.js developers |
| Aiogram | Python (asyncio) | Yes | Medium | None | High-performance async bots |
| Botpress | TypeScript | Yes | Hard | Built-in | Enterprise AI bots |
| n8n | Node.js (visual) | Yes | Easy | Yes | Automation workflows |
| Make (Integromat) | SaaS | No | Easy | Limited | Quick integrations |
| Rasa | Python | Yes | Very Hard | Built-in NLU | Enterprise conversational AI |
| BotKit | Node.js | Yes | Medium | None | Multi-platform bots |
| Telethon | Python | Yes | Hard | None | Advanced users, automation scripts |

## 1. OpenClaw (Best for AI Automation)

**What it is:** An AI-native agent platform that lets you build multi-platform bots through CLI and YAML configuration, with built-in LLM integration.

**Strengths:**
- No-code workflow builder — configure everything in YAML
- Built-in integration with GPT-4, Claude, and other LLMs
- Multi-platform support (Telegram, Discord, WhatsApp, QQ)
- Agent capabilities with multi-step task orchestration
- Active open-source community with a rich skill ecosystem

**Weaknesses:**
- Requires self-hosting or cloud deployment with some initial configuration
- Highly customized scenarios may require writing custom skills

**Best for:** Non-technical users and indie developers who want to build AI-powered bots fast. If you want an **AI assistant, not just a simple bot**, OpenClaw is the top choice.

## 2. python-telegram-bot (Most Mature Python Framework)

**What it is:** The most popular Telegram Bot library in the Python ecosystem, offering a complete wrapper around the Bot API.

**Strengths:**
- Mature and stable with over 25k GitHub stars
- Extensive documentation with abundant examples
- Supports both async and synchronous modes
- Seamless integration with the Python data ecosystem (pandas, scikit-learn, etc.)

**Weaknesses:**
- Code-only — no visual interface
- You handle deployment, database, and state management yourself
- AI features require integrating third-party APIs manually

**Best for:** Developers with Python experience, especially when the bot needs to connect with data science or ML pipelines.

## 3. Telegraf.js (Best Node.js Framework)

**What it is:** A lightweight Node.js Telegram Bot framework built on a middleware architecture.

**Strengths:**
- Lightweight and extensible with a clean middleware pattern
- Active community with over 100k weekly npm downloads
- First-class TypeScript support
- Rich plugin ecosystem (session, i18n, rate-limit, etc.)

**Weaknesses:**
- Requires coding — no UI
- Complex bots need custom state management design
- Steeper learning curve than no-code tools

**Best for:** Full-stack JavaScript/TypeScript developers who want complete control over bot behavior.

## 4. Aiogram (Best Async Python Framework)

**What it is:** A modern Telegram Bot framework built on Python asyncio, designed specifically for high-concurrency scenarios.

**Strengths:**
- Fully asynchronous with better performance than synchronous frameworks
- Supports all Bot API 7.x features
- Built-in FSM (Finite State Machine) support for complex conversation flows
- Excellent type annotations and developer experience

**Weaknesses:**
- Slightly steeper learning curve than python-telegram-bot (requires understanding asyncio)
- Documentation primarily in English and Russian — limited Chinese resources
- Smaller community size

**Best for:** Performance-focused Python developers, especially for bots that need to handle high volumes of concurrent messages.

## 5. Botpress (Best Enterprise AI Bot Platform)

**What it is:** An open-source enterprise conversational AI platform with a visual editor and powerful NLU engine.

**Strengths:**
- Strong NLP/NLU capabilities with intent recognition and entity extraction
- Visual conversation flow editor plus code mode
- Built-in analytics dashboard and A/B testing
- Multi-language and multi-channel deployment

**Weaknesses:**
- Complex configuration with a steep learning curve
- Enterprise features require a paid plan
- Resource-heavy deployment requirements

**Best for:** Companies with dedicated development teams that need to build sophisticated conversational AI systems.

## 6. n8n (Best Automation Workflow Tool)

**What it is:** An open-source visual workflow automation platform with 400+ third-party integrations.

**Strengths:**
- Visual drag-and-drop workflow builder for complex pipelines
- 400+ built-in integration nodes (Slack, GitHub, Google Sheets, etc.)
- Open-source and self-hostable with full data control
- AI nodes for calling LLM APIs

**Weaknesses:**
- Not Telegram-first — Telegram is just one of many integrations
- Complex logic requires writing code in Function nodes
- Self-hosting needs some server administration experience

**Best for:** Users who need their Telegram bot to be part of a larger automation workflow.

## 7. Make (formerly Integromat — Best Visual Integration Tool)

**What it is:** A SaaS automation platform that connects applications and services through a visual interface.

**Strengths:**
- Intuitive interface, easy to operate
- 1000+ app integrations
- Built-in error handling and conditional logic

**Weaknesses:**
- Closed-source SaaS — data passes through third-party servers
- Free tier has execution limits
- Less flexible than n8n for complex scenarios

**Best for:** Non-technical users who need to quickly connect Telegram with other SaaS tools.

## 8. Rasa (Best Enterprise Conversational AI Framework)

**What it is:** An open-source conversational AI framework with a complete NLU pipeline and dialogue management engine.

**Strengths:**
- Industrial-grade NLU engine with custom training support
- Fully open-source and deployable on-premise — data never leaves your network
- Supports complex multi-turn conversations and context management
- Official Telegram integration documentation

**Weaknesses:**
- Very steep learning curve — requires ML knowledge
- Complex configuration and training process
- Resource-heavy with high deployment costs

**Best for:** Enterprises with ML teams that need fully self-controlled conversational AI systems.

## 9. BotKit (Best Multi-Platform Bot Framework)

**What it is:** An open-source bot development toolkit maintained by Microsoft, supporting multi-platform deployment.

**Strengths:**
- One codebase deploys to Telegram, Slack, Teams, and more
- Middleware architecture with good extensibility
- Deep integration with Microsoft Bot Framework

**Weaknesses:**
- Update frequency has declined in recent years
- Telegram adapter is not as polished as dedicated Telegram frameworks
- Some documentation is outdated

**Best for:** Teams already using the Microsoft tech stack that need a cross-platform bot solution.

## 10. Telethon (Best Low-Level Protocol Library)

**What it is:** A Python Telegram client library built on the MTProto protocol, providing full Telegram client API access.

**Strengths:**
- Not limited to the Bot API — full Telegram user API access
- Supports User Bots (user account automation)
- Access to chat history, channel management, and other advanced features
- Async design with excellent performance

**Weaknesses:**
- High barrier to entry — requires understanding of Telegram protocols
- User Bots carry a risk of account bans
- Not suitable for standard bot development

**Best for:** Advanced users and researchers who need Telegram functionality beyond the Bot API.

## How to Choose the Right Tool for Your Project

The key is to clarify your requirements:

### By Technical Background
- **No coding experience** — OpenClaw, Make
- **Python developer** — python-telegram-bot, Aiogram
- **JavaScript developer** — Telegraf.js
- **ML team available** — Rasa

### By Project Type
- **AI chat assistant** — OpenClaw, Botpress
- **Notification/reminder bot** — n8n, Make
- **Data processing bot** — python-telegram-bot + pandas
- **Enterprise customer service** — Rasa, Botpress
- **Automation scripts** — Telethon

### By Budget
- **Completely free** — OpenClaw (self-hosted), python-telegram-bot, Telegraf.js, Aiogram
- **Have budget** — Botpress Enterprise, Make Pro
- **Lowest operational cost** — OpenClaw (a $5/month VPS is enough)

## How to Get Started

New to bots?

👉 [How to Create a Telegram Bot (Step-by-Step)](/blog/how-to-create-telegram-bot)

Want ideas?

👉 [10 Telegram Bot Examples You Can Build Today](/blog/telegram-bot-examples)

Ready for advanced workflows?

👉 [Telegram Automation Guide](/blog/telegram-automation-guide)

Want to understand the API?

👉 [Telegram Bot API Tutorial](/blog/telegram-bot-api-tutorial)

## FAQ

### What is the best Telegram bot tool?

There is no single "best" tool — only the best tool for your situation. If you have no coding experience and want AI capabilities, OpenClaw is the fastest path. If you are a Python developer, python-telegram-bot or Aiogram give you the most flexibility. If you need enterprise-grade conversational AI, Botpress or Rasa are better fits.

### Can I build a powerful Telegram bot without coding?

Absolutely. OpenClaw uses YAML configuration and a built-in skill system that lets you build AI-powered bots without writing a single line of code. n8n and Make also support visual bot building. These tools cover over 80% of common bot use cases.

### Can I combine multiple tools together?

Yes, and it is common practice. For example, you might use OpenClaw for AI conversation logic while using n8n to orchestrate backend workflows. Or write core bot logic in Telegraf.js and use Make to connect to a CRM system. These tools are not mutually exclusive.

### Which tool is best for developers in China?

OpenClaw is the most China-friendly option — it natively supports QQ Bot and the WeChat ecosystem, has Chinese documentation, and has an active community. python-telegram-bot and Aiogram also have many Chinese-language tutorials and community resources.

## Final Thoughts

The Telegram bot tooling ecosystem in 2026 is richer than ever. The right choice depends on your technical background, project requirements, and budget.

The core principle: **start with the simplest tool, validate your idea, then consider more complex solutions as needed**. For most people, OpenClaw or python-telegram-bot will cover their needs. As your project grows, bring in n8n, Rasa, or other tools to expand your capabilities.

Do not spend too much time choosing — picking one tool and getting started matters more than finding the perfect tool.

---

**Related reading:**
- [How to Create a Telegram Bot (Step-by-Step)](/blog/how-to-create-telegram-bot)
- [10 Telegram Bot Examples You Can Build Today](/blog/telegram-bot-examples)
- [Telegram Automation Guide](/blog/telegram-automation-guide)
- [Telegram Bot API Tutorial](/blog/telegram-bot-api-tutorial)`,
    author: "OpenClaw 101",
    date: "2026-04-03",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["Telegram", "Bot Tools", "Comparison", "对比", "No-Code", "OpenClaw", "n8n", "Telegraf", "Aiogram", "Botpress", "Rasa", "Make", "Telethon", "2026"],
    readingTime: 18,
    image: "/og-image.png"
  },
];
