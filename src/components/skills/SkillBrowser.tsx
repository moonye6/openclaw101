'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Terminal, Star, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/routing';
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
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{totalSkills.toLocaleString()}+</div>
          <div className="text-sm text-gray-500">{t('totalSkills')}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{skillCategories.length}</div>
          <div className="text-sm text-gray-500">{t('categories')}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{skillCategories[0].count}</div>
          <div className="text-sm text-gray-500">{t('aiLlm')}</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{skillCategories[1].count}</div>
          <div className="text-sm text-gray-500">{t('research')}</div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t('browseByCategory')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Card
            className={`p-4 text-center cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === null ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            <div className="text-2xl mb-1">📦</div>
            <div className="font-medium text-sm">{t('all')}</div>
            <div className="text-xs text-gray-500">{totalSkills.toLocaleString()}</div>
          </Card>
          {skillCategories.map((category) => (
            <Link key={category.id} href={`/skills/${category.id}`}>
              <Card
                className={`p-4 text-center cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={(e: React.MouseEvent) => { e.preventDefault(); setSelectedCategory(category.id); }}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
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
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <Badge variant="outline" className="mt-1">
                      {skillCategories.find(c => c.id === skill.categoryId)?.name}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{skill.stars}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{skill.description}</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono text-gray-800 overflow-x-auto">
                    {skill.installCommand}
                  </code>
                  <button
                    onClick={() => copyCommand(skill.installCommand)}
                    className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    title="Copy command"
                  >
                    <Terminal className="h-4 w-4" />
                  </button>
                  {skill.githubUrl && (
                    <a
                      href={skill.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
