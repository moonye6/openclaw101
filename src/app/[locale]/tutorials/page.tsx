import { Metadata } from 'next';
import { TutorialList } from '@/components/tutorials/TutorialList';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tutorials - 60 Curated AI Agent & Automation Guides',
    description: 'Browse 60 tutorials for OpenClaw AI assistant. Official docs, cloud deployment guides, getting started tutorials, and deep dives.',
    openGraph: {
      title: 'OpenClaw Tutorials - 60 Curated Guides',
      description: 'Browse 60 curated tutorials. From setup to advanced automation.',
      url: `${SITE_URL}/tutorials`,
      locale: 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/tutorials`,
    },
  };
}

export default async function TutorialsPage() {
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
        name: 'Tutorials',
        item: `${SITE_URL}/tutorials`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OpenClaw Tutorials',
    description: '60 tutorials for OpenClaw AI assistant',
    url: `${SITE_URL}/tutorials`,
    numberOfItems: 60,
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      {/* Header */}
      <section className="relative overflow-hidden py-16 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            OpenClaw Tutorials
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF] text-center max-w-2xl mx-auto">
            60 curated tutorials from official docs, cloud platforms, and community contributors
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">60</div>
              <div className="text-sm text-[#9CA3AF]">Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">17</div>
              <div className="text-sm text-[#9CA3AF]">Chinese</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">43</div>
              <div className="text-sm text-[#9CA3AF]">English</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">9</div>
              <div className="text-sm text-[#9CA3AF]">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <TutorialList />
        </div>
      </section>
    </div>
  );
}

