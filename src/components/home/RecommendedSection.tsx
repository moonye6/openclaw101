'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, ExternalLink, ArrowRight } from 'lucide-react';
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
      href: '/blog/how-to-create-telegram-bot',
      source: 'OpenClaw 101',
      badge: t('badgeOfficial'),
      badgeColor: 'bg-brand',
      internal: true,
    },
    {
      id: 'r2',
      title: t('tutorial2.title'),
      description: t('tutorial2.description'),
      href: '/blog/telegram-bot-examples',
      source: 'OpenClaw 101',
      badge: t('badgePopular'),
      badgeColor: 'bg-warning',
      internal: true,
    },
    {
      id: 'r3',
      title: t('tutorial3.title'),
      description: t('tutorial3.description'),
      href: '/blog/telegram-automation-guide',
      source: 'OpenClaw 101',
      badge: t('badgeDeepDive'),
      badgeColor: 'bg-teal-500',
      internal: true,
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
    <section className="py-24 bg-surface/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-brand-light mb-4">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recommended Tutorials — Internal Blog Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-brand-light" />
              <h3 className="text-xl font-semibold text-white">
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
                  <Card>
                    <Link
                      href={tutorial.href as Parameters<typeof Link>[0]['href']}
                      className="block p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded text-white ${tutorial.badgeColor}`}>
                              {tutorial.badge}
                            </span>
                            <span className="text-xs text-text-muted">{tutorial.source}</span>
                          </div>
                          <h4 className="font-semibold text-white hover:text-brand-light transition-colors">
                            {tutorial.title}
                          </h4>
                          <p className="mt-1 text-sm text-text-secondary line-clamp-1">
                            {tutorial.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recommended Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-warning" />
              <h3 className="text-xl font-semibold text-white">
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
                  <Card>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{skill.category}</Badge>
                            <div className="flex items-center gap-1 text-warning">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="text-xs">{skill.stars}</span>
                            </div>
                          </div>
                          <h4 className="font-semibold text-white">
                            {skill.name}
                          </h4>
                          <p className="mt-1 text-sm text-text-secondary">
                            {skill.description}
                          </p>
                        </div>
                        <code className="text-xs bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-lg text-text-muted font-mono flex-shrink-0">
                          npx clawhub install {skill.name}
                        </code>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* External Resources — moved to bottom */}
            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <p className="text-xs text-text-muted mb-3 uppercase tracking-wider">External Resources</p>
              <div className="space-y-2">
                <a
                  href="https://docs.openclaw.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-light transition-colors"
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  OpenClaw Official Docs
                </a>
                <a
                  href="https://www.freecodecamp.org/news/openclaw-full-tutorial-for-beginners/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-light transition-colors"
                >
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  freeCodeCamp AI Agent Tutorial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
