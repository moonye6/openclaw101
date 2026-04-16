import type { BlogPost } from './types';
export type { BlogPost };

import { postsOpenclawCore } from './posts-openclaw-core';
import { postsOpenclawBasics } from './posts-openclaw-basics';
import { postsOpenclawAdvanced } from './posts-openclaw-advanced';
import { postsTelegram } from './posts-telegram';
import { postsAiAgentGuide } from './posts-ai-agent-guide';
import { postsAdSenseGuides } from './posts-adsense-guides';

export const blogPosts: BlogPost[] = [
  ...postsOpenclawCore,
  ...postsOpenclawBasics,
  ...postsOpenclawAdvanced,
  ...postsTelegram,
  ...postsAiAgentGuide,
  ...postsAdSenseGuides,
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category || post.categoryEn === category);
}

/**
 * Get related blog posts based on category and tag overlap.
 * Returns up to `limit` posts, excluding the current post.
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return [];

  const others = blogPosts.filter(p => p.slug !== currentSlug);

  // Score each post: +3 for same category, +1 per shared tag
  const scored = others.map(post => {
    let score = 0;
    if (post.category === current.category || post.categoryEn === current.categoryEn) {
      score += 3;
    }
    const sharedTags = post.tags.filter(tag => current.tags.includes(tag));
    score += sharedTags.length;
    return { post, score };
  });

  // Sort by score desc, then by date desc for tie-breaking
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  return scored.slice(0, limit).map(s => s.post);
}
