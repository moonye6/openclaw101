'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Code, FileText, Globe, Home, Calendar, BarChart3, 
  Lightbulb, ArrowRight 
} from 'lucide-react';
import { Link } from '@/i18n/routing';

const useCaseGroups = [
  {
    category: 'dev',
    emoji: '💻',
    items: [
      {
        key: 'coding',
        icon: Code,
        commands: ['claw write a Python web scraper', 'claw fix the bug in app.js', 'claw add unit tests for utils/'],
      },
    ],
  },
  {
    category: 'research',
    emoji: '📊',
    items: [
      {
        key: 'research',
        icon: Globe,
        commands: ['claw search latest AI news today', 'claw summarize this paper.pdf', 'claw compare React vs Vue in 2026'],
      },
    ],
  },
  {
    category: 'automation',
    emoji: '⚙️',
    items: [
      {
        key: 'automation',
        icon: Calendar,
        commands: ['claw check my server every hour', 'claw send daily report at 9am', 'claw backup database weekly'],
      },
    ],
  },
  {
    category: 'content',
    emoji: '📝',
    items: [
      {
        key: 'content',
        icon: FileText,
        commands: ['claw write a blog post about AI', 'claw translate docs to Chinese', 'claw generate social media posts'],
      },
    ],
  },
  {
    category: 'smarthome',
    emoji: '🏠',
    items: [
      {
        key: 'smarthome',
        icon: Home,
        commands: ['claw turn off all lights', 'claw set thermostat to 22C', 'claw lock the front door'],
      },
    ],
  },
  {
    category: 'data',
    emoji: '📈',
    items: [
      {
        key: 'data',
        icon: BarChart3,
        commands: ['claw analyze sales.csv trends', 'claw create a chart from data', 'claw query database for stats'],
      },
    ],
  },
];

export function UseCases() {
  const t = useTranslations('home.useCases');

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
          <div className="inline-flex items-center gap-2 text-warning mb-4">
            <Lightbulb className="w-5 h-5" />
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

        {/* Use Case Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCaseGroups.map((group, index) => {
            const item = group.items[0];
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                className="group rounded-xl border border-white/[0.08] bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 border border-brand/20">
                      <Icon className="h-5 w-5 text-brand-light" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted">{group.emoji} {group.category.toUpperCase()}</span>
                      <h3 className="text-base font-semibold text-white">
                        {t(`${item.key}.title`)}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`${item.key}.description`)}
                  </p>
                </div>

                {/* Command Examples */}
                <div className="px-6 pb-5">
                  <div className="text-xs font-medium text-text-muted mb-2 uppercase tracking-wider">
                    {t('exampleCommands')}
                  </div>
                  <div className="space-y-1.5">
                    {item.commands.map((cmd, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-mono text-text-secondary bg-white/[0.03] px-3 py-2 rounded-lg border border-white/[0.04]"
                      >
                        <span className="text-success flex-shrink-0">$</span>
                        <span className="truncate">{cmd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Popular Guides Quick Links */}
        <motion.div
          className="mt-10 grid md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { href: '/blog/how-to-create-telegram-bot', label: '🤖 How to Create a Telegram Bot', badge: 'Guide' },
            { href: '/blog/telegram-bot-examples', label: '💡 10 Telegram Bot Examples', badge: 'Examples' },
            { href: '/blog/telegram-automation-guide', label: '⚡ Telegram Automation Guide', badge: 'Automation' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href as Parameters<typeof Link>[0]['href']}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-surface px-5 py-4 transition-all duration-200 hover:border-brand/30 hover:bg-brand/5"
            >
              <div>
                <span className="text-xs text-brand-light font-medium">{link.badge}</span>
                <p className="text-sm font-medium text-white mt-0.5">{link.label}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-light transition-colors flex-shrink-0" />
            </Link>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-brand-light hover:text-brand font-medium transition-colors"
          >
            <span>{t('exploreCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
