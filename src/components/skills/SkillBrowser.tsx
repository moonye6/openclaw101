'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Star, ExternalLink, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { skillCategories, sampleSkills } from '@/data/skills';

export function SkillBrowser() {
  const t = useTranslations('skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const filteredSkills = sampleSkills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || skill.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.count, 0);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111827] rounded-xl border border-white/[0.08] p-5 text-center">
          <div className="text-3xl font-bold text-brand-light">{totalSkills.toLocaleString()}+</div>
          <div className="text-sm text-[#9CA3AF] mt-1">{t('totalSkills')}</div>
        </div>
        <div className="bg-[#111827] rounded-xl border border-white/[0.08] p-5 text-center">
          <div className="text-3xl font-bold text-cyan-400">{skillCategories.length}</div>
          <div className="text-sm text-[#9CA3AF] mt-1">{t('categories')}</div>
        </div>
        <div className="bg-[#111827] rounded-xl border border-white/[0.08] p-5 text-center">
          <div className="text-3xl font-bold text-green-400">{skillCategories[0].count}</div>
          <div className="text-sm text-[#9CA3AF] mt-1">{t('aiLlm')}</div>
        </div>
        <div className="bg-[#111827] rounded-xl border border-white/[0.08] p-5 text-center">
          <div className="text-3xl font-bold text-amber-400">{skillCategories[1].count}</div>
          <div className="text-sm text-[#9CA3AF] mt-1">{t('research')}</div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-base rounded-2xl bg-[#111827] border-white/[0.08] text-white placeholder:text-[#9CA3AF] focus:border-brand/50"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-brand text-white'
                : 'bg-[#111827] border border-white/[0.08] text-[#9CA3AF] hover:text-white hover:border-brand/30'
            }`}
          >
            {t('all')}
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-brand text-white'
                  : 'bg-[#111827] border border-white/[0.08] text-[#9CA3AF] hover:text-white hover:border-brand/30'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          {selectedCategory 
            ? skillCategories.find(c => c.id === selectedCategory)?.name 
            : t('featuredSkills')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="bg-[#111827] rounded-xl border border-white/[0.08] hover:border-brand/30 transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-white">{skill.name}</h3>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-white/[0.08] text-[#9CA3AF]">
                          {skillCategories.find(c => c.id === skill.categoryId)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{skill.stars}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#9CA3AF] mb-4">{skill.description}</p>
                  
                  {/* Install command area */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#0B0F19] border border-white/[0.08] px-4 py-2.5 rounded-lg font-mono text-sm text-[#9CA3AF] overflow-x-auto">
                      <span className="text-green-400 mr-2">$</span>
                      {skill.installCommand}
                    </div>
                    <button
                      onClick={() => copyCommand(skill.installCommand)}
                      className="flex-shrink-0 p-2.5 rounded-lg bg-brand text-white hover:bg-brand/80 transition-all hover:-translate-y-0.5"
                      title={t('copyCommand')}
                    >
                      {copiedCommand === skill.installCommand ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    {skill.githubUrl && (
                      <a
                        href={skill.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2.5 rounded-lg bg-[#0B0F19] text-[#9CA3AF] hover:text-white transition-all hover:-translate-y-0.5 border border-white/[0.08]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#9CA3AF] text-lg">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
