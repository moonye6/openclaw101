import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'OpenClaw Blog — 50+ Tutorials on AI Agents, Telegram Bots, Workflows (Updated Weekly)',
    description: '50+ tutorials and comparisons on OpenClaw, AI agents, Telegram bots, and automation workflows. New posts weekly with real benchmarks.',
    alternates: {
      canonical: 'https://openclaw101.vip/blog',
    },
    openGraph: {
      title: 'OpenClaw 101 Blog',
      description: 'Practical tutorials on Telegram bots, AI agents, automation workflows, and no-code tools.',
      images: [{ url: 'https://openclaw101.vip/og-image.png', width: 1024, height: 1024, alt: 'OpenClaw 101 Blog' }],
    },
  };
}

const SITE_URL = 'https://openclaw101.vip';

export default async function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'OpenClaw 101 Blog',
    url: `${SITE_URL}/blog`,
    description: 'Practical tutorials on Telegram bots, AI agents, automation workflows, and no-code tools.',
    inLanguage: 'en',
    blogPost: sortedPosts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.titleEn,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: { '@type': 'Person', name: post.author },
    })),
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <JsonLd data={blogListJsonLd} />
      {/* Hero */}
      <section className="relative overflow-hidden py-16 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-[#9CA3AF]">
            Practical tutorials on Telegram bots, AI agents, and automation workflows
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-6">
            {sortedPosts.map((post) => (
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
                      {post.categoryEn}
                    </span>
                    <span className="text-sm text-[#9CA3AF] flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 hover:text-brand-light transition-colors">
                    {post.titleEn}
                  </h2>

                  <p className="text-[#9CA3AF] mb-4 line-clamp-2">
                    {post.excerptEn}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <span className="text-brand-light font-medium flex items-center gap-1">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
