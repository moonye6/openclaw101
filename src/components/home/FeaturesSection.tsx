'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Bot, Layers, Rocket, Globe, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Globe,
    key: 'multiplatform',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Layers,
    key: 'skills',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    key: 'selfhosted',
    color: 'from-green-500 to-emerald-500',
  },
];

export function FeaturesSection() {
  const t = useTranslations('home.features');

  return (
    <section className="py-24 bg-white">
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
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl"
                  style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                />
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-gray-900">
                    {t(`${feature.key}.title`)}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {t(`${feature.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
