'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { Link } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

interface BlogPostClientProps {
  post: BlogPost;
  locale: string;
  content: string;
}

export function BlogPostClient({ post, locale, content }: BlogPostClientProps) {
  const params = useParams();
  const currentLocale = (params.locale as string) || locale;
  const isZh = currentLocale === 'zh';
  const title = isZh ? post.title : post.titleEn;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: isZh ? '首页' : 'Home', href: '/' },
    { label: isZh ? '博客' : 'Blog', href: '/blog' },
    { label: title },
  ];

  // Simple markdown to HTML conversion
  const markdownToHtml = (text: string) => {
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-[#0B0F19] text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm border border-white/[0.08]"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-[#9CA3AF] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>')
      .replace(/^- (.+)$/gm, '<li class="text-[#9CA3AF] ml-6 list-disc mb-2">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="text-[#9CA3AF] ml-6 list-decimal">$2</li>')
      .replace(/^---$/gm, '<hr class="my-8 border-white/[0.08]" />')
      .replace(/\n\n/g, '</p><p class="text-[#9CA3AF] leading-relaxed mb-4">');
  };

  const htmlContent = markdownToHtml(content);

  return (
    <main className="min-h-screen bg-[#0B0F19]">
      {/* Breadcrumbs */}
      <div className="bg-[#111827] border-b border-white/[0.08] py-3">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero */}
      <section className="py-11 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {isZh ? '返回博客列表' : 'Back to Blog'}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-brand-light bg-brand/10 px-3 py-0.5 rounded-full">
              {isZh ? post.category : post.categoryEn}
            </span>
            <span className="text-sm text-[#9CA3AF] flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} {isZh ? '分钟阅读' : 'min read'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
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
      <article className="py-12 bg-[#0B0F19]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: `<p class="text-[#9CA3AF] leading-relaxed mb-4">${htmlContent}</p>`,
            }}
          />
        </div>
      </article>

      {/* Related Links */}
      <section className="py-8 bg-[#111827] border-t border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">
            {isZh ? '相关资源' : 'Related Resources'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/learn/1"
              className="p-4 bg-[#0B0F19] border border-white/[0.08] rounded-lg hover:border-brand/30 transition-all duration-300"
            >
              <h3 className="font-semibold text-white mb-1">
                {isZh ? '7 天学习路径' : '7-Day Learning Path'}
              </h3>
              <p className="text-sm text-[#9CA3AF]">
                {isZh ? '从入门到精通' : 'From beginner to master'}
              </p>
            </Link>
            <Link
              href="/skills"
              className="p-4 bg-[#0B0F19] border border-white/[0.08] rounded-lg hover:border-brand/30 transition-all duration-300"
            >
              <h3 className="font-semibold text-white mb-1">
                {isZh ? '精选技能' : 'Featured Skills'}
              </h3>
              <p className="text-sm text-[#9CA3AF]">
                {isZh ? '扩展 AI 能力' : 'Extend AI capabilities'}
              </p>
            </Link>
            <Link
              href="/tutorials"
              className="p-4 bg-[#0B0F19] border border-white/[0.08] rounded-lg hover:border-brand/30 transition-all duration-300"
            >
              <h3 className="font-semibold text-white mb-1">
                {isZh ? '全部教程' : 'All Tutorials'}
              </h3>
              <p className="text-sm text-[#9CA3AF]">
                {isZh ? '深入学习' : 'Deep dive'}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
