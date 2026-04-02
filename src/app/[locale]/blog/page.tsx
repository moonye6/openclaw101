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
    <main className="min-h-screen bg-[#0B0F19]">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isZh ? '博客' : 'Blog'}
          </h1>
          <p className="text-xl text-[#9CA3AF]">
            {isZh
              ? 'OpenClaw 使用教程、技巧和最佳实践'
              : 'OpenClaw tutorials, tips and best practices'}
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6">
            {[...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((post) => (
              <article
                key={post.id}
                className="bg-[#111827] rounded-xl border border-white/[0.08] overflow-hidden hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-brand-light bg-brand/10 px-3 py-1 rounded-full">
                      {isZh ? post.category : post.categoryEn}
                    </span>
                    <span className="text-sm text-[#9CA3AF] flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} {isZh ? '分钟阅读' : 'min read'}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 hover:text-brand-light transition-colors">
                    {isZh ? post.title : post.titleEn}
                  </h2>

                  <p className="text-[#9CA3AF] mb-4 line-clamp-2">
                    {isZh ? post.excerpt : post.excerptEn}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <span className="text-brand-light font-medium flex items-center gap-1">
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
