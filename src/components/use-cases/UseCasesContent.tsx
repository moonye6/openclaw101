'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { useCases } from '@/data/use-cases';
import { InternalLinks } from '@/components/ui';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function UseCasesContent() {
  const t = useTranslations('useCasesPage');
  const tHome = useTranslations('home.useCases');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warning/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-warning/10 border border-warning/20 px-4 py-2 text-sm font-medium text-warning mb-6"
            {...fadeUp}
          >
            <Lightbulb className="w-4 h-4" />
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

      {/* Use Case Grid */}
      <section className="bg-[#0B0F19] py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc, index) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={uc.slug}
                  {...fadeUp}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={`/use-cases/${uc.slug}` as Parameters<typeof Link>[0]['href']}
                    className="group flex flex-col h-full rounded-xl border border-white/[0.08] bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                  >
                    {/* Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 border border-brand/20">
                          <Icon className="h-5 w-5 text-brand-light" />
                        </div>
                        <div>
                          <span className="text-xs text-text-muted">{uc.emoji} {uc.category.toUpperCase()}</span>
                          <h2 className="text-base font-semibold text-white">
                            {tHome(`${uc.key}.title`)}
                          </h2>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {tHome(`${uc.key}.description`)}
                      </p>
                    </div>

                    {/* Commands preview */}
                    <div className="px-6 pb-4 mt-auto">
                      <div className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
                        {t('exampleCommands')}
                      </div>
                      <div className="space-y-1.5">
                        {uc.commands.slice(0, 2).map((cmd, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs font-mono text-text-secondary bg-white/[0.03] px-3 py-2 rounded-lg border border-white/[0.04]"
                          >
                            <span className="text-success flex-shrink-0">$</span>
                            <span className="truncate">{cmd}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs text-brand-light font-medium">{t('tryNow')}</span>
                      <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-light transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA to Guide */}
          <motion.div className="text-center mt-12" {...fadeUp}>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium transition-colors"
            >
              {t('viewGuide')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <div className="bg-[#0d1117]">
        <InternalLinks current="use-cases" />
      </div>
    </div>
  );
}
