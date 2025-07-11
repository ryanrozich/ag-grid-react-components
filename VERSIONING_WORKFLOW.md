# Versioning Workflow Guide

This guide ensures GitHub tags, releases, and NPM versions stay synchronized.

## Automated Workflow (Recommended)

We already have GitHub Actions set up for this! Use the Release workflow:

````bash
# Trigger via GitHub CLI
gh workflow run release.yml -f version=0.1.1 -f create_release=true -f publish_npm=true

# Or via GitHub UI
# Go to Actions → Create Release → Run workflow
```text

This will automatically:

1. ✅ Update package.json version
2. ✅ Create and push a git tag
3. ✅ Create a GitHub release with changelog
4. ✅ Publish to NPM

## Manual Workflow

If you prefer to do it manually:

### 1. Update Version

```bash
# For patches (0.1.0 → 0.1.1)
npm version patch -m "chore(release): v%s"

# For minor (0.1.0 → 0.2.0)
npm version minor -m "chore(release): v%s"

# For major (0.1.0 → 1.0.0)
npm version major -m "chore(release): v%s"
```text

This automatically:

- Updates package.json
- Creates a git commit
- Creates a git tag

### 2. Push Changes

```bash
git push origin main --tags
```text

### 3. Create GitHub Release

```bash
gh release create v0.1.1 \
  --title "v0.1.1" \
  --generate-notes
```text

### 4. Publish to NPM

```bash
npm publish
```text

## Quick Release Commands

For your next release with documentation fixes:

```bash
# Option 1: Use the automated workflow
gh workflow run release.yml -f version=0.1.1

# Option 2: Manual steps
npm version patch -m "chore(release): v%s - Documentation fixes"
git push origin main --tags
gh release create v0.1.1 --generate-notes
npm publish
````

## Version Numbering

Follow semantic versioning:

- **Patch** (0.1.0 → 0.1.1): Bug fixes, documentation
- **Minor** (0.1.0 → 0.2.0): New features, backward compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes

## Current State

- **NPM**: v0.1.0 (with outdated README)
- **GitHub**: v0.1.0 tag and release (with updated README)
- **Recommended**: Release v0.1.1 to sync documentation
