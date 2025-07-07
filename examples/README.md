# MADF Example Configurations

This directory contains opinionated example configurations and templates for MADF projects. These examples are based on successful patterns from ag-grid-react-components.

## Quick Start

Use the provided script to copy examples to your project:

```bash
# Copy all recommended configurations
./copy-examples.sh all

# Or copy specific configurations
./copy-examples.sh testing
./copy-examples.sh linting
./copy-examples.sh labels
```

## Available Examples

### 1. **madf.config.ts** - Complete MADF configuration

- TypeScript library configuration
- Test stages (unit, integration, e2e)
- Trunk linting setup
- Label taxonomies
- Component structure

### 2. **CLAUDE.md** - AI Agent instructions template

- Architecture principles
- Development workflow
- Code quality requirements
- Testing requirements

### 3. **Testing Configuration**

- `vitest.config.ts` - Unit test configuration
- `playwright.config.ts` - E2E test configuration
- Test utilities and helpers

### 4. **Linting Configuration**

- `.trunk/trunk.yaml` - Trunk configuration
- `.eslintrc.js` - ESLint rules
- `.prettierrc` - Prettier settings

### 5. **GitHub Configuration**

- Label definitions
- Issue templates
- PR templates
- GitHub Actions integration

### 6. **Project Structure**

- Component templates
- Hook templates
- Utility templates

## Usage

1. **For New Projects**:

   ```bash
   # Initialize MADF with opinionated defaults
   madf init --template ag-grid
   ```

2. **For Existing Projects**:

   ```bash
   # Copy specific configurations
   cp examples/madf.config.ts .
   cp examples/CLAUDE.md .
   ```

3. **Customize After Copying**:
   - Update project name and description
   - Adjust test thresholds
   - Modify label categories
   - Configure specific lint rules

## Philosophy

These examples represent opinionated choices that work well for TypeScript/React component libraries:

- **TDD First**: Test configurations come before implementation
- **Zero Dependencies**: Library configurations avoid external deps
- **Strict TypeScript**: No `any` types, full strict mode
- **Headless Components**: UI components without styling
- **Comprehensive Testing**: Unit, integration, and E2E coverage

## Customization Guide

Each example includes comments explaining:

- Why certain choices were made
- What can be customized
- What should remain consistent

Look for `// CUSTOMIZE:` comments in the files.
