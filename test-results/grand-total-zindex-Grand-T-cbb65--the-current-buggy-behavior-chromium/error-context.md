# Test info

- Name: Grand Total Row Z-Index Issue >> documents the current buggy behavior
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/grand-total-zindex.spec.ts:75:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-grand-total-row').first()
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-grand-total-row').first()

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/grand-total-zindex.spec.ts:89:33
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
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: Task type
  - img
- img
- paragraph: Number of Tasks
- paragraph: 1,000
- img
- paragraph: Total Budget
- paragraph: $4,114,125
- img
- paragraph: Progress
- paragraph: 47.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,133,401
- text: 1 to 25 of 1,001. Page 1 of 41
- grid:
  - rowgroup:
    - row "ID Task Name Category Priority Assignee Due Date Budget Status Progress":
      - columnheader "ID"
      - columnheader "Task Name"
      - columnheader "Category"
      - columnheader "Priority"
      - columnheader "Assignee"
      - columnheader "Due Date"
      - columnheader "Budget"
      - columnheader "Status"
      - columnheader "Progress"
  - rowgroup:
    - row "155 [AUTH-1155] Implement lazy loading ⚡ Performance Low Chris Martinez Chris Martinez 8/26/2025 $1,975 Backlog 0%":
      - gridcell "155"
      - gridcell "[AUTH-1155] Implement lazy loading"
      - gridcell "⚡ Performance"
      - gridcell "Low"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/26/2025"
      - gridcell "$1,975"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "289 [ADMIN-1289] Update README with examples 📝 Documentation Medium James Wilson James Wilson 8/12/2025 $16,900 In Progress 53%":
      - gridcell "289"
      - gridcell "[ADMIN-1289] Update README with examples"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/12/2025"
      - gridcell "$16,900"
      - gridcell "In Progress"
      - gridcell "53%"
    - row "498 [INFRA-1498] Extract shared utilities module (Sprint 23) ♻️ Refactor Low David Lee David Lee 8/19/2025 $700 Backlog 0%":
      - gridcell "498"
      - gridcell "[INFRA-1498] Extract shared utilities module (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/19/2025"
      - gridcell "$700"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "796 [USER-1796] Fix broken unit tests in CI pipeline 🐛 Bug Medium Kevin Zhang Kevin Zhang 8/15/2025 $1,000 Backlog 0%":
      - gridcell "796"
      - gridcell "[USER-1796] Fix broken unit tests in CI pipeline"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Kevin Zhang Kevin Zhang":
        - img "Kevin Zhang"
        - text: Kevin Zhang
      - gridcell "8/15/2025"
      - gridcell "$1,000"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "890 [UI-1890] Configure firewall rules (Sprint 27) 🔒 Security High Emma Davis Emma Davis 8/9/2025 $475 Todo 6%":
      - gridcell "890"
      - gridcell "[UI-1890] Configure firewall rules (Sprint 27)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/9/2025"
      - gridcell "$475"
      - gridcell "Todo"
      - gridcell "6%"
    - row "998 [ADMIN-1998] Configure Docker containers (Security Audit) 🔧 DevOps High Ryan Thomas Ryan Thomas 8/8/2025 $1,600 In Review 79%":
      - gridcell "998"
      - gridcell "[ADMIN-1998] Configure Docker containers (Security Audit)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/8/2025"
      - gridcell "$1,600"
      - gridcell "In Review"
      - gridcell "79%"
    - row "136 [INFRA-1136] Set up SSL certificates (Sprint 23) 🔒 Security Critical David Lee David Lee 8/5/2025 $12,225 In Progress 45%":
      - gridcell "136"
      - gridcell "[INFRA-1136] Set up SSL certificates (Sprint 23)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/5/2025"
      - gridcell "$12,225"
      - gridcell "In Progress"
      - gridcell "45%"
    - row "834 [DASH-1834] Migrate to TypeScript strict mode (Sprint 23) ♻️ Refactor Medium Chris Martinez Chris Martinez 8/12/2025 $650 In Review 68%":
      - gridcell "834"
      - gridcell "[DASH-1834] Migrate to TypeScript strict mode (Sprint 23)"
      - gridcell "♻️ Refactor"
      - gridcell "Medium"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/12/2025"
      - gridcell "$650"
      - gridcell "In Review"
      - gridcell "68%"
    - row "906 [DASH-1906] Configure security headers 🔒 Security High Alex Chen Alex Chen 8/5/2025 $1,225 In Progress 30%":
      - gridcell "906"
      - gridcell "[DASH-1906] Configure security headers"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/5/2025"
      - gridcell "$1,225"
      - gridcell "In Progress"
      - gridcell "30%"
    - row "89 [API-1089] Consolidate duplicate code (Sprint 24) ♻️ Refactor Low David Lee David Lee 8/22/2025 $6,225 Backlog 0%":
      - gridcell "89"
      - gridcell "[API-1089] Consolidate duplicate code (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Low"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/22/2025"
      - gridcell "$6,225"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "457 [ADMIN-1457] Implement auto-scaling (Tech Debt) 🔧 DevOps Low Priya Sharma Priya Sharma 9/12/2025 $200 Testing 82%":
      - gridcell "457"
      - gridcell "[ADMIN-1457] Implement auto-scaling (Tech Debt)"
      - gridcell "🔧 DevOps"
      - gridcell "Low"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/12/2025"
      - gridcell "$200"
      - gridcell "Testing"
      - gridcell "82%"
    - row "497 [BACKEND-1497] Create onboarding tutorial (Q1 Goals) 📝 Documentation Medium Priya Sharma Priya Sharma 8/9/2025 $350 In Review 69%":
      - gridcell "497"
      - gridcell "[BACKEND-1497] Create onboarding tutorial (Q1 Goals)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/9/2025"
      - gridcell "$350"
      - gridcell "In Review"
      - gridcell "69%"
    - row "76 [API-1076] Handle null pointer exception in API client 🐛 Bug High Emily Jackson Emily Jackson 8/5/2025 $4,700 Backlog 0%":
      - gridcell "76"
      - gridcell "[API-1076] Handle null pointer exception in API client"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/5/2025"
      - gridcell "$4,700"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "776 [MOBILE-1776] Write performance optimization tips (Sprint 24) 📝 Documentation Medium Jessica Lopez Jessica Lopez 8/15/2025 $1,900 Backlog 0%":
      - gridcell "776"
      - gridcell "[MOBILE-1776] Write performance optimization tips (Sprint 24)"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "8/15/2025"
      - gridcell "$1,900"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "544 [INFRA-1544] Implement social media sharing ✨ Feature Medium Priya Sharma Priya Sharma 8/13/2025 $1,000 Backlog 0%":
      - gridcell "544"
      - gridcell "[INFRA-1544] Implement social media sharing"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/13/2025"
      - gridcell "$1,000"
      - gridcell "Backlog"
      - gridcell "0%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,114,125 47%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,114,125"
      - gridcell
      - gridcell "47%"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status
- status
- status
- text: "Page Size:"
- combobox "Page Size": "25"
- button "First Page" [disabled]: 
- button "Previous Page" [disabled]: 
- text: Page 1 of 41
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | /**
   4 |  * This test documents the z-index bug where the grand total row value
   5 |  * overlaps with the date filter dropdown (GitHub Issue #6).
   6 |  *
   7 |  * This test is expected to FAIL until the bug is fixed.
   8 |  * Once fixed, this test will prevent regression.
   9 |  */
  10 | test.describe("Grand Total Row Z-Index Issue", () => {
  11 |   test.beforeEach(async ({ page }) => {
  12 |     await page.goto("/demo");
  13 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
  14 |     await page.waitForTimeout(2000); // Give time for grid to fully render with data
  15 |   });
  16 |
  17 |   test.skip("grand total row should not overlap with date filter dropdown", async ({
  18 |     page,
  19 |   }) => {
  20 |     // Note: This test is currently skipped because it documents a known bug
  21 |     // Remove the .skip once the bug is fixed
  22 |
  23 |     // Scroll to bottom to see grand total row
  24 |     await page.evaluate(() => {
  25 |       const grid = document.querySelector(".ag-body-viewport");
  26 |       if (grid) {
  27 |         grid.scrollTop = grid.scrollHeight;
  28 |       }
  29 |     });
  30 |     await page.waitForTimeout(500);
  31 |
  32 |     // Find the date column header
  33 |     const dateHeader = page
  34 |       .locator('[col-id="dueDate"] .ag-header-cell-comp-wrapper')
  35 |       .first();
  36 |
  37 |     // Open the filter menu
  38 |     await dateHeader.hover();
  39 |     await dateHeader.locator(".ag-header-cell-menu-button").click();
  40 |     await page.waitForTimeout(500);
  41 |
  42 |     // Get the filter panel
  43 |     const filterPanel = page.locator(".ag-filter").first();
  44 |     await expect(filterPanel).toBeVisible();
  45 |
  46 |     // Get bounding boxes to check for overlap
  47 |     const filterBox = await filterPanel.boundingBox();
  48 |
  49 |     // Find the grand total cell in the budget column
  50 |     const grandTotalCell = page
  51 |       .locator('.ag-grand-total-row [col-id="budget"]')
  52 |       .first();
  53 |     const grandTotalBox = await grandTotalCell.boundingBox();
  54 |
  55 |     // Verify that the filter is rendered above (higher z-index) than grand total
  56 |     // This can be checked by ensuring the filter is interactive when overlapping
  57 |     if (filterBox && grandTotalBox) {
  58 |       // Check if they overlap vertically
  59 |       const overlapsVertically =
  60 |         filterBox.y < grandTotalBox.y + grandTotalBox.height &&
  61 |         filterBox.y + filterBox.height > grandTotalBox.y;
  62 |
  63 |       if (overlapsVertically) {
  64 |         // If they overlap, the filter should be clickable (on top)
  65 |         const filterInput = filterPanel.locator("input").first();
  66 |         await expect(filterInput).toBeVisible();
  67 |
  68 |         // Try to interact with the filter - this should work if z-index is correct
  69 |         await filterInput.click();
  70 |         await expect(filterInput).toBeFocused();
  71 |       }
  72 |     }
  73 |   });
  74 |
  75 |   test("documents the current buggy behavior", async ({ page }) => {
  76 |     // This test documents the actual buggy behavior for reference
  77 |
  78 |     // Scroll to bottom
  79 |     await page.evaluate(() => {
  80 |       const grid = document.querySelector(".ag-body-viewport");
  81 |       if (grid) {
  82 |         grid.scrollTop = grid.scrollHeight;
  83 |       }
  84 |     });
  85 |     await page.waitForTimeout(500);
  86 |
  87 |     // Verify grand total row is visible
  88 |     const grandTotalRow = page.locator(".ag-grand-total-row").first();
> 89 |     await expect(grandTotalRow).toBeVisible();
     |                                 ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  90 |
  91 |     // Verify the budget grand total value is visible
  92 |     const budgetTotal = grandTotalRow.locator('[col-id="budget"]').first();
  93 |     await expect(budgetTotal).toBeVisible();
  94 |     await expect(budgetTotal).toContainText("$"); // Should show a dollar amount
  95 |   });
  96 | });
  97 |
```