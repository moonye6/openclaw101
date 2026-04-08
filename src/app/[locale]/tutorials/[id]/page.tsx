import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalLink, ArrowLeft, Globe, Book, Cloud, Lightbulb, MessageSquare, Wrench, Video, Cpu, Zap } from 'lucide-react';
import { getTutorialById, tutorials, getTutorialsByCategory, getCategoryInfo } from '@/data/tutorials';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/i18n/routing';

const SITE_URL = 'https://openclaw101.vip';

const categoryIcons: Record<string, React.ReactNode> = {
  'official': <Book className="w-6 h-6" />,
  'cloud-deploy': <Cloud className="w-6 h-6" />,
  'getting-started': <Lightbulb className="w-6 h-6" />,
  'channels': <MessageSquare className="w-6 h-6" />,
  'skills': <Wrench className="w-6 h-6" />,
  'videos': <Video className="w-6 h-6" />,
  'deep-dives': <Cpu className="w-6 h-6" />,
  'tools': <Zap className="w-6 h-6" />,
};

export async function generateStaticParams() {
  return tutorials.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const tutorial = getTutorialById(id);
  if (!tutorial) return {};

  const isZh = locale === 'zh';
  const cat = getCategoryInfo(tutorial.category);
  const catName = isZh ? (cat?.nameZh ?? tutorial.category) : (cat?.name ?? tutorial.category);

  return {
    title: `${tutorial.title} — ${catName}`,
    description: tutorial.description,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      url: `${SITE_URL}/${locale}/tutorials/${id}`,
      locale: isZh ? 'zh_CN' : 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/en/tutorials/${id}`,
    },
  };
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const tutorial = getTutorialById(id);

  if (!tutorial) {
    notFound();
  }

  const isZh = locale === 'zh';
  const cat = getCategoryInfo(tutorial.category);
  const catName = isZh ? (cat?.nameZh ?? tutorial.category) : (cat?.name ?? tutorial.category);
  const relatedTutorials = getTutorialsByCategory(tutorial.category)
    .filter((t) => t.id !== tutorial.id)
    .slice(0, 6);

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
      {
        '@type': 'ListItem',
        position: 3,
        name: tutorial.title,
        item: `${SITE_URL}/${locale}/tutorials/${id}`,
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tutorial.title,
    description: tutorial.description,
    url: tutorial.url,
    publisher: {
      '@type': 'Organization',
      name: tutorial.source,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'OpenClaw',
      applicationCategory: 'AI Assistant',
    },
    inLanguage: tutorial.language === 'zh' ? 'zh-CN' : 'en',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <section className={`py-16 ${cat?.color ?? 'bg-blue-600'} bg-gradient-to-br from-blue-600 to-indigo-700`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回教程列表' : 'Back to Tutorials'}
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white">
              {categoryIcons[tutorial.category] ?? <Globe className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-sm font-medium text-white/90 bg-white/10 px-3 py-0.5 rounded-full">
                  {catName}
                </span>
                <span className="text-sm text-white/70">
                  {tutorial.source}
                </span>
                <span className="text-sm text-white/70 bg-white/10 px-2 py-0.5 rounded">
                  {tutorial.language === 'en' ? 'EN' : '中文'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-sm">
                {tutorial.title}
              </h1>
              <p className="mt-4 text-lg text-white/80 leading-relaxed">
                {tutorial.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center" style={{ color: '#111827' }}>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#111827' }}>
              {isZh ? '阅读完整教程' : 'Read Full Tutorial'}
            </h2>
            <p className="mb-6 max-w-lg mx-auto" style={{ color: '#374151' }}>
              {isZh
                ? `本教程由 ${tutorial.source} 发布，点击下方按钮跳转阅读完整内容。`
                : `This tutorial is published by ${tutorial.source}. Click below to read the full content.`}
            </p>
            <a
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              {isZh ? '前往阅读' : 'Go to Tutorial'}
              <ExternalLink className="w-5 h-5" />
            </a>
            <p className="mt-3 text-sm" style={{ color: '#6b7280' }}>
              {tutorial.url}
            </p>
          </div>
        </div>
      </section>

      {/* Related Tutorials */}
      {relatedTutorials.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {isZh ? `更多${catName}教程` : `More ${catName} Tutorials`}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedTutorials.map((related) => (
                <Link
                  key={related.id}
                  href={`/tutorials/${related.id}`}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{related.source}</span>
                    <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                      {related.language === 'en' ? 'EN' : '中文'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{related.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
