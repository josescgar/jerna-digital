import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { Language } from '@/i18n/translations';

/**
 * Portfolio collection schema.
 * Each portfolio item is an MDX file with frontmatter.
 * Bilingual entries share the same `urlSlug` and differ by `lang`.
 * Note: `slug` is reserved by Astro's content layer — we use `urlSlug` instead.
 */
const portfolio = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/portfolio',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      industry: z.string(),
      summary: z.string(),
      tags: z.array(z.string()),
      image: image().optional(),
      imageAlt: z.string().optional(),
      publishedAt: z.date().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(true),
      lang: z.nativeEnum(Language),
      urlSlug: z.string(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
    }),
});

export const collections = {
  portfolio,
};
