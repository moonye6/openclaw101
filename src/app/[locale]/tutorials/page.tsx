import { Metadata } from 'next';
import { TutorialList } from '@/components/tutorials/TutorialList';
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
    title: isZh ? '教程 - 47 篇精选教程' : 'Tutorials - 47 Curated Guides',
    description: isZh
      ? '浏览 47 篇 OpenClaw AI 助手教程，包含官方文档、云部署指南、入门教程和深度分析。'
      : 'Browse 47 tutorials for OpenClaw AI assistant. Official docs, cloud deployment guides, getting started tutorials, and deep dives.',
    openGraph: {
      title: isZh ? 'OpenClaw 教程 - 47 篇精选教程' : 'OpenClaw Tutorials - 47 Curated Guides',
      description: isZh
        ? '浏览 47 篇精选教程，从入门到高级自动化。'
        : 'Browse 47 curated tutorials. From setup to advanced automation.',
      url: `${SITE_URL}/${locale}/tutorials`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/tutorials`,
      languages: {
        en: `${SITE_URL}/en/tutorials`,
        zh: `${SITE_URL}/zh/tutorials`,
      },
    },
  };
}

export default async function TutorialsPage({
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
        name: isZh ? '教程' : 'Tutorials',
        item: `${SITE_URL}/${locale}/tutorials`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isZh ? 'OpenClaw 教程' : 'OpenClaw Tutorials',
    description: isZh
      ? '47 篇 OpenClaw AI 助手教程'
      : '47 tutorials for OpenClaw AI assistant',
    url: `${SITE_URL}/${locale}/tutorials`,
    numberOfItems: 47,
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      {/* Header */}
      <section className="relative overflow-hidden py-16 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            {isZh ? 'OpenClaw 教程' : 'OpenClaw Tutorials'}
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF] text-center max-w-2xl mx-auto">
            {isZh
              ? '47 篇精选教程，来自官方文档、云平台和社区贡献者'
              : '47 curated tutorials from official docs, cloud platforms, and community contributors'}
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">47</div>
              <div className="text-sm text-[#9CA3AF]">{isZh ? '教程' : 'Tutorials'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">17</div>
              <div className="text-sm text-[#9CA3AF]">{isZh ? '中文' : 'Chinese'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">30</div>
              <div className="text-sm text-[#9CA3AF]">{isZh ? '英文' : 'English'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">8</div>
              <div className="text-sm text-[#9CA3AF]">{isZh ? '分类' : 'Categories'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <TutorialList />
        </div>
      </section>
    </div>
  );
}
// Cache bust: 1774971347
