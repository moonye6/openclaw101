import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, getRelatedPosts, BlogPost } from '@/data/blog';
import { BlogPostClient } from './BlogPostClient';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

// Return 404 for slugs not in generateStaticParams
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const post of blogPosts) {
    params.push({ locale: 'en', slug: post.slug });
    params.push({ locale: 'zh', slug: post.slug });
  }
  return params;
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
      languages: {
        en: `${SITE_URL}/en/blog/${slug}`,
        zh: `${SITE_URL}/zh/blog/${slug}`,
        'x-default': `${SITE_URL}/en/blog/${slug}`,
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
      <BlogPostClient post={post} locale={locale} content={content} relatedPosts={getRelatedPosts(slug, 3)} />
    </>
  );
}
