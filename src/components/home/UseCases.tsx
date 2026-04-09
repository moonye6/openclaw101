'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const featuredArticles = [
  {
    slug: 'how-to-create-telegram-bot',
    title: 'How to Create a Telegram Bot with OpenClaw',
    excerpt: 'A complete walkthrough: register with BotFather, connect OpenClaw, handle messages, add custom commands, and deploy. Includes code examples you can copy-paste.',
    category: 'Tutorial',
    readingTime: 15,
  },
  {
    slug: 'openclaw-vs-chatgpt',
    title: 'OpenClaw vs ChatGPT: Why You Need an AI That Acts',
    excerpt: 'ChatGPT gives advice. OpenClaw executes it. A side-by-side comparison of capabilities, cost, privacy, and when to use each — with real command examples.',
    category: 'Comparison',
    readingTime: 15,
  },
  {
    slug: 'ai-agent-guide',
    title: 'What Are AI Agents? A Practical Introduction',
    excerpt: 'AI agents plan, remember, use tools, and take action. This guide explains the core concepts, compares popular frameworks, and walks you through building your first agent.',
    category: 'Guide',
    readingTime: 25,
  },
];

export function UseCases() {
  return (
    <section className="py-20 bg-[#0B0F19]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured Articles
          </h2>
          <p className="text-text-secondary text-lg">
            Our most popular deep dives — practical, detailed, and written for people who actually want to build things.
          </p>
        </motion.div>

        <div className="space-y-5">
          {featuredArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}` as `/blog/${string}`}
                className="block p-6 rounded-xl border border-white/[0.08] bg-surface hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-brand-light bg-brand/10 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} min read
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-light transition-colors">
                  {article.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  {article.excerpt}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-light group-hover:gap-2.5 transition-all">
                  Read the full article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors"
          >
            View all articles
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
