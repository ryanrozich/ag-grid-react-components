# Publishing AG Grid React Components to NPM

## 🚀 Ready to Publish

All packages are implemented and ready to be published to npm. Here's how to proceed:

## Step 1: Create NPM Account (if needed)

1. Go to [https://www.npmjs.com/signup](https://www.npmjs.com/signup)
2. Create an account
3. Verify your email

## Step 2: Login to NPM

````bash
npm login
# Enter your username, password, and email
# You'll receive a one-time password via email
```text

## Step 3: Verify Login

```bash
npm whoami
# Should show your npm username
```text

## Step 4: Test the Build

```bash
# Build all packages
npx turbo run build

# Dry run to see what would be published
npm run publish:dry
```text

## Step 5: Publish Beta Version

```bash
# Publish all packages with beta tag
npm run publish:beta
````

This will publish:

- `@agrc/core@2.0.0-beta.1`
- `@agrc/adapters@2.0.0-beta.1`
- `@agrc/styles@2.0.0-beta.1`
- `@agrc/compat@2.0.0-beta.1`

## Step 6: Test Installation

In a new project:

````bash
# Test minimal install
npm install @agrc/core@beta

# Test with adapters
npm install @agrc/core@beta @agrc/adapters@beta

# Test compatibility layer
npm install @agrc/compat@beta
```text

## Step 7: Create Example Project

```typescript
// example/App.tsx
import { createDateFilter } from '@agrc/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import '@agrc/styles/core.css';

const DateFilter = createDateFilter();

function App() {
  const columnDefs = [
    { field: 'name' },
    { field: 'date', filter: DateFilter }
  ];

  const rowData = [
    { name: 'Task 1', date: new Date() },
    { name: 'Task 2', date: new Date(2024, 0, 1) }
  ];

  return (
    <AgGridReact
      columnDefs={columnDefs}
      rowData={rowData}
    />
  );
}
````

## Step 8: GitHub Release

1. Create a new release on GitHub
2. Tag: `v2.0.0-beta.1`
3. Title: "v2.0.0-beta.1 - Modular Architecture"
4. Description: Include migration guide and bundle size improvements

## Step 9: Announce

Share on:

- Twitter/X: "🚀 AG Grid React Components v2 is here! 95% smaller bundles, modular architecture, headless components. Install: npm i @agrc/core"
- Reddit (r/reactjs): Post about the bundle size improvements
- Dev.to: Write an article about the modularization journey
- AG Grid forum: Announce the new components

## Package URLs (after publishing)

- Core: [https://www.npmjs.com/package/@agrc/core](https://www.npmjs.com/package/@agrc/core)
- Adapters: [https://www.npmjs.com/package/@agrc/adapters](https://www.npmjs.com/package/@agrc/adapters)
- Styles: [https://www.npmjs.com/package/@agrc/styles](https://www.npmjs.com/package/@agrc/styles)
- Compat: [https://www.npmjs.com/package/@agrc/compat](https://www.npmjs.com/package/@agrc/compat)

## Monitoring

After publishing, monitor:

- npm download stats
- GitHub issues for feedback
- Bundle size on bundlephobia.com

## Future Releases

For stable release:

```bash
# Update version in all package.json files to 2.0.0
# Then
npm run publish:latest
```

## Troubleshooting

If you get permission errors:

- Make sure you're logged in: `npm whoami`
- For scoped packages, ensure they're set to public access
- Check your npm account has 2FA enabled if required

## Success Metrics

- [ ] All packages published successfully
- [ ] Installation works in fresh project
- [ ] Bundle size <25KB for core
- [ ] Examples working
- [ ] Documentation live
