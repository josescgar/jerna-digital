# ADR 0006: Deploy Depends on CI

## Status

Accepted

## Context

The CI and Deploy workflows were both triggered independently on `push` to `main`. This meant a deployment could go out even if CI (lint, format, typecheck, E2E tests) failed. We needed to gate deployments behind successful CI completion while keeping the manual deployment override (`workflow_dispatch`) working independently.

## Decision

We replaced the `push` trigger in `deploy.yml` with a `workflow_run` trigger that reacts to the CI workflow completing on `main`. The `workflow_dispatch` trigger remains for manual overrides.

### Trigger Configuration

```yaml
on:
  workflow_run:
    workflows: ['CI']
    types: [completed]
    branches: [main]
  workflow_dispatch:
```

### Job-Level Gate

An `if` condition on the `build` job ensures deployment only proceeds when CI succeeds or when manually triggered:

```yaml
if: >-
  github.event_name == 'workflow_dispatch' ||
  (github.event_name == 'workflow_run' && github.event.workflow_run.conclusion == 'success')
```

The `deploy` job inherits this gate via `needs: build`.

### Behavior

| Scenario                   | Result                                    |
| -------------------------- | ----------------------------------------- |
| Push to `main` → CI passes | Deploy runs                               |
| Push to `main` → CI fails  | Deploy triggers but is skipped            |
| Manual `workflow_dispatch` | Deploy runs immediately, no CI dependency |
| PR to `main`               | CI runs on PR, deploy does NOT trigger    |

## Alternatives Considered

### 1. Merge CI and Deploy into a single workflow

Combining lint, test, build, and deploy steps into one workflow file.

**Rejected because:**

- Reduces separation of concerns
- Makes it harder to re-run just the deploy step
- `workflow_dispatch` for manual deploys would also run CI unnecessarily

### 2. GitHub Environments with required status checks

Using GitHub Environment protection rules to require CI to pass.

**Rejected because:**

- More complex configuration outside of version-controlled workflow files
- Requires repository settings changes beyond the workflow file
- `workflow_run` achieves the same goal with simpler, in-repo configuration

### 3. Reusable workflows with `workflow_call`

Having the deploy workflow call CI as a reusable workflow.

**Rejected because:**

- Would run CI twice (once standalone, once inside deploy)
- More complex workflow orchestration
- `workflow_run` naturally chains without duplication

## Consequences

### Positive

- Deployments are gated behind successful CI
- No changes needed to the CI workflow
- Manual deployment override remains fully independent
- Failed CI results in a clear "skipped" state in the Actions tab
- Configuration is version-controlled in the workflow file

### Negative

- `workflow_run` events have a slight delay before triggering (typically a few seconds)
- Deploy workflow appears in the Actions tab even when skipped (shows as grey/skipped)

### Neutral

- The CI workflow name (`CI`) becomes a coupling point — renaming it requires updating `deploy.yml`

## References

- [GitHub Docs: workflow_run event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_run)
- [GitHub Docs: workflow_dispatch event](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch)
