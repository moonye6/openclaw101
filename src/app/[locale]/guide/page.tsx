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
    title: isZh
      ? 'AI Agent 入门指南 — 一步步构建你的第一个 AI 智能体 | OpenClaw 101'
      : 'AI Agent Guide — Build Your First AI Agent Step by Step | OpenClaw 101',
    description: isZh
      ? '学习如何使用 OpenClaw 构建你的第一个 AI 智能体。分步新手指南，包含真实案例，无需编程。立即开始！'
      : 'Learn how to build your first AI agent with OpenClaw. Step-by-step beginner guide with real examples, no coding required. Start today!',
    openGraph: {
      title: isZh
        ? 'AI Agent 入门指南 — 构建你的第一个 AI 智能体'
        : 'AI Agent Guide — Build Your First AI Agent',
      description: isZh
        ? '完整的新手友好指南，使用 OpenClaw 构建 AI 智能体。'
        : 'A complete beginner-friendly guide to building AI agents with OpenClaw.',
      url: `${SITE_URL}/${locale}/guide`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/guide`,
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
