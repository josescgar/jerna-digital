# ADR 0007: Prefixed Default Locale i18n Routing

## Status

Accepted

## Context

The site originally kept English (default locale) at root URLs (e.g. `/about`)
and served other languages under a locale prefix (e.g. `/es/about`).

That structure required duplicating each page file:

- `src/pages/about.astro` (English)
- `src/pages/[lang]/about.astro` (Spanish via `getStaticPaths()`)

This duplication caused ongoing maintenance overhead: every layout/content
change had to be applied twice for each page.

## Decision

We switch to a fully prefixed locale URL structure and consolidate pages so
each route is implemented once.

### URL Structure

- English (default locale): `/en/*`
- Spanish: `/es/*`

Legacy root URLs (`/`, `/about`, etc.) are redirected to their `/en/*`
equivalents.

### Routing

- Astro i18n is configured with `prefixDefaultLocale: true`.
- All pages live under `src/pages/[lang]/` and generate static routes for all
  supported languages using `getStaticPaths()`.

### Redirects

Redirects from the old root URL structure are configured via Astro's
`redirects` config so they work with static hosting.

## Consequences

### Positive

- Removes duplicated page implementations (one file per page instead of two).
- Adding a new page requires creating only one file under `src/pages/[lang]/`.
- Language switcher and hreflang generation become simpler and consistent.

### Negative

- Breaking change: English URLs move from `/about` to `/en/about`.
- External links/bookmarks must rely on redirects to remain valid.

## Validation

- `npm run lint`
- `npm run format:check`
- `npm run build`
- `npm run test`

## References

- Astro i18n docs: https://docs.astro.build/en/guides/internationalization/
- ADR 0004 (superseded): `docs/decisions/0004-i18n-implementation.md`
