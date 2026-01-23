# Issue Templates

Use these templates when generating issue bodies for the `/create-issue` skill.

---

## Feature Template

```markdown
## Summary

[Brief description of the feature]

## Motivation

[Why is this feature needed? What problem does it solve?]

## Proposed Solution

[High-level description of how to implement this feature]

## Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Design Considerations

[Any design constraints, UX considerations, or technical decisions]

## E2E Test Scenarios

> **Note**: These scenarios will be implemented as Playwright tests in the `/tests` directory.

### Scenario: [Name of user flow]

**Given** [initial state/preconditions]
**When** [user action/trigger]
**Then** [expected outcome]

**Implementation Notes:**

- Test file: `tests/[feature-name].spec.ts`
- Key selectors: [DOM selectors for elements]
- Related tests: [existing test files to reference]

---

<details>
<summary>Example: Contact Form Validation</summary>

### Scenario: Show Validation Error for Invalid Email

**Given** the user is on the contact form
**When** the user enters "invalid-email" in the email field
**And** clicks the submit button
**Then** an error message "Please enter a valid email address" appears
**And** the form is not submitted

**Implementation Notes:**

- Test file: `tests/contact-form.spec.ts`
- Key selectors: `input[name="email"]`, `button[type="submit"]`, `text=Please enter a valid email address`
- Pattern: Similar to existing validation tests in contact-form.spec.ts:24-33

</details>

## Validation

Before closing this issue, ensure:

- [ ] All E2E scenarios implemented and passing
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] Feature works as expected in browser
```

---

## Fix Template

```markdown
## Bug Description

[Clear description of the bug]

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Environment

- Browser: [e.g., Chrome 120, Safari 17]
- OS: [e.g., macOS 14, Windows 11]
- Device: [e.g., Desktop, Mobile]

## Error Messages / Screenshots

[Include any relevant error messages or screenshots]

## Proposed Fix

[If known, describe the proposed solution]

## E2E Regression Test

> **Critical**: This test must pass before closing to prevent regression.

### Scenario: Bug Reproduction and Fix Verification

**Given** [conditions that trigger the bug]
**When** [user actions that cause the bug]
**Then** [correct behavior after fix]

**Implementation Notes:**

- Test file: `tests/[area].spec.ts`
- Bug behavior: [what was failing before]
- Key selectors: [elements involved]

---

<details>
<summary>Example: Form Error Not Clearing</summary>

### Scenario: Error Clears When User Types

**Given** the user has triggered a validation error on the name field
**When** the user starts typing in the name field
**Then** the error message is removed

**Implementation Notes:**

- Test file: `tests/contact-form.spec.ts`
- Bug: Previously error stayed visible after typing
- Key selectors: `input[name="name"]`, `text=Name is required`
- Pattern: See contact-form.spec.ts:35-45

</details>

## Validation

Before closing this issue, ensure:

- [ ] Regression test implemented and passing
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] Bug is no longer reproducible
```

---

## Hotfix Template

```markdown
## Urgent Issue

**Priority: HIGH**

## Impact

[Describe the user/business impact of this bug]

## Bug Description

[Clear description of the production bug]

## Suspected Root Cause

[Initial analysis of what might be causing the issue]

## Temporary Workaround

[If available, describe any temporary workaround]

## Proposed Fix

[Describe the proposed fix]

## Critical Path E2E Test

> **Required**: This scenario must be tested immediately after deploy.

### Scenario: Critical User Flow

**Given** [production conditions]
**When** [critical user action that's broken]
**Then** [expected business outcome]

**Implementation Notes:**

- Test file: `tests/[area].spec.ts`
- Priority: HIGH - implement with or before the fix
- Production verification: [how to verify manually if needed]

## Rollback Plan

[If fix fails, what is the rollback strategy?]

## Post-Mortem Tasks

After fixing:

- [ ] Document root cause
- [ ] Identify prevention measures
- [ ] Update monitoring/alerts if needed

## Validation

Before closing this issue, ensure:

- [ ] Critical path test implemented and passing
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] Fix verified in production
```

---

## Chore Template

```markdown
## Summary

[Brief description of the maintenance task]

## Tasks

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

## Breaking Changes

[List any breaking changes, or "None" if no breaking changes]

## Expected Outcome

[What should be different after completing this chore]

## Validation

Before closing this issue, ensure:

- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
```

---

## Docs Template

```markdown
## Summary

[Brief description of what needs to be documented]

## Target Audience

[Who is this documentation for? e.g., developers, users, contributors]

## Documentation Scope

- [ ] [Area 1 to document]
- [ ] [Area 2 to document]
- [ ] [Area 3 to document]

## Related Code Changes

[Link to related code changes, or "N/A" if documentation-only]

## Location

[Where should this documentation live? e.g., README.md, docs/, inline comments]

## Validation

Before closing this issue, ensure:

- [ ] Documentation is clear and accurate
- [ ] Code examples work correctly
- [ ] Links are valid
- [ ] `npm run format:check` passes (if modifying code files)
```

---

## Refactor Template

```markdown
## Summary

[Brief description of the refactoring]

## Current State

[Describe the current state of the code and its problems]

## Target State

[Describe the desired state after refactoring]

## Rationale

[Why is this refactoring needed? e.g., maintainability, performance, readability]

## Affected Areas

- [File/module 1]
- [File/module 2]
- [File/module 3]

## Approach

[High-level description of the refactoring approach]

## Risks

[Potential risks and mitigation strategies]

## Behavior Preservation Tests

> **Note**: Only required if this refactor touches user-facing functionality.

### Existing Test Coverage

Document which tests already cover this code:

- [List test files that exercise the refactored code]

### Additional Scenarios (if needed)

If existing tests don't cover critical paths affected by this refactor:

### Scenario: [Behavior that must be preserved]

**Given** [setup]
**When** [action]
**Then** [must work exactly as before]

**Implementation Notes:**

- Add to: `tests/[existing-file].spec.ts`
- Purpose: Ensure no functional changes during refactor

## Validation

Before closing this issue, ensure:

- [ ] Behavior preservation verified (no functional changes)
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] No functional changes (behavior preserved)
```
