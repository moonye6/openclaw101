export interface Tutorial {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
  language: string;
  icon?: string;
}

// 全部教程数据 — 与 openclaw101.dev 对标
export const tutorials: Tutorial[] = [
  // Official
  { id: '1', title: 'OpenClaw 官方文档', description: '完整的 API 参考、配置指南和架构说明', url: 'https://docs.openclaw.ai', source: 'OpenClaw', category: 'official', language: 'en' },
  { id: '2', title: 'GitHub — openclaw/openclaw', description: '源代码、Issue 跟踪和社区贡献指南 (314k+ ⭐)', url: 'https://github.com/openclaw/openclaw', source: 'GitHub', category: 'official', language: 'en' },
  { id: '3', title: 'ClawHub 技能市场', description: '发现、安装和分享 AI 技能插件', url: 'https://clawhub.com', source: 'ClawHub', category: 'official', language: 'en' },
  // Cloud Deploy
  { id: '4', title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', description: '轻量应用服务器一键部署，可视化配置面板接入钉钉', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', source: '阿里云', category: 'cloud-deploy', language: 'zh' },
  { id: '5', title: '腾讯云 — OpenClaw 接入飞书保姆级教程', description: 'Lighthouse 一键部署 + 飞书机器人全流程配置', url: 'https://cloud.tencent.com/developer/article/2625073', source: '腾讯云', category: 'cloud-deploy', language: 'zh' },
  { id: '6', title: 'DigitalOcean — One-Click Deploy OpenClaw', description: 'Learn how to deploy OpenClaw using DigitalOcean\'s 1-Click solution', url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw', source: 'DigitalOcean', category: 'cloud-deploy', language: 'en' },
  { id: '7', title: 'AMD Developer Cloud — OpenClaw + vLLM 免费运行指南', description: 'Run OpenClaw with vLLM for free on AMD Developer Cloud', url: 'https://www.amd.com/en/developer/resources/technical-articles/2026/openclaw-with-vllm-running-for-free-on-amd-developer-cloud-.html', source: 'AMD', category: 'cloud-deploy', language: 'en' },
  { id: '8', title: 'AWS 中国博客 — 基于 Mac 实例部署 OpenClaw', description: '在 AWS Mac 实例上部署 OpenClaw AI 助手', url: 'https://aws.amazon.com/cn/blogs/china/openclaw-deployment-aws-mac/', source: 'AWS', category: 'cloud-deploy', language: 'zh' },
  // Getting Started
  { id: '9', title: 'OpenClaw 下载安装使用 — 详细图文教程', description: '系统要求、多种安装方式对比、常见问题排查、Web/终端两种界面入门', url: 'https://apifox.com/apiskills/openclaw-installation-and-usage-guide/', source: 'Apifox', category: 'getting-started', language: 'zh' },
  { id: '10', title: '保姆级飞书对接教程 — 手把手搭建 AI 助手', description: 'Linux 下安装 OpenClaw 并对接飞书机器人，打造专属智能助理', url: 'https://www.cnblogs.com/catchadmin/p/19556552', source: '博客园', category: 'getting-started', language: 'zh' },
  { id: '11', title: 'freeCodeCamp — OpenClaw Full Tutorial for Beginners', description: '从被动聊天到主动 Agent 的转变，freeCodeCamp 出品的全面入门教程', url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/', source: 'freeCodeCamp', category: 'getting-started', language: 'en' },
  { id: '12', title: '菜鸟教程 — OpenClaw 完整教程', description: '面向初学者的完整 OpenClaw 教程，从零到一', url: 'https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html', source: '菜鸟教程', category: 'getting-started', language: 'zh' },
  { id: '13', title: '搬主题 — 一键安装部署超详细图文教程', description: '超详细的 OpenClaw 安装部署图文教程', url: 'https://www.banzhuti.com/openclaw-moltbot-clawdbot-tutorial.html', source: '搬主题', category: 'getting-started', language: 'zh' },
  { id: '14', title: 'DataCamp — OpenClaw Tutorial: Control Your PC from WhatsApp', description: 'Learn how to use OpenClaw to control your PC from WhatsApp', url: 'https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial', source: 'DataCamp', category: 'getting-started', language: 'en' },
  { id: '15', title: 'OpenClaw 7天入门指南 — 飞书知识库', description: '系统化的 7 天学习路径，从安装到进阶', url: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf', source: '飞书', category: 'getting-started', language: 'zh' },
  // Videos
  { id: '16', title: 'OpenClaw 海量全玩法攻略 — 国内网络使用 + 本地部署', description: 'B站详细视频教程，涵盖所有主要功能和配置', url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/', source: 'Bilibili', category: 'videos', language: 'zh' },
  { id: '17', title: 'YouTube — Full OpenClaw Setup Tutorial: Step-by-Step Walkthrough', description: 'Complete video walkthrough for installing and configuring OpenClaw', url: 'https://www.youtube.com/watch?v=fcZMmP5dsl4', source: 'YouTube', category: 'videos', language: 'en' },
  { id: '18', title: '超详细的最强AI部署教程，小白友好', description: '2026 年最新版部署教程，面向零基础用户的保姆级讲解', url: 'https://www.bilibili.com/video/BV1fMfZBuEMj/', source: 'Bilibili', category: 'videos', language: 'zh' },
  { id: '19', title: '本地部署接入微信/飞书/钉钉/QQ 10分钟保姆级教程', description: '10分钟手把手教会，附完整操作文档，四大平台全覆盖', url: 'https://www.bilibili.com/video/BV1MfFAz6EnR/', source: 'Bilibili', category: 'videos', language: 'zh' },
  { id: '20', title: 'YouTube — OpenClaw Full Tutorial for Beginners', description: 'Comprehensive beginner tutorial covering all OpenClaw features', url: 'https://www.youtube.com/watch?v=n1sfrc-RjyM', source: 'YouTube', category: 'videos', language: 'en' },
  { id: '21', title: 'YouTube — Master OpenClaw in 30 Minutes', description: 'Fast-paced walkthrough to get productive with OpenClaw in 30 minutes', url: 'https://www.youtube.com/watch?v=xxx', source: 'YouTube', category: 'videos', language: 'en' },
  // Deep Dives
  { id: '22', title: 'IBM Think — OpenClaw: The Viral "Space Lobster" Agent', description: 'IBM 深度分析 OpenClaw 的架构创新和垂直集成策略', url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration', source: 'IBM', category: 'deep-dives', language: 'en' },
  { id: '23', title: 'DEV Community — Unleashing OpenClaw: Ultimate Guide for Developers', description: '开发者视角深度解析：Gateway 架构、Brain 模型层、自定义 Skill 编写', url: 'https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h', source: 'DEV Community', category: 'deep-dives', language: 'en' },
  { id: '24', title: 'Scientific American — OpenClaw is an open-source AI agent', description: 'This open-source agent installs software, makes calls and runs your digital life', url: 'https://www.scientificamerican.com/article/moltbot-is-an-open-source-ai-agent-that-runs-your-computer/', source: 'Scientific American', category: 'deep-dives', language: 'en' },
  { id: '25', title: 'The Verge — OpenClaw: all the news about the trending AI agent', description: 'Comprehensive news coverage of the trending AI agent', url: 'https://www.theverge.com/news/872091/openclaw-moltbot-clawdbot-ai-agent-news', source: 'The Verge', category: 'deep-dives', language: 'en' },
  { id: '26', title: '知乎 — 一文读懂 OpenClaw 分析与教程', description: '深度分析 OpenClaw 架构原理和使用技巧', url: 'https://zhuanlan.zhihu.com/p/2000850539936765122', source: '知乎', category: 'deep-dives', language: 'zh' },
  { id: '27', title: 'Turing College — The AI Assistant That Actually Does Things', description: 'In-depth analysis of how OpenClaw goes beyond chatbots', url: 'https://www.turingcollege.com/blog/openclaw', source: 'Turing College', category: 'deep-dives', language: 'en' },
  { id: '28', title: '飞书官方 — 一文完全搞懂 Clawd Bot 附飞书对接指南', description: '飞书官方出品的 OpenClaw + 飞书深度集成指南', url: 'https://www.feishu.cn/content/article/7602519239445974205', source: '飞书', category: 'deep-dives', language: 'zh' },
  { id: '29', title: 'Clawctl Blog — OpenClaw + 本地 LLM 完全指南', description: 'Complete guide to running OpenClaw with local LLMs', url: 'https://clawctl.com/blog/openclaw-local-llm-complete-guide', source: 'Clawctl', category: 'deep-dives', language: 'en' },
  // Security
  { id: '30', title: 'The Hacker News — 341 个恶意 ClawHub 技能窃取用户数据', description: 'Researchers discover 341 malicious ClawHub skills stealing user data', url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html', source: 'The Hacker News', category: 'deep-dives', language: 'en' },
  { id: '31', title: 'Cisco — Personal AI Agents like OpenClaw Are a Security Nightmare', description: 'Security analysis of personal AI agents and their attack surfaces', url: 'https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare', source: 'Cisco', category: 'deep-dives', language: 'en' },
  { id: '32', title: 'Adversa AI — OpenClaw Security 101: CVEs & Hardening', description: 'Comprehensive security vulnerabilities analysis and hardening guide', url: 'https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/', source: 'Adversa AI', category: 'deep-dives', language: 'en' },
  // Skills
  { id: '33', title: 'ClawHub 技能开发文档', description: '如何创建、发布和管理自定义技能', url: 'https://docs.openclaw.ai/tools/clawhub', source: 'OpenClaw Docs', category: 'skills', language: 'en' },
  { id: '34', title: 'Awesome OpenClaw Skills — 社区精选技能合集', description: 'Community-curated list of the best OpenClaw skills', url: 'https://github.com/VoltAgent/awesome-openclaw-skills', source: 'GitHub', category: 'skills', language: 'en' },
  // Tools
  { id: '35', title: 'OpenClaw 汉化版 — CLI + Dashboard 全中文', description: '每小时自动同步官方仓库，含完整中文 README、全流程搭建教程和排错指南', url: 'https://github.com/1186258278/OpenClawChineseTranslation', source: 'GitHub', category: 'tools', language: 'zh' },
];

export const tutorialCategories = [
  { id: 'official', name: 'Official', nameZh: '官方文档', color: 'bg-blue-500' },
  { id: 'cloud-deploy', name: 'Cloud Deploy', nameZh: '云部署', color: 'bg-cyan-500' },
  { id: 'getting-started', name: 'Getting Started', nameZh: '入门教程', color: 'bg-green-500' },
  { id: 'channels', name: 'Channels', nameZh: '通道配置', color: 'bg-purple-500' },
  { id: 'skills', name: 'Skills', nameZh: '技能开发', color: 'bg-orange-500' },
  { id: 'videos', name: 'Videos', nameZh: '视频教程', color: 'bg-red-500' },
  { id: 'deep-dives', name: 'Deep Dives', nameZh: '深度分析', color: 'bg-indigo-500' },
  { id: 'tools', name: 'Tools', nameZh: '工具使用', color: 'bg-yellow-500' },
] as const;

export function getTutorialById(id: string): Tutorial | undefined {
  return tutorials.find((t) => t.id === id);
}

export function getTutorialsByCategory(category: string): Tutorial[] {
  return tutorials.filter((t) => t.category === category);
}

export function getCategoryInfo(categoryId: string) {
  return tutorialCategories.find((c) => c.id === categoryId);
}
