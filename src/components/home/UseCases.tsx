'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Code, FileText, Globe, Home, MessageSquare, BarChart3, 
  Camera, Mail, Calendar, Lightbulb, ArrowRight 
} from 'lucide-react';
import { Link } from '@/i18n/routing';

const useCases = [
  {
    key: 'coding',
    icon: Code,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    commands: ['claw write a Python web scraper', 'claw fix the bug in app.js', 'claw add unit tests for utils/'],
  },
  {
    key: 'research',
    icon: Globe,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    commands: ['claw search latest AI news today', 'claw summarize this paper.pdf', 'claw compare React vs Vue in 2026'],
  },
  {
    key: 'automation',
    icon: Calendar,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    commands: ['claw check my server every hour', 'claw send daily report at 9am', 'claw backup database weekly'],
  },
  {
    key: 'content',
    icon: FileText,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    commands: ['claw write a blog post about AI', 'claw translate docs to Chinese', 'claw generate social media posts'],
  },
  {
    key: 'smarthome',
    icon: Home,
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-50',
    commands: ['claw turn off all lights', 'claw set thermostat to 22C', 'claw lock the front door'],
  },
  {
    key: 'data',
    icon: BarChart3,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    commands: ['claw analyze sales.csv trends', 'claw create a chart from data', 'claw query database for stats'],
  },
];

export function UseCases() {
  const t = useTranslations('home.useCases');

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-orange-600 mb-4">
            <Lightbulb className="w-5 h-5" />
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

        {/* Use Case Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.key}
                className={`rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                {/* Header */}
                <div className={`${useCase.bgColor} p-6`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${useCase.color} shadow-md`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(`${useCase.key}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(`${useCase.key}.description`)}
                  </p>
                </div>

                {/* Command Examples */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                    {t('exampleCommands')}
                  </div>
                  <div className="space-y-1.5">
                    {useCase.commands.map((cmd, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-mono text-gray-700 bg-white px-3 py-1.5 rounded-md border border-gray-100"
                      >
                        <span className="text-green-500 flex-shrink-0">$</span>
                        <span className="truncate">{cmd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>{t('exploreCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
