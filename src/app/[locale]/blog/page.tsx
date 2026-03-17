import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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
    title: isZh ? '博客' : 'Blog',
    description: isZh
      ? 'OpenClaw 使用教程、技巧和最佳实践'
      : 'OpenClaw tutorials, tips and best practices',
    openGraph: {
      title: isZh ? 'OpenClaw 101 博客' : 'OpenClaw 101 Blog',
      description: isZh
        ? 'OpenClaw 使用教程、技巧和最佳实践'
        : 'OpenClaw tutorials, tips and best practices',
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isZh ? '博客' : 'Blog'}
          </h1>
          <p className="text-xl text-blue-100">
            {isZh
              ? 'OpenClaw 使用教程、技巧和最佳实践'
              : 'OpenClaw tutorials, tips and best practices'}
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {isZh ? post.category : post.categoryEn}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} {isZh ? '分钟阅读' : 'min read'}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {isZh ? post.title : post.titleEn}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {isZh ? post.excerpt : post.excerptEn}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <span className="text-blue-600 font-medium flex items-center gap-1">
                      {isZh ? '阅读更多' : 'Read more'}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
