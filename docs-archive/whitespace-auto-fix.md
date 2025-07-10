# Automatic Whitespace Fixing

This project includes automatic whitespace fixing for pull requests to prevent formatting issues from blocking merges.

## How it works

1. **Local Prevention**: Pre-commit hooks fix whitespace issues before commits
2. **CI Auto-fix**: If whitespace issues slip through, CI automatically fixes them
3. **Non-blocking**: Whitespace checks won't fail CI or block merges

## Workflow

### For Contributors

1. Make your changes
2. Commit normally - pre-commit hooks will fix whitespace
3. If you skip hooks (`--no-verify`), CI will fix issues automatically

### What happens in CI

When you open or update a PR:

1. CI checks for whitespace issues
2. If found, automatically fixes them
3. Commits the fixes to your PR branch
4. Comments on the PR to notify you

## Manual Commands

```bash
# Check for whitespace issues
npm run check:whitespace

# Fix whitespace issues
npm run fix:whitespace

# Run before committing (automatic with hooks)
npm run pre-commit
```

## Configuration

The whitespace rules are defined in:

- `.trunk/trunk.yaml` - Trunk configuration
- `.husky/pre-commit` - Pre-commit hook
- `.github/workflows/auto-fix-whitespace.yml` - CI auto-fix workflow

## Disabling Auto-fix

If you need to disable auto-fix for a specific PR:

- The auto-fix only runs on PRs from the same repository
- Fork PRs won't trigger auto-fix for security reasons
