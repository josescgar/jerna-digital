# 0010 - Hybrid Business Logic Organization

## Status

Accepted

## Context

Interactive Astro components accumulated browser and business logic directly inside `.astro` script blocks. This made responsibilities hard to follow and logic difficult to test in isolation. At the same time, shared domain logic was spread across multiple utility files with inconsistent placement.

We needed a consistent approach that:

1. Keeps Astro files readable and focused on presentation.
2. Preserves performance-sensitive inline bootstrap behavior when needed.
3. Improves testability of domain rules.
4. Avoids over-fragmenting features into too many tiny files.

## Decision

Adopt a pragmatic hybrid pattern:

1. **Co-locate component-local browser wiring** next to interactive Astro components using `*.client.ts`.
2. **Centralize shared domain logic** in `src/features/<domain>/` using `*.utils.ts`.
3. Keep Astro component naming aligned with existing conventions (`*.astro`) and use suffixes for logic files only (`*.client.ts`, `*.utils.ts`).
4. Keep inline scripts in `.astro` only for approved bootstrap exceptions that must run before render (for example, theme FOUC prevention and language negotiation on unprefixed URLs).

## Alternatives Considered

### 1) Keep logic inside `.astro` scripts

- **Pros:** Fewer files, direct proximity to markup.
- **Cons:** Mixed concerns, poor testability, inconsistent organization.

### 2) Fully centralized architecture (all logic in feature modules only)

- **Pros:** Strong separation and discoverability.
- **Cons:** Too granular for this project, weaker local context for component-specific wiring.

### 3) Fully co-located per component (including shared rules)

- **Pros:** Excellent local discoverability.
- **Cons:** High risk of duplicating shared business rules across components.

## Consequences

- Interactive components become easier to read because presentation and behavior wiring are separated.
- Shared logic for `theme` and `i18n` is now consolidated under `src/features/`.
- Legacy alias exports were removed after migration so imports point directly to feature modules.
- New work should follow suffix conventions:
  - `*.astro`
  - `*.client.ts`
  - `*.utils.ts`

## Adoption Rules

1. Put browser-only DOM/event code in colocated `*.client.ts`.
2. Put reusable domain/business rules in `src/features/<domain>/*.utils.ts`.
3. Keep `.astro` focused on markup, props, and data attributes.
4. Allow inline `.astro` scripts only for documented bootstrap exceptions.
5. If logic is reused by multiple components or layouts, promote it to a feature service.
