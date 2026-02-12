import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { Language } from '@/i18n/translations';

/**
 * Portfolio collection schema.
 * Each portfolio item is an MDX file with frontmatter.
 * Bilingual entries share the same `slug` and differ by `lang`.
 */
const portfolio = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/portfolio',
  }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    publishedAt: z.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    lang: z.nativeEnum(Language),
    slug: z.string(),
  }),
});

export const collections = {
  portfolio,
};
