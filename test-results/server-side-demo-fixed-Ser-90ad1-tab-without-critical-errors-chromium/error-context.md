# Test info

- Name: Server-Side Demo Fixed >> should switch to server-side tab without critical errors
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo-fixed.spec.ts:8:3

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 8
Received array:  ["* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *"]
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo-fixed.spec.ts:31:28
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
- paragraph: "Total rows on server: 10,000"
- text: Total Tasks 10,000 From server Total Budget $257,090,800 Average Progress 50% Budget Remaining $127,659,191
- textbox "Search all columns..."
- text: 10,000 results
- grid:
  - rowgroup:
    - row "Task ID":
      - columnheader "Task ID"
    - row:
      - gridcell
  - rowgroup:
    - row "Title Status Priority Category Assignee Due Date":
      - columnheader "Title"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
    - row "Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu":
      - gridcell "Open Filter Menu":
        - textbox "Title Filter Input"
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Status Filter Input" [disabled]
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Priority Filter Input" [disabled]
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Category Filter Input" [disabled]
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Assignee Filter Input"
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Due Date Filter Input" [disabled]
        - button "Open Filter Menu"
  - rowgroup:
    - row "TASK-1":
      - gridcell "TASK-1"
    - row "TASK-2":
      - gridcell "TASK-2"
    - row "TASK-3":
      - gridcell "TASK-3"
    - row "TASK-4":
      - gridcell "TASK-4"
    - row "TASK-5":
      - gridcell "TASK-5"
    - row "TASK-6":
      - gridcell "TASK-6"
    - row "TASK-7":
      - gridcell "TASK-7"
    - row "TASK-8":
      - gridcell "TASK-8"
    - row "TASK-9":
      - gridcell "TASK-9"
    - row "TASK-10":
      - gridcell "TASK-10"
    - row "TASK-11":
      - gridcell "TASK-11"
  - rowgroup:
    - row "The GB array is down, connect the haptic panel so we can navigate the CSS array! Todo Low 🐛 Bug Dr. Malcolm Sawayn Dr. Malcolm Sawayn 7/12/2025":
      - gridcell "The GB array is down, connect the haptic panel so we can navigate the CSS array!"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Dr. Malcolm Sawayn Dr. Malcolm Sawayn":
        - img "Dr. Malcolm Sawayn"
        - text: Dr. Malcolm Sawayn
      - gridcell "7/12/2025"
    - row "We need to generate the mobile SMS capacitor! In Progress Critical ✨ Feature Shaun Morissette Shaun Morissette 6/21/2025":
      - gridcell "We need to generate the mobile SMS capacitor!"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Shaun Morissette Shaun Morissette":
        - img "Shaun Morissette"
        - text: Shaun Morissette
      - gridcell "6/21/2025"
    - row "We need to back up the optical PCI driver! In Progress Low ✨ Feature Sherry Ebert Sherry Ebert 7/8/2025":
      - gridcell "We need to back up the optical PCI driver!"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Sherry Ebert Sherry Ebert":
        - img "Sherry Ebert"
        - text: Sherry Ebert
      - gridcell "7/8/2025"
    - row "You can't connect the monitor without compressing the wireless XML protocol! In Review High ✨ Feature Johanna Lynch I Johanna Lynch I 7/7/2025":
      - gridcell "You can't connect the monitor without compressing the wireless XML protocol!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Johanna Lynch I Johanna Lynch I":
        - img "Johanna Lynch I"
        - text: Johanna Lynch I
      - gridcell "7/7/2025"
    - row "I'll override the virtual FTP panel, that should interface the EXE bandwidth! Backlog Critical 🧪 Testing Wilbur Bechtelar Wilbur Bechtelar 6/30/2025":
      - gridcell "I'll override the virtual FTP panel, that should interface the EXE bandwidth!"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Wilbur Bechtelar Wilbur Bechtelar":
        - img "Wilbur Bechtelar"
        - text: Wilbur Bechtelar
      - gridcell "6/30/2025"
    - row "We need to synthesize the back-end JBOD hard drive! In Review Medium 🧪 Testing Dr. Al Haag Dr. Al Haag 7/16/2025":
      - gridcell "We need to synthesize the back-end JBOD hard drive!"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Dr. Al Haag Dr. Al Haag":
        - img "Dr. Al Haag"
        - text: Dr. Al Haag
      - gridcell "7/16/2025"
    - row "The PCI driver is down, bypass the 1080p transmitter so we can synthesize the GB card! Todo Low ♻️ Refactor Marlene Tromp Marlene Tromp 7/21/2025":
      - gridcell "The PCI driver is down, bypass the 1080p transmitter so we can synthesize the GB card!"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Marlene Tromp Marlene Tromp":
        - img "Marlene Tromp"
        - text: Marlene Tromp
      - gridcell "7/21/2025"
    - row "navigating the feed won't do anything, we need to index the virtual CSS feed! Blocked High ⚡ Performance Dana Kihn Sr. Dana Kihn Sr. 6/27/2025":
      - gridcell "navigating the feed won't do anything, we need to index the virtual CSS feed!"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Dana Kihn Sr. Dana Kihn Sr.":
        - img "Dana Kihn Sr."
        - text: Dana Kihn Sr.
      - gridcell "6/27/2025"
    - row "You can't override the alarm without parsing the solid state SSL program! In Review High 🧪 Testing Shaun Pagac IV Shaun Pagac IV 7/17/2025":
      - gridcell "You can't override the alarm without parsing the solid state SSL program!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Shaun Pagac IV Shaun Pagac IV":
        - img "Shaun Pagac IV"
        - text: Shaun Pagac IV
      - gridcell "7/17/2025"
    - row "We need to parse the neural UTF8 system! In Review High 🐛 Bug Myrtle Fay Myrtle Fay 7/13/2025":
      - gridcell "We need to parse the neural UTF8 system!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Myrtle Fay Myrtle Fay":
        - img "Myrtle Fay"
        - text: Myrtle Fay
      - gridcell "7/13/2025"
    - row "The SMTP card is down, bypass the haptic monitor so we can back up the SCSI pixel! In Progress Medium 🔧 DevOps Sandra Boyle Sandra Boyle 6/28/2025":
      - gridcell "The SMTP card is down, bypass the haptic monitor so we can back up the SCSI pixel!"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Sandra Boyle Sandra Boyle":
        - img "Sandra Boyle"
        - text: Sandra Boyle
      - gridcell "6/28/2025"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "TOTAL":
      - gridcell "TOTAL"
  - rowgroup:
    - row "Grand Total":
      - gridcell "Grand Total"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters" [expanded]
- tabpanel "Filters":
  - textbox "Filter Columns Input"
  - text: Title Status Priority Category Assignee Due Date Progress Budget Spent Remaining
- status
- status
- status
- text: "API Status: /api"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Server-Side Demo Fixed", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto("http://localhost:5173/demo");
   6 |   });
   7 |
   8 |   test("should switch to server-side tab without critical errors", async ({ page }) => {
   9 |     // Start monitoring console errors
   10 |     const criticalErrors: string[] = [];
   11 |     page.on("console", (msg) => {
   12 |       if (msg.type() === "error") {
   13 |         const text = msg.text();
   14 |         // Ignore AG Grid license warnings
   15 |         if (!text.includes("AG Grid Enterprise License") &&
   16 |             !text.includes("License Key Not Found") &&
   17 |             !text.includes("***")) {
   18 |           criticalErrors.push(text);
   19 |         }
   20 |       }
   21 |     });
   22 |
   23 |     // Click on server-side tab
   24 |     await page.click('button:has-text("Server-Side Data")');
   25 |
   26 |     // Wait for the server-side demo to load
   27 |     await page.waitForLoadState("networkidle");
   28 |     await page.waitForTimeout(1000); // Give time for any errors to surface
   29 |
   30 |     // Check that no critical console errors occurred
>  31 |     expect(criticalErrors).toHaveLength(0);
      |                            ^ Error: expect(received).toHaveLength(expected)
   32 |   });
   33 |
   34 |   test("should render server-side demo components", async ({ page }) => {
   35 |     // Switch to server-side tab
   36 |     await page.click('button:has-text("Server-Side Data")');
   37 |
   38 |     // Check that the banner is visible
   39 |     await expect(page.locator('text="Server-Side Row Model Demo"')).toBeVisible({ timeout: 10000 });
   40 |
   41 |     // Check that the API status is shown
   42 |     await expect(page.locator('text="API Status:"')).toBeVisible();
   43 |
   44 |     // Check that stats are displayed
   45 |     await expect(page.locator('text="Total Tasks"')).toBeVisible();
   46 |     await expect(page.locator('text="Total Budget"')).toBeVisible();
   47 |   });
   48 |
   49 |   test("should display the AG Grid with server-side data", async ({ page }) => {
   50 |     // Switch to server-side tab
   51 |     await page.click('button:has-text("Server-Side Data")');
   52 |
   53 |     // Wait for the grid to be visible
   54 |     const grid = page.locator(".ag-root-wrapper");
   55 |     await expect(grid).toBeVisible({ timeout: 10000 });
   56 |
   57 |     // Check that headers are visible
   58 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   59 |
   60 |     // Check for specific server-side headers
   61 |     await expect(page.locator('.ag-header-cell-text:has-text("Task ID")')).toBeVisible();
   62 |     await expect(page.locator('.ag-header-cell-text:has-text("Title")')).toBeVisible();
   63 |
   64 |     // Wait for data rows to appear
   65 |     await page.waitForSelector(".ag-row", { timeout: 10000 });
   66 |
   67 |     // Verify data is loaded
   68 |     const rows = await page.locator(".ag-row").count();
   69 |     expect(rows).toBeGreaterThan(0);
   70 |   });
   71 |
   72 |   test("should not have incompatible status bar components", async ({ page }) => {
   73 |     // Monitor for specific AG Grid warnings
   74 |     let hasIncompatibleComponents = false;
   75 |     page.on("console", (msg) => {
   76 |       if (msg.type() === "warning") {
   77 |         const text = msg.text();
   78 |         if (text.includes("agTotalAndFilteredRowCountComponent") ||
   79 |             text.includes("agTotalRowCountComponent should only be used with the client side") ||
   80 |             text.includes("agFilteredRowCountComponent should only be used with the client side")) {
   81 |           hasIncompatibleComponents = true;
   82 |         }
   83 |       }
   84 |     });
   85 |
   86 |     // Switch to server-side tab
   87 |     await page.click('button:has-text("Server-Side Data")');
   88 |
   89 |     // Wait for the grid to render
   90 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
   91 |     await page.waitForTimeout(1000);
   92 |
   93 |     // Verify no incompatible components were used
   94 |     expect(hasIncompatibleComponents).toBe(false);
   95 |   });
   96 |
   97 |   test("should handle search functionality in server-side mode", async ({ page }) => {
   98 |     // Switch to server-side tab
   99 |     await page.click('button:has-text("Server-Side Data")');
  100 |
  101 |     // Wait for search input
  102 |     const searchInput = page.locator('input[placeholder="Search all columns..."]');
  103 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  104 |
  105 |     // Type a search term
  106 |     await searchInput.fill("bug");
  107 |
  108 |     // Wait for debounce and check results
  109 |     await page.waitForTimeout(500);
  110 |
  111 |     // Verify search is working by checking for results indicator
  112 |     await expect(page.locator('text="results"')).toBeVisible();
  113 |   });
  114 |
  115 |   test("server-side data should be different from client-side", async ({ page }) => {
  116 |     // First check client-side headers
  117 |     await page.waitForSelector(".ag-header-cell-text");
  118 |     const clientHeaders = await page.locator(".ag-header-cell-text").allTextContents();
  119 |
  120 |     // Switch to server-side
  121 |     await page.click('button:has-text("Server-Side Data")');
  122 |     await page.waitForTimeout(1000);
  123 |
  124 |     // Check server-side headers
  125 |     await page.waitForSelector(".ag-header-cell-text");
  126 |     const serverHeaders = await page.locator(".ag-header-cell-text").allTextContents();
  127 |
  128 |     // Headers should be different (Task ID vs ID, Title vs Task, etc.)
  129 |     expect(serverHeaders).toContain("Task ID");
  130 |     expect(serverHeaders).toContain("Title");
  131 |     expect(clientHeaders).not.toContain("Task ID");
```