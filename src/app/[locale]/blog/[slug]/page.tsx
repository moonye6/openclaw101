import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, BlogPost } from '@/data/blog';
import { BlogPostClient } from './BlogPostClient';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ locale: 'en', slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.titleEn,
    description: post.excerptEn,
    openGraph: {
      title: post.titleEn,
      description: post.excerptEn,
      url: `${SITE_URL}/en/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.titleEn,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.titleEn,
      description: post.excerptEn,
      images: [`${SITE_URL}${post.image}`],
    },
    alternates: {
      canonical: `${SITE_URL}/en/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = post.titleEn;
  const content = post.contentEn;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: post.excerptEn,
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
    wordCount: content.length,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/en/blog/${slug}`,
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
        item: `${SITE_URL}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/en/blog`,
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
      <BlogPostClient post={post} locale="en" content={content} />
    </>
  );
}
