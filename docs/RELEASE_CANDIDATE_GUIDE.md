# Release Candidate Guide

This guide explains how to create and publish release candidates (RC) for ag-grid-react-components.

## Prerequisites

1. **NPM Account**: You need publish access to the `ag-grid-react-components` package
2. **GitHub Secrets**: Ensure `NPM_TOKEN` is set in repository secrets
3. **Clean Working Directory**: Commit all changes before releasing

## Creating a Release Candidate

### 1. Prepare Your Branch

For v0.2.0-rc1, you should be on the `release/v0.2.0-rc1` branch:

```bash
# Ensure you're on the correct branch
git checkout release/v0.2.0-rc1

# Pull latest changes
git pull origin release/v0.2.0-rc1

# Ensure all tests pass
npm run pre-commit
```

### 2. Trigger the RC Release

Go to the [Actions tab](https://github.com/ryanrozich/ag-grid-react-components/actions/workflows/release-candidate.yml) and:

1. Click "Release Candidate" workflow
2. Click "Run workflow"
3. Fill in:
   - **RC version**: `0.2.0-rc.1` (note: use `-rc.` not `-rc1`)
   - **Associated milestone**: (optional, e.g., `2` for v0.2.0 milestone)
   - **Dry run**: Leave unchecked for actual release

### 3. What the Workflow Does

The automated workflow will:

1. **Validate** the version format
2. **Generate consolidated release notes** from:
   - Commit messages since last tag
   - Pull requests merged
   - Issues closed (if milestone provided)
3. **Run all tests** (unit, e2e, typecheck, lint)
4. **Build** the package
5. **Update** package.json version
6. **Create** git tag `v0.2.0-rc.1`
7. **Publish to NPM** with `next` tag
8. **Create GitHub pre-release**
9. **Create testing issue** for tracking RC feedback

### 4. After Release

Once published, the RC will be available:

```bash
# Install with next tag
npm install ag-grid-react-components@next

# Or specific version
npm install ag-grid-react-components@0.2.0-rc.1
```

### 5. Testing the RC

The workflow creates a testing issue with a checklist. Ensure:

- Installation works correctly
- All existing features function
- New features work as expected
- No console errors/warnings
- Tree-shaking works
- TypeScript types are correct

## Manual RC Release (if needed)

If you need to publish manually:

```bash
# 1. Ensure version is correct
npm version 0.2.0-rc.1 --no-git-tag-version

# 2. Generate release notes
node scripts/release/generate-changelog.js \
  --from="v0.1.1" \
  --to="HEAD" \
  --version="0.2.0-rc.1" \
  --rc=true > RELEASE_NOTES.md

# 3. Build
npm run build

# 4. Publish to NPM with next tag
npm publish --tag next --access public

# 5. Create git tag
git tag -a v0.2.0-rc.1 -m "Release candidate 0.2.0-rc.1"
git push origin v0.2.0-rc.1

# 6. Create GitHub release manually
```

## Release Notes Content

The automated release notes will include:

- **Breaking Changes** (if any)
- **New Features**
- **Bug Fixes**
- **Performance Improvements**
- **Documentation Updates**
- **Internal Changes**

Each section groups related commits and PRs, making it easy for users to understand what changed.

## Promoting RC to Stable

Once testing is complete:

1. Create a PR from `release/v0.2.0-rc1` to `main`
2. Run the main release workflow for `0.2.0`
3. The stable release will be published with `latest` tag

## Troubleshooting

### NPM_TOKEN not set

Contact the repository owner to add NPM publishing token to GitHub secrets.

### Version already exists

NPM doesn't allow republishing. Increment the RC number (e.g., `0.2.0-rc.2`).

### Workflow fails at test step

Fix failing tests before releasing. The RC workflow won't publish if tests fail.

### Need to unpublish a bad RC

```bash
# Deprecate instead of unpublish
npm deprecate ag-grid-react-components@0.2.0-rc.1 "Critical bug, use 0.2.0-rc.2"
```
