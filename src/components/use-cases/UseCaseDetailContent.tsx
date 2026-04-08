'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowLeft, Terminal } from 'lucide-react';
import { getUseCaseBySlug } from '@/data/use-cases';
import { InternalLinks } from '@/components/ui';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

interface UseCaseDetailContentProps {
  slug: string;
}

export function UseCaseDetailContent({ slug }: UseCaseDetailContentProps) {
  const t = useTranslations('useCasesPage');
  const tHome = useTranslations('home.useCases');
  const uc = getUseCaseBySlug(slug);

  if (!uc) return null;

  const Icon = uc.icon;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4">
          {/* Back Link */}
          <motion.div className="mb-8" {...fadeUp}>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToUseCases')}
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div className="flex items-center gap-4 mb-6" {...fadeUp} transition={{ delay: 0.1 }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 border border-brand/20">
                <Icon className="h-7 w-7 text-brand-light" />
              </div>
              <div>
                <span className="text-xs text-text-muted">{uc.emoji} {uc.category.toUpperCase()}</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {tHome(`${uc.key}.title`)}
                </h1>
              </div>
            </motion.div>

            <motion.p
              className="text-lg text-text-secondary leading-relaxed"
              {...fadeUp}
              transition={{ delay: 0.2 }}
            >
              {t(`${uc.key}.longDescription`)}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section className="bg-[#0d1117] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-5 h-5 text-brand-light" />
              <h2 className="text-xl font-bold text-white">{t('exampleCommands')}</h2>
            </div>
            <div className="space-y-3">
              {uc.commands.map((cmd, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 font-mono text-sm text-text-secondary bg-white/[0.03] px-5 py-3 rounded-xl border border-white/[0.06]"
                >
                  <span className="text-success flex-shrink-0">$</span>
                  <span>{cmd}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Tutorials */}
      <section className="bg-[#0B0F19] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-xl font-bold text-white mb-6">{t('relatedTutorials')}</h2>
            <div className="space-y-3">
              {uc.relatedTutorials.map((tutorial) => (
                <Link
                  key={tutorial.href}
                  href={tutorial.href as Parameters<typeof Link>[0]['href']}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-surface px-5 py-4 transition-all hover:border-brand/30 hover:bg-brand/5"
                >
                  <span className="text-sm font-medium text-white">
                    {t(`tutorialLabels.${tutorial.labelKey}`)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-light transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Skills */}
      <section className="bg-[#0d1117] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-xl font-bold text-white mb-6">{t('relatedSkills')}</h2>
            <div className="flex flex-wrap gap-3">
              {uc.relatedSkills.map((skill) => (
                <Link
                  key={skill}
                  href="/skills"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/[0.05] border border-white/[0.08] px-4 py-2 text-sm text-text-secondary hover:text-white hover:border-brand/30 transition-all"
                >
                  <span className="text-brand-light">@</span>
                  {skill}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/guide">
                <span className="inline-flex items-center gap-2 rounded-xl bg-brand text-white px-6 py-3 text-sm font-medium shadow-lg shadow-brand/25 hover:bg-brand-light transition-colors">
                  {t('viewGuide')}<ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/skills">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 text-white px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors">
                  {t('relatedSkills')}<ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <div className="bg-[#0B0F19]">
        <InternalLinks current="use-cases" />
      </div>
    </div>
  );
}
