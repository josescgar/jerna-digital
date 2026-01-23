# Make Release Skill

---

disable-model-invocation: true
argument-hint: <pr-number>

---

Automate the release process for the jerna-digital repository following Semver conventions and GitHub best practices.

## Usage

```
/make-release <pr-number>
```

## Arguments

1. **pr-number** (required): The pull request number to merge and release

## Instructions

This skill follows a phase-based workflow to ensure safe and proper releases.

### Phase 1: Validation

**Objective:** Verify the PR is ready for release and extract necessary information.

1. Fetch PR details:

```bash
gh pr view <pr-number> --repo josescgar/jerna-digital --json number,title,body,state,mergeable,headRefName,commits
```

2. Extract and verify:
   - PR title and body
   - Mergeable status (must be `MERGEABLE`)
   - Branch name (store for later cleanup)
   - Related issue number (parse from "Closes #X" or "Fixes #X" in body)
   - Commit messages (for changelog generation)

3. Error handling:
   - If PR not found → inform user and stop
   - If PR not mergeable → inform user of status and stop
   - If no related issue → continue (this is optional)

4. Display summary to user:
   ```
   PR #<number>: <title>
   Status: Mergeable ✓
   Branch: <branch-name>
   Related Issue: #<issue-number> (if found)
   ```

### Phase 2: Versioning

**Objective:** Determine the next version number with user input.

1. Get the latest release:

```bash
gh release list --repo josescgar/jerna-digital --limit 1 --json tagName
```

2. If no releases exist, set current version to `v0.0.0` (so first release will be `v0.1.0` for minor).

3. Use `AskUserQuestion` to determine release type:

```
Question: "What type of release is this?"
Header: "Release Type"
Options:
  - Patch - Bug fixes and minor changes (e.g., v1.2.3 → v1.2.4)
  - Minor - New features, backwards compatible (e.g., v1.2.3 → v1.3.0)
  - Major - Breaking changes (e.g., v1.2.3 → v2.0.0)
```

4. Calculate suggested version based on user response:
   - Parse current version (e.g., `v1.2.3` → major=1, minor=2, patch=3)
   - For **Patch**: increment patch (v1.2.3 → v1.2.4)
   - For **Minor**: increment minor, reset patch (v1.2.3 → v1.3.0)
   - For **Major**: increment major, reset minor and patch (v1.2.3 → v2.0.0)
   - If no previous release: use v0.1.0 for minor, v0.0.1 for patch, v1.0.0 for major

5. Use `AskUserQuestion` to confirm version:

```
Question: "Confirm the new version number?"
Header: "Version"
Options:
  - v<calculated-version> (Recommended)
  - Enter a different version manually
```

6. If user selects "Enter a different version manually", they can type the version in the "Other" field. Validate format (must start with 'v' and follow semver).

### Phase 3: Release

**Objective:** Merge PR and create the release with proper changelog.

1. Merge the PR with squash:

```bash
gh pr merge <pr-number> --repo josescgar/jerna-digital --squash --delete-branch=false
```

2. Generate changelog content:
   - Start with PR title as the main change
   - Parse PR body for structured changes (look for bullet points, "Changes:", etc.)
   - Include commit messages if they add clarity
   - Format as markdown with categories if applicable:
     - **Added** - New features
     - **Changed** - Changes to existing functionality
     - **Fixed** - Bug fixes
     - **Security** - Security improvements
     - **Chore** - Maintenance tasks

   Example format:

   ```markdown
   ## What's Changed

   ### Added

   - Contact form validation with real-time feedback

   ### Fixed

   - Mobile menu z-index issue on iOS Safari

   **Full Changelog**: https://github.com/josescgar/jerna-digital/compare/v0.2.1...v0.3.0
   ```

3. Create the release:

```bash
gh release create v<version> \
  --repo josescgar/jerna-digital \
  --title "v<version>" \
  --notes "<changelog-content>" \
  --latest
```

Note: The tag is automatically created by `gh release create`.

4. Verify release was created and capture the URL.

### Phase 4: Cleanup

**Objective:** Close related issue and optionally delete the feature branch.

1. If a related issue was found in Phase 1, close it with a comment:

```bash
gh issue close <issue-number> \
  --repo josescgar/jerna-digital \
  --comment "Released in [v<version>](https://github.com/josescgar/jerna-digital/releases/tag/v<version>)"
```

2. Use `AskUserQuestion` to confirm branch deletion:

```
Question: "Delete the feature branch '<branch-name>'?"
Header: "Branch Cleanup"
Options:
  - Yes, delete the branch
  - No, keep the branch for now
```

Important: Display the exact branch name in the question so the user knows what will be deleted.

3. If user confirms deletion:

```bash
git push origin --delete <branch-name>
```

4. Report final summary:

```
✓ Release v<version> created successfully
  https://github.com/josescgar/jerna-digital/releases/tag/v<version>

✓ Issue #<issue-number> closed (if applicable)
✓ Branch '<branch-name>' deleted (if confirmed)
  or
  Branch '<branch-name>' preserved
```

## Safety Considerations

1. **Repository isolation**: All `gh` commands must use `--repo josescgar/jerna-digital`
2. **Mergeable verification**: Never attempt to merge a PR that is not in MERGEABLE state
3. **Branch deletion confirmation**: Always ask before deleting branches
4. **Version validation**: Ensure version follows semver format
5. **Error handling**: Check command outputs and handle failures gracefully

## Reference Documentation

- `references/semver-guide.md` - Semantic versioning reference
- `references/changelog-template.md` - CHANGELOG formatting examples

## Example Session

```
User: /make-release 42

Claude: Fetching PR #42...

        PR #42: feat(contact): add form validation
        Status: Mergeable ✓
        Branch: feature/38-add-form-validation
        Related Issue: #38

        What type of release is this?

User: [Selects "Minor - New features, backwards compatible"]

Claude: Current version: v0.2.1
        Suggested version: v0.3.0

        Confirm the new version number?

User: [Selects "v0.3.0 (Recommended)"]

Claude: Merging PR #42...
        Creating release v0.3.0...
        Closing issue #38...

        ✓ Release v0.3.0 created successfully
          https://github.com/josescgar/jerna-digital/releases/tag/v0.3.0

        Delete the feature branch 'feature/38-add-form-validation'?

User: [Selects "Yes, delete the branch"]

Claude: Branch deleted successfully.

        ✓ Release v0.3.0 created
        ✓ Issue #38 closed
        ✓ Branch 'feature/38-add-form-validation' deleted
```
