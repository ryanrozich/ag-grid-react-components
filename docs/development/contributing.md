# Contributing to ag-grid-react-components

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Process

### 1. Create an Issue

Before starting work, create or find an issue describing the change:

```bash
gh issue create --title "Add feature X" --body "Description..."
```

### 2. Create a Branch

Use descriptive branch names:

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/what-changed` - Documentation
- `chore/task-name` - Maintenance tasks

### 3. Follow TDD

Write tests first:

1. Write failing tests
2. Implement the feature
3. Ensure tests pass

### 4. Code Standards

- Use TypeScript strict mode
- No `any` types
- Follow existing patterns
- Keep components < 300 lines
- Document complex logic

### 5. Commit Messages

Use conventional commits:

```bash
npm run commit
```

Format: `type(scope): description`

Types:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `test` - Tests only
- `refactor` - Code refactoring
- `chore` - Maintenance

### 6. Quality Checks

Before committing:

```bash
npm run pre-commit
```

Before pushing:

```bash
npm run pre-push
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation
3. Add examples if needed
4. Link to related issues
5. Request review

### PR Title Format

Follow conventional commit format:

- `feat: add category selector component`
- `fix: resolve date filter validation issue`
- `docs: update API documentation`

### PR Description Template

```markdown
## Summary

Brief description of changes

## Changes

- Added X
- Fixed Y
- Updated Z

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added (for UI changes)
- [ ] Manual testing completed

## Related Issues

Fixes #123
```

## Code Review

PRs require approval before merging. Reviewers will check:

- Code quality and standards
- Test coverage
- Documentation updates
- Breaking changes

## Documentation

Update relevant documentation:

- API changes → Update component docs
- New features → Add to README
- Breaking changes → Update migration guide

## Questions?

- Check existing issues and PRs
- Ask in issue comments
- Review the [architecture guide](./architecture.md)

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
