'use client';

import { useTranslations } from 'next-intl';
import { AlertTriangle, ExternalLink } from 'lucide-react';

export function SecurityWarning() {
  const t = useTranslations('home.warning');

  return (
    <section className="py-8 bg-amber-50 border-t border-amber-200">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-4 max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">{t('title')}</h3>
            <p className="mt-1 text-sm text-amber-700">
              {t('description')}
            </p>
            <a
              href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-amber-800 hover:text-amber-900"
            >
              {t('learnMore')}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
