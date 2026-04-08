'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, Flame, Clock, BarChart } from 'lucide-react';
import { InternalLinks } from '@/components/ui';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

interface ExampleProject {
  id: string;
  href: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  emoji: string;
}

const projects: ExampleProject[] = [
  { id: 'project1', href: '/blog/how-to-create-telegram-bot', level: 'beginner', emoji: '🤖' },
  { id: 'project2', href: '/blog/telegram-bot-examples', level: 'beginner', emoji: '💡' },
  { id: 'project3', href: '/blog/telegram-automation-guide', level: 'intermediate', emoji: '⚡' },
  { id: 'project4', href: '/use-cases/coding-assistant', level: 'beginner', emoji: '💻' },
  { id: 'project5', href: '/use-cases/smart-home', level: 'intermediate', emoji: '🏠' },
  { id: 'project6', href: '/use-cases/research-analysis', level: 'intermediate', emoji: '📊' },
];

const levelColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-error/10 text-error border-error/20',
};

export function ExamplesContent() {
  const t = useTranslations('examples');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-error/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-error/10 border border-error/20 px-4 py-2 text-sm font-medium text-error mb-6"
            {...fadeUp}
          >
            <Flame className="w-4 h-4" />
            {t('badge')}
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white"
            {...fadeUp}
            transition={{ delay: 0.1 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto"
            {...fadeUp}
            transition={{ delay: 0.2 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-[#0B0F19] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                {...fadeUp}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={project.href as Parameters<typeof Link>[0]['href']}
                  className="group flex flex-col h-full rounded-xl border border-white/[0.08] bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                >
                  <div className="p-6">
                    {/* Header with emoji and badges */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{project.emoji}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${levelColors[project.level]}`}>
                        <BarChart className="w-3 h-3" />
                        {t(`levels.${project.level}`)}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h2 className="text-lg font-semibold text-white mb-2">
                      {t(`${project.id}.title`)}
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {t(`${project.id}.description`)}
                    </p>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t('timeToComplete')}: {t(`${project.id}.time`)}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-white/[0.06] mt-auto flex items-center justify-between">
                    <span className="text-xs text-brand-light font-medium">{t('startBuilding')}</span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-light transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* More coming soon */}
          <motion.p className="text-center text-sm text-text-muted mt-10" {...fadeUp}>
            {t('moreExamples')}
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap justify-center gap-4 mt-8" {...fadeUp}>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium text-sm transition-colors"
            >
              {t('ctaGuide')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium text-sm transition-colors"
            >
              {t('ctaUseCases')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <div className="bg-[#0d1117]">
        <InternalLinks current="examples" />
      </div>
    </div>
  );
}
