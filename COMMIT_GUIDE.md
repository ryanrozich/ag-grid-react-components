# Commit Message Guide

This project uses **Conventional Commits** for clear, structured commit messages that enable:

- Automatic semantic versioning
- Changelog generation
- Better commit history

## Quick Start

```bash
just commit  # Interactive commit helper
```

## Commit Types

| Type       | Description                             | Version Bump  | Example                                     |
| ---------- | --------------------------------------- | ------------- | ------------------------------------------- |
| `feat`     | New feature                             | Minor (0.x.0) | `feat(filter): add date range support`      |
| `fix`      | Bug fix                                 | Patch (0.0.x) | `fix(parser): handle invalid expressions`   |
| `docs`     | Documentation only                      | None          | `docs(readme): add troubleshooting section` |
| `style`    | Code style (formatting)                 | None          | `style(components): fix indentation`        |
| `refactor` | Code change that neither fixes nor adds | None          | `refactor(utils): simplify date logic`      |
| `perf`     | Performance improvement                 | Patch         | `perf(filter): optimize re-renders`         |
| `test`     | Adding/correcting tests                 | None          | `test(filter): add edge case coverage`      |
| `build`    | Build system/dependencies               | None          | `build(deps): update ag-grid to v34`        |
| `ci`       | CI configuration                        | None          | `ci(github): add release workflow`          |
| `chore`    | Maintenance tasks                       | None          | `chore(deps): update dev dependencies`      |

## Scopes

Use these scopes to indicate what part of the codebase changed:

- `core` - Core filter functionality
- `components` - React components
- `utils` - Utility functions
- `demo` - Demo application
- `test` - Test files
- `deps` - Dependencies
- `build` - Build configuration
- `docs` - Documentation
- `ci` - CI/CD configuration

## Examples

### Feature Addition

```bash
feat(components): add keyboard navigation support

- Add arrow key navigation between date inputs
- Add Enter key to apply filter
- Add Escape key to cancel changes

Closes #123
```

### Bug Fix

```bash
fix(utils): correct timezone handling in date parser

The parser was not accounting for DST transitions,
causing dates to shift by one day in certain timezones.

BREAKING CHANGE: parseDate now requires timezone parameter
```

### Breaking Change

```bash
feat(core)!: change filter model structure

Migrate from flat to nested filter model for better extensibility.

BREAKING CHANGE: Filter models from v1.x need migration.
See migration guide in README.
```

## Tips

1. **Keep the subject line under 50 characters**
2. **Use imperative mood** ("add" not "added" or "adds")
3. **Don't end with a period**
4. **Reference issues** with "Closes #123" or "Refs #456"
5. **Explain the "why"** in the body, not just the "what"

## Interactive Mode

When you run `just commit`, you'll be prompted for:

1. **Type of change** (feat, fix, etc.)
2. **Scope** (optional)
3. **Short description** (required)
4. **Longer description** (optional - press Enter to skip)
5. **Breaking changes** (optional)
6. **Issues this closes** (optional - e.g., "123, 456")

## Validation

Your commit messages are validated by commitlint. If a message doesn't follow the convention, the commit will be rejected with a helpful error message.
