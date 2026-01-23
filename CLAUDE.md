# Jerna Digital - Project Documentation for Claude

## Project Overview

Jerna Digital is an interactive portfolio website for a software development and engineering management consulting business. The site features a personal-forward branding approach with a dark mode aesthetic and warm coral/orange accent colors.

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

E2E tests must pass before opening a pull request:

```bash
npm run test
```

### When a PR is Already Open

If a PR is already open for the current branch, E2E tests must pass before committing additional changes:

```bash
npm run test
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
│   ├── case-studies/ # MDX case study files (placeholder)
│   └── config/       # Site configuration
├── layouts/          # BaseLayout.astro (main layout with SEO)
├── pages/            # Astro pages (routing)
│   ├── index.astro
│   ├── about.astro
│   ├── services.astro
│   ├── contact.astro
│   └── case-studies/
├── styles/
│   └── global.css    # Design tokens + Tailwind config
├── lib/              # Utilities (cn function, formatters)
├── i18n/             # Translations (English, expandable)
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
- Colors: Dark backgrounds (#0a0a0b base) with warm gradient accents (#f97316 to #fb7185)
- Typography: Inter (body) + Space Grotesk (headings)
- Consistent spacing and border radius scales

### i18n Architecture

- Translations in `src/i18n/translations.ts`
- Type-safe with `TranslationStrings` interface
- Currently English only, but structure supports multiple languages
- Use `getTranslations()` to access strings

### Component Patterns

- UI components follow shadcn/ui patterns (forwardRef, CVA variants)
- Use `cn()` utility for class merging (clsx + tailwind-merge)
- Astro components for static content, React for interactivity

## Coding Conventions

### Naming

- Components: PascalCase (`Button.tsx`, `HeroSection.astro`)
- Utilities: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`ButtonProps`)
- CSS custom properties: kebab-case (`--color-primary`)

### Imports

1. External dependencies (alphabetical)
2. Internal absolute imports (`@/components/*`)
3. Relative imports

### TypeScript

- Strict mode enabled
- Explicit return types on exported functions
- Use `type` imports for types only

## Environment Variables

```bash
# .env.local (not committed)
PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

## Testing

E2E tests in `tests/` directory:

- `navigation.spec.ts` - Page navigation
- `contact-form.spec.ts` - Form validation and submission
- `responsive.spec.ts` - Responsive layout tests
- `accessibility.spec.ts` - A11y checks
- `seo.spec.ts` - Meta tags and structured data

## Known Constraints

1. **Static Site:** No server-side code, forms via Web3Forms
2. **GitHub Pages:** No custom headers (security headers via meta tags)
3. **Performance:** Target < 100KB JS bundle, LCP < 1.5s

## Common Tasks

### Adding a new page

1. Create `src/pages/new-page.astro`
2. Import `BaseLayout` and wrap content
3. Add translations to `src/i18n/translations.ts`
4. Add navigation link in `src/components/layout/Header.astro`

### Adding a new UI component

1. Create in `src/components/ui/ComponentName.tsx`
2. Export from `src/components/ui/index.ts`
3. Follow shadcn/ui patterns (forwardRef, CVA for variants)

### Adding translations

1. Update `TranslationStrings` interface in `src/i18n/translations.ts`
2. Add strings to `translations.en` object
3. Use `t.key.subkey` pattern in components

### Modifying design tokens

1. Edit `@theme` block in `src/styles/global.css`
2. Use CSS custom properties in styles: `var(--color-primary)`

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
