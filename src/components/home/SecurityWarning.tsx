'use client';

import { useTranslations } from 'next-intl';
import { Shield, CheckCircle, ExternalLink } from 'lucide-react';

export function SecurityWarning() {
  const t = useTranslations('home.warning');

  return (
    <section className="py-8 bg-[#0B0F19]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4 rounded-xl bg-surface border border-white/[0.06] p-5">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-success" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">{t('title')}</h3>
              <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                {t('description')}
              </p>
              <ul className="mt-3 space-y-1.5">
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  {t('tip1')}
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  {t('tip2')}
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  {t('tip3')}
                </li>
              </ul>
              <a
                href="https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-success hover:text-success/80 transition-colors"
              >
                {t('learnMore')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
