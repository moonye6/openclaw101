export interface DayContent {
  day: number;
  slug: string;
  emoji: string;
  color: string;
  duration: string;
  durationZh: string;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  deliverableEn: string;
  deliverableZh: string;
  objectivesEn: string[];
  objectivesZh: string[];
  sectionsEn: {
    title: string;
    content: string;
    tip?: string;
  }[];
  sectionsZh: {
    title: string;
    content: string;
    tip?: string;
  }[];
  relatedTutorialIds: string[];
}

export const sevenDays: DayContent[] = [
  // ──────── Day 1: 从零安装，让 AI 说出第一句话 ────────
  {
    day: 1,
    slug: 'day-1',
    emoji: '🔧',
    color: 'from-blue-500 to-blue-600',
    duration: '~25 min',
    durationZh: '约 25 分钟',
    titleEn: 'Install & First Reply',
    titleZh: '安装与第一句回复',
    subtitleEn: 'Install OpenClaw with one Docker command, choose an LLM provider, and get your first AI reply in the terminal.',
    subtitleZh: '一条 Docker 命令安装 OpenClaw，选择 LLM 提供商，在终端拿到 AI 的第一句回复。',
    deliverableEn: '✅ A running OpenClaw instance at localhost:3000 that can reply to messages.',
    deliverableZh: '✅ 一个运行在 localhost:3000、能回复消息的 OpenClaw 实例。',
    objectivesEn: [
      'Understand what OpenClaw is and its 3-layer architecture (Gateway → Brain → Skill)',
      'Install OpenClaw using Docker (single command)',
      'Access the Admin Dashboard and complete initial setup',
      'Connect an LLM provider and verify AI replies',
    ],
    objectivesZh: [
      '理解 OpenClaw 是什么，以及它的三层架构（Gateway → Brain → Skill）',
      '使用 Docker 一条命令安装 OpenClaw',
      '访问管理面板，完成初始化配置',
      '接入 LLM 提供商，验证 AI 能正常回复',
    ],
    sectionsEn: [
      {
        title: 'What is OpenClaw? (60-Second Version)',
        content: 'OpenClaw is an **open-source personal AI agent** that runs on your own machine. Unlike ChatGPT or Claude, OpenClaw does things for you — it connects to messaging platforms, controls your files, calls APIs, and runs automations.\n\n**Architecture in one sentence:** Messages arrive through **Gateways** (Telegram, Discord, etc.), get processed by a **Brain** (any LLM), and the Brain calls **Skills** (plugins) to take action.\n\n```\nUser → [Gateway: Telegram/Discord/Web] → [Brain: GPT-4/Claude/Ollama] → [Skills: GitHub/Weather/Smart Home]\n```\n\nThink of OpenClaw as a **universal remote control for AI** — you bring the brain (LLM API key), and OpenClaw connects it to everything.',
      },
      {
        title: 'Install with Docker',
        content: 'Make sure you have Docker installed, then run:\n\n```bash\ndocker run -d --name openclaw \\\n  -p 3000:3000 \\\n  -v openclaw_data:/app/data \\\n  openclaw/openclaw:latest\n```\n\nThat\'s it. Open `http://localhost:3000` in your browser — you should see the OpenClaw Admin Dashboard.\n\n**No Docker?** Use the native install instead:\n\n```bash\ngit clone https://github.com/openclaw/openclaw.git\ncd openclaw && npm install && npm run build && npm start\n```',
        tip: 'Docker is strongly recommended — it handles all dependencies and makes updates easy with `docker pull`.',
      },
      {
        title: 'Connect an LLM Provider',
        content: 'OpenClaw doesn\'t include its own AI model — you bring your own. In the Dashboard, go to **Settings → LLM Providers** and add one:\n\n**Option A — Cloud LLM (easiest):**\n- Paste your OpenAI API key → instant access to GPT-4o\n- Or use Anthropic API key → Claude 3.5 Sonnet\n- Or use any OpenAI-compatible endpoint (Groq, DeepSeek, etc.)\n\n**Option B — Local LLM (free & private):**\n- Install Ollama: `curl -fsSL https://ollama.ai/install.sh | sh`\n- Pull a model: `ollama pull llama3.2`\n- In OpenClaw, set provider to `http://localhost:11434`\n\nAfter saving, click **Test Connection** — you should see "Connected ✓".',
      },
      {
        title: 'Your First Reply — Verify It Works',
        content: 'Go to the **Dashboard → Chat** tab and type:\n\n```\nHello! Please reply with "OpenClaw is alive!" if you can see this.\n```\n\nIf you get a reply — congratulations! 🎉 Your personal AI agent is running.\n\n**Troubleshooting checklist if it fails:**\n- Is the Docker container running? → `docker ps`\n- Is port 3000 open? → Check firewall settings\n- Is the LLM key correct? → Go to Settings → Test Connection\n- Check logs: `docker logs openclaw`',
        tip: 'Bookmark http://localhost:3000 — you\'ll use this dashboard every day.',
      },
    ],
    sectionsZh: [
      {
        title: '什么是 OpenClaw？（60 秒版）',
        content: 'OpenClaw 是一个运行在你自己机器上的**开源个人 AI 智能体**。不同于 ChatGPT 或 Claude，OpenClaw 能帮你**做事** —— 连接聊天平台、操作文件、调用 API、运行自动化。\n\n**一句话架构：** 消息通过 **Gateway**（Telegram、Discord 等）进来，交给 **Brain**（任何 LLM）处理，Brain 再调用 **Skill**（插件）执行操作。\n\n```\n用户 → [Gateway: Telegram/Discord/Web] → [Brain: GPT-4/Claude/Ollama] → [Skill: GitHub/天气/智能家居]\n```\n\n把 OpenClaw 想象成一个**万能 AI 遥控器** —— 你提供大脑（LLM API Key），OpenClaw 把它连接到一切。',
      },
      {
        title: '用 Docker 安装',
        content: '确保你已安装 Docker，然后运行：\n\n```bash\ndocker run -d --name openclaw \\\n  -p 3000:3000 \\\n  -v openclaw_data:/app/data \\\n  openclaw/openclaw:latest\n```\n\n就这样。在浏览器中打开 `http://localhost:3000`，你会看到 OpenClaw 管理面板。\n\n**没装 Docker？** 使用原生安装：\n\n```bash\ngit clone https://github.com/openclaw/openclaw.git\ncd openclaw && npm install && npm run build && npm start\n```',
        tip: '强烈推荐 Docker —— 自动处理所有依赖，后续用 `docker pull` 轻松更新。',
      },
      {
        title: '接入 LLM 提供商',
        content: 'OpenClaw 本身不包含 AI 模型 —— 你需要自己接入。在管理面板中，前往 **设置 → LLM 提供商**：\n\n**方案 A — 云端 LLM（最简单）：**\n- 粘贴 OpenAI API Key → 直接用 GPT-4o\n- 或使用 Anthropic API Key → Claude 3.5 Sonnet\n- 或使用任何 OpenAI 兼容接口（Groq、DeepSeek 等）\n\n**方案 B — 本地 LLM（免费且隐私）：**\n- 安装 Ollama：`curl -fsSL https://ollama.ai/install.sh | sh`\n- 拉取模型：`ollama pull llama3.2`\n- 在 OpenClaw 中设置提供商为 `http://localhost:11434`\n\n保存后点击 **测试连接** —— 你应该看到 "已连接 ✓"。',
      },
      {
        title: '第一句回复 —— 验证安装',
        content: '前往 **管理面板 → 聊天** 标签页，输入：\n\n```\n你好！如果你能看到这条消息，请回复"OpenClaw 已就绪！"\n```\n\n如果收到了回复 —— 恭喜！🎉 你的个人 AI 智能体已经跑起来了。\n\n**如果失败了，按这个清单排查：**\n- Docker 容器在运行吗？→ `docker ps`\n- 3000 端口开放了吗？→ 检查防火墙设置\n- LLM Key 正确吗？→ 设置 → 测试连接\n- 查看日志：`docker logs openclaw`',
        tip: '收藏 http://localhost:3000 —— 接下来每天都会用到这个面板。',
      },
    ],
    relatedTutorialIds: ['9', '12', '13', '18'],
  },

  // ──────── Day 2: 接入 Telegram，变成随身 AI 助手 ────────
  {
    day: 2,
    slug: 'day-2',
    emoji: '💬',
    color: 'from-violet-500 to-violet-600',
    duration: '~30 min',
    durationZh: '约 30 分钟',
    titleEn: 'Connect Telegram — Your Pocket AI',
    titleZh: '接入 Telegram —— 随身 AI 助手',
    subtitleEn: 'Connect OpenClaw to Telegram and chat with your AI from your phone. Master multi-turn dialogue and persona customization.',
    subtitleZh: '把 OpenClaw 接入 Telegram，在手机上随时和 AI 对话。掌握多轮对话和人设定制。',
    deliverableEn: '✅ A Telegram bot connected to your OpenClaw that replies with a custom persona.',
    deliverableZh: '✅ 一个连到你 OpenClaw 的 Telegram 机器人，使用自定义人设回复。',
    objectivesEn: [
      'Create a Telegram bot via @BotFather',
      'Connect Telegram as a Gateway in OpenClaw',
      'Customize system prompt and persona',
      'Understand context window and memory',
    ],
    objectivesZh: [
      '通过 @BotFather 创建 Telegram 机器人',
      '在 OpenClaw 中连接 Telegram 作为 Gateway',
      '自定义系统提示词和 AI 人设',
      '理解上下文窗口和记忆机制',
    ],
    sectionsEn: [
      {
        title: 'Create a Telegram Bot',
        content: 'Open Telegram, search for `@BotFather`, and start a chat:\n\n```\n1. Send /newbot\n2. Enter a display name, e.g. "My OpenClaw Bot"\n3. Enter a username, e.g. "my_openclaw_bot"\n4. Copy the Bot Token (looks like: 6123456789:AAH...)\n```\n\nKeep this token safe — anyone with it can control your bot.',
        tip: 'You can create multiple bots for different purposes — one for work, one for personal, etc.',
      },
      {
        title: 'Connect to OpenClaw',
        content: 'In the OpenClaw Dashboard:\n\n1. Go to **Channels → Add Channel → Telegram**\n2. Paste the Bot Token from step 1\n3. Click **Save & Enable**\n4. Send a message to your bot in Telegram\n\nYou should get an AI reply within seconds! Now you have a pocket AI assistant accessible from your phone anywhere in the world.\n\n**Want to connect more platforms?** OpenClaw supports Discord, WhatsApp, WeChat, Feishu (飞书), Slack, and many more. Each one follows the same pattern: create a bot/app on the platform → paste credentials into OpenClaw.',
      },
      {
        title: 'Customize Your AI Persona',
        content: 'Your AI\'s personality is defined by the **System Prompt**. Go to **Settings → Personas** and try these:\n\n**Coding Buddy:**\n```\nYou are a senior full-stack developer. Always provide working code with explanations.\nPrefer TypeScript. Use clear variable names. Add comments for complex logic.\n```\n\n**Language Tutor:**\n```\nYou are a patient English tutor for Chinese learners.\nCorrect mistakes gently. Provide example sentences. Explain grammar rules simply.\nRespond in both English and Chinese.\n```\n\n**Daily Assistant:**\n```\nYou are a concise, practical assistant. Give direct answers.\nNo fluff, no disclaimers. If you don\'t know, say so.\nFormat lists with bullet points. Keep responses under 200 words.\n```\n\nSwitch personas easily via `/persona coding` in your Telegram chat.',
      },
      {
        title: 'Context & Memory',
        content: 'OpenClaw maintains conversation context so your AI remembers what you talked about.\n\n**Context Window** (Settings → Conversation):\n- **Max Messages**: Default 20. More = better memory, higher cost\n- **Max Tokens**: Token budget per request\n\n**Persistent Memory** — remembers facts across sessions:\n- Auto: OpenClaw remembers important mentions automatically\n- Manual: Type `/remember My server IP is 192.168.1.100`\n- View: Type `/memory` to see all stored memories\n\n**Pro tip: Chain-of-thought prompting** — for complex questions, start with "Think step by step" to get more accurate answers.\n\n**Pro tip: Structured output** — ask for specific formats: "List the pros and cons in a markdown table".',
        tip: 'Start with 20 messages of context. If conversations feel "forgetful", increase to 40. Watch your API costs.',
      },
    ],
    sectionsZh: [
      {
        title: '创建 Telegram 机器人',
        content: '打开 Telegram，搜索 `@BotFather`，开始对话：\n\n```\n1. 发送 /newbot\n2. 输入显示名称，如 "My OpenClaw Bot"\n3. 输入用户名，如 "my_openclaw_bot"\n4. 复制 Bot Token（格式如：6123456789:AAH...）\n```\n\n妥善保管这个 Token —— 任何人拿到它都能控制你的机器人。',
        tip: '你可以为不同用途创建多个机器人 —— 一个用于工作、一个用于生活。',
      },
      {
        title: '连接到 OpenClaw',
        content: '在 OpenClaw 管理面板中：\n\n1. 前往 **通道 → 添加通道 → Telegram**\n2. 粘贴第一步获得的 Bot Token\n3. 点击 **保存并启用**\n4. 在 Telegram 中给你的机器人发消息\n\n几秒钟内你应该就能收到 AI 回复！现在你有了一个随身携带的 AI 助手，世界各地都能用手机和它聊天。\n\n**想接入更多平台？** OpenClaw 支持 Discord、WhatsApp、微信、飞书、Slack 等。每个平台都是同样的流程：在平台上创建机器人/应用 → 把凭证粘贴到 OpenClaw。',
      },
      {
        title: '定制你的 AI 人设',
        content: 'AI 的性格由**系统提示词**定义。前往 **设置 → 人设**，试试这些：\n\n**编程搭档：**\n```\n你是一个资深全栈开发工程师。始终提供可运行的代码和解释。\n偏好 TypeScript。使用清晰的变量名。为复杂逻辑添加注释。\n```\n\n**英语家教：**\n```\n你是一个耐心的英语家教，面向中文学习者。\n温和地纠正错误。提供例句。用简单的方式解释语法规则。\n用英文和中文双语回复。\n```\n\n**日常助手：**\n```\n你是一个简洁、实用的助手。给出直接的回答。\n不要废话，不要免责声明。如果不知道就直说。\n列表用要点格式。每次回复不超过 200 字。\n```\n\n在 Telegram 中通过 `/persona coding` 快速切换人设。',
      },
      {
        title: '上下文与记忆',
        content: 'OpenClaw 维护对话上下文，让 AI 记住你们聊过的内容。\n\n**上下文窗口**（设置 → 对话）：\n- **最大消息数**：默认 20 条。越多记忆越好，费用也越高\n- **最大 Token 数**：每次请求的 Token 预算\n\n**持久记忆** —— 跨会话记住信息：\n- 自动：OpenClaw 自动记住重要提及\n- 手动：输入 `/remember 我的服务器 IP 是 192.168.1.100`\n- 查看：输入 `/memory` 查看所有已存储的记忆\n\n**进阶技巧：思维链提示** —— 复杂问题先说"请一步一步思考"，能获得更准确的回答。\n\n**进阶技巧：结构化输出** —— 要求特定格式："把优缺点用 Markdown 表格列出来"。',
        tip: '从 20 条上下文开始。如果对话感觉"健忘"，增加到 40 条。注意关注 API 费用。',
      },
    ],
    relatedTutorialIds: ['11', '10', '19', '17'],
  },

  // ──────── Day 3: 用 AI 写代码、操作文件 ────────
  {
    day: 3,
    slug: 'day-3',
    emoji: '⌨️',
    color: 'from-emerald-500 to-emerald-600',
    duration: '~35 min',
    durationZh: '约 35 分钟',
    titleEn: 'Code & Files — Let AI Be Your Dev Intern',
    titleZh: '代码与文件 —— 让 AI 当你的实习开发',
    subtitleEn: 'Enable file access, let AI read your code, generate scripts, and execute them. Build a real utility script through chat.',
    subtitleZh: '启用文件访问，让 AI 阅读代码、生成脚本并执行。通过聊天构建一个实用小工具。',
    deliverableEn: '✅ A Python/Bash utility script generated and executed by your AI — e.g., a file organizer or data converter.',
    deliverableZh: '✅ 一个由 AI 生成并执行的 Python/Bash 实用脚本 —— 比如文件整理器或数据转换器。',
    objectivesEn: [
      'Enable and configure file system permissions safely',
      'Let AI read, create, and modify files through chat',
      'Generate and execute code scripts end-to-end',
      'Build a practical tool: batch file renamer or CSV converter',
    ],
    objectivesZh: [
      '安全地启用和配置文件系统权限',
      '通过聊天让 AI 读取、创建和修改文件',
      '端到端地生成并执行代码脚本',
      '构建一个实用工具：批量文件重命名器或 CSV 转换器',
    ],
    sectionsEn: [
      {
        title: 'Enable File Access (Safely)',
        content: 'By default, OpenClaw cannot access your file system. Let\'s enable it with guardrails:\n\n1. Go to **Settings → Permissions → File System**\n2. Set **Mode** to "Read-Write"\n3. Set **Allowed Paths** to a specific folder, e.g.: `/home/you/projects`\n4. Enable **"Ask Before Write"** — AI shows changes before applying them\n\n**Security rules of thumb:**\n- Never allow access to `/`, `/etc`, or `~/.ssh`\n- Create a dedicated "sandbox" folder for AI experiments\n- Always use "Ask Before Write" until you trust the workflow',
        tip: 'Create a folder like ~/ai-sandbox for experimenting. Grant access only to that folder first.',
      },
      {
        title: 'Reading & Understanding Code',
        content: 'Now try these commands in your Telegram/Dashboard chat:\n\n**Read a file:**\n```\nRead the file ~/projects/myapp/package.json and explain what it does\n```\n\n**Analyze a codebase:**\n```\nList all .py files in ~/projects/data-pipeline/ and give me a 1-line summary of each\n```\n\n**Find issues:**\n```\nRead ~/projects/myapp/src/auth.ts and point out any security issues\n```\n\nOpenClaw reads the actual file contents and uses the LLM to analyze them — it\'s like having a code reviewer available 24/7.',
      },
      {
        title: 'Generate & Execute Code',
        content: 'The real power: ask AI to write AND run code for you.\n\n**Example 1 — File organizer:**\n```\nWrite a Python script that organizes ~/Downloads by file type:\n- Images (.jpg, .png, .gif) → ~/Downloads/Images/\n- Documents (.pdf, .docx) → ~/Downloads/Documents/\n- Videos (.mp4, .mov) → ~/Downloads/Videos/\nThen run it.\n```\n\n**Example 2 — CSV converter:**\n```\nRead ~/data/sales.csv, convert all prices from USD to CNY (rate: 7.24),\nadd a new column "price_cny", and save as ~/data/sales_cny.csv\n```\n\n**Example 3 — Quick API:**\n```\nCreate a simple Express.js server in ~/projects/hello-api/ that has\nGET /hello returning { "message": "Hello from OpenClaw!" }\nThen start it on port 8080.\n```\n\nOpenClaw will show you the generated code before executing. Review it, then confirm.',
      },
      {
        title: 'Hands-On Challenge: Build a Tool',
        content: 'Put it all together! Send this to your AI:\n\n```\nI have a folder ~/photos with hundreds of images.\nBuild me a Python script that:\n1. Reads EXIF data from each .jpg file\n2. Renames them to YYYY-MM-DD_HH-MM-SS.jpg based on date taken\n3. Moves duplicates (same datetime) to a ~/photos/duplicates/ folder\n4. Prints a summary of how many files were renamed vs duplicated\nSave the script as ~/photos/organize.py\n```\n\nReview the generated script, then ask AI to run it. Check the results!\n\n**Can\'t think of a project?** Try these:\n- Batch-resize images to 800px width\n- Convert all Markdown files in a folder to HTML\n- Generate a sitemap.xml from a folder of HTML files',
        tip: 'Always review generated code before executing. AI is powerful but can make mistakes — treat it like reviewing a junior developer\'s code.',
      },
    ],
    sectionsZh: [
      {
        title: '启用文件访问（安全地）',
        content: '默认情况下，OpenClaw 无法访问你的文件系统。让我们带着安全护栏启用它：\n\n1. 前往 **设置 → 权限 → 文件系统**\n2. 将 **模式** 设为 "读写"\n3. 将 **允许的路径** 设为特定文件夹，如：`/home/you/projects`\n4. 启用 **"写入前确认"** —— AI 会在修改前展示更改\n\n**安全准则：**\n- 永远不要允许访问 `/`、`/etc` 或 `~/.ssh`\n- 为 AI 实验创建专用的"沙箱"文件夹\n- 在你信任工作流之前，始终使用"写入前确认"',
        tip: '创建一个类似 ~/ai-sandbox 的文件夹来做实验。先只授权这个文件夹。',
      },
      {
        title: '阅读和理解代码',
        content: '现在在 Telegram/管理面板聊天中试试这些命令：\n\n**读取文件：**\n```\n读取 ~/projects/myapp/package.json 并解释它的内容\n```\n\n**分析代码库：**\n```\n列出 ~/projects/data-pipeline/ 中所有 .py 文件，每个用一句话总结\n```\n\n**查找问题：**\n```\n读取 ~/projects/myapp/src/auth.ts 并指出其中的安全隐患\n```\n\nOpenClaw 读取实际的文件内容，然后用 LLM 来分析 —— 就像有一个 7×24 小时的代码审查员。',
      },
      {
        title: '生成并执行代码',
        content: '真正的强大之处：让 AI 写代码**然后运行**。\n\n**示例 1 —— 文件整理器：**\n```\n写一个 Python 脚本，按文件类型整理 ~/Downloads：\n- 图片 (.jpg, .png, .gif) → ~/Downloads/Images/\n- 文档 (.pdf, .docx) → ~/Downloads/Documents/\n- 视频 (.mp4, .mov) → ~/Downloads/Videos/\n然后运行它。\n```\n\n**示例 2 —— CSV 转换器：**\n```\n读取 ~/data/sales.csv，把所有价格从 USD 转成 CNY（汇率 7.24），\n添加新列"price_cny"，保存为 ~/data/sales_cny.csv\n```\n\n**示例 3 —— 快速 API：**\n```\n在 ~/projects/hello-api/ 创建一个简单的 Express.js 服务器，\nGET /hello 返回 { "message": "Hello from OpenClaw!" }\n然后在 8080 端口启动它。\n```\n\nOpenClaw 会在执行前展示生成的代码。审查后确认即可。',
      },
      {
        title: '动手挑战：构建一个工具',
        content: '把前面学的整合起来！发这段给你的 AI：\n\n```\n我有一个 ~/photos 文件夹，里面有几百张图片。\n帮我写一个 Python 脚本：\n1. 读取每个 .jpg 文件的 EXIF 数据\n2. 根据拍摄日期重命名为 YYYY-MM-DD_HH-MM-SS.jpg\n3. 把重复的（相同日期时间）移到 ~/photos/duplicates/ 文件夹\n4. 打印一个总结：多少文件被重命名，多少是重复的\n保存脚本为 ~/photos/organize.py\n```\n\n审查生成的脚本，然后让 AI 运行。检查结果！\n\n**想不到项目？** 试试这些：\n- 把图片批量缩放到宽度 800px\n- 将文件夹中所有 Markdown 文件转成 HTML\n- 从一个 HTML 文件夹生成 sitemap.xml',
        tip: '执行前一定要审查生成的代码。AI 很强大但会犯错 —— 就像审查初级开发者的代码一样对待它。',
      },
    ],
    relatedTutorialIds: ['14', '11', '23'],
  },

  // ──────── Day 4: 接入飞书/微信/钉钉，打通国内生态 ────────
  {
    day: 4,
    slug: 'day-4',
    emoji: '🇨🇳',
    color: 'from-cyan-500 to-cyan-600',
    duration: '~35 min',
    durationZh: '约 35 分钟',
    titleEn: 'Chinese Ecosystem — Feishu, WeChat & DingTalk',
    titleZh: '国内生态 —— 飞书、微信、钉钉全接入',
    subtitleEn: 'Connect OpenClaw to Chinese platforms: Feishu (Lark), WeChat, and DingTalk. Deploy to Alibaba Cloud or Tencent Cloud.',
    subtitleZh: '把 OpenClaw 接入国内平台：飞书、微信和钉钉。部署到阿里云或腾讯云。',
    deliverableEn: '✅ Your AI assistant replying in at least one Chinese platform (Feishu/WeChat/DingTalk), optionally deployed to cloud.',
    deliverableZh: '✅ 你的 AI 助手在至少一个国内平台（飞书/微信/钉钉）上回复消息，可选部署到云端。',
    objectivesEn: [
      'Connect Feishu (Lark) as a Gateway with bot configuration',
      'Understand WeChat and DingTalk integration patterns',
      'Deploy OpenClaw to Alibaba Cloud or Tencent Cloud Lighthouse',
      'Configure Chinese-friendly LLM providers (DeepSeek, Qwen)',
    ],
    objectivesZh: [
      '将飞书作为 Gateway 接入，配置机器人',
      '理解微信和钉钉的集成模式',
      '将 OpenClaw 部署到阿里云或腾讯云 Lighthouse',
      '配置对中文友好的 LLM 提供商（DeepSeek、通义千问）',
    ],
    sectionsEn: [
      {
        title: 'Connect Feishu (Lark)',
        content: 'Feishu is the most popular workspace app in China. Here\'s how to connect:\n\n**1. Create a Feishu Bot:**\n- Go to [Feishu Open Platform](https://open.feishu.cn) → Create App\n- Enable "Bot" capability\n- Note down the App ID and App Secret\n- Set the event callback URL to `http://your-server:3000/api/gateway/feishu`\n\n**2. Configure in OpenClaw:**\n- Dashboard → Channels → Add Channel → Feishu\n- Enter App ID and App Secret\n- Save & Enable\n\n**3. Test:**\n- Add the bot to a Feishu group, or chat with it 1-on-1\n- Send a message — you should get AI replies!\n\nThe complete setup takes about 10 minutes if you follow the step-by-step guide.',
        tip: 'Feishu requires your server to be accessible from the internet. Use a cloud server or ngrok for local development.',
      },
      {
        title: 'WeChat & DingTalk',
        content: '**WeChat Integration:**\nOpenClaw supports WeChat via multiple methods:\n- **WeChat Official Account** — best for public-facing bots\n- **WeCom (企业微信)** — best for team/company use\n- **Personal WeChat** — via wechaty bridge (unofficial)\n\nFor WeCom, create an app at work.weixin.qq.com, configure the callback URL, and add the credentials to OpenClaw.\n\n**DingTalk Integration:**\n- Create a custom robot at open.dingtalk.com\n- Configure webhook URL and security settings\n- Add the robot credentials to OpenClaw\n\nAll three platforms follow the same pattern: create a bot on the platform → configure webhook → add credentials to OpenClaw.',
      },
      {
        title: 'Deploy to Cloud (Alibaba / Tencent)',
        content: 'Running on localhost is great for testing, but for 24/7 availability you\'ll want a cloud server.\n\n**Alibaba Cloud (阿里云) — Quickest path:**\n1. Go to Alibaba Cloud → Lightweight Server (轻量应用服务器)\n2. Select the OpenClaw app image (one-click deploy)\n3. Wait 2-3 minutes for deployment\n4. Access your dashboard at `http://your-server-ip:3000`\n\n**Tencent Cloud Lighthouse (腾讯云):**\n1. Go to Lighthouse console → Create instance\n2. Choose Docker image\n3. SSH in and run the Docker command from Day 1\n4. Configure security group to allow port 3000\n\n**After deployment:** Update your Feishu/DingTalk callback URLs to point to your cloud server IP.',
        tip: 'Cloud server costs around ¥50-100/month. Many providers offer free trials for new users.',
      },
      {
        title: 'Chinese-Friendly LLM Providers',
        content: 'For better Chinese language support, consider these LLM providers:\n\n**DeepSeek (recommended):**\n- Excellent Chinese + English bilingual capability\n- OpenAI-compatible API — just change the endpoint URL\n- Very competitive pricing\n\n**Alibaba Qwen (通义千问):**\n- Strong Chinese understanding\n- Available via Alibaba Cloud DashScope API\n- Free tier available\n\n**Moonshot (Kimi):**\n- 128K context window — great for long documents\n- Good balance of Chinese/English\n\n**Configuration:** In OpenClaw Settings → LLM Providers, add a custom OpenAI-compatible provider with the endpoint URL and API key from your chosen provider.\n\n**Pro tip:** You can configure multiple LLM providers and switch between them per persona — use GPT-4o for coding tasks and DeepSeek for Chinese conversations.',
      },
    ],
    sectionsZh: [
      {
        title: '接入飞书',
        content: '飞书是国内最流行的办公协作应用。接入方法：\n\n**1. 创建飞书机器人：**\n- 前往[飞书开放平台](https://open.feishu.cn) → 创建应用\n- 启用"机器人"能力\n- 记下 App ID 和 App Secret\n- 设置事件回调 URL 为 `http://你的服务器:3000/api/gateway/feishu`\n\n**2. 在 OpenClaw 中配置：**\n- 管理面板 → 通道 → 添加通道 → 飞书\n- 输入 App ID 和 App Secret\n- 保存并启用\n\n**3. 测试：**\n- 把机器人拉入飞书群，或直接 1 对 1 聊天\n- 发送消息 —— 你应该能收到 AI 回复！\n\n按照分步指南操作，完整配置大约 10 分钟。',
        tip: '飞书要求你的服务器能被公网访问。使用云服务器或 ngrok 进行本地开发。',
      },
      {
        title: '微信和钉钉',
        content: '**微信接入：**\nOpenClaw 通过多种方式支持微信：\n- **微信公众号** —— 适合面向公众的机器人\n- **企业微信** —— 适合团队/公司内部使用\n- **个人微信** —— 通过 wechaty 桥接（非官方方式）\n\n企业微信的话，在 work.weixin.qq.com 创建应用，配置回调 URL，把凭证添加到 OpenClaw。\n\n**钉钉接入：**\n- 在 open.dingtalk.com 创建自定义机器人\n- 配置 webhook URL 和安全设置\n- 把机器人凭证添加到 OpenClaw\n\n三个平台都是同样的模式：在平台上创建机器人 → 配置 webhook → 把凭证添加到 OpenClaw。',
      },
      {
        title: '部署到云端（阿里云/腾讯云）',
        content: '在 localhost 上测试很好，但要 7×24 小时运行需要云服务器。\n\n**阿里云 —— 最快路径：**\n1. 前往阿里云 → 轻量应用服务器\n2. 选择 OpenClaw 应用镜像（一键部署）\n3. 等待 2-3 分钟完成部署\n4. 在 `http://你的服务器IP:3000` 访问管理面板\n\n**腾讯云 Lighthouse：**\n1. 前往 Lighthouse 控制台 → 创建实例\n2. 选择 Docker 镜像\n3. SSH 登录，运行第 1 天的 Docker 命令\n4. 配置安全组允许 3000 端口\n\n**部署完成后：** 更新飞书/钉钉的回调 URL，指向你的云服务器 IP。',
        tip: '云服务器费用大约 ¥50-100/月。很多厂商对新用户提供免费试用。',
      },
      {
        title: '中文友好的 LLM 提供商',
        content: '为了更好的中文支持，考虑这些 LLM 提供商：\n\n**DeepSeek（推荐）：**\n- 出色的中英双语能力\n- OpenAI 兼容 API —— 只需修改 endpoint URL\n- 定价非常有竞争力\n\n**阿里通义千问：**\n- 优秀的中文理解能力\n- 通过阿里云 DashScope API 使用\n- 有免费额度\n\n**Moonshot（Kimi）：**\n- 128K 上下文窗口 —— 特别适合处理长文档\n- 中英文平衡性好\n\n**配置方法：** 在 OpenClaw 设置 → LLM 提供商中，添加自定义的 OpenAI 兼容提供商，填入 endpoint URL 和 API Key。\n\n**进阶技巧：** 可以配置多个 LLM 提供商，按人设切换 —— 编程任务用 GPT-4o，中文对话用 DeepSeek。',
      },
    ],
    relatedTutorialIds: ['5', '4', '10', '28', '19'],
  },

  // ──────── Day 5: 安装技能，变成超级助手 ────────
  {
    day: 5,
    slug: 'day-5',
    emoji: '🧩',
    color: 'from-orange-500 to-orange-600',
    duration: '~30 min',
    durationZh: '约 30 分钟',
    titleEn: 'Skills — Turn Your AI into a Superpower',
    titleZh: '技能 —— 让 AI 变成超级助手',
    subtitleEn: 'Install real skills from ClawHub: GitHub integration, web search, weather, and more. Build a practical daily workflow.',
    subtitleZh: '从 ClawHub 安装真正的技能：GitHub 集成、网络搜索、天气查询等。构建一个实用的日常工作流。',
    deliverableEn: '✅ At least 3 skills installed, and a "morning briefing" workflow that searches news + checks weather + summarizes your GitHub notifications.',
    deliverableZh: '✅ 至少安装 3 个技能，以及一个"早间简报"工作流：搜索新闻 + 查天气 + 总结 GitHub 通知。',
    objectivesEn: [
      'Browse and install skills from ClawHub marketplace',
      'Configure skills with API keys and permissions',
      'Use skills naturally in conversation',
      'Combine multiple skills into a practical workflow',
    ],
    objectivesZh: [
      '在 ClawHub 技能市场浏览和安装技能',
      '用 API Key 和权限配置技能',
      '在对话中自然使用技能',
      '将多个技能组合成实用工作流',
    ],
    sectionsEn: [
      {
        title: 'What Are Skills & ClawHub?',
        content: 'Skills are **plugins** that give your AI new abilities beyond conversation. ClawHub is the official marketplace with 5,490+ community-built skills.\n\n**Skills let your AI:**\n- Search the web in real time\n- Manage GitHub issues and PRs\n- Query databases\n- Control smart home devices\n- Generate images\n- Send emails\n- And thousands more...\n\nWithout skills, your AI can only chat. With skills, it becomes an **agent** that takes action.\n\nBrowse available skills at **Settings → Skills → Browse ClawHub** or on the [Skills page](/skills) of this site.',
      },
      {
        title: 'Install Your First 3 Skills',
        content: 'Let\'s install the most useful starter skills:\n\n**1. Web Search** — gives AI access to the internet\n```\n/install-skill web-search\n```\nConfigure: Add a SearXNG instance URL or Google/Bing API key.\n\n**2. GitHub** — manage repos, issues, PRs\n```\n/install-skill github-manager\n```\nConfigure: Add your GitHub Personal Access Token (Settings → Developer Settings → Tokens).\n\n**3. Weather** — get weather forecasts\n```\n/install-skill weather\n```\nConfigure: Add an OpenWeatherMap API key (free tier).\n\nAfter installing, verify each one works:\n```\nSearch the web for "OpenClaw latest release"\nList my open GitHub issues on myrepo\nWhat\'s the weather like in Shanghai today?\n```',
        tip: 'You can also install skills from the Dashboard GUI: Settings → Skills → Browse ClawHub → click Install.',
      },
      {
        title: 'Build a Morning Briefing Workflow',
        content: 'Now combine your skills into something useful. Send this to your AI:\n\n```\nGive me a morning briefing:\n1. Search the web for today\'s top 3 AI/tech news headlines\n2. What\'s the weather forecast for Shanghai today?\n3. List any new GitHub notifications on my repos\n4. Summarize everything in a concise briefing format\n```\n\nYour AI will:\n- Use the **web-search** skill to find news\n- Use the **weather** skill for the forecast\n- Use the **github** skill for notifications\n- Use the **LLM** to summarize it all\n\nThis is the power of skills — each one is simple on its own, but combined they create powerful workflows.\n\n**Want more?** Try:\n- "Monitor Hacker News front page and alert me about AI articles"\n- "Check my GitHub PRs, summarize review comments, and draft replies"',
      },
      {
        title: 'Security: Before You Go Skill-Crazy',
        content: '⚠️ **Important safety warning:** In February 2026, researchers found **341 malicious skills** on ClawHub that were stealing user data.\n\n**Before installing ANY skill, check:**\n1. **Publisher verified?** — Look for the ✓ badge\n2. **Permissions reasonable?** — A weather skill shouldn\'t need file access\n3. **Source code available?** — Prefer open-source skills\n4. **Community reviews** — Check comments and star count\n5. **Recent updates?** — Abandoned skills may have unpatched vulnerabilities\n\n**Best practices:**\n- Enable **Skill Audit Mode** (Settings → Security) to log all skill actions\n- Review audit logs weekly\n- Uninstall skills you no longer use\n- Keep skills updated: `/update-skills`\n\nRead the full security analysis on [The Hacker News](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html) or [Adversa AI\'s hardening guide](https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/).',
        tip: 'When in doubt, don\'t install. You can always ask in the OpenClaw Discord community whether a skill is trustworthy.',
      },
    ],
    sectionsZh: [
      {
        title: '什么是技能和 ClawHub？',
        content: '技能是赋予 AI 超越对话之外新能力的**插件**。ClawHub 是官方技能市场，有 5,490+ 社区构建的技能。\n\n**技能让你的 AI 能够：**\n- 实时搜索网络\n- 管理 GitHub Issue 和 PR\n- 查询数据库\n- 控制智能家居设备\n- 生成图片\n- 发送邮件\n- 还有数千种更多能力...\n\n没有技能，你的 AI 只能聊天。有了技能，它就变成了能**执行操作的智能体**。\n\n在 **设置 → 技能 → 浏览 ClawHub** 或本站的[技能页面](/skills)浏览可用技能。',
      },
      {
        title: '安装你的前 3 个技能',
        content: '让我们安装最实用的入门技能：\n\n**1. 网络搜索** —— 让 AI 能上网\n```\n/install-skill web-search\n```\n配置：添加 SearXNG 实例 URL 或 Google/Bing API Key。\n\n**2. GitHub** —— 管理仓库、Issue、PR\n```\n/install-skill github-manager\n```\n配置：添加你的 GitHub 个人访问令牌（Settings → Developer Settings → Tokens）。\n\n**3. 天气** —— 获取天气预报\n```\n/install-skill weather\n```\n配置：添加 OpenWeatherMap API Key（有免费额度）。\n\n安装后，验证每个技能是否工作：\n```\n搜索 "OpenClaw 最新版本"\n列出我在 myrepo 上的未关闭 Issue\n上海今天天气怎么样？\n```',
        tip: '你也可以在管理面板 GUI 中安装：设置 → 技能 → 浏览 ClawHub → 点击安装。',
      },
      {
        title: '构建早间简报工作流',
        content: '现在把你的技能组合成实用的东西。发这段给你的 AI：\n\n```\n给我一个早间简报：\n1. 搜索今天排名前 3 的 AI/科技新闻\n2. 上海今天的天气预报是什么？\n3. 列出我 GitHub 仓库的最新通知\n4. 把所有内容总结成一个简洁的简报格式\n```\n\n你的 AI 会：\n- 使用 **web-search** 技能查找新闻\n- 使用 **weather** 技能获取天气\n- 使用 **github** 技能获取通知\n- 使用 **LLM** 汇总所有内容\n\n这就是技能的力量 —— 每个单独看很简单，但组合起来就能创建强大的工作流。\n\n**想要更多？** 试试：\n- "监控 Hacker News 首页，发现 AI 文章时提醒我"\n- "检查我的 GitHub PR，总结评审意见，帮我草拟回复"',
      },
      {
        title: '安全：在疯狂装技能之前',
        content: '⚠️ **重要安全提醒：** 2026 年 2 月，研究人员发现 ClawHub 上有 **341 个恶意技能**在窃取用户数据。\n\n**安装任何技能之前，检查：**\n1. **发布者已认证？** —— 看是否有 ✓ 徽章\n2. **权限合理？** —— 天气技能不应该需要文件访问权限\n3. **源码可用？** —— 优先选择开源技能\n4. **社区评价** —— 查看评论和星标数\n5. **最近更新？** —— 废弃的技能可能有未修复的漏洞\n\n**最佳实践：**\n- 启用 **技能审计模式**（设置 → 安全），记录所有技能操作\n- 每周审查审计日志\n- 卸载不再使用的技能\n- 保持技能更新：`/update-skills`\n\n完整安全分析请阅读 [The Hacker News 报道](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html) 或 [Adversa AI 的加固指南](https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/)。',
        tip: '拿不准的时候就不要装。你可以在 OpenClaw Discord 社区询问某个技能是否可信。',
      },
    ],
    relatedTutorialIds: ['3', '33', '34', '30', '32'],
  },

  // ──────── Day 6: 自动化 —— 让 AI 24/7 为你干活 ────────
  {
    day: 6,
    slug: 'day-6',
    emoji: '⚡',
    color: 'from-pink-500 to-pink-600',
    duration: '~35 min',
    durationZh: '约 35 分钟',
    titleEn: 'Automation — AI Works While You Sleep',
    titleZh: '自动化 —— AI 替你 24 小时工作',
    subtitleEn: 'Set up scheduled tasks, proactive reminders, monitoring, and multi-step workflows. Build a real daily automation.',
    subtitleZh: '设置定时任务、主动提醒、监控和多步骤工作流。构建一个真正的日常自动化。',
    deliverableEn: '✅ A scheduled "morning briefing" that runs daily at 9 AM and sends a digest to your Telegram/Feishu.',
    deliverableZh: '✅ 一个定时"早间简报"，每天早上 9 点运行，发送摘要到你的 Telegram/飞书。',
    objectivesEn: [
      'Create scheduled tasks with cron-style timing',
      'Set up proactive reminders and conditional alerts',
      'Build a multi-step automated workflow',
      'Configure monitoring for a website or service',
    ],
    objectivesZh: [
      '创建 cron 风格定时的定时任务',
      '设置主动提醒和条件告警',
      '构建多步骤自动化工作流',
      '为网站或服务配置监控',
    ],
    sectionsEn: [
      {
        title: 'Scheduled Tasks',
        content: 'Turn your Day 5 morning briefing into an automated daily task:\n\n1. Go to **Settings → Automation → Scheduled Tasks**\n2. Click **Add Task**\n3. Configure:\n   - **Name**: "Morning Briefing"\n   - **Schedule**: `0 9 * * *` (every day at 9:00 AM)\n   - **Channel**: Your Telegram/Feishu channel\n   - **Prompt**: "Give me a morning briefing: top 3 tech news, Shanghai weather, and my GitHub notifications. Keep it concise."\n4. Click **Save & Enable**\n\nNow every morning at 9 AM, your AI will proactively send you a briefing message. No interaction needed.\n\n**More schedule examples:**\n- `0 9 * * 1-5` — weekdays only at 9 AM\n- `0 */2 * * *` — every 2 hours\n- `0 18 * * 5` — every Friday at 6 PM',
        tip: 'Set your timezone in Settings → General first. Cron uses server timezone by default.',
      },
      {
        title: 'Proactive Reminders',
        content: 'OpenClaw can remind you about anything:\n\n**Simple reminders:**\n```\nRemind me at 2 PM today to review the design doc\nRemind me every Monday at 10 AM to submit my weekly report\n```\n\n**Conditional alerts (pair with skills):**\n```\nMonitor the price of ETH. Alert me if it drops below $2,500\nCheck my server at api.myapp.com every 30 minutes. Alert me if it\'s down\nWatch my GitHub repo for new issues labeled "urgent" — notify me immediately\n```\n\nConditional alerts combine **scheduled checks** with **skill actions** — the AI periodically runs a check and only notifies you when conditions are met.\n\n**Managing reminders:**\n- View all: `/reminders`\n- Cancel one: `/cancel-reminder 3`\n- Pause all: `/pause-reminders`',
      },
      {
        title: 'Build: Daily Report Automation',
        content: 'Let\'s build a practical end-of-day automation. Go to **Automation → Add Task**:\n\n**Name:** "Daily Dev Report"\n**Schedule:** `0 18 * * 1-5` (weekdays at 6 PM)\n**Prompt:**\n```\nGenerate my daily development report:\n1. Search GitHub for my commits today (user: myusername)\n2. List any issues I closed or PRs I merged\n3. Check if any of my monitored repos had new releases\n4. Format as a concise markdown summary with sections:\n   - 🔨 What I Did\n   - ✅ Completed\n   - 📌 Tomorrow\'s Focus (based on open issues assigned to me)\nSend to my Feishu channel.\n```\n\nThis creates a **hands-free daily standup summary** that your team can see.\n\n**Variations:**\n- Weekly report: summarize the full week\'s activity\n- Team digest: aggregate multiple team members\' activities\n- Client report: formatted professionally for external sharing',
      },
      {
        title: 'Website Monitoring',
        content: 'Use OpenClaw as a lightweight uptime monitor:\n\n**Quick setup in chat:**\n```\nMonitor these URLs every 5 minutes:\n- https://api.myapp.com/health\n- https://www.myapp.com\nAlert me on Telegram if any returns non-200 status or takes > 3 seconds.\n```\n\n**Or via Dashboard:** Settings → Automation → Heartbeat:\n- Add URLs to monitor\n- Set check interval (1 min → 24 hours)\n- Choose alert channel\n- Optionally check for specific response content\n\n**What gets monitored:**\n- HTTP status code (alert on non-2xx)\n- Response time (alert if slow)\n- SSL certificate expiry (alert 30 days before)\n- Content check (alert if specific text disappears)\n\nFor production-grade monitoring, pair with Prometheus/Grafana. But for personal projects and side hustles, OpenClaw monitoring is perfectly adequate.',
        tip: 'For production monitoring use dedicated tools like Prometheus/Grafana. OpenClaw is great for personal projects and supplementary checks.',
      },
    ],
    sectionsZh: [
      {
        title: '定时任务',
        content: '把第 5 天的早间简报变成自动化的每日任务：\n\n1. 前往 **设置 → 自动化 → 定时任务**\n2. 点击 **添加任务**\n3. 配置：\n   - **名称**："早间简报"\n   - **定时**：`0 9 * * *`（每天早上 9:00）\n   - **通道**：你的 Telegram/飞书通道\n   - **提示词**："给我一个早间简报：排名前 3 的科技新闻、上海天气、我的 GitHub 通知。保持简洁。"\n4. 点击 **保存并启用**\n\n现在每天早上 9 点，你的 AI 会主动发送简报消息。不需要任何交互。\n\n**更多定时示例：**\n- `0 9 * * 1-5` —— 仅工作日早上 9 点\n- `0 */2 * * *` —— 每 2 小时\n- `0 18 * * 5` —— 每周五下午 6 点',
        tip: '先在 设置 → 通用 中设置你的时区。Cron 默认使用服务器时区。',
      },
      {
        title: '主动提醒',
        content: 'OpenClaw 可以提醒你任何事情：\n\n**简单提醒：**\n```\n今天下午 2 点提醒我审查设计文档\n每周一上午 10 点提醒我提交周报\n```\n\n**条件告警（配合技能）：**\n```\n监控 ETH 价格。如果跌破 $2,500 就提醒我\n每 30 分钟检查一下 api.myapp.com 服务器。如果宕机了就告警\n监控我的 GitHub 仓库有没有标记为"urgent"的新 Issue —— 立即通知我\n```\n\n条件告警结合了**定时检查**和**技能操作** —— AI 定期执行检查，只在满足条件时通知你。\n\n**管理提醒：**\n- 查看全部：`/reminders`\n- 取消某个：`/cancel-reminder 3`\n- 暂停全部：`/pause-reminders`',
      },
      {
        title: '构建：每日工作报告自动化',
        content: '让我们构建一个实用的每日总结自动化。前往 **自动化 → 添加任务**：\n\n**名称：** "每日开发报告"\n**定时：** `0 18 * * 1-5`（工作日下午 6 点）\n**提示词：**\n```\n生成我的每日开发报告：\n1. 搜索 GitHub 中我今天的提交（用户名：myusername）\n2. 列出我今天关闭的 Issue 或合并的 PR\n3. 检查我关注的仓库是否有新版本发布\n4. 用简洁的 Markdown 格式总结，包含以下部分：\n   - 🔨 今天做了什么\n   - ✅ 已完成\n   - 📌 明天重点（基于分配给我的未关闭 Issue）\n发送到我的飞书通道。\n```\n\n这会创建一个**免手动的每日站会总结**，你的团队成员都能看到。\n\n**变体：**\n- 周报：总结一整周的活动\n- 团队摘要：聚合多个团队成员的活动\n- 客户报告：格式化成专业的对外分享格式',
      },
      {
        title: '网站监控',
        content: '用 OpenClaw 作为轻量级可用性监控：\n\n**在聊天中快速设置：**\n```\n每 5 分钟监控这些 URL：\n- https://api.myapp.com/health\n- https://www.myapp.com\n如果返回非 200 状态码或响应超过 3 秒，就在 Telegram 上告警。\n```\n\n**或通过管理面板：** 设置 → 自动化 → 心跳检查：\n- 添加要监控的 URL\n- 设置检查间隔（1 分钟 → 24 小时）\n- 选择告警通道\n- 可选检查特定响应内容\n\n**监控内容：**\n- HTTP 状态码（非 2xx 时告警）\n- 响应时间（过慢时告警）\n- SSL 证书过期（到期前 30 天告警）\n- 内容检查（特定文本消失时告警）\n\n生产级监控请搭配 Prometheus/Grafana。但对于个人项目和副业来说，OpenClaw 的监控功能完全够用。',
        tip: '生产环境监控请用 Prometheus/Grafana 等专业工具。OpenClaw 非常适合个人项目和辅助检查。',
      },
    ],
    relatedTutorialIds: ['4', '5', '6', '23'],
  },

  // ──────── Day 7: 进阶 —— 多智能体、浏览器控制与自定义技能 ────────
  {
    day: 7,
    slug: 'day-7',
    emoji: '🚀',
    color: 'from-indigo-500 to-indigo-600',
    duration: '~45 min',
    durationZh: '约 45 分钟',
    titleEn: 'Level Up — Multi-Agent, Browser & Custom Skills',
    titleZh: '进阶 —— 多智能体、浏览器控制与自定义技能',
    subtitleEn: 'Orchestrate multiple AI agents, automate browser tasks, and build your first custom skill from scratch.',
    subtitleZh: '编排多个 AI 智能体协同工作，自动化浏览器任务，从零构建你的第一个自定义技能。',
    deliverableEn: '✅ A custom skill published to ClawHub (even if just a hello-world), and hands-on experience with multi-agent and browser automation.',
    deliverableZh: '✅ 一个发布到 ClawHub 的自定义技能（哪怕只是 hello-world），以及多智能体和浏览器自动化的实操经验。',
    objectivesEn: [
      'Understand and configure multi-agent orchestration',
      'Use browser automation to interact with web pages',
      'Build a custom skill from scratch (with code)',
      'Publish your skill to ClawHub',
    ],
    objectivesZh: [
      '理解并配置多智能体协作',
      '使用浏览器自动化与网页交互',
      '从零编写一个自定义技能（带代码）',
      '将你的技能发布到 ClawHub',
    ],
    sectionsEn: [
      {
        title: 'Multi-Agent Orchestration',
        content: 'One AI is good. Multiple AIs working together is better.\n\nOpenClaw supports multi-agent mode where a **coordinator agent** breaks down tasks and delegates to **specialist agents**:\n\n**Example: Code Review Pipeline**\n```\nSet up a multi-agent code review:\n- Agent "Style": Check code formatting and naming conventions\n- Agent "Security": Scan for vulnerabilities and injection risks\n- Agent "Logic": Review business logic and edge cases\n- Coordinator: Compile all feedback into a single report\n```\n\n**Configuration:** Settings → Advanced → Multi-Agent\n- Define agent roles and their system prompts\n- Set coordination strategy (parallel, sequential, or hybrid)\n- Choose which LLM each agent uses (you can mix!)\n\n**Real-world use cases:**\n- Research pipeline: one agent searches, one summarizes, one fact-checks\n- Content creation: one writes, one edits, one creates images\n- DevOps: one monitors, one diagnoses, one fixes',
        tip: 'Start with 2 agents before going to 3+. More agents = higher latency and cost.',
      },
      {
        title: 'Browser Automation',
        content: 'Make your AI interact with real websites — fill forms, click buttons, extract data.\n\n**Install the browser skill:**\n```\n/install-skill browser-control\n```\n\n**Example tasks:**\n```\nGo to news.ycombinator.com, find today\'s top 5 posts about AI,\nand summarize each one in 2 sentences.\n```\n\n```\nLog into my dashboard at app.example.com (credentials in my secrets),\ndownload the monthly sales report PDF, and give me the key metrics.\n```\n\n```\nFill out the contact form at example.com/contact with:\nName: John Doe\nEmail: john@example.com\nMessage: "Requesting a product demo"\nThen submit it.\n```\n\n**How it works:** OpenClaw uses Playwright under the hood to control a real browser. The AI sees screenshots and DOM elements to navigate pages.\n\n**Limitations:**\n- CAPTCHAs will block automation\n- Some sites detect and block headless browsers\n- Complex SPAs may need custom navigation logic',
        tip: 'Browser automation requires more memory. Allocate at least 2GB RAM to your Docker container.',
      },
      {
        title: 'Build Your First Custom Skill',
        content: 'Let\'s create a simple but useful skill — a **random quote** generator:\n\n**1. Create the skill directory:**\n```bash\nmkdir -p ~/my-skills/random-quote\ncd ~/my-skills/random-quote\n```\n\n**2. Create manifest.json:**\n```json\n{\n  "name": "random-quote",\n  "version": "1.0.0",\n  "description": "Get an inspiring random quote",\n  "author": "your-username",\n  "permissions": ["web-request"],\n  "tools": [\n    {\n      "name": "get_random_quote",\n      "description": "Returns a random inspirational quote",\n      "parameters": {}\n    }\n  ]\n}\n```\n\n**3. Create index.js:**\n```javascript\nmodule.exports = {\n  async get_random_quote() {\n    const res = await fetch("https://api.quotable.io/random");\n    const data = await res.json();\n    return {\n      quote: data.content,\n      author: data.author,\n      formatted: `"${data.content}" — ${data.author}`\n    };\n  }\n};\n```\n\n**4. Install locally:**\n```bash\n/install-skill local:~/my-skills/random-quote\n```\n\n**5. Test it:**\n```\nGive me an inspiring quote\n```',
      },
      {
        title: 'Publish & Next Steps',
        content: '**Publish to ClawHub:**\n```bash\nnpm install -g clawhub-cli\nclawhub login\nclawhub publish ~/my-skills/random-quote\n```\n\nYour skill is now available for the entire OpenClaw community!\n\n**What to build next:**\n- A skill that integrates with your company\'s internal API\n- A Notion/Feishu doc summarizer\n- A price tracker for products you want\n- A translation helper for your specific domain\n\n---\n\n🎉 **Congratulations!** You\'ve completed the 7-Day OpenClaw Learning Path.\n\nYou now know how to:\n- ✅ Install and configure OpenClaw\n- ✅ Connect messaging platforms (Telegram, Feishu, WeChat)\n- ✅ Use AI for code generation and file operations\n- ✅ Install and combine skills for powerful workflows\n- ✅ Automate daily tasks and monitoring\n- ✅ Build and publish custom skills\n\n**Keep exploring:**\n- Browse 5,490+ skills on the [Skills page](/skills)\n- Read 414+ tutorials on the [Tutorials page](/tutorials)\n- Join the OpenClaw Discord community\n- Contribute to the open-source project on GitHub',
      },
    ],
    sectionsZh: [
      {
        title: '多智能体协作',
        content: '一个 AI 很好。多个 AI 协同工作更强大。\n\nOpenClaw 支持多智能体模式，由一个**协调者智能体**拆解任务，分配给**专家智能体**执行：\n\n**示例：代码审查流水线**\n```\n设置多智能体代码审查：\n- 智能体"Style"：检查代码格式和命名规范\n- 智能体"Security"：扫描漏洞和注入风险\n- 智能体"Logic"：审查业务逻辑和边界情况\n- 协调者：将所有反馈汇编成一份报告\n```\n\n**配置方法：** 设置 → 高级 → 多智能体\n- 定义智能体角色和系统提示词\n- 设置协作策略（并行、顺序或混合）\n- 选择每个智能体使用的 LLM（可以混搭！）\n\n**实际应用场景：**\n- 研究流水线：一个搜索、一个总结、一个验证\n- 内容创作：一个写作、一个编辑、一个配图\n- DevOps：一个监控、一个诊断、一个修复',
        tip: '先从 2 个智能体开始，再尝试 3 个以上。更多智能体 = 更高延迟和成本。',
      },
      {
        title: '浏览器自动化',
        content: '让你的 AI 与真实网站交互 —— 填表单、点按钮、提取数据。\n\n**安装浏览器技能：**\n```\n/install-skill browser-control\n```\n\n**示例任务：**\n```\n打开 news.ycombinator.com，找到今天关于 AI 的前 5 篇帖子，\n每篇用 2 句话总结。\n```\n\n```\n登录我的管理后台 app.example.com（凭证在密钥管理中），\n下载月度销售报告 PDF，告诉我关键指标。\n```\n\n```\n在 example.com/contact 填写联系表单：\n姓名：张三\n邮箱：zhangsan@example.com\n留言："希望了解产品演示"\n然后提交。\n```\n\n**工作原理：** OpenClaw 底层使用 Playwright 控制真实浏览器。AI 通过截图和 DOM 元素来导航页面。\n\n**局限性：**\n- 验证码会阻止自动化\n- 某些网站检测并阻止无头浏览器\n- 复杂的 SPA 可能需要自定义导航逻辑',
        tip: '浏览器自动化需要更多内存。给 Docker 容器分配至少 2GB RAM。',
      },
      {
        title: '构建你的第一个自定义技能',
        content: '让我们创建一个简单但实用的技能 —— **随机名言**生成器：\n\n**1. 创建技能目录：**\n```bash\nmkdir -p ~/my-skills/random-quote\ncd ~/my-skills/random-quote\n```\n\n**2. 创建 manifest.json：**\n```json\n{\n  "name": "random-quote",\n  "version": "1.0.0",\n  "description": "获取一条励志名言",\n  "author": "your-username",\n  "permissions": ["web-request"],\n  "tools": [\n    {\n      "name": "get_random_quote",\n      "description": "返回一条随机的励志名言",\n      "parameters": {}\n    }\n  ]\n}\n```\n\n**3. 创建 index.js：**\n```javascript\nmodule.exports = {\n  async get_random_quote() {\n    const res = await fetch("https://api.quotable.io/random");\n    const data = await res.json();\n    return {\n      quote: data.content,\n      author: data.author,\n      formatted: `"${data.content}" — ${data.author}`\n    };\n  }\n};\n```\n\n**4. 本地安装：**\n```bash\n/install-skill local:~/my-skills/random-quote\n```\n\n**5. 测试：**\n```\n给我一条励志名言\n```',
      },
      {
        title: '发布与下一步',
        content: '**发布到 ClawHub：**\n```bash\nnpm install -g clawhub-cli\nclawhub login\nclawhub publish ~/my-skills/random-quote\n```\n\n你的技能现在对整个 OpenClaw 社区可用了！\n\n**接下来可以构建：**\n- 一个与你公司内部 API 集成的技能\n- 一个 Notion/飞书文档总结器\n- 一个你想买的商品价格追踪器\n- 一个你专业领域的翻译助手\n\n---\n\n🎉 **恭喜！** 你已经完成了 7 天 OpenClaw 学习路径。\n\n你现在知道如何：\n- ✅ 安装和配置 OpenClaw\n- ✅ 连接消息平台（Telegram、飞书、微信）\n- ✅ 用 AI 生成代码和操作文件\n- ✅ 安装和组合技能构建强大的工作流\n- ✅ 自动化日常任务和监控\n- ✅ 构建和发布自定义技能\n\n**继续探索：**\n- 在[技能页面](/skills)浏览 5,490+ 技能\n- 在[教程页面](/tutorials)阅读 414+ 教程\n- 加入 OpenClaw Discord 社区\n- 在 GitHub 上为开源项目做贡献',
      },
    ],
    relatedTutorialIds: ['22', '23', '33', '34', '29'],
  },
];

export function getDayContent(day: number): DayContent | undefined {
  return sevenDays.find((d) => d.day === day);
}

export function getDayBySlug(slug: string): DayContent | undefined {
  return sevenDays.find((d) => d.slug === slug);
}
