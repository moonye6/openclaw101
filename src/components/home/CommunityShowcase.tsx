'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, MessageCircle, GitBranch, Heart, Github, ExternalLink } from 'lucide-react';

const communityStats = [
  { key: 'contributors', value: '2,800+', icon: Users, color: 'text-blue-600 bg-blue-100' },
  { key: 'discordMembers', value: '45,000+', icon: MessageCircle, color: 'text-purple-600 bg-purple-100' },
  { key: 'forks', value: '28,000+', icon: GitBranch, color: 'text-green-600 bg-green-100' },
  { key: 'weeklyDownloads', value: '120,000+', icon: Heart, color: 'text-red-600 bg-red-100' },
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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-purple-600 mb-4">
            <Users className="w-5 h-5" />
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

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} mb-3`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{t(`stats.${stat.key}`)}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.key}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{item.avatar}</span>
                <div>
                  <div className="font-semibold text-gray-900">{t(`${item.key}.name`)}</div>
                  <div className="text-sm text-gray-500">{t(`${item.key}.role`)}</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
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
          <h3 className="text-lg font-semibold text-gray-500 mb-8 uppercase tracking-wider">
            {t('partnersTitle')}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all group"
              >
                <span className="text-2xl">{partner.logo}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
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
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
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
