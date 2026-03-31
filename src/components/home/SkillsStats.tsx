'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Globe, MessageSquare, Search, Zap, Brain, LineChart, Flame, Sparkles, Star } from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

// Skill categories data
const skillCategories = [
  { id: 'ai-llm', icon: Brain, count: 159 },
  { id: 'research', icon: Search, count: 148 },
  { id: 'devops', icon: Zap, count: 144 },
  { id: 'marketing', icon: LineChart, count: 94 },
  { id: 'coding', icon: Code, count: 55 },
  { id: 'communication', icon: MessageSquare, count: 58 },
  { id: 'notes', icon: MessageSquare, count: 61 },
  { id: 'web', icon: Globe, count: 46 },
];

const totalSkills = 5490;

// Featured skill tabs
const featuredTabs = [
  { key: 'popular', icon: Flame, label: '🔥 Popular' },
  { key: 'new', icon: Sparkles, label: '🆕 New' },
  { key: 'recommended', icon: Star, label: '⭐ Recommended' },
];

export function SkillsStats() {
  const t = useTranslations('home.skills');

  return (
    <section className="py-24 bg-[#0B0F19]">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center justify-between gap-6 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-2 text-text-secondary">
              {t('subtitle', { count: totalSkills, categories: 31 })}
            </p>
          </div>
          <Link href="/skills">
            <Button className="bg-brand text-white hover:bg-brand-light">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Featured tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {featuredTabs.map((tab) => (
            <span
              key={tab.key}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface border border-white/[0.08] text-sm text-text-secondary hover:text-white hover:border-brand/30 transition-all cursor-pointer"
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Category cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/skills?category=${category.id}`}>
                  <Card className="group cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 border border-brand/20 group-hover:bg-brand/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-brand-light" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">
                          {t(`categoryNames.${category.id}`)}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {t('skillCount', { count: category.count })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-light">{totalSkills.toLocaleString()}+</div>
            <div className="text-sm text-text-muted mt-1">{t('totalSkillsLabel')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">31</div>
            <div className="text-sm text-text-muted mt-1">{t('categoriesLabel')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success">159</div>
            <div className="text-sm text-text-muted mt-1">{t('aiLlmLabel')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning">148</div>
            <div className="text-sm text-text-muted mt-1">{t('researchLabel')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
