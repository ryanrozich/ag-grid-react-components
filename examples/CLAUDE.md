# AI Agent Instructions

This file provides instructions for AI agents working on this project. CUSTOMIZE this template for your specific project needs.

## Core Architecture Principles

<!-- CUSTOMIZE: Define your architecture principles -->

1. **Component Pattern**: [Headless/Styled/Hybrid] components with [describe pattern]
2. **Dependencies**: [Zero/Minimal/Specific] external dependencies
3. **Build Target**: [Library/Application] targeting [environment]
4. **Type Safety**: TypeScript strict mode [enabled/with exceptions]
5. **Testing Strategy**: [TDD/BDD/Other] with [coverage requirements]

## Required Development Workflow

### 1. Test-Driven Development (TDD)

<!-- CUSTOMIZE: Adjust TDD requirements -->

You MUST follow TDD:

1. Write failing tests FIRST before implementing features
2. Write minimal code to make tests pass
3. Refactor while keeping tests green
4. You MUST have tests for all new functionality

### 2. Before Starting Any Work

You MUST run these commands:

```bash
npm run lint          # Check current state
npm run test:unit     # Ensure tests pass
```

### 3. During Development

You MUST:

- Keep `npm run test:watch` running in another terminal
- Run `npm run lint:fix` after making changes
- Run `npm run typecheck` frequently
- Use `npm run dev` for local development

### 4. Before Committing

You MUST run:

```bash
npm run pre-commit    # This runs format, lint, typecheck, and tests
```

### 5. UI Testing Requirements

<!-- CUSTOMIZE: E2E testing requirements -->

For any UI-related changes:

1. Run `npm run test:e2e` before declaring any UI bug fixed
2. Create/update Playwright tests for UI changes
3. Never say a UI issue is resolved without passing e2e tests

## Component Structure

<!-- CUSTOMIZE: Your component structure -->

You MUST follow this structure for components:

```
src/components/ComponentName/
├── index.tsx                    # Main component export
├── ComponentName.tsx            # Component implementation
├── types.ts                     # TypeScript interfaces
├── hooks/                       # Custom React hooks
│   └── useComponentLogic.ts
├── utils/                       # Utility functions
│   └── helpers.ts
├── components/                  # Sub-components
│   └── SubComponent.tsx
└── __tests__/                  # Tests
    ├── ComponentName.test.tsx  # Unit tests
    └── integration.test.tsx    # Integration tests
```

## Code Quality Requirements

<!-- CUSTOMIZE: Your quality standards -->

You MUST:

1. **Type Everything**: No implicit any, no type assertions without guards
2. **Validate Inputs**: Validate at all system boundaries
3. **Handle Errors**: Never let errors bubble up unhandled
4. **Document Public APIs**: JSDoc for all exported functions/components
5. **Follow Patterns**: Match existing code patterns in the codebase

## Specific Technical Requirements

<!-- CUSTOMIZE: Framework-specific requirements -->

### React Components

- Use functional components with hooks
- Implement proper TypeScript generics
- Use React.memo only when necessary
- Handle all edge cases (null, undefined, empty arrays)

### State Management

- Prefer local state over global
- Use Context API for cross-component state
- Implement proper cleanup in useEffect

### Performance

- Keep components under 300 lines
- Use dynamic imports for heavy dependencies
- Implement virtualization for large lists
- Profile before optimizing

## Testing Requirements

<!-- CUSTOMIZE: Testing standards -->

You MUST write:

1. **Unit Tests**: For all utilities and pure functions
2. **Component Tests**: Using React Testing Library
3. **Integration Tests**: For component interactions
4. **E2E Tests**: For critical user flows

Test Coverage Requirements:

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

## Documentation Updates

<!-- CUSTOMIZE: Documentation requirements -->

When changing functionality, you MUST update:

1. **README.md**: API changes, new features
2. **Component Documentation**: Props, usage examples
3. **TypeScript Interfaces**: Accurate types with JSDoc
4. **Demo Application**: Working examples
5. **Changelog**: User-facing changes

## Commit Standards

You MUST use conventional commits:

```bash
npm run commit    # Interactive commit tool
```

Format: `type(scope): description`

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons)
- `refactor`: Code change without feature/fix
- `test`: Adding missing tests
- `chore`: Maintenance tasks

## Security Requirements

<!-- CUSTOMIZE: Security standards -->

You MUST:

1. Sanitize all user inputs
2. Never expose sensitive data in logs
3. Use secure coding practices
4. Validate data at boundaries
5. Handle authentication properly

## Integration Points

<!-- CUSTOMIZE: Your integration requirements -->

When working with external systems:

1. **API Calls**: Always handle errors and timeouts
2. **Data Validation**: Validate all external data
3. **Type Safety**: Create proper TypeScript types
4. **Error Boundaries**: Implement React error boundaries
5. **Fallbacks**: Provide graceful degradation

## Performance Requirements

<!-- CUSTOMIZE: Performance standards -->

You MUST ensure:

1. **Bundle Size**: Keep additions minimal
2. **Render Performance**: No unnecessary re-renders
3. **Memory Leaks**: Clean up all subscriptions
4. **Load Time**: Lazy load when appropriate

## Known Issues and Workarounds

<!-- CUSTOMIZE: Project-specific issues -->

1. **Issue**: [Describe issue]
   - **Workaround**: [Describe workaround]
   - **Context**: [When this applies]

## Important Reminders

<!-- CUSTOMIZE: Critical reminders -->

- You MUST follow TDD - write tests first
- You MUST run all quality checks before committing
- You MUST update documentation for API changes
- You MUST NOT add dependencies without discussion
- You MUST prefer existing patterns over new ones

## Project-Specific Commands

<!-- CUSTOMIZE: Your npm scripts -->

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production

# Testing
npm run test          # Run all tests
npm run test:unit     # Unit tests only
npm run test:e2e      # E2E tests
npm run test:watch    # Watch mode

# Quality
npm run lint          # Check linting
npm run lint:fix      # Fix linting issues
npm run typecheck     # TypeScript checking
npm run pre-commit    # Full quality check

# Documentation
npm run docs:build    # Build documentation
npm run docs:serve    # Serve documentation
```
