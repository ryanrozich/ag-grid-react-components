# Development Workflow

A simple but effective workflow for solo development with good practices.

## Quick Start

### 1. Create an Issue First

```bash
# Use GitHub CLI
gh issue create --title "Add date range picker" --body "Need to support date ranges"

# Or create on GitHub.com
```

### 2. Create a Feature Branch

```bash
# Branch from main
git checkout main
git pull origin main
git checkout -b feat/date-range-picker

# Or for fixes
git checkout -b fix/validation-bug
```

### 3. Make Your Changes

```bash
# Regular commits
git add .
git commit -m "feat: add date range picker component"

# Push to remote
git push -u origin feat/date-range-picker
```

### 4. Create a Pull Request

```bash
# Using GitHub CLI (recommended)
gh pr create --title "feat: add date range picker" --body "Closes #17"

# This opens PR in browser for review
```

### 5. Merge When Ready

```bash
# After reviewing your own PR
gh pr merge --squash

# Or use GitHub UI
```

## Branch Naming Conventions

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `chore/` - Maintenance tasks
- `refactor/` - Code refactoring
- `test/` - Test improvements

## Example Workflow

```bash
# 1. Start new feature
gh issue create --title "Add CSV export"
git checkout -b feat/csv-export

# 2. Work on feature
git add .
git commit -m "feat: add CSV export functionality"
git push -u origin feat/csv-export

# 3. Create PR
gh pr create --title "feat: add CSV export" --body "Closes #18"

# 4. Merge
gh pr merge --squash --delete-branch
```

## Branch Protection Rules (Recommended)

Set up on GitHub.com → Settings → Branches:

### For Solo Development

- ✅ Require pull request before merging
- ✅ Include administrators (keeps you honest)
- ✅ Dismiss stale PR approvals
- ❌ Required reviewers (skip since solo)
- ✅ Require status checks (CI/tests)
- ✅ Require branches up to date
- ❌ Required reviews (skip since solo)

### Benefits

- Forces you to use PRs (good practice)
- CI runs automatically on PRs
- Clean git history
- Easy to track what changed and why

## Release Process

No need for release branches! Just:

1. Merge all features/fixes to main
2. When ready to release:
   ```bash
   gh workflow run release.yml -f version=0.1.1
   ```

## Tips for Solo Development

1. **Small PRs**: Even alone, keep PRs focused
2. **Good PR descriptions**: Future you will thank present you
3. **Link issues**: Use "Closes #X" in PR descriptions
4. **Self-review**: Look at your PR diff before merging
5. **Squash merge**: Keeps main branch history clean

## Current State → Better State

**Current:**

- Direct commits to main
- No issue tracking
- No PR history

**Better:**

- All changes through PRs
- Issues track what needs doing
- PRs show what was done and why
- CI runs on every change
- Protected main branch

## Quick Commands Reference

```bash
# Create issue and start work
gh issue create --title "Fix date validation"
git checkout -b fix/date-validation

# Finish work and create PR
git push -u origin fix/date-validation
gh pr create --title "fix: date validation" --body "Closes #19"

# Check PR status
gh pr status

# Merge PR
gh pr merge --squash --delete-branch
```
