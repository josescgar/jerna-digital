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

## Validation

Before closing this issue, ensure:

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

## Validation

Before closing this issue, ensure:

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

## Rollback Plan

[If fix fails, what is the rollback strategy?]

## Post-Mortem Tasks

After fixing:

- [ ] Document root cause
- [ ] Identify prevention measures
- [ ] Update monitoring/alerts if needed

## Validation

Before closing this issue, ensure:

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

## Validation

Before closing this issue, ensure:

- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] `npm run test` passes
- [ ] No functional changes (behavior preserved)
```
