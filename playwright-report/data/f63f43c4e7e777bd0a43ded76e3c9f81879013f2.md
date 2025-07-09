# Test info

- Name: Filter Presets - Save and Load Flow >> should update an existing preset
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/filter-presets.spec.ts:126:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('.ag-root') to be visible

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/filter-presets.spec.ts:19:16
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
  - button "Show version details": v0.2.0-rc1+20 release/v0.2.0-rc1
  - link "NPM":
    - /url: https://www.npmjs.com/package/ag-grid-react-components
    - img
    - text: NPM
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- text: Pre-release v0.2.0-rc1 Minimal Bundle Size MIT License
- heading "Supercharge AG Grid with modern UX components" [level=1]
- paragraph: Transform AG Grid from a powerful data table into a delightful user experience. These production-ready React components add the filtering, presets, and state management features your users have been asking for.
- button "View Live Demo"
- button "Documentation"
- img "AG Grid React Components showcase - DateFilter with relative date expressions, QuickFilterDropdown with presets, and ActiveFilters display"
- text: DateFilter QuickFilterDropdown ActiveFilters
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
- paragraph: Essential components for modern data applications
- paragraph: "AG Grid gives you the foundation. These components add the polish your users expect: intuitive filtering, visible filter pills, shareable presets, and persistent state. Built for teams who use grids as their primary workspace."
- term:
  - img
  - text: Relative Date Filtering
- definition:
  - paragraph: Natural language date filters like "last 30 days" that actually update every day. Your saved views and shared links always show current data.
- term:
  - img
  - text: Quick Filter Menus
- definition:
  - paragraph: One-click access to your most-used filters. Configure dropdowns for "High Priority", "Due This Week", or any complex filter combination your team needs.
- term:
  - img
  - text: Active Filter Pills
- definition:
  - paragraph: Stop hunting for tiny blue dots. Display active filters as clear, interactive pills that users can see and remove with a single click.
- term:
  - img
  - text: Filter Presets & Sharing
- definition:
  - paragraph: Save complex filter combinations as named presets. Export and share them with your team, or copy a URL that captures your exact grid state.
- paragraph: Seamlessly integrates with your existing AG Grid setup
- paragraph: Drop-in components with zero dependencies. Use our thoughtful defaults or customize every detail with headless flexibility.
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
- contentinfo:
  - heading "AG Grid React Components" [level=3]
  - paragraph: Supercharge AG Grid with modern UX components. Tree-shakeable, headless, and released under the MIT License.
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
  - heading "Community" [level=3]
  - list:
    - listitem:
      - link "Report Issues":
        - /url: https://github.com/ryanrozich/ag-grid-react-components/issues
    - listitem:
      - link "Suggest Features":
        - /url: https://github.com/ryanrozich/ag-grid-react-components/issues/new?labels=enhancement
    - listitem:
      - link "View Pull Requests":
        - /url: https://github.com/ryanrozich/ag-grid-react-components/pulls
  - heading "Legal" [level=3]
  - paragraph: This project is not affiliated with AG Grid Ltd.
  - paragraph: Use at your own risk. No warranty provided.
  - paragraph: © 2025 Ryan Rozich. All rights reserved.
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import type { Page } from "@playwright/test";
   3 |
   4 | /**
   5 |  * E2E tests for filter preset functionality
   6 |  * Tests the complete user flow of saving, loading, and managing filter presets
   7 |  */
   8 |
   9 | test.describe("Filter Presets - Save and Load Flow", () => {
   10 |   let page: Page;
   11 |
   12 |   test.beforeEach(async ({ page: testPage }) => {
   13 |     page = testPage;
   14 |
   15 |     // Navigate to the demo page
   16 |     await page.goto("/");
   17 |
   18 |     // Wait for the grid to be ready
>  19 |     await page.waitForSelector(".ag-root", { timeout: 10000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
   20 |
   21 |     // Clear any existing presets from localStorage
   22 |     await page.evaluate(() => {
   23 |       localStorage.removeItem("ag-grid-filter-presets");
   24 |     });
   25 |   });
   26 |
   27 |   test("should save current filters as a preset", async () => {
   28 |     // Apply some filters first
   29 |     await applyTestFilters(page);
   30 |
   31 |     // Open preset manager
   32 |     await page.click('[data-testid="preset-manager-button"]');
   33 |
   34 |     // Click save preset button
   35 |     await page.click('[data-testid="save-preset-button"]');
   36 |
   37 |     // Fill in preset details
   38 |     await page.fill('[data-testid="preset-name-input"]', "My Test Preset");
   39 |     await page.fill(
   40 |       '[data-testid="preset-description-input"]',
   41 |       "Filters for testing",
   42 |     );
   43 |
   44 |     // Add tags
   45 |     await page.fill('[data-testid="preset-tags-input"]', "test, e2e");
   46 |
   47 |     // Save the preset
   48 |     await page.click('[data-testid="confirm-save-preset"]');
   49 |
   50 |     // Verify success message
   51 |     await expect(
   52 |       page.locator('[data-testid="preset-saved-message"]'),
   53 |     ).toBeVisible();
   54 |     await expect(
   55 |       page.locator('[data-testid="preset-saved-message"]'),
   56 |     ).toContainText("Preset saved successfully");
   57 |
   58 |     // Verify preset appears in the list
   59 |     await expect(
   60 |       page.locator('[data-testid="preset-item-My Test Preset"]'),
   61 |     ).toBeVisible();
   62 |   });
   63 |
   64 |   test("should load a saved preset", async () => {
   65 |     // First save a preset
   66 |     await createTestPreset(page, "Test Load Preset");
   67 |
   68 |     // Clear current filters
   69 |     await page.click('[data-testid="clear-all-filters"]');
   70 |
   71 |     // Verify filters are cleared
   72 |     await expect(page.locator(".ag-filter-active")).not.toBeVisible();
   73 |
   74 |     // Open preset manager
   75 |     await page.click('[data-testid="preset-manager-button"]');
   76 |
   77 |     // Click on the preset to load it
   78 |     await page.click('[data-testid="preset-item-Test Load Preset"]');
   79 |
   80 |     // Verify filters are applied
   81 |     await expect(page.locator(".ag-filter-active")).toBeVisible();
   82 |
   83 |     // Verify specific filter values
   84 |     await verifyFiltersApplied(page);
   85 |   });
   86 |
   87 |   test("should show system presets alongside user presets", async () => {
   88 |     // Open preset manager
   89 |     await page.click('[data-testid="preset-manager-button"]');
   90 |
   91 |     // Verify system presets are visible
   92 |     await expect(
   93 |       page.locator('[data-testid="preset-item-Recent Activity"]'),
   94 |     ).toBeVisible();
   95 |     await expect(
   96 |       page.locator('[data-testid="preset-item-High Priority"]'),
   97 |     ).toBeVisible();
   98 |
   99 |     // Verify system preset indicators
  100 |     await expect(
  101 |       page.locator(
  102 |         '[data-testid="preset-item-Recent Activity"] [data-testid="system-preset-badge"]',
  103 |       ),
  104 |     ).toBeVisible();
  105 |
  106 |     // Create a user preset
  107 |     await createTestPreset(page, "My User Preset");
  108 |
  109 |     // Verify both types are shown
  110 |     await page.click('[data-testid="preset-manager-button"]');
  111 |     await expect(
  112 |       page.locator('[data-testid="preset-item-Recent Activity"]'),
  113 |     ).toBeVisible();
  114 |     await expect(
  115 |       page.locator('[data-testid="preset-item-My User Preset"]'),
  116 |     ).toBeVisible();
  117 |
  118 |     // Verify user preset doesn't have system badge
  119 |     await expect(
```