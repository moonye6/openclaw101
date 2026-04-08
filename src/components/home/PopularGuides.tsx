'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function PopularGuides() {
  const t = useTranslations('popularGuides');

  const guides = [
    { key: 'guide1', slug: t('guide1.slug') },
    { key: 'guide2', slug: t('guide2.slug') },
    { key: 'guide3', slug: t('guide3.slug') },
    { key: 'guide4', slug: t('guide4.slug') },
    { key: 'guide5', slug: t('guide5.slug') },
    { key: 'guide6', slug: t('guide6.slug') },
  ];

  return (
    <section className="py-20 bg-surface/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/blog/${guide.slug}`}
                className="block p-6 rounded-xl border border-white/[0.08] bg-surface hover:border-white/[0.15] hover:bg-white/[0.02] transition-all group h-full"
              >
                <h3 className="text-white font-semibold mb-2 group-hover:text-brand-light transition-colors leading-snug">
                  {t(`${guide.key}.title`)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {t(`${guide.key}.description`)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-light group-hover:gap-2 transition-all">
                  {t('readGuide')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
