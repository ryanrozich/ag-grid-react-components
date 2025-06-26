# Test info

- Name: Quick Filters >> should update stats when filters are applied
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:178:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 55
Received:   559
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/quick-filters.spec.ts:196:22
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
- text: "Quick filters:"
- button "Quick filter options":
    - text: Time period
    - img
- button "Quick filter options":
    - text: All Tasks
    - img
- paragraph: Number of Tasks
- paragraph: "559"
- img
- paragraph: Total Budget
- paragraph: $2,359,575
- img
- paragraph: Progress
- paragraph: 32.2%
- img
- paragraph: Budget Remaining
- paragraph: $1,632,431
- img
- text: "Due Date: before Today"
- button "Remove Due Date filter": ×
- text: "Status: Backlog, Todo, In Progress, In Review, Testing, Blocked"
- button "Remove Status filter": ×
- button "Clear all filters": Clear all
- text: 1 to 25 of 560. Page 1 of 23
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
        - row "174 [MOBILE-1174] Set up staging environment (Sprint 26) 🔧 DevOps Critical Marcus Williams Marcus Williams 6/24/2025 $1,275 Blocked 20%":
            - gridcell "174"
            - gridcell "[MOBILE-1174] Set up staging environment (Sprint 26)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/24/2025"
            - gridcell "$1,275"
            - gridcell "Blocked"
            - gridcell "20%"
        - row "162 [USER-1162] Set up infrastructure as code (Sprint 23) 🔧 DevOps Critical Emily Jackson Emily Jackson 6/23/2025 $1,600 Blocked 31%":
            - gridcell "162"
            - gridcell "[USER-1162] Set up infrastructure as code (Sprint 23)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Emily Jackson Emily Jackson":
                - img "Emily Jackson"
                - text: Emily Jackson
            - gridcell "6/23/2025"
            - gridcell "$1,600"
            - gridcell "Blocked"
            - gridcell "31%"
        - row "652 [USER-1652] Implement secure file upload (Sprint 27) 🔒 Security Critical Priya Sharma Priya Sharma 6/21/2025 $4,150 Blocked 32%":
            - gridcell "652"
            - gridcell "[USER-1652] Implement secure file upload (Sprint 27)"
            - gridcell "🔒 Security"
            - gridcell "Critical"
            - gridcell "Priya Sharma Priya Sharma":
                - img "Priya Sharma"
                - text: Priya Sharma
            - gridcell "6/21/2025"
            - gridcell "$4,150"
            - gridcell "Blocked"
            - gridcell "32%"
        - row "636 [PROJ-1636] Optimize memory usage (Sprint 24) ⚡ Performance Critical Priya Sharma Priya Sharma 6/20/2025 $1,125 In Progress 50%":
            - gridcell "636"
            - gridcell "[PROJ-1636] Optimize memory usage (Sprint 24)"
            - gridcell "⚡ Performance"
            - gridcell "Critical"
            - gridcell "Priya Sharma Priya Sharma":
                - img "Priya Sharma"
                - text: Priya Sharma
            - gridcell "6/20/2025"
            - gridcell "$1,125"
            - gridcell "In Progress"
            - gridcell "50%"
        - row "671 [USER-1671] Clean up deprecated APIs ♻️ Refactor High Chris Martinez Chris Martinez 6/22/2025 $200 In Review 76%":
            - gridcell "671"
            - gridcell "[USER-1671] Clean up deprecated APIs"
            - gridcell "♻️ Refactor"
            - gridcell "High"
            - gridcell "Chris Martinez Chris Martinez":
                - img "Chris Martinez"
                - text: Chris Martinez
            - gridcell "6/22/2025"
            - gridcell "$200"
            - gridcell "In Review"
            - gridcell "76%"
        - row "891 [WEB-1891] Configure security headers (Q2 Planning) 🔒 Security High Emma Davis Emma Davis 6/21/2025 $15,225 Blocked 24%":
            - gridcell "891"
            - gridcell "[WEB-1891] Configure security headers (Q2 Planning)"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Emma Davis Emma Davis":
                - img "Emma Davis"
                - text: Emma Davis
            - gridcell "6/21/2025"
            - gridcell "$15,225"
            - gridcell "Blocked"
            - gridcell "24%"
        - row "129 [MOBILE-1129] Set up staging environment (Q1 Goals) 🔧 DevOps High Marcus Williams Marcus Williams 6/23/2025 $6,375 Blocked 16%":
            - gridcell "129"
            - gridcell "[MOBILE-1129] Set up staging environment (Q1 Goals)"
            - gridcell "🔧 DevOps"
            - gridcell "High"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/23/2025"
            - gridcell "$6,375"
            - gridcell "Blocked"
            - gridcell "16%"
        - row "27 [DASH-1027] Add export to PDF functionality ✨ Feature Medium Chris Martinez Chris Martinez 6/24/2025 $350 In Progress 27%":
            - gridcell "27"
            - gridcell "[DASH-1027] Add export to PDF functionality"
            - gridcell "✨ Feature"
            - gridcell "Medium"
            - gridcell "Chris Martinez Chris Martinez":
                - img "Chris Martinez"
                - text: Chris Martinez
            - gridcell "6/24/2025"
            - gridcell "$350"
            - gridcell "In Progress"
            - gridcell "27%"
        - row "150 [INFRA-1150] Add CDN for static assets ⚡ Performance High Sophia Taylor Sophia Taylor 6/20/2025 $2,125 Blocked 27%":
            - gridcell "150"
            - gridcell "[INFRA-1150] Add CDN for static assets"
            - gridcell "⚡ Performance"
            - gridcell "High"
            - gridcell "Sophia Taylor Sophia Taylor":
                - img "Sophia Taylor"
                - text: Sophia Taylor
            - gridcell "6/20/2025"
            - gridcell "$2,125"
            - gridcell "Blocked"
            - gridcell "27%"
        - row "231 [DATA-1231] Set up SSL certificates 🔒 Security High Michael Anderson Michael Anderson 6/20/2025 $2,550 Backlog 0%":
            - gridcell "231"
            - gridcell "[DATA-1231] Set up SSL certificates"
            - gridcell "🔒 Security"
            - gridcell "High"
            - gridcell "Michael Anderson Michael Anderson":
                - img "Michael Anderson"
                - text: Michael Anderson
            - gridcell "6/20/2025"
            - gridcell "$2,550"
            - gridcell "Backlog"
            - gridcell "0%"
        - row "320 [MOBILE-1320] Implement rate limiting 🔒 Security Medium Priya Sharma Priya Sharma 6/22/2025 $950 Blocked 28%":
            - gridcell "320"
            - gridcell "[MOBILE-1320] Implement rate limiting"
            - gridcell "🔒 Security"
            - gridcell "Medium"
            - gridcell "Priya Sharma Priya Sharma":
                - img "Priya Sharma"
                - text: Priya Sharma
            - gridcell "6/22/2025"
            - gridcell "$950"
            - gridcell "Blocked"
            - gridcell "28%"
        - row "385 [API-1385] Correct data corruption in cache layer (Sprint 27) 🐛 Bug Medium Marcus Williams Marcus Williams 6/20/2025 $850 Testing 85%":
            - gridcell "385"
            - gridcell "[API-1385] Correct data corruption in cache layer (Sprint 27)"
            - gridcell "🐛 Bug"
            - gridcell "Medium"
            - gridcell "Marcus Williams Marcus Williams":
                - img "Marcus Williams"
                - text: Marcus Williams
            - gridcell "6/20/2025"
            - gridcell "$850"
            - gridcell "Testing"
            - gridcell "85%"
        - row "783 [DATA-1783] Implement auto-scaling (Performance Sprint) 🔧 DevOps Critical Sarah Johnson Sarah Johnson 6/20/2025 $150 In Progress 26%":
            - gridcell "783"
            - gridcell "[DATA-1783] Implement auto-scaling (Performance Sprint)"
            - gridcell "🔧 DevOps"
            - gridcell "Critical"
            - gridcell "Sarah Johnson Sarah Johnson":
                - img "Sarah Johnson"
                - text: Sarah Johnson
            - gridcell "6/20/2025"
            - gridcell "$150"
            - gridcell "In Progress"
            - gridcell "26%"
        - row "941 [FRONTEND-1941] Fix broken unit tests in CI pipeline (Sprint 26) 🐛 Bug Critical Chris Martinez Chris Martinez 6/18/2025 $625 Blocked 31%":
            - gridcell "941"
            - gridcell "[FRONTEND-1941] Fix broken unit tests in CI pipeline (Sprint 26)"
            - gridcell "🐛 Bug"
            - gridcell "Critical"
            - gridcell "Chris Martinez Chris Martinez":
                - img "Chris Martinez"
                - text: Chris Martinez
            - gridcell "6/18/2025"
            - gridcell "$625"
            - gridcell "Blocked"
            - gridcell "31%"
    - rowgroup
    - rowgroup
    - rowgroup
    - rowgroup:
        - row "$2,359,575 32%":
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell
            - gridcell "$2,359,575"
            - gridcell
            - gridcell "32%"
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
- text: Page 1 of 23
- button "Next Page": 
- button "Last Page": 
```

# Test source

```ts
   96 |
   97 |     // Wait for dropdown menu to be visible
   98 |     await page.waitForSelector('[role="listbox"]', { state: "visible" });
   99 |
  100 |     // Select "Critical Bugs"
  101 |     await page.locator('[role="option"]').filter({ hasText: "Critical Bugs" }).click();
  102 |
  103 |     // Verify the dropdown shows the new selection
  104 |     await expect(secondDropdown.locator("button").first()).toContainText("Critical Bugs");
  105 |
  106 |     // Verify that only Bug category with Critical/High priority are shown
  107 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  108 |     const priorityCells = await page.locator('.ag-cell[col-id="priority"]').allTextContents();
  109 |
  110 |     // Check categories are all "Bug"
  111 |     for (const category of categoryCells) {
  112 |       expect(category).toBe("Bug");
  113 |     }
  114 |
  115 |     // Check priorities are either "Critical" or "High"
  116 |     for (const priority of priorityCells) {
  117 |       expect(["Critical", "High"]).toContain(priority);
  118 |     }
  119 |   });
  120 |
  121 |   test("should clear all filters", async ({ page }) => {
  122 |     // Wait for default filter first
  123 |     await page.waitForTimeout(1500);
  124 |
  125 |     // Apply another filter
  126 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  127 |     await firstDropdown.locator("button").first().click();
  128 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  129 |
  130 |     // Wait for filter to apply
  131 |     await page.waitForTimeout(1000);
  132 |
  133 |     // Verify filter is applied
  134 |     await expect(firstDropdown.locator("button").first()).toContainText("Overdue");
  135 |
  136 |     // Clear the filter by selecting "All Time"
  137 |     await firstDropdown.locator("button").first().click();
  138 |     await page.locator('[role="option"]').filter({ hasText: "All Time" }).click();
  139 |
  140 |     // Wait for filter to clear
  141 |     await page.waitForTimeout(1000);
  142 |
  143 |     // Verify the dropdown shows "All Time"
  144 |     await expect(firstDropdown.locator("button").first()).toContainText("All Time");
  145 |
  146 |     // Active filters should not be visible
  147 |     const activeFilters = page.locator('[data-testid="active-filters"]');
  148 |     await expect(activeFilters).not.toBeVisible();
  149 |   });
  150 |
  151 |   test("should combine time and task type filters", async ({ page }) => {
  152 |     // Apply time filter
  153 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  154 |     await firstDropdown.locator("button").first().click();
  155 |     await page.locator('[role="option"]').filter({ hasText: "This Month" }).click();
  156 |
  157 |     // Apply task type filter
  158 |     const secondDropdown = page.locator('[data-testid="quick-filter-dropdown"]').nth(1);
  159 |     await secondDropdown.locator("button").first().click();
  160 |     await page.locator('[role="option"]').filter({ hasText: "Features" }).click();
  161 |
  162 |     // Verify both filters are applied
  163 |     await expect(firstDropdown.locator("button").first()).toContainText("This Month");
  164 |     await expect(secondDropdown.locator("button").first()).toContainText("Features");
  165 |
  166 |     // Verify that only Feature category tasks are shown
  167 |     const categoryCells = await page.locator('.ag-cell[col-id="category"]').allTextContents();
  168 |     for (const category of categoryCells) {
  169 |       expect(category).toBe("Feature");
  170 |     }
  171 |
  172 |     // There should be fewer rows due to combined filters
  173 |     const rowCount = await page.locator(".ag-row").count();
  174 |     expect(rowCount).toBeGreaterThan(0);
  175 |     expect(rowCount).toBeLessThan(10); // Combined filters should show very few rows
  176 |   });
  177 |
  178 |   test("should update stats when filters are applied", async ({ page }) => {
  179 |     // Get initial task count
  180 |     const initialTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  181 |     const initialCount = parseInt(initialTaskCount?.replace(/,/g, "") || "0");
  182 |
  183 |     // Apply a filter
  184 |     const firstDropdown = page.locator('[data-testid="quick-filter-dropdown"]').first();
  185 |     await firstDropdown.locator("button").first().click();
  186 |     await page.locator('[role="option"]').filter({ hasText: "Overdue" }).click();
  187 |
  188 |     // Wait for grid to update
  189 |     await page.waitForTimeout(500);
  190 |
  191 |     // Get new task count
  192 |     const newTaskCount = await page.locator('p:has-text("Number of Tasks") + p').textContent();
  193 |     const newCount = parseInt(newTaskCount?.replace(/,/g, "") || "0");
  194 |
  195 |     // Task count should decrease when filter is applied
> 196 |     expect(newCount).toBeLessThan(initialCount);
      |                      ^ Error: expect(received).toBeLessThan(expected)
  197 |     expect(newCount).toBeGreaterThan(0);
  198 |   });
  199 | });
```
