'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowLeft, Calendar, Clock, Tag, List } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { Link } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

interface BlogPostClientProps {
  post: BlogPost;
  locale: string;
  content: string;
  relatedPosts?: BlogPost[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// ── Inline markdown (bold, italic, code, links) ──────────────
function renderInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-[#9CA3AF] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-[#9CA3AF]">$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-light hover:text-brand underline underline-offset-2 transition-colors">$1</a>');
}

// ── Table parser ─────────────────────────────────────────────
function parseTable(lines: string[]): string {
  // lines[0] = header, lines[1] = separator, rest = body rows
  const parseRow = (row: string) =>
    row.split('|').map(c => c.trim()).filter((_, i, a) => i > 0 && i < a.length);

  const headers = parseRow(lines[0]);
  const bodyRows = lines.slice(2).map(parseRow);

  const thHtml = headers.map(h => `<th class="px-3 py-2 text-left text-sm font-semibold text-white whitespace-nowrap">${renderInline(h)}</th>`).join('');
  const tbHtml = bodyRows.map(row => {
    const cells = row.map(c => `<td class="px-3 py-2 text-sm text-[#9CA3AF] border-t border-white/[0.06]">${renderInline(c)}</td>`).join('');
    return `<tr class="hover:bg-white/[0.02]">${cells}</tr>`;
  }).join('');

  return `<div class="overflow-x-auto my-6 rounded-lg border border-white/[0.08]"><table class="w-full border-collapse"><thead class="bg-white/[0.04]"><tr>${thHtml}</tr></thead><tbody>${tbHtml}</tbody></table></div>`;
}

// ── Main markdown → HTML converter ──────────────────────────
function markdownToHtml(text: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const lines = text.split('\n');
  const out: string[] = [];
  let i = 0;
  let inParagraph = false;

  const closeParagraph = () => {
    if (inParagraph) { out.push('</p>'); inParagraph = false; }
  };

  while (i < lines.length) {
    const line = lines[i];

    // ── Code block ──
    if (line.startsWith('```')) {
      closeParagraph();
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const escaped = codeLines.join('\n')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      out.push(`<div class="relative group my-4"><pre class="bg-[#0B0F19] text-gray-100 rounded-lg p-4 overflow-x-auto text-sm border border-white/[0.08]">${lang ? `<div class="text-xs text-[#6B7280] mb-2 select-none">${lang}</div>` : ''}<code>${escaped}</code></pre><button data-copy class="absolute top-2 right-2 p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-[#9CA3AF] hover:text-white opacity-0 group-hover:opacity-100 transition-all" title="Copy"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button></div>`);
      continue;
    }

    // ── Table ──
    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?[\s-:|]+\|/.test(lines[i + 1])) {
      closeParagraph();
      const tableLines: string[] = [line];
      i++;
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(parseTable(tableLines));
      continue;
    }

    // ── Headings ──
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      closeParagraph();
      const text = h2Match[1];
      const id = text.replace(/[^a-zA-Z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
      toc.push({ id, text: text.replace(/[🚀💡⚙️🧠🛠🔥✅❌⚠️📘📊🤖🔍⚡✍️🏠🔔📰⏰💰🎧📝🔗📤🖥📅🔒🎯🔌🎬]/g, '').trim(), level: 2 });
      out.push(`<h2 id="${id}" class="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-20">${renderInline(text)}</h2>`);
      i++; continue;
    }

    const h3Match = line.match(/^### (.+)$/);
    if (h3Match) {
      closeParagraph();
      const text = h3Match[1];
      const id = text.replace(/[^a-zA-Z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
      toc.push({ id, text: text.replace(/[🚀💡⚙️🧠🛠🔥✅❌⚠️📘📊🤖🔍⚡✍️🏠🔔📰⏰💰🎧📝🔗📤🖥📅🔒🎯🔌🎬]/g, '').trim(), level: 3 });
      out.push(`<h3 id="${id}" class="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-20">${renderInline(text)}</h3>`);
      i++; continue;
    }

    // ── Blockquote ──
    if (line.startsWith('> ')) {
      closeParagraph();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      out.push(`<blockquote class="border-l-4 border-brand/40 bg-brand/5 rounded-r-lg px-4 py-3 my-6 text-[#9CA3AF]">${renderInline(quoteLines.join(' '))}</blockquote>`);
      continue;
    }

    // ── Horizontal rule ──
    if (/^---$/.test(line.trim())) {
      closeParagraph();
      out.push('<hr class="my-8 border-white/[0.08]" />');
      i++; continue;
    }

    // ── Unordered list ──
    if (line.match(/^- /)) {
      closeParagraph();
      out.push('<ul class="my-4 space-y-1.5">');
      while (i < lines.length && lines[i].match(/^- /)) {
        out.push(`<li class="text-[#9CA3AF] ml-6 list-disc">${renderInline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push('</ul>');
      continue;
    }

    // ── Ordered list ──
    if (line.match(/^\d+\. /)) {
      closeParagraph();
      out.push('<ol class="my-4 space-y-1.5">');
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        out.push(`<li class="text-[#9CA3AF] ml-6 list-decimal">${renderInline(lines[i].replace(/^\d+\.\s*/, ''))}</li>`);
        i++;
      }
      out.push('</ol>');
      continue;
    }

    // ── Empty line → close paragraph ──
    if (line.trim() === '') {
      closeParagraph();
      i++; continue;
    }

    // ── Paragraph text ──
    if (!inParagraph) {
      out.push('<p class="text-[#9CA3AF] leading-relaxed mb-4">');
      inParagraph = true;
    } else {
      out.push(' ');
    }
    out.push(renderInline(line));
    i++;
  }

  closeParagraph();
  return { html: out.join(''), toc };
}

export function BlogPostClient({ post, locale, content, relatedPosts = [] }: BlogPostClientProps) {
  const params = useParams();
  const currentLocale = (params.locale as string) || locale;
  const isZh = currentLocale === 'zh';
  const title = isZh ? post.title : post.titleEn;
  const [showToc, setShowToc] = useState(false);

  const breadcrumbItems = [
    { label: isZh ? '首页' : 'Home', href: '/' },
    { label: isZh ? '博客' : 'Blog', href: '/blog' },
    { label: title },
  ];

  const { html: htmlContent, toc } = useMemo(() => markdownToHtml(content), [content]);

  // Copy button handler (event delegation)
  const handleCopy = useCallback((e: MouseEvent) => {
    const btn = (e.target as HTMLElement).closest('[data-copy]') as HTMLElement | null;
    if (!btn) return;
    const pre = btn.closest('.relative')?.querySelector('code');
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent || '');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
    setTimeout(() => {
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
    }, 2000);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleCopy);
    return () => document.removeEventListener('click', handleCopy);
  }, [handleCopy]);

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

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-sm">
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

      {/* TOC (Table of Contents) — shown inline for mobile, sidebar for desktop */}
      {toc.length > 3 && (
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Mobile TOC toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className="lg:hidden flex items-center gap-2 mt-6 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-[#9CA3AF] hover:text-white hover:bg-white/[0.06] transition-colors w-full"
          >
            <List className="w-4 h-4" />
            {isZh ? '目录导航' : 'Table of Contents'}
            <span className="ml-auto text-xs">({toc.length})</span>
          </button>
          {showToc && (
            <nav className="lg:hidden mt-2 mb-6 p-4 bg-white/[0.02] border border-white/[0.08] rounded-lg">
              <ul className="space-y-1.5">
                {toc.map(item => (
                  <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1rem' : 0 }}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setShowToc(false)}
                      className="text-sm text-[#9CA3AF] hover:text-brand-light transition-colors block py-0.5"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* Content + Desktop TOC sidebar */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex gap-8">
          {/* Article */}
          <article className="py-12 flex-1 min-w-0 max-w-4xl">
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          {/* Desktop TOC sidebar */}
          {toc.length > 3 && (
            <aside className="hidden lg:block w-56 shrink-0 py-12">
              <nav className="sticky top-24">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
                  {isZh ? '目录' : 'On this page'}
                </p>
                <ul className="space-y-1 border-l border-white/[0.08]">
                  {toc.map(item => (
                    <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1.5rem' : '0.75rem' }}>
                      <a
                        href={`#${item.id}`}
                        className="text-xs text-[#6B7280] hover:text-brand-light transition-colors block py-1 leading-snug"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </div>

      {/* Related Articles */}
      <section className="py-8 bg-[#111827] border-t border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">
            {isZh ? '相关文章' : 'Related Articles'}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.length > 0 ? (
              relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-4 bg-[#0B0F19] border border-white/[0.08] rounded-lg hover:border-brand/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-brand-light bg-brand/10 px-2 py-0.5 rounded-full">
                      {isZh ? related.category : related.categoryEn}
                    </span>
                    <span className="text-xs text-[#6B7280] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {related.readingTime} {isZh ? '分钟' : 'min'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-1 line-clamp-2 text-sm">
                    {isZh ? related.title : related.titleEn}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2">
                    {isZh ? related.excerpt : related.excerptEn}
                  </p>
                </Link>
              ))
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
