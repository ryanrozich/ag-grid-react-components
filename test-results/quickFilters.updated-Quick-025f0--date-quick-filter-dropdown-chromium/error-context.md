# Test info

- Name: QuickFilterDropdown - Updated Tests >> should open date quick filter dropdown
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.updated.spec.ts:39:3

# Error details

```
TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('[role="listbox"]') to be visible
    15 × locator resolved to 2 elements. Proceeding with the first one: <div role="listbox" aria-label="Values" class="ag-column-drop-list ag-column-drop-vertical-list">…</div>

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quickFilters.updated.spec.ts:57:16
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
- button "Quick filter options" [expanded]:
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
- paragraph: $4,122,325
- img
- paragraph: Progress
- paragraph: 47.5%
- img
- paragraph: Budget Remaining
- paragraph: $2,221,434
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
    - row "714 [WEB-1714] Create onboarding tutorial 📝 Documentation Medium Ryan Thomas Ryan Thomas 9/2/2025 $1,500 In Review 75%":
      - gridcell "714"
      - gridcell "[WEB-1714] Create onboarding tutorial"
      - gridcell "📝 Documentation"
      - gridcell "Medium"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/2/2025"
      - gridcell "$1,500"
      - gridcell "In Review"
      - gridcell "75%"
    - row "95 [UI-1095] Implement blue-green deployment 🔧 DevOps Medium Emily Jackson Emily Jackson 8/24/2025 $9,550 In Progress 29%":
      - gridcell "95"
      - gridcell "[UI-1095] Implement blue-green deployment"
      - gridcell "🔧 DevOps"
      - gridcell "Medium"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "8/24/2025"
      - gridcell "$9,550"
      - gridcell "In Progress"
      - gridcell "29%"
    - row "166 [INFRA-1166] Document error handling patterns (Q2 Planning) 📝 Documentation Low Sophia Taylor Sophia Taylor 9/13/2025 $8,525 Testing 83%":
      - gridcell "166"
      - gridcell "[INFRA-1166] Document error handling patterns (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/13/2025"
      - gridcell "$8,525"
      - gridcell "Testing"
      - gridcell "83%"
    - row "491 [API-1491] Set up SSL certificates (Sprint 25) 🔒 Security High James Wilson James Wilson 8/12/2025 $525 Testing 91%":
      - gridcell "491"
      - gridcell "[API-1491] Set up SSL certificates (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/12/2025"
      - gridcell "$525"
      - gridcell "Testing"
      - gridcell "91%"
    - row "696 [CORE-1696] Fix date picker timezone issue (Tech Debt) 🐛 Bug Medium Sarah Johnson Sarah Johnson 8/19/2025 $17,500 Todo 6%":
      - gridcell "696"
      - gridcell "[CORE-1696] Fix date picker timezone issue (Tech Debt)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/19/2025"
      - gridcell "$17,500"
      - gridcell "Todo"
      - gridcell "6%"
    - row "529 [UI-1529] Resolve race condition in state update (Q1 Goals) 🐛 Bug Medium Maya Patel Maya Patel 8/18/2025 $3,675 In Progress 43%":
      - gridcell "529"
      - gridcell "[UI-1529] Resolve race condition in state update (Q1 Goals)"
      - gridcell "🐛 Bug"
      - gridcell "Medium"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/18/2025"
      - gridcell "$3,675"
      - gridcell "In Progress"
      - gridcell "43%"
    - row "122 [INFRA-1122] Extract shared utilities module (Q2 Planning) ♻️ Refactor Critical Marcus Williams Marcus Williams 8/10/2025 $350 In Review 75%":
      - gridcell "122"
      - gridcell "[INFRA-1122] Extract shared utilities module (Q2 Planning)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/10/2025"
      - gridcell "$350"
      - gridcell "In Review"
      - gridcell "75%"
    - row "183 [ADMIN-1183] Create onboarding tutorial (Q2 Planning) 📝 Documentation Low Emily Jackson Emily Jackson 9/15/2025 $4,050 Todo 11%":
      - gridcell "183"
      - gridcell "[ADMIN-1183] Create onboarding tutorial (Q2 Planning)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "9/15/2025"
      - gridcell "$4,050"
      - gridcell "Todo"
      - gridcell "11%"
    - row "624 [MOBILE-1624] Set up SSL certificates 🔒 Security Critical John Robinson John Robinson 8/7/2025 $2,900 In Progress 55%":
      - gridcell "624"
      - gridcell "[MOBILE-1624] Set up SSL certificates"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/7/2025"
      - gridcell "$2,900"
      - gridcell "In Progress"
      - gridcell "55%"
    - row "680 [API-1680] Migrate to TypeScript strict mode (Sprint 24) ♻️ Refactor Critical John Robinson John Robinson 8/8/2025 $12,725 Backlog 0%":
      - gridcell "680"
      - gridcell "[API-1680] Migrate to TypeScript strict mode (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/8/2025"
      - gridcell "$12,725"
      - gridcell "Backlog"
      - gridcell "0%"
    - row "366 [ADMIN-1366] Implement dark mode toggle ✨ Feature Medium John Robinson John Robinson 8/19/2025 $6,300 In Progress 37%":
      - gridcell "366"
      - gridcell "[ADMIN-1366] Implement dark mode toggle"
      - gridcell "✨ Feature"
      - gridcell "Medium"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "8/19/2025"
      - gridcell "$6,300"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "760 [UI-1760] Clean up deprecated APIs (Sprint 24) ♻️ Refactor Critical Michael Anderson Michael Anderson 8/8/2025 $13,400 Testing 82%":
      - gridcell "760"
      - gridcell "[UI-1760] Clean up deprecated APIs (Sprint 24)"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "8/8/2025"
      - gridcell "$13,400"
      - gridcell "Testing"
      - gridcell "82%"
    - row "551 [PROJ-1551] Debug WebSocket connection timeout 🐛 Bug High Isabella Garcia Isabella Garcia 8/7/2025 $700 Todo 6%":
      - gridcell "551"
      - gridcell "[PROJ-1551] Debug WebSocket connection timeout"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/7/2025"
      - gridcell "$700"
      - gridcell "Todo"
      - gridcell "6%"
    - row "155 [WEB-1155] Create troubleshooting guide (Sprint 23) 📝 Documentation Low Emma Davis Emma Davis 8/23/2025 $325 Testing 91%":
      - gridcell "155"
      - gridcell "[WEB-1155] Create troubleshooting guide (Sprint 23)"
      - gridcell "📝 Documentation"
      - gridcell "Low"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/23/2025"
      - gridcell "$325"
      - gridcell "Testing"
      - gridcell "91%"
    - row "274 [DASH-1274] Build custom report generator ✨ Feature Low Alex Chen Alex Chen 9/7/2025 $300 Todo 9%":
      - gridcell "274"
      - gridcell "[DASH-1274] Build custom report generator"
      - gridcell "✨ Feature"
      - gridcell "Low"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/7/2025"
      - gridcell "$300"
      - gridcell "Todo"
      - gridcell "9%"
    - row "802 [API-1802] Create security penetration tests (Sprint 25) 🧪 Testing Medium Amanda White Amanda White 8/19/2025 $500 Testing 80%":
      - gridcell "802"
      - gridcell "[API-1802] Create security penetration tests (Sprint 25)"
      - gridcell "🧪 Testing"
      - gridcell "Medium"
      - gridcell "Amanda White Amanda White":
        - img "Amanda White"
        - text: Amanda White
      - gridcell "8/19/2025"
      - gridcell "$500"
      - gridcell "Testing"
      - gridcell "80%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,122,325 48%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,122,325"
      - gridcell
      - gridcell "48%"
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
- listbox "Quick filter options":
  - option "All Time" [selected]:
    - text: All Time
    - img
  - option "Last 7 Days"
  - option "This Month"
  - option "Overdue"
  - option "Not Started"
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("QuickFilterDropdown - Updated Tests", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Navigate to the demo page
   6 |     await page.goto("/demo");
   7 |
   8 |     // Wait for the grid to be ready
   9 |     await page.waitForSelector(".ag-root-wrapper");
   10 |     await page.waitForTimeout(1000); // Give time for data to load
   11 |   });
   12 |
   13 |   test("should have quick filter dropdowns visible", async ({ page }) => {
   14 |     // Look for quick filter dropdowns by their aria labels or button text
   15 |     const quickFilterButtons = await page
   16 |       .locator('button[aria-label*="Quick filter"]')
   17 |       .count();
   18 |
   19 |     // We should have at least one quick filter dropdown
   20 |     expect(quickFilterButtons).toBeGreaterThan(0);
   21 |
   22 |     // Alternative: look for the specific dropdown containers
   23 |     const dropdownContainers = await page
   24 |       .locator('[data-testid="quick-filter-dropdown"]')
   25 |       .count();
   26 |
   27 |     if (dropdownContainers > 0) {
   28 |       expect(dropdownContainers).toBeGreaterThan(0);
   29 |     } else {
   30 |       // If no data-testid, look for buttons with dropdown indicators
   31 |       const dropdownButtons = await page
   32 |         .locator("button:has(svg)")
   33 |         .filter({ hasText: /All Time|All Tasks|Today|This Week/ })
   34 |         .count();
   35 |       expect(dropdownButtons).toBeGreaterThan(0);
   36 |     }
   37 |   });
   38 |
   39 |   test("should open date quick filter dropdown", async ({ page }) => {
   40 |     // Find the first quick filter that looks like a date filter
   41 |     const dateFilterButton = page
   42 |       .locator("button")
   43 |       .filter({ hasText: /All Time|Today|This Week|Last/ })
   44 |       .first();
   45 |
   46 |     // Check if it exists
   47 |     const exists = (await dateFilterButton.count()) > 0;
   48 |     if (!exists) {
   49 |       test.skip();
   50 |       return;
   51 |     }
   52 |
   53 |     // Click to open dropdown
   54 |     await dateFilterButton.click();
   55 |
   56 |     // Wait for dropdown to appear
>  57 |     await page.waitForSelector('[role="listbox"]', { timeout: 5000 });
      |                ^ TimeoutError: page.waitForSelector: Timeout 5000ms exceeded.
   58 |
   59 |     // Check that options are visible
   60 |     const options = await page.locator('[role="option"]').count();
   61 |     expect(options).toBeGreaterThan(0);
   62 |
   63 |     // Close dropdown by clicking outside
   64 |     await page.click("body", { position: { x: 0, y: 0 } });
   65 |   });
   66 |
   67 |   test("should filter grid when selecting date option", async ({ page }) => {
   68 |     // Get initial row count
   69 |     const initialRows = await page
   70 |       .locator(".ag-center-cols-container .ag-row")
   71 |       .count();
   72 |
   73 |     // Find date filter button
   74 |     const dateFilterButton = page
   75 |       .locator("button")
   76 |       .filter({ hasText: /All Time/ })
   77 |       .first();
   78 |     const exists = (await dateFilterButton.count()) > 0;
   79 |     if (!exists) {
   80 |       test.skip();
   81 |       return;
   82 |     }
   83 |
   84 |     // Open dropdown
   85 |     await dateFilterButton.click();
   86 |     await page.waitForSelector('[role="listbox"]');
   87 |
   88 |     // Select "Today" option if it exists
   89 |     const todayOption = page
   90 |       .locator('[role="option"]')
   91 |       .filter({ hasText: "Today" })
   92 |       .first();
   93 |     if ((await todayOption.count()) > 0) {
   94 |       await todayOption.click();
   95 |
   96 |       // Wait for grid to update
   97 |       await page.waitForTimeout(1000);
   98 |
   99 |       // Check that row count changed
  100 |       const filteredRows = await page
  101 |         .locator(".ag-center-cols-container .ag-row")
  102 |         .count();
  103 |       expect(filteredRows).toBeLessThanOrEqual(initialRows);
  104 |
  105 |       // Verify the button now shows "Today"
  106 |       await expect(dateFilterButton).toContainText("Today");
  107 |     }
  108 |   });
  109 |
  110 |   test("should show active filters component", async ({ page }) => {
  111 |     // Apply a filter first
  112 |     const dateFilterButton = page
  113 |       .locator("button")
  114 |       .filter({ hasText: /All Time/ })
  115 |       .first();
  116 |     if ((await dateFilterButton.count()) > 0) {
  117 |       await dateFilterButton.click();
  118 |       await page.waitForSelector('[role="listbox"]');
  119 |
  120 |       const todayOption = page
  121 |         .locator('[role="option"]')
  122 |         .filter({ hasText: "Today" })
  123 |         .first();
  124 |       if ((await todayOption.count()) > 0) {
  125 |         await todayOption.click();
  126 |         await page.waitForTimeout(500);
  127 |
  128 |         // Check for active filters display
  129 |         const activeFilters = await page
  130 |           .locator("text=/Due Date.*Today/")
  131 |           .count();
  132 |         if (activeFilters > 0) {
  133 |           expect(activeFilters).toBeGreaterThan(0);
  134 |         } else {
  135 |           // Alternative: look for filter pills
  136 |           const filterPills = await page
  137 |             .locator('button:has-text("×")')
  138 |             .count();
  139 |           expect(filterPills).toBeGreaterThan(0);
  140 |         }
  141 |       }
  142 |     }
  143 |   });
  144 | });
  145 |
```