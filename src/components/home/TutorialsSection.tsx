'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

const categoryColors: Record<string, string> = {
  'official': 'bg-brand',
  'cloud-deploy': 'bg-accent',
  'getting-started': 'bg-success',
  'channels': 'bg-purple-500',
  'skills': 'bg-warning',
  'videos': 'bg-red-500',
  'deep-dives': 'bg-indigo-500',
  'tools': 'bg-amber-500',
};

export function TutorialsSection() {
  const t = useTranslations('home.tutorials');

  const featuredTutorials = [
    {
      id: '1',
      title: t('featured1.title'),
      description: t('featured1.description'),
      url: 'https://docs.openclaw.ai',
      source: 'OpenClaw',
      category: 'official',
      language: 'en',
    },
    {
      id: '2',
      title: t('featured2.title'),
      description: t('featured2.description'),
      url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw',
      source: '阿里云',
      category: 'cloud-deploy',
      language: 'zh',
    },
    {
      id: '3',
      title: t('featured3.title'),
      description: t('featured3.description'),
      url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/',
      source: 'freeCodeCamp',
      category: 'getting-started',
      language: 'en',
    },
    {
      id: '4',
      title: t('featured4.title'),
      description: t('featured4.description'),
      url: 'https://www.bilibili.com/video/BV1kH6nBFEPq/',
      source: 'Bilibili',
      category: 'videos',
      language: 'zh',
    },
    {
      id: '5',
      title: t('featured5.title'),
      description: t('featured5.description'),
      url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration',
      source: 'IBM',
      category: 'deep-dives',
      language: 'en',
    },
    {
      id: '6',
      title: t('featured6.title'),
      description: t('featured6.description'),
      url: 'https://docs.openclaw.ai/tools/clawhub',
      source: 'OpenClaw Docs',
      category: 'skills',
      language: 'en',
    },
  ];

  return (
    <section className="py-24 bg-surface/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">{t('title')}</h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
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
              <Card className="h-full">
                <a
                  href={tutorial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full ${categoryColors[tutorial.category]}`} />
                    <span className="text-xs text-text-muted">{tutorial.source}</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {tutorial.language === 'en' ? 'EN' : '中文'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-white line-clamp-2 group-hover:text-brand-light transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                    {tutorial.description}
                  </p>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/tutorials">
            <Button 
              size="lg" 
              className="bg-brand text-white hover:bg-brand-light px-8"
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
