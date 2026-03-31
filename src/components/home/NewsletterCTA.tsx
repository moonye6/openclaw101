'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';

export function NewsletterCTA() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-brand/20 via-[#0B0F19] to-accent/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-brand-light mb-6">
            <Sparkles className="w-4 h-4" />
            {t('badge')}
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          {status === 'success' ? (
            <motion.div
              className="flex items-center justify-center gap-2 text-success bg-success/10 border border-success/20 rounded-xl px-6 py-4 mx-auto max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{t('success')}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('placeholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-white/[0.08] text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={status === 'loading'}
                className="bg-brand text-white hover:bg-brand-light font-semibold shadow-lg shadow-brand/25 px-6 whitespace-nowrap"
              >
                {status === 'loading' ? t('loading') : t('cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-text-muted">
            {t('privacy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
