'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { InternalLinks } from '@/components/ui';
import {
  BookOpen, ArrowRight, Zap, Bot, Cpu, Brain,
  CheckCircle, Rocket, Lightbulb, Wrench,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export function GuideContent() {
  const t = useTranslations('guide');

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B0F19] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-2 text-sm font-medium text-brand-light mb-6"
            {...fadeUp}
          >
            <BookOpen className="w-4 h-4" />
            {t('badge')}
          </motion.span>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
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

          {/* Quick CTA row */}
          <motion.div className="mt-10 flex flex-wrap justify-center gap-4" {...fadeUp} transition={{ delay: 0.3 }}>
            <Link href="/learn/1">
              <span className="inline-flex items-center gap-2 rounded-xl bg-brand text-white px-6 py-3 text-sm font-medium shadow-lg shadow-brand/25 hover:bg-brand-light transition-colors">
                <Rocket className="w-4 h-4" />{t('cta.startDay1')}
              </span>
            </Link>
            <Link href="/use-cases">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 text-white px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors">
                <Lightbulb className="w-4 h-4" />{t('cta.viewUseCases')}
              </span>
            </Link>
            <Link href="/examples">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 text-white px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors">
                <Zap className="w-4 h-4" />{t('cta.viewExamples')}
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TOC */}
      <section className="bg-[#0B0F19] py-12 border-b border-white/[0.06]">
        <div className="container mx-auto px-4">
          <motion.div
            className="rounded-xl border border-white/[0.08] bg-surface p-6 max-w-2xl mx-auto"
            {...fadeUp}
          >
            <h2 className="text-lg font-semibold text-white mb-4">{t('toc.title')}</h2>
            <nav className="grid sm:grid-cols-2 gap-2">
              {(['why', 'getStarted', 'create', 'useCases', 'automation', 'advanced', 'faq'] as const).map((id, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-light transition-colors py-1"
                >
                  <span className="text-brand-light font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
                  {t(`toc.${id}`)}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Why AI Agents Matter */}
      <section id="why" className="bg-[#0B0F19] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-6">{t('sections.whyTitle')}</h2>
            <p className="text-text-secondary leading-relaxed mb-8">{t('sections.whyDescription')}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Bot, text: t('sections.whyBullet1') },
                { icon: Cpu, text: t('sections.whyBullet2') },
                { icon: Brain, text: t('sections.whyBullet3') },
                { icon: Zap, text: t('sections.whyBullet4') },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-surface p-4"
                >
                  <item.icon className="w-5 h-5 text-brand-light flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getStarted" className="bg-[#0d1117] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-4">{t('sections.getStartedTitle')}</h2>
            <p className="text-text-secondary leading-relaxed mb-8">{t('sections.getStartedDescription')}</p>
            <div className="space-y-3">
              {(['getStartedStep1', 'getStartedStep2', 'getStartedStep3', 'getStartedStep4'] as const).map((key, i) => (
                <div key={key} className="flex items-center gap-4 rounded-xl border border-white/[0.08] bg-surface px-5 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand-light text-sm font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-white">{t(`sections.${key}`)}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/learn/1" className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium text-sm transition-colors">
                {t('cta.startDay1')}<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Create Your First Agent */}
      <section id="create" className="bg-[#0B0F19] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-8">{t('sections.createTitle')}</h2>
            <div className="space-y-6">
              {([
                { step: 'createStep1', icon: Lightbulb },
                { step: 'createStep2', icon: Wrench },
                { step: 'createStep3', icon: Brain },
                { step: 'createStep4', icon: Rocket },
              ] as const).map((item, i) => (
                <div key={item.step} className="rounded-xl border border-white/[0.08] bg-surface p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand-light text-sm font-bold">{i + 1}</span>
                    <h3 className="text-lg font-semibold text-white">{t(`sections.${item.step}Title`)}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-11">{t(`sections.${item.step}Description`)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Quick Links */}
      <section id="useCases" className="bg-[#0d1117] py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-4">{t('toc.useCases')}</h2>
            <p className="text-text-secondary mb-8">
              {t('sections.whyDescription').substring(0, 80)}…
            </p>
            <Link href="/use-cases">
              <span className="inline-flex items-center gap-2 rounded-xl bg-brand text-white px-6 py-3 text-sm font-medium shadow-lg shadow-brand/25 hover:bg-brand-light transition-colors">
                {t('cta.viewUseCases')}<ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Automation */}
      <section id="automation" className="bg-[#0B0F19] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-4">{t('sections.automationTitle')}</h2>
            <p className="text-text-secondary leading-relaxed mb-8">{t('sections.automationDescription')}</p>
            <div className="space-y-3">
              {(['automationScheduled', 'automationTrigger', 'automationMultiStep'] as const).map((key) => (
                <div key={key} className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-surface p-4">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">{t(`sections.${key}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced */}
      <section id="advanced" className="bg-[#0d1117] py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-8">{t('sections.advancedTitle')}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(['advancedMultiAgent', 'advancedRAG', 'advancedFunctions', 'advancedMemory'] as const).map((key) => (
                <div key={key} className="rounded-xl border border-white/[0.08] bg-surface p-5">
                  <p className="text-sm text-white leading-relaxed">{t(`sections.${key}`)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/skills" className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium text-sm transition-colors">
                {t('cta.browseSkills')}<ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/examples" className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium text-sm transition-colors">
                {t('cta.viewExamples')}<ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ anchor */}
      <section id="faq" className="bg-[#0B0F19] py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold text-white mb-4">{t('toc.faq')}</h2>
            <p className="text-text-secondary mb-8">
              {t('subtitle')}
            </p>
            <Link href="/blog/ai-agent-guide">
              <span className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium text-sm transition-colors">
                {t('cta.viewExamples')}<ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Internal Links */}
      <div className="bg-[#0d1117]">
        <InternalLinks current="guide" />
      </div>
    </div>
  );
}
