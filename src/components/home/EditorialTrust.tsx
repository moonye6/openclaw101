'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, FileText } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function EditorialTrust() {
  const t = useTranslations('editorialTrust');

  return (
    <section className="py-16 bg-[#0B0F19]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="p-8 rounded-2xl border border-white/[0.08] bg-surface/50 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            {t('title')}
          </h2>
          <p className="text-text-secondary mb-6 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <CheckCircle className="w-4 h-4 text-success" />
              <span>{t('reviewedLabel')}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Mail className="w-4 h-4 text-brand-light" />
              <span>{t('contactLabel')}</span>
              <Link href="/contact" className="text-brand-light hover:underline">
                {t('contactLink')}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <FileText className="w-4 h-4 text-accent" />
              <span>{t('policyLabel')}</span>
              <Link href="/editorial-policy" className="text-accent hover:underline">
                {t('policyLink')}
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-text-muted">
            {t('lastUpdated')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
