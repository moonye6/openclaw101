import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const SITE_URL = 'https://openclaw101.vip';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  const isZh = locale === 'zh';
  const title = isZh ? post.title : post.titleEn;
  const description = isZh ? post.excerpt : post.excerptEn;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [`${SITE_URL}${post.image}`],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${slug}`,
        zh: `${SITE_URL}/zh/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? post.title : post.titleEn;
  const content = isZh ? post.content : post.contentEn;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: isZh ? post.excerpt : post.excerptEn,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenClaw 101',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE_URL}${post.image}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${locale}/blog/${slug}`,
    },
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: isZh ? '首页' : 'Home', href: '/' },
    { label: isZh ? '博客' : 'Blog', href: '/blog' },
    { label: title },
  ];

  // Simple markdown to HTML conversion
  const markdownToHtml = (text: string) => {
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
      .replace(/^- (.+)$/gm, '<li class="text-gray-700 ml-6 list-disc">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-700 ml-6 list-decimal">$2</li>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">');
  };

  const htmlContent = markdownToHtml(content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b py-3">
          <div className="container mx-auto px-4 max-w-4xl">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {isZh ? '返回博客列表' : 'Back to Blog'}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-white/90 bg-white/10 px-3 py-0.5 rounded-full">
                {isZh ? post.category : post.categoryEn}
              </span>
              <span className="text-sm text-white/80 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} {isZh ? '分钟阅读' : 'min read'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {post.tags.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{
                __html: `<p class="text-gray-700 leading-relaxed mb-4">${htmlContent}</p>`,
              }}
            />
          </div>
        </article>

        {/* Related Links */}
        <section className="py-8 bg-gray-50 border-t">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isZh ? '相关资源' : 'Related Resources'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/learn/1"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isZh ? '7 天学习路径' : '7-Day Learning Path'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isZh ? '从入门到精通' : 'From beginner to master'}
                </p>
              </Link>
              <Link
                href="/skills"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isZh ? '精选技能' : 'Featured Skills'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isZh ? '扩展 AI 能力' : 'Extend AI capabilities'}
                </p>
              </Link>
              <Link
                href="/tutorials"
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {isZh ? '全部教程' : 'All Tutorials'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isZh ? '深入学习' : 'Deep dive'}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
