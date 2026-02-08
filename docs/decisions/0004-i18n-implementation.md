# ADR 0004: Internationalization (i18n) Implementation

## Status

Superseded

Superseded by ADR 0007 (prefixed default locale routing with consolidated
`src/pages/[lang]/` pages).

## Context

The Jerna Digital website needed to support multiple languages to reach a broader audience. Spanish was the first additional language to be added alongside English.

Key requirements:

- Maintain existing English URLs without breaking SEO
- Support language-specific URLs for non-default languages
- Allow users to switch languages easily
- Remember user language preference
- Provide proper SEO signals (hreflang tags, og:locale)

## Decision

We implemented internationalization using Astro's built-in i18n feature with the following approach:

### URL Structure

- **English (default):** Root URLs (`/`, `/about`, `/services`, `/contact`, `/case-studies`)
- **Spanish:** Prefixed URLs (`/es/`, `/es/about`, `/es/services`, etc.)

This is configured in `astro.config.mjs` with `prefixDefaultLocale: false`.

### Page Routing

Rather than using a single dynamic `[lang]` folder for all pages, we use a hybrid approach:

1. **Root-level pages** (`src/pages/*.astro`): English pages served at root URLs
2. **Dynamic `[lang]` pages** (`src/pages/[lang]/*.astro`): Non-English pages with `getStaticPaths()` that filters out `'en'`

This approach was chosen because Astro doesn't support `undefined` as a route parameter value, which would be needed for a pure dynamic routing solution where English pages have no prefix.

### Translation System

- Type-safe translations in `src/i18n/translations.ts`
- `TranslationStrings` interface ensures all languages have complete translations
- `getTranslations(lang)` function returns the appropriate translation object
- `localeMetadata` provides SEO metadata (og:locale) for each language

### Utilities

`src/i18n/utils.ts` provides:

- `getLocalizedPath(lang, path)` - Generate language-specific URLs
- `getAlternateUrls(currentPath, siteUrl)` - Generate hreflang URLs for SEO
- `detectBrowserLanguage()` - Detect user's preferred language from browser
- `getStoredLanguage()` / `setStoredLanguage()` - localStorage preference management

### Component Integration

- All page layouts receive a `lang` prop
- Section components receive `lang` prop and use `getTranslations(lang)`
- React components (e.g., ContactForm) receive translations as props for SSR compatibility
- Header includes a language switcher that saves preference to localStorage

### SEO

- `<html lang>` attribute set dynamically
- hreflang tags (`<link rel="alternate" hreflang="...">`) on all pages
- `og:locale` meta tag set per language
- Sitemap includes all language variants

## Alternatives Considered

### 1. Pure Dynamic `[lang]` Routing

Have all pages in `[lang]` folder and generate both English (with `undefined` param) and Spanish paths.

**Rejected because:** Astro doesn't support `undefined` route parameters, causing build errors.

### 2. Subdomain per Language (en.site.com, es.site.com)

**Rejected because:**

- More complex DNS configuration
- GitHub Pages doesn't support multiple subdomains easily
- Overkill for a small site with two languages

### 3. Query Parameter (?lang=es)

**Rejected because:**

- Poor SEO (search engines prefer URL-based language indicators)
- Less user-friendly URLs
- More complex caching

## Consequences

### Positive

- Clean, SEO-friendly URLs for both languages
- English URLs unchanged (no SEO impact on existing traffic)
- Type-safe translations prevent missing strings
- Language preference persists across sessions
- Proper SEO signals for international targeting

### Negative

- Some code duplication between root and `[lang]` pages
- Each new page requires two files (root + localized)
- All translation strings must be added for all languages

### Neutral

- Adding a new language requires:
  1. Adding to `languages` object
  2. Adding to `localeMetadata`
  3. Creating complete translation object
  4. Adding to `astro.config.mjs` locales

## References

- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- [Google's hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)
