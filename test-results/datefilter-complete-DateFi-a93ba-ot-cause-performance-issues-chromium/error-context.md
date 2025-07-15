# Test info

- Name: DateFilter Complete Functionality >> Multiple filter operations do not cause performance issues
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/datefilter-complete.spec.ts:150:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-theme-quartz') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/datefilter-complete.spec.ts:9:16
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
   3 | test.describe('DateFilter Complete Functionality', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto('/');
   7 |     
   8 |     // Wait for the grid to load
>  9 |     await page.waitForSelector('.ag-theme-quartz', { timeout: 10000 });
     |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   10 |     
   11 |     // Navigate to demo tab if needed
   12 |     const demoTab = page.locator('button:has-text("Demo")');
   13 |     if (await demoTab.isVisible()) {
   14 |       await demoTab.click();
   15 |       await page.waitForTimeout(500);
   16 |     }
   17 |   });
   18 |
   19 |   test('DateFilter applies filters correctly', async ({ page }) => {
   20 |     // Open the Due Date column menu
   21 |     const dueDateHeader = page.locator('.ag-header-cell').filter({ hasText: 'Due Date' });
   22 |     await dueDateHeader.hover();
   23 |     
   24 |     // Click the menu button
   25 |     const menuButton = dueDateHeader.locator('.ag-header-cell-menu-button');
   26 |     await menuButton.click();
   27 |     
   28 |     // Click on Filter menu item
   29 |     const filterMenuItem = page.locator('.ag-menu-option').filter({ hasText: 'Filter' });
   30 |     await filterMenuItem.click();
   31 |     
   32 |     // Wait for the date filter to appear
   33 |     await page.waitForSelector('[data-component="date-filter"]');
   34 |     
   35 |     // Select "After" filter type
   36 |     const filterTypeButton = page.locator('[data-component="date-filter-type-trigger"]');
   37 |     await filterTypeButton.click();
   38 |     
   39 |     const afterOption = page.locator('[data-component="date-filter-type-option"]').filter({ hasText: 'After' });
   40 |     await afterOption.click();
   41 |     
   42 |     // Enter a relative date
   43 |     const dateInput = page.locator('[data-component="date-filter-input"]');
   44 |     await dateInput.fill('today-7d');
   45 |     
   46 |     // Apply the filter
   47 |     const applyButton = page.locator('[data-component="date-filter-apply-button"]');
   48 |     await applyButton.click();
   49 |     
   50 |     // Wait for filter to be applied
   51 |     await page.waitForTimeout(500);
   52 |     
   53 |     // Verify the filter is shown in active filters
   54 |     const activeFilter = page.locator('[data-component="active-filters-item"]');
   55 |     await expect(activeFilter).toBeVisible();
   56 |     
   57 |     // Verify the filter value is displayed correctly
   58 |     const filterValue = page.locator('[data-component="active-filters-value"]');
   59 |     await expect(filterValue).toContainText('today-7d');
   60 |     
   61 |     // Verify grid is actually filtered (row count should be reduced)
   62 |     const rowCount = await page.locator('.ag-row').count();
   63 |     expect(rowCount).toBeGreaterThan(0);
   64 |     expect(rowCount).toBeLessThan(100); // Assuming we have 100 total rows
   65 |   });
   66 |
   67 |   test('DateFilter shows current state when applied from presets', async ({ page }) => {
   68 |     // Set up console log monitoring for infinite loop detection
   69 |     const consoleLogs: string[] = [];
   70 |     page.on('console', (msg) => {
   71 |       if (msg.type() === 'log') {
   72 |         consoleLogs.push(msg.text());
   73 |       }
   74 |     });
   75 |     
   76 |     // Click the quick filter dropdown
   77 |     const presetDropdown = page.locator('[data-component="quick-filter-trigger"]').first();
   78 |     await expect(presetDropdown).toBeVisible();
   79 |     await presetDropdown.click();
   80 |     
   81 |     // Wait for dropdown to open
   82 |     await page.waitForSelector('[data-component="quick-filter-dropdown-content"]');
   83 |     
   84 |     // Click on "Last 7 days" option
   85 |     const last7DaysOption = page.locator('[data-component="quick-filter-option"]').filter({ hasText: 'Last 7 days' });
   86 |     await last7DaysOption.click();
   87 |     
   88 |     // Wait for filter to be applied
   89 |     await page.waitForTimeout(1000);
   90 |     
   91 |     // Verify no infinite loop
   92 |     const gridStateSaves = consoleLogs.filter(log => log.includes('Grid state saved to URL')).length;
   93 |     expect(gridStateSaves).toBeLessThan(5);
   94 |     
   95 |     // Verify the filter is shown in active filters
   96 |     const activeFilter = page.locator('[data-component="active-filters-item"]');
   97 |     await expect(activeFilter).toBeVisible();
   98 |     
   99 |     // Click on the active filter pill to edit it
  100 |     await activeFilter.click();
  101 |     
  102 |     // Wait for the date filter dropdown to open
  103 |     await page.waitForSelector('[data-component="date-filter"]', { state: 'visible' });
  104 |     
  105 |     // Verify the filter shows the current state
  106 |     const filterTypeDisplay = page.locator('[data-component="date-filter-type-display"]');
  107 |     await expect(filterTypeDisplay).toContainText('After');
  108 |     
  109 |     const dateInput = page.locator('[data-component="date-filter-input"]');
```