'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, FileCode, Globe, Puzzle, Clock, Rocket } from 'lucide-react';

const days = [
  { day: 1, icon: BookOpen, emoji: '👋', key: 'day1', color: 'from-blue-500 to-blue-600' },
  { day: 2, icon: MessageSquare, emoji: '💬', key: 'day2', color: 'from-violet-500 to-violet-600' },
  { day: 3, icon: FileCode, emoji: '📁', key: 'day3', color: 'from-emerald-500 to-emerald-600' },
  { day: 4, icon: Globe, emoji: '🌐', key: 'day4', color: 'from-cyan-500 to-cyan-600' },
  { day: 5, icon: Puzzle, emoji: '🧩', key: 'day5', color: 'from-orange-500 to-orange-600' },
  { day: 6, icon: Clock, emoji: '⏰', key: 'day6', color: 'from-pink-500 to-pink-600' },
  { day: 7, icon: Rocket, emoji: '🚀', key: 'day7', color: 'from-indigo-500 to-indigo-600' },
];

export function LearningPath() {
  const t = useTranslations('home.learningPath');

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
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

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 hidden md:block" />

          <div className="space-y-6">
            {days.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  className="relative flex items-start gap-6 md:gap-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  {/* Day circle */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">{item.emoji}</span>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Day {item.day}
                      </span>
                      <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(`${item.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      {t(`${item.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
