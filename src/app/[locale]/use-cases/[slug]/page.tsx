import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllUseCaseSlugs, getUseCaseBySlug } from '@/data/use-cases';
import { UseCaseDetailContent } from '@/components/use-cases/UseCaseDetailContent';

const SITE_URL = 'https://openclaw101.vip';

export const revalidate = 3600;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const uc = getUseCaseBySlug(slug);

  if (!uc) return {};

  const isZh = locale === 'zh';
  const titles: Record<string, { en: string; zh: string }> = {
    coding: { en: 'Coding Assistant', zh: '编程助手' },
    research: { en: 'Research & Analysis', zh: '研究与分析' },
    automation: { en: 'Task Automation', zh: '任务自动化' },
    content: { en: 'Content Creation', zh: '内容创作' },
    smarthome: { en: 'Smart Home Control', zh: '智能家居控制' },
    data: { en: 'Data Processing', zh: '数据处理' },
  };

  const title = isZh ? titles[uc.key]?.zh : titles[uc.key]?.en;

  return {
    title: isZh
      ? `${title} — AI Agent 使用场景 | OpenClaw 101`
      : `${title} — AI Agent Use Case | OpenClaw 101`,
    description: isZh
      ? `了解如何使用 AI 智能体进行${title}。包含分步示例和命令。`
      : `Learn how to use AI agents for ${title}. Step-by-step examples and commands included.`,
    openGraph: {
      title: `${title} — AI Agent Use Case`,
      url: `${SITE_URL}/use-cases/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/use-cases/${slug}`,
      languages: {
        en: `${SITE_URL}/en/use-cases/${slug}`,
        zh: `${SITE_URL}/zh/use-cases/${slug}`,
        'x-default': `${SITE_URL}/en/use-cases/${slug}`,
      },
    },
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);

  if (!uc) notFound();

  return <UseCaseDetailContent slug={slug} />;
}
