import { Metadata } from 'next';
import { SkillBrowser } from '@/components/skills/SkillBrowser';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'OpenClaw Skills Marketplace — Browse 97+ ClawHub Skills (2026)',
    description: 'Complete directory of 97+ OpenClaw community skills on ClawHub. AI image generation, Telegram bots, smart home, video processing & more. One-command install.',
    openGraph: {
      title: 'OpenClaw Skills Marketplace — 97+ ClawHub Skills',
      description: '97+ community skills for OpenClaw. AI image generation, Telegram bots, smart home & more.',
      url: `${SITE_URL}/skills`,
      locale: 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/skills`,
      languages: {
        en: `${SITE_URL}/en/skills`,
        zh: `${SITE_URL}/zh/skills`,
        'x-default': `${SITE_URL}/en/skills`,
      },
    },
  };
}

export default async function SkillsPage() {
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
        name: 'Skills Marketplace',
        item: `${SITE_URL}/skills`,
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'OpenClaw Community Skills',
    description: '97 curated community skills for OpenClaw AI assistant',
    url: `${SITE_URL}/skills`,
    numberOfItems: 97,
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenClaw 101',
      url: SITE_URL,
    },
  };

  const hotTags = ['github', 'automation', 'browser', 'coding', 'ai-llm', 'research'];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      
      {/* Hero Header */}
      <section className="relative overflow-hidden py-20 bg-[#0B0F19] border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            OpenClaw Skills Marketplace
          </h1>
          <p className="mt-4 text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            97 curated community skills across 17 categories. Install with one command.
          </p>
          
          {/* Install command */}
          <div className="mt-8 flex justify-center">
            <code className="bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm px-6 py-3 rounded-xl text-white font-mono text-sm">
              npx clawhub@latest install &lt;skill-name&gt;
            </code>
          </div>

          {/* Hot tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {hotTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Browser */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SkillBrowser />
        </div>
      </section>
    </div>
  );
}
