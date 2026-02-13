# 0009 - OG Meta Tag Strategy

## Status

Accepted

## Context

Open Graph (OG) meta tags control how pages appear when shared on social platforms (Facebook, LinkedIn, Twitter/X, Slack, etc.). Our initial implementation had several issues:

1. `og:image` referenced `/og-image.png` which didn't exist in `public/`
2. `og:title` used the visible `<title>` content, which was too short for social sharing (13-29 chars vs. recommended 50-60)
3. `og:description` used the visible `<meta name="description">`, which was sometimes too long or too short for social cards
4. No `og:image:width` or `og:image:height` hints for faster social card rendering

## Decision

### Dedicated SEO Translation Keys

We added a `seo` section to `TranslationStrings` with per-page `ogTitle` and `ogDescription` that are optimized for social sharing:

- `og:title`: 40-65 characters, includes brand name and value proposition
- `og:description`: 110-160 characters, actionable and keyword-rich

This decouples social sharing metadata from the visible browser `<title>` and `<meta name="description">`, allowing each to be optimized for its audience (search engine snippets vs. social cards).

### BaseLayout Props

`BaseLayout.astro` accepts optional `ogTitle` and `ogDescription` props. When provided, they override only the OG/Twitter meta tags. The visible `<title>` and `<meta name="description">` remain unchanged.

### OG Image

A 1200x630 PNG (`public/og-image.png`) is generated via a Playwright script (`scripts/generate-og-image.ts`). It features the site tagline, subtitle, and brand colors on a dark background matching the site's design system.

### Portfolio Content

Portfolio entries can optionally specify `ogTitle` and `ogDescription` in their MDX frontmatter, allowing per-case-study social sharing optimization.

## Consequences

- Social sharing cards now display optimized titles and descriptions
- The OG image exists and renders correctly on all platforms
- Adding `og:image:width` and `og:image:height` enables faster social card rendering
- New pages must add `ogTitle`/`ogDescription` props when using `BaseLayout`
- New languages must include the `seo` section in their translation object
