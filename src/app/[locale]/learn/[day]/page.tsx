import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { learningPath } from '@/data/learning-path';
import { LearningDayClient } from './LearningDayClient';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { locale: string; day: string }[] = [];
  for (let day = 1; day <= 7; day++) {
    params.push({ locale: 'en', day: String(day) });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}): Promise<Metadata> {
  const { locale, day } = await params;
  const learningDay = learningPath.find(d => d.day === Number(day));
  if (!learningDay) return {};

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;
  const description = isZh ? learningDay.objective : learningDay.objectiveEn;

  return {
    title: `Day ${learningDay.day}: ${title}`,
    description,
    openGraph: {
      title: `Day ${learningDay.day}: ${title} — OpenClaw 101`,
      description,
      url: `${SITE_URL}/${locale}/learn/${day}`,
      locale: isZh ? 'zh_CN' : 'en_US',
      type: 'article',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1024,
          height: 1024,
          alt: `OpenClaw 101 - Day ${learningDay.day}: ${title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Day ${learningDay.day}: ${title} — OpenClaw 101`,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    alternates: {
      canonical: `${SITE_URL}/en/learn/${day}`,
    },
  };
}

export default async function LearningDayPage({
  params,
}: {
  params: Promise<{ locale: string; day: string }>;
}) {
  const { locale, day } = await params;
  const learningDay = learningPath.find(d => d.day === Number(day));

  if (!learningDay) {
    notFound();
  }

  const isZh = locale === 'zh';
  const title = isZh ? learningDay.title : learningDay.titleEn;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Day ${learningDay.day}: ${title}`,
    description: isZh ? learningDay.objective : learningDay.objectiveEn,
    author: {
      '@type': 'Organization',
      name: 'OpenClaw 101',
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
    datePublished: '2026-03-16',
    dateModified: '2026-03-17',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${locale}/learn/${day}`,
    },
    isPartOf: {
      '@type': 'Course',
      name: 'OpenClaw 101 - 7-Day Learning Path',
      description: 'Master OpenClaw AI assistant in 7 days',
      provider: {
        '@type': 'Organization',
        name: 'OpenClaw 101',
      },
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
        name: isZh ? '学习路径' : 'Learning Path',
        item: `${SITE_URL}/${locale}#learning-path`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Day ${learningDay.day}: ${title}`,
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
      <LearningDayClient />
    </>
  );
}
