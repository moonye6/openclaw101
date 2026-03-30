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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              {t('title')}
            </h2>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
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
