import { Metadata } from 'next';
import { UseCasesContent } from '@/components/use-cases/UseCasesContent';

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
      ? 'AI Agent 使用场景 — 真实自动化案例 | OpenClaw 101'
      : 'AI Agent Use Cases — Real-World Automation Examples | OpenClaw 101',
    description: isZh
      ? '探索真实的 AI Agent 使用场景：编程助手、研究分析、任务自动化、内容创作、智能家居和数据处理。'
      : 'Explore real AI agent use cases: coding assistant, research, task automation, content creation, smart home, and data processing.',
    openGraph: {
      title: isZh ? 'AI Agent 使用场景' : 'AI Agent Use Cases',
      description: isZh
        ? '发现人们如何在现实中使用 AI 智能体。'
        : 'Discover how people use AI agents in real life.',
      url: `${SITE_URL}/${locale}/use-cases`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/use-cases`,
    },
  };
}

export default function UseCasesPage() {
  return <UseCasesContent />;
}
