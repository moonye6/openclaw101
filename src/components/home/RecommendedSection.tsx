'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/i18n/routing';

export function RecommendedSection() {
  const t = useTranslations('home.recommended');

  const recommendedTutorials = [
    {
      id: 'r1',
      title: t('tutorial1.title'),
      description: t('tutorial1.description'),
      url: 'https://docs.openclaw.ai',
      source: 'OpenClaw',
      badge: t('badgeOfficial'),
      badgeColor: 'bg-blue-500',
    },
    {
      id: 'r2',
      title: t('tutorial2.title'),
      description: t('tutorial2.description'),
      url: 'https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/',
      source: 'freeCodeCamp',
      badge: t('badgePopular'),
      badgeColor: 'bg-orange-500',
    },
    {
      id: 'r3',
      title: t('tutorial3.title'),
      description: t('tutorial3.description'),
      url: 'https://www.ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration',
      source: 'IBM',
      badge: t('badgeDeepDive'),
      badgeColor: 'bg-purple-500',
    },
  ];

  const recommendedSkills = [
    {
      id: 's1',
      name: 'github',
      description: t('skill1.description'),
      stars: 1250,
      category: 'Coding',
    },
    {
      id: 's2',
      name: 'coding-agent',
      description: t('skill2.description'),
      stars: 1102,
      category: 'Coding',
    },
    {
      id: 's3',
      name: 'weather',
      description: t('skill3.description'),
      stars: 890,
      category: 'Research',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recommended Tutorials */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                {t('tutorials')}
              </h3>
            </div>
            <div className="space-y-4">
              {recommendedTutorials.map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <a
                      href={tutorial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded text-white ${tutorial.badgeColor}`}>
                              {tutorial.badge}
                            </span>
                            <span className="text-xs text-gray-600">{tutorial.source}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {tutorial.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-700 line-clamp-1">
                            {tutorial.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommended Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                {t('skills')}
              </h3>
            </div>
            <div className="space-y-4">
              {recommendedSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{skill.category}</Badge>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="text-xs">{skill.stars}</span>
                            </div>
                          </div>
                          <h4 className="font-semibold text-gray-900">
                            {skill.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-700">
                            {skill.description}
                          </p>
                        </div>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 flex-shrink-0">
                          npx clawhub install {skill.name}
                        </code>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
