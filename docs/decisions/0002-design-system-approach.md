# ADR 0002: Design System Approach

## Status

Accepted

## Context

The website needs a consistent visual language that:

- Reflects the brand identity (professional, approachable, modern)
- Supports dark mode as the primary theme
- Is maintainable and extensible
- Works well with Tailwind CSS

## Decision

Implement a **full design system** using:

1. CSS custom properties (design tokens) in `@theme` block
2. Tailwind CSS for utility-first styling
3. shadcn/ui patterns for component architecture
4. CVA (class-variance-authority) for component variants

## Rationale

### Design Tokens via CSS Custom Properties

Using the Tailwind v4 `@theme` directive allows us to:

- Define all design tokens in one place
- Have tokens work in both Tailwind utilities and raw CSS
- Enable potential theming without rebuilding

### shadcn/ui Component Patterns

Following shadcn/ui patterns provides:

- Accessible components built on Radix primitives
- Full control over component code (copy-paste, not npm dependency)
- Consistent API across all components
- Easy customization to match our design

### Color Palette

```
Background: #0a0a0b (near-black)
Primary: #f97316 (orange) → #fb7185 (coral) gradient
Secondary: #f472b6 (pink)
Text: #fafafa (white) → #71717a (muted)
```

This palette:

- Creates strong contrast for readability
- Uses warm accents for approachability
- Aligns with modern tech aesthetics

## Consequences

### Positive

- Consistent styling across all pages
- Easy to maintain and extend
- Clear documentation for future development
- Performance benefits from Tailwind's purging

### Negative

- Initial setup time for design system
- Team needs to understand token usage
- More complex than ad-hoc styling

### Neutral

- Design tokens may need adjustment as the site evolves
- Component library will grow over time

## Token Categories

| Category   | Examples                                |
| ---------- | --------------------------------------- |
| Colors     | `--color-primary`, `--color-background` |
| Typography | `--font-sans`, `--text-lg`              |
| Spacing    | `--spacing-4`, `--spacing-8`            |
| Effects    | `--shadow-lg`, `--radius-lg`            |
| Animation  | `--duration-normal`, `--ease-default`   |
