# Test info

- Name: DateFilter Infinite Loop Bug >> should not cause infinite loop when selecting Last 7 days preset
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/datefilter-infinite-loop.spec.ts:4:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-theme-quartz') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/datefilter-infinite-loop.spec.ts:9:16
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
   3 | test.describe('DateFilter Infinite Loop Bug', () => {
   4 |   test('should not cause infinite loop when selecting Last 7 days preset', async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto('http://localhost:5173/');
   7 |     
   8 |     // Wait for the grid to load
>  9 |     await page.waitForSelector('.ag-theme-quartz', { timeout: 10000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   10 |     
   11 |     // Set up console log monitoring
   12 |     const consoleLogs: string[] = [];
   13 |     page.on('console', (msg) => {
   14 |       if (msg.type() === 'log') {
   15 |         consoleLogs.push(msg.text());
   16 |       }
   17 |     });
   18 |     
   19 |     // Find and click the date filter preset dropdown
   20 |     // First, make sure we're on the demo tab
   21 |     const demoTab = page.locator('button:has-text("Demo")');
   22 |     if (await demoTab.isVisible()) {
   23 |       await demoTab.click();
   24 |       await page.waitForTimeout(500); // Wait for tab transition
   25 |     }
   26 |     
   27 |     // Now find the QuickFilterDropdown - it might be in a header or toolbar
   28 |     const presetDropdown = page.locator('[data-component="quick-filter-trigger"], [data-testid="quick-filter-dropdown"]').first();
   29 |     await expect(presetDropdown).toBeVisible({ timeout: 5000 });
   30 |     await presetDropdown.click();
   31 |     
   32 |     // Wait for dropdown to open
   33 |     await page.waitForSelector('[data-component="quick-filter-dropdown-content"]', { state: 'visible' });
   34 |     
   35 |     // Click on "Last 7 days" option
   36 |     const last7DaysOption = page.locator('[data-component="quick-filter-option"]').filter({ hasText: 'Last 7 days' });
   37 |     await expect(last7DaysOption).toBeVisible();
   38 |     await last7DaysOption.click();
   39 |     
   40 |     // Wait a bit to see if infinite loop occurs
   41 |     await page.waitForTimeout(3000);
   42 |     
   43 |     // Count how many times "Grid state saved to URL" appears in console logs
   44 |     const gridStateSaves = consoleLogs.filter(log => log.includes('Grid state saved to URL')).length;
   45 |     
   46 |     // There should be only 1 or 2 saves, not hundreds
   47 |     console.log(`Number of grid state saves: ${gridStateSaves}`);
   48 |     expect(gridStateSaves).toBeLessThan(5);
   49 |     
   50 |     // Also check that the filter is actually applied
   51 |     const activeFilters = page.locator('[data-component="active-filters-item"]');
   52 |     await expect(activeFilters).toHaveCount(1);
   53 |     
   54 |     // Check that the filter pill shows the correct value
   55 |     const filterValue = page.locator('[data-component="active-filters-value"]').first();
   56 |     await expect(filterValue).toContainText('today-7d');
   57 |   });
   58 |
   59 |   test('should monitor React re-renders when applying date filter', async ({ page }) => {
   60 |     // Enable React DevTools profiling if available
   61 |     await page.goto('http://localhost:5173/');
   62 |     
   63 |     // Wait for grid
   64 |     await page.waitForSelector('.ag-theme-quartz', { timeout: 10000 });
   65 |     
   66 |     // Monitor network requests to see if there are repeated API calls
   67 |     const requests: string[] = [];
   68 |     page.on('request', (request) => {
   69 |       requests.push(request.url());
   70 |     });
   71 |     
   72 |     // Apply a date filter
   73 |     // First, make sure we're on the demo tab
   74 |     const demoTab = page.locator('button:has-text("Demo")');
   75 |     if (await demoTab.isVisible()) {
   76 |       await demoTab.click();
   77 |       await page.waitForTimeout(500); // Wait for tab transition
   78 |     }
   79 |     
   80 |     const presetDropdown = page.locator('[data-component="quick-filter-trigger"], [data-testid="quick-filter-dropdown"]').first();
   81 |     await expect(presetDropdown).toBeVisible({ timeout: 5000 });
   82 |     await presetDropdown.click();
   83 |     
   84 |     const last30DaysOption = page.locator('[data-component="quick-filter-option"]').filter({ hasText: 'Last 30 days' });
   85 |     await last30DaysOption.click();
   86 |     
   87 |     // Wait and check for repeated requests
   88 |     await page.waitForTimeout(2000);
   89 |     
   90 |     // Log any repeated requests
   91 |     const requestCounts = requests.reduce((acc, url) => {
   92 |       acc[url] = (acc[url] || 0) + 1;
   93 |       return acc;
   94 |     }, {} as Record<string, number>);
   95 |     
   96 |     const repeatedRequests = Object.entries(requestCounts)
   97 |       .filter(([_, count]) => count > 2)
   98 |       .map(([url, count]) => `${url}: ${count} times`);
   99 |     
  100 |     if (repeatedRequests.length > 0) {
  101 |       console.log('Repeated requests detected:', repeatedRequests);
  102 |     }
  103 |     
  104 |     // There shouldn't be many repeated requests
  105 |     expect(repeatedRequests.length).toBe(0);
  106 |   });
  107 | });
```