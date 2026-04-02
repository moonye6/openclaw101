import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { LearningPath } from '@/components/home/LearningPath';
import { RecommendedSection } from '@/components/home/RecommendedSection';
import { SkillsStats } from '@/components/home/SkillsStats';
import { TutorialsSection } from '@/components/home/TutorialsSection';
import { SecurityWarning } from '@/components/home/SecurityWarning';
import { UseCases } from '@/components/home/UseCases';
import { CommunityShowcase } from '@/components/home/CommunityShowcase';
import { NewsUpdates } from '@/components/home/NewsUpdates';
import { NewsletterCTA } from '@/components/home/NewsletterCTA';
import { AuthorShowcase } from '@/components/home/AuthorShowcase';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQSection } from '@/components/seo/FAQSection';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour for better caching
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: isZh
      ? 'OpenClaw 教程与指南 — 7天掌握 AI 智能体 | OpenClaw 101'
      : 'OpenClaw Tutorial & Guide — Learn AI Agent Skills in 7 Days | OpenClaw 101',
    description: isZh
      ? '最全面的 OpenClaw 教程：从安装配置到高级自动化，手把手教你掌握开源 AI 智能体。72 个精选社区技能。'
      : 'The complete OpenClaw tutorial with 72 curated skills. Learn how to install, configure, and automate with OpenClaw step by step.',
    openGraph: {
      title: isZh
        ? 'OpenClaw 教程与指南 — 7天掌握 AI 智能体'
        : 'OpenClaw Tutorial & Guide — Learn AI Agent Skills in 7 Days',
      description: isZh
        ? '最全面的 OpenClaw 教程：从安装到自动化，72 个精选社区技能。'
        : 'The complete OpenClaw tutorial with 72 curated skills. From installation to advanced automation.',
      url: `${SITE_URL}/${locale}`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        zh: `${SITE_URL}/zh`,
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isZh = locale === 'zh';

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OpenClaw 101',
    url: SITE_URL,
    description: isZh
      ? '最全面的 OpenClaw 教程：从安装到自动化，72 个精选社区技能。'
      : 'The complete OpenClaw tutorial with 72 curated skills to master the open-source AI agent.',
    inLanguage: ['en', 'zh-CN'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/skills?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OpenClaw 101',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/og-image.png`,
      width: 1024,
      height: 1024,
    },
    sameAs: [
      'https://github.com/openclaw/openclaw',
      'https://discord.com/invite/clawd',
    ],
  };

  // HowTo Schema for 7-Day Learning Path (great for Google rich results)
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isZh
      ? '如何使用 OpenClaw — 7天学习指南'
      : 'How to Use OpenClaw — 7-Day Step-by-Step Tutorial',
    description: isZh
      ? '从零开始学习 OpenClaw AI 智能体：安装、配置、对话、文件处理、网络能力、技能扩展、自动化。'
      : 'Learn OpenClaw AI agent from scratch: installation, configuration, conversations, file handling, web capabilities, skill extensions, and automation.',
    totalTime: 'P7D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      { '@type': 'HowToSupply', name: isZh ? '电脑 (macOS / Linux / Windows)' : 'Computer (macOS / Linux / Windows)' },
      { '@type': 'HowToSupply', name: 'Node.js 18+' },
      { '@type': 'HowToSupply', name: isZh ? 'AI 模型 API 密钥 (如 Anthropic Claude)' : 'AI model API key (e.g. Anthropic Claude)' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Terminal / Command Line' },
      { '@type': 'HowToTool', name: 'Text Editor' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: isZh ? '第1天：安装 OpenClaw' : 'Day 1: Install OpenClaw',
        text: isZh
          ? '安装 OpenClaw，连接你的第一个平台（Telegram/Discord），与 AI 助手进行第一次对话。'
          : 'Install OpenClaw, connect your first platform (Telegram/Discord), and have your first conversation with your AI assistant.',
        url: `${SITE_URL}/${locale}/learn/1`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: isZh ? '第2天：深度对话' : 'Day 2: Deep Conversations',
        text: isZh
          ? '掌握对话技巧：上下文管理、多轮对话、人设定制和记忆设置。'
          : 'Master conversation techniques: context management, multi-turn dialogue, persona customization.',
        url: `${SITE_URL}/${locale}/learn/2`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: isZh ? '第3天：文件与代码' : 'Day 3: Files & Code',
        text: isZh
          ? '让 AI 处理文件：读取文档、编写代码、运行脚本、管理本地文件系统。'
          : 'Let AI handle files: read documents, write code, run scripts, and manage your local file system.',
        url: `${SITE_URL}/${locale}/learn/3`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: isZh ? '第4天：网络能力' : 'Day 4: Web Capabilities',
        text: isZh
          ? '解锁网络能力：搜索互联网、抓取网页、调用 API、集成在线服务。'
          : 'Unlock web powers: search the internet, scrape pages, call APIs, and integrate with online services.',
        url: `${SITE_URL}/${locale}/learn/4`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: isZh ? '第5天：技能扩展' : 'Day 5: Skill Extensions',
        text: isZh
          ? '从 ClawHub 安装社区技能扩展能力：GitHub、天气、智能家居等数千种技能。'
          : 'Install community skills from ClawHub to extend capabilities: GitHub, weather, smart home, and thousands more.',
        url: `${SITE_URL}/${locale}/learn/5`,
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: isZh ? '第6天：自动化' : 'Day 6: Automation',
        text: isZh
          ? '设置定时任务、心跳检查、主动提醒和自动化工作流。'
          : 'Set up scheduled tasks, heartbeat checks, proactive reminders, and automated workflows.',
        url: `${SITE_URL}/${locale}/learn/6`,
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: isZh ? '第7天：进阶技术' : 'Day 7: Advanced Techniques',
        text: isZh
          ? '多智能体协作、浏览器控制、设备集成，以及构建你自己的自定义技能。'
          : 'Multi-agent orchestration, browser control, device integration, and building your own custom skills.',
        url: `${SITE_URL}/${locale}/learn/7`,
      },
    ],
  };

  // Course Schema for 7-Day Learning Path
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'OpenClaw 101 - 7-Day Learning Path',
    description: locale === 'zh'
      ? '7天掌握 OpenClaw AI 助手，从安装配置到高级自动化'
      : 'Master OpenClaw AI assistant in 7 days, from setup to advanced automation',
    provider: {
      '@type': 'Organization',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
    educationalLevel: 'Beginner',
    isAccessibleForFree: true,
    numberOfLessons: 7,
    timeRequired: 'P7D',
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 1: 认识 OpenClaw' : 'Day 1: Meet OpenClaw',
        description: locale === 'zh'
          ? '安装 OpenClaw，连接第一个平台，与 AI 助手进行第一次对话'
          : 'Install OpenClaw, connect your first platform, and have your first conversation',
        courseMode: 'online',
      },
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 2: 深度对话' : 'Day 2: Deep Conversations',
        description: locale === 'zh'
          ? '掌握对话技巧：上下文管理、多轮对话、人设定制'
          : 'Master conversation techniques: context management, multi-turn dialogue',
        courseMode: 'online',
      },
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 3: 文件与代码' : 'Day 3: Files & Code',
        description: locale === 'zh'
          ? '让 AI 处理文件：读取文档、编写代码、运行脚本'
          : 'Let AI handle files: read documents, write code, run scripts',
        courseMode: 'online',
      },
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 4: 网络能力' : 'Day 4: Web Capabilities',
        description: locale === 'zh'
          ? '解锁网络能力：搜索互联网、抓取网页、调用 API'
          : 'Unlock web powers: search the internet, scrape pages, call APIs',
        courseMode: 'online',
      },
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 5: 技能扩展' : 'Day 5: Skill Extensions',
        description: locale === 'zh'
          ? '从 ClawHub 安装社区技能扩展能力'
          : 'Install community skills from ClawHub to extend capabilities',
        courseMode: 'online',
      },
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 6: 自动化' : 'Day 6: Automation',
        description: locale === 'zh'
          ? '设置定时任务、心跳检查、主动提醒'
          : 'Set up scheduled tasks, heartbeat checks, proactive reminders',
        courseMode: 'online',
      },
      {
        '@type': 'CourseInstance',
        name: locale === 'zh' ? 'Day 7: 进阶技术' : 'Day 7: Advanced Techniques',
        description: locale === 'zh'
          ? '多智能体协作、浏览器控制、设备集成'
          : 'Multi-agent orchestration, browser control, device integration',
        courseMode: 'online',
      },
    ],
  };

  return (
    <div>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={orgJsonLd} />
      <JsonLd data={courseJsonLd} />
      <JsonLd data={howToJsonLd} />
      <HeroSection />
      <FeaturesSection />
      <UseCases />
      <LearningPath />
      <RecommendedSection />
      <SkillsStats />
      <TutorialsSection />
      <AuthorShowcase />
      <CommunityShowcase />
      <NewsUpdates />
      <NewsletterCTA />
      <SecurityWarning />
      <FAQSection />
    </div>
  );
}
