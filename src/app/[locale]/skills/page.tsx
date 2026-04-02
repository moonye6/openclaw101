import { Metadata } from 'next';
import { SkillBrowser } from '@/components/skills/SkillBrowser';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: isZh ? 'OpenClaw 技能市场 - 72 个精选社区技能' : 'OpenClaw Skills Marketplace - 72 Curated Community Skills',
    description: isZh
      ? '浏览 72 个 OpenClaw AI 助手精选社区技能，覆盖 12 个分类。一键安装扩展你的 AI 能力。'
      : 'Browse 72 curated community skills for OpenClaw AI assistant across 12 categories. Install with one command to extend your AI capabilities.',
    openGraph: {
      title: isZh ? 'OpenClaw 技能市场 - 72 个精选社区技能' : 'OpenClaw Skills Marketplace - 72 Curated Community Skills',
      description: isZh
        ? '浏览 72 个精选社区技能，一键安装扩展你的 AI 能力。'
        : 'Browse 72 curated community skills. Install with one command.',
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
        name: isZh ? '技能市场' : 'Skills Marketplace',
        item: `${SITE_URL}/${locale}/skills`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isZh ? 'OpenClaw 社区技能' : 'OpenClaw Community Skills',
    description: isZh
      ? '72 个 OpenClaw AI 助手精选社区技能'
      : '72 curated community skills for OpenClaw AI assistant',
    url: `${SITE_URL}/${locale}/skills`,
    numberOfItems: 72,
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
  };

  const hotTags = isZh
    ? ['github', 'automation', 'browser', 'coding', 'ai-llm', 'research']
    : ['github', 'automation', 'browser', 'coding', 'ai-llm', 'research'];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      
      {/* Hero Header */}
      <section className="relative overflow-hidden py-20 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {isZh ? 'OpenClaw 技能市场' : 'OpenClaw Skills Marketplace'}
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            {isZh
              ? '72 个精选社区技能，覆盖 12 个分类。一键安装扩展你的 AI 能力。'
              : '72 curated community skills across 12 categories. Install with one command.'}
          </p>
          
          {/* Install command */}
          <div className="mt-8 flex justify-center">
            <code className="bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm px-6 py-3 rounded-xl text-white font-mono text-sm">
              npx clawhub@latest install &lt;skill-name&gt;
            </code>
          </div>

          {/* Hot tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {hotTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
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
