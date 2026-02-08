# ADR 0007: Redesign Variation Approach

## Status

Accepted (V1 chosen, variations cleaned up)

## Context

Issue #15 requires a full frontend redesign to match the new JD logo (green gradient monogram with pixel/digital scatter motif). Rather than committing to a single design direction upfront, we needed a way to evaluate multiple design variations side-by-side before choosing one.

The key constraint is that the existing site must remain fully functional during evaluation — no disruption to production pages, tests, or the existing design system.

## Decision

We implemented a **hybrid CSS token override + variation hero** architecture that produces 4 design variations at separate URLs (`/v1/` through `/v4/`), each with a distinct visual identity.

### Architecture

Each variation consists of:

- **1 CSS file** — overrides design tokens (colors, fonts, gradients, shadows) scoped via `[data-variation="vN"]` attribute selector
- **1 Hero component** — unique hero layout (centered, split, asymmetric, or grid-based)
- **2 page files** — EN route (`/vN/`) and ES route (`/es/vN/`)

Shared infrastructure:

- `VariationLayout.astro` — wraps `BaseLayout`, adds `data-variation` attribute and loads variation-specific Google Font
- `VariationNav.astro` — fixed bottom bar for switching between variations during evaluation
- All existing section components (Services, About, CTA) adapt automatically via token overrides

### Why Token Overrides Work

The existing design system is fully token-driven. Every component references CSS custom properties (`--color-primary`, `--color-accent-orange`, `--font-heading`, etc.). Overriding them in a scoped CSS file changes the entire appearance without touching any component code.

This is proven by the existing light/dark theme implementation, which uses the same pattern: `[data-theme='light']` overrides the same tokens.

### The 4 Variations

| Variation | Name      | Personality              | Heading Font      | Primary Color |
| --------- | --------- | ------------------------ | ----------------- | ------------- |
| V1        | Minimal   | Clean, Swiss, restrained | DM Sans           | #22c55e       |
| V2        | Bold      | High-impact, dramatic    | Plus Jakarta Sans | #22c55e       |
| V3        | Playful   | Energetic, approachable  | Outfit            | #4ade80       |
| V4        | Corporate | Professional, structured | Sora              | #15803d       |

### File Structure

All variation code is isolated under `src/variations/`:

```
src/variations/
├── types.ts              # VariationId type
├── config.ts             # Variation metadata
├── layouts/
│   └── VariationLayout.astro
├── styles/
│   ├── all-variations.css  # Barrel import
│   ├── v1-minimal.css
│   ├── v2-bold.css
│   ├── v3-playful.css
│   └── v4-corporate.css
└── components/
    ├── VariationNav.astro
    ├── HeroV1Minimal.astro
    ├── HeroV2Bold.astro
    ├── HeroV3Playful.astro
    └── HeroV4Corporate.astro
```

### BaseLayout Changes

Minimal additions:

- Optional `variation` prop
- `data-variation` attribute on `<html>` (only when prop is provided)
- Conditional Google Font `<link>` for variation heading font
- Import of `all-variations.css` (rules scoped by `[data-variation]`, so inert on non-variation pages)

## Alternatives Considered

### 1. Separate branches per variation

Creating 4 git branches, each with a complete redesign.

**Rejected because:**

- Cannot compare variations side-by-side in the same deployment
- Requires switching branches to evaluate
- Merge conflicts between branches are likely
- No easy way to share evaluation with stakeholders

### 2. Full component duplication per variation

Duplicating all section components (Services, About, CTA) for each variation.

**Rejected because:**

- Massive code duplication (~4x the section code)
- Changes to shared functionality require updating 4 copies
- Much harder cleanup when choosing a variation

### 3. Runtime JavaScript theme switching

Using JavaScript to dynamically switch between variations.

**Rejected because:**

- More complex implementation
- Flash of unstyled content on variation switch
- Harder to share specific variation URLs with stakeholders
- Unnecessary JS for what CSS can handle

## Consequences

### Positive

- Existing pages are completely unaffected (zero changes to current routes)
- All 300 existing E2E tests continue to pass
- Each variation has a stable URL for evaluation and sharing
- Cleanup is trivial: delete `src/variations/` + page routes, apply winning tokens
- i18n works on all variations (EN + ES)
- Theme toggle works on all variations (dark + light)

### Negative

- Small CSS bundle increase (~2KB) from variation token overrides
- Variation CSS is loaded on all pages (including non-variation), though rules are inert
- 8 additional page routes during evaluation period

### Neutral

- New Google Fonts are only loaded on variation pages (not on existing pages)
- VariationNav bottom bar only appears on variation pages

## Outcome

V1 "Minimal" was chosen as the winning design, with V3's playful animations (ping dot availability badge, bouncing green dot) incorporated into the final design. The V1 green color scheme (DM Sans heading font, `#22c55e` primary) was promoted to the permanent design tokens in `global.css`, the V1 hero layout replaced the original `HeroSection.astro`, and the PNG logo became the default in `Logo.astro`. All variation infrastructure (`src/variations/`, variation page routes `/v1/`–`/v4/`, variation-related code in `BaseLayout.astro`) was deleted.
