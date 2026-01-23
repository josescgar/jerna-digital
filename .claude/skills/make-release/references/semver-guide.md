# Semantic Versioning Guide

This guide explains how to determine version numbers using Semantic Versioning (Semver) for the jerna-digital project.

## Semver Format

Versions follow the format: **MAJOR.MINOR.PATCH**

Example: `v1.4.2`

- MAJOR = 1
- MINOR = 4
- PATCH = 2

## When to Bump Each Component

### PATCH Version (x.x.PATCH)

**Increment when:** Making backwards-compatible bug fixes

**Examples:**

- Fixing a broken link
- Correcting CSS styling bugs
- Fixing form validation edge cases
- Patching security vulnerabilities
- Correcting typos in UI text
- Fixing accessibility issues

**Version changes:**

- v1.2.3 → v1.2.4
- v0.5.1 → v0.5.2

### MINOR Version (x.MINOR.x)

**Increment when:** Adding new backwards-compatible functionality

**Examples:**

- Adding a new page or section
- Adding new form fields
- Implementing new UI components
- Adding new animations or interactions
- Enhancing existing features without breaking changes
- Adding new translation strings
- Improving performance without API changes

**Version changes:**

- v1.2.3 → v1.3.0 (reset PATCH to 0)
- v0.5.1 → v0.6.0

**Important:** When incrementing MINOR, reset PATCH to 0.

### MAJOR Version (MAJOR.x.x)

**Increment when:** Making backwards-incompatible changes

**Examples:**

- Redesigning the site layout (breaking existing URLs or structure)
- Changing the component API (if you're building a component library)
- Removing features or pages
- Changing behavior that users depend on
- Migrating to a new framework (e.g., Astro 4 → Astro 5 if it breaks compatibility)
- Restructuring URLs or routes in a breaking way

**Version changes:**

- v1.2.3 → v2.0.0 (reset MINOR and PATCH to 0)
- v0.9.5 → v1.0.0 (graduating to stable)

**Important:** When incrementing MAJOR, reset MINOR and PATCH to 0.

## Pre-1.0.0 Releases (Initial Development)

For projects in initial development (before stable release):

- Start at **v0.1.0** for the first release
- Increment MINOR for new features: v0.1.0 → v0.2.0
- Increment PATCH for bug fixes: v0.1.0 → v0.1.1
- Breaking changes can happen in MINOR versions during 0.x.x
- When ready for stable release, bump to **v1.0.0**

## Version Calculation Examples

### Example 1: Bug Fix Release

Current version: `v1.3.2`
Change: Fixed mobile menu not closing on iOS Safari
Type: **PATCH**
New version: `v1.3.3`

### Example 2: New Feature Release

Current version: `v1.3.3`
Change: Added blog section with pagination
Type: **MINOR**
New version: `v1.4.0`

### Example 3: Breaking Change Release

Current version: `v1.4.0`
Change: Complete site redesign with new URL structure
Type: **MAJOR**
New version: `v2.0.0`

### Example 4: First Release

Current version: None
Change: Initial site launch with core features
Type: **MINOR** (first feature release)
New version: `v0.1.0`

### Example 5: Multiple Changes

Current version: `v0.5.2`
Changes:

- Fixed contact form validation (PATCH)
- Added dark mode toggle (MINOR)
- Updated footer links (PATCH)

Highest priority change: MINOR (new feature)
New version: `v0.6.0`

**Rule:** When a release contains multiple types of changes, use the highest priority bump (MAJOR > MINOR > PATCH).

## Special Cases

### Security Patches

Security fixes are typically PATCH releases, but can be MINOR or MAJOR depending on the change:

- Security fix without API changes: PATCH
- Security fix requiring configuration changes: MINOR
- Security fix requiring code changes by users: MAJOR

### Dependency Updates

- Updating dependencies with no functional changes: PATCH
- Updating dependencies with new features available: MINOR
- Updating dependencies with breaking changes: MAJOR

### Documentation-Only Changes

Documentation updates typically don't warrant a new release unless:

- The docs are shipped as part of the product (like API docs)
- The docs change reflects a functional change

For jerna-digital (a website project), documentation updates are usually bundled with functional changes.

## Quick Decision Tree

```
Is this a backwards-incompatible change?
├─ YES → MAJOR version bump
└─ NO → Is this adding new functionality?
    ├─ YES → MINOR version bump
    └─ NO → Is this a bug fix or internal change?
        └─ YES → PATCH version bump
```

## Git Tags

All releases should be tagged with the version number prefixed with 'v':

- ✓ Correct: `v1.2.3`
- ✗ Incorrect: `1.2.3` or `version-1.2.3`

## Version Comparison

When comparing versions, follow this order:

1. Compare MAJOR (higher is newer)
2. If MAJOR is equal, compare MINOR (higher is newer)
3. If MINOR is equal, compare PATCH (higher is newer)

Examples:

- v2.0.0 > v1.9.9
- v1.5.0 > v1.4.10
- v1.4.2 > v1.4.1

## Additional Resources

- Official Semver specification: https://semver.org/
- Semver calculator: https://semver.npmjs.com/
