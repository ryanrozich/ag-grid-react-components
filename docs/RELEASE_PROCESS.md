# Release Process

This document describes the release process for AG Grid React Components.

## Release Types

- **Patch** (0.0.x): Bug fixes, documentation updates
- **Minor** (0.x.0): New features, non-breaking changes
- **Major** (x.0.0): Breaking changes
- **Prerelease**: Beta/alpha releases for testing

## Prerequisites

1. **NPM Token**: Set up in GitHub Secrets as `NPM_TOKEN`

   ```bash
   # Get your npm token
   npm login
   npm token create --read-only false
   ```

   Add to: Settings → Secrets → Actions → New repository secret

2. **Ensure main branch is clean**:

   ```bash
   git checkout main
   git pull origin main
   git status # Should show clean
   ```

3. **All tests passing**:
   ```bash
   npm test
   npm run lint
   npm run typecheck
   ```

## Manual Release Process

### Option 1: GitHub Actions (Recommended)

1. Go to [Actions → Release](https://github.com/ryanrozich/ag-grid-react-components/actions/workflows/release.yml)
2. Click "Run workflow"
3. Select release type (patch/minor/major/prerelease)
4. Click "Run workflow"

The workflow will:

- Run tests
- Create version bump commit
- Generate CHANGELOG.md
- Create git tag
- Push to GitHub
- Create GitHub Release
- Publish to npm
- Create post-release issue

### Option 2: Local Release

```bash
# 1. Run tests
npm test
npm run lint

# 2. Create release (choose one)
npm run release:patch    # 0.1.0 → 0.1.1
npm run release:minor    # 0.1.0 → 0.2.0
npm run release:major    # 0.1.0 → 1.0.0

# For first release
npm run release:first

# 3. Review changes
git log -1 -p
cat CHANGELOG.md

# 4. Push to GitHub
git push --follow-tags origin main

# 5. Publish to npm
npm publish

# 6. Create GitHub Release
# Go to https://github.com/ryanrozich/ag-grid-react-components/releases/new
# Select the tag you just created
# Copy release notes from CHANGELOG.md
```

## Automated Releases

Commits to main will trigger automatic releases based on conventional commits:

- `fix:` → patch release
- `feat:` → minor release
- `feat!:` or `BREAKING CHANGE:` → major release

To skip automatic release, include `[skip release]` in commit message.

## Prerelease Process

For testing releases before official version:

```bash
# Local
npm run release:prerelease -- --prerelease beta
npm publish --tag beta

# GitHub Actions
# Select "prerelease" type and specify identifier (beta/alpha/rc)
```

Install with: `npm install ag-grid-react-components@beta`

## Post-Release Checklist

After each release:

- [ ] Verify npm package: https://www.npmjs.com/package/ag-grid-react-components
- [ ] Check bundle size: `npm install ag-grid-react-components@latest && npm list`
- [ ] Test in fresh project:
  ```bash
  npx create-react-app test-release
  cd test-release
  npm install ag-grid-react-components@latest
  ```
- [ ] Update demo site if needed
- [ ] Announce release:
  - [ ] GitHub Discussions
  - [ ] Twitter/Social media
  - [ ] AG Grid forum (if applicable)

## Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **0.x.y**: Pre-1.0 releases (current phase)
  - Breaking changes allowed in minor versions
  - Document all breaking changes clearly
- **1.0.0**: First stable release
  - API stability guarantee
  - Breaking changes only in major versions

## Troubleshooting

### npm publish fails

```bash
# Check authentication
npm whoami

# Re-login if needed
npm login

# Verify package contents
npm pack --dry-run
```

### Git push fails

```bash
# Ensure you have latest main
git fetch origin
git rebase origin/main

# Force push if needed (careful!)
git push --force-with-lease origin main
```

### Release workflow fails

1. Check Actions tab for error logs
2. Verify NPM_TOKEN secret is set correctly
3. Ensure branch protection rules allow GitHub Actions

## Current Release Status

- Current version: 0.1.0
- Next release: First official release
- npm package: https://www.npmjs.com/package/ag-grid-react-components
- Latest tag: Will be created with first release
