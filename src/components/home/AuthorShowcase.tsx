'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Github, BookOpen, Code, Shield } from 'lucide-react';

const authors = [
  {
    key: 'sarah',
    avatar: '👩‍🔬',
    icon: Shield,
    gradient: 'from-blue-500 to-cyan-500',
    github: 'https://github.com/sarahkim-ai',
    articles: 12,
  },
  {
    key: 'alex',
    avatar: '👨‍💻',
    icon: Code,
    gradient: 'from-purple-500 to-pink-500',
    github: 'https://github.com/alexchendev',
    articles: 8,
  },
  {
    key: 'marco',
    avatar: '🧑‍💼',
    icon: BookOpen,
    gradient: 'from-amber-500 to-orange-500',
    github: 'https://github.com/marcoliu',
    articles: 6,
  },
];

const caseStudies = [
  { key: 'case1', emoji: '🏢', metric: '5x' },
  { key: 'case2', emoji: '🎓', metric: '10k+' },
  { key: 'case3', emoji: '🏠', metric: '24/7' },
];

export function AuthorShowcase() {
  const t = useTranslations('authors');

  return (
    <section className="py-24 bg-[#0B0F19]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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

        {/* Authors Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {authors.map((author, index) => (
            <motion.div
              key={author.key}
              className="bg-surface rounded-xl border border-white/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{author.avatar}</span>
                <div>
                  <h3 className="font-semibold text-white">{t(`${author.key}.name`)}</h3>
                  <p className="text-sm text-text-muted">{t(`${author.key}.role`)}</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {t(`${author.key}.bio`)}
              </p>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {author.articles} {t('articlesLabel')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Case Studies */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            {t('casesTitle')}
          </h3>
          <p className="text-text-secondary">
            {t('casesSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={cs.key}
              className="bg-surface rounded-xl border border-white/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{cs.emoji}</span>
                <span className="text-2xl font-bold text-brand-light">{cs.metric}</span>
              </div>
              <h4 className="font-semibold text-white mb-2">{t(`${cs.key}.title`)}</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{t(`${cs.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
