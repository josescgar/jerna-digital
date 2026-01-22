import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Case studies collection schema.
 * Each case study is an MDX file with frontmatter.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
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
  'case-studies': caseStudies,
};
