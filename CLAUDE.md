# Jerna Digital - Project Documentation for Claude

## Project Overview

Jerna Digital is an interactive portfolio website for a software development and engineering management consulting business. The site features a personal-forward branding approach with a dark mode aesthetic and green accent colors.

## Tech Stack

- **Framework:** Astro 5.x with React islands
- **Styling:** Tailwind CSS 4.x with custom design tokens
- **Animation:** CSS animations + Framer Motion
- **Type Safety:** TypeScript (strict mode)
- **Testing:** Playwright (E2E)
- **Forms:** Web3Forms (third-party service)
- **Hosting:** GitHub Pages (static)

## Key Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Type check + build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run typecheck    # Run TypeScript checks

# Testing
npm run test         # Run Playwright tests
npm run test:ui      # Run Playwright with UI
```

## Validating Changes

All changes must pass the following checks before being considered complete:

1. **Linting:** `npm run lint` must pass with no errors
2. **Formatting:** `npm run format:check` must pass (run `npm run format` to fix)
3. **Build:** `npm run build` must complete successfully

Run all validations with:

```bash
npm run lint && npm run format:check && npm run build
```

### Before Opening a PR

Local (Chromium only) E2E tests must pass before opening a pull request:

```bash
npm run test:local
```

### When a PR is Already Open

If a PR is already open for the current branch, Local (Chromium only) E2E tests must pass before committing additional changes:

```bash
npm run test:local
```

### Documentation Requirements

Documentation must be kept up to date as part of any change. When making changes, update the relevant documentation files:

| Change Type                            | Documentation to Update                                                       |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| New/changed npm scripts                | `CLAUDE.md` (Key Commands), `README.md`                                       |
| New/changed environment variables      | `CLAUDE.md` (Environment Variables), `README.md`                              |
| Project structure changes              | `CLAUDE.md` (Project Structure)                                               |
| Architectural decisions                | `docs/decisions/` (create new ADR), `CLAUDE.md` (Key Architectural Decisions) |
| New dependencies or tech stack changes | `CLAUDE.md` (Tech Stack), `docs/architecture.md`                              |
| Design token changes                   | `docs/design-tokens.md`                                                       |
| New component patterns                 | `CLAUDE.md` (Component Patterns)                                              |
| CI/CD or deployment changes            | `README.md`, relevant workflow files                                          |
| New coding conventions                 | `CLAUDE.md` (Coding Conventions)                                              |

**Documentation files:**

- `CLAUDE.md` - Primary reference for Claude Code (this file)
- `README.md` - Public-facing project documentation
- `docs/architecture.md` - System architecture overview
- `docs/design-tokens.md` - Design system documentation
- `docs/decisions/` - Architecture Decision Records (ADRs)

**ADR naming convention:** `NNNN-short-description.md` (e.g., `0004-add-dark-mode.md`)

## Git Hooks

Git hooks are managed by [Husky](https://typicode.github.io/husky/) and run automatically.

### Pre-commit Hook

Runs before each commit to validate the codebase:

```bash
npm run lint         # Check for linting errors
npm run format:check # Check code formatting
npm run typecheck    # TypeScript type checking
npm run build        # Build the project
```

If any check fails, the commit is blocked until the issue is fixed.

### Pre-push Hook

Runs before pushing to remote:

```bash
npm run test:local       # Run Playwright E2E tests
```

If tests fail, the push is blocked until tests pass.

### Skipping Hooks

In rare cases where you need to bypass hooks (e.g., WIP commits):

```bash
git commit --no-verify -m "WIP: work in progress"
git push --no-verify
```

**Note:** Use sparingly. CI will still catch issues, but it's better to fix them locally.

### Hook Installation

Hooks are installed automatically when running `npm install` via the `prepare` script. If hooks aren't working, run:

```bash
npm run prepare
```

## Git Workflow

### Repository Info

- **Remote:** `josescgar/jerna-digital`
- **Main branch:** `main`

### Branching Strategy (Trunk-Based Development)

- `main` is the trunk - always deployable
- Create short-lived feature branches from `main`
- Merge back to `main` frequently via pull requests

### Branch Naming Convention

Format: `type/description`

**Types:**

- `feature/` - New features
- `fix/` - Bug fixes
- `chore/` - Maintenance tasks (deps, config)
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

**Examples:**

- `feature/add-contact-form`
- `fix/header-navigation`
- `chore/update-dependencies`

### Commit Message Format (Conventional Commits)

Format: `type(scope): description`

**Types:** `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`

**Examples:**

- `feat(contact): add form validation`
- `fix(header): correct mobile menu z-index`
- `chore(deps): update astro to 5.1`

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui style components (Button, Card, Input, etc.)
│   ├── layout/       # Header, Footer, Logo (Astro components)
│   ├── sections/     # Page sections (Hero, Services, About, CTA)
│   └── interactive/  # React islands (ContactForm with Framer Motion)
├── content/
│   ├── portfolio/    # MDX portfolio entries (bilingual)
│   └── config/       # Site configuration
├── layouts/          # BaseLayout.astro (main layout with SEO)
├── pages/            # Astro pages (i18n routing)
│   └── [...lang]/          # Optional locale segment (e.g., /, /es/*)
│       ├── index.astro
│       ├── about.astro
│       ├── services.astro
│       ├── contact.astro
│       └── portfolio/
│           ├── index.astro
│           └── [slug].astro
├── styles/
│   └── global.css    # Design tokens + Tailwind config
├── features/         # Shared domain/business logic
│   ├── common/
│   │   ├── common.utils.ts
│   │   └── routes.utils.ts
│   ├── i18n/
│   │   ├── i18n.translations.ts
│   │   ├── i18n.utils.ts
│   └── theme/
│       └── theme.utils.ts
└── assets/           # Static assets
```

## Key Architectural Decisions

### Astro Islands Architecture

- Most components render as static HTML (no JS)
- React islands only for interactive features (ContactForm)
- Use `client:load` for immediately interactive components
- Use `client:visible` for below-fold interactivity

### Design System

- Design tokens defined in `src/styles/global.css` using `@theme`
- Colors: Dark backgrounds (#0a0a0b base) with green accent colors (#22c55e primary)
- Light mode support via `[data-theme='light']` CSS overrides
- Typography: Inter (body) + DM Sans (headings)
- Consistent spacing and border radius scales

### Theme System (Light/Dark Mode)

- **Default:** Dark theme
- **Detection:** Stored preference (`localStorage.jerna-theme`) → System preference → Default
- **Implementation:** `data-theme` attribute on `<html>`, CSS custom property overrides
- **FOUC Prevention:** Inline script in `<head>` sets theme before render
- **Shared domain logic:** `src/features/theme/theme.utils.ts`
- **Component wiring:** `src/components/ui/theme-toggle.client.ts`
- **Toggle UI:** `src/components/ui/ThemeToggle.astro` (desktop and mobile)

### i18n Architecture

- **Languages:** English (default) and Spanish
- **URL Structure:** English at root (`/about`), Spanish with prefix (`/es/about`)
- **Routing:** Optional locale segment via `src/pages/[...lang]/` with Astro i18n `prefixDefaultLocale: false`
- **Translations:** `src/features/i18n/i18n.translations.ts` with type-safe `TranslationStrings` interface
- **Shared domain logic:** `src/features/i18n/i18n.utils.ts`
- **Component wiring:** `src/components/layout/header.client.ts`
- **SEO:** hreflang tags and og:locale meta tags per language
- **Language Switcher:** In header, saves preference to localStorage
- **Default selection:** On unprefixed URLs, a small inline script redirects to the preferred language based on stored preference → browser language → English

### SEO / OG Meta Tags

- **Dedicated SEO keys:** `seo` section in `TranslationStrings` provides per-page `ogTitle` and `ogDescription` optimized for social sharing (decoupled from visible `<title>` and `<meta name="description">`)
- **BaseLayout props:** `ogTitle` and `ogDescription` are optional; when provided they override only `og:title`, `og:description`, `twitter:title`, and `twitter:description`
- **OG image:** `public/og-image.png` (1200x630), generated via `scripts/generate-og-image.ts`
- **Portfolio entries:** Can optionally specify `ogTitle` and `ogDescription` in MDX frontmatter
- **Target lengths:** `og:title` 40-65 chars, `og:description` 110-160 chars

### Component Patterns

- UI components follow shadcn/ui patterns (forwardRef, CVA variants)
- Use `cn()` utility for class merging (clsx + tailwind-merge)
- Astro components for static content, React for interactivity
- Hybrid client logic organization for interactive Astro components:
  - `*.astro` for presentation and data attributes
  - `*.client.ts` for colocated browser wiring (events, DOM state)
  - `src/features/<domain>/*.utils.ts` for shared domain logic
- Inline `<script>` in `.astro` is only allowed for pre-render bootstrap exceptions (for example theme FOUC prevention and unprefixed URL language negotiation)

## Coding Conventions

### Naming

- React/static components: PascalCase (`Button.tsx`, `HeroSection.astro`)
- Utilities: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`ButtonProps`)
- CSS custom properties: kebab-case (`--color-primary`)
- Interactive Astro suffixes: `*.client.ts`, `*.utils.ts`

### Imports

1. External dependencies (alphabetical)
2. Internal absolute imports (`@/components/*`)
3. Relative imports

### TypeScript

- Strict mode enabled
- Explicit return types on exported functions
- Use `type` imports for types only

### Comments

- Avoid writing comments that add no value and keep verbosity low

## Environment Variables

```bash
# .env.local (not committed)
PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

## Testing

E2E tests in `tests/` directory:

- `navigation.spec.ts` - Page navigation (English and Spanish)
- `contact-form.spec.ts` - Form validation and submission
- `responsive.spec.ts` - Responsive layout tests
- `accessibility.spec.ts` - A11y checks
- `seo.spec.ts` - Meta tags, structured data, and hreflang verification
- `i18n.spec.ts` - Language switching, URL structure, localStorage preference
- `theme.spec.ts` - Theme toggle, localStorage persistence, FOUC prevention

### CI Testing Strategy (3-Tier)

CI runs different levels of E2E testing based on PR state:

| Tier             | Trigger                    | What runs                      | ~Time  |
| ---------------- | -------------------------- | ------------------------------ | ------ |
| **Draft PR**     | `pull_request` (draft)     | Lint + format + typecheck only | ~1 min |
| **Ready PR**     | `pull_request` (not draft) | Above + E2E on Chromium only   | ~3 min |
| **Push to main** | `push` (after merge)       | Above + E2E on all 4 browsers  | ~7 min |

The pre-push hook (`.husky/pre-push`) also runs Chromium-only E2E tests locally before push.

## Known Constraints

1. **Static Site:** No server-side code, forms via Web3Forms
2. **GitHub Pages:** No custom headers (security headers via meta tags)
3. **Performance:** Target < 100KB JS bundle, LCP < 1.5s

## Common Tasks

### Adding a new page

1. Create localized page at `src/pages/[...lang]/new-page.astro` with `getStaticPaths()`
2. Import `BaseLayout` and pass `lang` prop
3. Add translations to `src/features/i18n/i18n.translations.ts` (both `en` and `es`)
4. Add `seo.newPage` entries with `ogTitle` (40-65 chars) and `ogDescription` (110-160 chars) to both language objects
5. Pass `ogTitle={t.seo.newPage.ogTitle} ogDescription={t.seo.newPage.ogDescription}` to `BaseLayout`
6. Add navigation link in `src/components/layout/Header.astro` using `getLocalizedPath()`

**Page pattern example:**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import {
  getTranslations,
  languages,
  defaultLanguage,
  type Language,
} from '@/features/i18n/i18n.translations';

export function getStaticPaths() {
  return (Object.keys(languages) as Language[]).map((lang) => {
    return {
      params: lang === defaultLanguage ? {} : { lang },
      props: { lang },
    };
  });
}

const { lang } = Astro.props;
const t = getTranslations(lang);
---

<BaseLayout lang={lang} title={t.nav.newPage}>
  <!-- content using t.* -->
</BaseLayout>
```

### Adding a new UI component

1. Create in `src/components/ui/ComponentName.tsx`
2. Export from `src/components/ui/index.ts`
3. Follow shadcn/ui patterns (forwardRef, CVA for variants)

### Adding translations

1. Update `TranslationStrings` interface in `src/features/i18n/i18n.translations.ts`
2. Add strings to both `translations.en` and `translations.es` objects
3. Use `t.key.subkey` pattern in components
4. For React components, pass translations as props

**Adding a new language:**

1. Add language code to `languages` object in `src/features/i18n/i18n.translations.ts`
2. Add locale metadata to `localeMetadata` object
3. Add complete translation object (e.g., `translations.fr`)
4. Update `astro.config.mjs` to add the locale

### Adding a new portfolio item

1. Create MDX files in `src/content/portfolio/` using the pattern `{slug}-{lang}.mdx` (e.g., `project-name-en.mdx`, `project-name-es.mdx`)
2. Include required frontmatter: `title`, `client`, `industry`, `summary`, `tags`, `lang` (Language enum value), `urlSlug` (URL-safe identifier)
3. Set `draft: false` when ready to publish, `featured: true` for priority listing
4. The detail page route (`[slug].astro`) and index page query the collection automatically

**Note:** Use `urlSlug` (not `slug`) in frontmatter — Astro reserves `slug` for internal use.

### Modifying design tokens

1. Edit `@theme` block in `src/styles/global.css`
2. Use CSS custom properties in styles: `var(--color-primary)`

### Modifying theme colors

1. Edit dark mode colors in `@theme` block in `src/styles/global.css`
2. Edit light mode overrides in `[data-theme='light']` block
3. For new color tokens that need theme support:
   - Add dark value in `@theme { ... }`
   - Add light override in `[data-theme='light'] { ... }`
4. Update `docs/design-tokens.md` to document both values

## Claude Skills

Claude Code has custom skills (slash commands) available for this project:

### `/create-issue <type> <title>`

Create standardized GitHub issues with proper templates and labels.

**Arguments:**

- `type`: One of `feature`, `fix`, `hotfix`, `chore`, `docs`, `refactor`
- `title`: Brief description of the issue

**Example:**

```
/create-issue feature Add dark mode toggle
```

**What it does:**

- Asks clarifying questions based on issue type
- Creates label if it doesn't exist
- Generates structured issue body from template
- Creates the issue with appropriate labels

### `/make-release <pr-number>`

Automate the release process following Semver conventions.

**Arguments:**

- `pr-number`: The pull request number to merge and release

**Example:**

```
/make-release 42
```

**What it does:**

1. **Validation**: Verifies PR is mergeable, extracts issue number and commits
2. **Versioning**: Asks for release type (patch/minor/major), suggests version, confirms with user
3. **Release**: Merges PR, generates changelog, creates GitHub release with tag
4. **Cleanup**: Closes related issue, optionally deletes feature branch

**Version bumping:**

- Patch (v1.2.3 → v1.2.4): Bug fixes and minor changes
- Minor (v1.2.3 → v1.3.0): New features, backwards compatible
- Major (v1.2.3 → v2.0.0): Breaking changes

**References:**

- `.claude/skills/make-release/references/semver-guide.md` - Semantic versioning guide
- `.claude/skills/make-release/references/changelog-template.md` - CHANGELOG formatting examples
