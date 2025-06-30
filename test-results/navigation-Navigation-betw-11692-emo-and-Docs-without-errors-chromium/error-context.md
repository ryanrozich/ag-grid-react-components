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

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:28:64
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
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Navigation between pages", () => {
   4 |   test("should navigate between Home, Demo, and Docs without errors", async ({
   5 |     page,
   6 |   }) => {
   7 |     // Start on the home page
   8 |     await page.goto("/");
   9 |
  10 |     // Verify we're on the home page
  11 |     await expect(page.locator("h1").first()).toContainText(
  12 |       "AG Grid React Components",
  13 |     );
  14 |
  15 |     // Navigate to Demo
  16 |     await page.click('a[href="/demo"]');
  17 |     await page.waitForLoadState("networkidle");
  18 |
  19 |     // Verify the grid is loaded
  20 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
  21 |     await expect(page.locator(".ag-header-row")).toBeVisible();
  22 |
  23 |     // Navigate back to Home
  24 |     await page.click('a[href="/"]');
  25 |     await page.waitForLoadState("networkidle");
  26 |
  27 |     // Verify we're back on home
> 28 |     await expect(page.locator("text=Advanced Date Filtering")).toBeVisible();
     |                                                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  29 |
  30 |     // Navigate to Demo again
  31 |     await page.click('a[href="/demo"]');
  32 |     await page.waitForLoadState("networkidle");
  33 |
  34 |     // Verify the grid loads without errors
  35 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
  36 |     await expect(page.locator(".ag-header-row")).toBeVisible();
  37 |
  38 |     // Check console for errors
  39 |     const consoleErrors: string[] = [];
  40 |     page.on("console", (msg) => {
  41 |       if (msg.type() === "error") {
  42 |         consoleErrors.push(msg.text());
  43 |       }
  44 |     });
  45 |
  46 |     // Navigate to docs and back
  47 |     await page.click('a[href="/docs"]');
  48 |     await page.waitForLoadState("networkidle");
  49 |     await expect(page.locator("text=Documentation")).toBeVisible();
  50 |
  51 |     await page.click('a[href="/demo"]');
  52 |     await page.waitForLoadState("networkidle");
  53 |
  54 |     // Final check for grid
  55 |     await expect(page.locator(".ag-theme-quartz-dark")).toBeVisible();
  56 |
  57 |     // Verify no console errors
  58 |     expect(consoleErrors).toHaveLength(0);
  59 |   });
  60 |
  61 |   test("should maintain grid state when staying on demo page", async ({
  62 |     page,
  63 |   }) => {
  64 |     await page.goto("/demo");
  65 |     await page.waitForLoadState("networkidle");
  66 |
  67 |     // Apply a filter
  68 |     await page.click("text=Due Date");
  69 |     await page.waitForTimeout(500);
  70 |
  71 |     // Verify filter UI appears
  72 |     const filterDialog = page.locator(".ag-theme-quartz-dark .ag-filter");
  73 |     await expect(filterDialog).toBeVisible();
  74 |
  75 |     // Close filter
  76 |     await page.keyboard.press("Escape");
  77 |
  78 |     // Grid should still be functional
  79 |     await expect(page.locator(".ag-header-row")).toBeVisible();
  80 |   });
  81 | });
  82 |
```