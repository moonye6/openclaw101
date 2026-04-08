'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Shield, Puzzle } from 'lucide-react';

export function WhatIsOpenClaw() {
  const t = useTranslations('whatIsOpenClaw');

  const highlights = [
    {
      icon: Globe,
      title: t('highlight1Title'),
      description: t('highlight1Desc'),
      color: 'text-brand-light',
      bg: 'bg-brand/10',
      border: 'border-brand/20',
    },
    {
      icon: Shield,
      title: t('highlight2Title'),
      description: t('highlight2Desc'),
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
    },
    {
      icon: Puzzle,
      title: t('highlight3Title'),
      description: t('highlight3Desc'),
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/20',
    },
  ];

  return (
    <section className="py-20 bg-[#0B0F19]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            {t('title')}
          </h2>

          <div className="space-y-5 text-text-secondary leading-relaxed text-lg">
            <p>{t('paragraph1')}</p>
            <p>{t('paragraph2')}</p>
            <p>{t('paragraph3')}</p>
          </div>
        </motion.div>

        {/* Key Highlights */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className={`p-6 rounded-xl border ${item.border} ${item.bg} backdrop-blur-sm`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
