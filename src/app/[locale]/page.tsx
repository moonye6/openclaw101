import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { WhatIsOpenClaw } from '@/components/home/WhatIsOpenClaw';
import { PopularGuides } from '@/components/home/PopularGuides';
import { UseCases } from '@/components/home/UseCases';
import { EditorialTrust } from '@/components/home/EditorialTrust';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQSection } from '@/components/seo/FAQSection';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour for better caching
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: 'OpenClaw101 — Complete OpenClaw Guide, Setup & Skills Hub (2026)',
    },
    description: 'OpenClaw101 — the complete independent guide to OpenClaw. Install, configure, and build Telegram, QQ, and WhatsApp bots. Browse 97+ ClawHub skills and real workflow use cases.',
    openGraph: {
      title: 'OpenClaw101 — Complete OpenClaw Guide, Setup & Skills Hub (2026)',
      description: 'Install OpenClaw, set up Telegram bots, browse 97+ skills, and automate tasks. Beginner-friendly guides.',
      url: SITE_URL,
      locale: 'en_US',
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const isZh = locale === 'zh';

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OpenClaw 101',
    url: SITE_URL,
    description: 'The complete OpenClaw learning hub: guides, tutorials, examples, and best practices.',
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/skills?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OpenClaw 101',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/og-image.png`,
      width: 1024,
      height: 1024,
    },
    sameAs: [
      'https://github.com/openclaw/openclaw',
      'https://discord.com/invite/clawd',
    ],
  };

  return (
    <div>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={orgJsonLd} />
      <HeroSection />
      <WhatIsOpenClaw />
      <PopularGuides />
      <UseCases />
      <FAQSection />
      <EditorialTrust />
    </div>
  );
}
