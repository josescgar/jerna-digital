import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Portfolio collection schema.
 * Each portfolio item is an MDX file with frontmatter.
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
  }),
});

export const collections = {
  portfolio,
};
