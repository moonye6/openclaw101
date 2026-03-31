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
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center">
          <div className="text-3xl font-bold text-indigo-600">{totalSkills.toLocaleString()}+</div>
          <div className="text-sm text-gray-500 mt-1">{t('totalSkills')}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center">
          <div className="text-3xl font-bold text-cyan-600">{skillCategories.length}</div>
          <div className="text-sm text-gray-500 mt-1">{t('categories')}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center">
          <div className="text-3xl font-bold text-green-600">{skillCategories[0].count}</div>
          <div className="text-sm text-gray-500 mt-1">{t('aiLlm')}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 text-center">
          <div className="text-3xl font-bold text-amber-600">{skillCategories[1].count}</div>
          <div className="text-sm text-gray-500 mt-1">{t('research')}</div>
        </div>
      </div>

      {/* Search — BIG, centered */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-base rounded-2xl bg-white border-gray-200 text-gray-900 focus:border-indigo-500 focus:ring-indigo-300"
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
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm'
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
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
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
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg text-gray-900">{skill.name}</h3>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-gray-200 text-gray-600">
                          {skillCategories.find(c => c.id === skill.categoryId)?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{skill.stars}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
                  
                  {/* Install command area */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-lg font-mono text-sm text-gray-700 overflow-x-auto">
                      <span className="text-green-600 mr-2">$</span>
                      {skill.installCommand}
                    </div>
                    <button
                      onClick={() => copyCommand(skill.installCommand)}
                      className="flex-shrink-0 p-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
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
                        className="flex-shrink-0 p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all hover:-translate-y-0.5 border border-gray-200"
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
          <p className="text-gray-500 text-lg">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
