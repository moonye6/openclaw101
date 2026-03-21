import { Metadata } from 'next';
import { SkillBrowser } from '@/components/skills/SkillBrowser';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://openclaw101.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: isZh ? '技能库 - 5490+ 社区技能' : 'Skills - 5490+ Community Skills',
    description: isZh
      ? '浏览 5490+ 个 OpenClaw AI 助手社区技能，覆盖 31 个分类。一键安装扩展你的 AI 能力。'
      : 'Browse 5490+ community skills for OpenClaw AI assistant across 31 categories. Install with one command to extend your AI capabilities.',
    openGraph: {
      title: isZh ? 'OpenClaw 技能库 - 5490+ 社区技能' : 'OpenClaw Skills - 5490+ Community Skills',
      description: isZh
        ? '浏览 5490+ 个社区技能，一键安装扩展你的 AI 能力。'
        : 'Browse 5490+ community skills. Install with one command.',
      url: `${SITE_URL}/${locale}/skills`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/skills`,
      languages: {
        en: `${SITE_URL}/en/skills`,
        zh: `${SITE_URL}/zh/skills`,
      },
    },
  };
}

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isZh ? '技能库' : 'Skills',
        item: `${SITE_URL}/${locale}/skills`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isZh ? 'OpenClaw 社区技能' : 'OpenClaw Community Skills',
    description: isZh
      ? '5490+ 个 OpenClaw AI 助手社区技能'
      : '5490+ community skills for OpenClaw AI assistant',
    url: `${SITE_URL}/${locale}/skills`,
    numberOfItems: 5490,
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            {isZh ? '社区技能' : 'Community Skills'}
          </h1>
          <p className="mt-4 text-lg text-purple-100 text-center max-w-2xl mx-auto">
            {isZh
              ? '5490+ 个来自 awesome-openclaw-skills 的技能，覆盖 31 个分类。一键安装。'
              : '5490+ skills from awesome-openclaw-skills across 31 categories. Install with one command.'}
          </p>
          <div className="mt-8 flex justify-center">
            <code className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg text-white font-mono">
              npx clawhub@latest install &lt;skill-name&gt;
            </code>
          </div>
        </div>
      </section>

      {/* Skill Browser */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SkillBrowser />
        </div>
      </section>
    </div>
  );
}
