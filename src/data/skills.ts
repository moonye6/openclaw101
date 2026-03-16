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

// 技能分类数据
export const skillCategories: SkillCategory[] = [
  { id: 'ai-llm', name: 'AI & LLMs', nameZh: 'AI & LLM', icon: '🧠', count: 159, description: 'Integrate with large language models like GPT, Claude, Gemini, and local LLMs. AI-powered generation, summarization, and analysis tools.', descriptionZh: '集成 GPT、Claude、Gemini 等大语言模型及本地 LLM。AI 驱动的生成、摘要和分析工具。' },
  { id: 'research', name: 'Search & Research', nameZh: '搜索与研究', icon: '🔍', count: 148, description: 'Web search, academic research, news aggregation, and information retrieval skills. Stay informed with real-time data.', descriptionZh: '网络搜索、学术研究、新闻聚合和信息检索技能。实时获取最新数据。' },
  { id: 'devops', name: 'DevOps & Cloud', nameZh: 'DevOps & 云', icon: '☁️', count: 144, description: 'Cloud deployment, container management, CI/CD pipelines, monitoring, and infrastructure automation skills.', descriptionZh: '云部署、容器管理、CI/CD 流水线、监控和基础设施自动化技能。' },
  { id: 'marketing', name: 'Marketing & Sales', nameZh: '营销与销售', icon: '📈', count: 94, description: 'SEO analysis, social media management, email campaigns, lead generation, and CRM integration skills.', descriptionZh: 'SEO 分析、社交媒体管理、邮件营销、线索生成和 CRM 集成技能。' },
  { id: 'coding', name: 'Coding Agents', nameZh: '编程代理', icon: '🤖', count: 55, description: 'Delegate coding tasks to AI agents. GitHub operations, code review, testing, and development workflow automation.', descriptionZh: '将编程任务委托给 AI 代理。GitHub 操作、代码审查、测试和开发工作流自动化。' },
  { id: 'communication', name: 'Communication', nameZh: '通讯', icon: '💬', count: 58, description: 'Messaging platform integrations, email management, notification systems, and team collaboration tools.', descriptionZh: '消息平台集成、邮件管理、通知系统和团队协作工具。' },
  { id: 'notes', name: 'Notes & PKM', nameZh: '笔记与知识管理', icon: '📝', count: 61, description: 'Personal knowledge management, note-taking, bookmarking, and knowledge base integration skills.', descriptionZh: '个人知识管理、笔记记录、书签和知识库集成技能。' },
  { id: 'web', name: 'Web & Frontend', nameZh: 'Web 与前端', icon: '🌐', count: 46, description: 'Browser automation, web scraping, frontend development tools, and website monitoring skills.', descriptionZh: '浏览器自动化、网页抓取、前端开发工具和网站监控技能。' },
  { id: 'smarthome', name: 'Smart Home & IoT', nameZh: '智能家居', icon: '🏠', count: 50, description: 'Home Assistant integration, IoT device control, smart lighting, climate, and security automation.', descriptionZh: 'Home Assistant 集成、物联网设备控制、智能照明、温控和安防自动化。' },
  { id: 'speech', name: 'Speech & Audio', nameZh: '语音与音频', icon: '🗣️', count: 44, description: 'Text-to-speech, speech recognition, audio processing, podcast management, and voice assistant skills.', descriptionZh: '文本转语音、语音识别、音频处理、播客管理和语音助手技能。' },
  { id: 'health', name: 'Health & Fitness', nameZh: '健康与健身', icon: '🏋️', count: 35, description: 'Health tracking, workout planning, nutrition analysis, meditation guides, and wellness automation.', descriptionZh: '健康追踪、锻炼计划、营养分析、冥想指导和健康自动化。' },
  { id: 'gaming', name: 'Gaming', nameZh: '游戏', icon: '🎮', count: 7, description: 'Game server management, game data queries, achievement tracking, and gaming community integration.', descriptionZh: '游戏服务器管理、游戏数据查询、成就追踪和游戏社区集成。' },
];

// 示例技能数据
export const sampleSkills: Skill[] = [
  {
    id: '1',
    name: 'github',
    description: 'GitHub operations via gh CLI: issues, PRs, CI runs, code review, API queries',
    categoryId: 'coding',
    installCommand: 'npx clawhub@latest install github',
    githubUrl: 'https://github.com/openclaw/skills/tree/main/github',
    stars: 1250,
  },
  {
    id: '2',
    name: 'weather',
    description: 'Get current weather and forecasts via wttr.in or Open-Meteo',
    categoryId: 'research',
    installCommand: 'npx clawhub@latest install weather',
    stars: 890,
  },
  {
    id: '3',
    name: 'gemini',
    description: 'Gemini CLI for one-shot Q&A, summaries, and generation',
    categoryId: 'ai-llm',
    installCommand: 'npx clawhub@latest install gemini',
    stars: 756,
  },
  {
    id: '4',
    name: 'tmux',
    description: 'Remote-control tmux sessions for interactive CLIs',
    categoryId: 'devops',
    installCommand: 'npx clawhub@latest install tmux',
    stars: 623,
  },
  {
    id: '5',
    name: 'web-search',
    description: 'Search the web using Brave Search API',
    categoryId: 'research',
    installCommand: 'npx clawhub@latest install web-search',
    stars: 534,
  },
  {
    id: '6',
    name: 'healthcheck',
    description: 'Host security hardening and risk-tolerance configuration',
    categoryId: 'devops',
    installCommand: 'npx clawhub@latest install healthcheck',
    stars: 412,
  },
  {
    id: '7',
    name: 'browser',
    description: 'Control web browser via Playwright automation',
    categoryId: 'web',
    installCommand: 'npx clawhub@latest install browser',
    stars: 567,
  },
  {
    id: '8',
    name: 'coding-agent',
    description: 'Delegate coding tasks to Codex, Claude Code, or Pi agents',
    categoryId: 'coding',
    installCommand: 'npx clawhub@latest install coding-agent',
    stars: 1102,
  },
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
