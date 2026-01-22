# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        GitHub Pages                          │
│                    (Static File Hosting)                     │
└─────────────────────────────────────────────────────────────┘
                              ↑
                        Deploy (CI/CD)
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions                           │
│              (Build, Test, Deploy Pipeline)                  │
└─────────────────────────────────────────────────────────────┘
                              ↑
                         Git Push
                              ↑
┌─────────────────────────────────────────────────────────────┐
│                    Astro Build Process                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   .astro    │  │    .tsx     │  │    .mdx     │         │
│  │  Components │  │   Islands   │  │   Content   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         ↓                ↓                ↓                 │
│  ┌───────────────────────────────────────────────┐         │
│  │              Static HTML/CSS/JS                │         │
│  │        (Optimized, Minified, Tree-shaken)      │         │
│  └───────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Astro Islands Model

```
┌─────────────────────────────────────────────────────────────┐
│                        Page (Astro)                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                BaseLayout.astro                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Header    │  │    Main     │  │   Footer    │ │   │
│  │  │   (Static)  │  │   Content   │  │   (Static)  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  │                         │                           │   │
│  │         ┌───────────────┼───────────────┐          │   │
│  │         ↓               ↓               ↓          │   │
│  │  ┌───────────┐   ┌───────────┐   ┌───────────┐   │   │
│  │  │  Section  │   │  Section  │   │   Island  │   │   │
│  │  │  (Static) │   │  (Static) │   │  (React)  │   │   │
│  │  └───────────┘   └───────────┘   └───────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

Legend:
[Static] = Rendered at build time, no JavaScript
[React]  = Hydrated client-side with client:load directive
```

### Component Hierarchy

```
components/
├── ui/                    # Base components (atoms)
│   ├── Button.tsx         # → Variants: primary, secondary, ghost, etc.
│   ├── Card.tsx           # → Variants: default, glass, interactive
│   ├── Input.tsx          # → With error state support
│   ├── Textarea.tsx       # → With error state support
│   └── Label.tsx          # → With required indicator
│
├── layout/                # Layout components
│   ├── Header.astro       # → Navigation, mobile menu
│   ├── Footer.astro       # → Links, social, copyright
│   └── Logo.astro         # → Brand mark + text
│
├── sections/              # Page sections (molecules)
│   ├── HeroSection.astro  # → Main hero with CTAs
│   ├── ServicesSection.astro
│   ├── AboutPreviewSection.astro
│   └── CTASection.astro
│
└── interactive/           # React islands
    └── ContactForm.tsx    # → Form with validation + Web3Forms
```

## Data Flow

### Contact Form Submission

```
┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│    User      │────>│  ContactForm  │────>│  Web3Forms   │
│   Browser    │     │   (React)     │     │     API      │
└──────────────┘     └───────────────┘     └──────────────┘
                            │                     │
                            │ 1. Validate         │
                            │ 2. Show loading     │
                            │ 3. POST request ────┘
                            │
                            ↓
                     ┌───────────────┐
                     │  Success/Error │
                     │    Message     │
                     └───────────────┘
```

### i18n Data Flow

```
┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│    Page      │────>│ getTranslations() │────>│ translations │
│  (.astro)    │     │                   │     │    object    │
└──────────────┘     └───────────────┘     └──────────────┘
                            │
                            ↓
                     t.nav.about = "About"
                     t.hero.title = "I help..."
```

## Build Pipeline

```
Source Files
     │
     ↓
┌─────────────────────────────────────┐
│         npm run build               │
│  ┌────────────────────────────┐    │
│  │   1. astro check           │    │  ← TypeScript validation
│  │   2. astro build           │    │  ← SSG + optimization
│  │      ├── Render .astro     │    │
│  │      ├── Process .tsx      │    │
│  │      ├── Compile CSS       │    │
│  │      ├── Optimize images   │    │
│  │      └── Generate sitemap  │    │
│  └────────────────────────────┘    │
└─────────────────────────────────────┘
     │
     ↓
dist/
├── index.html
├── about/index.html
├── services/index.html
├── contact/index.html
├── case-studies/index.html
├── _astro/
│   ├── [hashed].css
│   └── [hashed].js
└── sitemap-index.xml
```

## Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                     Security Layers                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Transport: HTTPS (GitHub Pages enforced)                   │
│                                                              │
│  Headers (via meta tags):                                   │
│  ├── X-Content-Type-Options: nosniff                       │
│  ├── X-Frame-Options: SAMEORIGIN                           │
│  └── Referrer-Policy: strict-origin-when-cross-origin      │
│                                                              │
│  Form Protection:                                           │
│  ├── Honeypot field (bot trap)                             │
│  ├── Client-side validation                                 │
│  └── Web3Forms server-side filtering                        │
│                                                              │
│  Static Site Benefits:                                      │
│  ├── No database (no SQL injection)                        │
│  ├── No server code (no RCE)                               │
│  └── No user sessions (no session hijacking)               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```
