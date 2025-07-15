# Test info

- Name: Infinite Loop Fix Verification >> should not have infinite loop on initial page load
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/infinite-loop-fix.spec.ts:4:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-theme-quartz') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/infinite-loop-fix.spec.ts:23:16
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
  - button "Show version details": v0.1.0+48 feat/headless-refactor
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
- img "AG Grid React Components showcase - DateFilter with relative date expressions, QuickFilterDropdown with presets, and ActiveFilters display"
- text: DateFilter QuickFilterDropdown ActiveFilters
- paragraph: New UX features for AG Grid
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
- paragraph: Developer experience that just works
- paragraph: Clean APIs, zero dependencies, and thoughtful defaults. Style it your way or use it headless.
- code: "npm install ag-grid-react-components // Just add to your existing AG Grid setup import { createDateFilter } from 'ag-grid-react-components'; const DateFilter = createDateFilter(); const columnDefs = [{ field: 'dueDate', filter: DateFilter, filterParams: { defaultMode: 'relative' } }];"
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
   3 | test.describe('Infinite Loop Fix Verification', () => {
   4 |   test('should not have infinite loop on initial page load', async ({ page }) => {
   5 |     // Set up console log monitoring
   6 |     const consoleLogs: { text: string; timestamp: number }[] = [];
   7 |     const errors: string[] = [];
   8 |     
   9 |     page.on('console', (msg) => {
   10 |       const text = msg.text();
   11 |       if (msg.type() === 'log' && text.includes('Grid state saved to URL')) {
   12 |         consoleLogs.push({ text, timestamp: Date.now() });
   13 |       } else if (msg.type() === 'error') {
   14 |         errors.push(text);
   15 |       }
   16 |     });
   17 |     
   18 |     // Navigate to the page
   19 |     console.log('Navigating to demo page...');
   20 |     await page.goto('/');
   21 |     
   22 |     // Wait for the grid to load
>  23 |     await page.waitForSelector('.ag-theme-quartz', { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   24 |     
   25 |     // Navigate to demo tab
   26 |     const demoTab = page.locator('button:has-text("Demo")');
   27 |     if (await demoTab.isVisible()) {
   28 |       await demoTab.click();
   29 |       await page.waitForTimeout(500);
   30 |     }
   31 |     
   32 |     // Wait to see if infinite loop occurs
   33 |     await page.waitForTimeout(3000);
   34 |     
   35 |     // Analyze the logs
   36 |     console.log(`Total "Grid state saved to URL" messages: ${consoleLogs.length}`);
   37 |     console.log(`Errors encountered: ${errors.length}`);
   38 |     
   39 |     if (errors.length > 0) {
   40 |       console.log('First 3 errors:', errors.slice(0, 3));
   41 |     }
   42 |     
   43 |     // There should be very few saves on initial load
   44 |     expect(consoleLogs.length).toBeLessThan(5);
   45 |     
   46 |     // Check timing between saves
   47 |     if (consoleLogs.length > 1) {
   48 |       const timeDiffs = [];
   49 |       for (let i = 1; i < consoleLogs.length; i++) {
   50 |         timeDiffs.push(consoleLogs[i].timestamp - consoleLogs[i-1].timestamp);
   51 |       }
   52 |       console.log('Time differences between saves (ms):', timeDiffs);
   53 |       
   54 |       // Average time should be reasonable (not rapid fire)
   55 |       const avgTime = timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length;
   56 |       console.log(`Average time between saves: ${avgTime}ms`);
   57 |       
   58 |       // If saves happen too quickly, it's a loop
   59 |       expect(avgTime).toBeGreaterThan(50);
   60 |     }
   61 |   });
   62 |
   63 |   test('should handle filter changes without loops', async ({ page }) => {
   64 |     const consoleLogs: string[] = [];
   65 |     
   66 |     page.on('console', (msg) => {
   67 |       if (msg.type() === 'log' && msg.text().includes('Grid state saved to URL')) {
   68 |         consoleLogs.push(msg.text());
   69 |       }
   70 |     });
   71 |     
   72 |     await page.goto('/');
   73 |     await page.waitForSelector('.ag-theme-quartz', { timeout: 10000 });
   74 |     
   75 |     // Navigate to demo tab
   76 |     const demoTab = page.locator('button:has-text("Demo")');
   77 |     if (await demoTab.isVisible()) {
   78 |       await demoTab.click();
   79 |       await page.waitForTimeout(500);
   80 |     }
   81 |     
   82 |     // Clear any initial logs
   83 |     consoleLogs.length = 0;
   84 |     
   85 |     // Apply a filter via quick filter dropdown
   86 |     const presetDropdown = page.locator('[data-component="quick-filter-trigger"]').first();
   87 |     await expect(presetDropdown).toBeVisible({ timeout: 5000 });
   88 |     await presetDropdown.click();
   89 |     
   90 |     await page.waitForSelector('[data-component="quick-filter-dropdown-content"]');
   91 |     
   92 |     const last7DaysOption = page.locator('[data-component="quick-filter-option"]').filter({ hasText: 'Last 7 days' });
   93 |     await last7DaysOption.click();
   94 |     
   95 |     // Wait for any reactions
   96 |     await page.waitForTimeout(2000);
   97 |     
   98 |     // Should have minimal saves (1-3 is normal for a single action)
   99 |     console.log(`Saves after filter change: ${consoleLogs.length}`);
  100 |     expect(consoleLogs.length).toBeLessThan(5);
  101 |   });
  102 |
  103 |   test('should handle rapid filter changes gracefully', async ({ page }) => {
  104 |     await page.goto('/');
  105 |     await page.waitForSelector('.ag-theme-quartz', { timeout: 10000 });
  106 |     
  107 |     const demoTab = page.locator('button:has-text("Demo")');
  108 |     if (await demoTab.isVisible()) {
  109 |       await demoTab.click();
  110 |       await page.waitForTimeout(500);
  111 |     }
  112 |     
  113 |     // Monitor performance
  114 |     const startTime = Date.now();
  115 |     
  116 |     // Apply multiple filters rapidly
  117 |     for (let i = 0; i < 3; i++) {
  118 |       const presetDropdown = page.locator('[data-component="quick-filter-trigger"]').first();
  119 |       await presetDropdown.click();
  120 |       
  121 |       const option = page.locator('[data-component="quick-filter-option"]').nth(i % 3);
  122 |       await option.click();
  123 |       
```