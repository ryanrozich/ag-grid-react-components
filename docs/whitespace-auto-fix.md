# Whitespace Auto-fix Workflow

This project automatically fixes whitespace issues in pull requests.

## How it works

1. When you push to a PR, the whitespace auto-fix workflow runs
2. If whitespace issues are found, it:
   - Runs `npm run fix:whitespace` to fix them
   - Commits the fixes back to your PR
   - Comments on the PR to let you know

## What it fixes

- Trailing whitespace at the end of lines
- Blank lines that contain spaces
- Other whitespace inconsistencies

## For developers

### If the bot commits to your PR

Pull the changes to your local branch:

```bash
git pull
```

### To run whitespace fixes locally

```bash
npm run fix:whitespace
```

### To check for whitespace issues

```bash
npm run check:whitespace
```

## Why do we have this?

- **No more blocked PRs**: Whitespace issues won't block merging
- **Automatic cleanup**: No manual fixing required
- **Consistent formatting**: Ensures clean diffs

## Disabling for a PR

If you need to disable this for a specific PR (rare), you can:

1. Add `[skip-whitespace]` to your PR title
2. Or close and reopen the PR from a fork

## Pre-commit hook

We also have a local pre-commit hook that fixes whitespace automatically when you commit. Make sure it's installed:

```bash
npm install  # This installs husky hooks
```

The hook runs automatically on `git commit` and includes whitespace fixing.
