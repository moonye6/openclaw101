export interface LearningDay {
  day: number;
  title: string;
  titleEn: string;
  emoji: string;
  color: string;
  objective: string;
  objectiveEn: string;
  content: string;
  contentEn: string;
  exercises: string[];
  exercisesEn: string[];
  nextStep: string;
  nextStepEn: string;
}

export const learningPath: LearningDay[] = [
  {
    day: 1,
    title: "认识 OpenClaw",
    titleEn: "Meet OpenClaw",
    emoji: "👋",
    color: "from-blue-500 to-blue-600",
    objective: "安装 OpenClaw，连接第一个平台，与 AI 助手进行第一次对话。",
    objectiveEn: "Install OpenClaw, connect your first platform, and have your first conversation with the AI assistant.",
    content: `## OpenClaw 是什么

OpenClaw 是一个**全能型 AI 助手框架**，它和 ChatGPT 的核心区别在于：**它能真正"动手做事"**。

- ChatGPT 能告诉你"怎么写一个脚本"
- OpenClaw 能**直接写好并运行这个脚本**

你只需要用自然语言描述需求，它就会自动调用各种工具完成任务。

## 系统要求与安装

**系统要求**：Node.js 18+，支持 macOS、Linux、Windows，至少 2GB 可用内存

\`\`\`bash
# 全局安装
npm install -g openclaw

# 验证安装
openclaw --version

# 配置模型
openclaw config set model anthropic/claude-3-sonnet
\`\`\`

## 连接第一个平台

**Telegram**：
1. 在 Telegram 中找到 @BotFather，创建新 Bot 获得 Token
2. 配置：\`openclaw telegram config --token YOUR_BOT_TOKEN\`
3. 启动：\`openclaw telegram start\`

**Discord**：
1. 访问 Discord Developer Portal，创建 Bot 获取 Token
2. 生成邀请链接加入服务器
3. 配置并启动

## 第一次对话

发送消息测试能力：
\`\`\`
帮我创建一个 hello.txt 文件，内容是 "Hello, OpenClaw!"
\`\`\`

**这就是 OpenClaw 的核心价值——它不只是聊天，它真的在帮你做事。**`,
    contentEn: `## What is OpenClaw

OpenClaw is a **versatile AI assistant framework**. The key difference from ChatGPT: **It can actually "do things"**.

- ChatGPT can tell you "how to write a script"
- OpenClaw can **directly write and run that script for you**

Simply describe your needs in natural language, and it will automatically call various tools to complete the task.

## System Requirements & Installation

**Requirements**: Node.js 18+, supports macOS/Linux/Windows, at least 2GB memory

\`\`\`bash
# Global installation
npm install -g openclaw

# Verify installation
openclaw --version

# Configure model
openclaw config set model anthropic/claude-3-sonnet
\`\`\`

## Connect Your First Platform

**Telegram**:
1. Find @BotFather in Telegram, create a new Bot and get Token
2. Configure: \`openclaw telegram config --token YOUR_BOT_TOKEN\`
3. Start: \`openclaw telegram start\`

**Discord**:
1. Visit Discord Developer Portal, create Bot and get Token
2. Generate invite link to add to server
3. Configure and start

## First Conversation

Send a message to test capabilities:
\`\`\`
Create a hello.txt file with content "Hello, OpenClaw!"
\`\`\`

**This is the core value of OpenClaw—it doesn't just chat, it actually does things for you.**`,
    exercises: [
      "安装 OpenClaw 并验证安装成功",
      "连接 Telegram 或 Discord 平台",
      "发送 5 条消息测试：询问天气、写脚本、读取文件、创建备忘录、询问日期"
    ],
    exercisesEn: [
      "Install OpenClaw and verify successful installation",
      "Connect Telegram or Discord platform",
      "Send 5 messages to test: weather, script, file, memo, date"
    ],
    nextStep: "明天学习对话技巧——上下文管理、人设定制、记忆设置。",
    nextStepEn: "Tomorrow: conversation skills—context management, persona customization, memory settings."
  },
  {
    day: 2,
    title: "深度对话",
    titleEn: "Deep Conversations",
    emoji: "💬",
    color: "from-violet-500 to-violet-600",
    objective: "掌握对话技巧：上下文管理、多轮对话、人设定制。",
    objectiveEn: "Master conversation skills: context management, multi-turn dialogues, and persona customization.",
    content: `## 上下文管理

OpenClaw 会保留最近 20 轮对话，可调整：

\`\`\`bash
openclaw config get context_length
openclaw config set context_length 50
\`\`\`

### 跨会话记忆

OpenClaw 可以**记住你说过的话，即使在新的对话中**：

\`\`\`
我叫阿星，是个程序员，在深圳工作。我对 AI Agent 特别感兴趣。
\`\`\`

下次对话时问：\`你还记得我是谁吗？\` 它会准确回答。

## 多轮对话技巧

**技巧 1：明确任务边界**
- ❌ 差：帮我搞一下那个报告
- ✅ 好：整理 sales.csv 数据，生成 Markdown 月度报告

**技巧 2：逐步推进** - 复杂任务分步进行效果更好

**技巧 3：引用历史** - 可直接引用之前的结果

## 人设定制

通过 \`IDENTITY.md\` 和 \`SOUL.md\` 定义专属人设：

\`\`\`markdown
# IDENTITY.md
- Name: 月笔
- Creature: AI 文学助手
- Vibe: 犀利、专业、带温度

# SOUL.md
## 角色性格
你是一个专业的写作教练，风格直接但有建设性。
\`\`\`

## 记忆层级

- **短期记忆**：对话内，自动管理
- **长期记忆**：跨会话，\`memory/\` 目录
- **工作空间记忆**：项目级，\`MEMORY.md\` 文件`,
    contentEn: `## Context Management

OpenClaw retains the last 20 conversation turns, adjustable:

\`\`\`bash
openclaw config get context_length
openclaw config set context_length 50
\`\`\`

### Cross-session Memory

OpenClaw can **remember what you said, even in new conversations**:

\`\`\`
My name is Alex, I'm a programmer in Shenzhen. I'm interested in AI Agents.
\`\`\`

Next time ask: \`Do you remember who I am?\` It will answer accurately.

## Multi-turn Conversation Tips

**Tip 1: Clear Task Boundaries**
- ❌ Bad: Help me with that report
- ✅ Good: Organize sales.csv data, generate Markdown monthly report

**Tip 2: Step by Step** - Complex tasks work better step by step

**Tip 3: Reference History** - Can directly reference previous results

## Persona Customization

Define custom persona through \`IDENTITY.md\` and \`SOUL.md\`:

\`\`\`markdown
# IDENTITY.md
- Name: Luna
- Creature: AI Writing Assistant
- Vibe: Sharp, professional, warm

# SOUL.md
## Personality
You are a professional writing coach, direct but constructive.
\`\`\`

## Memory Levels

- **Short-term**: Within conversation, auto-managed
- **Long-term**: Cross-session, \`memory/\` directory
- **Workspace**: Project-level, \`MEMORY.md\` file`,
    exercises: [
      "上下文测试：连续发送 5 条相关消息，验证关联",
      "人设定制：创建专属人设并测试",
      "记忆实验：告诉个人信息，新对话验证保留"
    ],
    exercisesEn: [
      "Context test: Send 5 related messages, verify association",
      "Persona: Create and test custom persona",
      "Memory: Tell personal info, verify retention in new conversation"
    ],
    nextStep: "明天学习文件操作和代码执行，真正体验'动手能力'。",
    nextStepEn: "Tomorrow: file operations and code execution, truly experiencing hands-on capabilities."
  },
  {
    day: 3,
    title: "文件与代码",
    titleEn: "Files & Code",
    emoji: "📁",
    color: "from-emerald-500 to-emerald-600",
    objective: "让 AI 处理文件：读取文档、编写代码、运行脚本。",
    objectiveEn: "Let AI handle files: read documents, write code, run scripts.",
    content: `## 文件读写操作

**读取文件**：\`读取 README.md 文件的内容\`

**写入文件**：\`创建 tasks.md 文件，内容如下... \`

**编辑特定部分**：\`把 README.md 里的"安装方式"部分重写\`

支持多种格式：文本文件、代码文件、文档文件

## 代码生成与执行

这是 OpenClaw 的杀手级功能：

\`\`\`
写一个 Python 脚本，批量重命名图片文件为 photo_001.jpg 格式
\`\`\`

OpenClaw 会：
1. 生成完整代码
2. 展示供确认
3. 执行并返回结果

### 安全边界
- 危险操作会警告
- 文件修改需确认
- 网络请求会提示

## 脚本运行

\`\`\`bash
运行 build.sh 构建脚本
\`\`\`

或让 OpenClaw 写并执行定时备份脚本

## 文件系统管理

- 目录操作：列出、创建目录结构
- 文件搜索：搜索包含关键词的文件
- 文件整理：自动分类整理`,
    contentEn: `## File Read/Write Operations

**Read file**: \`Read the contents of README.md\`

**Write file**: \`Create tasks.md file with content...\`

**Edit specific part**: \`Rewrite the "Installation" section in README.md\`

Supports multiple formats: text, code, documents

## Code Generation & Execution

This is OpenClaw's killer feature:

\`\`\`
Write a Python script to batch rename image files as photo_001.jpg format
\`\`\`

OpenClaw will:
1. Generate complete code
2. Show for confirmation
3. Execute and return results

### Security Boundaries
- Dangerous operations warned
- File modifications require confirmation
- Network requests prompted

## Running Scripts

\`\`\`bash
Run build.sh script
\`\`\`

Or have OpenClaw write and execute a backup script

## File System Management

- Directory operations: list, create structure
- File search: search files with keywords
- File organization: auto-categorize`,
    exercises: [
      "文件读写：创建 learning-log.md，写入知识点，追加内容",
      "代码生成：写脚本统计目录文件数量，运行查看结果",
      "文件整理：找文件夹让 OpenClaw 提出整理方案"
    ],
    exercisesEn: [
      "File read/write: Create learning-log.md, write points, append content",
      "Code generation: Write script to count files, run and see results",
      "File organization: Have OpenClaw propose organization plan"
    ],
    nextStep: "明天解锁网络能力——搜索、抓取、API调用。",
    nextStepEn: "Tomorrow: unlock web capabilities—search, scraping, API calls."
  },
  {
    day: 4,
    title: "网络能力",
    titleEn: "Web Capabilities",
    emoji: "🌐",
    color: "from-cyan-500 to-cyan-600",
    objective: "解锁网络能力：搜索互联网、抓取网页、调用 API。",
    objectiveEn: "Unlock web capabilities: search the internet, scrape web pages, call APIs.",
    content: `## 网络搜索

\`\`\`bash
搜索 OpenAI 最近有什么新发布
\`\`\`

OpenClaw 会调用搜索引擎，获取多个结果，总结关键信息附来源链接。

**定向搜索**：\`在 GitHub 上搜索 "openclaw" 相关项目\`

**时效性搜索**：\`搜索最近一周关于 GPT-5 的新闻\`

## 网页抓取

\`\`\`bash
抓取这篇文章的内容：https://example.com/article
\`\`\`

- 提取正文（过滤广告和导航）
- 转换为 Markdown 格式
- 支持批量抓取和深度爬取

## API 调用

无需写代码直接调用 API：

\`\`\`bash
调用天气 API，查询深圳明天的天气
\`\`\`

### 配置 API Key

\`\`\`bash
openclaw config set api.weather_key YOUR_API_KEY
\`\`\`

### 自定义调用

\`\`\`bash
调用 GitHub API 获取 facebook/react 的 star 数量
\`\`\`

## 在线服务集成

- 邮件服务：发送邮件
- 云存储：上传文件到 Google Drive
- 项目管理：在 Notion 创建任务
- 社交媒体：发布到 Twitter`,
    contentEn: `## Web Search

\`\`\`bash
Search for recent OpenAI releases
\`\`\`

OpenClaw will call search engine, get multiple results, summarize with source links.

**Targeted search**: \`Search GitHub for "openclaw" related projects\`

**Time-sensitive search**: \`Search for GPT-5 news from past week\`

## Web Scraping

\`\`\`bash
Scrape content from: https://example.com/article
\`\`\`

- Extract main content (filtering ads and navigation)
- Convert to Markdown format
- Support batch scraping and deep crawling

## API Calls

Call APIs directly without writing code:

\`\`\`bash
Call weather API to check tomorrow's weather in Shenzhen
\`\`\`

### Configure API Key

\`\`\`bash
openclaw config set api.weather_key YOUR_API_KEY
\`\`\`

### Custom Calls

\`\`\`bash
Call GitHub API to get star count of facebook/react
\`\`\`

## Online Service Integration

- Email: Send emails
- Cloud storage: Upload to Google Drive
- Project management: Create Notion tasks
- Social media: Post to Twitter`,
    exercises: [
      "搜索实践：搜索技术话题，让 OpenClaw 总结结果",
      "网页抓取：抓取长文章并生成摘要",
      "API 调用：调用免费公开 API 并解析数据"
    ],
    exercisesEn: [
      "Search practice: Search topic, have OpenClaw summarize results",
      "Web scraping: Scrape article and generate summary",
      "API call: Call free public API and parse data"
    ],
    nextStep: "明天探索技能系统——从 ClawHub 安装扩展能力。",
    nextStepEn: "Tomorrow: explore skill system—install extended capabilities from ClawHub."
  },
  {
    day: 5,
    title: "技能扩展",
    titleEn: "Skill Extensions",
    emoji: "🧩",
    color: "from-orange-500 to-orange-600",
    objective: "从 ClawHub 安装社区技能扩展能力。",
    objectiveEn: "Install community skills from ClawHub to extend capabilities.",
    content: `## ClawHub 介绍

ClawHub 是 OpenClaw 的技能市场：
- 🔍 **发现**：浏览社区贡献的技能
- 📥 **安装**：一键安装到本地
- 📤 **发布**：分享你开发的技能

## 技能安装方法

\`\`\`bash
# 搜索技能
openclaw skills search 图像生成

# 安装技能
openclaw skills install image-generator

# 查看已安装
openclaw skills list

# 更新技能
openclaw skills update image-generator
\`\`\`

安装后用自然语言使用：\`用 image-generator 生成一张赛博朋克夜景图\`

## 热门技能推荐

| 技能 | 功能 | 示例 |
|------|------|------|
| weather | 全球天气预报 | 查一下深圳未来三天天气 |
| video-frames | 视频处理 | 从 demo.mp4 提取帧 |
| feishu-doc | 飞书文档操作 | 同步报告到飞书 |
| research | 深度研究 | 研究 RAG 技术进展 |
| skill-creator | 技能开发 | 创建邮件发送技能 |

## 技能安全注意事项

**来源验证**：
- ✅ 优先选择官方认证技能（带 ✓ 标识）
- ✅ 查看下载量和评分
- ⚠️ 谨慎安装下载量极低的新技能

**权限检查**：

\`\`\`bash
openclaw skills inspect image-generator
\`\`\`

**敏感操作确认**：技能执行敏感操作时会弹出确认提示`,
    contentEn: `## ClawHub Introduction

ClawHub is OpenClaw's skill marketplace:
- 🔍 **Discover**: Browse community-contributed skills
- 📥 **Install**: One-click install to local
- 📤 **Publish**: Share your developed skills

## Skill Installation Methods

\`\`\`bash
# Search skills
openclaw skills search image generation

# Install skill
openclaw skills install image-generator

# View installed
openclaw skills list

# Update skill
openclaw skills update image-generator
\`\`\`

After installation, use with natural language: \`Use image-generator to create a cyberpunk night scene\`

## Popular Skill Recommendations

| Skill | Function | Example |
|-------|----------|---------|
| weather | Global weather forecast | Check Shenzhen weather for 3 days |
| video-frames | Video processing | Extract frames from demo.mp4 |
| feishu-doc | Feishu document operations | Sync report to Feishu |
| research | Deep research | Research RAG technology progress |
| skill-creator | Skill development | Create email sending skill |

## Skill Security Precautions

**Source Verification**:
- ✅ Prefer officially certified skills (with ✓ badge)
- ✅ Check downloads and ratings
- ⚠️ Be cautious with new skills with low downloads

**Permission Check**:

\`\`\`bash
openclaw skills inspect image-generator
\`\`\`

**Sensitive Operation Confirmation**: Prompts appear when skills execute sensitive operations`,
    exercises: [
      "安装 weather 技能并查询城市天气",
      "搜索并安装一个感兴趣的新技能",
      "检查已安装技能的权限"
    ],
    exercisesEn: [
      "Install weather skill and query city weather",
      "Search and install a new skill of interest",
      "Check installed skills' permissions"
    ],
    nextStep: "明天进入自动化领域——定时任务、心跳检查。",
    nextStepEn: "Tomorrow: automation domain—scheduled tasks, heartbeat checks."
  },
  {
    day: 6,
    title: "自动化",
    titleEn: "Automation",
    emoji: "⏰",
    color: "from-pink-500 to-pink-600",
    objective: "设置定时任务、心跳检查、主动提醒。",
    objectiveEn: "Set up scheduled tasks, heartbeat checks, and proactive reminders.",
    content: `## 定时任务设置

\`\`\`bash
# 每天早上 8 点
openclaw cron add "0 8 * * *" "查询天气并发送到 Telegram"

# 每周五下午 5 点
openclaw cron add "0 17 * * 5" "汇总 Git 提交生成周报"

# 每小时
openclaw cron add "0 * * * *" "检查服务器状态"
\`\`\`

### Cron 表达式速查

\`\`\`
┌───────────── 分钟 (0-59)
│ ┌───────────── 小时 (0-23)
│ │ ┌───────────── 日 (1-31)
│ │ │ ┌───────────── 月 (1-12)
│ │ │ │ ┌───────────── 星期 (0-6)
│ │ │ │ │
* * * * *
\`\`\`

常用：\`0 9 * * *\` 每天9点 | \`0 */2 * * *\` 每2小时 | \`30 18 * * 1-5\` 工作日6:30

### 管理任务

\`\`\`bash
openclaw cron list        # 列出所有任务
openclaw cron pause <id>  # 暂停
openclaw cron resume <id> # 恢复
openclaw cron remove <id> # 删除
\`\`\`

## 心跳检查

主动巡检机制，定期检查状态异常时通知：

\`\`\`bash
每隔 5 分钟检查网站是否在线，下线立即通知我
\`\`\`

\`\`\`bash
openclaw heartbeat status
\`\`\`

## 主动提醒

**一次性**：\`明天下午 3 点提醒我开会\`

**周期性**：\`每天早上 9 点提醒查看待办\`

**条件触发**：\`API 响应超过 1 秒时提醒\`

### 配置提醒渠道

\`\`\`bash
openclaw notify add telegram --chat_id YOUR_CHAT_ID
openclaw notify add email --address your@email.com
\`\`\`

## 自动化工作流

组合定时任务、心跳、提醒创建完整工作流：

\`\`\`
每天下午 6 点：
1. 汇总 Git 提交
2. 整理任务
3. 生成日报
4. 同步到飞书
5. 推送到 Telegram
\`\`\``,
    contentEn: `## Scheduled Tasks

\`\`\`bash
# Every morning at 8 AM
openclaw cron add "0 8 * * *" "Query weather and send to Telegram"

# Every Friday at 5 PM
openclaw cron add "0 17 * * 5" "Summarize Git commits for weekly report"

# Every hour
openclaw cron add "0 * * * *" "Check server status"
\`\`\`

### Cron Expression Quick Reference

\`\`\`
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── weekday (0-6)
│ │ │ │ │
* * * * *
\`\`\`

Common: \`0 9 * * *\` daily 9AM | \`0 */2 * * *\` every 2 hours | \`30 18 * * 1-5\` weekdays 6:30PM

### Managing Tasks

\`\`\`bash
openclaw cron list        # List all tasks
openclaw cron pause <id>  # Pause
openclaw cron resume <id> # Resume
openclaw cron remove <id> # Remove
\`\`\`

## Heartbeat Checks

Proactive inspection mechanism, periodic checks with anomaly notifications:

\`\`\`bash
Check website online every 5 minutes, notify immediately if down
\`\`\`

\`\`\`bash
openclaw heartbeat status
\`\`\`

## Proactive Reminders

**One-time**: \`Remind me about meeting tomorrow at 3 PM\`

**Periodic**: \`Remind me to check to-do every morning at 9 AM\`

**Conditional trigger**: \`Remind when API response exceeds 1 second\`

### Configure Reminder Channels

\`\`\`bash
openclaw notify add telegram --chat_id YOUR_CHAT_ID
openclaw notify add email --address your@email.com
\`\`\`

## Automated Workflows

Combine scheduled tasks, heartbeats, reminders for complete workflows:

\`\`\`
Every day at 6 PM:
1. Summarize Git commits
2. Organize tasks
3. Generate daily report
4. Sync to Feishu
5. Push to Telegram
\`\`\``,
    exercises: [
      "创建每天早上 9 点的天气提醒",
      "配置网站监控心跳并测试",
      "设计一个简单自动化流程"
    ],
    exercisesEn: [
      "Create 9 AM weather reminder daily",
      "Configure website monitor heartbeat and test",
      "Design a simple automation flow"
    ],
    nextStep: "明天进入进阶领域——多智能体协作、浏览器控制、自定义技能。",
    nextStepEn: "Tomorrow: advanced territory—multi-agent, browser control, custom skills."
  },
  {
    day: 7,
    title: "进阶技术",
    titleEn: "Advanced Techniques",
    emoji: "🚀",
    color: "from-indigo-500 to-indigo-600",
    objective: "掌握多智能体协作、浏览器控制、自定义技能开发。",
    objectiveEn: "Master multi-agent collaboration, browser control, and custom skill development.",
    content: `## 多智能体协作

让**多个 AI 分身**协作完成任务：

\`\`\`bash
openclaw agent create writer --role "内容创作者" --focus "撰写文章"
openclaw agent create editor --role "编辑" --focus "审核修改"
openclaw agent create publisher --role "发布员" --focus "发布"
\`\`\`

定义协作流程后执行：

\`\`\`
运行内容发布流程，主题是"AI Agent 入门指南"

[writer] 开始撰写初稿...
[writer] 初稿完成
[editor] 审核中...
[editor] 发现 3 处可优化
[writer] 修改中...
[publisher] 发布到公众号...
✅ 流程完成
\`\`\`

## 浏览器控制

OpenClaw 能**直接控制浏览器**：

\`\`\`bash
打开淘宝，搜索"机械键盘"，按销量排序，截图前三名
\`\`\`

支持：
- 点击、输入、滚动
- 处理弹窗
- 等待元素加载
- 执行 JavaScript

场景：自动填表、爬取动态网页、批量操作、网站测试

### 安全说明
- 操作前请求确认
- 提供操作预览
- 支持人工接管

## 设备集成

连接智能设备：
- 📱 手机/iPad（Companion App）
- 🏠 智能家居（Home Assistant）
- 📷 摄像头
- 🔊 智能音箱

\`\`\`bash
把刚才生成的图片发送到我手机
查看客厅温度
\`\`\`

## 自定义技能开发

### 技能结构

\`\`\`
my-skill/
├── SKILL.md     # 说明文档
├── skill.ts     # 核心逻辑
└── config.yaml  # 配置文件
\`\`\`

### 最简示例

\`\`\`typescript
import { Skill } from 'openclaw-skill-sdk';

export default Skill.define({
  name: 'custom-greeting',
  trigger: ['问候', '早上好'],
  async execute(context) {
    const hour = new Date().getHours();
    return { greeting: hour < 12 ? '早上好！' : '下午好！' };
  }
});
\`\`\`

### 安装发布

\`\`\`bash
openclaw skills install ./my-skill
openclaw skills publish ./my-skill
\`\`\`

---

## 🎉 恭喜完成七天学习！

✅ Day 1: 认识 OpenClaw - 安装与首次对话
✅ Day 2: 深度对话 - 上下文与人设
✅ Day 3: 文件与代码 - 动手能力
✅ Day 4: 网络能力 - 连接世界
✅ Day 5: 技能扩展 - 无限可能
✅ Day 6: 自动化 - 解放双手
✅ Day 7: 进阶技术 - AI 团队

**下一步**：深入阅读文档、加入社区、打造你的自动化项目`,
    contentEn: `## Multi-Agent Collaboration

Have **multiple AI avatars** collaborate on tasks:

\`\`\`bash
openclaw agent create writer --role "Content Creator" --focus "Writing"
openclaw agent create editor --role "Editor" --focus "Review"
openclaw agent create publisher --role "Publisher" --focus "Publishing"
\`\`\`

Define workflow and execute:

\`\`\`
Run content publishing workflow, topic "AI Agent Beginner's Guide"

[writer] Starting first draft...
[writer] Draft complete
[editor] Reviewing...
[editor] Found 3 improvements
[writer] Revising...
[publisher] Publishing to blog...
✅ Workflow complete
\`\`\`

## Browser Control

OpenClaw can **directly control browsers**:

\`\`\`bash
Open Amazon, search "mechanical keyboard", sort by bestsellers, screenshot top 3
\`\`\`

Supports:
- Click, type, scroll
- Handle popups
- Wait for elements
- Execute JavaScript

Scenarios: Auto-fill forms, scrape dynamic pages, batch operations, website testing

### Security Notes
- Request confirmation before operations
- Provide operation preview
- Support manual takeover

## Device Integration

Connect smart devices:
- 📱 Phone/iPad (Companion App)
- 🏠 Smart home (Home Assistant)
- 📷 Cameras
- 🔊 Smart speakers

\`\`\`bash
Send the generated image to my phone
Check living room temperature
\`\`\`

## Custom Skill Development

### Skill Structure

\`\`\`
my-skill/
├── SKILL.md     # Documentation
├── skill.ts     # Core logic
└── config.yaml  # Configuration
\`\`\`

### Minimal Example

\`\`\`typescript
import { Skill } from 'openclaw-skill-sdk';

export default Skill.define({
  name: 'custom-greeting',
  trigger: ['greeting', 'good morning'],
  async execute(context) {
    const hour = new Date().getHours();
    return { greeting: hour < 12 ? 'Good morning!' : 'Good afternoon!' };
  }
});
\`\`\`

### Install & Publish

\`\`\`bash
openclaw skills install ./my-skill
openclaw skills publish ./my-skill
\`\`\`

---

## 🎉 Congratulations on completing the 7-day learning journey!

✅ Day 1: Meet OpenClaw - Installation & First Conversation
✅ Day 2: Deep Conversations - Context & Personas
✅ Day 3: Files & Code - Hands-on Capabilities
✅ Day 4: Web Capabilities - Connect the World
✅ Day 5: Skill Extensions - Infinite Possibilities
✅ Day 6: Automation - Free Your Hands
✅ Day 7: Advanced Techniques - AI Team

**Next Steps**: Read documentation, join community, build your automation project`,
    exercises: [
      "创建 2 个 Agent 协作完成简单任务",
      "让 OpenClaw 自动登录网站执行操作",
      "开发一个简单的自定义技能并测试"
    ],
    exercisesEn: [
      "Create 2 Agents to collaborate on simple task",
      "Have OpenClaw auto-login website and perform operation",
      "Develop a simple custom skill and test"
    ],
    nextStep: "恭喜完成！建议深入阅读文档、加入社区、打造你的自动化项目。",
    nextStepEn: "Congratulations! Suggest reading docs, joining community, building your automation project."
  }
];

export function getLearningDay(day: number): LearningDay | undefined {
  return learningPath.find(d => d.day === day);
}

export function getAllLearningDays(): LearningDay[] {
  return learningPath;
}
