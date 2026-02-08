# Start Issue Skill

---

disable-model-invocation: true
argument-hint: <issue-number>

---

Start working on a GitHub issue with an enforced plan-first workflow. This skill ensures proper planning before any code is written.

## Usage

```
/start-issue <issue-number>
```

**ALWAYS** make sure an issue number is provided. Ask for one if missing.

## Arguments

1. **issue-number** (required): The GitHub issue number to work on

## Workflow Overview

```
Phase 1: Setup → Phase 2: Planning (MANDATORY) → Phase 3: Implementation → Phase 4: PR Creation
```

---

## Phase 1: Setup

### Step 1.1: Fetch Issue Details

```bash
gh issue view <issue-number> --repo josescgar/jerna-digital
```

Parse the issue to extract:

- Title
- Body/description
- Labels
- Acceptance criteria

### Step 1.2: Assign Issue to Self

```bash
gh issue edit <issue-number> --add-assignee @me --repo josescgar/jerna-digital
```

### Step 1.3: Determine Branch Type

Map the issue labels to branch type:

| Label           | Branch Prefix | Commit Type |
| --------------- | ------------- | ----------- |
| `type:feature`  | `feature/`    | `feat`      |
| `type:fix`      | `fix/`        | `fix`       |
| `type:hotfix`   | `fix/`        | `fix`       |
| `type:chore`    | `chore/`      | `chore`     |
| `type:docs`     | `docs/`       | `docs`      |
| `type:refactor` | `refactor/`   | `refactor`  |

If no type label is found, default to `feature/`.

### Step 1.4: Create Feature Branch

Generate branch name: `<prefix>/<issue-number>-<slugified-title>`

Slugify rules:

- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Truncate to 50 characters max

```bash
# Ensure on main and up to date
git checkout main
git pull origin main

# Create and checkout new branch
git checkout -b <branch-name>
```

---

## Phase 2: Planning (MANDATORY)

**CRITICAL: You MUST complete planning before writing any code.**

### Step 2.1: Display Issue Summary

Present to the user:

- Issue title and number
- Issue description
- Acceptance criteria
- Labels

### Step 2.2: Enter Plan Mode

Use `EnterPlanMode` tool to enter planning mode. This enforces read-only exploration.

**State clearly:**

> "I'm now entering plan mode to analyze the codebase and create an implementation plan. No code will be written until you approve the plan."

### Step 2.3: Explore Codebase

Perform read-only operations to understand:

- Relevant files that need modification
- Existing patterns and conventions
- Dependencies and imports
- Test files that may need updates

Use tools: `Read`, `Glob`, `Grep`, `Task` (with Explore agent)

**DO NOT use**: `Edit`, `Write`, `Bash` (for modifications)

### Step 2.4: Create Implementation Plan

Write a plan that includes:

1. **Files to Modify/Create**
   - List each file with brief description of changes

2. **Commit Strategy**
   - Break work into logical, atomic commits
   - Each commit should be independently valid
   - Follow conventional commit format

3. **Implementation Steps**
   - Ordered list of what to do
   - Include validation checkpoints

4. **Risks and Mitigations**
   - Potential issues
   - How to address them

5. **Testing Strategy**
   - What tests to add/modify
   - How to verify the changes work

### Step 2.5: Request Approval

Use `ExitPlanMode` to present the plan and request user approval.

**DO NOT proceed to Phase 3 without explicit user approval.**

---

## Phase 3: Implementation (After Approval)

### Step 3.1: Implement Changes

Follow the approved plan to implement changes:

- Make changes in the order specified
- Create atomic commits after each logical unit of work

### Step 3.2: Create Commits

For each commit, use the conventional commit format:

```
<type>(<scope>): <description>

[optional body]

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

See `references/commit-conventions.md` for details.

### Step 3.3: Validate After Each Commit

Run validation after each commit:

```bash
npm run lint && npm run format:check && npm run build
```

If validation fails:

1. Fix the issues
2. Amend the commit if it was the cause
3. Or create a new fix commit

---

## Phase 4: PR Creation

### Step 4.1: Run Validation

```bash
npm run lint && npm run format:check && npm run build
```

All checks must pass before creating the PR. The pre-push hook will additionally run Chromium E2E tests locally before the push goes through.

### Step 4.2: Push Branch

```bash
git push -u origin <branch-name>
```

### Step 4.3: Create Draft Pull Request

Create the PR as a **draft**. This triggers only lint/format/typecheck in CI (no E2E), keeping feedback fast during development iterations.

```bash
gh pr create \
  --repo josescgar/jerna-digital \
  --draft \
  --title "<type>(<scope>): <description>" \
  --body "$(cat <<'EOF'
## Summary

[Brief description of changes]

Closes #<issue-number>

## Changes

- [Change 1]
- [Change 2]
- [Change 3]

## Test Plan

- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm run build` succeeds
- [ ] E2E tests pass (Chromium via pre-push hook)
- [ ] Manual testing completed

## Screenshots (if applicable)

[Add screenshots for UI changes]

---
Generated with Claude Code
EOF
)"
```

### Step 4.4: Mark PR as Ready for Review

After the draft PR is created and CI passes the lint/format/typecheck tier, mark it as ready for review. This triggers CI to run Chromium E2E tests.

```bash
gh pr ready <pr-number> --repo josescgar/jerna-digital
```

### Step 4.5: Report Success

Display:

- PR URL
- Summary of what was implemented
- Note that CI is now running Chromium E2E tests
- Any follow-up items or notes

---

## Example Session

```
User: /start-issue 1

Claude: [Phase 1: Setup]
        Fetching issue #1...
        Issue: "Add dark mode toggle"
        Labels: type:feature

        Assigning issue to myself...
        Creating branch: feature/1-add-dark-mode-toggle

        [Phase 2: Planning]
        I'm now entering plan mode to analyze the codebase and create an
        implementation plan. No code will be written until you approve the plan.

        [Explores codebase, creates plan]

        Here's my implementation plan:

        ## Files to Modify
        1. src/styles/global.css - Add dark mode CSS variables
        2. src/components/ui/ThemeToggle.tsx - Create toggle component
        ...

        ## Commit Strategy
        1. feat(styles): add dark mode CSS variables
        2. feat(ui): add ThemeToggle component
        ...

        Do you approve this plan?

User: Yes, looks good

Claude: [Phase 3: Implementation]
        Implementing the approved plan...

        [Makes changes, creates commits, validates]

        [Phase 4: PR Creation]
        Running validation...
        All checks passed!

        Creating draft pull request...
        Draft PR created: https://github.com/josescgar/jerna-digital/pull/2

        Marking PR as ready for review...
        PR #2 is now ready — CI will run Chromium E2E tests.
```

## Error Handling

- **Issue not found**: Inform user and ask for correct issue number
- **Branch already exists**: Ask user if they want to continue on existing branch or create new
- **Validation fails**: Fix issues before proceeding, never skip validation
- **User rejects plan**: Ask for feedback and revise the plan
