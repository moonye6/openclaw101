'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Book, Video, Cloud, Wrench, Lightbulb, MessageSquare, Cpu, Zap } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/routing';
import { tutorials } from '@/data/tutorials';

const categoryIcons: Record<string, React.ReactNode> = {
  'official': <Book className="w-5 h-5" />,
  'cloud-deploy': <Cloud className="w-5 h-5" />,
  'getting-started': <Lightbulb className="w-5 h-5" />,
  'channels': <MessageSquare className="w-5 h-5" />,
  'skills': <Wrench className="w-5 h-5" />,
  'videos': <Video className="w-5 h-5" />,
  'deep-dives': <Cpu className="w-5 h-5" />,
  'tools': <Zap className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  'official': 'bg-blue-500',
  'cloud-deploy': 'bg-cyan-500',
  'getting-started': 'bg-green-500',
  'channels': 'bg-purple-500',
  'skills': 'bg-orange-500',
  'videos': 'bg-red-500',
  'deep-dives': 'bg-brand',
  'tools': 'bg-yellow-500',
};

const initialTutorials = tutorials;

export function TutorialList() {
  const t = useTranslations('tutorials');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const categories = [
    { id: 'official', label: t('categories.official') },
    { id: 'cloud-deploy', label: t('categories.cloudDeploy') },
    { id: 'getting-started', label: t('categories.gettingStarted') },
    { id: 'channels', label: t('categories.channels') },
    { id: 'skills', label: t('categories.skills') },
    { id: 'videos', label: t('categories.videos') },
    { id: 'deep-dives', label: t('categories.deepDives') },
    { id: 'tools', label: t('categories.tools') },
  ];

  const filteredTutorials = initialTutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tutorial.category === selectedCategory;
    const matchesLanguage = !selectedLanguage || tutorial.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#111827] border-white/[0.08] text-white placeholder:text-[#9CA3AF]"
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLanguage === null 
                ? 'bg-brand text-white' 
                : 'bg-[#111827] text-[#9CA3AF] hover:text-white border border-white/[0.08]'
            }`}
            onClick={() => setSelectedLanguage(null)}
          >
            {t('allLanguages')}
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLanguage === 'en' 
                ? 'bg-brand text-white' 
                : 'bg-[#111827] text-[#9CA3AF] hover:text-white border border-white/[0.08]'
            }`}
            onClick={() => setSelectedLanguage('en')}
          >
            EN
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLanguage === 'zh' 
                ? 'bg-brand text-white' 
                : 'bg-[#111827] text-[#9CA3AF] hover:text-white border border-white/[0.08]'
            }`}
            onClick={() => setSelectedLanguage('zh')}
          >
            中文
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          {t('allCategories')}
        </Badge>
        {categories.map((cat) => (
          <Badge
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </Badge>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[#9CA3AF]">
        {t('resultsCount', { count: filteredTutorials.length })}
      </p>

      {/* Tutorial Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full hover:border-brand/30 transition-colors cursor-pointer group bg-[#111827] border-white/[0.08]">
              <Link
                href={`/tutorials/${tutorial.id}`}
                className="block p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 p-2 rounded-lg text-white ${categoryColors[tutorial.category]}`}>
                    {categoryIcons[tutorial.category]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#9CA3AF]">{tutorial.source}</span>
                      <Badge variant="outline" className="text-xs border-white/[0.08] text-[#9CA3AF]">
                        {tutorial.language === 'en' ? 'EN' : '中文'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-brand-light transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#9CA3AF] line-clamp-2">
                      {tutorial.description}
                    </p>
                  </div>
                  <ExternalLink className="flex-shrink-0 h-4 w-4 text-[#9CA3AF] group-hover:text-brand-light transition-colors" />
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#9CA3AF]">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
