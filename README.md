# Jerna Digital

Interactive portfolio website for Jerna Digital - Software Development and Engineering Management Consulting.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) with React islands
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Animation:** CSS animations + [Framer Motion](https://www.framer.com/motion/)
- **Type Safety:** TypeScript (strict mode)
- **Testing:** [Playwright](https://playwright.dev/)
- **Forms:** [Web3Forms](https://web3forms.com/)

## Getting Started

### Prerequisites

- Node.js 20 LTS
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Commands

| Command           | Action                            |
| :---------------- | :-------------------------------- |
| `npm run dev`     | Start development server          |
| `npm run build`   | Type check + build for production |
| `npm run preview` | Preview production build          |
| `npm run lint`    | Run ESLint                        |
| `npm run format`  | Format with Prettier              |
| `npm run test`    | Run Playwright tests              |

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky/) to run automated checks:

- **Pre-commit:** Runs lint, format check, type check, and build
- **Pre-push:** Runs E2E tests

Hooks are installed automatically via `npm install`. To skip hooks temporarily, use `--no-verify`:

```bash
git commit --no-verify -m "message"
git push --no-verify
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Base UI components
│   ├── layout/       # Header, Footer, Logo
│   ├── sections/     # Page sections
│   └── interactive/  # React islands
├── content/
│   └── case-studies/ # MDX case study files
├── layouts/          # Base layout with SEO
├── pages/            # Astro pages
├── styles/           # Global CSS + design tokens
├── lib/              # Utilities
└── i18n/             # Translations
```

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Project documentation for Claude Code
- [Architecture](./docs/architecture.md) - System architecture overview
- [Design Tokens](./docs/design-tokens.md) - Design system reference
- [ADRs](./docs/decisions/) - Architecture Decision Records

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

Get your access key from [Web3Forms](https://web3forms.com/).

## Deployment

The site is deployed to GitHub Pages via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions builds the site
3. Site is deployed to GitHub Pages

## License

Private - All rights reserved.
