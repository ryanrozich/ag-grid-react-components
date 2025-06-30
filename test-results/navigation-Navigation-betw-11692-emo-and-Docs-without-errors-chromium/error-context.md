# Test info

- Name: Navigation between pages >> should navigate between Home, Demo, and Docs without errors
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:4:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=Advanced Date Filtering')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text=Advanced Date Filtering')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:24:64
```

# Page snapshot

```yaml
- banner:
  - heading "AG Grid React Components" [level=1]
  - navigation:
    - link "Home":
      - /url: /
    - link "Demo":
      - /url: /demo
    - link "Docs":
      - /url: /docs
  - img
  - text: MIT License
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- text: Pre-release v0.1.0 Minimal Bundle Size MIT License
- heading "AG Grid filters that understand \"today\"" [level=1]
- paragraph: If you're using AG Grid, you know users struggle with date filtering. They want "last 30 days" to mean last 30 days—tomorrow too. These open source React components make it happen.
- button "View Live Demo"
- button "Documentation"
- heading "Component Screenshots Coming Soon" [level=3]
- paragraph: Screenshots will showcase DateFilter, QuickFilterDropdown, and ActiveFilters in action.
- img
- paragraph: 16:9 Screenshots (1920x1080)
- paragraph: See src/demo/assets/screenshots/README.md for capture guidelines
- code: "npm install ag-grid-react-components // Just add to your existing AG Grid setup import { createDateFilter } from 'ag-grid-react-components'; const DateFilter = createDateFilter(); const columnDefs = [{ field: 'dueDate', filter: DateFilter, filterParams: { defaultMode: 'relative' } }];"
- heading "Community-Built Components" [level=2]
- paragraph: 4 new UX features for AG Grid
- paragraph: AG Grid is incredibly extensible, but its filtering UX hasn't kept up with modern apps. When you have dozens of columns and dynamic data, users need better ways to filter, save, and share their views. These open source components fill that gap.
- term:
  - img
  - text: DateFilter
- definition:
  - paragraph: Let users filter by "this week", "last month", or "next quarter". These relative queries stay current and work perfectly when bookmarked or shared.
- term:
  - img
  - text: QuickFilterDropdown
- definition:
  - paragraph: Give users instant access to common filters like "Overdue tasks" or "Due this week". No more manual date picking for repetitive queries.
- term:
  - img
  - text: ActiveFilters
- definition:
  - paragraph: No more hunting for tiny blue dots. Show exactly what's filtered in clear, removable pills that users can understand at a glance.
- term:
  - img
  - text: URL State Persistence
- definition:
  - paragraph: Users can bookmark their favorite views and share them with teammates. "Last 30 days" stays last 30 days, even next month.
- heading "Why These Components Exist" [level=2]
- paragraph: Your users understand dates differently than databases do
- heading "The Problem" [level=3]
- list:
  - listitem: × Users manually pick dates every single time
  - listitem: × "Last 30 days" becomes outdated tomorrow
  - listitem: × Can't share or bookmark filtered views
  - listitem: × Tiny blue dots hide active filters
- heading "The Solution" [level=3]
- list:
  - listitem: ✓ Relative date expressions that stay current
  - listitem: ✓ Quick filter presets for common queries
  - listitem: ✓ Shareable URLs with compressed state
  - listitem: ✓ Clear filter pills with one-click removal
- heading "The Benefit" [level=3]
- list:
  - listitem: → Users save hours on repetitive filtering
  - listitem: → Teams share consistent report views
  - listitem: → Dashboards that update automatically
  - listitem: → Happy users, fewer support tickets
- heading "Built for Developers" [level=2]
- paragraph: Developer experience that just works
- paragraph: Clean APIs, zero dependencies, and thoughtful defaults. Style it your way or use it headless.
- img
- heading "Start in minutes" [level=3]
- list:
  - listitem: → Single npm install
  - listitem: → Works with AG Grid Community & Enterprise
  - listitem: → TypeScript support out of the box
  - listitem: "→ Minimal bundle: starts at 25KB"
- img
- heading "Style it your way" [level=3]
- list:
  - listitem: → Headless by default
  - listitem: → CSS modules for scoped styles
  - listitem: → Override any style with className
  - listitem: → Works with Tailwind, CSS-in-JS, etc.
- img
- heading "Configure everything" [level=3]
- list:
  - listitem: → Pluggable date picker adapters
  - listitem: → Customizable date expressions
  - listitem: → Extensible filter presets
  - listitem: → Override any behavior with callbacks
- heading "Open Source" [level=2]
- paragraph: Built by the community, for the community
- paragraph: We actively encourage contributions. Found a bug? Have a feature idea? Want to improve the docs? Jump in! This project exists because developers like you make it better.
- img
- heading "Report Issues" [level=3]
- paragraph: Found a bug? Let us know on GitHub
- img
- heading "Suggest Features" [level=3]
- paragraph: Have an idea? We'd love to hear it
- img
- heading "Submit PRs" [level=3]
- paragraph: Code contributions always welcome
- link "Contribute on GitHub":
  - /url: https://github.com/ryanrozich/ag-grid-react-components
  - img
  - text: Contribute on GitHub
- contentinfo:
  - heading "AG Grid React Components" [level=3]
  - paragraph: Enterprise-ready date filtering components for AG Grid. Released under the MIT License.
  - heading "Resources" [level=3]
  - list:
    - listitem:
      - link "GitHub Repository":
        - /url: https://github.com/ryanrozich/ag-grid-react-components
    - listitem:
      - link "NPM Package":
        - /url: https://www.npmjs.com/package/ag-grid-react-components
    - listitem:
      - link "AG Grid Documentation":
        - /url: https://www.ag-grid.com/react-data-grid/
  - heading "Legal" [level=3]
  - paragraph: This project is not affiliated with AG Grid Ltd.
  - paragraph: Use at your own risk. No warranty provided.
  - paragraph: © 2025 Ryan Rozich. All rights reserved.
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Navigation between pages', () => {
   4 |   test('should navigate between Home, Demo, and Docs without errors', async ({ page }) => {
   5 |     // Start on the home page
   6 |     await page.goto('/');
   7 |     
   8 |     // Verify we're on the home page
   9 |     await expect(page.locator('h1').first()).toContainText('AG Grid React Components');
  10 |     
  11 |     // Navigate to Demo
  12 |     await page.click('a[href="/demo"]');
  13 |     await page.waitForLoadState('networkidle');
  14 |     
  15 |     // Verify the grid is loaded
  16 |     await expect(page.locator('.ag-theme-quartz-dark')).toBeVisible();
  17 |     await expect(page.locator('.ag-header-row')).toBeVisible();
  18 |     
  19 |     // Navigate back to Home
  20 |     await page.click('a[href="/"]');
  21 |     await page.waitForLoadState('networkidle');
  22 |     
  23 |     // Verify we're back on home
> 24 |     await expect(page.locator('text=Advanced Date Filtering')).toBeVisible();
     |                                                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  25 |     
  26 |     // Navigate to Demo again
  27 |     await page.click('a[href="/demo"]');
  28 |     await page.waitForLoadState('networkidle');
  29 |     
  30 |     // Verify the grid loads without errors
  31 |     await expect(page.locator('.ag-theme-quartz-dark')).toBeVisible();
  32 |     await expect(page.locator('.ag-header-row')).toBeVisible();
  33 |     
  34 |     // Check console for errors
  35 |     const consoleErrors: string[] = [];
  36 |     page.on('console', msg => {
  37 |       if (msg.type() === 'error') {
  38 |         consoleErrors.push(msg.text());
  39 |       }
  40 |     });
  41 |     
  42 |     // Navigate to docs and back
  43 |     await page.click('a[href="/docs"]');
  44 |     await page.waitForLoadState('networkidle');
  45 |     await expect(page.locator('text=Documentation')).toBeVisible();
  46 |     
  47 |     await page.click('a[href="/demo"]');
  48 |     await page.waitForLoadState('networkidle');
  49 |     
  50 |     // Final check for grid
  51 |     await expect(page.locator('.ag-theme-quartz-dark')).toBeVisible();
  52 |     
  53 |     // Verify no console errors
  54 |     expect(consoleErrors).toHaveLength(0);
  55 |   });
  56 |
  57 |   test('should maintain grid state when staying on demo page', async ({ page }) => {
  58 |     await page.goto('/demo');
  59 |     await page.waitForLoadState('networkidle');
  60 |     
  61 |     // Apply a filter
  62 |     await page.click('text=Due Date');
  63 |     await page.waitForTimeout(500);
  64 |     
  65 |     // Verify filter UI appears
  66 |     const filterDialog = page.locator('.ag-theme-quartz-dark .ag-filter');
  67 |     await expect(filterDialog).toBeVisible();
  68 |     
  69 |     // Close filter
  70 |     await page.keyboard.press('Escape');
  71 |     
  72 |     // Grid should still be functional
  73 |     await expect(page.locator('.ag-header-row')).toBeVisible();
  74 |   });
  75 | });
```