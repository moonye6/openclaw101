/**
 * Lightweight slug/ID sets for middleware 404 enforcement.
 *
 * Imported by src/middleware.ts to return HTTP 404 for unknown dynamic
 * route params. Only string arrays — no content, no heavy objects.
 *
 * Rebuilt on every deploy (static data, no runtime cost).
 */

import { blogPosts } from './blog';
import { tutorials } from './tutorials';
import { skillCategories } from './skills';
import { learningPath } from './learning-path';
import { sevenDays } from './seven-days';
import { useCases } from './use-cases';

export const validBlogSlugs = new Set(blogPosts.map((p) => p.slug));
export const validTutorialIds = new Set(tutorials.map((t) => String(t.id)));
export const validSkillCategories = new Set(skillCategories.map((c) => c.id));
export const validLearnDays = new Set(learningPath.map((d) => String(d.day)));
export const validSevenDays = new Set(sevenDays.map((d) => String(d.day)));
export const validUseCaseSlugs = new Set(useCases.map((u) => u.slug));
