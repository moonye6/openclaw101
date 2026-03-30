import { NextResponse } from 'next/server';

// 对标网站教程数据
const REFERENCE_TUTORIALS = [
  // Official
  { title: 'OpenClaw 官方文档', url: 'https://docs.openclaw.ai', source: 'OpenClaw', category: 'official', language: 'en' },
  { title: 'GitHub — openclaw/openclaw', url: 'https://github.com/openclaw/openclaw', source: 'GitHub', category: 'official', language: 'en' },
  { title: 'ClawHub 技能市场', url: 'https://clawhub.com', source: 'ClawHub', category: 'official', language: 'en' },
  
  // Cloud Deploy
  { title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理', url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw', source: '阿里云', category: 'cloud-deploy', language: 'zh' },
  { title: '腾讯云 — OpenClaw 接入飞书保姆级教程', url: 'https://cloud.tencent.com/developer/article/2625073', source: '腾讯云', category: 'cloud-deploy', language: 'zh' },
  { title: 'DigitalOcean — One-Click Deploy OpenClaw', url: 'https://www.digitalocean.com/community/tutorials/how-to-run-openclaw', source: 'DigitalOcean', category: 'cloud-deploy', language: 'en' },
  { title: 'AMD Developer Cloud — OpenClaw + vLLM 免费运行指南', url: 'https://www.amd.com/en/developer/resources/technical-articles/2026/openclaw-with-vllm-running-for-free-on-amd-developer-cloud-.html', source: 'AMD', category: 'cloud-deploy', language: 'en' },
  { title: 'AWS 中国博客 — 基于 Mac 实例部署 OpenClaw', url: 'https://aws.amazon.com/cn/blogs/china/openclaw-deployment-aws-mac/', source: 'AWS', category: 'cloud-deploy', language: 'zh' },
  
  // Getting Started
  { title: 'OpenClaw 下载安装使用 — 详细图文教程', url: 'https://apifox.com/apiskills/openclaw-installation-and-usage-guide/', source: 'Apifox', category: 'getting-started', language: 'zh' },
  { title: '保姆级飞书对接教程 — 手把手搭建 AI 助手', url: 'https://www.cnblogs.com/catchadmin/p/19556552', source: '博客园', category: 'getting-started', language: 'zh' },
  { title: 'freeCodeCamp — OpenClaw Full Tutorial for Beginners', url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/', source: 'freeCodeCamp', category: 'getting-started', language: 'en' },
  { title: '菜鸟教程 — OpenClaw 完整教程', url: 'https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html', source: '菜鸟教程', category: 'getting-started', language: 'zh' },
  { title: '搬主题 — 一键安装部署超详细图文教程', url: 'https://www.banzhuti.com/openclaw-moltbot-clawdbot-tutorial.html', source: '搬主题', category: 'getting-started', language: 'zh' },
  { title: 'DataCamp — OpenClaw Tutorial: Control Your PC from WhatsApp', url: 'https://www.datacamp.com/tutorial/moltbot-clawdbot-tutorial', source: 'DataCamp', category: 'getting-started', language: 'en' },
  
  // Videos
  { title: 'OpenClaw 海量全玩法攻略 — 国内网络使用 + 本地部署', url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/', source: 'Bilibili', category: 'videos', language: 'zh' },
  { title: 'YouTube — Full OpenClaw Setup Tutorial', url: 'https://www.youtube.com/watch?v=fcZMmP5dsl4', source: 'YouTube', category: 'videos', language: 'en' },
  { title: '超详细的最强AI部署教程，小白友好', url: 'https://www.bilibili.com/video/BV1fMfZBuEMj/', source: 'Bilibili', category: 'videos', language: 'zh' },
  { title: '本地部署接入微信/飞书/钉钉/QQ 10分钟保姆级教程', url: 'https://www.bilibili.com/video/BV1MfFAz6EnR/', source: 'Bilibili', category: 'videos', language: 'zh' },
  { title: 'YouTube — OpenClaw Full Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=n1sfrc-RjyM', source: 'YouTube', category: 'videos', language: 'en' },
  { title: 'YouTube — Master OpenClaw in 30 Minutes', url: 'https://www.youtube.com/watch?v=xxx', source: 'YouTube', category: 'videos', language: 'en' },
  
  // Deep Dives
  { title: 'IBM Think — OpenClaw: The Viral "Space Lobster" Agent', url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration', source: 'IBM', category: 'deep-dives', language: 'en' },
  { title: 'DEV Community — Unleashing OpenClaw: Ultimate Guide for Developers', url: 'https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h', source: 'DEV Community', category: 'deep-dives', language: 'en' },
  { title: 'Scientific American — OpenClaw is an open-source AI agent that runs your computer', url: 'https://www.scientificamerican.com/article/moltbot-is-an-open-source-ai-agent-that-runs-your-computer/', source: 'Scientific American', category: 'deep-dives', language: 'en' },
  { title: 'The Verge — OpenClaw: all the news about the trending AI agent', url: 'https://www.theverge.com/news/872091/openclaw-moltbot-clawdbot-ai-agent-news', source: 'The Verge', category: 'deep-dives', language: 'en' },
  { title: '知乎 — 一文读懂 OpenClaw 分析与教程', url: 'https://zhuanlan.zhihu.com/p/2000850539936765122', source: '知乎', category: 'deep-dives', language: 'zh' },
  { title: 'Turing College — The AI Assistant That Actually Does Things', url: 'https://www.turingcollege.com/blog/openclaw', source: 'Turing College', category: 'deep-dives', language: 'en' },
  { title: '飞书官方 — 一文完全搞懂 Clawd Bot 附飞书对接指南', url: 'https://www.feishu.cn/content/article/7602519239445974205', source: '飞书', category: 'deep-dives', language: 'zh' },
  { title: 'Clawctl Blog — OpenClaw + 本地 LLM 完全指南', url: 'https://clawctl.com/blog/openclaw-local-llm-complete-guide', source: 'Clawctl', category: 'deep-dives', language: 'en' },
  
  // Security
  { title: 'The Hacker News — 341 个恶意 ClawHub 技能窃取用户数据', url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html', source: 'The Hacker News', category: 'deep-dives', language: 'en' },
  { title: 'Cisco Blogs — Personal AI Agents like OpenClaw Are a Security Nightmare', url: 'https://blogs.cisco.com/ai/personal-ai-agents-like-openclaw-are-a-security-nightmare', source: 'Cisco', category: 'deep-dives', language: 'en' },
  { title: 'ZDNet — From Clawdbot to OpenClaw: Nightmare Fuel for Security Pros', url: 'https://www.zdnet.com/article/clawdbot-moltbot-openclaw-security-nightmare/', source: 'ZDNet', category: 'deep-dives', language: 'en' },
  { title: 'Adversa AI — OpenClaw Security 101: CVEs, Moltbook Breach & Hardening', url: 'https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/', source: 'Adversa AI', category: 'deep-dives', language: 'en' },
  { title: 'CrowdStrike — 安全团队需要了解的 OpenClaw AI 超级代理', url: 'https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/', source: 'CrowdStrike', category: 'deep-dives', language: 'en' },
  { title: 'Snyk — From SKILL.md to Shell Access in Three Lines of Markdown', url: 'https://snyk.io/articles/skill-md-shell-access/', source: 'Snyk', category: 'deep-dives', language: 'en' },
  { title: 'The Hacker News — OpenClaw 集成 VirusTotal 扫描恶意 ClawHub 技能', url: 'https://thehackernews.com/2026/02/openclaw-integrates-virustotal-scanning.html', source: 'The Hacker News', category: 'deep-dives', language: 'en' },
  
  // Skills
  { title: 'ClawHub 技能开发文档', url: 'https://docs.openclaw.ai/tools/clawhub', source: 'OpenClaw Docs', category: 'skills', language: 'en' },
  { title: 'Awesome OpenClaw Skills — 社区精选技能合集', url: 'https://github.com/VoltAgent/awesome-openclaw-skills', source: 'GitHub', category: 'skills', language: 'en' },
  
  // Tools
  { title: 'OpenClaw 汉化版 — CLI + Dashboard 全中文', url: 'https://github.com/1186258278/OpenClawChineseTranslation', source: 'GitHub', category: 'tools', language: 'zh' },
  
  // Channels
  { title: 'OpenClaw 7天入门指南 — 飞书知识库', url: 'https://my.feishu.cn/wiki/YkWgwqSchi9xW3kEuZscAm0lnFf', source: '飞书', category: 'getting-started', language: 'zh' },
];

export async function GET() {
  // 统计数据
  const stats = {
    total: REFERENCE_TUTORIALS.length,
    byCategory: {} as Record<string, number>,
    byLanguage: { en: 0, zh: 0 },
  };
  
  for (const tutorial of REFERENCE_TUTORIALS) {
    stats.byCategory[tutorial.category] = (stats.byCategory[tutorial.category] || 0) + 1;
    stats.byLanguage[tutorial.language as 'en' | 'zh']++;
  }
  
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    message: 'Tutorial data ready',
    stats,
    tutorials: REFERENCE_TUTORIALS,
  });
}
