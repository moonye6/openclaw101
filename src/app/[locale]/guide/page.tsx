import { Metadata } from 'next';
import { GuideContent } from '@/components/guide/GuideContent';
import { JsonLd } from '@/components/seo/JsonLd';

const SITE_URL = 'https://openclaw101.vip';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return {
    title: 'OpenClaw Beginner Guide — Install, Configure & Run Your First AI Agent (2026)',
    description: 'Complete beginner tutorial for OpenClaw. Install on Mac/Linux/Windows, connect to Claude or GPT, set up Telegram bot, and run your first automation. No coding required.',
    openGraph: {
      title: 'OpenClaw Beginner Guide — Your First AI Agent in 10 Minutes',
      description: 'Install OpenClaw, connect to Claude or GPT, set up Telegram, run your first automation. No coding required.',
      url: `${SITE_URL}/guide`,
    },
    alternates: {
      canonical: `${SITE_URL}/guide`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isZh
      ? 'AI Agent 入门指南 — 构建你的第一个 AI 智能体'
      : 'AI Agent Guide — Build Your First AI Agent Step by Step',
    description: isZh
      ? '完整的新手友好指南，使用 OpenClaw 构建 AI 智能体。'
      : 'A complete beginner-friendly guide to building AI agents with OpenClaw.',
    author: { '@type': 'Organization', name: 'OpenClaw 101' },
    publisher: { '@type': 'Organization', name: 'OpenClaw 101', url: SITE_URL },
    url: `${SITE_URL}/${locale}/guide`,
    datePublished: '2026-04-07',
    dateModified: '2026-04-07',
    mainEntityOfPage: `${SITE_URL}/${locale}/guide`,
  };

  return (
    <div>
      <JsonLd data={articleJsonLd} />
      <GuideContent />
    </div>
  );
}
