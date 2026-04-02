'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

function TerminalMock() {
  return (
    <motion.div
      className="w-full rounded-xl border border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-brand/10 overflow-hidden"
      initial={{ opacity: 0, y: 30, rotateX: 5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-2 text-xs text-text-muted font-mono">terminal</span>
      </div>
      {/* Terminal body */}
      <div className="p-5 font-mono text-sm space-y-3">
        {/* Line 1: User command */}
        <motion.div
          className="flex items-start gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-success flex-shrink-0">❯</span>
          <span className="text-white">claw write a python web scraper</span>
        </motion.div>
        
        {/* Line 2: AI response */}
        <motion.div
          className="text-text-secondary pl-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-accent">AI</span>
          <span className="text-text-muted"> → </span>
          <span>Generating code...</span>
        </motion.div>

        {/* Code block */}
        <motion.div
          className="ml-5 rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 text-xs"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <div><span className="text-[#ff7b72]">import</span> <span className="text-[#79c0ff]">requests</span></div>
          <div><span className="text-[#ff7b72]">from</span> <span className="text-[#79c0ff]">bs4</span> <span className="text-[#ff7b72]">import</span> <span className="text-white">BeautifulSoup</span></div>
          <div className="mt-1"><span className="text-text-muted"># Scraping target URL...</span></div>
          <div><span className="text-[#d2a8ff]">def</span> <span className="text-[#d2a8ff]">scrape</span><span className="text-text-muted">(</span><span className="text-[#ffa657]">url</span><span className="text-text-muted">):</span></div>
          <div>  <span className="text-white">resp</span> <span className="text-text-muted">=</span> <span className="text-white">requests.get</span><span className="text-text-muted">(</span><span className="text-white">url</span><span className="text-text-muted">)</span></div>
          <div>  <span className="text-[#ff7b72]">return</span> <span className="text-white">BeautifulSoup</span><span className="text-text-muted">(</span><span className="text-white">resp.text</span><span className="text-text-muted">)</span></div>
        </motion.div>

        {/* Workflow nodes */}
        <motion.div
          className="ml-5 flex items-center gap-2 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <span className="px-2 py-1 rounded bg-brand/20 text-brand-light border border-brand/30">Parse</span>
          <span className="text-text-muted">→</span>
          <span className="px-2 py-1 rounded bg-accent/20 text-accent border border-accent/30">Extract</span>
          <span className="text-text-muted">→</span>
          <span className="px-2 py-1 rounded bg-success/20 text-success border border-success/30">Save</span>
        </motion.div>

        {/* Success */}
        <motion.div
          className="flex items-center gap-2 text-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <span>✓</span>
          <span className="text-xs">scraper.py saved · 42 lines</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

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

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-white">OpenClaw Tutorial</span>
              <br />
              <span className="text-gradient-brand">&amp; AI Agent Hub</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('subtitle')}
            </motion.p>

            {/* Stats tags */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="flex items-center gap-1.5 text-text-secondary">
                <Sparkles className="w-4 h-4 text-warning" />
                72 Skills
              </span>
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span className="text-text-secondary">414 Tutorials</span>
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span className="text-text-secondary">314k Stars</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/tutorials">
                <Button 
                  size="lg" 
                  className="bg-brand text-white hover:bg-brand-light shadow-lg shadow-brand/25 px-8"
                >
                  {t('cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/10 text-white hover:bg-white/5 hover:border-white/20 px-8"
                >
                  {t('learnMore')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right: Terminal Mock */}
          <div className="hidden lg:block">
            <TerminalMock />
          </div>
        </div>
      </div>
    </section>
  );
}
