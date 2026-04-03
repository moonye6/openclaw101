'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Layers, Shield, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const features = [
  {
    icon: Globe,
    key: 'multiplatform',
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'group-hover:shadow-blue-500/20',
    href: '/blog/how-to-create-telegram-bot',
  },
  {
    icon: Layers,
    key: 'skills',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'group-hover:shadow-purple-500/20',
    href: '/blog/telegram-automation-guide',
  },
  {
    icon: Shield,
    key: 'selfhosted',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'group-hover:shadow-emerald-500/20',
    href: '/blog/telegram-bot-examples',
  },
];

export function FeaturesSection() {
  const t = useTranslations('home.features');

  return (
    <section className="py-24 bg-[#0B0F19]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={feature.href as Parameters<typeof Link>[0]['href']}>
                  <div className={`relative rounded-xl border border-white/[0.08] bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-xl ${feature.glow}`}>
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-white">
                      {t(`${feature.key}.title`)}
                    </h3>
                    <p className="mt-3 text-text-secondary leading-relaxed">
                      {t(`${feature.key}.description`)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-brand-light opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
