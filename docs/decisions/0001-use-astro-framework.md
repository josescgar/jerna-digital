# ADR 0001: Use Astro as the Primary Framework

## Status

Accepted

## Context

We need to build a portfolio website for Jerna Digital that prioritizes:

- Performance (fast load times, minimal JavaScript)
- SEO (static HTML, proper meta tags)
- Developer experience (modern tooling, TypeScript)
- Interactive elements (contact form, animations)

We evaluated several options:

- Next.js (React-based, SSR/SSG)
- Gatsby (React-based, SSG)
- Astro (Multi-framework, SSG-first)
- Plain HTML/CSS/JS

## Decision

Use **Astro** as the primary framework with React for interactive islands.

## Rationale

1. **Zero JavaScript by Default:** Astro ships no JS unless explicitly needed, resulting in faster page loads and better Core Web Vitals.

2. **Islands Architecture:** We can use React only where needed (contact form with validation, Framer Motion animations) while keeping the rest static.

3. **Content-Focused:** Astro is designed for content-heavy sites, with excellent support for Markdown/MDX.

4. **Modern DX:** Full TypeScript support, hot module reloading, and modern build tooling (Vite).

5. **Static Output:** Perfect for GitHub Pages hosting with no server required.

6. **Integrations:** First-class support for React, Tailwind CSS, MDX, and sitemap generation.

## Consequences

### Positive

- Minimal JavaScript shipped to client
- Excellent Lighthouse scores out of the box
- Easy to deploy to any static host
- Clear separation between static and interactive content

### Negative

- Team needs to understand Astro's component model
- Some patterns from pure React apps don't directly translate
- Limited to static site generation (no SSR on GitHub Pages)

### Neutral

- Need to decide which components require React hydration
- Content in `.astro` files vs `.tsx` files

## Alternatives Considered

**Next.js:** More JavaScript shipped by default, overkill for a portfolio site, would require a Node.js server or Vercel for SSR features.

**Gatsby:** GraphQL layer adds complexity, slower build times, React-specific ecosystem.

**Plain HTML/CSS:** No component reusability, harder to maintain, no TypeScript benefits.
