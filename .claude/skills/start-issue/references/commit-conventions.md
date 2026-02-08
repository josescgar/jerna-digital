# Commit Conventions for jerna-digital

This document defines the commit message format and conventions for the jerna-digital project.

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]
```

### Components

1. **type** (required): The type of change
2. **scope** (optional but recommended): The area of the codebase affected
3. **description** (required): Short description of the change (imperative mood)
4. **body** (optional): Detailed explanation if needed
5. **co-author** (required): Always include Claude's co-author line

---

## Types

| Type       | Description                                             | Example                                        |
| ---------- | ------------------------------------------------------- | ---------------------------------------------- |
| `feat`     | New feature                                             | `feat(hero): add animated gradient background` |
| `fix`      | Bug fix                                                 | `fix(header): correct mobile menu z-index`     |
| `chore`    | Maintenance tasks                                       | `chore(deps): update astro to 5.1`             |
| `docs`     | Documentation only                                      | `docs(readme): add deployment instructions`    |
| `refactor` | Code change that neither fixes a bug nor adds a feature | `refactor(utils): simplify cn function`        |
| `test`     | Adding or modifying tests                               | `test(contact): add form validation tests`     |
| `style`    | Code style changes (formatting, semicolons, etc.)       | `style: apply prettier formatting`             |

---

## Scopes

Use these scopes based on the area of the codebase:

### Component Scopes

- `header` - Header component
- `footer` - Footer component
- `hero` - Hero section
- `services` - Services section
- `about` - About section
- `cta` - Call-to-action section
- `contact` - Contact form/page

### UI Scopes

- `ui` - General UI components (Button, Card, Input, etc.)
- `layout` - Layout components

### Other Scopes

- `styles` - Global styles, design tokens
- `i18n` - Internationalization
- `config` - Configuration files
- `deps` - Dependencies
- `build` - Build configuration
- `test` - Test configuration
- `seo` - SEO-related changes

If no scope fits, omit it: `feat: add new utility function`

---

## Description Guidelines

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Keep under 72 characters
- Focus on what, not how

**Good:**

- `add contact form validation`
- `fix navigation link alignment`
- `update color palette for accessibility`

**Bad:**

- `Added contact form validation` (past tense)
- `Adds contact form validation.` (third person, period)
- `Updated the color palette to improve accessibility for users` (too long)

---

## Body Guidelines

Use the body when:

- The change is complex and needs explanation
- There's important context that's not obvious
- Breaking changes need documentation

Format:

- Separate from subject with blank line
- Wrap at 72 characters
- Explain what and why, not how

```
feat(auth): add session timeout handling

Users were experiencing data loss when sessions expired silently.
This change adds a warning modal 5 minutes before timeout and
automatically saves draft data before logout.
```

---

## Multi-Commit Strategy

Break work into logical, atomic commits. Each commit should:

- Be independently valid (builds, passes lint)
- Represent a single logical change
- Be revertable without breaking other changes

### Example: Adding a New Feature

Instead of one big commit, break it down:

```
1. feat(styles): add dark mode CSS variables
2. feat(ui): add ThemeToggle component
3. feat(layout): integrate ThemeToggle in Header
4. feat(styles): add dark mode support to existing components
5. test(ui): add ThemeToggle component tests
```

### Example: Bug Fix with Tests

```
1. test(contact): add failing test for email validation
2. fix(contact): correct email validation regex
```

### Example: Refactoring

```
1. refactor(utils): extract validation helpers
2. refactor(contact): use new validation helpers
3. test(utils): add validation helper tests
```

---

## Using HEREDOC for Commit Messages

When creating commits via bash, use HEREDOC to ensure proper formatting:

```bash
git commit -m "$(cat <<'EOF'
feat(scope): short description

Optional longer description that explains the change
in more detail. Wrap at 72 characters.

EOF
)"
```

---

## Quick Reference

```
feat(scope): add new feature
fix(scope): fix bug
chore(scope): maintenance task
docs(scope): documentation update
refactor(scope): code restructuring
test(scope): add or update tests
style(scope): formatting changes
```
