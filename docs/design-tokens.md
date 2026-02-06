# Design Tokens Reference

This document describes the design tokens used throughout the Jerna Digital website. All tokens are defined as CSS custom properties in `src/styles/global.css`.

## Color Palette

The site supports both dark (default) and light themes. Colors automatically adjust based on the `data-theme` attribute on `<html>`.

### Background Colors

| Token                         | Dark Value | Light Value | Usage                      |
| ----------------------------- | ---------- | ----------- | -------------------------- |
| `--color-background`          | `#0a0a0b`  | `#ffffff`   | Page background            |
| `--color-background-elevated` | `#111113`  | `#f9fafb`   | Cards, elevated surfaces   |
| `--color-background-subtle`   | `#18181b`  | `#f3f4f6`   | Subtle backgrounds, inputs |
| `--color-background-muted`    | `#27272a`  | `#e5e7eb`   | Muted backgrounds, hovers  |

### Text Colors

| Token                       | Dark Value | Light Value | Usage                       |
| --------------------------- | ---------- | ----------- | --------------------------- |
| `--color-foreground`        | `#fafafa`  | `#111827`   | Primary text                |
| `--color-foreground-muted`  | `#a1a1aa`  | `#4b5563`   | Secondary text              |
| `--color-foreground-subtle` | `#71717a`  | `#6b7280`   | Tertiary text, placeholders |

### Primary Colors (Orange)

| Token                        | Value     | Usage                      |
| ---------------------------- | --------- | -------------------------- |
| `--color-primary`            | `#f97316` | Primary buttons, links     |
| `--color-primary-light`      | `#fb923c` | Hover states               |
| `--color-primary-dark`       | `#ea580c` | Active states              |
| `--color-primary-foreground` | `#0a0a0b` | Text on primary background |

### Secondary Colors (Coral/Pink)

| Token                     | Value     | Usage             |
| ------------------------- | --------- | ----------------- |
| `--color-secondary`       | `#f472b6` | Secondary accents |
| `--color-secondary-light` | `#f9a8d4` | Hover states      |
| `--color-secondary-dark`  | `#ec4899` | Active states     |

### Accent Colors (Gradients)

| Token                   | Value     | Usage           |
| ----------------------- | --------- | --------------- |
| `--color-accent-orange` | `#f97316` | Gradient start  |
| `--color-accent-coral`  | `#fb7185` | Gradient middle |
| `--color-accent-pink`   | `#f472b6` | Gradient end    |

### Border Colors

| Token                   | Dark Value                | Light Value | Usage           |
| ----------------------- | ------------------------- | ----------- | --------------- |
| `--color-border`        | `#27272a`                 | `#e5e7eb`   | Default borders |
| `--color-border-subtle` | `#3f3f46`                 | `#d1d5db`   | Hover borders   |
| `--color-border-accent` | `rgba(249, 115, 22, 0.3)` | (unchanged) | Accent borders  |

### Status Colors

| Token             | Value     | Usage          |
| ----------------- | --------- | -------------- |
| `--color-success` | `#22c55e` | Success states |
| `--color-warning` | `#eab308` | Warning states |
| `--color-error`   | `#ef4444` | Error states   |
| `--color-info`    | `#3b82f6` | Info states    |

## Typography

### Font Families

| Token            | Value                             | Usage     |
| ---------------- | --------------------------------- | --------- |
| `--font-sans`    | `Inter, system-ui, sans-serif`    | Body text |
| `--font-heading` | `Space Grotesk, var(--font-sans)` | Headings  |
| `--font-mono`    | `JetBrains Mono, monospace`       | Code      |

### Font Sizes

| Token         | Value             | Tailwind Class |
| ------------- | ----------------- | -------------- |
| `--text-xs`   | `0.75rem` (12px)  | `text-xs`      |
| `--text-sm`   | `0.875rem` (14px) | `text-sm`      |
| `--text-base` | `1rem` (16px)     | `text-base`    |
| `--text-lg`   | `1.125rem` (18px) | `text-lg`      |
| `--text-xl`   | `1.25rem` (20px)  | `text-xl`      |
| `--text-2xl`  | `1.5rem` (24px)   | `text-2xl`     |
| `--text-3xl`  | `1.875rem` (30px) | `text-3xl`     |
| `--text-4xl`  | `2.25rem` (36px)  | `text-4xl`     |
| `--text-5xl`  | `3rem` (48px)     | `text-5xl`     |
| `--text-6xl`  | `3.75rem` (60px)  | `text-6xl`     |
| `--text-7xl`  | `4.5rem` (72px)   | `text-7xl`     |

### Font Weights

| Token              | Value | Tailwind Class   |
| ------------------ | ----- | ---------------- |
| `--font-light`     | `300` | `font-light`     |
| `--font-normal`    | `400` | `font-normal`    |
| `--font-medium`    | `500` | `font-medium`    |
| `--font-semibold`  | `600` | `font-semibold`  |
| `--font-bold`      | `700` | `font-bold`      |
| `--font-extrabold` | `800` | `font-extrabold` |

### Line Heights

| Token               | Value   | Usage               |
| ------------------- | ------- | ------------------- |
| `--leading-none`    | `1`     | Single line         |
| `--leading-tight`   | `1.25`  | Headings            |
| `--leading-snug`    | `1.375` | Subheadings         |
| `--leading-normal`  | `1.5`   | Body text (default) |
| `--leading-relaxed` | `1.625` | Long-form text      |
| `--leading-loose`   | `2`     | Extra spacing       |

## Spacing

| Token          | Value     | Pixels |
| -------------- | --------- | ------ |
| `--spacing-0`  | `0`       | 0px    |
| `--spacing-1`  | `0.25rem` | 4px    |
| `--spacing-2`  | `0.5rem`  | 8px    |
| `--spacing-3`  | `0.75rem` | 12px   |
| `--spacing-4`  | `1rem`    | 16px   |
| `--spacing-5`  | `1.25rem` | 20px   |
| `--spacing-6`  | `1.5rem`  | 24px   |
| `--spacing-8`  | `2rem`    | 32px   |
| `--spacing-10` | `2.5rem`  | 40px   |
| `--spacing-12` | `3rem`    | 48px   |
| `--spacing-16` | `4rem`    | 64px   |
| `--spacing-20` | `5rem`    | 80px   |
| `--spacing-24` | `6rem`    | 96px   |
| `--spacing-32` | `8rem`    | 128px  |

## Effects

### Border Radius

| Token           | Value            | Usage           |
| --------------- | ---------------- | --------------- |
| `--radius-sm`   | `0.25rem` (4px)  | Small elements  |
| `--radius-md`   | `0.5rem` (8px)   | Buttons, inputs |
| `--radius-lg`   | `0.75rem` (12px) | Cards           |
| `--radius-xl`   | `1rem` (16px)    | Large cards     |
| `--radius-2xl`  | `1.5rem` (24px)  | Hero elements   |
| `--radius-full` | `9999px`         | Pills, circles  |

### Shadows

| Token              | Usage              |
| ------------------ | ------------------ |
| `--shadow-sm`      | Subtle elevation   |
| `--shadow-md`      | Default elevation  |
| `--shadow-lg`      | Cards, modals      |
| `--shadow-xl`      | Prominent elements |
| `--shadow-glow`    | Primary color glow |
| `--shadow-glow-lg` | Large glow effect  |

## Transitions

### Durations

| Token               | Value   | Usage               |
| ------------------- | ------- | ------------------- |
| `--duration-fast`   | `150ms` | Micro-interactions  |
| `--duration-normal` | `200ms` | Default transitions |
| `--duration-slow`   | `300ms` | Complex transitions |
| `--duration-slower` | `500ms` | Page transitions    |

### Easing

| Token            | Value                                    | Usage            |
| ---------------- | ---------------------------------------- | ---------------- |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)`           | Default easing   |
| `--ease-in`      | `cubic-bezier(0.4, 0, 1, 1)`             | Enter animations |
| `--ease-out`     | `cubic-bezier(0, 0, 0.2, 1)`             | Exit animations  |
| `--ease-in-out`  | `cubic-bezier(0.4, 0, 0.2, 1)`           | Symmetrical      |
| `--ease-bounce`  | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful bounce   |

## Z-Index Scale

| Token                | Value | Usage           |
| -------------------- | ----- | --------------- |
| `--z-base`           | `0`   | Default         |
| `--z-dropdown`       | `10`  | Dropdowns       |
| `--z-sticky`         | `20`  | Sticky elements |
| `--z-fixed`          | `30`  | Fixed header    |
| `--z-modal-backdrop` | `40`  | Modal backdrop  |
| `--z-modal`          | `50`  | Modal content   |
| `--z-popover`        | `60`  | Popovers        |
| `--z-tooltip`        | `70`  | Tooltips        |

## Utility Classes

### Gradients

```css
.text-gradient       /* Orange to coral to pink text */
.bg-gradient-primary /* Orange to coral background */
.bg-gradient-secondary /* Coral to pink background */
.bg-gradient-full    /* Full orange to pink gradient */
```

### Glass Effect

```css
.glass /* Glassmorphism with blur and border */
```

### Animations

```css
.animate-float      /* Subtle floating motion */
.animate-rotate-slow /* Slow rotation (20s) */
.animate-pulse-glow /* Pulsing glow effect */
.animate-gradient   /* Shifting gradient */
.animate-fade-in-up /* Fade in with upward motion */
.stagger-children   /* Staggered child animations */
```

## Usage Examples

### In CSS

```css
.my-element {
  background-color: var(--color-background-elevated);
  color: var(--color-foreground);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  transition: all var(--duration-normal) var(--ease-default);
}
```

### In Tailwind (via @theme)

```html
<div
  class="bg-background-elevated text-foreground border-border duration-normal rounded-lg border p-4 transition-all"
>
  Content
</div>
```

## Theme System

The site supports light and dark themes. Dark is the default.

### How Theming Works

1. **Detection**: Theme is determined by stored preference (`localStorage.jerna-theme`) or system preference (`prefers-color-scheme`)
2. **Application**: The `data-theme` attribute on `<html>` controls which colors are active
3. **Transitions**: CSS transitions animate color changes when toggling (disabled on initial load to prevent FOUC)

### Theme-Specific Styling

For components that need different styling per theme, use the `light:` variant:

```html
<!-- Text that's different in light mode -->
<p class="text-foreground-muted light:text-foreground-subtle">Adaptive text</p>
```

Or use CSS:

```css
.my-element {
  background: rgba(17, 17, 19, 0.7);
}

[data-theme='light'] .my-element {
  background: rgba(255, 255, 255, 0.8);
}
```

### Adding Theme Support to New Colors

When adding new color tokens that should change between themes:

1. Add the dark mode value in the `@theme` block
2. Add the light mode override in `[data-theme='light']` block

See `src/styles/global.css` for the full implementation and `docs/decisions/0005-theme-system.md` for architectural details.
