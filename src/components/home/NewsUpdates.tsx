'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Newspaper, Zap, Tag, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { Link } from '@/i18n/routing';

const newsItems = [
  {
    key: 'news1',
    type: 'release',
    icon: Tag,
    color: 'bg-brand/15 text-brand-light border-brand/20',
    date: '2026-03-15',
  },
  {
    key: 'news2',
    type: 'community',
    icon: TrendingUp,
    color: 'bg-success/15 text-success border-success/20',
    date: '2026-03-12',
  },
  {
    key: 'news3',
    type: 'feature',
    icon: Zap,
    color: 'bg-accent/15 text-accent border-accent/20',
    date: '2026-03-08',
  },
  {
    key: 'news4',
    type: 'milestone',
    icon: TrendingUp,
    color: 'bg-warning/15 text-warning border-warning/20',
    date: '2026-03-01',
  },
];

export function NewsUpdates() {
  const t = useTranslations('home.news');

  return (
    <section className="py-24 bg-surface/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Newspaper className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* News Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-accent to-success hidden md:block" />

            <div className="space-y-6">
              {newsItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    className="relative flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${item.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-surface rounded-xl border border-white/[0.08] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15] hover:shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.color} border`}>
                          {t(`types.${item.type}`)}
                        </span>
                        <div className="flex items-center gap-1 text-text-muted text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-1">
                        {t(`${item.key}.title`)}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {t(`${item.key}.description`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Blog CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium transition-colors"
          >
            <span>{t('viewAllCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
