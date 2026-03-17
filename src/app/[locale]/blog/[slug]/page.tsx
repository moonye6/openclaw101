import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, BlogPost } from '@/data/blog';
import { BlogPostClient } from './BlogPostClient';

const SITE_URL = 'https://openclaw101.vip';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['en', 'zh']) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
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

  // Breadcrumb JSON-LD
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
        name: isZh ? '博客' : 'Blog',
        item: `${SITE_URL}/${locale}/blog`,
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
      <BlogPostClient post={post} locale={locale} content={content} />
    </>
  );
}
