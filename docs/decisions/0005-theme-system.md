# ADR 0005: Theme System (Light/Dark Mode)

## Status

Accepted

## Context

Users increasingly expect websites to support both light and dark color schemes. A theme system was needed to:

- Respect user system preferences (prefers-color-scheme)
- Allow users to manually override the theme
- Persist user preference across sessions
- Avoid Flash of Unstyled Content (FOUC) on page load
- Maintain the existing dark theme as the default

## Decision

We implemented a CSS custom properties-based theme system using the `[data-theme]` attribute pattern.

### Architecture

1. **CSS Custom Properties**: Colors are defined as CSS variables in `@theme` (dark mode default) with light mode overrides in `[data-theme='light']`.

2. **Tailwind Integration**: Added `@custom-variant light` for Tailwind utilities that need theme-specific styling.

3. **Theme Detection Priority**:
   1. Stored preference in localStorage (`jerna-theme` key)
   2. System preference via `prefers-color-scheme`
   3. Default to dark theme

### Implementation Details

#### CSS Structure (`src/styles/global.css`)

```css
@custom-variant light (&:where([data-theme=light], [data-theme=light] *));

/* Dark mode colors in @theme { ... } (default) */

[data-theme='light'] {
  --color-background: #ffffff;
  --color-foreground: #111827;
  /* ... other light mode overrides */
}
```

#### FOUC Prevention (`src/layouts/BaseLayout.astro`)

An inline script in the `<head>` runs synchronously before any render:

```html
<script is:inline>
  (function () {
    var stored = localStorage.getItem('jerna-theme');
    var system = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
    var theme = stored === 'light' || stored === 'dark' ? stored : system;
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

The `no-transitions` class is used to disable CSS transitions during initial load, then removed via `requestAnimationFrame`.

#### Theme Toggle Component (`src/components/ui/ThemeToggle.astro`)

- Sun icon (visible in dark mode) - click to switch to light
- Moon icon (visible in light mode) - click to switch to dark
- Listens for system preference changes when no stored preference exists

#### Theme Utilities (`src/theme/utils.ts`)

Type-safe utilities following the same pattern as `src/i18n/utils.ts`:

- `getStoredTheme()` / `setStoredTheme()`
- `getSystemTheme()`
- `getPreferredTheme()`
- `applyTheme()`
- `toggleTheme()`

## Alternatives Considered

### 1. CSS `@media (prefers-color-scheme)`

Using media queries alone without JavaScript.

**Rejected because:**

- No way to let users override system preference
- Cannot persist user choice across sessions

### 2. Class-based approach (`.dark` / `.light` on body)

**Rejected because:**

- `[data-theme]` attribute is more semantic
- Easier to query in JavaScript (`getAttribute` vs `classList.contains`)
- Better separation of concerns (data vs presentation)

### 3. Separate CSS files per theme

**Rejected because:**

- Requires additional HTTP requests
- More complex to manage
- CSS custom properties provide sufficient flexibility

### 4. JavaScript-only theming

Applying colors via JavaScript instead of CSS.

**Rejected because:**

- Performance concerns
- More prone to FOUC
- Harder to maintain

## Consequences

### Positive

- Theme loads instantly without FOUC
- Respects both user preference and system setting
- Smooth transitions when toggling (after initial load)
- Type-safe utilities prevent runtime errors
- Follows existing i18n pattern for consistency

### Negative

- Small inline script in `<head>` (necessary for FOUC prevention)
- Theme transitions apply to all elements (mitigated by respecting `prefers-reduced-motion`)

### Neutral

- Adding new themed elements requires adding light mode overrides
- localStorage key (`jerna-theme`) must remain consistent

## References

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Josh Comeau's Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)
- [Web.dev: Prefers Color Scheme](https://web.dev/prefers-color-scheme/)
