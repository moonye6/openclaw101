import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogPostClient } from './BlogPostClient';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

/**
 * Extract FAQ Q&A pairs from markdown content for FAQPage JSON-LD.
 * Handles two patterns:
 *   1. **Q: question**\n\nanswer
 *   2. ### question\n\nanswer (under a ## FAQ heading)
 */
function extractFaqPairs(content: string): Array<{ question: string; answer: string }> {
  // Find the FAQ section
  const faqMatch = content.match(/##\s+(?:FAQ|Frequently Asked Questions)\s*\n([\s\S]*?)(?=\n##\s|\n\*---|$)/i);
  if (!faqMatch) return [];

  const faqSection = faqMatch[1];
  const pairs: Array<{ question: string; answer: string }> = [];

  // Pattern 1: **Q: question**\n(A: answer OR plain answer)
  const boldQPattern = /\*\*Q:\s*(.+?)\*\*\s*\n+(?:A:\s*)?([\s\S]*?)(?=\n\*\*Q:|\n###|\n##|$)/g;
  let m;
  while ((m = boldQPattern.exec(faqSection)) !== null) {
    pairs.push({ question: m[1].trim(), answer: m[2].trim().replace(/\n/g, ' ').slice(0, 500) });
  }

  // Pattern 2: ### question (if pattern 1 found nothing)
  if (pairs.length === 0) {
    const h3Pattern = /###\s+(.+?)\s*\n\n([\s\S]*?)(?=\n###|\n##|$)/g;
    while ((m = h3Pattern.exec(faqSection)) !== null) {
      pairs.push({ question: m[1].trim(), answer: m[2].trim().replace(/\n/g, ' ').slice(0, 500) });
    }
  }

  return pairs;
}

// Return 404 for slugs not in generateStaticParams
export const dynamicParams = false;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ locale: 'en', slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const isZh = locale === 'zh';
  const title = isZh ? post.title : post.titleEn;
  const description = isZh ? post.excerpt : post.excerptEn;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      locale: isZh ? 'zh_CN' : 'en_US',
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
      title,
      description,
      images: [`${SITE_URL}${post.image}`],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
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
  const description = isZh ? post.excerpt : post.excerptEn;
  const category = isZh ? post.category : post.categoryEn;

  // Calculate word count properly: for English count words, for Chinese count characters
  const wordCount = isZh
    ? content.replace(/\s/g, '').length
    : content.split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenClaw 101',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.png`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE_URL}${post.image}`,
    wordCount,
    keywords: post.tags.join(', '),
    articleSection: category,
    inLanguage: isZh ? 'zh-CN' : 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
      },
    ],
  };

  // Extract FAQ pairs for FAQPage JSON-LD (if the post has a FAQ section)
  const faqPairs = extractFaqPairs(content);
  const faqJsonLd = faqPairs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqPairs.map((pair) => ({
      '@type': 'Question',
      name: pair.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: pair.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BlogPostClient post={post} locale={locale} content={content} relatedPosts={getRelatedPosts(slug, 3)} />
    </>
  );
}
