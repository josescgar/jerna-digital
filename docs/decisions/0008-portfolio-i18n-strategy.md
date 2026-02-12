# ADR 0008: Portfolio Content i18n Strategy

## Status

Accepted

## Context

The portfolio section needs to display bilingual content (English and Spanish) from MDX files. Unlike page-level i18n (handled by Astro's routing with `[...lang]/` segments), content collection entries need their own strategy for associating translations with languages.

Key requirements:

- Each portfolio item exists in both English and Spanish
- Items should be queryable by language to show the correct version on each locale
- URL slugs should be language-independent (`/portfolio/jerna-digital` and `/es/portfolio/jerna-digital`)
- The schema should leverage the existing `Language` enum for type safety

## Decision

We use a `lang` + `urlSlug` field pair in the content collection schema:

```typescript
schema: z.object({
  // ...other fields
  lang: z.nativeEnum(Language),
  urlSlug: z.string(),
});
```

### File naming

Bilingual entries use the pattern `{slug}-{lang}.mdx`:

```
src/content/portfolio/
├── jerna-digital-en.mdx
└── jerna-digital-es.mdx
```

### Why `urlSlug` instead of `slug`

Astro's content layer reserves the `slug` field — the glob loader uses it as the entry ID, causing entries with the same slug to overwrite each other. We use `urlSlug` to avoid this collision while keeping the URL-facing slug concept.

### Querying

Pages filter the collection by language and draft status:

```typescript
const items = await getCollection(
  'portfolio',
  (entry) => !entry.data.draft && entry.data.lang === lang
);
```

The detail page route generates paths for all `(lang, urlSlug)` pairs:

```typescript
(Object.keys(languages) as Language[]).flatMap((lang) =>
  items
    .filter((item) => item.data.lang === lang)
    .map((item) => ({
      params: {
        lang: lang === defaultLanguage ? undefined : lang,
        slug: item.data.urlSlug,
      },
      props: { lang, entry: item },
    }))
);
```

## Alternatives Considered

### 1. Single MDX file with both languages

Store all translations in one file using custom components or frontmatter arrays.

**Rejected because:** MDX body content can't easily hold two languages. Frontmatter-only would lose the benefit of rich MDX content.

### 2. Directory-based separation (`en/jerna-digital.mdx`, `es/jerna-digital.mdx`)

**Rejected because:** Adds unnecessary nesting. The flat `{slug}-{lang}.mdx` pattern is simpler and the `lang` frontmatter field is explicit.

### 3. Using `slug` frontmatter field

**Rejected because:** Astro's glob loader uses `slug` as the entry ID, causing bilingual entries to collide. The second file loaded silently overwrites the first.

## Consequences

### Positive

- Type-safe language field via `z.nativeEnum(Language)`
- Simple flat file structure
- Language-independent URLs
- Easy to query by language at build time
- Adding a new portfolio item in a new language is just adding another MDX file

### Negative

- Must remember to use `urlSlug` instead of `slug` (documented in schema comments)
- Each new portfolio item requires separate MDX files per language

## References

- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- ADR 0004: i18n Implementation
