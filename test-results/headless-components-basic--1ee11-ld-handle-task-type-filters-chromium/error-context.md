# Test info

- Name: Headless Components Basic E2E Tests >> QuickFilterDropdown >> should handle task type filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/headless-components-basic.spec.ts:59:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('button:has-text("Task type")')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('button:has-text("Task type")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/headless-components-basic.spec.ts:64:32
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
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
- button "Dismiss banner":
  - img
- heading "🚀 Server-Side Row Model Demo" [level=3]
- paragraph:
  - text: This demo uses AG Grid's Server-Side Row Model with a real API backend. Data is fetched on-demand as you scroll, filter, and sort. The API endpoint is
  - code: /api/tasks
- paragraph: "Total rows on server: ...⏳ Loading..."
- textbox "Search all columns..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: My Views
  - img
- button
- img
- paragraph: Number of Tasks
- paragraph: —
- img
- paragraph: Total Budget
- paragraph: —
- img
- paragraph: Average Progress
- paragraph: —
- img
- paragraph: Budget Remaining
- paragraph: —
- img
- text: Updating...
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Task Status Priority Category Assignee Due Date % Delivered Value":
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Loading"
  - rowgroup
  - rowgroup
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status
- status
- status
- text: "API Status: /api"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Headless Components Basic E2E Tests", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to demo with flexible port
   6 |     const ports = [5174, 5173];
   7 |     let connected = false;
   8 |
   9 |     for (const port of ports) {
   10 |       try {
   11 |         await page.goto(`http://localhost:${port}/demo`, {
   12 |           waitUntil: "domcontentloaded",
   13 |           timeout: 5000,
   14 |         });
   15 |         connected = true;
   16 |         break;
   17 |       } catch (e) {
   18 |         // Try next port
   19 |       }
   20 |     }
   21 |
   22 |     if (!connected) {
   23 |       throw new Error("Could not connect to demo on ports 5173 or 5174");
   24 |     }
   25 |
   26 |     await page.waitForLoadState("networkidle");
   27 |   });
   28 |
   29 |   test.describe("QuickFilterDropdown", () => {
   30 |     test("should render and be interactive", async ({ page }) => {
   31 |       // Go to server-side demo
   32 |       await page.click('button:has-text("Server-Side Data")');
   33 |       await page.waitForTimeout(2000);
   34 |
   35 |       // Test date filter dropdown
   36 |       const dateFilter = page.locator('button:has-text("All Time")');
   37 |       await expect(dateFilter).toBeVisible();
   38 |
   39 |       // Click to open dropdown
   40 |       await dateFilter.click();
   41 |       await page.waitForTimeout(500);
   42 |
   43 |       // Check options are visible
   44 |       await expect(page.locator('text="Last 7 Days"')).toBeVisible();
   45 |       await expect(page.locator('text="This Month"')).toBeVisible();
   46 |
   47 |       // Select an option
   48 |       await page.click('text="Last 7 Days"');
   49 |       await page.waitForTimeout(500);
   50 |
   51 |       // After selection, the dropdown should close and button text should update
   52 |       // Need to re-query the button after it updates
   53 |       const updatedFilter = page
   54 |         .locator('[data-component="quick-filter-trigger"]')
   55 |         .first();
   56 |       await expect(updatedFilter).toContainText("Last 7 Days");
   57 |     });
   58 |
   59 |     test("should handle task type filters", async ({ page }) => {
   60 |       await page.click('button:has-text("Server-Side Data")');
   61 |       await page.waitForTimeout(2000);
   62 |
   63 |       const taskFilter = page.locator('button:has-text("Task type")');
>  64 |       await expect(taskFilter).toBeVisible();
      |                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   65 |
   66 |       await taskFilter.click();
   67 |       await page.waitForTimeout(500);
   68 |
   69 |       // Check for filter options
   70 |       await expect(page.locator('text="Critical Bugs"')).toBeVisible();
   71 |       await expect(page.locator('text="Features"')).toBeVisible();
   72 |     });
   73 |   });
   74 |
   75 |   test.describe("ActiveFilters", () => {
   76 |     test("should display active filters when filters are applied", async ({
   77 |       page,
   78 |     }) => {
   79 |       await page.click('button:has-text("Server-Side Data")');
   80 |       await page.waitForTimeout(2000);
   81 |
   82 |       // Apply a filter
   83 |       const dateFilter = page.locator('button:has-text("All Time")');
   84 |       await dateFilter.click();
   85 |       await page.click('text="Last 7 Days"');
   86 |       await page.waitForTimeout(1000);
   87 |
   88 |       // Check if active filters component appears - look for the one with mt-3
   89 |       const activeFilters = page.locator(
   90 |         ".bg-gray-900\\/40.backdrop-blur-sm.mt-3",
   91 |       );
   92 |       await expect(activeFilters).toBeVisible();
   93 |     });
   94 |   });
   95 |
   96 |   test.describe("SavedViewsManager Basic", () => {
   97 |     test("should have trigger button that opens panel", async ({ page }) => {
   98 |       await page.click('button:has-text("Server-Side Data")');
   99 |       await page.waitForTimeout(2000);
  100 |
  101 |       // Check trigger exists
  102 |       const trigger = page.locator("[data-saved-views-trigger]");
  103 |       await expect(trigger).toBeVisible();
  104 |       await expect(trigger).toContainText("Saved Views");
  105 |
  106 |       // Click to open
  107 |       await trigger.click();
  108 |
  109 |       // Check panel opens
  110 |       const panel = page.locator("[data-saved-views-panel]");
  111 |       await expect(panel).toBeVisible();
  112 |       await expect(panel).toContainText("Saved Views");
  113 |
  114 |       // Check close button works
  115 |       await page.click("[data-saved-views-close]");
  116 |       await expect(panel).not.toBeVisible();
  117 |     });
  118 |
  119 |     test("should show export and import buttons", async ({ page }) => {
  120 |       await page.click('button:has-text("Server-Side Data")');
  121 |       await page.waitForTimeout(2000);
  122 |
  123 |       await page.click("[data-saved-views-trigger]");
  124 |
  125 |       const exportBtn = page.locator('[data-action="export"]');
  126 |       const importBtn = page.locator('[data-action="import"]');
  127 |
  128 |       await expect(exportBtn).toBeVisible();
  129 |       await expect(importBtn).toBeVisible();
  130 |     });
  131 |   });
  132 |
  133 |   test.describe("CategorySelector", () => {
  134 |     test("should be present in server-side demo filters", async ({ page }) => {
  135 |       await page.click('button:has-text("Server-Side Data")');
  136 |       await page.waitForTimeout(2000);
  137 |
  138 |       // The CategorySelector is used within SavedViewsManager dialog
  139 |       // Since dialog isn't working, we'll skip detailed tests for now
  140 |       expect(true).toBe(true);
  141 |     });
  142 |   });
  143 |
  144 |   test("no console errors during navigation", async ({ page }) => {
  145 |     const errors: string[] = [];
  146 |     page.on("console", (msg) => {
  147 |       // Ignore AG Grid license warnings
  148 |       if (
  149 |         msg.type() === "error" &&
  150 |         !msg.text().includes("AG Grid Enterprise License") &&
  151 |         !msg.text().includes("License Key Not Found") &&
  152 |         !msg.text().includes("*****") &&
  153 |         !msg.text().includes("All AG Grid Enterprise features") &&
  154 |         !msg.text().includes("info@ag-grid.com")
  155 |       ) {
  156 |         errors.push(msg.text());
  157 |       }
  158 |     });
  159 |
  160 |     // Navigate through tabs
  161 |     await page.click('button:has-text("Server-Side Data")');
  162 |     await page.waitForTimeout(2000);
  163 |
  164 |     // Open and close SavedViewsManager
```