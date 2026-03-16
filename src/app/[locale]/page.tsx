import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { LearningPath } from '@/components/home/LearningPath';
import { RecommendedSection } from '@/components/home/RecommendedSection';
import { SkillsStats } from '@/components/home/SkillsStats';
import { TutorialsSection } from '@/components/home/TutorialsSection';
import { SecurityWarning } from '@/components/home/SecurityWarning';
import { JsonLd } from '@/components/seo/JsonLd';

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
      ? '409+ 教程和 5490+ 技能，助你快速掌握 OpenClaw AI 助手。从安装配置到高级自动化。'
      : '409+ tutorials and 5490+ skills for OpenClaw AI assistant. From setup to advanced automation.',
    openGraph: {
      title: isZh
        ? 'OpenClaw 101 - 7天掌握你的AI助手'
        : 'OpenClaw 101 - Master Your AI Assistant in 7 Days',
      description: isZh
        ? '409+ 教程和 5490+ 技能，助你快速掌握 OpenClaw AI 助手。'
        : '409+ tutorials and 5490+ skills for OpenClaw AI assistant.',
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
    inLanguage: [locale === 'zh' ? 'zh-CN' : 'en'],
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
    logo: `${SITE_URL}/og-image.png`,
    sameAs: [
      'https://github.com/openclaw/openclaw',
      'https://discord.com/invite/clawd',
    ],
  };

  return (
    <main>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={orgJsonLd} />
      <HeroSection />
      <FeaturesSection />
      <LearningPath />
      <RecommendedSection />
      <SkillsStats />
      <TutorialsSection />
      <SecurityWarning />
    </main>
  );
}
