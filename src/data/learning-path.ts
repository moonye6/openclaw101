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

想象一下，你有一个 AI 助手，它不仅能聊天，还能帮你写代码、跑脚本、搜网页、管文件，甚至控制浏览器。

OpenClaw 就是这样一个**全能型 AI 助手框架**。

它和 ChatGPT 的核心区别在于：**它能真正"动手做事"**。

- ChatGPT 能告诉你"怎么写一个脚本"
- OpenClaw 能**直接写好并运行这个脚本**

你只需要用自然语言描述需求，它就会自动调用各种工具完成任务。

## 系统要求与安装

**系统要求**：
- Node.js 18+ （推荐 20+）
- 支持 macOS、Linux、Windows
- 至少 2GB 可用内存

**安装方式**：

\`\`\`bash
# 全局安装（推荐）
npm install -g openclaw

# 验证安装
openclaw --version
\`\`\`

安装完成后，你需要配置 AI 模型。OpenClaw 支持多种模型后端：

\`\`\`bash
# 配置默认模型
openclaw config set model anthropic/claude-3-sonnet

# 或使用 OpenAI
openclaw config set model openai/gpt-4
\`\`\`

## 连接第一个平台

OpenClaw 支持多个聊天平台，Telegram 和 Discord 是最常用的两个。

**连接 Telegram**：

1. 在 Telegram 中找到 @BotFather，创建一个新 Bot
2. 按提示命名你的 Bot，获得 API Token
3. 将 Token 配置到 OpenClaw：
   \`\`\`bash
   openclaw telegram config --token YOUR_BOT_TOKEN
   openclaw telegram start
   \`\`\`

## 第一次对话

现在，打开你刚连接的平台，找到你的 Bot，发送：

\`\`\`
你好，请介绍一下你自己
\`\`\`

你会收到一个详细的自我介绍，包括它能做什么、怎么使用。

试试这个：

\`\`\`
帮我创建一个 hello.txt 文件，内容是 "Hello, OpenClaw!"
\`\`\`

你会发现，当前目录下真的多了一个 \`hello.txt\` 文件。

**这就是 OpenClaw 的核心价值——它不只是聊天，它真的在帮你做事。**`,
    contentEn: `## What is OpenClaw?

Imagine an AI assistant that doesn't just chat, but can write code, run scripts, search the web, manage files, and even control browsers.

OpenClaw is such a **versatile AI assistant framework**.

The key difference from ChatGPT: **It can actually "do things"**.

- ChatGPT can tell you "how to write a script"
- OpenClaw can **directly write and run that script**

You just describe your needs in natural language, and it automatically calls various tools to complete tasks.

## System Requirements & Installation

**Requirements**:
- Node.js 18+ (20+ recommended)
- macOS, Linux, Windows supported
- At least 2GB available memory

**Installation**:

\`\`\`bash
# Global installation (recommended)
npm install -g openclaw

# Verify installation
openclaw --version
\`\`\`

After installation, configure your AI model:

\`\`\`bash
# Configure default model
openclaw config set model anthropic/claude-3-sonnet

# Or use OpenAI
openclaw config set model openai/gpt-4
\`\`\`

## Connect Your First Platform

OpenClaw supports multiple chat platforms, with Telegram and Discord being the most popular.

**Connect Telegram**:

1. Find @BotFather in Telegram, create a new Bot
2. Name your Bot and get the API Token
3. Configure the token:
   \`\`\`bash
   openclaw telegram config --token YOUR_BOT_TOKEN
   openclaw telegram start
   \`\`\`

## Your First Conversation

Now open your connected platform, find your Bot, and send:

\`\`\`
Hello, please introduce yourself
\`\`\`

You'll receive a detailed self-introduction including what it can do and how to use it.

Try this:

\`\`\`
Create a hello.txt file with content "Hello, OpenClaw!"
\`\`\`

You'll find a \`hello.txt\` file actually appears in your current directory.

**This is the core value of OpenClaw — it doesn't just chat, it actually does things for you.**`,
    exercises: [
      "安装 OpenClaw 并验证安装成功",
      "连接 Telegram 或 Discord 平台",
      "发送 5 条消息测试：询问天气、写脚本、读取文件、创建备忘录、询问日期"
    ],
    exercisesEn: [
      "Install OpenClaw and verify installation",
      "Connect Telegram or Discord platform",
      "Send 5 test messages: ask weather, write script, read file, create memo, ask date"
    ],
    nextStep: "明天学习对话技巧——上下文管理、人设定制、记忆设置。",
    nextStepEn: "Tomorrow: conversation skills — context management, persona customization, memory settings."
  },
  {
    day: 2,
    title: "深度对话",
    titleEn: "Deep Conversation",
    emoji: "💬",
    color: "from-violet-500 to-violet-600",
    objective: "掌握对话技巧：上下文管理、多轮对话、人设定制和记忆设置。",
    objectiveEn: "Master conversation skills: context management, multi-turn dialogue, persona customization, and memory settings.",
    content: `## 上下文管理

你是否遇到过这种情况：

> 你："帮我总结一下这篇文章"
> AI："好的，请发送文章内容。"
> 你："我发了啊，就在上一条消息里..."
> AI："抱歉，我没有看到。"

这是传统聊天机器人的痛点——**记不住上下文**。

OpenClaw 的上下文管理能力来自两个层面：

**1. 对话历史保持**

默认情况下，OpenClaw 会保留最近 20 轮对话：

\`\`\`bash
# 查看当前上下文长度
openclaw config get context_length

# 设置为 50 轮（适合复杂任务）
openclaw config set context_length 50
\`\`\`

**2. 跨会话记忆**

更强大的是，OpenClaw 可以**记住你说过的话，即使在新的对话中**。

这个功能叫 **Memory**（记忆），它会自动提取对话中的关键信息并存储：

\`\`\`
# 告诉 OpenClaw 一些关于你的信息
我叫阿星，是个程序员，在深圳工作。
我对 AI Agent 特别感兴趣。
\`\`\`

下次对话时，直接问：

\`\`\`
你还记得我是谁吗？
\`\`\`

它会准确回答你的身份和兴趣。

## 多轮对话技巧

和 OpenClaw 对话，有一些技巧能让效率翻倍：

**技巧 1：明确任务边界**

❌ 差：帮我搞一下那个报告
✅ 好：帮我整理 sales.csv 里的数据，生成一份月度销售报告，用 Markdown 格式

**技巧 2：逐步推进**

复杂任务不要一次性说完，分步进行效果更好：

\`\`\`
第一步：读取 report.docx 文件
第二步：提取其中的关键数据点
第三步：生成一份可视化图表
\`\`\`

**技巧 3：引用历史内容**

你可以直接引用之前的结果：

\`\`\`
把刚才生成的那个图表保存为 PNG 文件
\`\`\`

OpenClaw 会自动关联上下文中的"那个图表"。

## 人设定制

默认的 OpenClaw 是一个"通用助手"。但你可能想要一个**专属人设**。

人设定制通过 \`IDENTITY.md\` 和 \`SOUL.md\` 两个文件实现：

**IDENTITY.md**（定义基本信息）：

\`\`\`markdown
- Name: 月笔
- Creature: AI 文学助手
- Vibe: 犀利、专业、带温度
- Emoji: 🖋️
\`\`\`

**SOUL.md**（定义性格和工作流）：

\`\`\`markdown
## 角色性格
你是一个专业的写作教练，擅长帮助用户打磨文字。
你的风格是：直接指出问题，但给出建设性建议。

## 工作流
1. 先理解用户要写什么
2. 找出结构或表达上的问题
3. 提供具体的修改建议
\`\`\`

将这两个文件放在你的工作目录，OpenClaw 就会"变身"为你定制的角色。

## 记忆设置

OpenClaw 的记忆系统有多个层级：

**1. 短期记忆**（对话内）- 自动管理，随对话结束而清空

**2. 长期记忆**（跨会话）- 存储在 \`memory/\` 目录

\`\`\`bash
# 查看记忆存储
openclaw memory list

# 清空所有记忆
openclaw memory clear

# 搜索记忆
openclaw memory search "项目名称"
\`\`\`

**3. 工作空间记忆**（项目级）- 通过 \`MEMORY.md\` 文件定义`,
    contentEn: `## Context Management

Have you ever encountered this situation:

> You: "Summarize this article for me"
> AI: "Sure, please send the article content."
> You: "I already sent it, in the previous message..."
> AI: "Sorry, I didn't see it."

This is the pain point of traditional chatbots — **they can't remember context**.

OpenClaw's context management comes from two levels:

**1. Conversation History Retention**

By default, OpenClaw retains the last 20 conversation turns:

\`\`\`bash
# Check current context length
openclaw config get context_length

# Set to 50 turns (for complex tasks)
openclaw config set context_length 50
\`\`\`

**2. Cross-Session Memory**

Even more powerful, OpenClaw can **remember what you said, even in new conversations**.

This feature is called **Memory**, which automatically extracts and stores key information:

\`\`\`
# Tell OpenClaw about yourself
My name is Alex, I'm a programmer working in Shenzhen.
I'm particularly interested in AI Agents.
\`\`\`

Next time, just ask:

\`\`\`
Do you remember who I am?
\`\`\`

It will accurately answer your identity and interests.

## Multi-turn Conversation Tips

**Tip 1: Clear Task Boundaries**

❌ Bad: Help me with that report
✅ Good: Organize the data in sales.csv and generate a monthly sales report in Markdown format

**Tip 2: Step by Step**

For complex tasks, breaking them down works better:

\`\`\`
Step 1: Read the report.docx file
Step 2: Extract key data points
Step 3: Generate a visualization chart
\`\`\`

**Tip 3: Reference History**

You can directly reference previous results:

\`\`\`
Save the chart we just generated as a PNG file
\`\`\`

OpenClaw will automatically associate "that chart" from context.

## Persona Customization

Default OpenClaw is a "general assistant". But you might want a **custom persona**.

Personas are defined through \`IDENTITY.md\` and \`SOUL.md\` files.

**IDENTITY.md**:

\`\`\`markdown
- Name: Alex
- Creature: AI Writing Assistant
- Vibe: Sharp, professional, warm
- Emoji: 🖋️
\`\`\`

Place these files in your working directory, and OpenClaw will "transform" into your custom character.

## Memory Settings

OpenClaw's memory system has multiple levels:

**1. Short-term Memory** (within conversation) - Auto-managed, cleared when conversation ends

**2. Long-term Memory** (cross-session) - Stored in \`memory/\` directory

\`\`\`bash
# View memory storage
openclaw memory list

# Clear all memories
openclaw memory clear

# Search memories
openclaw memory search "project name"
\`\`\``,
    exercises: [
      "上下文测试：连续发送 5 条相关消息，在第 6 条中引用第 2 条的内容",
      "人设定制：创建一个专属人设并用 3 轮对话测试",
      "记忆实验：告诉 OpenClaw 个人信息，开启新对话验证记忆保留"
    ],
    exercisesEn: [
      "Context test: Send 5 related messages, reference message 2 in message 6",
      "Persona customization: Create a custom persona and test with 3 conversation rounds",
      "Memory experiment: Tell OpenClaw personal info, start new conversation to verify retention"
    ],
    nextStep: "明天学习文件操作和代码执行，真正体验'动手能力'。",
    nextStepEn: "Tomorrow: file operations and code execution — experience the 'hands-on capability'."
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

OpenClaw 对文件系统的访问能力，是它区别于普通聊天机器人的关键特征。

**读取文件**：

\`\`\`
读取 README.md 文件的内容
\`\`\`

OpenClaw 会定位文件、读取内容、以易读的方式呈现。

支持多种文件格式：
- 文本文件：\`.txt\`, \`.md\`, \`.json\`, \`.yaml\`
- 代码文件：\`.js\`, \`.py\`, \`.ts\`, \`.go\`
- 文档文件：\`.csv\`, \`.docx\`

**写入文件**：

\`\`\`
创建一个 tasks.md 文件，内容如下：
# 今日任务
- [ ] 完成 Day 3 教程
- [ ] 实践文件操作
- [ ] 写一个小脚本
\`\`\`

**追加内容**：

\`\`\`
在 tasks.md 文件末尾追加：
- [ ] 分享学习心得
\`\`\`

**编辑特定部分**：

\`\`\`
把 README.md 里的"安装方式"那一段重写一下
\`\`\`

## 代码生成与执行

这是 OpenClaw 的杀手级功能——**它能写代码，还能运行代码**。

**代码生成**：

\`\`\`
写一个 Python 脚本，批量重命名当前目录下的所有图片文件
\`\`\`

OpenClaw 会：
1. 生成完整的 Python 代码
2. 展示代码供你确认
3. 询问是否执行

**代码执行**：

确认后，OpenClaw 会调用本地 Python 环境，直接运行这段代码。

你会看到：
- 执行过程的标准输出
- 执行结果（成功/失败）
- 如果出错，详细的错误信息

**安全边界**：

OpenClaw 在执行代码前会进行安全检查：
- 危险操作（如 \`rm -rf\`）会主动警告
- 文件系统修改需要你的明确确认
- 网络请求会提示目标地址

## 脚本运行

你可以让 OpenClaw 运行已有的脚本：

\`\`\`
运行 build.sh 这个构建脚本
\`\`\`

或者让它帮你写一个脚本并执行：

\`\`\`
我需要一个定时备份脚本，每天凌晨 3 点备份 data 目录
\`\`\`

## 本地文件系统管理

OpenClaw 能帮你管理整个文件系统：

\`\`\`
列出当前目录下的所有文件和文件夹
\`\`\`

\`\`\`
创建一个 projects/my-first-project 目录结构
\`\`\`

\`\`\`
搜索所有包含 "TODO" 的 Markdown 文件
\`\`\``,
    contentEn: `## File Read/Write Operations

OpenClaw's file system access capability is the key feature that distinguishes it from ordinary chatbots.

**Read Files**:

\`\`\`
Read the contents of README.md file
\`\`\`

OpenClaw will locate the file, read contents, and present them in a readable way.

Supports multiple file formats:
- Text files: \`.txt\`, \`.md\`, \`.json\`, \`.yaml\`
- Code files: \`.js\`, \`.py\`, \`.ts\`, \`.go\`
- Document files: \`.csv\`, \`.docx\`

**Write Files**:

\`\`\`
Create a tasks.md file with the following content:
# Today's Tasks
- [ ] Complete Day 3 Tutorial
- [ ] Practice file operations
- [ ] Write a small script
\`\`\`

**Append Content**:

\`\`\`
Append to the end of tasks.md:
- [ ] Share learning insights
\`\`\`

**Edit Specific Parts**:

\`\`\`
Rewrite the "Installation" section in README.md
\`\`\`

## Code Generation & Execution

This is OpenClaw's killer feature — **it can write and run code**.

**Code Generation**:

\`\`\`
Write a Python script to batch rename all image files in current directory
\`\`\`

OpenClaw will:
1. Generate complete Python code
2. Display code for your confirmation
3. Ask whether to execute

**Code Execution**:

After confirmation, OpenClaw calls the local Python environment and runs the code directly.

You'll see:
- Standard output during execution
- Execution result (success/failure)
- Detailed error messages if failed

**Safety Boundaries**:

OpenClaw performs safety checks before executing code:
- Dangerous operations (like \`rm -rf\`) will warn you
- File system modifications require your explicit confirmation
- Network requests will show target addresses

## Script Running

You can have OpenClaw run existing scripts:

\`\`\`
Run the build.sh script
\`\`\`

Or have it write and execute a script:

\`\`\`
I need a backup script that runs at 3 AM daily to backup the data directory
\`\`\`

## Local File System Management

OpenClaw can help you manage the entire file system:

\`\`\`
List all files and folders in current directory
\`\`\`

\`\`\`
Create a projects/my-first-project directory structure
\`\`\``,
    exercises: [
      "创建 learning-log.md 文件并写入今天学到的知识点",
      "让 OpenClaw 写一个脚本统计某目录下的文件数量",
      "找一个混乱的文件夹让 OpenClaw 提出整理方案"
    ],
    exercisesEn: [
      "Create learning-log.md file and write today's learnings",
      "Have OpenClaw write a script to count files in a directory",
      "Find a messy folder and have OpenClaw propose organization plan"
    ],
    nextStep: "明天解锁网络能力——搜索互联网、抓取网页、调用 API。",
    nextStepEn: "Tomorrow: unlock web capabilities — search the internet, scrape pages, call APIs."
  },
  {
    day: 4,
    title: "网络能力",
    titleEn: "Web Capabilities",
    emoji: "🌐",
    color: "from-cyan-500 to-cyan-600",
    objective: "解锁网络能力：搜索互联网、抓取网页、调用 API。",
    objectiveEn: "Unlock web capabilities: search the internet, scrape pages, call APIs.",
    content: `## 网络搜索

OpenClaw 内置搜索引擎，让你随时获取最新信息。

**基础搜索**：

\`\`\`
搜索一下 OpenAI 最近有什么新发布
\`\`\`

OpenClaw 会：
1. 调用搜索引擎（默认使用 Brave Search）
2. 获取多个搜索结果
3. 总结关键信息并附上来源链接

**定向搜索**：

\`\`\`
在 GitHub 上搜索 "openclaw" 相关项目
\`\`\`

\`\`\`
搜索知乎上关于 AI Agent 的热门讨论
\`\`\`

**时效性搜索**：

\`\`\`
搜索最近一周关于 GPT-5 的新闻
\`\`\`

OpenClaw 会自动添加时间过滤，只返回最近的结果。

## 网页抓取

有时候搜索结果不够详细，你需要深入阅读某个网页。

**抓取网页内容**：

\`\`\`
抓取这篇文章的内容：https://example.com/article
\`\`\`

OpenClaw 会：
1. 访问目标网页
2. 提取正文内容（过滤广告和导航）
3. 转换为易读的 Markdown 格式

**批量抓取**：

\`\`\`
从这份 URL 列表中抓取所有文章标题和摘要
\`\`\`

## API 调用

OpenClaw 可以直接调用外部 API，无需写代码。

**简单 API 调用**：

\`\`\`
调用天气 API，查询深圳明天的天气
\`\`\`

OpenClaw 会：
1. 选择合适的天气 API
2. 构建请求参数
3. 发送请求并解析响应
4. 用自然语言告诉你结果

**认证 API**：

如果 API 需要 Key，你可以配置：

\`\`\`bash
openclaw config set api.weather_key YOUR_API_KEY
\`\`\`

然后在对话中直接使用：

\`\`\`
用我配置的天气 API 查询北京天气
\`\`\`

**自定义 API 调用**：

\`\`\`
调用 GitHub API，获取 facebook/react 仓库的 star 数量
\`\`\`

## 在线服务集成

OpenClaw 支持多种在线服务的原生集成：

**邮件服务**：
\`\`\`
发一封邮件到 team@company.com，标题是"周报"
\`\`\`

**云存储**：
\`\`\`
把这个文件上传到我的 Google Drive
\`\`\``,
    contentEn: `## Web Search

OpenClaw has a built-in search engine, giving you access to the latest information anytime.

**Basic Search**:

\`\`\`
Search for recent OpenAI releases
\`\`\`

OpenClaw will:
1. Call the search engine (Brave Search by default)
2. Get multiple search results
3. Summarize key information with source links

**Targeted Search**:

\`\`\`
Search GitHub for "openclaw" related projects
\`\`\`

**Time-filtered Search**:

\`\`\`
Search for GPT-5 news from the past week
\`\`\`

OpenClaw will automatically add time filters.

## Web Scraping

Sometimes search results aren't detailed enough, and you need to read a specific webpage.

**Scrape Web Content**:

\`\`\`
Scrape the content of this article: https://example.com/article
\`\`\`

OpenClaw will:
1. Visit the target webpage
2. Extract main content (filtering ads and navigation)
3. Convert to readable Markdown format

**Batch Scraping**:

\`\`\`
From this URL list, scrape all article titles and summaries
\`\`\`

## API Calls

OpenClaw can directly call external APIs without writing code.

**Simple API Call**:

\`\`\`
Call weather API to check tomorrow's weather in Shenzhen
\`\`\`

**Authenticated APIs**:

If an API requires a key, you can configure it:

\`\`\`bash
openclaw config set api.weather_key YOUR_API_KEY
\`\`\`

Then use it directly in conversation:

\`\`\`
Use my configured weather API to check Beijing weather
\`\`\``,
    exercises: [
      "搜索你感兴趣的一个技术话题并总结结果",
      "找一篇长文章让 OpenClaw 抓取并生成摘要",
      "找一个免费公开 API 让 OpenClaw 调用并解析数据"
    ],
    exercisesEn: [
      "Search a tech topic you're interested in and summarize results",
      "Find a long article and have OpenClaw scrape and summarize it",
      "Find a free public API and have OpenClaw call and parse the data"
    ],
    nextStep: "明天探索技能系统——从社区安装扩展能力。",
    nextStepEn: "Tomorrow: explore the skill system — install extended capabilities from community."
  },
  {
    day: 5,
    title: "技能扩展",
    titleEn: "Skill Extensions",
    emoji: "🔧",
    color: "from-pink-500 to-pink-600",
    objective: "从 ClawHub 安装社区技能扩展能力。",
    objectiveEn: "Install community skills from ClawHub to extend capabilities.",
    content: `## ClawHub 介绍

OpenClaw 的核心能力（文件、代码、网络）是通用的。但有些场景需要专业能力——比如：

- 生成图片
- 分析视频
- 操作飞书文档
- 搭建网站

这些**专业能力**通过 **技能（Skills）** 实现。

ClawHub 是 OpenClaw 的技能市场，你可以：

- 🔍 **发现**：浏览社区贡献的技能
- 📥 **安装**：一键安装到本地
- 📤 **发布**：分享你开发的技能

## 技能安装方法

**搜索技能**：

\`\`\`bash
openclaw skills search 图像生成
\`\`\`

**安装技能**：

\`\`\`bash
# 安装指定技能
openclaw skills install image-generator

# 安装指定版本
openclaw skills install image-generator@1.2.0
\`\`\`

**查看已安装技能**：

\`\`\`bash
openclaw skills list
\`\`\`

**更新技能**：

\`\`\`bash
openclaw skills update image-generator
openclaw skills update --all
\`\`\`

**在对话中使用技能**：

安装完成后，技能会自动激活：

\`\`\`
用 image-generator 生成一张赛博朋克风格的夜景图
\`\`\`

## 热门技能推荐

**1. weather（天气查询）**
- 全球天气预报
- 无需 API Key
- 支持中文城市名

**2. video-frames（视频处理）**
- 提取视频帧
- 生成短视频片段

**3. feishu-doc（飞书文档）**
- 读写飞书文档
- 操作多维表格

**4. research（深度研究）**
- 多源信息整合
- 自动生成报告

**5. skill-creator（技能开发）**
- 创建新技能
- 生成技能模板

## 技能安全注意事项

**来源验证**：
- ✅ 优先选择官方认证的技能（带 ✓ 标识）
- ✅ 查看技能的下载量和评分
- ⚠️ 谨慎安装下载量极低的新技能

**权限检查**：

安装前，检查技能的权限要求：

\`\`\`bash
openclaw skills inspect image-generator
\`\`\`

**敏感操作确认**：

技能执行敏感操作时，OpenClaw 会弹出确认提示。`,
    contentEn: `## ClawHub Introduction

OpenClaw's core capabilities (files, code, web) are general-purpose. But some scenarios require specialized capabilities — like:

- Image generation
- Video analysis
- Feishu document operations
- Website building

These **specialized capabilities** are implemented through **Skills**.

ClawHub is OpenClaw's skill marketplace where you can:

- 🔍 **Discover**: Browse community-contributed skills
- 📥 **Install**: One-click installation to local
- 📤 **Publish**: Share your developed skills

## Skill Installation Methods

**Search Skills**:

\`\`\`bash
openclaw skills search image generation
\`\`\`

**Install Skills**:

\`\`\`bash
# Install specific skill
openclaw skills install image-generator

# Install specific version
openclaw skills install image-generator@1.2.0
\`\`\`

**View Installed Skills**:

\`\`\`bash
openclaw skills list
\`\`\`

**Update Skills**:

\`\`\`bash
openclaw skills update image-generator
openclaw skills update --all
\`\`\`

**Use Skills in Conversation**:

After installation, skills activate automatically:

\`\`\`
Use image-generator to create a cyberpunk-style night scene
\`\`\`

## Popular Skills

**1. weather (Weather Query)**
- Global weather forecast
- No API Key required
- Chinese city names supported

**2. video-frames (Video Processing)**
- Extract video frames
- Generate short clips

**3. feishu-doc (Feishu Documents)**
- Read/write Feishu documents
- Operate multi-dimensional tables

**4. research (Deep Research)**
- Multi-source information integration
- Auto-generate reports

**5. skill-creator (Skill Development)**
- Create new skills
- Generate skill templates

## Skill Safety Notes

**Source Verification**:
- ✅ Prefer officially certified skills (with ✓ badge)
- ✅ Check skill downloads and ratings
- ⚠️ Be cautious with new skills with few downloads

**Permission Check**:

Before installing, check skill permissions:

\`\`\`bash
openclaw skills inspect image-generator
\`\`\``,
    exercises: [
      "安装 weather 技能并查询你所在城市的天气",
      "搜索你感兴趣领域的技能并试用一个",
      "检查已安装技能的权限"
    ],
    exercisesEn: [
      "Install weather skill and check your city's weather",
      "Search skills in your field of interest and try one",
      "Check permissions of installed skills"
    ],
    nextStep: "明天进入自动化领域——让 OpenClaw 定时执行任务。",
    nextStepEn: "Tomorrow: automation — let OpenClaw execute tasks on schedule."
  },
  {
    day: 6,
    title: "自动化",
    titleEn: "Automation",
    emoji: "⏰",
    color: "from-orange-500 to-orange-600",
    objective: "设置定时任务、心跳检查、主动提醒和自动化工作流。",
    objectiveEn: "Set up cron jobs, heartbeat checks, proactive reminders, and automation workflows.",
    content: `## 定时任务设置

想象一下这个场景：

> 每天早上 8 点，OpenClaw 自动发送今日天气和待办事项提醒。
> 每周五下午，自动汇总本周工作进展。
> 每月 1 号，自动备份重要数据。

这就是 **定时任务（Cron Jobs）** 的魔力。

**创建定时任务**：

\`\`\`bash
# 每天早上 8 点执行
openclaw cron add "0 8 * * *" "查询深圳天气并发送到我的 Telegram"

# 每周五下午 5 点执行
openclaw cron add "0 17 * * 5" "汇总本周 Git 提交记录并生成周报"

# 每小时执行一次
openclaw cron add "0 * * * *" "检查服务器状态"
\`\`\`

**Cron 表达式速查**：

\`\`\`
┌───────────── 分钟 (0 - 59)
│ ┌───────────── 小时 (0 - 23)
│ │ ┌───────────── 日 (1 - 31)
│ │ │ ┌───────────── 月 (1 - 12)
│ │ │ │ ┌───────────── 星期 (0 - 6)
│ │ │ │ │
* * * * *
\`\`\`

常用示例：
- \`0 9 * * *\` - 每天上午 9 点
- \`0 */2 * * *\` - 每 2 小时
- \`30 18 * * 1-5\` - 周一到周五下午 6:30
- \`0 0 1 * *\` - 每月 1 号凌晨

**管理定时任务**：

\`\`\`bash
openclaw cron list
openclaw cron pause <task_id>
openclaw cron resume <task_id>
openclaw cron remove <task_id>
\`\`\`

## 心跳检查

心跳（Heartbeat）是 OpenClaw 的**主动巡检机制**。

\`\`\`
每隔 5 分钟检查一下我的网站是否在线，如果下线了立即通知我
\`\`\`

OpenClaw 会：
1. 创建一个心跳任务
2. 定期访问你的网站
3. 检测到异常时主动通知你

## 主动提醒

OpenClaw 不只是被动响应，它能**主动找你**。

**一次性提醒**：

\`\`\`
明天下午 3 点提醒我开会
\`\`\`

**周期性提醒**：

\`\`\`
每天早上 9 点提醒我查看今日待办
\`\`\`

**条件触发提醒**：

\`\`\`
当某个 API 接口响应时间超过 1 秒时提醒我
\`\`\`

## 自动化工作流

将定时任务、心跳、提醒组合起来，就是完整的自动化工作流。

**示例：智能日报系统**

\`\`\`
帮我创建一个每日工作流：
每天下午 6 点汇总 Git 提交，生成日报，同步到飞书，并推送给我
\`\`\``,
    contentEn: `## Cron Job Setup

Imagine this scenario:

> Every morning at 8 AM, OpenClaw automatically sends today's weather and to-do reminders.
> Every Friday afternoon, it automatically summarizes the week's progress.
> On the 1st of each month, it automatically backs up important data.

This is the magic of **Cron Jobs**.

**Create Cron Jobs**:

\`\`\`bash
# Run every morning at 8 AM
openclaw cron add "0 8 * * *" "Check Shenzhen weather and send to my Telegram"

# Run every Friday at 5 PM
openclaw cron add "0 17 * * 5" "Summarize this week's Git commits and generate weekly report"

# Run every hour
openclaw cron add "0 * * * *" "Check server status"
\`\`\`

**Cron Expression Quick Reference**:

\`\`\`
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6)
│ │ │ │ │
* * * * *
\`\`\`

Common examples:
- \`0 9 * * *\` - Every day at 9 AM
- \`0 */2 * * *\` - Every 2 hours
- \`30 18 * * 1-5\` - Mon-Fri at 6:30 PM
- \`0 0 1 * *\` - 1st of each month at midnight

**Manage Cron Jobs**:

\`\`\`bash
openclaw cron list
openclaw cron pause <task_id>
openclaw cron resume <task_id>
openclaw cron remove <task_id>
\`\`\`

## Heartbeat Checks

Heartbeat is OpenClaw's **proactive monitoring mechanism**.

\`\`\`
Check if my website is online every 5 minutes, notify me immediately if it's down
\`\`\`

OpenClaw will:
1. Create a heartbeat task
2. Regularly visit your website
3. Proactively notify you when anomalies detected

## Proactive Reminders

OpenClaw doesn't just respond passively, it can **reach out to you**.

**One-time Reminder**:

\`\`\`
Remind me about the meeting tomorrow at 3 PM
\`\`\`

**Recurring Reminder**:

\`\`\`
Remind me to check today's to-do every morning at 9 AM
\`\`\`

**Conditional Trigger Reminder**:

\`\`\`
Remind me when an API response time exceeds 1 second
\`\`\`

## Automation Workflows

Combine cron jobs, heartbeats, and reminders for complete automation workflows.

**Example: Smart Daily Report System**

\`\`\`
Create a daily workflow for me: every day at 6 PM summarize Git commits, generate report, sync to Feishu, and push to me
\`\`\``,
    exercises: [
      "创建一个每天早上 9 点的天气提醒",
      "配置一个网站监控心跳并测试",
      "设计一个简单的自动化流程"
    ],
    exercisesEn: [
      "Create a 9 AM daily weather reminder",
      "Configure a website monitoring heartbeat and test it",
      "Design a simple automation workflow"
    ],
    nextStep: "明天进入进阶领域——多智能体协作、浏览器控制、自定义技能开发。",
    nextStepEn: "Tomorrow: advanced techniques — multi-agent collaboration, browser control, custom skill development."
  },
  {
    day: 7,
    title: "进阶技术",
    titleEn: "Advanced Techniques",
    emoji: "🚀",
    color: "from-indigo-500 to-indigo-600",
    objective: "掌握多智能体协作、浏览器控制、设备集成、自定义技能开发。",
    objectiveEn: "Master multi-agent collaboration, browser control, device integration, and custom skill development.",
    content: `## 多智能体协作

一个人干不完的事，可以让**多个 AI 分身**协作完成。

这就是 OpenClaw 的 **多智能体架构（Multi-Agent System）**。

**核心概念**：

- **Agent（智能体）**：每个独立的 AI 助手，有自己的职责和能力
- **协作（Collaboration）**：Agent 之间传递信息、分工合作
- **编排（Orchestration）**：定义工作流程，让 Agent 有序协作

**创建多智能体系统**：

\`\`\`bash
# 创建一个内容创作团队
openclaw agent create writer --role "内容创作者" --focus "撰写文章"
openclaw agent create editor --role "编辑" --focus "审核修改"
openclaw agent create publisher --role "发布员" --focus "发布到平台"
\`\`\`

**定义协作流程**：

\`\`\`
创建一个内容发布流程：
1. writer 写初稿
2. editor 审核并提修改意见
3. writer 根据意见修改
4. publisher 发布到公众号和视频号
\`\`\`

执行时会看到多个 Agent 依次工作，实时输出进度：

\`\`\`
[writer] 开始撰写初稿...
[writer] 初稿完成
[editor] 审核中...
[editor] 发现 3 处可优化
[writer] 修改中...
[publisher] 发布到公众号...
✅ 流程完成
\`\`\`

## 浏览器控制

OpenClaw 能**直接控制浏览器**，实现复杂的网页操作。

**基础操作**：

\`\`\`
打开淘宝，搜索"机械键盘"，按销量排序，截图前三名商品
\`\`\`

OpenClaw 支持：
- 点击、输入、滚动
- 处理弹窗
- 等待元素加载
- 执行 JavaScript

**浏览器自动化场景**：
- 自动填报表单
- 定期爬取动态网页
- 批量操作网页应用
- 网站测试

## 设备集成

OpenClaw 不仅能控制电脑，还能连接你的**智能设备**。

**支持设备类型**：

- 📱 手机/iPad（通过 companion app）
- 🏠 智能家居设备（Home Assistant 集成）
- 📷 摄像头
- 🔊 智能音箱

**智能家居集成**：

\`\`\`
查看客厅温度
\`\`\`

\`\`\`
把客厅灯光调暗一点
\`\`\`

## 自定义技能开发

当社区技能满足不了需求时，你可以**开发自己的技能**。

**技能结构**：

\`\`\`
my-skill/
├── SKILL.md          # 技能说明文档
├── skill.ts          # 技能核心逻辑
└── config.yaml       # 配置文件（可选）
\`\`\`

**最简技能示例**：

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

**安装发布**：

\`\`\`bash
openclaw skills install ./my-skill
openclaw skills publish ./my-skill
\`\`\`

---

## 🎉 恭喜完成七天学习！

✅ Day 1: 认识 OpenClaw - 安装与首次对话

✅ Day 2: 深度对话 - 上下文管理、人设定制、记忆系统

✅ Day 3: 文件与代码 - 文件读写、代码生成执行、脚本运行

✅ Day 4: 网络能力 - 搜索、网页抓取、API调用、服务集成

✅ Day 5: 技能扩展 - ClawHub、安装技能、安全注意事项

✅ Day 6: 自动化 - 定时任务、心跳检查、工作流

✅ Day 7: 进阶技术 - 多智能体协作、浏览器控制、自定义技能

**建议下一步**：
- 📚 深入阅读官方文档
- 💬 加入社区讨论
- 🛠️ 用 OpenClaw 打造你的第一个自动化项目

**记住**：OpenClaw 是你的 AI 助手，但如何用好它，取决于你的想象力。`,
    contentEn: `## Multi-Agent Collaboration

When one person can't handle everything, let **multiple AI agents** work together.

This is OpenClaw's **Multi-Agent System**.

**Core Concepts**:

- **Agent**: Each independent AI assistant with its own responsibilities and capabilities
- **Collaboration**: Agents pass information and divide work
- **Orchestration**: Define workflows for orderly agent collaboration

**Create Multi-Agent System**:

\`\`\`bash
# Create a content creation team
openclaw agent create writer --role "Content Creator" --focus "Writing articles"
openclaw agent create editor --role "Editor" --focus "Review and revise"
openclaw agent create publisher --role "Publisher" --focus "Publish to platforms"
\`\`\`

**Define Collaboration Workflow**:

\`\`\`
Create a content publishing workflow:
1. writer writes first draft
2. editor reviews and suggests changes
3. writer revises based on feedback
4. publisher publishes to platforms
\`\`\`

During execution, you'll see multiple agents working in sequence:

\`\`\`
[writer] Starting first draft...
[writer] Draft complete
[editor] Reviewing...
[editor] Found 3 areas to improve
[writer] Revising...
[publisher] Publishing to platform...
✅ Workflow complete
\`\`\`

## Browser Control

OpenClaw can **directly control browsers** for complex web operations.

**Basic Operations**:

\`\`\`
Open Amazon, search for "mechanical keyboard", sort by best sellers, screenshot top 3
\`\`\`

OpenClaw supports:
- Click, type, scroll
- Handle popups
- Wait for elements
- Execute JavaScript

**Browser Automation Scenarios**:
- Auto-fill forms
- Periodic scraping of dynamic pages
- Batch operations on web apps
- Website testing

## Device Integration

OpenClaw can not only control computers but also connect to your **smart devices**.

**Supported Device Types**:

- 📱 Phone/iPad (via companion app)
- 🏠 Smart home devices (Home Assistant integration)
- 📷 Cameras
- 🔊 Smart speakers

**Smart Home Integration**:

\`\`\`
Check living room temperature
\`\`\`

\`\`\`
Dim the living room lights a bit
\`\`\`

## Custom Skill Development

When community skills don't meet your needs, you can **develop your own skills**.

**Skill Structure**:

\`\`\`
my-skill/
├── SKILL.md          # Skill documentation
├── skill.ts          # Core logic
└── config.yaml       # Configuration (optional)
\`\`\`

**Minimal Skill Example**:

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

**Install & Publish**:

\`\`\`bash
openclaw skills install ./my-skill
openclaw skills publish ./my-skill
\`\`\`

---

## 🎉 Congratulations on Completing 7 Days!

✅ Day 1: Meet OpenClaw - Installation and first conversation

✅ Day 2: Deep Conversation - Context management, personas, memory

✅ Day 3: Files & Code - File operations, code execution, scripts

✅ Day 4: Web Capabilities - Search, scraping, APIs, integrations

✅ Day 5: Skill Extensions - ClawHub, installing skills, safety

✅ Day 6: Automation - Cron jobs, heartbeats, workflows

✅ Day 7: Advanced Techniques - Multi-agent, browser control, custom skills

**Suggested Next Steps**:
- 📚 Deep dive into official documentation
- 💬 Join community discussions
- 🛠️ Build your first automation project with OpenClaw

**Remember**: OpenClaw is your AI assistant, but how well you use it depends on your imagination.`,
    exercises: [
      "创建至少 2 个 Agent 并让它们协作完成简单任务",
      "让 OpenClaw 自动登录某个网站并执行操作",
      "开发一个简单的自定义技能并本地安装测试"
    ],
    exercisesEn: [
      "Create at least 2 Agents and have them collaborate on a simple task",
      "Have OpenClaw automatically log into a website and perform an action",
      "Develop a simple custom skill and test it locally"
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
