export interface SkillCategory {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  count: number;
  description?: string;
  descriptionZh?: string;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  installCommand: string;
  githubUrl?: string;
  stars: number;
}

// 技能分类数据 — count 字段反映下方 sampleSkills 中的实际数量
export const skillCategories: SkillCategory[] = [
  { id: 'ai-llm', name: 'AI & LLMs', nameZh: 'AI & LLM', icon: '🧠', count: 8, description: 'Integrate with large language models like GPT, Claude, Gemini, and local LLMs. AI-powered generation, summarization, and analysis tools.', descriptionZh: '集成 GPT、Claude、Gemini 等大语言模型及本地 LLM。AI 驱动的生成、摘要和分析工具。' },
  { id: 'research', name: 'Search & Research', nameZh: '搜索与研究', icon: '🔍', count: 7, description: 'Web search, academic research, news aggregation, and information retrieval skills. Stay informed with real-time data.', descriptionZh: '网络搜索、学术研究、新闻聚合和信息检索技能。实时获取最新数据。' },
  { id: 'devops', name: 'DevOps & Cloud', nameZh: 'DevOps & 云', icon: '☁️', count: 7, description: 'Cloud deployment, container management, CI/CD pipelines, monitoring, and infrastructure automation skills.', descriptionZh: '云部署、容器管理、CI/CD 流水线、监控和基础设施自动化技能。' },
  { id: 'marketing', name: 'Marketing & Sales', nameZh: '营销与销售', icon: '📈', count: 6, description: 'SEO analysis, social media management, email campaigns, lead generation, and CRM integration skills.', descriptionZh: 'SEO 分析、社交媒体管理、邮件营销、线索生成和 CRM 集成技能。' },
  { id: 'coding', name: 'Coding Agents', nameZh: '编程代理', icon: '🤖', count: 7, description: 'Delegate coding tasks to AI agents. GitHub operations, code review, testing, and development workflow automation.', descriptionZh: '将编程任务委托给 AI 代理。GitHub 操作、代码审查、测试和开发工作流自动化。' },
  { id: 'communication', name: 'Communication', nameZh: '通讯', icon: '💬', count: 6, description: 'Messaging platform integrations, email management, notification systems, and team collaboration tools.', descriptionZh: '消息平台集成、邮件管理、通知系统和团队协作工具。' },
  { id: 'notes', name: 'Notes & PKM', nameZh: '笔记与知识管理', icon: '📝', count: 6, description: 'Personal knowledge management, note-taking, bookmarking, and knowledge base integration skills.', descriptionZh: '个人知识管理、笔记记录、书签和知识库集成技能。' },
  { id: 'web', name: 'Web & Frontend', nameZh: 'Web 与前端', icon: '🌐', count: 6, description: 'Browser automation, web scraping, frontend development tools, and website monitoring skills.', descriptionZh: '浏览器自动化、网页抓取、前端开发工具和网站监控技能。' },
  { id: 'smarthome', name: 'Smart Home & IoT', nameZh: '智能家居', icon: '🏠', count: 5, description: 'Home Assistant integration, IoT device control, smart lighting, climate, and security automation.', descriptionZh: 'Home Assistant 集成、物联网设备控制、智能照明、温控和安防自动化。' },
  { id: 'speech', name: 'Speech & Audio', nameZh: '语音与音频', icon: '🗣️', count: 5, description: 'Text-to-speech, speech recognition, audio processing, podcast management, and voice assistant skills.', descriptionZh: '文本转语音、语音识别、音频处理、播客管理和语音助手技能。' },
  { id: 'health', name: 'Health & Fitness', nameZh: '健康与健身', icon: '🏋️', count: 5, description: 'Health tracking, workout planning, nutrition analysis, meditation guides, and wellness automation.', descriptionZh: '健康追踪、锻炼计划、营养分析、冥想指导和健康自动化。' },
  { id: 'gaming', name: 'Gaming', nameZh: '游戏', icon: '🎮', count: 4, description: 'Game server management, game data queries, achievement tracking, and gaming community integration.', descriptionZh: '游戏服务器管理、游戏数据查询、成就追踪和游戏社区集成。' },
];

// 技能数据 — 每个分类均有实际条目
export const sampleSkills: Skill[] = [
  // ── AI & LLMs (8) ──
  { id: '1', name: 'gemini', description: 'Gemini CLI for one-shot Q&A, summaries, and generation', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install gemini', stars: 756 },
  { id: '2', name: 'ollama', description: 'Run local LLMs via Ollama — Llama 3, Mistral, Phi, Qwen, etc.', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install ollama', stars: 1340 },
  { id: '3', name: 'openai', description: 'OpenAI GPT-4o / o1 / DALL·E integration for generation and analysis', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install openai', stars: 1580 },
  { id: '4', name: 'claude', description: 'Anthropic Claude integration for reasoning-heavy tasks', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install claude', stars: 920 },
  { id: '5', name: 'deepseek', description: 'DeepSeek V3/R1 API for code generation and mathematical reasoning', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install deepseek', stars: 680 },
  { id: '6', name: 'summarizer', description: 'AI-powered text summarization — articles, PDFs, and web pages', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install summarizer', stars: 445 },
  { id: '7', name: 'translator', description: 'Multi-language translation powered by LLMs with context awareness', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install translator', stars: 390 },
  { id: '8', name: 'image-gen', description: 'Generate images via Stable Diffusion, DALL·E, or Midjourney API', categoryId: 'ai-llm', installCommand: 'npx clawhub@latest install image-gen', stars: 510 },

  // ── Search & Research (7) ──
  { id: '9', name: 'web-search', description: 'Search the web using Brave Search API', categoryId: 'research', installCommand: 'npx clawhub@latest install web-search', stars: 534 },
  { id: '10', name: 'weather', description: 'Get current weather and forecasts via wttr.in or Open-Meteo', categoryId: 'research', installCommand: 'npx clawhub@latest install weather', stars: 890 },
  { id: '11', name: 'arxiv', description: 'Search and summarize academic papers from arXiv', categoryId: 'research', installCommand: 'npx clawhub@latest install arxiv', stars: 320 },
  { id: '12', name: 'news', description: 'Aggregate news from RSS feeds, Hacker News, and Google News', categoryId: 'research', installCommand: 'npx clawhub@latest install news', stars: 410 },
  { id: '13', name: 'wikipedia', description: 'Query and summarize Wikipedia articles in any language', categoryId: 'research', installCommand: 'npx clawhub@latest install wikipedia', stars: 275 },
  { id: '14', name: 'stock', description: 'Real-time stock quotes, financial data, and market analysis', categoryId: 'research', installCommand: 'npx clawhub@latest install stock', stars: 360 },
  { id: '15', name: 'scholar', description: 'Search Google Scholar for academic citations and references', categoryId: 'research', installCommand: 'npx clawhub@latest install scholar', stars: 245 },

  // ── DevOps & Cloud (7) ──
  { id: '16', name: 'tmux', description: 'Remote-control tmux sessions for interactive CLIs', categoryId: 'devops', installCommand: 'npx clawhub@latest install tmux', stars: 623 },
  { id: '17', name: 'healthcheck', description: 'Host security hardening and risk-tolerance configuration', categoryId: 'devops', installCommand: 'npx clawhub@latest install healthcheck', stars: 412 },
  { id: '18', name: 'docker', description: 'Manage Docker containers, images, and compose stacks', categoryId: 'devops', installCommand: 'npx clawhub@latest install docker', stars: 780 },
  { id: '19', name: 'k8s', description: 'Kubernetes cluster management — pods, deployments, services', categoryId: 'devops', installCommand: 'npx clawhub@latest install k8s', stars: 560 },
  { id: '20', name: 'ssh', description: 'Secure remote server access and command execution via SSH', categoryId: 'devops', installCommand: 'npx clawhub@latest install ssh', stars: 490 },
  { id: '21', name: 'ci-monitor', description: 'Monitor GitHub Actions, GitLab CI, and Jenkins pipelines', categoryId: 'devops', installCommand: 'npx clawhub@latest install ci-monitor', stars: 310 },
  { id: '22', name: 'terraform', description: 'Infrastructure-as-Code management with Terraform / OpenTofu', categoryId: 'devops', installCommand: 'npx clawhub@latest install terraform', stars: 285 },

  // ── Marketing & Sales (6) ──
  { id: '23', name: 'seo-analyzer', description: 'Analyze page SEO score, meta tags, structured data, and Core Web Vitals', categoryId: 'marketing', installCommand: 'npx clawhub@latest install seo-analyzer', stars: 340 },
  { id: '24', name: 'social-poster', description: 'Schedule and publish posts to Twitter/X, LinkedIn, and Facebook', categoryId: 'marketing', installCommand: 'npx clawhub@latest install social-poster', stars: 290 },
  { id: '25', name: 'email-campaign', description: 'Create and send email campaigns via Mailchimp or Resend', categoryId: 'marketing', installCommand: 'npx clawhub@latest install email-campaign', stars: 215 },
  { id: '26', name: 'analytics', description: 'Query Google Analytics and Plausible data for traffic insights', categoryId: 'marketing', installCommand: 'npx clawhub@latest install analytics', stars: 260 },
  { id: '27', name: 'copywriter', description: 'AI-powered ad copy, landing page text, and slogan generation', categoryId: 'marketing', installCommand: 'npx clawhub@latest install copywriter', stars: 380 },
  { id: '28', name: 'crm', description: 'Manage leads and contacts in HubSpot, Salesforce, or Notion CRM', categoryId: 'marketing', installCommand: 'npx clawhub@latest install crm', stars: 195 },

  // ── Coding Agents (7) ──
  { id: '29', name: 'github', description: 'GitHub operations via gh CLI: issues, PRs, CI runs, code review, API queries', categoryId: 'coding', installCommand: 'npx clawhub@latest install github', githubUrl: 'https://github.com/openclaw/skills/tree/main/github', stars: 1250 },
  { id: '30', name: 'coding-agent', description: 'Delegate coding tasks to Codex, Claude Code, or Pi agents', categoryId: 'coding', installCommand: 'npx clawhub@latest install coding-agent', stars: 1102 },
  { id: '31', name: 'test-runner', description: 'Run unit/integration tests and report results (Jest, Vitest, pytest)', categoryId: 'coding', installCommand: 'npx clawhub@latest install test-runner', stars: 420 },
  { id: '32', name: 'code-review', description: 'Automated code review with style, security, and performance checks', categoryId: 'coding', installCommand: 'npx clawhub@latest install code-review', stars: 530 },
  { id: '33', name: 'refactor', description: 'AI-assisted code refactoring with safety analysis', categoryId: 'coding', installCommand: 'npx clawhub@latest install refactor', stars: 310 },
  { id: '34', name: 'git-helper', description: 'Git workflow automation — smart commits, branch management, conflict resolution', categoryId: 'coding', installCommand: 'npx clawhub@latest install git-helper', stars: 380 },
  { id: '35', name: 'db-query', description: 'Natural language to SQL — query PostgreSQL, MySQL, and SQLite', categoryId: 'coding', installCommand: 'npx clawhub@latest install db-query', stars: 460 },

  // ── Communication (6) ──
  { id: '36', name: 'telegram', description: 'Send and receive Telegram messages, manage groups and bots', categoryId: 'communication', installCommand: 'npx clawhub@latest install telegram', stars: 720 },
  { id: '37', name: 'discord', description: 'Discord bot integration — messages, embeds, slash commands', categoryId: 'communication', installCommand: 'npx clawhub@latest install discord', stars: 650 },
  { id: '38', name: 'slack', description: 'Slack workspace integration — messages, channels, workflows', categoryId: 'communication', installCommand: 'npx clawhub@latest install slack', stars: 580 },
  { id: '39', name: 'email', description: 'Send, read, and manage emails via IMAP/SMTP or Gmail API', categoryId: 'communication', installCommand: 'npx clawhub@latest install email', stars: 490 },
  { id: '40', name: 'feishu', description: '飞书/Lark messaging, document, and calendar integration', categoryId: 'communication', installCommand: 'npx clawhub@latest install feishu', stars: 350 },
  { id: '41', name: 'dingtalk', description: '钉钉 DingTalk robot messaging and workflow automation', categoryId: 'communication', installCommand: 'npx clawhub@latest install dingtalk', stars: 280 },

  // ── Notes & PKM (6) ──
  { id: '42', name: 'obsidian', description: 'Read, write, and search Obsidian vault notes and backlinks', categoryId: 'notes', installCommand: 'npx clawhub@latest install obsidian', stars: 680 },
  { id: '43', name: 'notion', description: 'Notion pages, databases, and workspace management', categoryId: 'notes', installCommand: 'npx clawhub@latest install notion', stars: 590 },
  { id: '44', name: 'logseq', description: 'Logseq graph queries, journal entries, and block management', categoryId: 'notes', installCommand: 'npx clawhub@latest install logseq', stars: 320 },
  { id: '45', name: 'readwise', description: 'Access Readwise highlights, books, and articles', categoryId: 'notes', installCommand: 'npx clawhub@latest install readwise', stars: 245 },
  { id: '46', name: 'bookmark', description: 'Save, tag, and search web bookmarks with AI categorization', categoryId: 'notes', installCommand: 'npx clawhub@latest install bookmark', stars: 210 },
  { id: '47', name: 'anki', description: 'Create and review Anki flashcards via AI-generated Q&A pairs', categoryId: 'notes', installCommand: 'npx clawhub@latest install anki', stars: 190 },

  // ── Web & Frontend (6) ──
  { id: '48', name: 'browser', description: 'Control web browser via Playwright automation', categoryId: 'web', installCommand: 'npx clawhub@latest install browser', stars: 567 },
  { id: '49', name: 'scraper', description: 'Extract structured data from web pages with CSS/XPath selectors', categoryId: 'web', installCommand: 'npx clawhub@latest install scraper', stars: 430 },
  { id: '50', name: 'lighthouse', description: 'Run Lighthouse audits for performance, accessibility, and SEO', categoryId: 'web', installCommand: 'npx clawhub@latest install lighthouse', stars: 310 },
  { id: '51', name: 'screenshot', description: 'Capture full-page or element screenshots of any URL', categoryId: 'web', installCommand: 'npx clawhub@latest install screenshot', stars: 260 },
  { id: '52', name: 'uptime', description: 'Monitor website uptime and get notified on downtime', categoryId: 'web', installCommand: 'npx clawhub@latest install uptime', stars: 220 },
  { id: '53', name: 'api-tester', description: 'Test REST and GraphQL APIs with automated request/response validation', categoryId: 'web', installCommand: 'npx clawhub@latest install api-tester', stars: 280 },

  // ── Smart Home & IoT (5) ──
  { id: '54', name: 'homeassistant', description: 'Control Home Assistant devices — lights, climate, sensors, automations', categoryId: 'smarthome', installCommand: 'npx clawhub@latest install homeassistant', stars: 540 },
  { id: '55', name: 'mqtt', description: 'Publish and subscribe to MQTT topics for IoT messaging', categoryId: 'smarthome', installCommand: 'npx clawhub@latest install mqtt', stars: 290 },
  { id: '56', name: 'smart-light', description: 'Control Philips Hue, LIFX, and Yeelight smart bulbs', categoryId: 'smarthome', installCommand: 'npx clawhub@latest install smart-light', stars: 210 },
  { id: '57', name: 'thermostat', description: 'Smart thermostat control — Nest, Ecobee, and generic HVAC', categoryId: 'smarthome', installCommand: 'npx clawhub@latest install thermostat', stars: 175 },
  { id: '58', name: 'camera', description: 'View and manage IP camera feeds and motion detection alerts', categoryId: 'smarthome', installCommand: 'npx clawhub@latest install camera', stars: 160 },

  // ── Speech & Audio (5) ──
  { id: '59', name: 'tts', description: 'Text-to-speech with OpenAI TTS, Edge TTS, or local models', categoryId: 'speech', installCommand: 'npx clawhub@latest install tts', stars: 450 },
  { id: '60', name: 'whisper', description: 'Speech-to-text transcription via OpenAI Whisper', categoryId: 'speech', installCommand: 'npx clawhub@latest install whisper', stars: 620 },
  { id: '61', name: 'podcast', description: 'Download, transcribe, and summarize podcast episodes', categoryId: 'speech', installCommand: 'npx clawhub@latest install podcast', stars: 280 },
  { id: '62', name: 'music-gen', description: 'Generate background music and audio with AI models', categoryId: 'speech', installCommand: 'npx clawhub@latest install music-gen', stars: 195 },
  { id: '63', name: 'voice-clone', description: 'Clone and synthesize voices for personalized TTS output', categoryId: 'speech', installCommand: 'npx clawhub@latest install voice-clone', stars: 310 },

  // ── Health & Fitness (5) ──
  { id: '64', name: 'workout', description: 'Generate personalized workout plans based on goals and equipment', categoryId: 'health', installCommand: 'npx clawhub@latest install workout', stars: 230 },
  { id: '65', name: 'nutrition', description: 'Track calories, macros, and get meal suggestions', categoryId: 'health', installCommand: 'npx clawhub@latest install nutrition', stars: 195 },
  { id: '66', name: 'sleep-tracker', description: 'Analyze sleep patterns and provide improvement suggestions', categoryId: 'health', installCommand: 'npx clawhub@latest install sleep-tracker', stars: 150 },
  { id: '67', name: 'meditation', description: 'Guided meditation sessions with timer and breathing exercises', categoryId: 'health', installCommand: 'npx clawhub@latest install meditation', stars: 180 },
  { id: '68', name: 'pomodoro', description: 'Pomodoro timer with task tracking and productivity stats', categoryId: 'health', installCommand: 'npx clawhub@latest install pomodoro', stars: 260 },

  // ── Gaming (4) ──
  { id: '69', name: 'mc-server', description: 'Manage Minecraft servers — start, stop, backup, player management', categoryId: 'gaming', installCommand: 'npx clawhub@latest install mc-server', stars: 340 },
  { id: '70', name: 'steam', description: 'Query Steam game library, achievements, and store deals', categoryId: 'gaming', installCommand: 'npx clawhub@latest install steam', stars: 280 },
  { id: '71', name: 'game-wiki', description: 'Search game wikis and guides for walkthroughs and tips', categoryId: 'gaming', installCommand: 'npx clawhub@latest install game-wiki', stars: 190 },
  { id: '72', name: 'dice-roller', description: 'Dice roller and character sheet manager for TTRPG sessions', categoryId: 'gaming', installCommand: 'npx clawhub@latest install dice-roller', stars: 150 },
];

export function getCategoryById(id: string): SkillCategory | undefined {
  return skillCategories.find((c) => c.id === id);
}

export function getSkillsByCategory(categoryId: string): Skill[] {
  return sampleSkills.filter((s) => s.categoryId === categoryId);
}

export function getSkillById(id: string): Skill | undefined {
  return sampleSkills.find((s) => s.id === id);
}
