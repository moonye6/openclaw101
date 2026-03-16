'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Cpu, Rocket } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-24 sm:py-32">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 text-blue-400/30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Sparkles size={48} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-purple-400/30"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Cpu size={64} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 text-cyan-400/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        <Rocket size={40} />
      </motion.div>

      <div className="container relative mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur-sm mb-8">
            <BookOpen className="w-4 h-4" />
            {t('badge')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="block">{t('title')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t('subtitle')}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white">414+</div>
            <div className="text-sm text-gray-300">{t('stats.tutorials')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5,490+</div>
            <div className="text-sm text-gray-300">{t('stats.skills')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">314k+</div>
            <div className="text-sm text-gray-300">{t('stats.stars')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-300">{t('stats.openSource')}</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/tutorials">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25 px-8"
            >
              {t('cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/skills">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-400/50 bg-transparent text-white hover:bg-blue-500/10 hover:border-blue-400 px-8"
            >
              {t('learnMore')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
