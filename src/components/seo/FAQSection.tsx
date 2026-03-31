'use client';

import { FAQSchema } from './FAQSchema';
import { faqData } from '@/data/faq';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FAQSection() {
  const params = useParams();
  const locale = params.locale as string;
  const isZh = locale === 'zh';
  const items = isZh ? faqData.zh : faqData.en;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations('faq');

  return (
    <>
      <FAQSchema items={items} />
      <section className="py-20 bg-surface/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <HelpCircle className="w-8 h-8 text-brand-light" />
            <h2 className="text-3xl font-bold text-white">
              {t('title')}
            </h2>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-surface rounded-xl border border-white/[0.08] overflow-hidden transition-all hover:border-white/[0.12]"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-white">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-text-secondary leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
