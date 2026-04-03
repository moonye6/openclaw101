import type { BlogPost } from './types';
export type { BlogPost };

import { postsOpenclawCore } from './posts-openclaw-core';
import { postsOpenclawBasics } from './posts-openclaw-basics';
import { postsOpenclawAdvanced } from './posts-openclaw-advanced';
import { postsTelegram } from './posts-telegram';

export const blogPosts: BlogPost[] = [
  ...postsOpenclawCore,
  ...postsOpenclawBasics,
  ...postsOpenclawAdvanced,
  ...postsTelegram,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category || post.categoryEn === category);
}
