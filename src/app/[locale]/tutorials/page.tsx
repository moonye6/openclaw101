import { Metadata } from 'next';
import Link from 'next/link';
import { TutorialList } from '@/components/tutorials/TutorialList';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQSection } from '@/components/seo/FAQSection';

const TUTORIALS_FAQ = [
  {
    question: 'Where should I start if I\'m brand new to OpenClaw?',
    answer: 'Start with the installation guide, then walk through a first bot tutorial end-to-end. Most beginners complete "install + first bot" in under 30 minutes. See the Beginner track below or the OpenClaw installation guide.',
  },
  {
    question: 'Do I need to know how to code?',
    answer: 'No. OpenClaw is designed so most setup and automation can be done via YAML config and CLI commands. You only need code when building a custom Skill or integrating a non-supported API.',
  },
  {
    question: 'Which platforms can I connect a bot to?',
    answer: 'Officially: Telegram, QQ, and Feishu. Via community adapters: Discord, Slack, and WhatsApp (experimental). See "OpenClaw Supported Channels" for the full matrix and setup links.',
  },
  {
    question: 'Can I self-host OpenClaw?',
    answer: 'Yes. Self-hosting is the default. Local (Mac/Linux/Windows), Docker Compose, a VPS, or cloud platforms (AWS, Alibaba, Tencent) all work. Tutorials cover each path.',
  },
  {
    question: 'How is OpenClaw different from ChatGPT or Claude Code?',
    answer: 'OpenClaw is an agent runtime — it can execute Skills, call external APIs, run scripts, and persist state. ChatGPT is a chat interface; Claude Code is a coding CLI. See the OpenClaw vs Claude Code and OpenClaw vs ChatGPT comparison guides.',
  },
  {
    question: 'How often are tutorials updated?',
    answer: 'Editorial team reviews tutorials quarterly and after every major OpenClaw release. Articles show a "Last updated" date and version compatibility where relevant.',
  },
];

const SITE_URL = 'https://openclaw101.vip';

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'OpenClaw Tutorial (2026) – Beginner to Advanced Guide',
    description: 'The complete OpenClaw tutorial — from installation and first bot to advanced automation. 60+ step-by-step guides covering Docker setup, Telegram/QQ/WhatsApp bots, cloud deployment, and workflows.',
    openGraph: {
      title: 'OpenClaw Tutorial (2026) – Beginner to Advanced Guide',
      description: 'Docker setup, Telegram bots, cloud deployment, and advanced automation. 60+ curated tutorials.',
      url: `${SITE_URL}/tutorials`,
      locale: 'en_US',
    },
    alternates: {
      canonical: `${SITE_URL}/tutorials`,
      languages: {
        en: `${SITE_URL}/en/tutorials`,
        zh: `${SITE_URL}/zh/tutorials`,
        'x-default': `${SITE_URL}/en/tutorials`,
      },
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

      {/* FAQ */}
      <FAQSection items={TUTORIALS_FAQ} title="OpenClaw Tutorial FAQ" />

      {/* Next-step CTA band */}
      <section className="py-16 border-t border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white">Ready to build?</h2>
          <p className="mt-3 text-[#9CA3AF]">Pick your next step — each link is a standalone guide.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <Link href="/blog/how-to-install-openclaw" className="block rounded-xl border border-white/[0.08] bg-surface p-5 hover:border-brand/50 transition-colors">
              <div className="text-white font-semibold">Install OpenClaw</div>
              <div className="mt-1 text-sm text-[#9CA3AF]">Mac / Linux / Windows — from zero to running agent in 10 min.</div>
            </Link>
            <Link href="/blog/how-to-create-telegram-bot" className="block rounded-xl border border-white/[0.08] bg-surface p-5 hover:border-brand/50 transition-colors">
              <div className="text-white font-semibold">Build a Telegram Bot</div>
              <div className="mt-1 text-sm text-[#9CA3AF]">Step-by-step guide to your first working bot.</div>
            </Link>
            <Link href="/blog/openclaw-qq-bot-native-integration" className="block rounded-xl border border-white/[0.08] bg-surface p-5 hover:border-brand/50 transition-colors">
              <div className="text-white font-semibold">Setup OpenClaw QQ Bot</div>
              <div className="mt-1 text-sm text-[#9CA3AF]">Native QQ integration, 3-step deployment.</div>
            </Link>
            <Link href="/blog/best-openclaw-skills-2026" className="block rounded-xl border border-white/[0.08] bg-surface p-5 hover:border-brand/50 transition-colors">
              <div className="text-white font-semibold">Best Skills for 2026</div>
              <div className="mt-1 text-sm text-[#9CA3AF]">25 must-install ClawHub Skills, by category.</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

