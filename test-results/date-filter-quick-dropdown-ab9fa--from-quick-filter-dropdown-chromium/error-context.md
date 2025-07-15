# Test info

- Name: Date Filter via QuickFilterDropdown >> should filter data when selecting 'Last 7 Days' from quick filter dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/date-filter-quick-dropdown.spec.ts:15:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text="NUMBER OF TASKS"').locator('..')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text="NUMBER OF TASKS"').locator('..')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/date-filter-quick-dropdown.spec.ts:29:32
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
- textbox "Search tasks..."
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
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $41,750,500
- img
- paragraph: Average Progress
- paragraph: 45.6%
- img
- paragraph: Budget Remaining
- paragraph: $22,705,988
- grid:
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value Delivered":
      - columnheader "Column with Header Selection":
        - checkbox "Column with Header Selection"
      - columnheader "Task"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "% Delivered"
      - columnheader "Value"
      - columnheader "Delivered"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) [USER-1194] Extract business logic layer (Sprint 24) In Progress Medium ♻️ Refactor Daniel Kim Daniel Kim 9/14/2025 25% $13,600 $3,400":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-1194] Extract business logic layer (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "9/14/2025"
      - gridcell "25%"
      - gridcell "$13,600"
      - gridcell "$3,400"
    - row "Press Space to toggle row selection (unchecked) [DASH-3980] Optimize memory usage Backlog Low ⚡ Performance Priya Sharma Priya Sharma 10/3/2025 0% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-3980] Optimize memory usage"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "10/3/2025"
      - gridcell "0%"
      - gridcell "$450"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [INFRA-4623] Split monolithic components (Q1 Goals) Backlog Medium ♻️ Refactor Sophia Taylor Sophia Taylor 9/15/2025 0% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[INFRA-4623] Split monolithic components (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/15/2025"
      - gridcell "0%"
      - gridcell "$100"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [WEB-9187] Implement secrets management (Sprint 26) In Review High 🔧 DevOps Olivia Brown Olivia Brown 9/7/2025 74% $750 $555":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-9187] Implement secrets management (Sprint 26)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/7/2025"
      - gridcell "74%"
      - gridcell "$750"
      - gridcell "$555"
    - row "Press Space to toggle row selection (unchecked) [DATA-10142] Implement OAuth integration Todo Critical ✨ Feature John Robinson John Robinson 9/1/2025 16% $1,850 $296":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-10142] Implement OAuth integration"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "9/1/2025"
      - gridcell "16%"
      - gridcell "$1,850"
      - gridcell "$296"
    - row "Press Space to toggle row selection (unchecked) [USER-10659] Correct data corruption in cache layer (Tech Debt) In Progress High 🐛 Bug James Wilson James Wilson 8/30/2025 45% $1,175 $529":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[USER-10659] Correct data corruption in cache layer (Tech Debt)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/30/2025"
      - gridcell "45%"
      - gridcell "$1,175"
      - gridcell "$529"
    - row "Press Space to toggle row selection (unchecked) [INFRA-3930] Extract business logic layer (Q2 Planning) Todo Low ♻️ Refactor Amanda White Amanda White 9/23/2025 5% $6,350 $318":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[INFRA-3930] Extract business logic layer (Q2 Planning)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/23/2025"
      - gridcell "5%"
      - gridcell "$6,350"
      - gridcell "$318"
    - row "Press Space to toggle row selection (unchecked) [ADMIN-5269] Implement virtual scrolling In Progress High ⚡ Performance Michael Anderson Michael Anderson 9/2/2025 25% $450 $113":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[ADMIN-5269] Implement virtual scrolling"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/2/2025"
      - gridcell "25%"
      - gridcell "$450"
      - gridcell "$113"
    - row "Press Space to toggle row selection (unchecked) [DASH-6393] Migrate to TypeScript strict mode (Sprint 23) Todo Medium ♻️ Refactor Kevin Zhang Kevin Zhang 9/7/2025 5% $700 $35":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-6393] Migrate to TypeScript strict mode (Sprint 23)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "9/7/2025"
      - gridcell "5%"
      - gridcell "$700"
      - gridcell "$35"
    - row "Press Space to toggle row selection (unchecked) [DASH-9265] Build custom report generator Backlog High ✨ Feature Amanda White Amanda White 9/4/2025 0% $1,775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-9265] Build custom report generator"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/4/2025"
      - gridcell "0%"
      - gridcell "$1,775"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [DASH-10464] Handle null pointer exception in API client (Q2 Planning) In Progress High 🐛 Bug Chris Martinez Chris Martinez 9/1/2025 54% $350 $189":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-10464] Handle null pointer exception in API client (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/1/2025"
      - gridcell "54%"
      - gridcell "$350"
      - gridcell "$189"
    - row "Press Space to toggle row selection (unchecked) [DASH-10958] Add brute force protection (Sprint 24) Backlog Medium 🔒 Security Alex Chen Alex Chen 9/4/2025 0% $4,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DASH-10958] Add brute force protection (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/4/2025"
      - gridcell "0%"
      - gridcell "$4,700"
      - gridcell
    - row "Press Space to toggle row selection (unchecked) [API-2343] Add request batching Todo High ⚡ Performance James Wilson James Wilson 9/5/2025 16% $425 $68":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[API-2343] Add request batching"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/5/2025"
      - gridcell "16%"
      - gridcell "$425"
      - gridcell "$68"
    - row "Press Space to toggle row selection (unchecked) [APP-2395] Add drag-and-drop file upload (Security Audit) In Review High ✨ Feature Michael Anderson Michael Anderson 8/31/2025 64% $750 $480":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[APP-2395] Add drag-and-drop file upload (Security Audit)"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/31/2025"
      - gridcell "64%"
      - gridcell "$750"
      - gridcell "$480"
    - row "Press Space to toggle row selection (unchecked) [BACKEND-5307] Implement lazy loading (Sprint 24) In Progress High ⚡ Performance Amanda White Amanda White 9/3/2025 43% $225 $97":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[BACKEND-5307] Implement lazy loading (Sprint 24)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "9/3/2025"
      - gridcell "43%"
      - gridcell "$225"
      - gridcell "$97"
    - row "Press Space to toggle row selection (unchecked) [API-8923] Test cross-browser compatibility (Sprint 25) Testing Low 🧪 Testing Olivia Brown Olivia Brown 10/3/2025 82% $15,975 $13,100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[API-8923] Test cross-browser compatibility (Sprint 25)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "10/3/2025"
      - gridcell "82%"
      - gridcell "$15,975"
      - gridcell "$13,100"
    - row "Press Space to toggle row selection (unchecked) [DATA-9093] Implement blue-green deployment (Sprint 24) In Review Critical 🔧 DevOps Jessica Lopez Jessica Lopez 8/28/2025 73% $13,875 $10,129":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[DATA-9093] Implement blue-green deployment (Sprint 24)"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/28/2025"
      - gridcell "73%"
      - gridcell "$13,875"
      - gridcell "$10,129"
    - row "Press Space to toggle row selection (unchecked) [WEB-9651] Optimize bundle size (Tech Debt) Todo Medium ⚡ Performance David Lee David Lee 9/11/2025 9% $4,175 $376":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "[WEB-9651] Optimize bundle size (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/11/2025"
      - gridcell "9%"
      - gridcell "$4,175"
      - gridcell "$376"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,750,500 $19,044,512":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,750,500"
      - gridcell "$19,044,512"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status: "Rows : 10,000"
- status: "Total Rows : 10,000"
- status
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("Date Filter via QuickFilterDropdown", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("http://localhost:5173/demo");
   7 |
   8 |     // Wait for the grid to load
   9 |     await page.waitForSelector(".ag-root", { timeout: 30000 });
   10 |
   11 |     // Wait for grid to be ready by checking for rows
   12 |     await page.waitForSelector(".ag-row", { timeout: 30000 });
   13 |   });
   14 |
   15 |   test("should filter data when selecting 'Last 7 Days' from quick filter dropdown", async ({
   16 |     page,
   17 |   }) => {
   18 |     // Capture console logs
   19 |     const consoleLogs: string[] = [];
   20 |     page.on("console", (msg) => {
   21 |       consoleLogs.push(`${msg.type()}: ${msg.text()}`);
   22 |     });
   23 |
   24 |     // Wait for the grid and stats to be visible
   25 |     await page.waitForSelector(".ag-root", { state: "visible" });
   26 |
   27 |     // Look for the NUMBER OF TASKS stat instead of traditional status bar
   28 |     const statsSection = page.locator('text="NUMBER OF TASKS"').locator("..");
>  29 |     await expect(statsSection).toBeVisible();
      |                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   30 |
   31 |     // Get initial row count from the NUMBER OF TASKS stat
   32 |     const initialCountText = await statsSection
   33 |       .locator("text=/\\d{1,3}(,\\d{3})*/")
   34 |       .textContent();
   35 |     const initialRowCount = initialCountText
   36 |       ? parseInt(initialCountText.replace(/,/g, ""))
   37 |       : 0;
   38 |     console.log("Initial row count:", initialRowCount);
   39 |     expect(initialRowCount).toBeGreaterThan(0);
   40 |
   41 |     // Find and click the due date quick filter dropdown
   42 |     // The date filter might show as "All Time" initially
   43 |     const dueDateDropdown = page
   44 |       .locator("button")
   45 |       .filter({ hasText: /All Time|Time period/ })
   46 |       .first();
   47 |
   48 |     await expect(dueDateDropdown).toBeVisible({ timeout: 10000 });
   49 |     await dueDateDropdown.click();
   50 |
   51 |     // Wait for dropdown to open
   52 |     await page.waitForSelector('[data-component="quick-filter-dropdown"]', {
   53 |       state: "visible",
   54 |     });
   55 |
   56 |     // Click on "Last 7 Days" option
   57 |     const last7DaysOption = page.locator(
   58 |       'button[role="option"]:has-text("Last 7 Days")',
   59 |     );
   60 |     await expect(last7DaysOption).toBeVisible();
   61 |     await last7DaysOption.click();
   62 |
   63 |     // Wait for filter to be applied - give it time to process
   64 |     await page.waitForTimeout(2000);
   65 |
   66 |     // Check if active filter pill appears
   67 |     const activeFilterPill = page.locator(
   68 |       '[data-testid="active-filters"] [data-component="active-filter-item"]',
   69 |     );
   70 |     await expect(activeFilterPill).toBeVisible({ timeout: 5000 });
   71 |
   72 |     // Verify the filter pill shows "Due Date"
   73 |     const filterText = await activeFilterPill.textContent();
   74 |     expect(filterText).toContain("Due Date");
   75 |
   76 |     // Get the new row count from the NUMBER OF TASKS stat
   77 |     const newCountText = await statsSection
   78 |       .locator("text=/\\d{1,3}(,\\d{3})*/")
   79 |       .textContent();
   80 |     const newRowCount = newCountText
   81 |       ? parseInt(newCountText.replace(/,/g, ""))
   82 |       : 0;
   83 |     console.log("New row count:", newRowCount);
   84 |
   85 |     // The filtered count should be less than the initial count
   86 |     if (newRowCount === initialRowCount) {
   87 |       console.log(
   88 |         "\n!!! WARNING: Row count did not change after applying filter !!!",
   89 |       );
   90 |       console.log("Initial:", initialRowCount, "New:", newRowCount);
   91 |
   92 |       // Print filter-related logs
   93 |       console.log("\n=== Filter-related console logs ===");
   94 |       consoleLogs
   95 |         .filter(
   96 |           (log) =>
   97 |             log.includes("Filter") ||
   98 |             log.includes("Workaround") ||
   99 |             log.includes("AGGrid"),
  100 |         )
  101 |         .forEach((log) => console.log(log));
  102 |     }
  103 |
  104 |     expect(newRowCount).toBeLessThan(initialRowCount);
  105 |     expect(newRowCount).toBeGreaterThan(0); // Should have some results
  106 |
  107 |     // Take a screenshot for debugging
  108 |     await page.screenshot({
  109 |       path: "test-results/date-filter-applied.png",
  110 |       fullPage: true,
  111 |     });
  112 |   });
  113 |
  114 |   test("debug: check if doesFilterPass is called", async ({ page }) => {
  115 |     const consoleLogs: string[] = [];
  116 |     let doesFilterPassCalled = false;
  117 |
  118 |     page.on("console", (msg) => {
  119 |       const text = msg.text();
  120 |       consoleLogs.push(text);
  121 |       if (text.includes("doesFilterPass")) {
  122 |         doesFilterPassCalled = true;
  123 |       }
  124 |     });
  125 |
  126 |     // Apply a filter
  127 |     const dropdown = page
  128 |       .locator("button")
  129 |       .filter({ hasText: /All Time|Time period/ })
```