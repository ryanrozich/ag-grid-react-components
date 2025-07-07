# Release Management Guide

This guide covers the complete release management process for ag-grid-react-components, including release candidates, version management, and final releases.

## 📋 Table of Contents

- [Overview](#overview)
- [Release Strategy](#release-strategy)
- [Release Candidates](#release-candidates)
- [Version Management](#version-management)
- [Release Process](#release-process)
- [Changelog Generation](#changelog-generation)
- [NPM Publishing](#npm-publishing)
- [Post-Release](#post-release)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

Our release process ensures high-quality, well-tested releases through:

- **Release Candidates (RC)** for pre-release testing
- **Automated changelog generation** from git history
- **Smart version bumping** with validation
- **Comprehensive pre-release checks**
- **Automated NPM publishing**
- **GitHub release creation**

## 🚀 Release Strategy

### Release Types

1. **Major Release** (1.0.0 → 2.0.0)

   - Breaking API changes
   - Major architectural changes
   - Requires migration guide

2. **Minor Release** (1.0.0 → 1.1.0)

   - New features
   - Backward compatible changes
   - New components or utilities

3. **Patch Release** (1.0.0 → 1.0.1)

   - Bug fixes
   - Performance improvements
   - Documentation updates

4. **Release Candidate** (1.0.0 → 1.1.0-rc.0)
   - Pre-release for testing
   - Published to `next` tag
   - Community feedback gathering

### Release Schedule

- **Major**: As needed (breaking changes)
- **Minor**: Monthly or when features ready
- **Patch**: As needed for critical fixes
- **RC**: 3-7 days before minor/major releases

## 🔬 Release Candidates

### Creating an RC

1. **Prepare the release**:

   ```bash
   # Check everything is ready
   node scripts/release/prepare-release.js

   # Bump to RC version
   node scripts/release/bump-version.js rc
   ```

2. **Trigger RC workflow**:

   ```bash
   gh workflow run release-candidate.yml \
     -f version=0.2.0-rc.1 \
     -f milestone=3
   ```

3. **What happens**:
   - Validates version format
   - Runs comprehensive tests
   - Generates changelog
   - Publishes to npm@next
   - Creates GitHub pre-release
   - Opens testing issue

### RC Testing Process

The RC workflow automatically creates a testing issue with:

```markdown
# Release Candidate Testing: 0.2.0-rc.1

## 📋 Testing Checklist

### Installation

- [ ] `npm install ag-grid-react-components@next` works
- [ ] Package size is reasonable
- [ ] All dependencies resolved

### Core Functionality

- [ ] DateFilter component works
- [ ] RelativeDateFilter functions
- [ ] QuickFilterDropdown operates
- [ ] ActiveFilters display works
- [ ] Grid state utilities function

### Integration

- [ ] Works with AG Grid v33+
- [ ] TypeScript types correct
- [ ] Tree-shaking works
- [ ] No console errors
```

### Installing RC

```bash
# Latest RC
npm install ag-grid-react-components@next

# Specific RC version
npm install ag-grid-react-components@0.2.0-rc.1
```

## 📈 Version Management

### Bump Version Script

```bash
# Usage
node scripts/release/bump-version.js <type> [preid]

# Examples
node scripts/release/bump-version.js patch         # 0.1.0 → 0.1.1
node scripts/release/bump-version.js minor         # 0.1.1 → 0.2.0
node scripts/release/bump-version.js major         # 0.2.0 → 1.0.0
node scripts/release/bump-version.js rc            # 0.2.0 → 0.2.1-rc.0
node scripts/release/bump-version.js prerelease beta  # 0.2.0 → 0.2.1-beta.0
```

### Version Validation

The script performs:

- Git working directory check
- Version format validation
- Tag existence check
- Greater-than validation
- File updates (package.json, README.md)

### Version Conventions

```
MAJOR.MINOR.PATCH[-PRERELEASE.NUMBER]

Examples:
- 1.0.0 (stable release)
- 1.1.0-rc.1 (release candidate)
- 2.0.0-beta.3 (beta release)
- 0.5.0-alpha.1 (alpha release)
```

## 🎯 Release Process

### 1. Pre-Release Preparation

```bash
# Check if ready for release
node scripts/release/prepare-release.js

# This validates:
# ✅ Git working directory clean
# ✅ On main branch
# ✅ Branch up to date
# ✅ All tests passing
# ✅ Build succeeds
# ✅ No lint errors
# ✅ No TypeScript errors
# ✅ NPM auth configured
# ✅ GitHub CLI authenticated
```

### 2. Create Release Candidate

```bash
# Bump to RC version
node scripts/release/bump-version.js rc

# Commit version bump
git add -A
git commit -m "chore: bump version to 0.2.0-rc.1"

# Create and push tag
git tag -a v0.2.0-rc.1 -m "Version 0.2.0-rc.1"
git push origin main --tags

# Trigger RC workflow
gh workflow run release-candidate.yml -f version=0.2.0-rc.1
```

### 3. RC Testing Period

- Monitor testing issue
- Address reported bugs
- Create additional RCs if needed
- Gather community feedback

### 4. Final Release

```bash
# Bump to final version
node scripts/release/bump-version.js patch  # or minor/major

# Generate changelog
node scripts/release/generate-changelog.js \
  --from=v0.1.0 \
  --to=HEAD \
  --version=0.2.0 \
  --output=CHANGELOG_UPDATE.md

# Update CHANGELOG.md
cat CHANGELOG_UPDATE.md CHANGELOG.md > CHANGELOG_NEW.md
mv CHANGELOG_NEW.md CHANGELOG.md

# Commit everything
git add -A
git commit -m "release: v0.2.0"

# Create and push tag
git tag -a v0.2.0 -m "Version 0.2.0"
git push origin main --tags

# Trigger release workflow
gh workflow run release.yml
```

## 📝 Changelog Generation

### Generate Changelog Script

```bash
# Basic usage
node scripts/release/generate-changelog.js \
  --from=v0.1.0 \
  --to=HEAD \
  --version=0.2.0

# With milestone
node scripts/release/generate-changelog.js \
  --from=v0.1.0 \
  --version=0.2.0 \
  --milestone=3

# For RC
node scripts/release/generate-changelog.js \
  --from=v0.1.0 \
  --version=0.2.0-rc.1 \
  --rc=true

# Save to file
node scripts/release/generate-changelog.js \
  --from=v0.1.0 \
  --version=0.2.0 \
  --output=CHANGELOG_UPDATE.md
```

### Changelog Format

```markdown
## 0.2.0

_December 15, 2024_

### ✨ Features

- feat: add timezone support to DateFilter (#123) (abc1234) - @developer
- feat: implement relative date presets (#125) (def5678) - @contributor

### 🐛 Bug Fixes

- fix: resolve date parsing edge case (#124) (ghi9012) - @developer

### ⚡ Performance Improvements

- perf: optimize filter rendering (#126) (jkl3456) - @developer

### 📈 Stats

- 15 commits
- 4 pull requests
- 3 contributors
```

### Commit Convention

Follow conventional commits for proper categorization:

```bash
feat: add new feature
fix: resolve bug
perf: improve performance
refactor: restructure code
docs: update documentation
test: add tests
chore: maintenance tasks
```

## 📦 NPM Publishing

### Publishing Tags

- **latest**: Stable releases (default)
- **next**: Release candidates
- **beta**: Beta releases
- **alpha**: Alpha releases

### Manual Publishing

```bash
# Stable release
npm publish

# Release candidate
npm publish --tag next

# Beta release
npm publish --tag beta
```

### Automated Publishing

The release workflows handle publishing automatically:

1. **RC Workflow**: Publishes to `next` tag
2. **Release Workflow**: Publishes to `latest` tag

## 🎉 Post-Release

### 1. Update Documentation

- Update installation instructions
- Add migration guide (if major)
- Update API documentation
- Update demo with new features

### 2. Announce Release

- Create GitHub release notes
- Post in discussions/discord
- Update project board
- Tweet about major features

### 3. Monitor Feedback

- Watch for issues
- Monitor npm downloads
- Check for regression reports
- Gather feature requests

### 4. Plan Next Release

- Create next milestone
- Triage new issues
- Plan feature roadmap
- Schedule next RC

## 🚨 Troubleshooting

### RC Workflow Fails

```bash
# Check workflow logs
gh run list --workflow=release-candidate.yml
gh run view <run-id>

# Common issues:
# - Invalid version format
# - Tests failing
# - NPM auth issues
```

### Version Already Exists

```bash
# Check existing tags
git tag -l

# Delete local tag if needed
git tag -d v0.2.0

# Delete remote tag (careful!)
git push origin :refs/tags/v0.2.0
```

### NPM Publish Fails

```bash
# Check authentication
npm whoami

# Check package.json
npm pack --dry-run

# Try manual publish
npm publish --dry-run
```

### Changelog Issues

```bash
# No commits found
git log v0.1.0..HEAD --oneline

# PR details missing
gh pr list --state merged --limit 100

# Regenerate with debug
node scripts/release/generate-changelog.js \
  --from=v0.1.0 \
  --version=0.2.0 \
  --debug
```

## 📚 Related Documentation

- [Workflows Reference](./workflows-reference.md#release-workflows)
- [Bot Development Guide](./bot-development-guide.md)
- [GitHub Automation Overview](./README.md)

## 🔗 External Resources

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [NPM Publishing](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
