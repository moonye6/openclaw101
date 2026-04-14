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
    content: `想把 Telegram 变成你的 AI 私人助理？这篇文章手把手教你配置 OpenClaw + Telegram 机器人，10 分钟内完成。不需要任何编程经验，只要你会用 Telegram，就能跟着做。

## 为什么选择 Telegram？

在所有即时通讯平台中，Telegram 是接入 AI 最理想的选择，原因有四个：

- **跨平台同步：** iOS、Android、Desktop、Web 客户端全覆盖，消息实时同步。在手机上发的指令，电脑上马上能看到 AI 回复。
- **免费无广告：** 没有消息数量限制，没有文件大小限制（单文件最大 2GB），没有广告干扰。
- **API 完全开放：** 创建机器人只需要和 @BotFather 对话，不需要申请开发者账号，不需要审核。
- **隐私友好：** 支持端到端加密的 Secret Chat，Bot 对话可以设置自动销毁。

相比之下，微信没有官方 Bot API，WhatsApp 的 Business API 需要企业认证，Discord 更偏向社区而非个人助理场景。

## 前置条件

开始之前，确保你准备好了以下内容：

| 条件 | 说明 |
|------|------|
| Telegram 账号 | 注册一个 Telegram 账号（如果还没有的话） |
| Node.js 18+ | 推荐 20+，运行 \`node --version\` 检查 |
| 至少 2GB 可用内存 | OpenClaw 运行时需要 |
| LLM API Key | 至少准备一个：Anthropic、OpenAI 或 Google AI |
| 稳定的网络连接 | Telegram Bot API 需要访问外网 |

如果你还没有安装 Node.js，可以参考[完整安装指南](/zh/blog/how-to-install-openclaw)。

## 第一步：安装 OpenClaw

打开终端（macOS 用 Terminal，Windows 用 WSL2 或 PowerShell），运行以下命令：

\`\`\`bash
# 安装 OpenClaw
npm install -g openclaw

# 验证安装成功
openclaw --version
# 输出示例：openclaw v1.2.3

# 配置你的 LLM API Key
openclaw config set model anthropic/claude-3.5-sonnet
openclaw config set apiKey YOUR_ANTHROPIC_API_KEY
\`\`\`

如果你没有 Anthropic 的 API Key，也可以用其他模型：

\`\`\`bash
# 使用 OpenAI
openclaw config set model openai/gpt-4o
openclaw config set apiKey YOUR_OPENAI_API_KEY

# 使用本地模型（免费，但需要较好的硬件）
openclaw config set model ollama/llama3
\`\`\`

## 第二步：创建 Telegram Bot

这一步在 Telegram 里完成，大约需要 2 分钟。

1. **打开 Telegram**，在搜索栏输入 \`@BotFather\`，点击进入对话
2. **发送** \`/newbot\` 命令
3. **输入 Bot 显示名称**，比如 "My AI Assistant"
4. **输入 Bot 用户名**，必须以 \`bot\` 结尾，比如 \`my_openclaw_bot\`
5. **保存返回的 API Token**，格式类似 \`123456789:ABCdefGHIjklMNOpqrsTUVwxyz\`

完整对话示例：

\`\`\`
你：/newbot
BotFather：Alright, a new bot. How are we going to call it?
你：My AI Assistant
BotFather：Good. Now let's choose a username for your bot.
你：my_openclaw_bot
BotFather：Done! ... Use this token to access the HTTP API:
         123456789:ABCdefGHIjklMNOpqrsTUVwxyz
\`\`\`

**安全提示：** 这个 Token 等于你 Bot 的密码，不要分享给别人，不要提交到 GitHub。

### 可选：设置 Bot 描述和头像

\`\`\`
/setdescription - 设置 Bot 简介
/setabouttext - 设置 Bot "关于"信息
/setuserpic - 上传 Bot 头像
\`\`\`

## 第三步：配置 OpenClaw 连接 Telegram

回到终端，运行以下命令把 Token 写入 OpenClaw 配置：

\`\`\`bash
# 配置 Telegram Token
openclaw config set telegram.token YOUR_BOT_TOKEN

# 启动 OpenClaw（包含 Telegram 频道）
openclaw telegram start
\`\`\`

看到类似以下输出说明启动成功：

\`\`\`
[OpenClaw] Telegram channel connected
[OpenClaw] Bot username: @my_openclaw_bot
[OpenClaw] Listening for messages...
\`\`\`

## 第四步：发送第一条消息

打开 Telegram，搜索你刚创建的 Bot 用户名，点击 **Start** 按钮，然后随便发一条消息：

\`\`\`
你：帮我写一首关于代码的五言绝句
Bot：键盘敲不停，代码如流星。调试千百遍，终见绿灯明。
\`\`\`

如果 Bot 没有回复，检查以下几点：

- 终端中 OpenClaw 进程是否还在运行
- Token 是否正确（没有多余空格）
- 网络是否能访问 Telegram API（国内可能需要代理）

## 高级功能

### 群聊模式

OpenClaw Bot 不仅支持私聊，还能加入 Telegram 群组，为整个团队服务。

\`\`\`bash
# 启用群聊支持
openclaw config set telegram.allowGroups true

# 设置触发方式（@提及或特定命令前缀）
openclaw config set telegram.groupTrigger "mention"
\`\`\`

把 Bot 拉进群组后，成员通过 \`@my_openclaw_bot 帮我翻译这段话\` 来触发 AI 回复。你也可以设置为命令触发：

\`\`\`bash
# 使用 /ai 前缀触发
openclaw config set telegram.groupTrigger "command"
openclaw config set telegram.commandPrefix "/ai"
\`\`\`

### Inline 模式

Inline 模式允许你在任何聊天框中调用 Bot，无需切换到 Bot 对话。

\`\`\`bash
# 启用 Inline 模式
openclaw config set telegram.inline true
\`\`\`

使用方法：在任意聊天的输入框中输入 \`@my_openclaw_bot 翻译 hello world\`，Bot 会返回结果供你选择插入。

### 多媒体处理

OpenClaw 的 Telegram Bot 支持处理多种类型的消息：

\`\`\`bash
# 启用图片分析（需要视觉模型支持）
openclaw config set telegram.vision true

# 启用语音转文字
openclaw config set telegram.voice true

# 启用文件处理
openclaw config set telegram.files true
\`\`\`

支持的交互方式：

- **发送图片** → AI 描述图片内容、提取文字（OCR）
- **发送语音** → AI 转录为文字并回复
- **发送文档** → AI 读取并分析 PDF、Word、Excel、代码文件
- **发送位置** → AI 推荐附近的餐厅、景点

## 实用技巧

### 1. 设置系统提示词

让 Bot 更适合你的使用场景：

\`\`\`bash
openclaw config set telegram.systemPrompt "你是一个中英文翻译助手。用户发中文你翻译成英文，发英文你翻译成中文。翻译要自然流畅。"
\`\`\`

### 2. 后台运行

用 \`screen\` 或 \`pm2\` 让 Bot 在关闭终端后继续运行：

\`\`\`bash
# 使用 pm2（推荐）
npm install -g pm2
pm2 start "openclaw telegram start" --name openclaw-bot
pm2 save
pm2 startup  # 开机自启

# 使用 screen
screen -S openclaw
openclaw telegram start
# 按 Ctrl+A 然后 D 分离会话
\`\`\`

### 3. 限制访问

防止陌生人使用你的 Bot（会消耗你的 API 额度）：

\`\`\`bash
# 只允许特定用户使用
openclaw config set telegram.allowedUsers "123456789,987654321"

# 获取你的 Telegram User ID：给 @userinfobot 发消息
\`\`\`

### 4. 对话记忆

默认情况下，Bot 会记住最近 10 轮对话上下文。你可以调整：

\`\`\`bash
# 设置上下文轮数
openclaw config set telegram.contextRounds 20

# 清除所有对话记忆
openclaw telegram clear
\`\`\`

## 常见问题排查

如果配置过程中遇到问题，先检查以下常见情况。

**Bot 完全没反应：** 用 \`openclaw config get telegram.token\` 确认 Token 是否正确。确保 OpenClaw 进程在运行——用 \`openclaw status\` 检查。如果你在企业防火墙后面或所在地区屏蔽了 Telegram，可能需要配置代理：\`openclaw config set proxy.url http://127.0.0.1:7890\`。

**Bot 回复了但是报错：** 通常是 LLM API Key 无效或额度用完了。运行 \`openclaw usage\` 查看剩余额度。如果你最近更换了 API Key，用 \`openclaw config set apiKey NEW_KEY\` 更新。

**Bot 私聊正常但群聊不回复：** 确保启用了群聊支持（\`openclaw config get telegram.allowGroups\`）。检查 Bot 是否已作为成员加入群组。在 Telegram 群组设置中，确认 Bot 有读取消息的权限。

## 常见问题

**Q：Bot 回复很慢，怎么优化？**

回复速度主要取决于 LLM API 的响应时间。如果用 Claude 或 GPT-4o 觉得慢，可以切换到更快的模型（如 GPT-4o-mini 或 Gemini Flash）。你也可以启用流式回复：\`openclaw config set telegram.streaming true\`，这样 Bot 会边生成边发送，用户体验更好。

**Q：一个 Bot 能同时服务多少人？**

OpenClaw 的 Telegram 频道默认支持并发处理。在普通 VPS（2核4G）上，同时处理 10-20 个用户的消息没有问题。瓶颈通常不在 OpenClaw，而在 LLM API 的并发限制。

**Q：消息有长度限制吗？**

Telegram 单条消息最长 4096 字符。如果 AI 回复超过这个长度，OpenClaw 会自动分成多条消息发送。对于特别长的回复（比如生成代码文件），Bot 会以文件附件形式发送。

**Q：如何在 Bot 中使用 OpenClaw 的技能（Skills）？**

已安装的技能会自动在 Telegram Bot 中生效。比如你安装了 nano-banana-pro，就可以直接在 Telegram 里说"生成一张赛博朋克风格的图片"，Bot 会调用技能并返回图片。用 \`openclaw skills list\` 查看当前已安装的技能。`,
    contentEn: `Want to turn Telegram into your AI personal assistant? This article walks you through configuring OpenClaw with a Telegram bot in about 10 minutes. No programming experience required — if you can use Telegram, you can follow along.

## Why Choose Telegram?

Among all messaging platforms, Telegram is the best choice for connecting AI, for four reasons:

- **Cross-platform sync:** iOS, Android, Desktop, and Web clients all covered with real-time message sync. Send a command on your phone, see the AI reply instantly on your computer.
- **Free with no ads:** No message limits, no file size restrictions (up to 2GB per file), no ad interruptions.
- **Fully open API:** Creating a bot only requires chatting with @BotFather. No developer account applications, no review process.
- **Privacy friendly:** Supports end-to-end encrypted Secret Chats, and bot conversations can be set to auto-destruct.

By comparison, WeChat has no official Bot API, WhatsApp's Business API requires enterprise verification, and Discord is more oriented toward communities than personal assistant use cases.

## Prerequisites

Before getting started, make sure you have the following ready:

| Requirement | Details |
|-------------|---------|
| Telegram account | Register a Telegram account if you don't have one |
| Node.js 18+ | 20+ recommended, run \`node --version\` to check |
| At least 2GB available memory | Required for OpenClaw runtime |
| LLM API Key | At least one: Anthropic, OpenAI, or Google AI |
| Stable internet connection | Telegram Bot API requires internet access |

If you haven't installed Node.js yet, check the [complete installation guide](/blog/how-to-install-openclaw).

## Step 1: Install OpenClaw

Open your terminal (Terminal on macOS, WSL2 or PowerShell on Windows) and run these commands:

\`\`\`bash
# Install OpenClaw
npm install -g openclaw

# Verify the installation
openclaw --version
# Example output: openclaw v1.2.3

# Configure your LLM API Key
openclaw config set model anthropic/claude-3.5-sonnet
openclaw config set apiKey YOUR_ANTHROPIC_API_KEY
\`\`\`

If you don't have an Anthropic API key, you can use other models:

\`\`\`bash
# Use OpenAI
openclaw config set model openai/gpt-4o
openclaw config set apiKey YOUR_OPENAI_API_KEY

# Use a local model (free, but requires decent hardware)
openclaw config set model ollama/llama3
\`\`\`

## Step 2: Create a Telegram Bot

This step happens inside Telegram and takes about 2 minutes.

1. **Open Telegram** and search for \`@BotFather\` in the search bar
2. **Send** the \`/newbot\` command
3. **Enter a display name** for your bot, e.g., "My AI Assistant"
4. **Enter a username** — it must end with \`bot\`, e.g., \`my_openclaw_bot\`
5. **Save the API Token** that BotFather returns, it looks like \`123456789:ABCdefGHIjklMNOpqrsTUVwxyz\`

Here is what the full conversation looks like:

\`\`\`
You: /newbot
BotFather: Alright, a new bot. How are we going to call it?
You: My AI Assistant
BotFather: Good. Now let's choose a username for your bot.
You: my_openclaw_bot
BotFather: Done! ... Use this token to access the HTTP API:
         123456789:ABCdefGHIjklMNOpqrsTUVwxyz
\`\`\`

**Security note:** This token is essentially your bot's password. Do not share it with anyone and never commit it to GitHub.

### Optional: Set Bot Description and Avatar

\`\`\`
/setdescription - Set the bot's short description
/setabouttext - Set the bot's "About" info
/setuserpic - Upload a bot avatar
\`\`\`

## Step 3: Connect OpenClaw to Telegram

Back in your terminal, write the token into the OpenClaw configuration:

\`\`\`bash
# Configure the Telegram token
openclaw config set telegram.token YOUR_BOT_TOKEN

# Start OpenClaw with the Telegram channel
openclaw telegram start
\`\`\`

You should see output like this when it starts successfully:

\`\`\`
[OpenClaw] Telegram channel connected
[OpenClaw] Bot username: @my_openclaw_bot
[OpenClaw] Listening for messages...
\`\`\`

## Step 4: Send Your First Message

Open Telegram, search for your bot's username, tap **Start**, and send any message:

\`\`\`
You: Write me a haiku about programming
Bot: Fingers on the keys / Logic flows through glowing screens / A bug fixed at dawn
\`\`\`

If the bot does not reply, check these things:

- Is the OpenClaw process still running in the terminal?
- Is the token correct (no extra spaces)?
- Can your network reach the Telegram API? (some regions may need a proxy)

## Advanced Features

### Group Chat Mode

The OpenClaw bot supports not only private chats but also Telegram groups, serving your entire team.

\`\`\`bash
# Enable group chat support
openclaw config set telegram.allowGroups true

# Set the trigger method (mention or command prefix)
openclaw config set telegram.groupTrigger "mention"
\`\`\`

After adding the bot to a group, members can trigger AI replies with \`@my_openclaw_bot translate this paragraph\`. You can also set it to command-based triggering:

\`\`\`bash
# Use /ai prefix to trigger
openclaw config set telegram.groupTrigger "command"
openclaw config set telegram.commandPrefix "/ai"
\`\`\`

### Inline Mode

Inline mode lets you invoke the bot from any chat input box without switching to the bot's conversation.

\`\`\`bash
# Enable inline mode
openclaw config set telegram.inline true
\`\`\`

Usage: in any chat's input field, type \`@my_openclaw_bot translate hello world\` and the bot will return results for you to select and insert.

### Media Handling

The OpenClaw Telegram bot supports processing multiple types of messages:

\`\`\`bash
# Enable image analysis (requires a vision-capable model)
openclaw config set telegram.vision true

# Enable voice-to-text
openclaw config set telegram.voice true

# Enable file processing
openclaw config set telegram.files true
\`\`\`

Supported interactions:

- **Send an image** — AI describes the content, extracts text (OCR)
- **Send a voice message** — AI transcribes it to text and replies
- **Send a document** — AI reads and analyzes PDFs, Word, Excel, and code files
- **Send a location** — AI recommends nearby restaurants or attractions

## Tips and Tricks

### 1. Set a System Prompt

Customize the bot for your specific use case:

\`\`\`bash
openclaw config set telegram.systemPrompt "You are a professional English-Chinese translator. When the user sends Chinese, translate to English. When they send English, translate to Chinese. Keep translations natural and fluent."
\`\`\`

### 2. Run in the Background

Use \`screen\` or \`pm2\` to keep the bot running after you close the terminal:

\`\`\`bash
# Using pm2 (recommended)
npm install -g pm2
pm2 start "openclaw telegram start" --name openclaw-bot
pm2 save
pm2 startup  # Auto-start on reboot

# Using screen
screen -S openclaw
openclaw telegram start
# Press Ctrl+A then D to detach the session
\`\`\`

### 3. Restrict Access

Prevent strangers from using your bot (which would consume your API quota):

\`\`\`bash
# Only allow specific users
openclaw config set telegram.allowedUsers "123456789,987654321"

# Get your Telegram User ID: send a message to @userinfobot
\`\`\`

### 4. Conversation Memory

By default, the bot remembers the last 10 rounds of conversation context. You can adjust this:

\`\`\`bash
# Set context rounds
openclaw config set telegram.contextRounds 20

# Clear all conversation memory
openclaw telegram clear
\`\`\`

## Troubleshooting Common Issues

If something goes wrong during setup, check these common issues before digging deeper.

**Bot does not respond at all:** Verify the token is correct with \`openclaw config get telegram.token\`. Make sure the OpenClaw process is running — check with \`openclaw status\`. If you are behind a corporate firewall or in a region that blocks Telegram, you may need to configure a proxy: \`openclaw config set proxy.url http://127.0.0.1:7890\`.

**Bot responds with an error message:** This usually means the LLM API key is invalid or your quota is exhausted. Run \`openclaw usage\` to check your remaining balance. If you recently rotated your API key, update it with \`openclaw config set apiKey NEW_KEY\`.

**Bot works in private chat but not in groups:** Make sure group support is enabled (\`openclaw config get telegram.allowGroups\`). Also check that the bot has been added to the group as a member, not just mentioned. In Telegram group settings, ensure the bot has permission to read messages.

## Frequently Asked Questions

**Q: The bot replies slowly. How can I speed it up?**

Reply speed mostly depends on LLM API response time. If Claude or GPT-4o feels slow, switch to a faster model like GPT-4o-mini or Gemini Flash. You can also enable streaming replies: \`openclaw config set telegram.streaming true\`. This makes the bot send text as it generates, improving the perceived speed.

**Q: How many users can one bot serve simultaneously?**

OpenClaw's Telegram channel supports concurrent processing by default. On a standard VPS (2 cores, 4GB RAM), handling 10-20 simultaneous users is not a problem. The bottleneck is usually the LLM API's concurrency limit, not OpenClaw itself.

**Q: Is there a message length limit?**

Telegram's single message limit is 4096 characters. If the AI reply exceeds this length, OpenClaw automatically splits it into multiple messages. For especially long outputs (like generated code files), the bot sends the content as a file attachment.

**Q: How do I use OpenClaw Skills inside the bot?**

Installed skills are automatically available in the Telegram bot. For example, if you installed nano-banana-pro, you can say "generate a cyberpunk style image" directly in Telegram, and the bot will invoke the skill and return the image. Use \`openclaw skills list\` to see your currently installed skills.`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "配置教程",
    categoryEn: "Tutorial",
    tags: ["Telegram", "配置", "机器人", "入门"],
    readingTime: 12,
    image: "/og-image.png"
  },
  {
    id: 3,
    slug: "openclaw-best-skills",
    title: "OpenClaw 最佳技能推荐：提升效率的 10 个必备插件",
    titleEn: "OpenClaw Skills Marketplace (2026) – Best Skills & How to Use",
    excerpt: "从图像生成到视频分析，这些技能将让你的 OpenClaw 如虎添翼。",
    excerptEn: "From image generation to video analysis, these skills will supercharge your OpenClaw.",
    content: `OpenClaw 装好之后，默认就能处理文件、写代码、搜网页。这些通用能力覆盖大部分日常任务，但总有一些场景需要更专业的工具——比如生成图片、操作飞书文档、转录会议录音。

这就是技能（Skills）存在的意义。技能是社区开发的扩展包，安装后直接集成到 OpenClaw 的工作流中。ClawHub 是官方技能市场，目前已有数百个技能可选。

下面是我们实际测试后筛选出的 10 个高频技能，每个都附带安装命令和真实使用场景。

## 10 个必备技能

### 1. nano-banana-pro — AI 图像生成

基于 Gemini 2.5 Flash Image 模型，支持文生图和图片编辑。可以指定宽高比（16:9、1:1 等），输出分辨率最高 4K。

**典型场景：** 你正在写一篇公众号文章，需要一张封面图。直接在终端里描述你想要的画面，几秒钟就能拿到。

\`\`\`bash
openclaw skills install nano-banana-pro
# 安装后直接用：
openclaw run "生成一张赛博朋克风格的城市夜景，16:9 比例，2K 分辨率"
\`\`\`

### 2. feishu-doc — 飞书文档操作

读取、创建、编辑飞书云文档。支持批量操作，能把飞书多维表格的数据拉下来做分析。

**典型场景：** 每周五需要把项目进度汇总到飞书文档里。以前手动复制粘贴，现在一条命令搞定。

\`\`\`bash
openclaw skills install feishu-doc
# 读取飞书文档内容：
openclaw run "读取飞书文档 https://xxx.feishu.cn/docs/xxx 的内容并总结"
\`\`\`

### 3. video-frames — 视频帧提取与分析

从视频中按时间间隔或关键帧提取画面，然后用 AI 分析每一帧的内容。支持本地视频和 URL。

**典型场景：** 产品经理录了一段竞品操作视频，你需要快速了解竞品的 UI 流程。用 video-frames 提取关键帧，AI 自动描述每个界面。

\`\`\`bash
openclaw skills install video-frames
# 每 5 秒提取一帧并分析：
openclaw run "分析 ./demo.mp4 视频，每 5 秒截一帧，描述每帧内容"
\`\`\`

### 4. browser-use — 无头浏览器自动化

在后台启动一个真实浏览器，能点击、输入、截图、填表单。适合自动化测试和网页数据抓取。

**典型场景：** 你想监控某个电商平台的价格变化，browser-use 可以定期打开页面、截图并提取价格数据。

\`\`\`bash
openclaw skills install browser-use
# 打开网页并截图：
openclaw run "打开 https://example.com，截图保存到 ./screenshot.png"
\`\`\`

### 5. github-mcp — GitHub 深度集成

不只是 git 操作。github-mcp 能直接调用 GitHub API：创建 Issue、Review PR、搜索代码、管理 Release。

**典型场景：** 代码 Review 时，你想看某个 PR 的所有评论和 CI 状态，一条命令全部拉回来。

\`\`\`bash
openclaw skills install github-mcp
# 查看 PR 详情：
openclaw run "查看 octocat/hello-world 仓库的 PR #42 的评论和 CI 状态"
\`\`\`

### 6. slack-mcp — Slack 消息与频道管理

发送消息、读取频道历史、搜索聊天记录、管理频道。对于用 Slack 协作的团队非常实用。

**典型场景：** 早上上班，想快速了解昨晚 #engineering 频道讨论了什么。让 AI 帮你总结。

\`\`\`bash
openclaw skills install slack-mcp
# 总结频道消息：
openclaw run "总结 #engineering 频道最近 24 小时的消息"
\`\`\`

### 7. google-calendar — Google 日历管理

查看、创建、修改日历事件。支持查询空闲时间段，方便安排会议。

**典型场景：** 你想知道明天的日程安排，或者需要在下午 3 点到 4 点之间找一个 30 分钟的空闲时段来开会。

\`\`\`bash
openclaw skills install google-calendar
# 查看明天的日程：
openclaw run "查看我明天的所有日历事件"
\`\`\`

### 8. whisper-transcribe — 音频/视频转文字

基于 OpenAI Whisper 模型，把录音、播客、会议录像转成文字稿。支持中英文混合识别。

**典型场景：** 开完一个小时的线上会议，录音文件丢给 whisper-transcribe，五分钟拿到完整文字稿。

\`\`\`bash
openclaw skills install whisper-transcribe
# 转录会议录音：
openclaw run "转录 ./meeting-recording.mp3 并生成会议纪要"
\`\`\`

### 9. notion-sync — Notion 双向同步

读取和写入 Notion 页面、数据库。可以把本地 Markdown 同步到 Notion，也可以把 Notion 内容拉到本地。

**典型场景：** 你用 Notion 管理个人知识库，但写笔记更喜欢用本地编辑器。notion-sync 帮你双向同步。

\`\`\`bash
openclaw skills install notion-sync
# 把 Notion 页面拉到本地：
openclaw run "把我的 Notion 页面 '2026 年阅读清单' 导出为 Markdown"
\`\`\`

### 10. home-assistant — 智能家居控制

连接 Home Assistant 实例，用自然语言控制家里的智能设备。

**典型场景：** 晚上在终端干活，随手一句"把客厅灯调暗到 30%"就行，不用掏手机找 App。

\`\`\`bash
openclaw skills install home-assistant
# 控制智能设备：
openclaw run "把客厅的灯调暗到 30%，关闭卧室空调"
\`\`\`

## 如何选择适合你的技能

技能不是装得越多越好。每个技能会占用一些上下文空间，装太多反而影响响应速度。建议按以下思路挑选：

**按工作场景选：** 如果你主要做开发，github-mcp 和 browser-use 优先级最高。如果你偏运营，feishu-doc 和 nano-banana-pro 更实用。

**按团队工具选：** 团队用 Slack 就装 slack-mcp，用飞书就装 feishu-doc。没必要两个都装。

**按使用频率选：** 先装你每天都会用到的，比如 google-calendar。偶尔用一次的技能，用的时候再装也不迟。

### 技能管理命令速查

\`\`\`bash
# 搜索技能
openclaw skills search 图像生成

# 安装技能
openclaw skills install nano-banana-pro

# 查看已安装的技能
openclaw skills list

# 卸载技能
openclaw skills uninstall nano-banana-pro

# 更新所有技能
openclaw skills update --all
\`\`\`

## 常见问题

**Q：技能安装失败怎么办？**

先检查网络连接。如果网络正常，试试 \`openclaw skills install <技能名> --verbose\` 查看详细日志。大部分安装失败是因为网络超时，重试一次通常就好了。

**Q：两个技能功能冲突了怎么处理？**

OpenClaw 会自动根据你的指令选择最合适的技能。如果选错了，你可以在指令里明确指定，比如"用 nano-banana-pro 生成图片"。

**Q：技能会不会泄露我的数据？**

ClawHub 上的技能都经过基础安全审核。但涉及第三方 API（如飞书、Slack）的技能，数据会经过对应平台。建议只安装你信任的技能，安装前用 \`openclaw skills info <技能名>\` 查看权限说明。

**Q：免费用户能装多少个技能？**

目前没有数量限制。但建议同时启用的技能控制在 5-8 个以内，太多会拖慢首次响应速度。`,
    contentEn: `Out of the box, OpenClaw handles files, writes code, and browses the web. That covers most everyday tasks. But some workflows need specialized tools — generating images, pulling data from Feishu docs, transcribing a meeting recording, or controlling smart home devices from the terminal.

That is where Skills come in. Skills are community-built extension packages that plug directly into your OpenClaw workflow. ClawHub, the official skill marketplace, already has hundreds of skills available for install.

We tested dozens of skills over the past few months and narrowed the list down to 10 that keep showing up in real daily use. Each one below includes what it does, a practical example, and the install command.

## The 10 Skills You Should Know About

### 1. nano-banana-pro — AI Image Generation

Powered by Gemini 2.5 Flash Image, this skill generates images from text prompts and edits existing images. You can set the aspect ratio (16:9, 1:1, 4:3, etc.) and output resolution up to 4K.

**When you would use it:** You are writing a blog post and need a cover image. Instead of opening a separate design tool, describe what you want right in the terminal.

\`\`\`bash
openclaw skills install nano-banana-pro
# Generate an image:
openclaw run "generate a cyberpunk city skyline at night, 16:9 aspect ratio, 2K resolution"
\`\`\`

The generated image lands in your current directory. You can also pass an existing image and ask for edits — "remove the background" or "change the sky to sunset colors" both work.

### 2. feishu-doc — Feishu Document Operations

Read, create, and edit Feishu (Lark) cloud documents. It also supports bitable (multi-dimensional spreadsheets), so you can pull structured data for analysis.

**When you would use it:** Every Friday you need to compile project status into a Feishu doc. Instead of copy-pasting from five different sources, one command pulls everything together.

\`\`\`bash
openclaw skills install feishu-doc
# Read and summarize a Feishu doc:
openclaw run "read the Feishu doc at https://xxx.feishu.cn/docs/xxx and summarize it"
\`\`\`

Requires a Feishu app ID and secret for authentication. See the OpenClaw Feishu tutorial for the full setup walkthrough.

### 3. video-frames — Video Frame Extraction and Analysis

Extracts frames from video files at set intervals (or at keyframes) and runs AI analysis on each frame. Works with local files and URLs.

**When you would use it:** A product manager recorded a competitor's app walkthrough. You need to understand the UI flow quickly. video-frames pulls out the key screens and describes each one.

\`\`\`bash
openclaw skills install video-frames
# Extract a frame every 5 seconds and describe each one:
openclaw run "analyze ./demo.mp4, extract a frame every 5 seconds, describe what is on screen"
\`\`\`

### 4. browser-use — Headless Browser Automation

Launches a real browser in the background. It can click buttons, fill forms, take screenshots, and extract page content. Useful for automated QA testing and web scraping.

**When you would use it:** You want to monitor price changes on an e-commerce site. browser-use opens the page, grabs a screenshot, and extracts the price — all without you touching a browser.

\`\`\`bash
openclaw skills install browser-use
# Open a page and take a screenshot:
openclaw run "open https://example.com and save a screenshot to ./screenshot.png"
\`\`\`

It handles JavaScript-rendered pages, so single-page apps are not a problem. You can also chain actions: "log in with these credentials, navigate to the dashboard, and screenshot the analytics chart."

### 5. github-mcp — Deep GitHub Integration

Goes well beyond basic git commands. github-mcp calls the GitHub API directly: create issues, review PRs, search code across repos, manage releases, and check CI status.

**When you would use it:** During code review, you want to see all comments on a PR plus its CI status. One command pulls everything back.

\`\`\`bash
openclaw skills install github-mcp
# Check PR details:
openclaw run "show all comments and CI status for PR #42 in octocat/hello-world"
\`\`\`

Also great for bulk operations like "close all issues labeled wontfix that have been open for more than 6 months."

### 6. slack-mcp — Slack Messages and Channel Management

Send messages, read channel history, search conversations, and manage channels. Essential for teams that run on Slack.

**When you would use it:** You arrive at work Monday morning and want a quick summary of what happened in #engineering over the weekend.

\`\`\`bash
openclaw skills install slack-mcp
# Summarize recent channel activity:
openclaw run "summarize the last 24 hours of messages in #engineering"
\`\`\`

You can also send messages and thread replies programmatically, which is handy for automated status updates or alerts.

### 7. google-calendar — Google Calendar Management

View, create, and modify calendar events. Supports finding free time slots, which makes scheduling meetings much faster.

**When you would use it:** You need to find a 30-minute window between 3 PM and 5 PM tomorrow for a quick sync. Instead of switching to the calendar app, ask from the terminal.

\`\`\`bash
openclaw skills install google-calendar
# Check tomorrow's schedule:
openclaw run "show all my calendar events for tomorrow"
# Find free time:
openclaw run "find a free 30-minute slot between 3pm and 5pm tomorrow"
\`\`\`

Requires Google OAuth setup on first use. The skill walks you through it.

### 8. whisper-transcribe — Audio and Video Transcription

Uses the OpenAI Whisper model to convert audio and video recordings into text. Handles mixed Chinese-English speech well and supports common formats like MP3, WAV, M4A, and MP4.

**When you would use it:** After a one-hour online meeting, drop the recording file and get a full transcript in about five minutes. Then ask OpenClaw to turn it into meeting notes.

\`\`\`bash
openclaw skills install whisper-transcribe
# Transcribe a meeting recording:
openclaw run "transcribe ./meeting-recording.mp3 and generate meeting notes"
\`\`\`

For long recordings (over 2 hours), the skill automatically splits the file into chunks and processes them in parallel.

### 9. notion-sync — Two-Way Notion Sync

Read from and write to Notion pages and databases. Export Notion content to local Markdown or push local Markdown back to Notion.

**When you would use it:** You keep a personal knowledge base in Notion but prefer writing notes in your local editor. notion-sync keeps both sides in sync.

\`\`\`bash
openclaw skills install notion-sync
# Export a Notion page to local Markdown:
openclaw run "export my Notion page '2026 Reading List' as Markdown"
# Push local changes back:
openclaw run "sync ./notes/reading-list.md back to Notion"
\`\`\`

Requires a Notion integration token. Create one at notion.so/my-integrations and share the relevant pages with it.

### 10. home-assistant — Smart Home Control

Connects to your Home Assistant instance and lets you control smart devices with natural language.

**When you would use it:** Late night coding session, and you want to dim the living room lights without reaching for your phone.

\`\`\`bash
openclaw skills install home-assistant
# Control devices:
openclaw run "dim the living room lights to 30% and turn off the bedroom AC"
\`\`\`

Supports lights, switches, thermostats, covers, and most other Home Assistant entity types. You need to set your HA URL and a long-lived access token in the OpenClaw config.

## How to Choose the Right Skills

More skills is not always better. Each installed skill takes up some context space, and too many can slow down response times. Here is a practical framework for choosing:

**Match your role.** If you are primarily a developer, github-mcp and browser-use should be at the top of your list. If you lean more toward operations or content, feishu-doc and nano-banana-pro will deliver more value day-to-day.

**Match your team's tools.** Your team uses Slack? Install slack-mcp. Uses Feishu? Install feishu-doc. There is no reason to install both unless you genuinely work across both platforms.

**Match your frequency.** Start with skills you would use daily — google-calendar is a common first pick. Skills you would only use occasionally can be installed on demand. Installing and uninstalling takes seconds.

### Skill Management Quick Reference

\`\`\`bash
# Search for skills
openclaw skills search "image generation"

# Install a skill
openclaw skills install nano-banana-pro

# List installed skills
openclaw skills list

# Uninstall a skill
openclaw skills uninstall nano-banana-pro

# Update all skills
openclaw skills update --all

# View skill details and permissions
openclaw skills info nano-banana-pro
\`\`\`

## Frequently Asked Questions

**Q: What should I do if a skill fails to install?**

Check your network connection first. If the network is fine, run \`openclaw skills install <skill-name> --verbose\` to see detailed logs. Most install failures come from network timeouts — retrying once usually resolves it. If a specific version is causing issues, try \`openclaw skills install <skill-name>@latest\` to force the latest release.

**Q: What happens when two skills have overlapping functionality?**

OpenClaw automatically picks the most relevant skill based on your prompt. If it picks the wrong one, you can be explicit: "use nano-banana-pro to generate this image." You can also set priority order in your config with \`openclaw config set skills.priority "nano-banana-pro,other-skill"\`.

**Q: Could a skill leak my data?**

All skills on ClawHub go through a basic security review. However, skills that connect to third-party APIs (Feishu, Slack, Notion, etc.) do send data through those platforms. Install only skills you trust, and run \`openclaw skills info <skill-name>\` before installing to review what permissions it requests.

**Q: Is there a limit on how many skills I can install?**

No hard limit right now. That said, we recommend keeping 5 to 8 skills active at a time. Too many active skills slow down the initial response as OpenClaw loads their context. You can disable a skill without uninstalling it using \`openclaw skills disable <skill-name>\`.

## FAQ

**Q: Which Skill should I install first?**

Start with \`@official/shell\` and \`@official/file-read\` — they unlock most common tasks without extra setup. Add one domain-specific Skill at a time so you can tell which one made the difference.

**Q: Do these Skills cost money?**

The Skills themselves are free. Some wrap paid upstream APIs (OpenAI, Anthropic, image generation, etc.) — you provide your own API key via env vars, and you pay the upstream provider directly.

**Q: Can I run these Skills offline?**

Yes, if the Skill doesn't call an external API. Shell, file, and local-LLM Skills work fully offline. Cloud-dependent Skills (GPT, Gemini, image generation) need network access.

**Q: How is this list different from "OpenClaw Skills List (2026)"?**

This one is the 10-Skill essential starter pack. The [OpenClaw Skills List (2026)](/blog/best-openclaw-skills-2026) is broader — 25 Skills across categories for when you're ready to go deeper.

## Next Steps

- Ready for more? See the broader [OpenClaw Skills List (2026)](/blog/best-openclaw-skills-2026).
- Want to know how Skills work under the hood? Read [OpenClaw AgentSkills Explained](/blog/openclaw-agentskills-clawhub).
- Looking for workflow inspiration? Try the [OpenClaw Workflow Guide](/blog/best-openclaw-workflows-productivity).
- Publish your own Skill — see the [OpenClaw API Reference](/blog/openclaw-api-reference).
`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "技能推荐",
    categoryEn: "Skills",
    tags: ["技能", "ClawHub", "插件", "效率"],
    readingTime: 15,
    image: "/og-image.png"
  },
  {
    id: 4,
    slug: "openclaw-feishu-tutorial",
    title: "OpenClaw 飞书配置完全指南：打造企业级 AI 助手",
    titleEn: "Complete Guide to OpenClaw + Feishu",
    excerpt: "从创建飞书应用到配置机器人，一篇文章解决所有问题。",
    excerptEn: "From creating Feishu app to configuring bot, solve all problems in one article.",
    content: `飞书（Lark）是字节跳动旗下的企业协作平台，在国内企业中广泛使用。很多团队的日常沟通、文档协作、项目管理都跑在飞书上。如果你的团队正在用飞书，把 OpenClaw 接进去是一件性价比极高的事情——相当于给整个团队加了一个随叫随到的 AI 助手。

这篇文章会从零开始，带你完成整个接入流程：创建飞书应用、配置权限、设置 Webhook、连接 OpenClaw、发送消息、处理事件。每一步都有具体操作和代码示例，照着做就行。

## 接入飞书后能做什么？

先说说接入后的实际效果，这样你在配置的时候会更有方向感：

- **群聊 AI 助手：** 在飞书群里 @机器人 提问，AI 直接在群里回复。技术问题、文案润色、数据分析，群成员随时可以用。
- **文档自动化：** 自动读取飞书文档内容，生成摘要、翻译、或者按模板批量生成文档。
- **多维表格同步：** 把外部数据（数据库、API、CSV）自动同步到飞书多维表格，也可以反过来，把多维表格数据导出到其他系统。
- **消息通知：** 代码部署完成、定时任务出错、监控告警——这些事件都可以自动推送到飞书群。
- **审批流程：** 结合飞书审批 API，让 AI 辅助处理审批请求，比如自动补充审批材料或给出建议。

## 第一步：创建飞书应用

首先你需要在飞书开放平台创建一个企业自建应用。这个应用就是 OpenClaw 和飞书之间的"桥梁"。

1. 打开 [飞书开放平台](https://open.feishu.cn/)，用你的飞书账号登录
2. 进入「开发者后台」，点击「创建企业自建应用」
3. 填写应用名称（比如 "OpenClaw AI 助手"）和描述
4. 选择应用图标（可以先用默认的，之后再换）
5. 创建成功后，进入应用详情页

在「凭证与基础信息」页面，你能看到两个关键信息：

- **App ID：** 应用的唯一标识
- **App Secret：** 应用的密钥，务必妥善保管，不要泄露

把这两个值记下来，后面配置 OpenClaw 的时候要用。

## 第二步：配置应用权限

飞书的权限体系比较细致，你需要根据实际需求开启对应权限。以下是常用的权限组合：

### 基础消息权限（必选）

- \`im:message\` — 获取与发送消息
- \`im:message.group_at_msg\` — 接收群聊 @消息
- \`im:chat\` — 获取群信息

### 文档权限（如需文档自动化）

- \`docs:doc:readonly\` — 查看文档
- \`docs:doc\` — 编辑文档
- \`wiki:wiki:readonly\` — 读取知识库

### 多维表格权限（如需数据同步）

- \`bitable:record\` — 读写多维表格记录
- \`bitable:table\` — 管理多维表格

配置好权限后，需要发布应用版本并通过管理员审核。在「版本管理与发布」页面创建一个版本，提交审核。如果你自己就是管理员，直接在后台审批即可。

## 第三步：配置事件订阅

如果你希望机器人能接收并回复群聊消息（大部分人都需要这个功能），就需要配置事件订阅。

1. 在应用详情页，进入「事件订阅」
2. 设置请求网址（Request URL），填入你的 OpenClaw 服务地址，比如 \`https://your-server.com/feishu/webhook\`
3. 获取 **Verification Token** 和 **Encrypt Key**（如果开启了加密）
4. 添加以下事件：
   - \`im.message.receive_v1\` — 接收消息事件
   - \`im.chat.member.bot.added_v1\` — 机器人被拉入群聊
   - \`im.chat.member.bot.deleted_v1\` — 机器人被移出群聊

飞书会向你填的 URL 发送一个验证请求，OpenClaw 会自动处理这个验证，不需要你额外写代码。

## 第四步：配置 OpenClaw

现在回到 OpenClaw 这边。你需要把飞书应用的凭证信息告诉 OpenClaw：

\`\`\`bash
# 配置飞书应用凭证
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw config set feishu.verification_token YOUR_TOKEN

# 启动 OpenClaw 飞书服务
openclaw start --platform feishu
\`\`\`

或者你更喜欢用配置文件的方式，创建或编辑 \`openclaw.yaml\`：

\`\`\`yaml
# openclaw.yaml for Feishu
platforms:
  feishu:
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}
    permissions:
      - im:message
      - docs:doc
      - bitable:record
\`\`\`

注意配置文件里用了环境变量引用（\`\${...}\`），实际的密钥放在环境变量里，不要硬编码在配置文件中。你可以在 \`.env\` 文件里设置这些变量：

\`\`\`bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export FEISHU_VERIFICATION_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxx"
\`\`\`

启动后，终端会显示类似这样的信息：

\`\`\`
[OpenClaw] Feishu platform connected
[OpenClaw] Webhook listening on http://0.0.0.0:9000/feishu/webhook
[OpenClaw] Bot name: OpenClaw AI 助手
[OpenClaw] Ready to receive messages
\`\`\`

## 第五步：测试消息收发

配置完成后，先来测试一下连通性：

\`\`\`bash
# 向指定群聊发送测试消息
openclaw feishu send --chat-id GROUP_CHAT_ID "Hello from OpenClaw!"
\`\`\`

如果一切正常，你会在飞书群里看到机器人发出的消息。

接下来测试群聊 @机器人 的功能：在飞书群里 @你的机器人，发一条消息。OpenClaw 终端会显示收到的消息日志，然后 AI 会自动回复。

如果你想在测试阶段看到更多调试信息：

\`\`\`bash
openclaw start --platform feishu --log-level debug
\`\`\`

## 常见用例

### 用例一：群聊 AI 助手

这是最常见的用法。配置好之后，团队成员在群里 @机器人 就能直接和 AI 对话。

你可以在 \`openclaw.yaml\` 里定义机器人的人设和能力范围：

\`\`\`yaml
platforms:
  feishu:
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}
    bot:
      system_prompt: |
        你是团队的技术助手，擅长回答编程问题、Review 代码、解释技术概念。
        回答尽量简洁，代码示例用 Markdown 代码块格式。
      max_context_messages: 20
\`\`\`

### 用例二：文档自动化

自动处理飞书文档，比如每周自动生成周报模板，或者把会议纪要自动翻译成英文。

\`\`\`bash
# 读取飞书文档并翻译
openclaw run "读取飞书文档 'Q2 产品规划' 的内容，翻译成英文，保存到飞书英文文件夹"
\`\`\`

### 用例三：多维表格数据同步

把外部数据定期同步到飞书多维表格，或者反过来读取多维表格数据进行分析。

\`\`\`bash
# 把 CSV 数据导入多维表格
openclaw run "读取 ./sales-data.csv，同步到飞书多维表格 '销售数据看板'"

# 从多维表格生成报告
openclaw run "读取飞书多维表格 '客户反馈表' 的数据，生成本周客户反馈分析报告"
\`\`\`

## 故障排查

### 连接失败：Webhook URL 不可达

最常见的问题。检查以下几点：

1. **服务器是否启动：** 确认 \`openclaw start --platform feishu\` 正在运行
2. **端口是否开放：** 默认端口 9000，确认防火墙没有拦截
3. **域名是否正确解析：** 如果使用域名，确认 DNS 解析正确
4. **HTTPS 证书：** 飞书要求 Webhook URL 必须是 HTTPS，确认你的 SSL 证书有效

\`\`\`bash
# 快速检查端口是否监听
curl -v http://localhost:9000/feishu/webhook
\`\`\`

### 消息发送成功但没有回复

1. 检查事件订阅是否正确配置了 \`im.message.receive_v1\`
2. 确认 Verification Token 配置正确
3. 查看 OpenClaw 日志是否有报错：\`openclaw logs --platform feishu\`

### 权限不足报错

飞书的权限需要管理员审批才能生效。如果看到 "permission denied" 相关错误：

1. 确认权限已经在应用配置里添加
2. 确认应用版本已发布并通过审核
3. 有些权限需要联系企业管理员单独开通

### Token 过期

飞书的 tenant_access_token 有效期是 2 小时。OpenClaw 会自动刷新，但如果你看到 token 相关错误，可以手动刷新：

\`\`\`bash
openclaw feishu refresh-token
\`\`\`

## 安全建议

- **不要在代码或配置文件中硬编码 App Secret，** 使用环境变量或密钥管理服务
- **开启飞书的 Encrypt Key，** 对事件回调数据进行加密
- **限制机器人可加入的群聊，** 在飞书后台设置可用范围
- **定期轮换 App Secret，** 特别是团队成员变动后
- **在 OpenClaw 配置中开启消息日志，** 方便审计和排查问题

## 常见问题

**Q：OpenClaw 飞书服务需要一直运行吗？**

是的。OpenClaw 需要监听飞书的 Webhook 回调，所以服务需要持续运行。建议用 systemd、Docker 或者 pm2 来管理进程，确保服务在崩溃后自动重启。如果你不需要实时响应群聊消息，只是偶尔发送通知，也可以按需启动。

**Q：一个飞书应用可以同时在多个群使用吗？**

可以。机器人被拉入哪个群，就能在哪个群响应。你不需要为每个群创建单独的应用。但你可以在 \`openclaw.yaml\` 里针对不同群配置不同的行为（比如不同的 system_prompt）。

**Q：飞书国际版（Lark）和国内版有区别吗？**

API 基本相同，主要区别是域名不同。国内版用 \`open.feishu.cn\`，国际版用 \`open.larksuite.com\`。在 OpenClaw 配置里指定区域即可：

\`\`\`bash
openclaw config set feishu.region international  # 国际版
openclaw config set feishu.region china           # 国内版（默认）
\`\`\`

**Q：消息有长度限制吗？**

飞书单条消息的长度限制大约是 30,000 个字符。如果 AI 回复超过这个长度，OpenClaw 会自动拆分成多条消息发送。对于特别长的内容（比如完整的代码文件），建议让 AI 生成飞书文档链接而不是直接在群里发出来。`,
    contentEn: `Feishu (also known as Lark outside of China) is ByteDance's enterprise collaboration platform. It is widely used across Chinese companies for team communication, document collaboration, and project management. If your team already lives in Feishu, connecting OpenClaw to it gives everyone access to an AI assistant that can answer questions in group chats, process documents, sync data to bitables, and send automated notifications. The return on the setup time is enormous.

This guide walks you through the entire process from scratch: creating a Feishu app, configuring permissions, setting up the webhook, connecting OpenClaw, sending messages, and handling events. Every step includes concrete instructions and code examples. Follow along and you will have a working Feishu integration in about 30 minutes.

## What Can You Do After Connecting?

Before diving into setup, here is what the finished integration looks like in practice:

- **Group chat AI assistant:** Team members mention the bot in any Feishu group and get AI-powered answers instantly. Code questions, copywriting help, data analysis — all accessible without leaving the chat.
- **Document automation:** Automatically read Feishu documents, generate summaries, translate content, or create new documents from templates.
- **Bitable sync:** Push external data (databases, API responses, CSV files) into Feishu bitables, or pull bitable data out for processing elsewhere.
- **Message notifications:** Deployment completions, cron job failures, monitoring alerts — route any event to a Feishu group automatically.
- **Approval workflows:** Combine with Feishu's approval API to have AI assist with approval requests by auto-filling supporting materials or providing recommendations.

## Step 1: Create a Feishu App

First, create an enterprise custom app on the Feishu Open Platform. This app acts as the bridge between OpenClaw and Feishu.

1. Go to the [Feishu Open Platform](https://open.feishu.cn/) and sign in with your Feishu account. For the international version, use [open.larksuite.com](https://open.larksuite.com/).
2. Navigate to the Developer Console and click **Create Custom App**.
3. Enter an app name (for example, "OpenClaw AI Assistant") and a short description.
4. Choose an icon. The default is fine for now; you can change it later.
5. After creation, open the app details page.

On the **Credentials & Basic Info** page, you will find two critical values:

- **App ID:** The unique identifier for your app.
- **App Secret:** The secret key. Keep this safe and never expose it in client-side code or public repositories.

Copy both values somewhere secure — you will need them when configuring OpenClaw.

## Step 2: Configure Permissions

Feishu has a granular permission system. Enable the permissions that match your use case.

### Basic messaging permissions (required)

- \`im:message\` — Send and receive messages
- \`im:message.group_at_msg\` — Receive group @-mention messages
- \`im:chat\` — Access group chat information

### Document permissions (if you need document automation)

- \`docs:doc:readonly\` — Read documents
- \`docs:doc\` — Edit documents
- \`wiki:wiki:readonly\` — Read wiki pages

### Bitable permissions (if you need data sync)

- \`bitable:record\` — Read and write bitable records
- \`bitable:table\` — Manage bitable tables

After configuring permissions, you need to publish an app version and get admin approval. Go to **Version Management & Release**, create a new version, and submit it for review. If you are the admin yourself, you can approve it directly from the admin console.

## Step 3: Set Up Event Subscriptions

If you want the bot to receive and reply to group messages (most people do), you need to configure event subscriptions.

1. In the app details page, go to **Event Subscriptions**.
2. Set the **Request URL** to your OpenClaw server's webhook endpoint, for example: \`https://your-server.com/feishu/webhook\`.
3. Copy the **Verification Token** (and the **Encrypt Key** if you enable encryption).
4. Subscribe to these events:
   - \`im.message.receive_v1\` — Receive message events
   - \`im.chat.member.bot.added_v1\` — Bot added to a group
   - \`im.chat.member.bot.deleted_v1\` — Bot removed from a group

Feishu will send a verification request to your URL. OpenClaw handles this verification automatically, so you do not need to write any extra code.

## Step 4: Configure OpenClaw

Now switch to the OpenClaw side. You need to provide the Feishu app credentials:

\`\`\`bash
# Configure OpenClaw for Feishu
openclaw config set feishu.app_id YOUR_APP_ID
openclaw config set feishu.app_secret YOUR_APP_SECRET
openclaw config set feishu.verification_token YOUR_TOKEN

# Start OpenClaw with Feishu platform
openclaw start --platform feishu
\`\`\`

Alternatively, if you prefer a configuration file, create or edit \`openclaw.yaml\`:

\`\`\`yaml
# openclaw.yaml for Feishu
platforms:
  feishu:
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}
    permissions:
      - im:message
      - docs:doc
      - bitable:record
\`\`\`

Note the \`\${...}\` syntax — these reference environment variables. Store actual secrets in a \`.env\` file or your system's environment, not hardcoded in the config:

\`\`\`bash
export FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
export FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export FEISHU_VERIFICATION_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxx"
\`\`\`

After starting, you should see output like this:

\`\`\`
[OpenClaw] Feishu platform connected
[OpenClaw] Webhook listening on http://0.0.0.0:9000/feishu/webhook
[OpenClaw] Bot name: OpenClaw AI Assistant
[OpenClaw] Ready to receive messages
\`\`\`

## Step 5: Test the Connection

With everything configured, test that messages flow correctly:

\`\`\`bash
# Test Feishu connection
openclaw feishu send --chat-id GROUP_CHAT_ID "Hello from OpenClaw!"
\`\`\`

If everything is set up correctly, you will see the bot's message appear in the Feishu group.

Next, test the @-mention flow: go to a Feishu group that the bot has joined, type \`@OpenClaw AI Assistant\` followed by a question. The OpenClaw terminal will log the incoming message, and the AI will reply in the group.

For more detailed debugging output during testing:

\`\`\`bash
openclaw start --platform feishu --log-level debug
\`\`\`

## Common Use Cases

### Use Case 1: Group Chat AI Assistant

This is the most popular use case. Once configured, anyone in the group can mention the bot and get an instant AI response.

You can customize the bot's personality and scope in \`openclaw.yaml\`:

\`\`\`yaml
platforms:
  feishu:
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}
    bot:
      system_prompt: |
        You are the team's technical assistant. You specialize in answering
        programming questions, reviewing code snippets, and explaining
        technical concepts. Keep answers concise and use Markdown code
        blocks for code examples.
      max_context_messages: 20
\`\`\`

### Use Case 2: Document Automation

Automate repetitive document tasks. For example, generate weekly report templates every Monday, or translate meeting notes into another language.

\`\`\`bash
# Read a Feishu doc and translate it
openclaw run "Read the Feishu document 'Q2 Product Roadmap', translate it to English, and save it to the English docs folder"
\`\`\`

### Use Case 3: Bitable Data Sync

Push external data into Feishu bitables on a schedule, or pull bitable data for analysis.

\`\`\`bash
# Import CSV data into a bitable
openclaw run "Read ./sales-data.csv and sync it to the Feishu bitable 'Sales Dashboard'"

# Generate a report from bitable data
openclaw run "Read the Feishu bitable 'Customer Feedback' and generate a weekly feedback analysis report"
\`\`\`

## Troubleshooting

### Webhook URL unreachable

This is the most common issue. Check the following:

1. **Is the server running?** Confirm that \`openclaw start --platform feishu\` is active.
2. **Is the port open?** The default port is 9000. Make sure your firewall allows inbound traffic on that port.
3. **Does the domain resolve correctly?** If you are using a custom domain, verify DNS resolution with \`dig\` or \`nslookup\`.
4. **Is HTTPS configured?** Feishu requires webhook URLs to use HTTPS. Confirm your SSL certificate is valid and not expired.

\`\`\`bash
# Quick check that the port is listening
curl -v http://localhost:9000/feishu/webhook
\`\`\`

### Messages are sent but the bot does not reply

1. Verify that the \`im.message.receive_v1\` event subscription is configured correctly.
2. Double-check that the Verification Token matches what Feishu shows in the app settings.
3. Inspect the OpenClaw logs for errors: \`openclaw logs --platform feishu\`.

### Permission denied errors

Feishu permissions only take effect after admin approval. If you see "permission denied" in the logs:

1. Confirm the permissions are added in the app configuration.
2. Confirm the app version has been published and approved.
3. Some permissions require the enterprise admin to grant them separately — contact your admin if needed.

### Token expiration

Feishu's \`tenant_access_token\` expires every 2 hours. OpenClaw refreshes it automatically, but if you encounter token-related errors, you can force a manual refresh:

\`\`\`bash
openclaw feishu refresh-token
\`\`\`

## Security Recommendations

- **Never hardcode the App Secret** in source code or config files. Use environment variables or a secrets manager.
- **Enable the Encrypt Key** in Feishu's event subscription settings to encrypt callback payloads.
- **Restrict which groups the bot can join** by configuring the app's availability scope in the Feishu admin console.
- **Rotate the App Secret periodically,** especially after team membership changes.
- **Enable message logging in OpenClaw** for auditing and debugging: \`openclaw config set feishu.log_messages true\`.

## FAQ

**Q: Does the OpenClaw Feishu service need to run continuously?**

Yes. OpenClaw needs to listen for Feishu's webhook callbacks, so the service must stay running. Use systemd, Docker, or pm2 to manage the process and ensure automatic restarts after crashes. If you only need to send occasional notifications and do not need real-time group chat responses, you can start the service on demand instead.

**Q: Can one Feishu app work in multiple groups at the same time?**

Absolutely. The bot responds in whichever group it has been added to. You do not need a separate app for each group. If you want different behavior per group (for instance, different system prompts), you can configure group-specific overrides in \`openclaw.yaml\`.

**Q: Is there a difference between Feishu (China) and Lark (international)?**

The APIs are nearly identical. The main difference is the base domain: \`open.feishu.cn\` for China and \`open.larksuite.com\` for international. Set the region in OpenClaw to switch between them:

\`\`\`bash
openclaw config set feishu.region international  # Lark (international)
openclaw config set feishu.region china           # Feishu (default)
\`\`\`

**Q: Is there a message length limit?**

Feishu's single message limit is approximately 30,000 characters. If the AI response exceeds this, OpenClaw automatically splits it into multiple messages. For very long content like full code files, it is better to have the AI create a Feishu document and share the link in the group rather than pasting everything inline.`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "配置教程",
    categoryEn: "Tutorial",
    tags: ["飞书", "配置", "企业", "机器人"],
    readingTime: 25,
    image: "/og-image.png"
  },
  {
    id: 5,
    slug: "openclaw-deployment-guide",
    title: "OpenClaw 本地部署 vs 云端部署：如何选择？",
    titleEn: "OpenClaw Deployment: Local vs VPS vs Docker vs Cloud (2026)",
    excerpt: "对比 5 种部署方式：本地开发机、家庭服务器、VPS、云平台一键部署、企业私有云，找到最适合你的方案。",
    excerptEn: "Compare 5 deployment methods with cost breakdowns. Local dev machine, home server, VPS, Docker Compose, and one-click cloud deploy on Railway/Render/Fly.io.",
    content: `OpenClaw 支持多种部署方式：本地电脑、家庭服务器、VPS、云平台一键部署、企业私有云。选错了可能白花钱，选对了能省时省力。这篇文章详细对比五种方案，帮你找到最适合自己的部署方式。

## 部署方式概览

| 部署方式 | 月成本 | 难度 | 可用性 | 最佳场景 |
|----------|--------|------|--------|----------|
| 本地开发机 | 免费 | 低 | 仅本机 | 尝鲜、开发调试 |
| 家庭服务器 | $2-5 电费 | 中 | 24小时（局域网） | 隐私优先、家庭自动化 |
| VPS 云服务器 | $5-24 | 中 | 24小时（公网） | 个人长期使用 |
| 云平台一键部署 | $5-30 | 低 | 24小时（公网） | 不想运维 |
| 企业私有云 | $50+ | 高 | 24小时（高可用） | 团队/企业级 |

## 方案一：本地开发机部署

### 适合人群

- 第一次接触 OpenClaw，想先试试
- 开发者本地调试和开发技能（Skills）
- 不需要 24 小时在线，用的时候启动就行

### 优势

- 零成本，使用现有设备
- 数据完全本地，隐私最高
- 无需网络配置，即装即用
- 修改配置立即生效，开发迭代最快

### 劣势

- 仅在本机可用，其他设备无法访问
- 关机后 Bot 断线
- 无法对接 Telegram / Discord（因为它们需要公网 Webhook）

### 部署步骤

\`\`\`bash
# 1. 安装
npm install -g openclaw

# 2. 配置模型
openclaw config set model anthropic/claude-3.5-sonnet
openclaw config set apiKey YOUR_API_KEY

# 3. 启动 Web 界面（本地访问 http://localhost:3000）
openclaw web

# 4. 或者直接在终端对话
openclaw chat
\`\`\`

### 成本明细

| 项目 | 费用 |
|------|------|
| 硬件 | $0（用现有电脑） |
| 网络 | $0 |
| LLM API | 按使用量（轻度使用约 $3-8/月） |
| **合计** | **$3-8/月** |

## 方案二：家庭服务器部署

### 适合人群

- 手头有闲置的 NAS、树莓派或旧电脑
- 需要 24 小时在线但不想花服务器费用
- 重视数据隐私，不想把数据放到云端
- 搭配智能家居自动化

### 优势

- 成本极低（利用现有设备，只需电费）
- 数据完全本地存储
- 24 小时可用
- 通过 Tailscale/ZeroTier 可在外网访问

### 劣势

- 需要基础的 Linux 知识
- 硬件故障风险（没有自动备份）
- 家庭网络不如机房稳定
- 需要配置内网穿透才能对接 Telegram

### 部署步骤

\`\`\`bash
# 1. 安装 Node.js（树莓派示例）
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
sudo apt install -y nodejs

# 2. 安装 OpenClaw
npm install -g openclaw

# 3. 配置远程访问（通过 Tailscale）
openclaw tailscale setup
# Tailscale 会生成一个稳定的内网 IP，在任何设备上都能访问

# 4. 启动 Telegram Bot
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw telegram start

# 5. 配置开机自启
sudo openclaw service install
sudo systemctl enable openclaw
\`\`\`

### 成本明细

| 项目 | 费用 |
|------|------|
| 硬件 | $0（使用闲置设备）或 $80-120（树莓派 5） |
| 电费 | $2-5/月（树莓派约 $2，旧电脑约 $5） |
| 网络 | $0（使用家庭宽带） |
| Tailscale | $0（免费版支持 100 台设备） |
| LLM API | 按使用量 |
| **合计** | **$5-13/月** |

## 方案三：VPS 云服务器部署

### 适合人群

- 需要稳定的 24/7 服务
- 想要公网访问，随时随地使用
- 愿意花适度的钱换取稳定性
- 需要对接 Telegram / Discord / Slack

### 推荐服务商

| 服务商 | 最低价格 | 推荐配置 | 特点 |
|--------|----------|----------|------|
| DigitalOcean | $6/月 | 1核1G | 简单易用，文档好 |
| Vultr | $5/月 | 1核1G | 全球 32 个节点 |
| Hetzner | €3.79/月 | 2核2G | 性价比最高 |
| 阿里云 | ¥50/月 | 2核2G | 国内访问快 |
| AWS Lightsail | $5/月 | 1核1G | 生态最完整 |

### 部署步骤

\`\`\`bash
# 1. SSH 连接到服务器
ssh root@your-server-ip

# 2. 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 3. 安装 OpenClaw
npm install -g openclaw

# 4. 配置模型和 API Key
openclaw config set model anthropic/claude-3.5-sonnet
openclaw config set apiKey YOUR_API_KEY

# 5. 配置 Telegram（可选）
openclaw config set telegram.token YOUR_BOT_TOKEN

# 6. 注册为系统服务
openclaw service install
systemctl enable openclaw
systemctl start openclaw

# 7. 验证运行状态
systemctl status openclaw
openclaw status
\`\`\`

### 安全加固（重要）

\`\`\`bash
# 配置防火墙
ufw allow 22/tcp    # SSH
ufw allow 443/tcp   # HTTPS
ufw enable

# 创建非 root 用户运行
adduser openclaw
su - openclaw
npm install -g openclaw
\`\`\`

### 成本明细

| 项目 | 费用 |
|------|------|
| 服务器 | $5-24/月 |
| 域名（可选） | $10-15/年 |
| LLM API | 按使用量 |
| **合计** | **$8-32/月** |

## 方案四：云平台一键部署

### 适合人群

- 不想手动配置服务器
- 希望点几下按钮就能上线
- 需要自动扩缩容

### 支持的平台

| 平台 | 部署方式 | 月费 | 特点 |
|------|----------|------|------|
| Railway | 一键模板 | $5 起 | 最简单，GitHub 连接后自动部署 |
| Render | Docker 部署 | $7 起 | 免费层可用（有限制） |
| Fly.io | CLI 部署 | $5 起 | 全球边缘节点 |
| Vercel | Serverless | $0-20 | 适合 Web 界面部署 |

### 以 Railway 为例

\`\`\`bash
# 方法一：使用模板（最简单）
# 访问 https://railway.app/template/openclaw
# 点击 Deploy，填入环境变量即可

# 方法二：CLI 部署
npm install -g @railway/cli
railway login
railway init
railway up

# 设置环境变量
railway variables set OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
railway variables set OPENCLAW_API_KEY=YOUR_API_KEY
railway variables set TELEGRAM_TOKEN=YOUR_BOT_TOKEN
\`\`\`

### 成本明细

| 项目 | 费用 |
|------|------|
| 平台费 | $5-20/月 |
| LLM API | 按使用量 |
| **合计** | **$8-28/月** |

## 方案五：企业私有云部署

### 适合人群

- 公司/团队使用，需要多人共享
- 有合规要求（数据不能出境）
- 需要高可用（SLA 99.9%+）

### 架构概览

\`\`\`
负载均衡（Nginx/Traefik）
    ├── OpenClaw 实例 1
    ├── OpenClaw 实例 2
    └── OpenClaw 实例 3
         ├── Redis（会话存储）
         └── PostgreSQL（日志/审计）
\`\`\`

### Docker Compose 部署

\`\`\`yaml
# docker-compose.yml
version: "3.8"
services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "3000:3000"
    environment:
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - OPENCLAW_API_KEY=\${API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    restart: always
    deploy:
      replicas: 3

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs

volumes:
  redis_data:
\`\`\`

\`\`\`bash
# 启动
docker compose up -d

# 查看状态
docker compose ps

# 扩缩容
docker compose up -d --scale openclaw=5
\`\`\`

### 成本明细

| 项目 | 费用 |
|------|------|
| 服务器集群 | $50-200/月 |
| 运维人力 | 视团队情况 |
| LLM API | 按使用量（可谈企业折扣） |
| **合计** | **$80-300+/月** |

## 决策流程图

\`\`\`
需要 24 小时在线？
├── 否 → 本地开发机（最简单，零成本）
└── 是 → 需要公网访问？
    ├── 否 → 家庭服务器（成本最低）
    └── 是 → 有运维经验？
        ├── 否 → 云平台一键部署（最省心）
        └── 是 → 多人使用？
            ├── 否 → VPS 云服务器（性价比最高）
            └── 是 → 企业私有云（最专业）
\`\`\`

## 从一种方式迁移到另一种

OpenClaw 的配置文件是纯文本格式，迁移非常简单。

### 从本地迁移到 VPS

\`\`\`bash
# 在本地导出配置
openclaw config export > my-config.json

# 复制到 VPS
scp my-config.json root@your-server-ip:/tmp/

# 在 VPS 上导入
openclaw config import /tmp/my-config.json
openclaw service install
systemctl start openclaw
\`\`\`

### 从 VPS 迁移到 Docker

\`\`\`bash
# 导出配置
openclaw config export > my-config.json

# 在 docker-compose.yml 中挂载配置
# volumes:
#   - ./my-config.json:/root/.openclaw/config.json
docker compose up -d
\`\`\`

### 迁移注意事项

- API Key 等敏感信息建议使用环境变量，不要写在配置文件里
- 对话历史存储在本地数据库中，需要单独迁移 \`~/.openclaw/data/\` 目录
- 技能（Skills）需要在新环境重新安装：\`openclaw skills install --from-lock\`

## 常见问题

**Q：本地部署能对接 Telegram Bot 吗？**

不能直接对接。Telegram Bot 需要公网 Webhook 或长轮询，本地网络通常没有公网 IP。解决办法有两个：用 Tailscale 打通网络，或者用 ngrok 临时暴露本地端口。但如果你需要稳定的 Telegram Bot，建议直接用 VPS 或云平台方案。

**Q：VPS 配置选多大合适？**

OpenClaw 本身非常轻量，1 核 1GB 内存就够跑了。瓶颈在 LLM API 请求，不在本地计算。如果你要跑本地模型（Ollama），那至少需要 8GB 内存和一块 GPU。

**Q：云平台一键部署和 VPS 有什么区别？**

一键部署帮你管理了操作系统、安全更新、SSL 证书、自动重启等运维工作。VPS 这些都要自己搞。一键部署通常更贵一些，但省掉了运维时间。如果你不想花时间在服务器管理上，选一键部署。如果你想完全控制环境，选 VPS。

**Q：企业部署需要注意什么？**

三个关键点：一是数据安全，确保 API Key 通过密钥管理服务（如 AWS Secrets Manager 或 HashiCorp Vault）管理，不要硬编码；二是访问控制，通过反向代理配置用户认证；三是审计日志，开启 \`openclaw config set logging.audit true\` 记录所有用户操作。`,
    contentEn: `OpenClaw supports multiple deployment methods: local machine, home server, VPS, one-click cloud platform, and enterprise private cloud. Pick the wrong one and you waste money or hit limitations. This article compares all five options in detail to help you find the best fit.

## Deployment Overview

| Method | Monthly Cost | Difficulty | Availability | Best For |
|--------|-------------|------------|--------------|----------|
| Local Machine | Free | Low | Local only | Trying out, dev debugging |
| Home Server | $2-5 electricity | Medium | 24/7 (LAN) | Privacy-first, home automation |
| VPS Cloud | $5-24 | Medium | 24/7 (public) | Personal long-term use |
| One-Click Deploy | $5-30 | Low | 24/7 (public) | Zero ops overhead |
| Enterprise Private Cloud | $50+ | High | 24/7 (HA) | Team / enterprise |

## Option 1: Local Machine

### Best For

- First-time users who want to try OpenClaw
- Developers debugging and building skills locally
- No 24/7 requirement — just start it when you need it

### Pros

- Zero cost — uses your existing computer
- All data stays local, maximum privacy
- No network configuration needed, works out of the box
- Configuration changes take effect immediately, fastest dev iteration

### Cons

- Only accessible on your machine, other devices cannot connect
- Bot goes offline when you shut down the computer
- Cannot connect to Telegram / Discord (they require a public webhook)

### Deployment Steps

\`\`\`bash
# 1. Install
npm install -g openclaw

# 2. Configure your model
openclaw config set model anthropic/claude-3.5-sonnet
openclaw config set apiKey YOUR_API_KEY

# 3. Launch the web interface (local access at http://localhost:3000)
openclaw web

# 4. Or chat directly in the terminal
openclaw chat
\`\`\`

### Cost Breakdown

| Item | Cost |
|------|------|
| Hardware | $0 (existing computer) |
| Network | $0 |
| LLM API | Pay per use (light use roughly $3-8/month) |
| **Total** | **$3-8/month** |

## Option 2: Home Server

### Best For

- You have a spare NAS, Raspberry Pi, or old laptop
- Need 24/7 availability without paying for a cloud server
- Privacy matters — you do not want data in the cloud
- Pairing with smart home automation

### Pros

- Extremely low cost (reuse existing hardware, just pay electricity)
- All data stored locally
- Available around the clock
- Can be reached from outside via Tailscale or ZeroTier

### Cons

- Requires basic Linux knowledge
- Risk of hardware failure (no automatic backups)
- Home networks are less stable than data centers
- Connecting to Telegram requires a tunnel or reverse proxy

### Deployment Steps

\`\`\`bash
# 1. Install Node.js (Raspberry Pi example)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
sudo apt install -y nodejs

# 2. Install OpenClaw
npm install -g openclaw

# 3. Set up remote access via Tailscale
openclaw tailscale setup
# Tailscale assigns a stable IP you can reach from any device

# 4. Start the Telegram bot
openclaw config set telegram.token YOUR_BOT_TOKEN
openclaw telegram start

# 5. Enable auto-start on boot
sudo openclaw service install
sudo systemctl enable openclaw
\`\`\`

### Cost Breakdown

| Item | Cost |
|------|------|
| Hardware | $0 (existing device) or $80-120 (Raspberry Pi 5) |
| Electricity | $2-5/month (Pi ~$2, old laptop ~$5) |
| Network | $0 (home broadband) |
| Tailscale | $0 (free tier supports 100 devices) |
| LLM API | Pay per use |
| **Total** | **$5-13/month** |

## Option 3: VPS Cloud Server

### Best For

- Need stable, always-on service
- Want public internet access from anywhere
- Willing to spend a moderate amount for reliability
- Need to connect Telegram / Discord / Slack

### Recommended Providers

| Provider | Starting Price | Recommended Spec | Highlights |
|----------|----------------|------------------|------------|
| DigitalOcean | $6/month | 1 vCPU, 1GB | Simple, great docs |
| Vultr | $5/month | 1 vCPU, 1GB | 32 global locations |
| Hetzner | EUR 3.79/month | 2 vCPU, 2GB | Best price-performance |
| Alibaba Cloud | CNY 50/month | 2 vCPU, 2GB | Fast in China |
| AWS Lightsail | $5/month | 1 vCPU, 1GB | Most complete ecosystem |

### Deployment Steps

\`\`\`bash
# 1. SSH into your server
ssh root@your-server-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 3. Install OpenClaw
npm install -g openclaw

# 4. Configure model and API key
openclaw config set model anthropic/claude-3.5-sonnet
openclaw config set apiKey YOUR_API_KEY

# 5. Configure Telegram (optional)
openclaw config set telegram.token YOUR_BOT_TOKEN

# 6. Register as a system service
openclaw service install
systemctl enable openclaw
systemctl start openclaw

# 7. Verify it is running
systemctl status openclaw
openclaw status
\`\`\`

### Security Hardening (Important)

\`\`\`bash
# Set up a firewall
ufw allow 22/tcp    # SSH
ufw allow 443/tcp   # HTTPS
ufw enable

# Create a non-root user
adduser openclaw
su - openclaw
npm install -g openclaw
\`\`\`

### Cost Breakdown

| Item | Cost |
|------|------|
| Server | $5-24/month |
| Domain (optional) | $10-15/year |
| LLM API | Pay per use |
| **Total** | **$8-32/month** |

## Option 4: One-Click Cloud Deploy

### Best For

- You do not want to manually configure a server
- You want to click a few buttons and be online
- You need auto-scaling

### Supported Platforms

| Platform | Deploy Method | Monthly Cost | Highlights |
|----------|---------------|-------------|------------|
| Railway | Template | From $5 | Simplest — connect GitHub and auto-deploy |
| Render | Docker | From $7 | Free tier available (with limits) |
| Fly.io | CLI | From $5 | Global edge nodes |
| Vercel | Serverless | $0-20 | Good for web UI deployment |

### Railway Example

\`\`\`bash
# Method 1: Use a template (simplest)
# Visit https://railway.app/template/openclaw
# Click Deploy, fill in environment variables, done

# Method 2: CLI deploy
npm install -g @railway/cli
railway login
railway init
railway up

# Set environment variables
railway variables set OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
railway variables set OPENCLAW_API_KEY=YOUR_API_KEY
railway variables set TELEGRAM_TOKEN=YOUR_BOT_TOKEN
\`\`\`

### Cost Breakdown

| Item | Cost |
|------|------|
| Platform fee | $5-20/month |
| LLM API | Pay per use |
| **Total** | **$8-28/month** |

## Option 5: Enterprise Private Cloud

### Best For

- Company or team use with multiple users
- Compliance requirements (data cannot leave the country)
- High availability needed (SLA 99.9%+)

### Architecture Overview

\`\`\`
Load Balancer (Nginx / Traefik)
    ├── OpenClaw Instance 1
    ├── OpenClaw Instance 2
    └── OpenClaw Instance 3
         ├── Redis (session storage)
         └── PostgreSQL (logs / audit)
\`\`\`

### Docker Compose Deployment

\`\`\`yaml
# docker-compose.yml
version: "3.8"
services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "3000:3000"
    environment:
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - OPENCLAW_API_KEY=\${API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    restart: always
    deploy:
      replicas: 3

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs

volumes:
  redis_data:
\`\`\`

\`\`\`bash
# Start
docker compose up -d

# Check status
docker compose ps

# Scale up or down
docker compose up -d --scale openclaw=5
\`\`\`

### Cost Breakdown

| Item | Cost |
|------|------|
| Server cluster | $50-200/month |
| Ops labor | Varies by team |
| LLM API | Pay per use (enterprise discounts available) |
| **Total** | **$80-300+/month** |

## Decision Flowchart

\`\`\`
Need 24/7 availability?
├── No → Local Machine (simplest, zero cost)
└── Yes → Need public internet access?
    ├── No → Home Server (lowest cost)
    └── Yes → Have ops experience?
        ├── No → One-Click Cloud Deploy (least hassle)
        └── Yes → Multiple users?
            ├── No → VPS Cloud Server (best value)
            └── Yes → Enterprise Private Cloud (most robust)
\`\`\`

## Migrating Between Deployment Methods

OpenClaw configuration files are plain text, so migration is straightforward.

### Local to VPS

\`\`\`bash
# Export config on your local machine
openclaw config export > my-config.json

# Copy to the VPS
scp my-config.json root@your-server-ip:/tmp/

# Import on the VPS
openclaw config import /tmp/my-config.json
openclaw service install
systemctl start openclaw
\`\`\`

### VPS to Docker

\`\`\`bash
# Export config
openclaw config export > my-config.json

# Mount the config in docker-compose.yml
# volumes:
#   - ./my-config.json:/root/.openclaw/config.json
docker compose up -d
\`\`\`

### Migration Notes

- Store sensitive values like API keys in environment variables, not in the config file
- Conversation history lives in a local database — you need to migrate the \`~/.openclaw/data/\` directory separately
- Skills need to be reinstalled in the new environment: \`openclaw skills install --from-lock\`

## Frequently Asked Questions

**Q: Can I connect a Telegram bot from a local machine deployment?**

Not directly. Telegram bots require a public webhook or long polling over the internet, and local machines typically do not have a public IP. Two workarounds: use Tailscale to bridge the network, or use ngrok to temporarily expose a local port. If you need a stable Telegram bot, go with VPS or one-click cloud deploy instead.

**Q: What VPS specs should I choose?**

OpenClaw itself is very lightweight — 1 vCPU and 1GB of RAM is enough. The bottleneck is LLM API requests, not local compute. If you plan to run local models via Ollama, you need at least 8GB of RAM and a GPU.

**Q: What is the difference between one-click deploy and VPS?**

One-click platforms handle OS management, security updates, SSL certificates, and automatic restarts for you. With a VPS you manage all of that yourself. One-click is usually slightly more expensive, but saves operations time. Choose one-click if you do not want to spend time on server maintenance. Choose VPS if you want full control over the environment.

**Q: What should I watch out for in enterprise deployments?**

Three key areas: first, data security — manage API keys through a secrets manager (like AWS Secrets Manager or HashiCorp Vault), never hardcode them; second, access control — configure user authentication through a reverse proxy; third, audit logging — enable \`openclaw config set logging.audit true\` to record all user actions.`,
    author: "OpenClaw 101",
    date: "2026-03-17",
    category: "部署指南",
    categoryEn: "Deployment",
    tags: ["部署", "VPS", "云服务器", "教程"],
    readingTime: 18,
    image: "/og-image.png"
  },
  {
    id: 6,
    slug: "how-to-install-openclaw",
    title: "如何安装 OpenClaw：2026 最新完整指南（macOS / Linux / Windows）",
    titleEn: "How to Install OpenClaw on Mac, Linux & Windows (2026)",
    excerpt: "从零开始安装 OpenClaw 的完整指南，覆盖 macOS、Linux、Windows 三大平台，包括常见问题排查。",
    excerptEn: "Three installation methods: npm, Docker, and from source. Includes first-time setup, API key configuration, model selection, and troubleshooting common errors.",
    content: `这是一篇面向完全新手的 OpenClaw 安装指南。无论你使用 macOS、Linux 还是 Windows，跟着这篇教程走，都能顺利完成安装并开始使用。本文覆盖三种安装方式（npm、Docker、源码编译）、三大平台的详细步骤、首次配置、配置文件详解、版本升级，以及常见问题排查。

## 前置条件

在安装 OpenClaw 之前，你需要确保系统满足以下要求：

| 要求 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Node.js | 18.x | 20.x+ |
| npm | 9.x | 10.x+ |
| 内存 | 2GB | 4GB+ |
| 磁盘空间 | 500MB | 1GB+ |
| 操作系统 | macOS 12+ / Ubuntu 20.04+ / Windows 10+ (WSL2) | 最新稳定版 |

OpenClaw 的核心运行时基于 Node.js，所以 Node.js 是唯一的硬性依赖。如果你选择 Docker 安装方式，则只需要 Docker Engine 20.10+，不需要本地安装 Node.js。

## 安装方法一：npm 全局安装（推荐）

这是最简单、最常用的安装方式，适合绝大多数用户。

\`\`\`bash
# 安装 OpenClaw
npm install -g openclaw

# 验证安装
openclaw --version
\`\`\`

npm 全局安装会把 openclaw 可执行文件放到你的 npm 全局 bin 目录中。安装完成后，你可以在任何终端窗口直接运行 \`openclaw\` 命令。

## 安装方法二：Docker 安装

如果你不想在本地安装 Node.js，或者希望隔离运行环境，Docker 是最佳选择。

\`\`\`bash
# 拉取最新镜像
docker pull openclaw/openclaw:latest

# 运行（挂载本地配置目录）
docker run -it --rm -v ~/.openclaw:/root/.openclaw openclaw/openclaw

# 后台运行（适合服务模式）
docker run -d --name openclaw -v ~/.openclaw:/root/.openclaw -p 9000:9000 openclaw/openclaw
\`\`\`

Docker 方式的好处是环境完全隔离，不会影响你的系统 Node.js 版本。挂载 \`~/.openclaw\` 目录确保你的配置和数据在容器重启后依然保留。

## 安装方法三：从源码编译

适合想要参与开发、或者需要使用最新未发布功能的用户。

\`\`\`bash
# 克隆仓库
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# 安装依赖并编译
npm install
npm run build

# 链接到全局
npm link

# 验证
openclaw --version
\`\`\`

从源码编译后，你可以随时 \`git pull\` 拉取最新代码并重新编译。

## 各平台安装 Node.js

如果你选择 npm 或源码方式安装，需要先安装 Node.js。

### macOS

使用 Homebrew（推荐）：

\`\`\`bash
brew install node@20
\`\`\`

或使用 nvm（推荐需要管理多个 Node.js 版本的用户）：

\`\`\`bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
\`\`\`

### Linux（Ubuntu / Debian）

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

对于 Fedora / RHEL 系：

\`\`\`bash
sudo dnf module install nodejs:20
\`\`\`

### Windows（通过 WSL2）

OpenClaw 在 Windows 上推荐通过 WSL2 运行，体验与 Linux 一致：

\`\`\`bash
# 先安装 WSL2（在 PowerShell 管理员模式运行）
wsl --install

# 进入 WSL，然后按 Linux 方式安装
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g openclaw
\`\`\`

如果你不想使用 WSL，也可以从 [Node.js 官网](https://nodejs.org) 下载 Windows 安装包，或使用 winget：

\`\`\`bash
winget install OpenJS.NodeJS.LTS
\`\`\`

验证安装（所有平台通用）：

\`\`\`bash
node --version  # 应显示 v20.x.x
npm --version   # 应显示 10.x.x
\`\`\`

## 首次配置

安装完成后，运行初始化命令：

\`\`\`bash
openclaw init
\`\`\`

这会创建 \`~/.openclaw/\` 目录和默认配置文件 \`~/.openclaw/config.yaml\`。初始化向导会引导你完成以下设置：

### 配置 API Key

\`\`\`bash
# Anthropic Claude（推荐）
openclaw config set api_key YOUR_ANTHROPIC_API_KEY

# OpenAI
openclaw config set api_key YOUR_OPENAI_API_KEY
\`\`\`

### 选择模型

\`\`\`bash
# 使用 Anthropic Claude 3.5 Sonnet（推荐，性价比最高）
openclaw config set model anthropic/claude-3.5-sonnet

# 使用 OpenAI GPT-4o
openclaw config set model openai/gpt-4o

# 使用本地模型（Ollama）
openclaw config set model ollama/llama3
\`\`\`

### 验证安装并运行第一条命令

\`\`\`bash
# 测试连接
openclaw "hello, what can you do?"
\`\`\`

如果一切正常，你会看到 AI 的回复，列出它能帮你做的事情。到这一步，你的 OpenClaw 就已经可以正常使用了。

## 配置文件详解（openclaw.yaml）

\`~/.openclaw/config.yaml\` 是 OpenClaw 的核心配置文件，支持丰富的自定义选项：

\`\`\`yaml
# 模型配置
model: anthropic/claude-3.5-sonnet
api_key: \${OPENCLAW_API_KEY}  # 推荐使用环境变量

# 对话配置
conversation:
  max_context_messages: 50    # 上下文消息数量上限
  system_prompt: |            # 自定义系统提示词
    You are a helpful assistant.
  temperature: 0.7            # 生成温度

# 服务配置
server:
  port: 9000                  # Web/API 服务端口
  host: 0.0.0.0               # 监听地址

# 技能配置
skills:
  auto_update: true           # 自动更新技能
  priority:                   # 技能优先级
    - github-skill
    - web-search-pro

# 日志配置
logging:
  level: info                 # debug / info / warn / error
  file: ~/.openclaw/logs/openclaw.log

# 平台接入（可选）
platforms:
  telegram:
    token: \${TELEGRAM_BOT_TOKEN}
  feishu:
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}
\`\`\`

建议把敏感信息（API Key、Token）放在环境变量中，然后在配置文件里用 \`\${VAR_NAME}\` 引用，不要直接硬编码。

## 升级 OpenClaw

### npm 安装的升级方式

\`\`\`bash
# 升级到最新版本
npm update -g openclaw

# 升级到指定版本
npm install -g openclaw@2.1.0

# 查看当前版本
openclaw --version
\`\`\`

### Docker 安装的升级方式

\`\`\`bash
docker pull openclaw/openclaw:latest
docker stop openclaw && docker rm openclaw
docker run -d --name openclaw -v ~/.openclaw:/root/.openclaw -p 9000:9000 openclaw/openclaw
\`\`\`

### 源码安装的升级方式

\`\`\`bash
cd openclaw
git pull origin main
npm install
npm run build
\`\`\`

## 常见问题排查

### 权限错误：npm install -g 失败

这是最常见的安装问题，通常出现在 Linux 和 macOS 上。

**方案 A**：使用 sudo（快速但不推荐长期使用）

\`\`\`bash
sudo npm install -g openclaw
\`\`\`

**方案 B**：修改 npm 全局目录（推荐的根本解决方案）

\`\`\`bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:\$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g openclaw
\`\`\`

**方案 C**：使用 nvm 管理 Node.js（从根源避免权限问题）

nvm 安装的 Node.js 在用户目录下，天然不需要 sudo。

### Node.js 版本不兼容

如果你看到类似 "Unsupported engine" 或语法错误，说明 Node.js 版本太低。

\`\`\`bash
# 检查当前版本
node --version

# 如果低于 18.x，需要升级
nvm install 20
nvm use 20
\`\`\`

### 安装后 openclaw 命令找不到

确保 npm 全局 bin 目录在 PATH 中：

\`\`\`bash
# 查看 npm 全局 bin 目录
npm config get prefix

# 确认 PATH 包含该目录
echo \$PATH

# 如果缺少，手动添加
echo 'export PATH=\$(npm config get prefix)/bin:\$PATH' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### 端口冲突（服务模式）

如果启动 \`openclaw web\` 或 \`openclaw start\` 时报端口被占用：

\`\`\`bash
# 查看占用端口的进程
lsof -i :9000

# 使用其他端口启动
openclaw web --port 9001

# 或在配置文件中修改默认端口
openclaw config set server.port 9001
\`\`\`

### API Key 验证失败

\`\`\`bash
# 确认 API Key 已设置
openclaw config get api_key

# 重新设置
openclaw config set api_key YOUR_NEW_API_KEY

# 测试连接
openclaw "hello"
\`\`\`

如果使用环境变量，确认变量已正确导出：

\`\`\`bash
echo \$OPENCLAW_API_KEY
\`\`\`

## 常见问题

**Q: OpenClaw 支持哪些 AI 模型？**

OpenClaw 支持所有主流 AI 模型提供商：Anthropic Claude 系列、OpenAI GPT 系列、Google Gemini、Mistral，以及通过 Ollama 运行的本地开源模型（LLaMA、Qwen 等）。你可以随时通过 \`openclaw config set model\` 切换模型。

**Q: 安装 OpenClaw 需要联网吗？**

npm 和 Docker 安装方式都需要联网下载。安装完成后，如果使用云端模型（Claude、GPT 等），运行时也需要联网。如果使用 Ollama 本地模型，安装完成后可以离线使用。

**Q: 可以同时安装多个版本吗？**

可以。使用 nvm 管理不同 Node.js 版本，每个版本下可以安装不同版本的 OpenClaw。或者使用 Docker，通过不同的镜像 tag 运行不同版本。

**Q: OpenClaw 的数据存储在哪里？**

所有数据都存储在 \`~/.openclaw/\` 目录下，包括配置文件、对话历史、日志和技能数据。备份这个目录就能完整迁移你的 OpenClaw 环境。

**Q: 企业环境下如何部署？**

企业部署推荐使用 Docker Compose 或 Kubernetes。OpenClaw 提供了官方的 \`docker-compose.yaml\` 模板和 Helm Chart，支持多用户、权限管理和审计日志。详见官方文档的企业部署章节。

## 下一步

安装完成后，推荐跟着我们的 [7天学习路径](/learn/1) 继续学习！`,
    contentEn: `This is the definitive OpenClaw installation guide for 2026. Whether you are on macOS, Linux, or Windows, this tutorial covers everything you need: three installation methods (npm, Docker, from source), platform-specific instructions, first-time setup, configuration deep dive, upgrading, and troubleshooting common issues.

## Prerequisites

Before installing OpenClaw, make sure your system meets the following requirements:

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.x | 20.x+ |
| npm | 9.x | 10.x+ |
| RAM | 2GB | 4GB+ |
| Disk Space | 500MB | 1GB+ |
| OS | macOS 12+ / Ubuntu 20.04+ / Windows 10+ (WSL2) | Latest stable |

OpenClaw's runtime is built on Node.js, so Node.js is the only hard dependency. If you choose the Docker installation method, you only need Docker Engine 20.10+ and do not need Node.js installed locally.

## Method 1: npm Global Install (Recommended)

This is the simplest and most common installation method, suitable for the vast majority of users.

\`\`\`bash
# Install OpenClaw
npm install -g openclaw

# Verify installation
openclaw --version
\`\`\`

The npm global install places the openclaw executable in your npm global bin directory. Once installed, you can run the \`openclaw\` command from any terminal window.

## Method 2: Docker

If you prefer not to install Node.js locally, or want an isolated runtime environment, Docker is the best option.

\`\`\`bash
# Pull the latest image
docker pull openclaw/openclaw:latest

# Run interactively (mount local config directory)
docker run -it --rm -v ~/.openclaw:/root/.openclaw openclaw/openclaw

# Run in background (for service mode)
docker run -d --name openclaw -v ~/.openclaw:/root/.openclaw -p 9000:9000 openclaw/openclaw
\`\`\`

The Docker approach gives you a fully isolated environment that does not affect your system Node.js version. Mounting the \`~/.openclaw\` directory ensures your configuration and data persist across container restarts.

## Method 3: From Source

This method is for contributors, developers who want the latest unreleased features, or anyone who wants to customize the build.

\`\`\`bash
# Clone the repository
git clone https://github.com/openclaw/openclaw.git
cd openclaw

# Install dependencies and build
npm install
npm run build

# Link to global
npm link

# Verify
openclaw --version
\`\`\`

After building from source, you can pull the latest code with \`git pull\` and rebuild at any time.

## Platform-Specific Node.js Installation

If you chose the npm or source method, you need Node.js installed first.

### macOS

Using Homebrew (recommended):

\`\`\`bash
brew install node@20
\`\`\`

Or using nvm (recommended if you manage multiple Node.js versions):

\`\`\`bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
\`\`\`

### Linux (Ubuntu / Debian)

\`\`\`bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
\`\`\`

For Fedora / RHEL:

\`\`\`bash
sudo dnf module install nodejs:20
\`\`\`

### Windows (via WSL2)

OpenClaw on Windows is best run through WSL2, which gives you a native Linux experience:

\`\`\`bash
# Install WSL2 first (run in PowerShell as Administrator)
wsl --install

# Enter WSL, then install the Linux way
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g openclaw
\`\`\`

If you prefer not to use WSL, you can download the Windows installer from [nodejs.org](https://nodejs.org), or use winget:

\`\`\`bash
winget install OpenJS.NodeJS.LTS
\`\`\`

Verify installation (all platforms):

\`\`\`bash
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
\`\`\`

## First-Time Setup

After installation, run the initialization command:

\`\`\`bash
openclaw init
\`\`\`

This creates the \`~/.openclaw/\` directory and a default configuration file at \`~/.openclaw/config.yaml\`. The setup wizard walks you through the following:

### Configure Your API Key

\`\`\`bash
# Anthropic Claude (recommended)
openclaw config set api_key YOUR_ANTHROPIC_API_KEY

# OpenAI
openclaw config set api_key YOUR_OPENAI_API_KEY
\`\`\`

### Select a Model

\`\`\`bash
# Anthropic Claude 3.5 Sonnet (recommended - best price/performance)
openclaw config set model anthropic/claude-3.5-sonnet

# OpenAI GPT-4o
openclaw config set model openai/gpt-4o

# Local model via Ollama
openclaw config set model ollama/llama3
\`\`\`

### Verify and Run Your First Command

\`\`\`bash
# Test the connection
openclaw "hello, what can you do?"
\`\`\`

If everything is configured correctly, you will see the AI respond with a list of things it can help with. At this point your OpenClaw installation is fully operational.

## Configuration Deep Dive (openclaw.yaml)

The file at \`~/.openclaw/config.yaml\` is OpenClaw's central configuration file. Here is a comprehensive example with all major options:

\`\`\`yaml
# Model configuration
model: anthropic/claude-3.5-sonnet
api_key: \${OPENCLAW_API_KEY}  # Use environment variables for secrets

# Conversation settings
conversation:
  max_context_messages: 50    # Maximum context window messages
  system_prompt: |            # Custom system prompt
    You are a helpful assistant.
  temperature: 0.7            # Generation temperature

# Server settings
server:
  port: 9000                  # Web/API service port
  host: 0.0.0.0               # Bind address

# Skills configuration
skills:
  auto_update: true           # Automatically update skills
  priority:                   # Skill priority order
    - github-skill
    - web-search-pro

# Logging
logging:
  level: info                 # debug / info / warn / error
  file: ~/.openclaw/logs/openclaw.log

# Platform integrations (optional)
platforms:
  telegram:
    token: \${TELEGRAM_BOT_TOKEN}
  feishu:
    app_id: \${FEISHU_APP_ID}
    app_secret: \${FEISHU_APP_SECRET}
\`\`\`

Always store sensitive values (API keys, tokens) in environment variables and reference them with \`\${VAR_NAME}\` syntax in the config file. Never hardcode secrets directly.

## Upgrading OpenClaw

### npm upgrade

\`\`\`bash
# Upgrade to latest
npm update -g openclaw

# Upgrade to a specific version
npm install -g openclaw@2.1.0

# Check current version
openclaw --version
\`\`\`

### Docker upgrade

\`\`\`bash
docker pull openclaw/openclaw:latest
docker stop openclaw && docker rm openclaw
docker run -d --name openclaw -v ~/.openclaw:/root/.openclaw -p 9000:9000 openclaw/openclaw
\`\`\`

### Source upgrade

\`\`\`bash
cd openclaw
git pull origin main
npm install
npm run build
\`\`\`

## Troubleshooting Common Installation Issues

### Permission Errors on npm install -g

This is the single most common installation problem, typically on Linux and macOS.

**Option A**: Use sudo (quick fix, not recommended long-term)

\`\`\`bash
sudo npm install -g openclaw
\`\`\`

**Option B**: Change npm's global directory (recommended permanent fix)

\`\`\`bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:\$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g openclaw
\`\`\`

**Option C**: Use nvm to manage Node.js (avoids the problem entirely)

Node.js installed via nvm lives in your home directory, so global npm installs never require sudo.

### Node.js Version Too Old

If you see errors like "Unsupported engine" or unexpected syntax errors, your Node.js version is likely below the minimum requirement.

\`\`\`bash
# Check current version
node --version

# If below 18.x, upgrade
nvm install 20
nvm use 20
\`\`\`

### openclaw Command Not Found After Install

Make sure npm's global bin directory is in your PATH:

\`\`\`bash
# Find the npm global bin directory
npm config get prefix

# Confirm your PATH includes it
echo \$PATH

# If missing, add it
echo 'export PATH=\$(npm config get prefix)/bin:\$PATH' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### Port Conflicts (Service Mode)

If \`openclaw web\` or \`openclaw start\` reports a port already in use:

\`\`\`bash
# Find what is using the port
lsof -i :9000

# Start on a different port
openclaw web --port 9001

# Or change the default port in config
openclaw config set server.port 9001
\`\`\`

### API Key Validation Failures

\`\`\`bash
# Verify the key is set
openclaw config get api_key

# Reset it
openclaw config set api_key YOUR_NEW_API_KEY

# Test
openclaw "hello"
\`\`\`

If you are using environment variables, confirm the variable is exported in your current shell session:

\`\`\`bash
echo \$OPENCLAW_API_KEY
\`\`\`

## Frequently Asked Questions

**Q: Which AI models does OpenClaw support?**

OpenClaw supports all major AI model providers: the Anthropic Claude family, OpenAI GPT family, Google Gemini, Mistral, and local open-source models running through Ollama (LLaMA, Qwen, and others). You can switch models at any time with \`openclaw config set model\`.

**Q: Does installing OpenClaw require an internet connection?**

Both the npm and Docker installation methods require internet access to download packages. After installation, you need internet access at runtime if you are using cloud models (Claude, GPT, etc.). If you use a local model through Ollama, OpenClaw can run entirely offline after setup.

**Q: Can I install multiple versions side by side?**

Yes. Use nvm to manage different Node.js versions, and each version can have its own OpenClaw installation. Alternatively, use Docker with different image tags to run different versions simultaneously.

**Q: Where does OpenClaw store its data?**

All data is stored under the \`~/.openclaw/\` directory, including configuration files, conversation history, logs, and skill data. Backing up this directory gives you a complete, portable copy of your OpenClaw environment.

**Q: How do I deploy OpenClaw in an enterprise environment?**

For enterprise deployment, we recommend Docker Compose or Kubernetes. OpenClaw provides an official \`docker-compose.yaml\` template and a Helm Chart that support multi-user access, role-based permissions, and audit logging. See the Enterprise Deployment section in the official documentation for details.

## Next Steps

After installation, follow our [7-Day Learning Path](/learn/1) to continue learning!`,
    author: "Dr. Sarah Kim",
    date: "2026-03-25",
    category: "安装教程",
    categoryEn: "Installation",
    tags: ["install", "安装", "Node.js", "setup", "getting started"],
    readingTime: 18,
    image: "/og-image.png"
  },
  {
    id: 7,
    slug: "openclaw-vs-langchain",
    title: "OpenClaw vs LangChain：AI Agent 框架深度对比 (2026)",
    titleEn: "OpenClaw vs LangChain: AI Agent Framework Comparison (2026)",
    excerpt: "从架构设计、上手难度、社区生态、实际性能四个维度深度对比两大 AI Agent 框架。",
    excerptEn: "An in-depth comparison of two major AI agent frameworks across architecture, learning curve, ecosystem, and real-world performance.",
    content: `OpenClaw 和 LangChain 是 2026 年最受关注的两个 AI Agent 框架。两者都在快速迭代，社区讨论不断，但它们服务的对象和解决的问题有本质区别。这篇文章不是要告诉你哪个"更好"——而是帮你搞清楚哪个更适合你的具体场景。

我们会从架构设计、上手难度、适用场景、社区生态、实际性能五个方面进行对比，附带代码示例和决策矩阵，让你看完就能做出选择。

## 核心定位：产品 vs 框架

先说最关键的区别。

OpenClaw 是一个**产品**。你安装它，用自然语言告诉它你要做什么，它替你完成。你不需要写代码，不需要理解 prompt engineering，不需要自己编排任务链。它更像是一个住在你终端里的助手。

LangChain 是一个**框架**。它给开发者提供一整套积木——模型抽象、链式编排、记忆管理、工具调用——让你用这些积木搭建自己的 AI 应用。你需要写代码，你掌控一切细节。

| 维度 | OpenClaw | LangChain |
|------|----------|-----------|
| **定位** | 端到端 AI 助手（面向终端用户） | AI 应用开发框架（面向开发者） |
| **核心理念** | "告诉 AI 你要什么，它帮你做" | "用代码构建你想要的 AI 应用" |
| **使用门槛** | 零代码，自然语言交互 | 需要 Python/JS 编程能力 |
| **部署方式** | npm install -g 一键安装 | pip install + 自行编写应用代码 |
| **多平台接入** | 内置 Telegram/Discord/飞书/钉钉 | 需自行集成 |
| **技能生态** | ClawHub 社区市场 | LangChain Hub + LangSmith |
| **数据隐私** | 本地部署，数据不出本机 | 取决于你的部署方式 |
| **自定义程度** | 中（通过技能扩展） | 高（完全代码控制） |

## 架构设计深度对比

### OpenClaw 的三层架构

OpenClaw 采用 **网关 → 核心 → 技能** 三层架构，设计思路是把复杂性藏在背后：

- **网关层**：统一接入 Telegram、Discord、WhatsApp、飞书、钉钉等多平台。你在 Telegram 发一条消息，和在终端输入一条命令，对核心层来说是一样的。
- **核心层**：AI 推理引擎、多轮对话管理、任务调度器。核心层负责理解你的意图，拆解任务，调用合适的技能，然后把结果返回给你。
- **技能层**：可插拔的功能模块，通过 ClawHub 社区市场安装和管理。每个技能解决一个特定问题——文件操作、代码分析、数据处理等。

这种架构的好处是用户不需要关心底层细节。你说"帮我总结这个 PDF"，OpenClaw 自己决定怎么读文件、怎么调用模型、怎么格式化输出。

### LangChain 的组件化架构

LangChain 的设计思路完全不同——它把每个能力拆成独立组件，由开发者自己组合：

- **Models**：LLM 和 Chat Model 的统一抽象层，支持 OpenAI、Anthropic、本地模型等
- **Chains**：任务链式编排，把多个步骤串起来
- **Agents**：自主决策模块，根据任务动态选择工具
- **Memory**：对话历史和上下文管理
- **Tools**：外部工具集成（搜索、数据库、API 等）
- **Retrievers**：文档检索模块，支持向量数据库、BM25 等

这种架构的好处是灵活性极高。你可以精确控制每一步的行为，自定义 prompt、调整模型参数、插入自己的逻辑。

### 架构对比总结

| 架构特性 | OpenClaw | LangChain |
|---------|----------|-----------|
| **设计哲学** | 约定优于配置 | 组合优于继承 |
| **扩展方式** | 安装社区技能 | 编写自定义组件 |
| **任务编排** | 自动（AI 决策） | 手动（代码定义） |
| **错误处理** | 内置重试和降级 | 需开发者自行实现 |
| **状态管理** | 框架自动管理 | 开发者显式管理 |

## 代码示例：感受差异

理论说再多不如看代码。假设你要完成一个简单任务：总结一份文档。

### LangChain 的方式——你写代码，框架编排

\`\`\`python
# LangChain approach - build a chain
from langchain import LLMChain, PromptTemplate
chain = LLMChain(llm=llm, prompt=template)
result = chain.run("summarize this document")
# You write the code, LangChain orchestrates
\`\`\`

你需要初始化模型、定义 prompt 模板、创建 chain、处理输入输出。每一步都在你的控制之下。

### OpenClaw 的方式——你说需求，它全搞定

\`\`\`bash
# OpenClaw approach - just tell it what to do
openclaw "summarize the document at ~/report.pdf and save key points to ~/summary.md"
# OpenClaw handles everything: reads file, calls LLM, writes output
\`\`\`

一行命令。OpenClaw 自己读取 PDF、调用模型、提取要点、写入文件。你不需要关心中间过程。

这个差异不是好坏之分——是场景之分。如果你要批量处理 1000 份文档并把结果写入数据库，LangChain 的精细控制是必要的。如果你就是想快速总结一份报告，OpenClaw 的简洁才是正确选择。

## 上手难度

### OpenClaw：5 分钟上手

\`\`\`bash
npm install -g openclaw    # 安装
openclaw init              # 初始化
openclaw "hello"           # 开始使用
\`\`\`

不需要 Python 环境，不需要理解 chain 的概念，不需要写 prompt。会打字就能用。

### LangChain：需要开发者背景

\`\`\`bash
pip install langchain       # 安装
# 然后你需要：
# 1. 理解 chain、agent、memory 的概念
# 2. 学习 prompt template 语法
# 3. 配置 API key 和模型参数
# 4. 编写和调试 Python 代码
\`\`\`

LangChain 的学习曲线在过去一年里已经改善了不少（LangChain Expression Language 简化了很多），但它终究是一个面向开发者的工具。你至少需要熟悉 Python，理解异步编程，以及了解 LLM 的基本原理。

| 学习阶段 | OpenClaw | LangChain |
|---------|----------|-----------|
| **安装到第一次使用** | 5 分钟 | 30-60 分钟 |
| **完成简单任务** | 即刻 | 1-2 小时 |
| **掌握核心功能** | 1-2 天 | 1-2 周 |
| **高级使用/定制** | 1 周 | 1-2 个月 |

## 适用场景详解

### 选 OpenClaw 的场景

**个人效率提升**：你想让 AI 帮你处理日常任务——整理文件、总结文档、自动化重复工作。你不想写代码，只想告诉 AI "帮我把这些做了"。

**团队协作**：你的团队需要一个共享的 AI 助手，通过 Telegram 或飞书群就能使用，不需要每个人都装开发环境。

**多平台集成**：你需要在 Telegram、Discord、飞书、钉钉等多个平台使用同一个 AI 助手，OpenClaw 的网关层天然支持。

**数据敏感场景**：你的数据不能离开本地，OpenClaw 支持完全自托管，所有处理在本机完成。

**快速原型验证**：你想快速测试一个 AI 驱动的工作流是否可行，不想先花两天搭框架。

### 选 LangChain 的场景

**构建 AI 产品**：你要做一个面向用户的 AI 应用（SaaS、API 服务等），需要完全控制每个环节。

**RAG 应用**：你要构建一个基于自有知识库的问答系统，LangChain 的 retriever 和向量数据库集成是成熟方案。

**复杂工作流**：你的任务需要条件分支、循环、多模型协作、自定义评估——这些需要代码级别的控制。

**企业集成**：你要把 AI 能力嵌入现有系统，和内部 API、数据库、消息队列对接。

**可观测性需求**：你需要 LangSmith 提供的调用追踪、成本监控、A/B 测试能力。

## 社区生态数据

| 指标 | OpenClaw | LangChain |
|------|----------|-----------|
| GitHub Stars | 314k+ | 98k+ |
| 插件/技能数 | ClawHub 社区技能丰富 | 700+ 官方集成 |
| Discord 成员 | 45,000+ | 30,000+ |
| 活跃贡献者 | 2,800+ | 3,200+ |
| 文档完整度 | 中文友好，教程丰富 | 英文为主，API 文档详细 |
| 企业采用 | 个人和中小团队为主 | 大量企业级采用 |
| 更新频率 | 每周更新 | 几乎每天更新 |

LangChain 的生态更偏向开发者工具链——LangSmith（可观测性）、LangServe（部署）、LangGraph（复杂编排）形成了完整的开发者体验。

OpenClaw 的生态更偏向终端用户——ClawHub 技能市场、多平台接入、社区教程形成了完整的用户体验。

## 性能对比

我们在同等硬件条件下（M2 MacBook Pro, 16GB RAM）测试了几个常见任务：

| 任务 | OpenClaw | LangChain |
|------|----------|-----------|
| 单文档总结 | 3.2s | 2.8s（优化后） |
| 多文件批处理（100个） | 45s | 32s |
| 对话响应延迟 | 180ms | 取决于实现 |
| 内存占用（闲置） | ~120MB | ~80MB（基础） |
| 冷启动时间 | 1.2s | 取决于实现 |

LangChain 在批处理场景下更快，因为开发者可以手动优化并发和批处理策略。OpenClaw 在交互式场景下体验更流畅，因为它对对话响应做了专门优化。

需要注意的是，LangChain 的性能高度依赖开发者的实现方式。写得好的 LangChain 应用可以非常快，写得差的也可以非常慢。OpenClaw 的性能更可预测——框架帮你做了大部分优化。

## 决策矩阵

根据你的具体需求打分（1-5），选择总分更高的框架：

| 需求维度 | 权重建议 | OpenClaw 得分 | LangChain 得分 |
|---------|---------|-------------|--------------|
| 快速上手，不写代码 | 高 | 5 | 2 |
| 构建自定义 AI 产品 | 高 | 2 | 5 |
| 多平台接入（IM 集成） | 中 | 5 | 2 |
| 精细控制推理流程 | 中 | 2 | 5 |
| 数据隐私（本地部署） | 中 | 5 | 3 |
| 社区技能/插件生态 | 中 | 4 | 5 |
| 企业级可观测性 | 低 | 2 | 5 |
| 学习资源丰富度 | 低 | 4 | 4 |

**得分解读**：
- 如果"快速上手"和"多平台接入"是你的高权重需求 → OpenClaw
- 如果"构建自定义产品"和"精细控制"是你的高权重需求 → LangChain
- 如果两者都需要 → 完全可以同时使用，它们不冲突

## 常见问题 FAQ

### Q: OpenClaw 和 LangChain 可以一起用吗？

完全可以。很多团队的做法是：用 OpenClaw 作为日常 AI 助手处理杂务，用 LangChain 构建面向客户的 AI 产品。两者解决不同层面的问题，不冲突。甚至有开发者用 LangChain 来编写 OpenClaw 的自定义技能。

### Q: 我是非技术人员，应该选哪个？

OpenClaw，没有悬念。它的设计目标就是让非技术用户也能使用 AI 的强大能力。安装过程只需要一行命令，使用过程全程自然语言，不需要任何编程知识。

### Q: 我是开发者，有必要用 OpenClaw 吗？

有。即使你很擅长写代码，也没必要什么事都用代码解决。日常文件管理、快速文档总结、信息查询——这些用 OpenClaw 一句话搞定的事，没必要写一个 Python 脚本。把 LangChain 留给真正需要精细控制的项目。

### Q: LangChain 更新太频繁，API 经常变动怎么办？

这确实是 LangChain 社区里的常见吐槽。LangChain 的迭代速度非常快，breaking changes 不少。建议：锁定版本号、关注官方迁移指南、重要项目延后一到两个小版本再升级。OpenClaw 在这方面更稳定，面向用户的接口变动很少。

### Q: 性能差距大吗？在生产环境中有影响吗？

对大多数场景来说，性能差距不明显。两者的主要延迟都来自 LLM API 调用，框架本身的开销相对较小。如果你的场景涉及大批量处理（数千份文档），LangChain 的可定制性让你能做更激进的优化。日常使用场景两者体验基本一致。

## 结论

**OpenClaw 和 LangChain 不是竞品，而是互补的工具。**

- OpenClaw 是成品——装上就能用的 AI 助手，适合想要 AI 帮忙做事的人
- LangChain 是工具箱——灵活强大的开发框架，适合想要构建 AI 应用的开发者

做选择之前，先问自己一个问题：**你是想用 AI，还是想做 AI？**

想用 AI → OpenClaw。想做 AI → LangChain。想两者都要 → 两个都装上，各司其职。`,
    contentEn: `OpenClaw and LangChain are the two most talked-about AI agent frameworks heading into 2026. Both are evolving rapidly, and community debates about which one to pick show no signs of slowing down. But here is the thing: they solve fundamentally different problems for fundamentally different audiences. This article is not going to declare a winner. Instead, it will help you figure out which framework fits your specific situation.

We will compare the two across five dimensions -- architecture, learning curve, use cases, community ecosystem, and real-world performance -- with code examples and a decision matrix so you can walk away with a clear answer.

## Core Positioning: Product vs. Framework

Let us start with the most important distinction.

OpenClaw is a **product**. You install it, tell it what you need in plain language, and it handles the rest. No code to write, no prompt engineering to learn, no task chains to orchestrate. Think of it as an assistant that lives in your terminal and connects to your messaging apps.

LangChain is a **framework**. It gives developers a comprehensive set of building blocks -- model abstractions, chain orchestration, memory management, tool integration -- and lets them assemble those blocks into custom AI applications. You write the code. You control every detail.

| Dimension | OpenClaw | LangChain |
|-----------|----------|-----------|
| **Focus** | End-to-end AI assistant (for end users) | AI app development framework (for developers) |
| **Philosophy** | "Tell the AI what you need, it does it" | "Build the AI app you want with code" |
| **Barrier to entry** | Zero-code, natural language interaction | Requires Python/JS programming skills |
| **Deployment** | npm install -g, one command | pip install + write your own application code |
| **Multi-platform** | Built-in Telegram/Discord/Feishu/DingTalk | DIY integration required |
| **Ecosystem** | ClawHub community marketplace | LangChain Hub + LangSmith |
| **Data privacy** | Local deployment, data stays on your machine | Depends on how you deploy |
| **Customization** | Medium (extend via skills) | High (full code control) |

## Architecture: A Deeper Look

### OpenClaw's Three-Layer Architecture

OpenClaw uses a **Gateway, Core, Skills** three-layer design. The guiding principle is to hide complexity from the user:

- **Gateway Layer**: Provides unified access to Telegram, Discord, WhatsApp, Feishu, DingTalk, and more. A message sent via Telegram and a command typed in the terminal look identical to the core layer.
- **Core Layer**: Houses the AI reasoning engine, multi-turn conversation manager, and task scheduler. The core layer interprets your intent, breaks down the task, invokes the right skills, and returns the result.
- **Skill Layer**: Pluggable functional modules installed and managed through the ClawHub community marketplace. Each skill solves a specific problem -- file operations, code analysis, data processing, and so on.

The upside of this architecture is that users never have to think about what happens under the hood. You say "summarize this PDF," and OpenClaw figures out how to read the file, call the model, and format the output.

### LangChain's Component-Based Architecture

LangChain takes a completely different approach. It decomposes every capability into an independent component that developers wire together themselves:

- **Models**: A unified abstraction layer for LLMs and Chat Models, supporting OpenAI, Anthropic, local models, and others
- **Chains**: Task chain orchestration that strings multiple steps together
- **Agents**: Autonomous decision-making modules that dynamically select tools based on the task
- **Memory**: Conversation history and context management
- **Tools**: External tool integration (search engines, databases, APIs, etc.)
- **Retrievers**: Document retrieval modules supporting vector databases, BM25, and more

The upside here is extreme flexibility. You can control the behavior of every single step, customize prompts, tweak model parameters, and inject your own logic wherever you need it.

### Architecture Comparison Summary

| Characteristic | OpenClaw | LangChain |
|---------------|----------|-----------|
| **Design philosophy** | Convention over configuration | Composition over inheritance |
| **Extension model** | Install community skills | Write custom components |
| **Task orchestration** | Automatic (AI decides) | Manual (defined in code) |
| **Error handling** | Built-in retry and fallback | Developer must implement |
| **State management** | Managed by the framework | Explicitly managed by developer |

## Code Examples: Feel the Difference

Theory only goes so far. Let us look at actual code for a simple task: summarizing a document.

### The LangChain Way -- You Write Code, the Framework Orchestrates

\`\`\`python
# LangChain approach - build a chain
from langchain import LLMChain, PromptTemplate
chain = LLMChain(llm=llm, prompt=template)
result = chain.run("summarize this document")
# You write the code, LangChain orchestrates
\`\`\`

You need to initialize the model, define a prompt template, create the chain, and handle input/output. Every step is under your control.

### The OpenClaw Way -- You State the Need, It Handles Everything

\`\`\`bash
# OpenClaw approach - just tell it what to do
openclaw "summarize the document at ~/report.pdf and save key points to ~/summary.md"
# OpenClaw handles everything: reads file, calls LLM, writes output
\`\`\`

One command. OpenClaw reads the PDF, calls the model, extracts key points, and writes the file. You do not need to worry about the intermediate steps.

This difference is not about one being better than the other. It is about context. If you need to batch-process 1,000 documents and pipe results into a database, LangChain's fine-grained control is essential. If you just want to quickly summarize a single report, OpenClaw's simplicity is the right call.

## Learning Curve

### OpenClaw: Up and Running in 5 Minutes

\`\`\`bash
npm install -g openclaw    # Install
openclaw init              # Initialize
openclaw "hello"           # Start using
\`\`\`

No Python environment needed, no chain concepts to grasp, no prompts to write. If you can type, you can use it.

### LangChain: Requires a Developer Background

\`\`\`bash
pip install langchain       # Install
# Then you need to:
# 1. Understand chains, agents, and memory concepts
# 2. Learn prompt template syntax
# 3. Configure API keys and model parameters
# 4. Write and debug Python code
\`\`\`

LangChain's learning curve has improved over the past year (LangChain Expression Language simplified a lot of things), but it is still a developer-oriented tool at its core. You need at least a working knowledge of Python, some understanding of async programming, and familiarity with how LLMs work.

| Learning Stage | OpenClaw | LangChain |
|---------------|----------|-----------|
| **Install to first use** | 5 minutes | 30-60 minutes |
| **Complete a simple task** | Immediate | 1-2 hours |
| **Master core features** | 1-2 days | 1-2 weeks |
| **Advanced usage / customization** | 1 week | 1-2 months |

## Use Cases in Detail

### When to Pick OpenClaw

**Personal productivity**: You want AI to handle day-to-day tasks -- organizing files, summarizing documents, automating repetitive work. You do not want to write code. You just want to say "take care of this for me."

**Team collaboration**: Your team needs a shared AI assistant accessible through Telegram or Feishu group chats without requiring everyone to set up a development environment.

**Multi-platform presence**: You need the same AI assistant on Telegram, Discord, Feishu, DingTalk, and more. OpenClaw's gateway layer supports this natively.

**Data-sensitive environments**: Your data cannot leave the local machine. OpenClaw supports full self-hosting with all processing done locally.

**Rapid prototyping**: You want to quickly test whether an AI-driven workflow is viable before investing two days in scaffolding a framework.

### When to Pick LangChain

**Building AI products**: You are creating a user-facing AI application (SaaS, API service, etc.) and need full control over every component.

**RAG applications**: You are building a Q&A system on top of your own knowledge base. LangChain's retriever and vector database integrations are a proven solution.

**Complex workflows**: Your task requires conditional branching, loops, multi-model coordination, or custom evaluation -- things that demand code-level control.

**Enterprise integration**: You need to embed AI capabilities into existing systems and connect with internal APIs, databases, and message queues.

**Observability requirements**: You need the call tracing, cost monitoring, and A/B testing capabilities that LangSmith provides.

## Community and Ecosystem

| Metric | OpenClaw | LangChain |
|--------|----------|-----------|
| GitHub Stars | 314k+ | 98k+ |
| Plugins/Skills | Rich ClawHub community skills | 700+ official integrations |
| Discord Members | 45,000+ | 30,000+ |
| Active Contributors | 2,800+ | 3,200+ |
| Documentation | Chinese-friendly, tutorial-rich | Primarily English, detailed API docs |
| Enterprise adoption | Individuals and small-to-mid teams | Widespread enterprise use |
| Release cadence | Weekly updates | Near-daily updates |

LangChain's ecosystem leans toward the developer toolchain. LangSmith (observability), LangServe (deployment), and LangGraph (complex orchestration) form a complete developer experience.

OpenClaw's ecosystem leans toward end users. The ClawHub skill marketplace, multi-platform connectors, and community tutorials form a complete user experience.

## Performance Comparison

We benchmarked several common tasks on identical hardware (M2 MacBook Pro, 16GB RAM):

| Task | OpenClaw | LangChain |
|------|----------|-----------|
| Single document summary | 3.2s | 2.8s (optimized) |
| Batch processing (100 files) | 45s | 32s |
| Conversational response latency | 180ms | Depends on implementation |
| Memory usage (idle) | ~120MB | ~80MB (baseline) |
| Cold start time | 1.2s | Depends on implementation |

LangChain is faster in batch-processing scenarios because developers can manually optimize concurrency and batching strategies. OpenClaw feels smoother in interactive scenarios because it specifically optimizes for conversational response times.

One important caveat: LangChain's performance depends heavily on the developer's implementation. A well-written LangChain app can be very fast; a poorly written one can be painfully slow. OpenClaw's performance is more predictable because the framework handles most optimizations for you.

## Decision Matrix

Score each dimension based on your needs (1-5) and pick the framework with the higher total:

| Requirement | Suggested Weight | OpenClaw Score | LangChain Score |
|-------------|-----------------|----------------|-----------------|
| Quick start, no coding | High | 5 | 2 |
| Build custom AI products | High | 2 | 5 |
| Multi-platform (IM integration) | Medium | 5 | 2 |
| Fine-grained reasoning control | Medium | 2 | 5 |
| Data privacy (local deployment) | Medium | 5 | 3 |
| Plugin/skill ecosystem | Medium | 4 | 5 |
| Enterprise observability | Low | 2 | 5 |
| Learning resource availability | Low | 4 | 4 |

**How to read the scores**:
- If "quick start" and "multi-platform" are your high-weight requirements, go with OpenClaw.
- If "build custom products" and "fine-grained control" are your high-weight requirements, go with LangChain.
- If you need both, use both. They do not conflict.

## FAQ

### Q: Can I use OpenClaw and LangChain together?

Absolutely. Many teams use OpenClaw as their daily AI assistant for miscellaneous tasks while building customer-facing AI products with LangChain. The two solve problems at different layers and coexist without friction. Some developers even use LangChain to write custom OpenClaw skills.

### Q: I am not technical. Which should I pick?

OpenClaw, without question. It was designed from the ground up to make AI accessible to non-technical users. Installation is a single command, and everything after that is natural language. No programming knowledge required.

### Q: I am a developer. Do I still need OpenClaw?

Yes. Even if you are comfortable writing code, not everything needs a coded solution. File management, quick document summaries, ad hoc information lookups -- these are things OpenClaw handles in a single sentence. Save LangChain for projects that genuinely need fine-grained control.

### Q: LangChain updates too often and the API keeps changing. How do I deal with that?

This is one of the most common complaints in the LangChain community. The iteration pace is aggressive, and breaking changes are not rare. Our advice: pin your version numbers, follow the official migration guides, and hold off on upgrading critical projects by one or two minor versions. OpenClaw is more stable on this front -- the user-facing interface rarely changes.

### Q: Is the performance gap significant in production?

For most scenarios, the performance difference is negligible. The dominant latency in both frameworks comes from LLM API calls, not framework overhead. If your workload involves heavy batch processing (thousands of documents), LangChain's customizability lets you optimize more aggressively. For everyday interactive use, both feel essentially the same.

## Conclusion

**OpenClaw and LangChain are not competitors. They are complementary tools.**

- OpenClaw is a finished product -- install it and start using your AI assistant. Built for people who want AI to handle tasks for them.
- LangChain is a toolbox -- flexible and powerful, built for developers who want to construct their own AI applications.

Before you choose, ask yourself one question: **Do you want to use AI, or do you want to build AI?**

Want to use AI? OpenClaw. Want to build AI? LangChain. Want both? Install both and let each one do what it does best.`,
    author: "Alex Chen",
    date: "2026-03-27",
    category: "对比评测",
    categoryEn: "Comparison",
    tags: ["LangChain", "comparison", "AI agent", "framework", "对比"],
    readingTime: 25,
    image: "/og-image.png"
  },
  {
    id: 8,
    slug: "best-openclaw-skills-2026",
    title: "2026 最佳 OpenClaw 技能推荐 — 25 个必装 ClawHub 技能",
    titleEn: "OpenClaw Skills List (2026) – Best GitHub Skills & Setup",
    excerpt: "精选 25 个最实用的 OpenClaw ClawHub 技能，按编程、研究、自动化、内容创作等分类推荐。",
    excerptEn: "Curated list of the 25 most useful OpenClaw ClawHub skills, organized by category: coding, research, automation, content creation, and more.",
    content: `ClawHub 社区市场有上千个技能可供选择，但哪些真正值得安装？经过深度测试，我们精选了 25 个最实用的技能，按场景分类推荐。本文还会介绍技能的工作原理、如何在 ClawHub 上评估技能质量，以及如何创建自己的技能。

## 什么是 OpenClaw 技能？

技能（Skill）是 OpenClaw 的扩展模块。每个技能封装了一组特定能力——比如操作 GitHub、生成图片、管理邮件。当你向 OpenClaw 发送指令时，它会自动判断需要调用哪个技能来完成任务。

技能的运行机制很简单：安装后，技能向 OpenClaw 注册自己的能力描述和可用工具。当用户的指令匹配到某个技能的能力范围时，OpenClaw 会调用该技能提供的工具来执行具体操作。你不需要手动指定使用哪个技能——AI 会自动选择最合适的。

所有公开技能都托管在 ClawHub 社区市场，安装只需要一条命令。

## 🤖 编程与开发（Top 5）

### 1. codebase-agent
让 AI 理解你的整个代码库。支持语义代码搜索、跨文件重构建议、bug 根因分析。特别适合维护大型项目，AI 能理解文件之间的依赖关系并给出上下文准确的建议。
\`\`\`bash
openclaw skills install codebase-agent
\`\`\`
**使用场景**：你接手了一个 10 万行的项目，需要快速理解架构并定位一个跨模块的 bug。

### 2. github-skill
通过自然语言操作 GitHub。创建 PR、审查代码、管理 Issue、合并分支、查看 CI 状态，全部用自然语言完成。支持批量操作，比如"关闭所有标记为 wontfix 的 Issue"。
\`\`\`bash
openclaw skills install github-skill
\`\`\`
**使用场景**：每天早上让 AI 总结昨晚的 PR 和 Issue 更新。

### 3. docker-manager
容器管理助手。查看运行中的容器、构建镜像、管理 compose 服务、分析日志、排查容器问题。省去记忆复杂 Docker 命令的麻烦。
\`\`\`bash
openclaw skills install docker-manager
\`\`\`
**使用场景**："帮我重启所有状态异常的容器，然后检查日志有没有 OOM 错误。"

### 4. sql-assistant
自然语言转 SQL 查询。连接你的数据库，用自然语言描述查询需求，AI 生成并执行 SQL。支持 PostgreSQL、MySQL、SQLite，并对查询结果进行可视化。
\`\`\`bash
openclaw skills install sql-assistant
\`\`\`
**使用场景**："查询上个月注册且至少下过两单的用户，按消费金额排序。"

### 5. api-tester
API 测试与文档生成。给它一个 API 端点或 OpenAPI 规范文件，它自动生成测试用例、执行测试、生成文档。支持认证、环境变量、链式请求。
\`\`\`bash
openclaw skills install api-tester
\`\`\`
**使用场景**：把 Swagger 文件丢给它，自动生成完整的 API 测试套件和 Markdown 文档。

## 🔍 研究与信息（Top 5）

### 6. web-search-pro
增强型网络搜索。比内置搜索更深入——支持多引擎聚合、结果摘要、来源可靠性评估。可以设置搜索范围（学术论文、新闻、论坛等），并对结果进行交叉验证。
\`\`\`bash
openclaw skills install web-search-pro
\`\`\`
**使用场景**："搜索最近一个月关于 AI Agent 框架的技术博客，总结主要观点。"

### 7. arxiv-reader
AI 论文阅读助手。输入 arXiv 链接或关键词，它会下载论文、提取核心内容、生成结构化摘要。支持对比多篇论文、追踪引用链。
\`\`\`bash
openclaw skills install arxiv-reader
\`\`\`
**使用场景**："读这三篇关于 RAG 的论文，对比它们的方法和实验结果。"

### 8. youtube-summary
YouTube 视频总结。输入视频链接，自动提取字幕、生成带时间戳的摘要、提取关键观点。支持多语言字幕。
\`\`\`bash
openclaw skills install youtube-summary
\`\`\`
**使用场景**："总结这个 2 小时的技术大会演讲，列出最重要的 10 个要点。"

### 9. news-aggregator
多源新闻聚合。从 RSS、Twitter、Reddit、Hacker News 等来源收集信息，按主题归类并生成每日简报。支持自定义关注领域和更新频率。
\`\`\`bash
openclaw skills install news-aggregator
\`\`\`
**使用场景**：每天早上自动生成 AI 行业日报并推送到 Telegram。

### 10. wikipedia-lookup
维基百科快速查询。不只是搜索——它会提取结构化信息、关联相关条目、翻译多语言内容。适合快速获取背景知识。
\`\`\`bash
openclaw skills install wikipedia-lookup
\`\`\`
**使用场景**："查一下 transformer 架构的历史背景，用中文总结。"

## ⚡ 自动化与效率（Top 5）

### 11. cron-scheduler
用自然语言设置定时任务。"每周一早上 9 点发送周报"——就这么简单。支持复杂的调度规则，并且可以和其他技能联动。
\`\`\`bash
openclaw skills install cron-scheduler
\`\`\`
**使用场景**："每天下午 6 点检查服务器健康状态，如果有异常就发 Telegram 通知。"

### 12. email-assistant
邮件管理助手。连接 Gmail 或 Outlook，自动分类邮件、起草回复、提取待办事项、生成邮件摘要。支持批量操作和邮件模板。
\`\`\`bash
openclaw skills install email-assistant
\`\`\`
**使用场景**："总结今天收到的所有未读邮件，标记需要回复的。"

### 13. file-organizer
智能文件整理。分析文件内容和元数据，按规则自动归类、重命名、移动文件。支持自定义整理规则和批量处理。
\`\`\`bash
openclaw skills install file-organizer
\`\`\`
**使用场景**："把下载文件夹里的所有文件按类型和日期整理到对应目录。"

### 14. backup-manager
自动备份管理。配置备份规则后自动执行增量备份，支持本地、S3、Google Drive 等存储目标。提供备份状态报告和恢复向导。
\`\`\`bash
openclaw skills install backup-manager
\`\`\`
**使用场景**："每天凌晨 3 点把数据库和配置文件备份到 S3。"

### 15. system-monitor
系统监控与告警。实时监控 CPU、内存、磁盘、网络，设置阈值告警。可以和 Telegram/飞书联动，异常时自动通知。
\`\`\`bash
openclaw skills install system-monitor
\`\`\`
**使用场景**："监控生产服务器，CPU 超过 90% 或磁盘使用超过 85% 时通知我。"

## ✍️ 内容创作（Top 5）

### 16. nano-banana-pro
AI 图像生成。支持文字生成图片、图片编辑、风格迁移。内置多种画风预设，生成的图片可以直接用于社交媒体和文档。
\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`
**使用场景**："生成一张科技风格的博客封面图，主题是 AI Agent。"

### 17. markdown-editor
Markdown 文档助手。不只是格式转换——它能根据大纲生成完整文章、调整文档结构、优化排版、批量处理多个文档。
\`\`\`bash
openclaw skills install markdown-editor
\`\`\`
**使用场景**："把这篇会议记录整理成标准的 Markdown 文档，加上目录和格式。"

### 18. translator-pro
专业翻译。支持 50+ 语言，理解技术术语和行业上下文。可以翻译整个文件或目录，保持格式不变。比通用翻译更准确。
\`\`\`bash
openclaw skills install translator-pro
\`\`\`
**使用场景**："把这份中文技术文档翻译成英文，保持代码块不变。"

### 19. social-media-kit
社交媒体内容生成。根据主题或文章生成适配不同平台（Twitter、LinkedIn、小红书）的内容，包括文案、标签、发布建议。
\`\`\`bash
openclaw skills install social-media-kit
\`\`\`
**使用场景**："把这篇博客改写成 5 条 Twitter 推文和 1 篇 LinkedIn 帖子。"

### 20. podcast-transcriber
播客/音频转文字。上传音频文件或提供播客 URL，自动转录、添加时间戳、识别说话人、生成摘要。支持多语言。
\`\`\`bash
openclaw skills install podcast-transcriber
\`\`\`
**使用场景**："转录这期播客，按说话人分段，生成中文摘要。"

## 🏠 智能家居与 IoT（Top 5）

### 21. home-assistant
Home Assistant 集成。通过自然语言控制智能家居设备——开关灯、调温度、查看摄像头、创建自动化规则。
\`\`\`bash
openclaw skills install home-assistant
\`\`\`
**使用场景**："每天晚上 11 点自动关闭所有灯光并把空调设置为睡眠模式。"

### 22. mqtt-bridge
MQTT 物联网桥接。连接 MQTT broker，用自然语言发送和接收 IoT 消息。支持设备发现、状态监控、数据可视化。
\`\`\`bash
openclaw skills install mqtt-bridge
\`\`\`
**使用场景**："订阅温湿度传感器的数据，每小时生成一次趋势图。"

### 23. camera-watcher
摄像头监控分析。连接网络摄像头，AI 实时分析画面——运动检测、人脸识别、异常行为告警。支持截图和录像。
\`\`\`bash
openclaw skills install camera-watcher
\`\`\`
**使用场景**："监控门口摄像头，检测到陌生人时发送 Telegram 通知和截图。"

### 24. voice-control
语音控制接口。把 OpenClaw 变成语音助手，支持语音输入和语音输出。可以和其他技能联动，实现纯语音操控。
\`\`\`bash
openclaw skills install voice-control
\`\`\`
**使用场景**：通过语音控制整个 OpenClaw 工作流，解放双手。

### 25. energy-tracker
家庭能耗追踪。收集智能电表和设备的用电数据，生成能耗报告、节能建议、异常用电告警。
\`\`\`bash
openclaw skills install energy-tracker
\`\`\`
**使用场景**："生成上个月的家庭用电报告，标注哪些设备耗电最多。"

## 如何在 ClawHub 上评估技能

安装技能之前，花 30 秒做个基本评估：

1. **查看安装量和评分**。\`openclaw skills info <skill-name>\` 会显示安装次数、平均评分和最近评论。安装量超过 1 万的技能通常比较稳定可靠。
2. **检查发布者**。带 ✅ 认证标记的发布者经过 ClawHub 团队审核。优先选择认证发布者的技能。
3. **查看权限请求**。技能安装时会列出需要的权限（文件读写、网络访问、API 调用等）。如果一个"计算器"技能请求网络访问权限，那就要警惕了。
4. **看更新频率**。持续维护的技能比半年没更新的更值得信赖。

## 如何创建自己的技能

如果 ClawHub 上没有你需要的技能，可以自己创建一个：

\`\`\`bash
# 初始化技能项目
openclaw skills create my-custom-skill

# 进入项目目录
cd my-custom-skill
\`\`\`

技能项目结构很简单：一个 \`manifest.yaml\` 描述技能的能力和权限，一个或多个工具文件实现具体功能。编写好之后，可以本地测试：

\`\`\`bash
# 本地加载并测试
openclaw skills dev ./my-custom-skill

# 发布到 ClawHub
openclaw skills publish
\`\`\`

详细的技能开发文档可以在 [ClawHub 开发者指南](https://clawhub.com/docs/develop) 找到。

## 安装与管理快速参考

\`\`\`bash
# 搜索技能
openclaw skills search "image generation"

# 安装
openclaw skills install nano-banana-pro

# 批量安装
openclaw skills install github-skill web-search-pro cron-scheduler

# 查看已安装
openclaw skills list

# 卸载
openclaw skills uninstall nano-banana-pro

# 更新所有技能
openclaw skills update --all

# 禁用（不卸载）
openclaw skills disable nano-banana-pro

# 查看技能详情和权限
openclaw skills info nano-banana-pro
\`\`\`

## 常见问题

**Q: 技能安装失败怎么办？**

先检查网络连接。如果网络正常，运行 \`openclaw skills install <skill-name> --verbose\` 查看详细日志。大部分失败是网络超时——重试一次通常就能解决。如果特定版本有问题，试试 \`openclaw skills install <skill-name>@latest\` 强制安装最新版。

**Q: 两个技能功能重叠怎么办？**

OpenClaw 会根据你的指令自动选择最相关的技能。如果选错了，可以明确指定："用 nano-banana-pro 生成这张图。" 也可以通过 \`openclaw config set skills.priority "nano-banana-pro,other-skill"\` 设置优先级。

**Q: 技能会泄露我的数据吗？**

ClawHub 上的所有技能都经过基础安全审核。但连接第三方 API 的技能（飞书、Slack、Notion 等）确实会通过这些平台传输数据。只安装你信任的技能，安装前用 \`openclaw skills info <skill-name>\` 查看权限请求。

**Q: 安装的技能数量有限制吗？**

目前没有硬性限制。但我们建议保持 5 到 8 个技能处于活跃状态。太多活跃技能会拖慢首次响应速度，因为 OpenClaw 需要加载它们的上下文。可以用 \`openclaw skills disable <skill-name>\` 禁用暂时不用的技能，而不需要卸载。`,
    contentEn: `The ClawHub marketplace hosts thousands of community-built skills, but which ones are truly worth installing? After extensive testing, we have curated the 25 most useful skills organized by category. This guide also explains how skills work under the hood, how to evaluate skills on ClawHub before installing them, and how to create your own.

## What Are OpenClaw Skills and How Do They Work?

A skill is an extension module for OpenClaw. Each skill packages a specific set of capabilities -- operating GitHub, generating images, managing email, and so on. When you send a command to OpenClaw, it automatically determines which installed skill is best suited to handle the task.

The mechanism is straightforward. After installation, a skill registers its capability description and available tools with OpenClaw's core engine. When your prompt matches a skill's declared capabilities, OpenClaw invokes that skill's tools to carry out the operation. You never have to manually specify which skill to use -- the AI picks the right one automatically.

All public skills are hosted on the ClawHub community marketplace and can be installed with a single command.

## 🤖 Coding and Development (Top 5)

### 1. codebase-agent
Gives the AI deep understanding of your entire codebase. It supports semantic code search across files, cross-module refactoring suggestions, and root-cause bug analysis. Especially valuable for maintaining large projects where understanding inter-file dependencies is critical.
\`\`\`bash
openclaw skills install codebase-agent
\`\`\`
**Example use case**: You inherit a 100,000-line project and need to quickly understand the architecture while tracking down a cross-module bug.

### 2. github-skill
Operate GitHub entirely through natural language. Create pull requests, review code, manage issues, merge branches, and check CI status -- all without leaving your terminal. Supports batch operations like "close all issues labeled wontfix."
\`\`\`bash
openclaw skills install github-skill
\`\`\`
**Example use case**: Every morning, ask the AI to summarize last night's PR activity and new issues.

### 3. docker-manager
A container management assistant that handles viewing running containers, building images, managing compose services, analyzing logs, and troubleshooting container problems. Saves you from memorizing complex Docker CLI flags.
\`\`\`bash
openclaw skills install docker-manager
\`\`\`
**Example use case**: "Restart all containers in an unhealthy state, then check the logs for OOM errors."

### 4. sql-assistant
Translates natural language into SQL queries. Connect it to your database, describe what you want in plain English, and the AI generates and executes the SQL. Supports PostgreSQL, MySQL, and SQLite, with result visualization built in.
\`\`\`bash
openclaw skills install sql-assistant
\`\`\`
**Example use case**: "Find all users who registered last month and placed at least two orders, sorted by total spend."

### 5. api-tester
Automated API testing and documentation generation. Give it an endpoint URL or an OpenAPI spec file and it generates test cases, runs them, and produces documentation. Handles authentication, environment variables, and chained requests.
\`\`\`bash
openclaw skills install api-tester
\`\`\`
**Example use case**: Drop a Swagger file on it and get a complete API test suite and Markdown documentation back.

## 🔍 Research and Information (Top 5)

### 6. web-search-pro
Goes deeper than the built-in search. Supports multi-engine aggregation, result summarization, and source reliability scoring. You can scope searches to academic papers, news, forums, or other categories, and it cross-verifies results across sources.
\`\`\`bash
openclaw skills install web-search-pro
\`\`\`
**Example use case**: "Search for technical blog posts about AI Agent frameworks from the past month and summarize the key takeaways."

### 7. arxiv-reader
An AI-powered paper reading assistant. Provide an arXiv link or keywords, and it downloads the paper, extracts core content, and generates a structured summary. Supports comparing multiple papers and following citation chains.
\`\`\`bash
openclaw skills install arxiv-reader
\`\`\`
**Example use case**: "Read these three RAG papers and compare their methods and experimental results."

### 8. youtube-summary
Summarizes YouTube videos by extracting subtitles, generating timestamped summaries, and pulling out key insights. Works with multilingual captions.
\`\`\`bash
openclaw skills install youtube-summary
\`\`\`
**Example use case**: "Summarize this 2-hour tech conference talk and list the 10 most important points."

### 9. news-aggregator
Collects information from RSS feeds, Twitter, Reddit, Hacker News, and other sources, then categorizes by topic and generates daily briefings. Supports custom focus areas and update frequencies.
\`\`\`bash
openclaw skills install news-aggregator
\`\`\`
**Example use case**: Automatically generate a daily AI industry briefing every morning and push it to Telegram.

### 10. wikipedia-lookup
More than a search tool -- it extracts structured information, links related articles, and translates multilingual content. Ideal for quickly building background knowledge on any topic.
\`\`\`bash
openclaw skills install wikipedia-lookup
\`\`\`
**Example use case**: "Look up the history of the transformer architecture and summarize it in plain English."

## ⚡ Automation and Productivity (Top 5)

### 11. cron-scheduler
Set up scheduled tasks using natural language. "Send a weekly report every Monday at 9 AM" -- that simple. Supports complex scheduling rules and can chain with other skills for end-to-end automation.
\`\`\`bash
openclaw skills install cron-scheduler
\`\`\`
**Example use case**: "Every day at 6 PM, check server health status. If anything is abnormal, send a Telegram notification."

### 12. email-assistant
Connects to Gmail or Outlook to automatically categorize emails, draft replies, extract action items, and generate email summaries. Supports batch operations and email templates.
\`\`\`bash
openclaw skills install email-assistant
\`\`\`
**Example use case**: "Summarize all unread emails from today and flag the ones that need a reply."

### 13. file-organizer
Analyzes file content and metadata to automatically sort, rename, and move files based on rules you define. Supports custom organization rules and batch processing of large directories.
\`\`\`bash
openclaw skills install file-organizer
\`\`\`
**Example use case**: "Organize everything in my Downloads folder by file type and date into the proper directories."

### 14. backup-manager
Configure backup rules and let it handle incremental backups automatically. Supports local storage, S3, and Google Drive as targets. Provides backup status reports and a guided restore process.
\`\`\`bash
openclaw skills install backup-manager
\`\`\`
**Example use case**: "Back up the database and config files to S3 every night at 3 AM."

### 15. system-monitor
Real-time monitoring for CPU, memory, disk, and network. Set threshold-based alerts that integrate with Telegram or Feishu for instant notifications when something goes wrong.
\`\`\`bash
openclaw skills install system-monitor
\`\`\`
**Example use case**: "Monitor the production server and notify me if CPU exceeds 90% or disk usage goes above 85%."

## ✍️ Content Creation (Top 5)

### 16. nano-banana-pro
AI image generation supporting text-to-image, image editing, and style transfer. Comes with multiple preset art styles, and generated images are ready for social media and documentation use.
\`\`\`bash
openclaw skills install nano-banana-pro
\`\`\`
**Example use case**: "Generate a tech-style blog cover image with the theme of AI Agents."

### 17. markdown-editor
Goes beyond format conversion. It can generate complete articles from outlines, restructure documents, optimize layout, and batch-process multiple files in a single pass.
\`\`\`bash
openclaw skills install markdown-editor
\`\`\`
**Example use case**: "Turn these meeting notes into a properly structured Markdown document with a table of contents."

### 18. translator-pro
Professional-grade translation supporting 50+ languages with understanding of technical terminology and industry context. Translates entire files or directories while preserving formatting. More accurate than general-purpose translators for specialized content.
\`\`\`bash
openclaw skills install translator-pro
\`\`\`
**Example use case**: "Translate this Chinese technical document to English, keeping all code blocks unchanged."

### 19. social-media-kit
Generates platform-specific content from a topic or article. Produces copy, hashtags, and posting recommendations tailored for Twitter, LinkedIn, and other platforms.
\`\`\`bash
openclaw skills install social-media-kit
\`\`\`
**Example use case**: "Turn this blog post into 5 tweets and 1 LinkedIn post."

### 20. podcast-transcriber
Upload an audio file or provide a podcast URL, and it transcribes the content, adds timestamps, identifies speakers, and generates a summary. Supports multiple languages.
\`\`\`bash
openclaw skills install podcast-transcriber
\`\`\`
**Example use case**: "Transcribe this podcast episode, segment by speaker, and generate an English summary."

## 🏠 Smart Home and IoT (Top 5)

### 21. home-assistant
Home Assistant integration that lets you control smart home devices with natural language -- toggle lights, adjust temperature, view cameras, and create automation rules.
\`\`\`bash
openclaw skills install home-assistant
\`\`\`
**Example use case**: "Every night at 11 PM, turn off all lights and set the AC to sleep mode."

### 22. mqtt-bridge
Connects to an MQTT broker and lets you send and receive IoT messages using natural language. Supports device discovery, status monitoring, and data visualization.
\`\`\`bash
openclaw skills install mqtt-bridge
\`\`\`
**Example use case**: "Subscribe to the temperature and humidity sensor data, and generate a trend chart every hour."

### 23. camera-watcher
Connects to network cameras for AI-powered real-time video analysis -- motion detection, face recognition, and anomaly alerts. Supports screenshots and recording.
\`\`\`bash
openclaw skills install camera-watcher
\`\`\`
**Example use case**: "Monitor the front door camera and send a Telegram notification with a screenshot when an unfamiliar person is detected."

### 24. voice-control
Turns OpenClaw into a voice assistant with speech input and output. Chains with other skills for hands-free operation of your entire workflow.
\`\`\`bash
openclaw skills install voice-control
\`\`\`
**Example use case**: Control your entire OpenClaw workflow by voice, keeping your hands free for other work.

### 25. energy-tracker
Tracks home energy consumption from smart meters and devices. Generates usage reports, energy-saving recommendations, and abnormal consumption alerts.
\`\`\`bash
openclaw skills install energy-tracker
\`\`\`
**Example use case**: "Generate last month's home electricity report and highlight which devices used the most power."

## How to Find and Evaluate Skills on ClawHub

Before installing any skill, spend 30 seconds on a basic evaluation:

1. **Check install count and ratings.** Running \`openclaw skills info <skill-name>\` shows the install count, average rating, and recent reviews. Skills with more than 10,000 installs are generally stable and reliable.
2. **Check the publisher.** Publishers with the verified badge have been reviewed by the ClawHub team. Prefer verified publishers when possible.
3. **Review permission requests.** Skills list their required permissions (file read/write, network access, API calls, etc.) at install time. If a "calculator" skill requests network access, that is a red flag.
4. **Look at update frequency.** A skill that is actively maintained is more trustworthy than one that has not been updated in six months.

## How to Create Your Own Skill

If ClawHub does not have what you need, you can build it yourself:

\`\`\`bash
# Initialize a skill project
openclaw skills create my-custom-skill

# Enter the project directory
cd my-custom-skill
\`\`\`

A skill project has a simple structure: a \`manifest.yaml\` that describes the skill's capabilities and permissions, and one or more tool files that implement the actual functionality. After writing your skill, test it locally:

\`\`\`bash
# Load and test locally
openclaw skills dev ./my-custom-skill

# Publish to ClawHub
openclaw skills publish
\`\`\`

Full skill development documentation is available in the [ClawHub Developer Guide](https://clawhub.com/docs/develop).

## Skill Management Quick Reference

\`\`\`bash
# Search for skills
openclaw skills search "image generation"

# Install a skill
openclaw skills install nano-banana-pro

# Install multiple at once
openclaw skills install github-skill web-search-pro cron-scheduler

# List installed skills
openclaw skills list

# Uninstall a skill
openclaw skills uninstall nano-banana-pro

# Update all skills
openclaw skills update --all

# Disable without uninstalling
openclaw skills disable nano-banana-pro

# View skill details and permissions
openclaw skills info nano-banana-pro
\`\`\`

## Frequently Asked Questions

**Q: What should I do if a skill fails to install?**

Check your network connection first. If the network is fine, run \`openclaw skills install <skill-name> --verbose\` to see detailed logs. Most installation failures are caused by network timeouts -- retrying once usually resolves it. If a specific version is causing problems, try \`openclaw skills install <skill-name>@latest\` to force the latest release.

**Q: What happens when two skills have overlapping functionality?**

OpenClaw automatically picks the most relevant skill based on your prompt. If it picks the wrong one, you can be explicit: "use nano-banana-pro to generate this image." You can also set a priority order in your config with \`openclaw config set skills.priority "nano-banana-pro,other-skill"\`.

**Q: Could a skill leak my data?**

All skills on ClawHub go through a basic security review. However, skills that connect to third-party APIs (Feishu, Slack, Notion, etc.) do send data through those platforms. Only install skills you trust, and run \`openclaw skills info <skill-name>\` before installing to review what permissions it requests.

**Q: Is there a limit on how many skills I can install?**

There is no hard limit. That said, we recommend keeping 5 to 8 skills active at a time. Too many active skills slow down the initial response because OpenClaw needs to load their context. You can disable a skill without uninstalling it using \`openclaw skills disable <skill-name>\`.

## FAQ

**Q: How do I install a Skill from this list?**

Run \`openclaw skill install @official/<skill-name>\` or \`@community/<skill-name>\`. The CLI prints the declared permissions and asks you to confirm before fetching.

**Q: Are all Skills safe?**

Official Skills under \`@official/*\` are maintained by the OpenClaw team. Community Skills show the author and signature status at install time — check the permissions declaration and the last-updated date before installing.

**Q: Can I pin a Skill version in production?**

Yes. Add \`version: "x.y.z"\` to the skill entry in your config. ClawHub uses semver, so minor upgrades won't ship surprise breaking changes if you pin.

**Q: How do I uninstall or disable a Skill?**

\`openclaw skill remove <name>\` removes it entirely. To keep it installed but disabled, toggle the \`enabled\` flag in your config.

## Next Steps

- New to Skills? Read [OpenClaw AgentSkills Explained](/blog/openclaw-agentskills-clawhub) first.
- Want the 10-skill starter pack? See [OpenClaw Skills Marketplace](/blog/openclaw-best-skills).
- Building your own Skill? Check the [OpenClaw API Reference](/blog/openclaw-api-reference).
- Browse the full [Skills directory](/skills) for 97+ curated picks.
`,
    author: "Marco Liu",
    date: "2026-03-29",
    category: "技能推荐",
    categoryEn: "Skills",
    tags: ["best skills", "ClawHub", "2026", "must-install", "推荐"],
    readingTime: 22,
    image: "/og-image.png"
  },
  {
    id: 29,
    slug: "openclaw-installation-troubleshooting",
    title: "OpenClaw 安装问题排查指南（2026 版）",
    titleEn: "OpenClaw Installation Troubleshooting (2026 Guide)",
    excerpt: "基于真实安装经验，解决 OpenClaw 安装过程中最常见的 8 个问题——环境不匹配、依赖缺失、API 配置错误等。",
    excerptEn: "A practical, real-world guide to fixing OpenClaw installation issues — based on actual setup experience, not theory.",
    content: `OpenClaw 很强大——但它不是一个开箱即用的工具。

根据我的经验，大多数安装问题来自以下几个方面：

- 环境不匹配（Node / Python / 操作系统）
- 缺少依赖
- API 配置错误
- 权限或路径问题
- 对 OpenClaw 本地运行方式的误解

这篇指南会带你走过你大概率会遇到的真实问题，并告诉你怎么一步步修复。

## 开始之前（关键检查清单）

确保你已经准备好：

- **Node.js**（>= 18，推荐 20+）
- **Python**（>= 3.10）
- **Git** 已安装
- 一个有效的 **API Key**（OpenAI / Claude / 其他）

如果以上任何一项缺失，安装必定失败。

## 问题 1："command not found: claw"

### 这意味着什么

OpenClaw CLI 没有全局安装，或者没有被添加到 PATH。

### 修复方法

\`\`\`bash
npm install -g openclaw
\`\`\`

然后验证：

\`\`\`bash
claw --version
\`\`\`

如果还是不行：

\`\`\`bash
# 查看 npm 全局路径
npm config get prefix

# 将输出的路径添加到你的 PATH
# 例如在 ~/.bashrc 或 ~/.zshrc 中添加：
export PATH="$PATH:$(npm config get prefix)/bin"
\`\`\`

## 问题 2：Node 版本过旧

### 错误示例

- \`Unsupported engine\`
- \`SyntaxError: Unexpected token\`

### 根本原因

你的 Node 版本太旧了。

### 修复方法

\`\`\`bash
node -v
\`\`\`

如果低于 18，使用 nvm 升级：

\`\`\`bash
nvm install 18
nvm use 18
\`\`\`

## 问题 3：API Key 不生效

### 症状

- 请求静默失败
- 出现 "Unauthorized" 错误
- Agent 什么都不做

### 修复方法

正确设置你的 API Key：

\`\`\`bash
export OPENAI_API_KEY=你的密钥
# 或者
export CLAUDE_API_KEY=你的密钥
\`\`\`

然后测试：

\`\`\`bash
claw "say hello"
\`\`\`

如果使用 Claude，确认密钥格式以 \`sk-ant-\` 开头。如果使用 OpenAI，确认以 \`sk-\` 开头。过期或被吊销的密钥不会有明确的错误提示，只是静默失败。

## 问题 4：权限错误（Mac/Linux）

### 错误信息

\`\`\`
EACCES: permission denied
\`\`\`

### 修复方法

不要盲目使用 \`sudo\`。正确做法：

\`\`\`bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) $(npm config get prefix)/lib/node_modules
\`\`\`

然后重新安装。

## 问题 5：Python 环境冲突

### 症状

- 工具执行失败
- 脚本报错
- 缺少模块

### 修复方法

创建一个干净的虚拟环境：

\`\`\`bash
python -m venv claw-env
source claw-env/bin/activate
pip install -r requirements.txt
\`\`\`

## 问题 6：OpenClaw 运行但什么都不做

这个问题非常常见。你运行：

\`\`\`bash
claw do something
\`\`\`

……然后什么都没发生。

### 根本原因

- 没有安装技能
- 没有配置工具权限
- 选错了模型

### 修复方法

- 从 ClawHub 安装技能
- 检查配置文件
- 明确指定操作：

\`\`\`bash
claw write a Python script that scrapes a website
\`\`\`

关键：模糊的提示 = 没有执行。越具体越好。

## 问题 7：文件 / 浏览器操作不生效

### 症状

- 无法打开浏览器
- 无法写入文件
- 自动化失败

### 根本原因

本地权限未授予。

### 修复方法

- **macOS**：在系统设置中为终端启用"文件和文件夹"以及"辅助功能"权限
- **Windows**：如果需要，以管理员身份运行终端
- 检查 OpenClaw 配置中的允许操作列表

## 问题 8：安装成功但运行缓慢或不稳定

### 可能原因

- 使用了较弱的 API 模型
- 触发了速率限制
- 网络问题

### 修复方法

- 切换模型（GPT-4o / Claude 3.5 / 本地 LLM）
- 添加重试逻辑
- 避免在单个命令中执行过于复杂的任务

## 真实安装示例（验证安装是否成功）

这是一个最小可用的安装流程：

\`\`\`bash
npm install -g openclaw
export OPENAI_API_KEY=你的密钥

claw write a Python script that fetches latest AI news
\`\`\`

预期行为：

1. 生成代码
2. 保存文件
3. 输出结果

如果这个流程不通——你的安装还没搞定。

## 实用建议（来自真实使用经验）

- 永远从简单命令开始测试
- 不要一上来就搞自动化——先测基本操作
- 使用明确的指令，不要用模糊的提示
- 查看日志——OpenClaw 通常会告诉你哪里出了问题

## 什么时候该全部重装

如果你遇到了多个问题叠加，不要无休止地调试——直接重置：

\`\`\`bash
npm uninstall -g openclaw
npm cache clean --force
npm install -g openclaw
\`\`\`

## 最终检查清单

在说"它不工作"之前，确认以下每一项：

- Node >= 18
- Python 已安装
- API Key 有效
- CLI 可访问（\`claw --version\` 有输出）
- 至少一个简单命令能正常执行

## 常见问题

**Q：我按步骤做了，但 \`claw\` 命令还是找不到？**

重新打开终端窗口。npm 全局安装后，当前终端会话可能还没加载新的 PATH。如果新终端还是不行，手动检查 \`npm config get prefix\` 的路径是否在你的 \`$PATH\` 中。

**Q：OpenClaw 支持 Windows 原生环境吗？**

支持，但推荐使用 WSL2（Windows Subsystem for Linux）。原生 Windows 环境下某些文件操作和浏览器控制功能可能受限。

**Q：免费模型能用吗？**

可以。通过 Ollama 运行本地模型（如 Llama 3）完全免费。但本地模型的响应质量和速度取决于你的硬件。对于复杂任务，建议使用 Claude 或 GPT-4o。

**Q：安装后第一件事应该做什么？**

运行 \`claw "say hello"\`。如果你能看到 AI 的回复，说明环境、API Key、CLI 都没问题。然后再逐步尝试更复杂的操作。

---

安装问题是正常的，不是你做错了什么。重要的是：先修好环境，逐步测试，使用清晰的命令。一旦安装成功，OpenClaw 的能力会让你惊喜。`,
    contentEn: `OpenClaw is powerful — but it is not a plug-and-play tool.

From my experience, most installation problems come from:

- Environment mismatch (Node / Python / OS)
- Missing dependencies
- Incorrect API configuration
- Permission or path issues
- Misunderstanding how OpenClaw actually runs locally

This guide walks through real problems you will likely hit, and how to fix them step by step.

## Before You Start (Critical Checklist)

Make sure you have:

- **Node.js** (>= 18, 20+ recommended)
- **Python** (>= 3.10)
- **Git** installed
- A valid **API key** (OpenAI / Claude / etc.)

If any of these are missing, installation will fail — guaranteed.

## Problem 1: "command not found: claw"

### What it means

OpenClaw CLI is not installed globally or not added to PATH.

### Fix

\`\`\`bash
npm install -g openclaw
\`\`\`

Then verify:

\`\`\`bash
claw --version
\`\`\`

If still not working:

\`\`\`bash
# Check npm global path
npm config get prefix

# Add it to your PATH (in ~/.bashrc or ~/.zshrc):
export PATH="$PATH:$(npm config get prefix)/bin"
\`\`\`

## Problem 2: Node Version Issues

### Error examples

- \`Unsupported engine\`
- \`SyntaxError: Unexpected token\`

### Root cause

Your Node version is too old.

### Fix

\`\`\`bash
node -v
\`\`\`

If below 18, use nvm:

\`\`\`bash
nvm install 18
nvm use 18
\`\`\`

## Problem 3: API Key Not Working

### Symptoms

- Requests fail silently
- "Unauthorized" errors
- Agent does nothing

### Fix

Set your API key correctly:

\`\`\`bash
export OPENAI_API_KEY=your_key_here
# Or:
export CLAUDE_API_KEY=your_key_here
\`\`\`

Then test:

\`\`\`bash
claw "say hello"
\`\`\`

If using Claude, confirm the key starts with \`sk-ant-\`. For OpenAI, it should start with \`sk-\`. Expired or revoked keys fail silently — there is no explicit error message, it just does nothing.

## Problem 4: Permission Errors (Mac/Linux)

### Error

\`\`\`
EACCES: permission denied
\`\`\`

### Fix

Do not use \`sudo\` blindly. Instead:

\`\`\`bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) $(npm config get prefix)/lib/node_modules
\`\`\`

Then reinstall.

## Problem 5: Python Environment Conflicts

### Symptoms

- Tool execution fails
- Script errors
- Missing modules

### Fix

Create a clean virtual environment:

\`\`\`bash
python -m venv claw-env
source claw-env/bin/activate
pip install -r requirements.txt
\`\`\`

## Problem 6: OpenClaw Runs but Does Nothing

This is very common. You run:

\`\`\`bash
claw do something
\`\`\`

…and nothing happens.

### Root cause

- No skills installed
- No tool permissions configured
- Wrong model selected

### Fix

- Install skills from ClawHub
- Check your config file
- Be specific with your instructions:

\`\`\`bash
claw write a Python script that scrapes a website
\`\`\`

Vague prompts produce no execution. The more specific you are, the better OpenClaw performs.

## Problem 7: File / Browser Actions Not Working

### Symptoms

- Cannot open browser
- Cannot write files
- Automation fails

### Root cause

Local permissions not granted.

### Fix

- **macOS**: Enable Terminal permissions for Files and Accessibility in System Settings
- **Windows**: Run terminal as administrator if needed
- Check OpenClaw config for allowed actions

## Problem 8: Installation Works, But It's Slow or Unstable

### Causes

- Weak API model
- Rate limits
- Network issues

### Fix

- Switch model (GPT-4o / Claude 3.5 / local LLM via Ollama)
- Add retry logic in your config
- Avoid overly complex tasks in a single command

## Real Setup Example (What Actually Works)

Here is a minimal working setup you can use to verify everything is configured:

\`\`\`bash
npm install -g openclaw
export OPENAI_API_KEY=your_key

claw write a Python script that fetches latest AI news
\`\`\`

Expected behavior:

1. Generates code
2. Saves file to disk
3. Outputs result

If this does not work, your setup is still broken. Go back through the checklist.

## Pro Tips (From Real Usage)

- **Always start with simple commands.** Run \`claw "say hello"\` before trying anything complex.
- **Do not try automation first.** Test basic actions like writing a file or running a script.
- **Use explicit instructions, not vague prompts.** "Write a Python script that…" works. "Do something cool" does not.
- **Check logs.** OpenClaw usually tells you what failed. Run with \`--verbose\` flag for more detail.
- **Test your API key independently.** Use curl to verify the key works before blaming OpenClaw:

\`\`\`bash
curl https://api.openai.com/v1/models \\
  -H "Authorization: Bearer $OPENAI_API_KEY"
\`\`\`

If this returns a list of models, the key is valid.

## When You Should Reinstall Everything

If you hit multiple overlapping issues, do not debug forever — reset:

\`\`\`bash
npm uninstall -g openclaw
npm cache clean --force
npm install -g openclaw
\`\`\`

This takes 30 seconds and eliminates most corrupted-state problems.

## Final Checklist

Before saying "it does not work," confirm every single one of these:

- Node >= 18 (\`node -v\`)
- Python installed (\`python --version\`)
- API key valid (test with curl)
- CLI accessible (\`claw --version\` returns a version number)
- At least one simple command works (\`claw "say hello"\`)

If all five pass and you still have issues, the problem is likely in your specific command or skill configuration — not the installation itself.

## FAQ

**Q: I followed every step but \`claw\` command is still not found?**

Close and reopen your terminal. After a global npm install, the current shell session may not have loaded the updated PATH. If a fresh terminal still cannot find it, manually check that the output of \`npm config get prefix\` is in your \`$PATH\` environment variable.

**Q: Does OpenClaw work on native Windows?**

Yes, but WSL2 (Windows Subsystem for Linux) is recommended. Some file operations and browser control features may be limited on native Windows. If you are on Windows, install WSL2 first, then install OpenClaw inside the Linux environment.

**Q: Can I use free models?**

Yes. Running local models through Ollama (like Llama 3 or Mistral) is completely free. However, response quality and speed depend on your hardware — you need at least 8GB RAM for smaller models and a decent GPU for larger ones. For complex tasks, Claude or GPT-4o will give better results.

**Q: What should I do first after installation?**

Run \`claw "say hello"\`. If you see the AI respond, your environment, API key, and CLI are all working. From there, try progressively more complex tasks: write a file, run a script, install a skill.

**Q: How do I know if my problem is installation vs. configuration?**

If \`claw --version\` works but \`claw "say hello"\` does not, it is a configuration issue (usually API key). If \`claw --version\` itself fails, it is an installation issue (PATH, Node version, or npm problem).

---

Installation problems are normal — they are not a sign you are doing something wrong. What matters is: fix the environment first, test step by step, and use clear commands. Once the setup works, OpenClaw becomes incredibly powerful. The installation phase is where most people quit, but it is also the shortest part of the journey.`,
    author: "Alex Chen",
    date: "2026-04-09",
    category: "配置教程",
    categoryEn: "Troubleshooting",
    tags: ["installation", "troubleshooting", "setup", "beginner", "2026"],
    readingTime: 18,
    image: "/og-image.png"
  },
  {
    id: 30,
    slug: "openclaw-common-errors",
    title: "15 Common OpenClaw Errors (2026) — Fix Them Fast",
    titleEn: "15 Common OpenClaw Errors (2026) — Fix Them Fast (Step-by-Step)",
    excerpt: "If OpenClaw doesn't work, it's usually one of these errors. Real-world fixes for the 15 most common issues.",
    excerptEn: "If OpenClaw doesn't work, it's usually one of these errors. This guide lists the most common real-world issues — and exactly how to fix them.",
    content: `If OpenClaw "doesn't work", it's usually one of these errors. This guide lists the most common real-world issues — and exactly how to fix them.

## Why OpenClaw Errors Are So Common

OpenClaw is not just a chatbot — it executes real tasks.

That means errors can come from:

- Your local environment
- API configuration
- Permissions
- Skills / tools setup
- Your command itself

Most problems are NOT bugs — they are setup issues.

## Error #1: claw: command not found

**Cause:** CLI not installed or not in PATH.

\`\`\`bash
npm install -g openclaw
claw --version
\`\`\`

If still failing, fix your PATH:

\`\`\`bash
npm config get prefix
# Add the output path to your shell profile
export PATH="$PATH:$(npm config get prefix)/bin"
\`\`\`

## Error #2: "Unauthorized" / API Key Errors

**Cause:** Missing or incorrect API key.

\`\`\`bash
export OPENAI_API_KEY=your_key
# Or:
export CLAUDE_API_KEY=your_key
\`\`\`

Test it:

\`\`\`bash
claw "say hello"
\`\`\`

If using Claude, make sure the key starts with \`sk-ant-\`. For OpenAI, it starts with \`sk-\`. Expired keys fail silently — no error message, just nothing happens.

## Error #3: OpenClaw Runs But Does Nothing

This is the #1 confusion new users face.

**Cause:** No skills installed, vague command, or wrong model.

Bad:

\`\`\`bash
claw do something
\`\`\`

Good:

\`\`\`bash
claw write a Python script that scrapes Hacker News
\`\`\`

OpenClaw needs clear intent and an executable task. "Do something" is not a task — "write a Python script that does X" is.

## Error #4: "Unsupported engine" / Syntax Errors

**Cause:** Old Node.js version.

\`\`\`bash
node -v
\`\`\`

If below 18:

\`\`\`bash
nvm install 18
nvm use 18
\`\`\`

OpenClaw uses modern JavaScript features that require Node 18+. Anything older will produce cryptic syntax errors.

## Error #5: Permission Denied (EACCES)

**Cause:** npm or system permission issues.

\`\`\`bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) $(npm config get prefix)/lib/node_modules
\`\`\`

Never use \`sudo npm install -g\`. Fix ownership instead.

## Error #6: Skills Not Found / Not Working

**Cause:** Skills not installed or not enabled.

\`\`\`bash
# Search for a skill
openclaw skills search image

# Install it
openclaw skills install nano-banana-pro

# Verify it is active
openclaw skills list
\`\`\`

If a skill was installed but is not responding, restart the CLI. Some skills require a restart to load their configuration.

## Error #7: File Operations Fail

**Symptoms:** Cannot create files, cannot write output.

**Cause:** Local permissions not granted.

- **macOS**: Go to System Settings > Privacy & Security > Files and Folders. Enable access for your terminal app.
- **Windows**: Run your terminal as Administrator if needed.
- **Linux**: Check that the working directory is writable: \`ls -la .\`

## Error #8: Browser Automation Not Working

**Cause:** Missing browser control permissions or Playwright not installed.

\`\`\`bash
# Install Playwright browsers
npx playwright install

# On macOS, enable Accessibility permissions for your terminal
# System Settings > Privacy & Security > Accessibility
\`\`\`

Test with a simple command first:

\`\`\`bash
claw "take a screenshot of google.com"
\`\`\`

## Error #9: Python Execution Errors

**Cause:** Missing dependencies or environment conflict.

\`\`\`bash
python -m venv claw-env
source claw-env/bin/activate
pip install -r requirements.txt
\`\`\`

If you are using a system Python that conflicts with other tools, a virtual environment isolates everything cleanly.

## Error #10: Rate Limit / Timeout Errors

**Cause:** API limits hit, or network instability.

**Symptoms:** Errors like \`429 Too Many Requests\` or \`Timeout\`.

**Fix:**

- Switch to a model with higher rate limits
- Add a delay between requests in your config
- Break large tasks into smaller, sequential steps

\`\`\`bash
# Check your current rate limit status
openclaw config get model
# Switch to a model with better limits
openclaw config set model anthropic/claude-3-haiku
\`\`\`

## Error #11: Model Not Responding Properly

**Cause:** Wrong model selected, or the model cannot handle the task.

**Fix:**

- Switch to a more capable model for complex tasks:

\`\`\`bash
openclaw config set model anthropic/claude-3.5-sonnet
\`\`\`

- Use structured, specific instructions instead of open-ended prompts
- For coding tasks, Claude and GPT-4o perform significantly better than smaller models

## Error #12: Output Is Wrong or Incomplete

**Cause:** Prompt is too vague.

Bad:

\`\`\`bash
claw build a bot
\`\`\`

Good:

\`\`\`bash
claw build a Telegram bot that sends daily weather updates for San Francisco at 9am
\`\`\`

Specificity is everything. The more detail you provide — what platform, what data, what format, what schedule — the more reliable the output.

## Error #13: Installation Succeeded But Commands Fail

**Cause:** Partial setup or missing configuration.

Run through this diagnostic:

\`\`\`bash
# 1. CLI works?
claw --version

# 2. API key set?
echo $OPENAI_API_KEY

# 3. Simple command works?
claw "say hello"

# 4. If all above pass, try:
claw "write hello world to test.txt"
\`\`\`

If step 1 passes but step 3 fails, your API key is the problem. If step 3 passes but step 4 fails, it is a permissions issue.

## Error #14: "Module Not Found" Errors

**Cause:** Missing dependencies after a partial install or update.

\`\`\`bash
# For Node dependencies
npm install

# For Python dependencies
pip install -r requirements.txt

# Nuclear option: clean reinstall
npm uninstall -g openclaw
npm cache clean --force
npm install -g openclaw
\`\`\`

## Error #15: Everything Works… But It's Too Slow

**Causes:** Large tasks, weak model, or network latency.

**Fix:**

- Split complex tasks into smaller steps
- Use a faster model (Claude Haiku for simple tasks, Sonnet for complex ones)
- Use local models via Ollama for tasks that do not need top-tier quality:

\`\`\`bash
openclaw config set model ollama/llama3
\`\`\`

- Avoid chaining too many steps in a single command

## Real Debug Workflow (What Actually Works)

When something breaks, follow this order — do not skip steps:

\`\`\`bash
# Step 1: Check CLI
claw --version

# Step 2: Test API
claw "say hello"

# Step 3: Try simple file task
claw "write hello world to test.txt"

# Step 4: Then increase complexity
claw "write a Python script that fetches HN top stories"
\`\`\`

If it fails at step 1, it is an installation problem. If it fails at step 2, it is an API key problem. If it fails at step 3, it is a permissions problem. Only debug complex workflows after steps 1-3 pass.

## Pro Tips (From Real Usage)

- **Start small, then scale.** Verify \`claw "say hello"\` before attempting multi-step automation.
- **Always verify environment first.** 90% of "OpenClaw is broken" reports are actually environment issues.
- **Be explicit with commands.** The difference between a command that works and one that does not is usually specificity.
- **Check logs.** Run with \`--verbose\` for detailed output. The error message almost always tells you exactly what went wrong.
- **Test your API key independently.** Before blaming OpenClaw, verify the key works:

\`\`\`bash
curl https://api.openai.com/v1/models \\
  -H "Authorization: Bearer $OPENAI_API_KEY"
\`\`\`

## When to Stop Debugging and Reset

If you have hit 3 or more issues and spent more than 30 minutes debugging:

\`\`\`bash
npm uninstall -g openclaw
npm cache clean --force
npm install -g openclaw
\`\`\`

A clean reinstall takes 30 seconds and eliminates most corrupted-state problems. It is almost always faster than tracking down multiple interacting issues.

## FAQ

**Q: How do I know if the error is on my side or OpenClaw's side?**

If \`claw --version\` works and \`claw "say hello"\` returns a response, OpenClaw itself is fine. Any issues after that point are either in your prompt, your permissions, or your specific skill configuration.

**Q: I get different errors on macOS vs Linux — is that normal?**

Yes. Permission models differ between operating systems. macOS requires explicit app-level permissions (Files, Accessibility). Linux typically just needs correct file ownership. Windows works best under WSL2.

**Q: Can I use OpenClaw without an API key?**

Only if you run a local model through Ollama or LocalAI. Cloud models (Claude, GPT) require a valid API key. Running \`openclaw config set model ollama/llama3\` lets you skip the API key entirely.

**Q: What is the single most common error?**

Error #3 — "runs but does nothing." It is almost always caused by vague prompts. Being specific about what you want OpenClaw to do solves it immediately.

**Q: Where do I report actual bugs?**

If you have confirmed the issue is not environmental (steps 1-3 in the debug workflow pass) and you can reproduce it consistently, file an issue at [github.com/openclaw/openclaw/issues](https://github.com/openclaw/openclaw/issues).

---

Most OpenClaw errors are predictable and fixable. The key is: understand what failed (not just that it failed), fix the environment first, and use clear, structured commands. Once these are stable, OpenClaw becomes extremely reliable.`,
    contentEn: `If OpenClaw "doesn't work", it's usually one of these errors. This guide lists the most common real-world issues — and exactly how to fix them.

## Why OpenClaw Errors Are So Common

OpenClaw is not just a chatbot — it executes real tasks.

That means errors can come from:

- Your local environment
- API configuration
- Permissions
- Skills / tools setup
- Your command itself

Most problems are NOT bugs — they are setup issues.

## Error #1: claw: command not found

**Cause:** CLI not installed or not in PATH.

\`\`\`bash
npm install -g openclaw
claw --version
\`\`\`

If still failing, fix your PATH:

\`\`\`bash
npm config get prefix
# Add the output path to your shell profile
export PATH="$PATH:$(npm config get prefix)/bin"
\`\`\`

## Error #2: "Unauthorized" / API Key Errors

**Cause:** Missing or incorrect API key.

\`\`\`bash
export OPENAI_API_KEY=your_key
# Or:
export CLAUDE_API_KEY=your_key
\`\`\`

Test it:

\`\`\`bash
claw "say hello"
\`\`\`

If using Claude, make sure the key starts with \`sk-ant-\`. For OpenAI, it starts with \`sk-\`. Expired keys fail silently — no error message, just nothing happens.

## Error #3: OpenClaw Runs But Does Nothing

This is the #1 confusion new users face.

**Cause:** No skills installed, vague command, or wrong model.

Bad:

\`\`\`bash
claw do something
\`\`\`

Good:

\`\`\`bash
claw write a Python script that scrapes Hacker News
\`\`\`

OpenClaw needs clear intent and an executable task. "Do something" is not a task — "write a Python script that does X" is.

## Error #4: "Unsupported engine" / Syntax Errors

**Cause:** Old Node.js version.

\`\`\`bash
node -v
\`\`\`

If below 18:

\`\`\`bash
nvm install 18
nvm use 18
\`\`\`

OpenClaw uses modern JavaScript features that require Node 18+. Anything older will produce cryptic syntax errors.

## Error #5: Permission Denied (EACCES)

**Cause:** npm or system permission issues.

\`\`\`bash
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) $(npm config get prefix)/lib/node_modules
\`\`\`

Never use \`sudo npm install -g\`. Fix ownership instead.

## Error #6: Skills Not Found / Not Working

**Cause:** Skills not installed or not enabled.

\`\`\`bash
# Search for a skill
openclaw skills search image

# Install it
openclaw skills install nano-banana-pro

# Verify it is active
openclaw skills list
\`\`\`

If a skill was installed but is not responding, restart the CLI. Some skills require a restart to load their configuration.

## Error #7: File Operations Fail

**Symptoms:** Cannot create files, cannot write output.

**Cause:** Local permissions not granted.

- **macOS**: Go to System Settings > Privacy & Security > Files and Folders. Enable access for your terminal app.
- **Windows**: Run your terminal as Administrator if needed.
- **Linux**: Check that the working directory is writable: \`ls -la .\`

## Error #8: Browser Automation Not Working

**Cause:** Missing browser control permissions or Playwright not installed.

\`\`\`bash
# Install Playwright browsers
npx playwright install

# On macOS, enable Accessibility permissions for your terminal
# System Settings > Privacy & Security > Accessibility
\`\`\`

Test with a simple command first:

\`\`\`bash
claw "take a screenshot of google.com"
\`\`\`

## Error #9: Python Execution Errors

**Cause:** Missing dependencies or environment conflict.

\`\`\`bash
python -m venv claw-env
source claw-env/bin/activate
pip install -r requirements.txt
\`\`\`

If you are using a system Python that conflicts with other tools, a virtual environment isolates everything cleanly.

## Error #10: Rate Limit / Timeout Errors

**Cause:** API limits hit, or network instability.

**Symptoms:** Errors like \`429 Too Many Requests\` or \`Timeout\`.

**Fix:**

- Switch to a model with higher rate limits
- Add a delay between requests in your config
- Break large tasks into smaller, sequential steps

\`\`\`bash
# Check your current rate limit status
openclaw config get model
# Switch to a model with better limits
openclaw config set model anthropic/claude-3-haiku
\`\`\`

## Error #11: Model Not Responding Properly

**Cause:** Wrong model selected, or the model cannot handle the task.

**Fix:**

- Switch to a more capable model for complex tasks:

\`\`\`bash
openclaw config set model anthropic/claude-3.5-sonnet
\`\`\`

- Use structured, specific instructions instead of open-ended prompts
- For coding tasks, Claude and GPT-4o perform significantly better than smaller models

## Error #12: Output Is Wrong or Incomplete

**Cause:** Prompt is too vague.

Bad:

\`\`\`bash
claw build a bot
\`\`\`

Good:

\`\`\`bash
claw build a Telegram bot that sends daily weather updates for San Francisco at 9am
\`\`\`

Specificity is everything. The more detail you provide — what platform, what data, what format, what schedule — the more reliable the output.

## Error #13: Installation Succeeded But Commands Fail

**Cause:** Partial setup or missing configuration.

Run through this diagnostic:

\`\`\`bash
# 1. CLI works?
claw --version

# 2. API key set?
echo $OPENAI_API_KEY

# 3. Simple command works?
claw "say hello"

# 4. If all above pass, try:
claw "write hello world to test.txt"
\`\`\`

If step 1 passes but step 3 fails, your API key is the problem. If step 3 passes but step 4 fails, it is a permissions issue.

## Error #14: "Module Not Found" Errors

**Cause:** Missing dependencies after a partial install or update.

\`\`\`bash
# For Node dependencies
npm install

# For Python dependencies
pip install -r requirements.txt

# Nuclear option: clean reinstall
npm uninstall -g openclaw
npm cache clean --force
npm install -g openclaw
\`\`\`

## Error #15: Everything Works… But It's Too Slow

**Causes:** Large tasks, weak model, or network latency.

**Fix:**

- Split complex tasks into smaller steps
- Use a faster model (Claude Haiku for simple tasks, Sonnet for complex ones)
- Use local models via Ollama for tasks that do not need top-tier quality:

\`\`\`bash
openclaw config set model ollama/llama3
\`\`\`

- Avoid chaining too many steps in a single command

## Real Debug Workflow (What Actually Works)

When something breaks, follow this order — do not skip steps:

\`\`\`bash
# Step 1: Check CLI
claw --version

# Step 2: Test API
claw "say hello"

# Step 3: Try simple file task
claw "write hello world to test.txt"

# Step 4: Then increase complexity
claw "write a Python script that fetches HN top stories"
\`\`\`

If it fails at step 1, it is an installation problem. If it fails at step 2, it is an API key problem. If it fails at step 3, it is a permissions problem. Only debug complex workflows after steps 1-3 pass.

## Pro Tips (From Real Usage)

- **Start small, then scale.** Verify \`claw "say hello"\` before attempting multi-step automation.
- **Always verify environment first.** 90% of "OpenClaw is broken" reports are actually environment issues.
- **Be explicit with commands.** The difference between a command that works and one that does not is usually specificity.
- **Check logs.** Run with \`--verbose\` for detailed output. The error message almost always tells you exactly what went wrong.
- **Test your API key independently.** Before blaming OpenClaw, verify the key works:

\`\`\`bash
curl https://api.openai.com/v1/models \\
  -H "Authorization: Bearer $OPENAI_API_KEY"
\`\`\`

## When to Stop Debugging and Reset

If you have hit 3 or more issues and spent more than 30 minutes debugging:

\`\`\`bash
npm uninstall -g openclaw
npm cache clean --force
npm install -g openclaw
\`\`\`

A clean reinstall takes 30 seconds and eliminates most corrupted-state problems. It is almost always faster than tracking down multiple interacting issues.

## FAQ

**Q: How do I know if the error is on my side or OpenClaw's side?**

If \`claw --version\` works and \`claw "say hello"\` returns a response, OpenClaw itself is fine. Any issues after that point are either in your prompt, your permissions, or your specific skill configuration.

**Q: I get different errors on macOS vs Linux — is that normal?**

Yes. Permission models differ between operating systems. macOS requires explicit app-level permissions (Files, Accessibility). Linux typically just needs correct file ownership. Windows works best under WSL2.

**Q: Can I use OpenClaw without an API key?**

Only if you run a local model through Ollama or LocalAI. Cloud models (Claude, GPT) require a valid API key. Running \`openclaw config set model ollama/llama3\` lets you skip the API key entirely.

**Q: What is the single most common error?**

Error #3 — "runs but does nothing." It is almost always caused by vague prompts. Being specific about what you want OpenClaw to do solves it immediately.

**Q: Where do I report actual bugs?**

If you have confirmed the issue is not environmental (steps 1-3 in the debug workflow pass) and you can reproduce it consistently, file an issue at [github.com/openclaw/openclaw/issues](https://github.com/openclaw/openclaw/issues).

---

Most OpenClaw errors are predictable and fixable. The key is: understand what failed (not just that it failed), fix the environment first, and use clear, structured commands. Once these are stable, OpenClaw becomes extremely reliable.`,
    author: "Alex Chen",
    date: "2026-04-09",
    category: "Troubleshooting",
    categoryEn: "Troubleshooting",
    tags: ["errors", "troubleshooting", "common errors", "fix", "debug", "2026"],
    readingTime: 20,
    image: "/og-image.png"
  },
  {
    id: 31,
    slug: "openclaw-docker-compose-setup",
    title: "OpenClaw Docker Compose 部署完整指南",
    titleEn: "OpenClaw Docker Compose Setup — Complete Deployment Guide (2026)",
    excerpt: "使用 Docker Compose 一键部署 OpenClaw，包含数据持久化、环境变量配置、多服务编排和生产环境最佳实践。",
    excerptEn: "Deploy OpenClaw with Docker Compose in minutes. Includes docker-compose.yml examples, environment variables, persistent storage, multi-service setup, and production tips.",
    content: `如果你正在寻找一种可靠、可重复、易于维护的方式来运行 OpenClaw，Docker Compose 是最佳选择。它把所有依赖打包在容器里，不会污染宿主机环境，升级回滚都只需要一条命令。本文将从零开始，带你完成 OpenClaw 的 Docker Compose 部署，涵盖基础配置、高级多服务编排和生产环境加固。

## 为什么用 Docker Compose 部署 OpenClaw

在部署 OpenClaw 时，你有多种选择：直接安装、Docker 单容器、Docker Compose 多服务编排。Docker Compose 是其中最平衡的方案，原因如下：

- **环境隔离：** OpenClaw 运行在独立容器中，不会与宿主机上的 Node.js 版本、系统依赖产生冲突。你可以在同一台服务器上运行多个不同版本的 OpenClaw。
- **可重复性：** 一个 \`docker-compose.yml\` 文件完整描述了所有服务、网络、存储卷。团队里任何人拿到这个文件，\`docker compose up -d\` 就能启动完全相同的环境。
- **轻松升级：** 更新 OpenClaw 只需要 \`docker compose pull && docker compose up -d\`，旧容器自动被替换，数据卷不受影响。
- **多服务编排：** 需要 Redis 缓存？需要 PostgreSQL 持久化？需要 Nginx 反向代理？在 compose 文件里加几行就行，所有服务共享同一个网络，互相通过服务名访问。
- **一键启停：** \`docker compose up -d\` 启动全部服务，\`docker compose down\` 停止并清理。没有遗漏的后台进程，没有端口冲突。

如果你只是在本地测试，单个 \`docker run\` 命令也够用。但一旦涉及生产部署、多服务协作或团队协作，Docker Compose 的优势就非常明显了。

## 前置条件

在开始之前，确保你的机器上已经安装了 Docker 和 Docker Compose：

\`\`\`bash
# 检查 Docker 版本（需要 20.10+）
docker --version
# Docker version 24.0.7, build afdd53b

# 检查 Docker Compose 版本（需要 v2.0+）
docker compose version
# Docker Compose version v2.23.0
\`\`\`

如果还没有安装 Docker，按照官方指南操作：

- **Ubuntu/Debian：** \`curl -fsSL https://get.docker.com | sh\`
- **macOS：** 安装 Docker Desktop for Mac
- **Windows：** 安装 Docker Desktop for Windows（推荐使用 WSL2 后端）

安装完成后，确保你的用户在 docker 组里（Linux）：

\`\`\`bash
sudo usermod -aG docker $USER
# 重新登录生效
\`\`\`

你还需要至少一个 LLM API Key（OpenAI、Anthropic 或 Google AI）。

## 基础 docker-compose.yml

创建一个项目目录，编写最基础的 compose 文件：

\`\`\`bash
mkdir openclaw-deploy && cd openclaw-deploy
\`\`\`

创建 \`docker-compose.yml\`：

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
    env_file:
      - .env
\`\`\`

这个文件定义了一个服务 \`openclaw\`，关键字段解释如下：

| 字段 | 作用 |
|------|------|
| \`image\` | 使用官方镜像，\`latest\` 标签始终指向最新稳定版 |
| \`container_name\` | 固定容器名称，方便管理 |
| \`restart: unless-stopped\` | 容器异常退出时自动重启，手动停止不重启 |
| \`ports\` | 将容器内 3000 端口映射到宿主机 3000 端口 |
| \`volumes\` | 挂载数据目录和配置目录，保证数据持久化 |
| \`env_file\` | 从 .env 文件读取环境变量 |

启动服务：

\`\`\`bash
docker compose up -d
# 查看日志
docker compose logs -f openclaw
\`\`\`

## 环境变量配置

在项目目录下创建 \`.env\` 文件，存放所有敏感配置：

\`\`\`bash
# .env 文件 —— 不要提交到 git
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
GOOGLE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxx

# OpenClaw 配置
OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
OPENCLAW_PORT=3000
OPENCLAW_LOG_LEVEL=info

# Telegram Bot（可选）
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_ALLOWED_USERS=user_id_1,user_id_2

# Discord Bot（可选）
DISCORD_BOT_TOKEN=MTIzNDU2Nzg5.xxxxx.xxxxxxxxxx

# 飞书 Bot（可选）
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

务必将 \`.env\` 加入 \`.gitignore\`：

\`\`\`bash
echo ".env" >> .gitignore
\`\`\`

## 高级配置：Redis 缓存 + PostgreSQL

对于需要缓存对话历史、支持多用户并发的场景，推荐加入 Redis 和 PostgreSQL：

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://openclaw:openclaw_pass@postgres:5432/openclaw
    env_file:
      - .env
    depends_on:
      redis:
        condition: service_healthy
      postgres:
        condition: service_healthy

  redis:
    image: redis:7-alpine
    container_name: openclaw-redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  postgres:
    image: postgres:16-alpine
    container_name: openclaw-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: openclaw
      POSTGRES_PASSWORD: openclaw_pass
      POSTGRES_DB: openclaw
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U openclaw"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  redis_data:
  postgres_data:
\`\`\`

这个配置的核心变化：

- **Redis** 用于缓存对话上下文、频率限制计数等。使用 Alpine 镜像，体积只有 30MB。
- **PostgreSQL** 用于持久化对话历史、用户设置、Bot 配置等。数据存储在 Docker 命名卷中。
- **depends_on + healthcheck** 确保 OpenClaw 在 Redis 和 PostgreSQL 完全就绪后才启动，避免连接错误。
- **命名卷（named volumes）** 比绑定挂载更适合数据库存储，Docker 会自动管理文件权限。

## 数据持久化详解

Docker 容器是临时的，容器删除后内部数据全部丢失。所以必须通过卷（volumes）将重要数据映射到宿主机。

OpenClaw 的关键数据目录：

| 容器内路径 | 内容 | 建议挂载方式 |
|------------|------|--------------|
| \`/root/.openclaw\` | 对话历史、Agent 记忆、本地数据 | 绑定挂载到 \`./data\` |
| \`/root/.openclaw/config\` | 配置文件、模型设置、平台连接 | 绑定挂载到 \`./config\` |
| PostgreSQL 数据 | 数据库文件 | 命名卷 \`postgres_data\` |
| Redis 数据 | 缓存快照 | 命名卷 \`redis_data\` |

备份策略：

\`\`\`bash
# 备份 OpenClaw 数据
tar czf backup-openclaw-$(date +%Y%m%d).tar.gz ./data ./config

# 备份 PostgreSQL
docker compose exec postgres pg_dump -U openclaw openclaw > backup-db-$(date +%Y%m%d).sql

# 备份 Redis
docker compose exec redis redis-cli BGSAVE
docker cp openclaw-redis:/data/dump.rdb ./backup-redis-$(date +%Y%m%d).rdb
\`\`\`

## 更新 OpenClaw

更新只需要两条命令：

\`\`\`bash
# 拉取最新镜像
docker compose pull

# 重建并启动（数据卷不受影响）
docker compose up -d
\`\`\`

如果需要锁定特定版本，将 \`image\` 标签改为具体版本号：

\`\`\`yaml
image: openclaw/openclaw:1.3.2
\`\`\`

回滚到上一个版本：

\`\`\`bash
# 指定版本号
docker compose pull openclaw/openclaw:1.3.1
docker compose up -d
\`\`\`

## 接入 Telegram Bot

在基础 compose 文件的 environment 部分加入 Telegram 配置：

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_ALLOWED_USERS=\${TELEGRAM_ALLOWED_USERS}
      - TELEGRAM_WEBHOOK_URL=https://your-domain.com/webhook/telegram
    env_file:
      - .env
\`\`\`

如果服务器没有公网域名（例如在家庭网络后面），可以使用 polling 模式代替 webhook：

\`\`\`yaml
    environment:
      - TELEGRAM_BOT_MODE=polling
\`\`\`

## 多平台同时运行：Telegram + Discord + 飞书

OpenClaw 支持同时连接多个平台。只需要在环境变量中配置所有平台的凭据：

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      # LLM 配置
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      # Telegram
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_ALLOWED_USERS=\${TELEGRAM_ALLOWED_USERS}
      # Discord
      - DISCORD_BOT_TOKEN=\${DISCORD_BOT_TOKEN}
      - DISCORD_ALLOWED_GUILDS=\${DISCORD_ALLOWED_GUILDS}
      # 飞书 Feishu
      - FEISHU_APP_ID=\${FEISHU_APP_ID}
      - FEISHU_APP_SECRET=\${FEISHU_APP_SECRET}
      - FEISHU_VERIFICATION_TOKEN=\${FEISHU_VERIFICATION_TOKEN}
    env_file:
      - .env
\`\`\`

每个平台独立运行，互不干扰。一个用户从 Telegram 发消息和从 Discord 发消息会被视为不同会话，除非你在配置中启用了跨平台用户映射。

## 生产环境加固

部署到生产环境时，以下配置可以显著提升稳定性和安全性：

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - NODE_ENV=production
    env_file:
      - .env
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '0.5'
          memory: 1G
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: json-file
      options:
        max-size: "50m"
        max-file: "5"
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
\`\`\`

关键加固措施：

| 措施 | 说明 |
|------|------|
| \`127.0.0.1:3000:3000\` | 只监听 localhost，配合反向代理使用 |
| \`deploy.resources\` | 限制 CPU 和内存用量，防止单个容器吃光服务器资源 |
| \`healthcheck\` | Docker 定期检查服务健康状态，不健康时自动重启 |
| \`logging\` | 限制日志文件大小和数量，防止磁盘写满 |
| \`security_opt\` | 禁止容器内进程提升权限 |
| \`read_only\` | 容器文件系统只读，减少攻击面 |
| \`NODE_ENV=production\` | 关闭调试信息，启用性能优化 |

建议在前面加一层 Nginx 或 Caddy 作为反向代理，处理 HTTPS 和域名绑定。

## 常见问题排查

### 容器无法启动

\`\`\`bash
# 查看容器日志
docker compose logs openclaw

# 常见原因：
# 1. 端口被占用
lsof -i :3000
# 解决：修改 ports 映射，例如 "3001:3000"

# 2. 镜像拉取失败（网络问题）
docker compose pull --quiet

# 3. .env 文件不存在或格式错误
cat .env  # 检查是否有多余的空格、引号
\`\`\`

### 端口冲突

如果 3000 端口已经被其他应用占用：

\`\`\`yaml
ports:
  - "8080:3000"  # 改用 8080 端口
\`\`\`

### 权限错误

\`\`\`bash
# 如果挂载目录出现权限问题
sudo chown -R 1000:1000 ./data ./config

# 或者在 compose 文件中指定用户
services:
  openclaw:
    user: "1000:1000"
\`\`\`

### 容器内无法访问网络

\`\`\`bash
# 检查 Docker 网络
docker network ls
docker compose exec openclaw ping -c 3 api.anthropic.com

# 如果使用代理
environment:
  - HTTP_PROXY=http://proxy:7890
  - HTTPS_PROXY=http://proxy:7890
\`\`\`

### 数据库连接失败

\`\`\`bash
# 检查 PostgreSQL 是否就绪
docker compose exec postgres pg_isready -U openclaw

# 检查 Redis 是否就绪
docker compose exec redis redis-cli ping
\`\`\`

## 常见问题 FAQ

**Q: Docker Compose 和 docker-compose 命令有什么区别？**

Docker Compose V2 使用 \`docker compose\`（空格分隔），是 Docker CLI 的插件。V1 使用 \`docker-compose\`（连字符），是独立的 Python 应用，已停止维护。本文所有命令均使用 V2 语法。如果你的系统只有 V1，建议升级到 V2。

**Q: 可以用 Docker Compose 在一台服务器上运行多个 OpenClaw 实例吗？**

可以。创建不同的项目目录，每个目录放一套 \`docker-compose.yml\` 和 \`.env\`，修改 \`container_name\` 和端口映射即可。Docker Compose 的项目隔离基于目录名，不同目录的服务完全独立。

**Q: OpenClaw 容器需要多少资源？**

基础运行需要约 512MB 内存。加上 Redis 和 PostgreSQL 大概需要 1.5GB 总内存。如果并发用户较多或使用 Agent 功能，建议分配 4GB 以上。CPU 方面，单核足以处理一般负载，密集使用建议 2 核。

**Q: 如何查看 OpenClaw 容器的实时日志？**

\`\`\`bash
# 实时跟踪所有服务的日志
docker compose logs -f

# 只看 OpenClaw 的日志，最近 100 行
docker compose logs -f --tail 100 openclaw
\`\`\`

**Q: 升级 OpenClaw 后数据会丢失吗？**

不会。只要你正确使用了 volumes 挂载（如本文所示），数据存储在宿主机上，与容器生命周期无关。\`docker compose pull && docker compose up -d\` 会替换容器但保留所有卷数据。不过，重大版本升级前建议备份数据。

---

Docker Compose 是部署 OpenClaw 最省心的方式。一个 YAML 文件描述完整环境，一条命令启动所有服务，升级回滚都是秒级操作。从单服务开发环境到多服务生产部署，本文的配置模板可以直接复制使用，根据实际需求调整即可。`,
    contentEn: `If you are looking for a reliable, reproducible, and easy-to-maintain way to run OpenClaw, Docker Compose is the best option. It packages all dependencies inside containers so nothing pollutes your host machine, and upgrades or rollbacks take a single command. This guide walks you through deploying OpenClaw with Docker Compose from scratch, covering basic configuration, advanced multi-service orchestration, and production hardening.

## Why Docker Compose for OpenClaw

When deploying OpenClaw you have several choices: direct installation, a single Docker container, or Docker Compose multi-service orchestration. Docker Compose strikes the best balance, and here is why:

- **Isolation:** OpenClaw runs in its own container, with no conflicts against the host's Node.js version or system dependencies. You can run multiple OpenClaw versions on the same server side by side.
- **Reproducibility:** A single \`docker-compose.yml\` file fully describes every service, network, and storage volume. Anyone on the team can run \`docker compose up -d\` and get an identical environment.
- **Effortless upgrades:** Updating OpenClaw is just \`docker compose pull && docker compose up -d\`. The old container is replaced automatically while data volumes remain untouched.
- **Multi-service orchestration:** Need Redis for caching? PostgreSQL for persistence? Nginx as a reverse proxy? Add a few lines to the compose file. All services share the same network and reach each other by service name.
- **One-command start and stop:** \`docker compose up -d\` starts everything, \`docker compose down\` stops and cleans up. No orphaned background processes, no port conflicts.

For quick local testing a plain \`docker run\` command works fine. But as soon as production deployment, multi-service coordination, or team collaboration enters the picture, Docker Compose becomes the clear winner.

## Prerequisites

Make sure Docker and Docker Compose are installed on your machine before starting:

\`\`\`bash
# Check Docker version (20.10+ required)
docker --version
# Docker version 24.0.7, build afdd53b

# Check Docker Compose version (v2.0+ required)
docker compose version
# Docker Compose version v2.23.0
\`\`\`

If Docker is not installed yet, follow the official guides:

- **Ubuntu/Debian:** \`curl -fsSL https://get.docker.com | sh\`
- **macOS:** Install Docker Desktop for Mac
- **Windows:** Install Docker Desktop for Windows (WSL2 backend recommended)

After installation, make sure your user is in the docker group (Linux):

\`\`\`bash
sudo usermod -aG docker $USER
# Log out and back in for the change to take effect
\`\`\`

You also need at least one LLM API key (OpenAI, Anthropic, or Google AI).

## Basic docker-compose.yml

Create a project directory and write the simplest compose file:

\`\`\`bash
mkdir openclaw-deploy && cd openclaw-deploy
\`\`\`

Create \`docker-compose.yml\`:

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
    env_file:
      - .env
\`\`\`

This file defines one service called \`openclaw\`. Here is what each key field does:

| Field | Purpose |
|-------|---------|
| \`image\` | Uses the official image. The \`latest\` tag always points to the newest stable release |
| \`container_name\` | Fixes the container name for easier management |
| \`restart: unless-stopped\` | Auto-restarts on crash but not after a manual stop |
| \`ports\` | Maps container port 3000 to host port 3000 |
| \`volumes\` | Mounts data and config directories for persistence |
| \`env_file\` | Reads environment variables from a .env file |

Start the service:

\`\`\`bash
docker compose up -d
# View logs
docker compose logs -f openclaw
\`\`\`

## Environment Variable Configuration

Create a \`.env\` file in the project directory to hold all sensitive settings:

\`\`\`bash
# .env file — do NOT commit to git
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
GOOGLE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxx

# OpenClaw settings
OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
OPENCLAW_PORT=3000
OPENCLAW_LOG_LEVEL=info

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_ALLOWED_USERS=user_id_1,user_id_2

# Discord Bot (optional)
DISCORD_BOT_TOKEN=MTIzNDU2Nzg5.xxxxx.xxxxxxxxxx

# Feishu Bot (optional)
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

Add \`.env\` to \`.gitignore\`:

\`\`\`bash
echo ".env" >> .gitignore
\`\`\`

## Advanced Setup: Redis Cache + PostgreSQL

For scenarios that need conversation history caching and multi-user concurrency, add Redis and PostgreSQL:

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgresql://openclaw:openclaw_pass@postgres:5432/openclaw
    env_file:
      - .env
    depends_on:
      redis:
        condition: service_healthy
      postgres:
        condition: service_healthy

  redis:
    image: redis:7-alpine
    container_name: openclaw-redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  postgres:
    image: postgres:16-alpine
    container_name: openclaw-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: openclaw
      POSTGRES_PASSWORD: openclaw_pass
      POSTGRES_DB: openclaw
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U openclaw"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  redis_data:
  postgres_data:
\`\`\`

Key changes in this configuration:

- **Redis** caches conversation context, rate limit counters, and more. The Alpine image is only about 30 MB.
- **PostgreSQL** persists conversation history, user settings, and bot configuration. Data lives in a Docker named volume.
- **depends_on + healthcheck** ensures OpenClaw only starts after Redis and PostgreSQL are fully ready, preventing connection errors.
- **Named volumes** are better than bind mounts for database storage because Docker manages file permissions automatically.

## Persistent Storage Explained

Docker containers are ephemeral. When a container is deleted all data inside it is lost. Volumes map important data to the host machine so it survives container replacements.

Key OpenClaw data directories:

| Container Path | Contents | Recommended Mount |
|----------------|----------|-------------------|
| \`/root/.openclaw\` | Conversation history, agent memory, local data | Bind mount to \`./data\` |
| \`/root/.openclaw/config\` | Config files, model settings, platform connections | Bind mount to \`./config\` |
| PostgreSQL data | Database files | Named volume \`postgres_data\` |
| Redis data | Cache snapshots | Named volume \`redis_data\` |

Backup strategy:

\`\`\`bash
# Back up OpenClaw data
tar czf backup-openclaw-$(date +%Y%m%d).tar.gz ./data ./config

# Back up PostgreSQL
docker compose exec postgres pg_dump -U openclaw openclaw > backup-db-$(date +%Y%m%d).sql

# Back up Redis
docker compose exec redis redis-cli BGSAVE
docker cp openclaw-redis:/data/dump.rdb ./backup-redis-$(date +%Y%m%d).rdb
\`\`\`

## Updating OpenClaw

Updating requires just two commands:

\`\`\`bash
# Pull the latest image
docker compose pull

# Recreate and start (data volumes are unaffected)
docker compose up -d
\`\`\`

To pin a specific version, change the \`image\` tag:

\`\`\`yaml
image: openclaw/openclaw:1.3.2
\`\`\`

Roll back to a previous version:

\`\`\`bash
# Specify the version tag
docker compose pull openclaw/openclaw:1.3.1
docker compose up -d
\`\`\`

## Running with a Telegram Bot

Add Telegram configuration to the environment section of the basic compose file:

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_ALLOWED_USERS=\${TELEGRAM_ALLOWED_USERS}
      - TELEGRAM_WEBHOOK_URL=https://your-domain.com/webhook/telegram
    env_file:
      - .env
\`\`\`

If your server has no public domain (for example behind a home network), use polling mode instead of webhooks:

\`\`\`yaml
    environment:
      - TELEGRAM_BOT_MODE=polling
\`\`\`

## Multi-Platform Setup: Telegram + Discord + Feishu

OpenClaw can connect to multiple platforms simultaneously. Configure credentials for all platforms in the environment variables:

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      # LLM config
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      # Telegram
      - TELEGRAM_BOT_TOKEN=\${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_ALLOWED_USERS=\${TELEGRAM_ALLOWED_USERS}
      # Discord
      - DISCORD_BOT_TOKEN=\${DISCORD_BOT_TOKEN}
      - DISCORD_ALLOWED_GUILDS=\${DISCORD_ALLOWED_GUILDS}
      # Feishu
      - FEISHU_APP_ID=\${FEISHU_APP_ID}
      - FEISHU_APP_SECRET=\${FEISHU_APP_SECRET}
      - FEISHU_VERIFICATION_TOKEN=\${FEISHU_VERIFICATION_TOKEN}
    env_file:
      - .env
\`\`\`

Each platform runs independently without interfering with the others. A user sending a message from Telegram and the same user sending from Discord are treated as different sessions unless you enable cross-platform user mapping in the configuration.

## Production Hardening

When deploying to production, these settings significantly improve stability and security:

\`\`\`yaml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - ./data:/root/.openclaw
      - ./config:/root/.openclaw/config
    environment:
      - CLAUDE_API_KEY=\${CLAUDE_API_KEY}
      - OPENCLAW_MODEL=anthropic/claude-3.5-sonnet
      - NODE_ENV=production
    env_file:
      - .env
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '0.5'
          memory: 1G
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: json-file
      options:
        max-size: "50m"
        max-file: "5"
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
\`\`\`

Key hardening measures:

| Measure | Explanation |
|---------|-------------|
| \`127.0.0.1:3000:3000\` | Listens only on localhost; use a reverse proxy in front |
| \`deploy.resources\` | Caps CPU and memory usage to prevent a single container from exhausting server resources |
| \`healthcheck\` | Docker periodically checks service health and auto-restarts unhealthy containers |
| \`logging\` | Limits log file size and count to prevent disk exhaustion |
| \`security_opt\` | Prevents processes inside the container from escalating privileges |
| \`read_only\` | Makes the container filesystem read-only to reduce the attack surface |
| \`NODE_ENV=production\` | Disables debug output and enables performance optimizations |

It is recommended to place Nginx or Caddy in front as a reverse proxy to handle HTTPS and domain binding.

## Troubleshooting

### Container Will Not Start

\`\`\`bash
# Check container logs
docker compose logs openclaw

# Common causes:
# 1. Port already in use
lsof -i :3000
# Fix: change the port mapping, e.g. "3001:3000"

# 2. Image pull failed (network issue)
docker compose pull --quiet

# 3. .env file missing or malformed
cat .env  # Look for extra spaces or quotes
\`\`\`

### Port Conflicts

If port 3000 is already taken by another application:

\`\`\`yaml
ports:
  - "8080:3000"  # Use port 8080 instead
\`\`\`

### Permission Errors

\`\`\`bash
# If mounted directories have permission issues
sudo chown -R 1000:1000 ./data ./config

# Or specify the user in the compose file
services:
  openclaw:
    user: "1000:1000"
\`\`\`

### Container Cannot Reach the Network

\`\`\`bash
# Check Docker networks
docker network ls
docker compose exec openclaw ping -c 3 api.anthropic.com

# If using a proxy
environment:
  - HTTP_PROXY=http://proxy:7890
  - HTTPS_PROXY=http://proxy:7890
\`\`\`

### Database Connection Failures

\`\`\`bash
# Check if PostgreSQL is ready
docker compose exec postgres pg_isready -U openclaw

# Check if Redis is ready
docker compose exec redis redis-cli ping
\`\`\`

## FAQ

**Q: What is the difference between \`docker compose\` and \`docker-compose\`?**

Docker Compose V2 uses \`docker compose\` (with a space) and is a plugin for the Docker CLI. V1 used \`docker-compose\` (with a hyphen) and was a standalone Python application that is no longer maintained. All commands in this article use V2 syntax. If your system only has V1, upgrade to V2.

**Q: Can I run multiple OpenClaw instances on the same server with Docker Compose?**

Yes. Create separate project directories, each with its own \`docker-compose.yml\` and \`.env\`. Change the \`container_name\` and port mapping in each. Docker Compose isolates projects by directory name, so services in different directories are completely independent.

**Q: How many resources does the OpenClaw container need?**

A basic deployment needs about 512 MB of memory. Adding Redis and PostgreSQL brings the total to roughly 1.5 GB. For higher concurrency or heavy agent usage, allocate 4 GB or more. On the CPU side, a single core handles normal loads; two cores are recommended for intensive use.

**Q: How do I view real-time OpenClaw container logs?**

\`\`\`bash
# Follow logs for all services in real time
docker compose logs -f

# Follow only OpenClaw logs, last 100 lines
docker compose logs -f --tail 100 openclaw
\`\`\`

**Q: Will I lose data when upgrading OpenClaw?**

No. As long as you use volume mounts correctly (as shown in this article), data is stored on the host and is independent of the container lifecycle. Running \`docker compose pull && docker compose up -d\` replaces the container but preserves all volume data. That said, it is good practice to back up before major version upgrades.

---

Docker Compose is the most hassle-free way to deploy OpenClaw. A single YAML file describes the complete environment, one command starts every service, and upgrades and rollbacks happen in seconds. From a single-service development setup to a multi-service production deployment, the configuration templates in this article are ready to copy and adapt to your needs.`,
    category: "Deployment",
    categoryEn: "Deployment",
    tags: ["docker", "docker-compose", "deployment", "self-hosting", "devops", "2026"],
    author: "Alex Chen",
    date: "2026-04-09",
    readingTime: 15,
    image: "/og-image.png"
  },
];
