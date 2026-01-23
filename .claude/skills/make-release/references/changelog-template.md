# CHANGELOG Template and Formatting Guide

This guide provides templates and examples for formatting release notes in GitHub releases.

## Standard Format

```markdown
## What's Changed

[Summary of changes organized by category]

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v0.2.1...v0.3.0
```

## Change Categories

Use these categories to organize changes:

### Added

New features and functionality

### Changed

Changes to existing functionality (non-breaking)

### Deprecated

Features that will be removed in future releases

### Removed

Features that have been removed

### Fixed

Bug fixes

### Security

Security improvements and vulnerability patches

### Chore

Maintenance, dependencies, tooling updates

### Performance

Performance improvements

## Single-Category Release (Simple)

For releases with one type of change:

```markdown
## What's Changed

- Add contact form validation with real-time feedback
- Add email format verification
- Add required field indicators

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v0.2.1...v0.3.0
```

## Multi-Category Release (Comprehensive)

For releases with multiple types of changes:

```markdown
## What's Changed

### Added

- Contact form validation with real-time feedback
- Dark mode toggle in header
- Service page with interactive pricing calculator

### Fixed

- Mobile menu z-index issue on iOS Safari
- Form submission error on slow networks
- Footer alignment on tablet breakpoint

### Chore

- Update Astro to v5.1.0
- Update Tailwind CSS to v4.0.2

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v1.2.3...v1.3.0
```

## Extracting Changes from PR

### From PR Title

If PR title follows conventional commits (e.g., `feat(contact): add form validation`):

**Extract:**

- Type: `feat` → **Added** category
- Scope: `contact`
- Description: `add form validation`

**Formatted:**

```markdown
### Added

- Contact form validation
```

### From PR Body

Look for structured sections in the PR body:

**PR Body Example:**

```markdown
## Changes

- Added real-time validation to contact form
- Fixed mobile menu z-index issue
- Updated dependencies (Astro 5.0 → 5.1)

## Testing

- Tested on iOS Safari, Chrome, Firefox
```

**Extracted Changelog:**

```markdown
## What's Changed

### Added

- Real-time validation to contact form

### Fixed

- Mobile menu z-index issue

### Chore

- Update Astro to v5.1

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v0.5.0...v0.6.0
```

### From Commit Messages

If the PR is squashed, use individual commit messages to extract details:

**Commits:**

```
feat: add dark mode toggle
fix: correct header alignment
chore: update dependencies
```

**Extracted Changelog:**

```markdown
## What's Changed

### Added

- Dark mode toggle

### Fixed

- Header alignment

### Chore

- Update dependencies

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v0.4.2...v0.5.0
```

## Conventional Commit Mapping

Map conventional commit types to changelog categories:

| Commit Type | Changelog Category |
| ----------- | ------------------ |
| `feat`      | Added              |
| `fix`       | Fixed              |
| `perf`      | Performance        |
| `refactor`  | Changed            |
| `style`     | Changed            |
| `test`      | Chore              |
| `docs`      | Changed (or omit)  |
| `chore`     | Chore              |
| `ci`        | Chore              |
| `build`     | Chore              |
| `revert`    | Changed/Fixed      |

## Good vs Bad Changelog Entries

### Good Examples ✓

**Descriptive and user-focused:**

```markdown
- Add real-time form validation with error messages
- Fix mobile menu not closing when clicking outside
- Improve page load performance by 40%
- Add contact form with email integration
```

**Clear action and impact:**

```markdown
- Add dark mode toggle in header
- Fix broken links in footer navigation
- Update contact form to use Web3Forms API
```

### Bad Examples ✗

**Too vague:**

```markdown
- Various improvements
- Bug fixes
- Updated stuff
```

**Too technical (unless for developer audience):**

```markdown
- Refactored ContactForm component to use useReducer
- Fixed hydration mismatch in client:load directive
- Migrated from class variance authority to cva
```

**Includes internal details:**

```markdown
- WIP: working on contact form
- TODO: fix this later
- Quick fix before deploy
```

## Special Cases

### Hotfix Release

```markdown
## What's Changed

**Hotfix:** Critical security patch for contact form validation bypass.

### Security

- Fix XSS vulnerability in contact form input sanitization

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v1.2.3...v1.2.4
```

### Breaking Changes (Major Version)

```markdown
## What's Changed

**⚠️ BREAKING CHANGES**

This release includes breaking changes. Please review the migration guide below.

### Changed

- Redesigned site layout with new navigation structure
- Updated URL structure for case studies (`/case-studies/` → `/work/`)

### Migration Guide

- Update bookmarks to use new `/work/` URLs
- Clear browser cache to see updated styles

### Added

- New work showcase section
- Client testimonials carousel

**Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v1.9.0...v2.0.0
```

### First Release (v0.1.0 or v1.0.0)

```markdown
## What's Changed

Initial release of Jerna Digital portfolio website.

### Features

- Responsive homepage with hero section
- About page with professional background
- Services showcase
- Contact form with email integration
- Dark mode aesthetic with warm accent colors

**Full Changelog**: https://github.com/josescgar/jerna-digital/commits/v0.1.0
```

## Generating the Full Changelog Link

Format: `https://github.com/{owner}/{repo}/compare/{previous-tag}...{new-tag}`

Example:

```
https://github.com/josescgar/jerna-digital/compare/v0.2.1...v0.3.0
```

For first release (no previous tag):

```
https://github.com/josescgar/jerna-digital/commits/v0.1.0
```

## Tips for Writing Great Changelogs

1. **Focus on impact** - Describe what changed for the user, not how it was implemented
2. **Be concise** - One line per change, keep it scannable
3. **Use action verbs** - "Add", "Fix", "Update", "Remove", "Improve"
4. **Group related changes** - Use categories to organize
5. **Highlight breaking changes** - Make them obvious with warnings
6. **Link to issues** - Include issue numbers for reference (e.g., "Fix mobile menu (#42)")
7. **Omit noise** - Skip dependency bumps unless they're user-impacting
8. **Write for humans** - Assume readers may not be technical

## Template Selection Guide

**Use simple format when:**

- Single PR with one feature/fix
- Small, focused release
- All changes fit one category

**Use comprehensive format when:**

- Multiple PRs merged
- Mix of features, fixes, and chores
- Significant release with various changes

**Use special format when:**

- Hotfix/security release
- Breaking changes (major version)
- First release of the project
