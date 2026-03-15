'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 sm:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 text-white/20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-white/20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles size={60} />
      </motion.div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm mb-6">
            {t('subtitle')}
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('title')}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/tutorials">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/skills">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {t('learnMore')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
