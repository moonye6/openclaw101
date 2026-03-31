'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, FileCode, Globe, Puzzle, Clock, Rocket, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const days = [
  { day: 1, icon: BookOpen, emoji: '👋', key: 'day1', gradient: 'from-blue-500 to-blue-600' },
  { day: 2, icon: MessageSquare, emoji: '💬', key: 'day2', gradient: 'from-violet-500 to-violet-600' },
  { day: 3, icon: FileCode, emoji: '📁', key: 'day3', gradient: 'from-emerald-500 to-emerald-600' },
  { day: 4, icon: Globe, emoji: '🌐', key: 'day4', gradient: 'from-cyan-500 to-cyan-600' },
  { day: 5, icon: Puzzle, emoji: '🧩', key: 'day5', gradient: 'from-orange-500 to-orange-600' },
  { day: 6, icon: Clock, emoji: '⏰', key: 'day6', gradient: 'from-pink-500 to-pink-600' },
  { day: 7, icon: Rocket, emoji: '🚀', key: 'day7', gradient: 'from-indigo-500 to-indigo-600' },
];

export function LearningPath() {
  const t = useTranslations('home.learningPath');

  return (
    <section className="py-24 bg-surface/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
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

        {/* Horizontal scroll timeline */}
        <div className="relative">
          <div className="overflow-x-auto scroll-container pb-4 -mx-4 px-4">
            <div className="flex gap-5 min-w-max">
              {days.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    className="flex-shrink-0 w-[260px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Link href={`/learn/${item.day}`} className="block h-full">
                      <div className="group h-full rounded-xl border border-white/[0.08] bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5">
                        {/* Top: day circle + number */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                            <span className="text-xl">{item.emoji}</span>
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                              Day {item.day}
                            </span>
                            <Icon className="w-4 h-4 text-text-muted mt-0.5 group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-base font-semibold text-white group-hover:text-brand-light transition-colors mb-2">
                          {t(`${item.key}.title`)}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                          {t(`${item.key}.description`)}
                        </p>

                        {/* Hover CTA */}
                        <div className="mt-4 flex items-center text-sm text-brand-light font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>{t('viewTutorial')}</span>
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-surface/50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-surface/50 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
