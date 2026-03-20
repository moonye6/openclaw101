import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { LearningPath } from '@/components/home/LearningPath';
import { RecommendedSection } from '@/components/home/RecommendedSection';
import { SkillsStats } from '@/components/home/SkillsStats';
import { TutorialsSection } from '@/components/home/TutorialsSection';
import { SecurityWarning } from '@/components/home/SecurityWarning';
<<<<<<< HEAD
=======
import { UseCases } from '@/components/home/UseCases';
import { CommunityShowcase } from '@/components/home/CommunityShowcase';
import { NewsUpdates } from '@/components/home/NewsUpdates';
>>>>>>> develop
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQSection } from '@/components/seo/FAQSection';

const SITE_URL = 'https://openclaw101.vip';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: isZh
      ? 'OpenClaw 101 - 7天掌握你的AI助手'
      : 'OpenClaw 101 - Master Your AI Assistant in 7 Days',
    description: isZh
      ? '414+ 教程和 5490+ 技能，助你快速掌握 OpenClaw AI 助手。从安装配置到高级自动化。'
      : '414+ tutorials and 5490+ skills for OpenClaw AI assistant. From setup to advanced automation.',
    openGraph: {
      title: isZh
        ? 'OpenClaw 101 - 7天掌握你的AI助手'
        : 'OpenClaw 101 - Master Your AI Assistant in 7 Days',
      description: isZh
        ? '414+ 教程和 5490+ 技能，助你快速掌握 OpenClaw AI 助手。'
        : '414+ tutorials and 5490+ skills for OpenClaw AI assistant.',
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

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OpenClaw 101',
    url: SITE_URL,
    description:
      '414+ tutorials and 5490+ skills for OpenClaw AI assistant.',
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
    <main>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={orgJsonLd} />
      <JsonLd data={courseJsonLd} />
      <HeroSection />
      <FeaturesSection />
<<<<<<< HEAD
=======
      <UseCases />
>>>>>>> develop
      <LearningPath />
      <RecommendedSection />
      <SkillsStats />
      <TutorialsSection />
      <CommunityShowcase />
      <NewsUpdates />
      <SecurityWarning />
      <FAQSection />
    </main>
  );
}
