'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Bot, Layers, Rocket } from 'lucide-react';

const features = [
  {
    icon: Bot,
    key: 'automation',
  },
  {
    icon: Layers,
    key: 'skills',
  },
  {
    icon: Rocket,
    key: 'deploy',
  },
];

export function FeaturesSection() {
  const t = useTranslations('home.features');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                className="relative rounded-2xl bg-white p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="mt-2 text-gray-600">
                  {t(`${feature.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
