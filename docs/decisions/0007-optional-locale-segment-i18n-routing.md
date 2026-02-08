# ADR 0007: Optional Locale Segment i18n Routing

## Status

Accepted

## Context

We want to avoid duplicating page implementations per language while keeping
the default language (English) at unprefixed URLs (e.g. `/about`).

Because the site is statically generated, we cannot reliably perform
server-side `Accept-Language` negotiation on every host.

## Decision

We use a single page implementation per route and generate both default and
non-default language URLs using an optional locale segment.

### URL Structure

- English (default locale): unprefixed URLs (e.g. `/`, `/about`)
- Spanish: prefixed URLs (e.g. `/es/`, `/es/about`)

### Routing

- Astro i18n is configured with `prefixDefaultLocale: false`.
- Pages live under `src/pages/[...lang]/` (optional segment) and generate:
  - default language: `params: {}`
  - non-default languages: `params: { lang: '<code>' }`

### Language Negotiation (Static Hosting)

On unprefixed URLs, we use a small client-side script to choose the initial
language:

1. Stored preference (`localStorage.jerna-lang`) when present
2. Browser language (`navigator.languages`) when it matches a supported locale
3. Fallback to English

If the chosen language is non-default, the script redirects to the prefixed
URL (e.g. `/about` → `/es/about`) using `location.replace()`.

## Consequences

### Positive

- Removes duplicated page implementations (one file per route).
- Keeps default locale URLs clean (no `/en` prefix).
- Adds language-aware landing behavior without host-specific redirect rules.

### Negative

- Users whose browser language is non-default may experience an initial
  client-side redirect when landing on unprefixed URLs.

## Validation

- `npm run lint`
- `npm run format:check`
- `npm run build`
- `npm run test`

## References

- Astro i18n docs: https://docs.astro.build/en/guides/internationalization/
- ADR 0004 (superseded): `docs/decisions/0004-i18n-implementation.md`
