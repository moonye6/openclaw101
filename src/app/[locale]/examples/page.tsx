import { Metadata } from 'next';
import { ExamplesContent } from '@/components/examples/ExamplesContent';

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
      ? 'AI Agent 实战案例 — 构建真实项目 | OpenClaw 101'
      : 'AI Agent Examples — Build Real Projects | OpenClaw 101',
    description: isZh
      ? '探索真实 AI Agent 案例：Telegram Bot、自动化工作流、编程助手等。包含分步教程。'
      : 'Explore real AI agent examples: Telegram bots, automation workflows, coding assistants, and more. Step-by-step instructions included.',
    openGraph: {
      title: isZh ? 'AI Agent 实战案例' : 'AI Agent Examples',
      description: isZh
        ? '真实的 AI 智能体项目，今天就能开始构建。'
        : 'Real-world AI agent projects you can build today.',
      url: `${SITE_URL}/examples`,
    },
    alternates: {
      canonical: `${SITE_URL}/examples`,
      languages: {
        en: `${SITE_URL}/en/examples`,
        zh: `${SITE_URL}/zh/examples`,
        'x-default': `${SITE_URL}/en/examples`,
      },
    },
  };
}

export default function ExamplesPage() {
  return <ExamplesContent />;
}
