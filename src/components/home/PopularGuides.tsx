'use client';

import { motion } from 'framer-motion';
import { BookOpen, Puzzle, FileText, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const entryPoints = [
  {
    icon: BookOpen,
    title: 'Beginner Guide',
    description: 'Never used OpenClaw? Start here. Install it, connect your first AI model, and run your first task in under 10 minutes.',
    href: '/guide' as const,
    cta: 'Start Learning',
    color: 'text-brand-light',
    bg: 'bg-brand/10',
    border: 'border-brand/20',
    hoverBorder: 'hover:border-brand/40',
  },
  {
    icon: Puzzle,
    title: 'Explore 97+ Skills',
    description: 'Browse community-built skills on ClawHub — from image generation and document processing to smart home control.',
    href: '/skills' as const,
    cta: 'Browse Skills',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    hoverBorder: 'hover:border-accent/40',
  },
  {
    icon: FileText,
    title: 'Tutorials & Blog',
    description: 'In-depth articles on Telegram bots, automation workflows, self-hosting, security, and more — written for real-world use.',
    href: '/blog' as const,
    cta: 'Read Articles',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
    hoverBorder: 'hover:border-success/40',
  },
];

export function PopularGuides() {
  return (
    <section className="py-20 bg-surface/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Where to Start
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Pick the path that fits your goal. Each section is self-contained — no prerequisites.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {entryPoints.map((entry, index) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={entry.href}
                className={`block p-6 rounded-xl border ${entry.border} ${entry.hoverBorder} bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group h-full`}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${entry.bg} mb-4`}>
                  <entry.icon className={`w-5 h-5 ${entry.color}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {entry.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {entry.description}
                </p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${entry.color} group-hover:gap-2.5 transition-all`}>
                  {entry.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
