'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, MessageCircle, GitBranch, Heart, Github, ExternalLink } from 'lucide-react';

const communityStats = [
  { key: 'contributors', value: '2,800+', icon: Users },
  { key: 'discordMembers', value: '45,000+', icon: MessageCircle },
  { key: 'forks', value: '28,000+', icon: GitBranch },
  { key: 'weeklyDownloads', value: '120,000+', icon: Heart },
];

const partners = [
  { name: 'Anthropic', logo: '🤖', url: 'https://anthropic.com' },
  { name: 'OpenAI', logo: '🧠', url: 'https://openai.com' },
  { name: 'Alibaba Cloud', logo: '☁️', url: 'https://aliyun.com' },
  { name: 'Tencent Cloud', logo: '🌐', url: 'https://cloud.tencent.com' },
  { name: 'Telegram', logo: '💬', url: 'https://telegram.org' },
  { name: 'Discord', logo: '🎮', url: 'https://discord.com' },
];

const testimonials = [
  {
    key: 'testimonial1',
    avatar: '👨‍💻',
    role: 'Full-Stack Developer',
  },
  {
    key: 'testimonial2',
    avatar: '👩‍🔬',
    role: 'AI Researcher',
  },
  {
    key: 'testimonial3',
    avatar: '🧑‍💼',
    role: 'Product Manager',
  },
];

export function CommunityShowcase() {
  const t = useTranslations('home.community');

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
          <div className="inline-flex items-center gap-2 text-accent mb-4">
            <Users className="w-5 h-5" />
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

        {/* Big Numbers - Horizontal Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                className="text-center p-8 bg-surface rounded-xl border border-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 mb-4">
                  <Icon className="h-6 w-6 text-brand-light" />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{t(`stats.${stat.key}`)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.key}
              className="bg-surface rounded-xl border border-white/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{item.avatar}</span>
                <div>
                  <div className="font-semibold text-white">{t(`${item.key}.name`)}</div>
                  <div className="text-sm text-text-muted">{t(`${item.key}.role`)}</div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed italic text-sm">
                &ldquo;{t(`${item.key}.quote`)}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ecosystem Partners */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-semibold text-text-muted mb-8 uppercase tracking-widest">
            {t('partnersTitle')}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-surface border border-white/[0.06] rounded-xl hover:border-white/[0.15] hover:shadow-lg transition-all group"
              >
                <span className="text-2xl">{partner.logo}</span>
                <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/moonye6/openclaw101"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full hover:bg-brand-light hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/25 transition-all"
          >
            <Github className="w-5 h-5" />
            <span>{t('joinCta')}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
