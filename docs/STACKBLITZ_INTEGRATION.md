# StackBlitz Integration Guide

This guide explains how we maintain interactive StackBlitz examples for ag-grid-react-components.

## Overview

We use a combination of approaches to provide interactive examples:

1. **GitHub Integration**: Direct links to open repo files in StackBlitz
2. **Generated Examples**: Automated example generation for each component
3. **GitHub Actions**: Automatic updates when components change

## How It Works

### 1. Automatic Example Generation

Run this command to generate/update all examples:

```bash
npm run examples:generate
```

This creates:

- Individual example folders for each component
- Shared configuration files
- A manifest.json for tracking all examples

### 2. GitHub Integration

Since you have the StackBlitz bot enabled on your repo, users can open any file directly:

```
https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main/examples/datefilter
```

### 3. Updating Examples

To update all examples and push to GitHub:

```bash
npm run stackblitz:update
```

This will:

1. Generate fresh examples
2. Commit them with a descriptive message
3. Push to GitHub
4. StackBlitz will automatically pick up the changes

## Working with Claude

Since this is all file-based, I can help you:

1. **Update examples**: Modify the generator script to change how examples are created
2. **Add new components**: Add them to the components array in the generator
3. **Customize examples**: Create specific examples for different use cases
4. **Fix issues**: Debug and update examples as needed

## Example Structure

```
examples/
├── manifest.json           # List of all examples
├── shared/
│   └── package.json       # Shared dependencies
├── datefilter/
│   ├── App.tsx           # Example implementation
│   └── index.html        # Entry point
├── quickfilterdropdown/
│   ├── App.tsx
│   └── index.html
└── activefilters/
    ├── App.tsx
    └── index.html
```

## Best Practices

1. **Keep Examples Simple**: Focus on demonstrating one component at a time
2. **Use Real Data**: Make examples realistic and relatable
3. **Include Instructions**: Add comments explaining key features
4. **Test Locally**: Run `npm run examples:serve` to test before pushing

## Maintenance

The GitHub Action will automatically update examples when:

- Components in `src/components/` change
- Example files are manually updated
- You manually trigger the workflow

## URLs for Documentation

Use these URL patterns in your documentation:

```markdown
[Try it on StackBlitz](https://stackblitz.com/github/ryanrozich/ag-grid-react-components/tree/main/examples/datefilter)
```

## Future Enhancements

1. **StackBlitz API**: We could use their API to create projects dynamically
2. **Template System**: Create different templates for different use cases
3. **Version Tracking**: Tag examples with component versions
4. **Performance Examples**: Show examples with large datasets
