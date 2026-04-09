'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-20 sm:py-28 lg:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/8 via-transparent to-transparent" />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container relative mx-auto px-4 max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 border border-brand/20 px-4 py-2 text-sm font-medium text-brand-light mb-8">
            <BookOpen className="w-4 h-4" />
            {t('badge')}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-white">OpenClaw Guides, Tutorials,</span>
          <br />
          <span className="text-gradient-brand">and Practical Examples</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA Buttons - only two, no emoji */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/guide">
            <Button
              size="lg"
              className="bg-brand text-white hover:bg-brand-light shadow-lg shadow-brand/25 px-8"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/examples">
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 hover:border-white/20 px-8"
            >
              {t('learnMore')}
            </Button>
          </Link>
        </motion.div>

        {/* Independent disclaimer */}
        <motion.p
          className="mt-6 text-xs text-text-muted/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          OpenClaw 101 is an independent educational resource and is not affiliated with the official OpenClaw team.
        </motion.p>
      </div>
    </section>
  );
}
