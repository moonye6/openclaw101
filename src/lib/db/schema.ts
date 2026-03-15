import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const tutorials = sqliteTable('tutorials', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  source: text('source').notNull(), // 来源平台
  category: text('category').notNull(), // official, cloud-deploy, getting-started, channels, skills, videos, deep-dives, tools
  language: text('language').notNull(), // en, zh
  icon: text('icon'),
  sortOrder: integer('sort_order').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const skillCategories = sqliteTable('skill_categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  nameZh: text('name_zh').notNull(),
  icon: text('icon').notNull(),
  count: integer('count').default(0),
  sortOrder: integer('sort_order').default(0),
});

export const skills = sqliteTable('skills', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  categoryId: text('category_id').references(() => skillCategories.id),
  installCommand: text('install_command'),
  githubUrl: text('github_url'),
  stars: integer('stars').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type Tutorial = typeof tutorials.$inferSelect;
export type NewTutorial = typeof tutorials.$inferInsert;
export type SkillCategory = typeof skillCategories.$inferSelect;
export type NewSkillCategory = typeof skillCategories.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
