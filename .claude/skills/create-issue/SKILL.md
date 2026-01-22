# Create Issue Skill

---

disable-model-invocation: true
argument-hint: <type> <title>

---

Create standardized GitHub issues for the jerna-digital repository with proper templates and labels.

## Usage

```
/create-issue <type> <title>
```

## Arguments

1. **type** (required): One of `feature`, `fix`, `hotfix`, `chore`, `docs`, `refactor`
2. **title** (required): Brief description of the issue

## Type Configuration

| Type       | Labels                         | Branch Prefix | Commit Type | Use Case               |
| ---------- | ------------------------------ | ------------- | ----------- | ---------------------- |
| `feature`  | `type:feature`                 | `feature/`    | `feat`      | New functionality      |
| `fix`      | `type:fix`                     | `fix/`        | `fix`       | Bug fixes              |
| `hotfix`   | `type:hotfix`, `priority:high` | `fix/`        | `fix`       | Urgent production bugs |
| `chore`    | `type:chore`                   | `chore/`      | `chore`     | Maintenance tasks      |
| `docs`     | `type:docs`                    | `docs/`       | `docs`      | Documentation updates  |
| `refactor` | `type:refactor`                | `refactor/`   | `refactor`  | Code restructuring     |

## Instructions

### Step 1: Parse Arguments

Extract `type` and `title` from the skill arguments. Validate that:

- `type` is one of the supported types listed above
- `title` is provided and descriptive

If arguments are missing or invalid, ask the user to provide them correctly.

### Step 2: Ask Clarifying Questions

Based on the issue type, ask relevant questions using `AskUserQuestion`:

**For `feature`:**

- What is the motivation for this feature?
- What are the key acceptance criteria?
- Are there any design considerations or constraints?

**For `fix`:**

- What is the expected behavior?
- What is the actual (buggy) behavior?
- Steps to reproduce the bug?
- Any error messages or logs?

**For `hotfix`:**

- What is the user/business impact?
- What is the suspected root cause?
- Is there a temporary workaround available?

**For `chore`:**

- What maintenance tasks are needed?
- Are there any breaking changes?
- What is the expected outcome?

**For `docs`:**

- What needs to be documented?
- Who is the target audience?
- Are there related code changes?

**For `refactor`:**

- What is the current state of the code?
- What is the target state after refactoring?
- What is the rationale for this refactor?

### Step 3: Ensure Labels Exist

Before creating the issue, ensure the required labels exist. Run these commands:

```bash
# Create labels if they don't exist (errors are expected for existing labels)
gh label create "type:feature" --description "New feature" --color "0E8A16" --repo josescgar/jerna-digital 2>/dev/null || true
gh label create "type:fix" --description "Bug fix" --color "D73A4A" --repo josescgar/jerna-digital 2>/dev/null || true
gh label create "type:hotfix" --description "Urgent production fix" --color "B60205" --repo josescgar/jerna-digital 2>/dev/null || true
gh label create "type:chore" --description "Maintenance task" --color "FEF2C0" --repo josescgar/jerna-digital 2>/dev/null || true
gh label create "type:docs" --description "Documentation" --color "0075CA" --repo josescgar/jerna-digital 2>/dev/null || true
gh label create "type:refactor" --description "Code refactoring" --color "D4C5F9" --repo josescgar/jerna-digital 2>/dev/null || true
gh label create "priority:high" --description "High priority" --color "B60205" --repo josescgar/jerna-digital 2>/dev/null || true
```

### Step 4: Generate Issue Body

Use the templates from `references/issue-templates.md` to generate the issue body based on the type and user answers.

### Step 5: Create the Issue

Create the issue using the GitHub CLI:

```bash
gh issue create \
  --repo josescgar/jerna-digital \
  --title "<title>" \
  --body "<generated-body>" \
  --label "<labels>"
```

For `hotfix` type, include both `type:hotfix` and `priority:high` labels.

### Step 6: Report Success

After successful creation:

1. Display the issue URL
2. Remind the user they can start working on it with `/start-issue <issue-number>`

## Example

```
User: /create-issue feature Add dark mode toggle
Claude: I'll help you create a feature issue. Let me ask a few questions...
        [Asks questions, generates body, creates issue]
        Issue created: https://github.com/josescgar/jerna-digital/issues/1
        You can start working on it with: /start-issue 1
```
