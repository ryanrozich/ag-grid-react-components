# Release Strategy & Milestone Management

This document outlines our release strategy using GitHub milestones and semantic versioning.

## Overview

We use GitHub milestones to organize work into releasable increments following semantic versioning (SemVer).

## Semantic Versioning

Format: `vMAJOR.MINOR.PATCH`

- **MAJOR** (v1.0.0): Breaking changes
- **MINOR** (v0.1.0): New features (backward compatible)
- **PATCH** (v0.0.1): Bug fixes only

Since we're pre-1.0:

- Breaking changes increment MINOR (0.x.0)
- New features increment MINOR (0.x.0)
- Bug fixes increment PATCH (0.0.x)

## Milestone Naming Convention

```text
v0.1.0: First Public Release
v0.2.0: Pill & Avatar Components
v0.2.1: Bug Fixes for v0.2.0
v1.0.0: Stable API Release
```

## Release Types

### Patch Releases (Bug Fixes)

- **Version**: `v0.1.1`, `v0.2.1`, etc.
- **Contains**: Bug fixes only
- **Timeline**: As needed
- **Label filter**: `bug`

### Minor Releases (Features)

- **Version**: `v0.2.0`, `v0.3.0`, etc.
- **Contains**: New features + bug fixes
- **Timeline**: 2-4 weeks
- **Label filter**: `enhancement` + `bug`

### Major Releases (Breaking)

- **Version**: `v1.0.0`, `v2.0.0`, etc.
- **Contains**: Breaking changes + features + fixes
- **Timeline**: Planned carefully
- **Label filter**: All types

## Scripts

### Create a Milestone

````bash
# Create first public release
node scripts/create-milestone.js v0.1.0 "First Public Release" "Initial stable release"

# Create feature release
node scripts/create-milestone.js v0.2.0 "Pill & Avatar Components" "Add PillRenderer and AvatarRenderer"

# Create patch release
node scripts/create-milestone.js v0.1.1 "Bug Fixes" "Critical bug fixes for v0.1.0"
```text

### Assign Items to Milestone

```bash
# List milestones
node scripts/assign-to-milestone.js

# Assign ready items to milestone #1
node scripts/assign-to-milestone.js 1
```text

### View Milestone Progress

```bash
# See all milestones and progress
node scripts/milestone-overview.js

# Open in browser
gh milestone list --web
````

## Workflow

### 1. Planning Phase

1. Create milestone for next release
2. Review backlog items
3. Assign items that are ready (`status: backlog`)
4. Set due date if applicable

### 2. Development Phase

1. Work on milestone items
2. Items automatically track progress
3. PRs inherit milestone from linked issues

### 3. Release Phase

1. Ensure all items complete
2. Update CHANGELOG.md
3. Bump version in package.json
4. Create release tag
5. Close milestone

### 4. Post-Release

1. Create patch milestone for bug fixes
2. Plan next minor/major release

## Current Release Plan

### v0.1.0: First Public Release

- Core components stable
- Documentation complete
- CI/CD working
- Published to npm

### v0.2.0: Enhanced Components

- PillRenderer component
- AvatarRenderer component
- Enhanced demo

### v0.3.0: State Management

- Advanced grid state utils
- Persistence features
- Multi-grid sync

## Automation

### Auto-Assignment Rules

Items are auto-assigned to milestones when:

- Status is `backlog` or `in-progress`
- Type matches milestone (bugs for patch, features for minor)
- No existing milestone assigned

### Label Requirements

For milestone assignment:

- Must have type label (`bug`, `enhancement`)
- Must have status showing readiness
- Should have priority label

## Best Practices

1. **One active milestone** - Focus on current release
2. **Small releases** - Ship frequently
3. **Bug fixes first** - Patch releases as needed
4. **Clear scope** - Don't add items mid-release
5. **Document changes** - Update CHANGELOG.md

## Release Checklist

Before closing a milestone:

- [ ] All issues/PRs completed
- [ ] Tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Release notes drafted
- [ ] Tag created
- [ ] Published to npm
