'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Globe, Home, MessageSquare, Music, Search, Shield, Zap, Brain, LineChart, Gamepad2, Heart } from 'lucide-react';
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

export function SkillsStats() {
  const t = useTranslations('home.skills');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('subtitle', { count: totalSkills, categories: 31 })}
            </p>
          </div>
          <Link href="/skills">
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              {t('viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  <Card className="group cursor-pointer transition-all hover:shadow-lg hover:border-blue-300">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {t(`categoryNames.${category.id}`)}
                        </h3>
                        <p className="text-sm text-gray-600">
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
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{totalSkills.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">{t('totalSkillsLabel')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">31</div>
            <div className="text-sm text-gray-600">{t('categoriesLabel')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">159</div>
            <div className="text-sm text-gray-600">{t('aiLlmLabel')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">148</div>
            <div className="text-sm text-gray-600">{t('researchLabel')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
