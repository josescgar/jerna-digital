# BDD Scenario Writing Guide

This guide helps you write effective E2E test scenarios for GitHub issues in the Jerna Digital project using Behavior-Driven Development (BDD) principles.

---

## Quick Reference

### Given-When-Then Structure

BDD scenarios use three key components:

- **Given** - The initial state/preconditions before the test
- **When** - The action or event that triggers the behavior
- **Then** - The expected outcome or result

**Example:**

```
Given the user is on the contact form
When the user enters "invalid-email" in the email field
And clicks the submit button
Then an error message "Please enter a valid email address" appears
```

### Tips for Writing Good Scenarios

✅ **DO:**

- Write from the user's perspective (not technical implementation)
- Use concrete, specific examples
- Focus on one behavior per scenario
- Use plain, business-friendly language
- Include the "And" keyword to chain multiple conditions or actions

❌ **DON'T:**

- Reference implementation details (CSS selectors, function names)
- Make scenarios too broad or vague
- Combine multiple unrelated behaviors
- Use technical jargon unless necessary
- Write scenarios that test framework behavior

### Common Pitfalls

1. **Too Technical**: ❌ "When the validateEmail() function is called"
   - **Better**: ✅ "When the user enters an invalid email address"

2. **Too Vague**: ❌ "Then the form should work correctly"
   - **Better**: ✅ "Then the form is submitted successfully and a confirmation message appears"

3. **Multiple Behaviors**: ❌ "When the user fills out the form and navigates to another page"
   - **Better**: Split into two separate scenarios

4. **Testing Implementation**: ❌ "Then the useForm hook should update state"
   - **Better**: ✅ "Then the error message is removed"

---

## Playwright Integration

### How Scenarios Map to Tests

BDD scenarios translate directly to Playwright test code. Here's how the structure maps:

**Scenario:**

```
Given the user is on the contact form
When the user clicks the submit button
Then a validation error appears
```

**Playwright Test:**

```typescript
test('should show validation error for empty form', async ({ page }) => {
  // Given - setup/navigation
  await page.goto('/contact');

  // When - user action
  await page.click('button[type="submit"]');

  // Then - assertion
  await expect(page.locator('text=Name is required')).toBeVisible();
});
```

### Playwright Test Structure

Our tests use standard Playwright syntax (not Cucumber/Gherkin):

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Area', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup for all tests
    await page.goto('/page-under-test');
  });

  test('should do something specific', async ({ page }) => {
    // Given (often in beforeEach or here)

    // When
    await page.click('button');

    // Then
    await expect(page.locator('result')).toBeVisible();
  });
});
```

### Common Playwright Patterns

**Navigation:**

```typescript
await page.goto('/contact');
await page.click('a[href="/about"]');
```

**Form Interactions:**

```typescript
await page.fill('input[name="email"]', 'test@example.com');
await page.click('button[type="submit"]');
```

**Assertions:**

```typescript
await expect(page.locator('text=Success')).toBeVisible();
await expect(page).toHaveURL('/success');
await expect(page.locator('input[name="email"]')).toHaveValue(
  'test@example.com'
);
```

**Selectors:**

```typescript
// By role (preferred for accessibility)
page.getByRole('button', { name: 'Submit' });

// By test ID (good for dynamic content)
page.locator('[data-testid="submit-button"]');

// By CSS selector
page.locator('button[type="submit"]');

// By text
page.locator('text=Click me');
```

---

## Project-Specific Guidelines

### Jerna Digital Testing Conventions

**Test File Organization:**

```
tests/
├── navigation.spec.ts       # Page navigation tests
├── contact-form.spec.ts     # Contact form validation
├── responsive.spec.ts       # Responsive layout tests
├── accessibility.spec.ts    # A11y checks
└── seo.spec.ts             # Meta tags and structured data
```

**Naming Conventions:**

- Test files: `[feature-area].spec.ts`
- Test descriptions: Use "should" statements
- Be specific and descriptive

**Example:**

```typescript
// ✅ Good
test('should show validation error for invalid email', async ({ page }) => {

// ❌ Too vague
test('test email validation', async ({ page }) => {
```

### When to Write E2E Scenarios

**✅ DO write E2E scenarios for:**

- **Features**: New user-facing functionality
- **Fixes**: Bugs that affect user experience
- **Hotfixes**: Critical production issues
- **Refactors**: When user-facing behavior might be affected

**❌ DON'T write E2E scenarios for:**

- **Chores**: Dependency updates, config changes
- **Docs**: Documentation-only changes
- **Internal refactors**: No user-facing changes
- **Unit-testable logic**: Pure functions, utility code

### Referencing Existing Tests

When writing new scenarios, reference existing patterns in our test suite:

**Contact Form Validation** (`tests/contact-form.spec.ts`):

- Lines 16-22: Empty field validation
- Lines 24-33: Invalid email validation
- Lines 35-45: Error clearing on user input

**Navigation** (`tests/navigation.spec.ts`):

- Lines 4-7: Basic page load
- Lines 9-14: Link navigation
- Lines 37-41: Logo link to home

---

## Examples by Issue Type

### Feature: New Functionality

**Issue Type:** `feature`

**Scenario Example:**

```markdown
### Scenario: Enable Dark Mode

**Given** the user is on the home page in light mode
**When** the user clicks the dark mode toggle in the header
**Then** the page theme switches to dark mode
**And** the user's preference is persisted in localStorage

**Implementation Notes:**

- Test file: `tests/dark-mode.spec.ts`
- Key selectors: `button[aria-label="Toggle dark mode"]`, `html[data-theme="dark"]`
- Check: `localStorage.getItem('theme') === 'dark'`
```

**Playwright Implementation:**

```typescript
test('should enable dark mode when toggle is clicked', async ({ page }) => {
  // Given
  await page.goto('/');

  // When
  await page.click('button[aria-label="Toggle dark mode"]');

  // Then
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  const theme = await page.evaluate(() => localStorage.getItem('theme'));
  expect(theme).toBe('dark');
});
```

### Fix: Bug Reproduction

**Issue Type:** `fix`

**Scenario Example:**

```markdown
### Scenario: Error Clears When User Types

**Given** the user has triggered a validation error on the name field
**When** the user starts typing in the name field
**Then** the error message is removed

**Implementation Notes:**

- Test file: `tests/contact-form.spec.ts`
- Bug: Previously error stayed visible after typing
- Key selectors: `input[name="name"]`, `text=Name is required`
- Pattern: See contact-form.spec.ts:35-45
```

**Playwright Implementation:**

```typescript
test('should clear error when user starts typing', async ({ page }) => {
  await page.goto('/contact');

  // Given - trigger validation error
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Name is required')).toBeVisible();

  // When - start typing
  await page.fill('input[name="name"]', 'J');

  // Then - error should be cleared
  await expect(page.locator('text=Name is required')).not.toBeVisible();
});
```

### Hotfix: Critical Path

**Issue Type:** `hotfix`

**Scenario Example:**

```markdown
### Scenario: Contact Form Submission Works

**Given** the user has filled out all required fields correctly
**When** the user clicks the submit button
**Then** the form is submitted successfully
**And** a confirmation message appears

**Implementation Notes:**

- Test file: `tests/contact-form.spec.ts`
- Priority: HIGH - critical business path
- Production verification: Manually test after deploy
```

**Playwright Implementation:**

```typescript
test('should submit contact form successfully', async ({ page }) => {
  await page.goto('/contact');

  // Given
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('textarea[name="message"]', 'Hello world');

  // When
  await page.click('button[type="submit"]');

  // Then
  await expect(page.locator('text=Thank you')).toBeVisible();
});
```

### Refactor: Behavior Preservation

**Issue Type:** `refactor`

**Scenario Example:**

```markdown
### Scenario: Form Validation Still Works After Refactor

**Given** the user is on the contact form
**When** the user submits the form with empty fields
**Then** validation errors appear for all required fields
**And** the form behavior is identical to before the refactor

**Implementation Notes:**

- Add to: `tests/contact-form.spec.ts`
- Purpose: Ensure refactoring doesn't break existing validation
- Verify: Run tests before and after refactor
```

**Playwright Implementation:**

```typescript
test('should preserve validation behavior after refactor', async ({ page }) => {
  await page.goto('/contact');

  // When
  await page.click('button[type="submit"]');

  // Then - exact same behavior as before
  await expect(page.locator('text=Name is required')).toBeVisible();
  await expect(page.locator('text=Email is required')).toBeVisible();
  await expect(page.locator('text=Message is required')).toBeVisible();
});
```

---

## Additional Resources

### Learning More About BDD

- [BDD Fundamentals](https://cucumber.io/docs/bdd/)
- [Writing Better Scenarios](https://cucumber.io/docs/bdd/better-gherkin/)

### Playwright Documentation

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)

### Project Documentation

- See `/tests` directory for existing test patterns
- Reference `CLAUDE.md` for testing commands and validation
- Check `README.md` for project overview and setup

---

## Quick Checklist

Before submitting your issue with E2E scenarios:

- [ ] Scenarios use Given-When-Then structure
- [ ] Language is user-focused (not technical implementation)
- [ ] Each scenario tests one specific behavior
- [ ] Implementation notes include test file location
- [ ] Selectors are mentioned (for developer implementation)
- [ ] Related test files are referenced for patterns
- [ ] Scenarios are appropriate for the issue type

---

**Need help?** Look at existing test files in `/tests` for real-world examples and patterns used in this project.
