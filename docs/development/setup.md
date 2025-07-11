# Development Setup

This guide will help you set up your development environment for ag-grid-react-components.

## Prerequisites

- Node.js 18+
- npm 9+
- Git

## Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ryanrozich/ag-grid-react-components.git
   cd ag-grid-react-components
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev:safe
   ```

## Development Commands

### Essential Commands

- `npm run dev:safe` - Start development server with quality checks
- `npm run build` - Build the library
- `npm run test:watch` - Run tests in watch mode (TDD)
- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - Check TypeScript types

### Quality Checks

Before committing:

```bash
npm run pre-commit
```

Before pushing:

```bash
npm run pre-push
```

## Project Structure

```text
src/
├── components/       # React components
├── utils/           # Utility functions
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
├── demo/            # Demo application
└── tests/           # Test files
```

## Next Steps

- Read the [Development Workflow](./workflow.md)
- Review the [Architecture](./architecture.md)
- Check the [Testing Guide](./testing.md)
- See [Contributing Guidelines](./contributing.md)
