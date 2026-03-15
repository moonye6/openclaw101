export type Locale = 'en' | 'zh';

export interface Tutorial {
  id: string;
  title: string;
  description: string | null;
  url: string;
  source: string;
  category: string;
  language: string;
  icon: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  count: number;
  sortOrder: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string | null;
  categoryId: string | null;
  installCommand: string | null;
  githubUrl: string | null;
  stars: number;
  createdAt: string;
}

export interface SearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
