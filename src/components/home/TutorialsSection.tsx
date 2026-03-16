'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

const featuredTutorials = [
  {
    id: '1',
    title: 'OpenClaw 官方文档',
    description: '完整的 API 参考、配置指南和架构说明',
    url: 'https://docs.openclaw.ai',
    source: 'OpenClaw',
    category: 'official',
    language: 'en',
  },
  {
    id: '2',
    title: '阿里云 — 部署 OpenClaw 构建钉钉 AI 助理',
    description: '轻量应用服务器一键部署，可视化配置面板接入钉钉',
    url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw',
    source: '阿里云',
    category: 'cloud-deploy',
    language: 'zh',
  },
  {
    id: '3',
    title: 'freeCodeCamp — OpenClaw Full Tutorial for Beginners',
    description: '从被动聊天到主动 Agent 的转变，freeCodeCamp 出品的全面入门教程',
    url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/',
    source: 'freeCodeCamp',
    category: 'getting-started',
    language: 'en',
  },
  {
    id: '4',
    title: 'OpenClaw 海量全玩法攻略',
    description: 'B站详细视频教程，涵盖所有主要功能和配置',
    url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/',
    source: 'Bilibili',
    category: 'videos',
    language: 'zh',
  },
  {
    id: '5',
    title: 'IBM Think — OpenClaw: The Viral "Space Lobster" Agent',
    description: 'IBM 深度分析 OpenClaw 的架构创新和垂直集成策略',
    url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration',
    source: 'IBM',
    category: 'deep-dives',
    language: 'en',
  },
  {
    id: '6',
    title: 'ClawHub 技能开发文档',
    description: '如何创建、发布和管理自定义技能',
    url: 'https://docs.openclaw.ai/tools/clawhub',
    source: 'OpenClaw Docs',
    category: 'skills',
    language: 'en',
  },
];

const categoryColors: Record<string, string> = {
  'official': 'bg-blue-500',
  'cloud-deploy': 'bg-cyan-500',
  'getting-started': 'bg-green-500',
  'channels': 'bg-purple-500',
  'skills': 'bg-orange-500',
  'videos': 'bg-red-500',
  'deep-dives': 'bg-indigo-500',
  'tools': 'bg-yellow-500',
};

export function TutorialsSection() {
  const t = useTranslations('home.tutorials');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('title')}</h2>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${categoryColors[tutorial.category]}`} />
                    <span className="text-xs text-gray-600">{tutorial.source}</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {tutorial.language === 'en' ? 'EN' : '中文'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {tutorial.description}
                  </p>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/tutorials">
            <Button 
              size="lg" 
              className="bg-gray-900 text-white hover:bg-gray-800 px-6"
            >
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
