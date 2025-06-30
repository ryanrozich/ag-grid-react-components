# Test info

- Name: Navigation between pages >> should maintain grid state when staying on demo page
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:57:3

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('.ag-theme-quartz-dark .ag-filter') resolved to 11 elements:
    1) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('.ag-filter-toolpanel-instance-body').first()
    2) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(2) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    3) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(3) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    4) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(4) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    5) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(5) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    6) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(6) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    7) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(7) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    8) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(8) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    9) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(9) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    10) <div data-ref="agFilterToolPanelBody" class="ag-filter-toolpanel-instance-body ag-filter"></div> aka locator('div:nth-child(10) > .ag-group > .ag-group-container > .ag-filter-toolpanel-instance > .ag-filter-toolpanel-instance-body')
    ...

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-theme-quartz-dark .ag-filter')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/navigation.spec.ts:67:32
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
- paragraph: $4,017,275
- img
- paragraph: Progress
- paragraph: 44.1%
- img
- paragraph: Budget Remaining
- paragraph: $2,298,658
- text: Press ENTER to sort. Press ALT DOWN to open column menu. Press CTRL ENTER to open filter
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
    - row "229 [DATA-1229] Implement secure file upload (Tech Debt) 🔒 Security High Olivia Brown Olivia Brown 4/14/2025 $1,825 Blocked 29%":
      - gridcell "229"
      - gridcell "[DATA-1229] Implement secure file upload (Tech Debt)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "4/14/2025"
      - gridcell "$1,825"
      - gridcell "Blocked"
      - gridcell "29%"
    - row "443 [ADMIN-1443] Write testing best practices 📝 Documentation Critical Emily Jackson Emily Jackson 4/15/2025 $125 In Progress 40%":
      - gridcell "443"
      - gridcell "[ADMIN-1443] Write testing best practices"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "4/15/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "40%"
    - row "953 [INFRA-1953] Configure CDN distribution (Sprint 24) 🔧 DevOps Critical Isabella Garcia Isabella Garcia 4/17/2025 $4,150 In Review 62%":
      - gridcell "953"
      - gridcell "[INFRA-1953] Configure CDN distribution (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "Critical"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "4/17/2025"
      - gridcell "$4,150"
      - gridcell "In Review"
      - gridcell "62%"
    - row "795 [MOBILE-1795] Create onboarding tutorial 📝 Documentation Critical Sophia Taylor Sophia Taylor 4/18/2025 $3,300 Blocked 28%":
      - gridcell "795"
      - gridcell "[MOBILE-1795] Create onboarding tutorial"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "4/18/2025"
      - gridcell "$3,300"
      - gridcell "Blocked"
      - gridcell "28%"
    - row "465 [CORE-1465] Update to React 18 patterns ♻️ Refactor Critical Daniel Kim Daniel Kim 4/19/2025 $900 Blocked 38%":
      - gridcell "465"
      - gridcell "[CORE-1465] Update to React 18 patterns"
      - gridcell "♻️ Refactor"
      - gridcell "Critical"
      - gridcell "Daniel Kim Daniel Kim":
        - img "Daniel Kim"
        - text: Daniel Kim
      - gridcell "4/19/2025"
      - gridcell "$900"
      - gridcell "Blocked"
      - gridcell "38%"
    - row "989 [WEB-1989] Add audit logging (Performance Sprint) 🔒 Security Critical Olivia Brown Olivia Brown 4/19/2025 $825 In Progress 20%":
      - gridcell "989"
      - gridcell "[WEB-1989] Add audit logging (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "4/19/2025"
      - gridcell "$825"
      - gridcell "In Progress"
      - gridcell "20%"
    - row "658 [API-1658] Fix login form validation error 🐛 Bug High David Lee David Lee 4/19/2025 $9,625 Blocked 18%":
      - gridcell "658"
      - gridcell "[API-1658] Fix login form validation error"
      - gridcell "🐛 Bug"
      - gridcell "High"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "4/19/2025"
      - gridcell "$9,625"
      - gridcell "Blocked"
      - gridcell "18%"
    - row "585 [APP-1585] Implement lazy loading ⚡ Performance Critical Emily Jackson Emily Jackson 4/19/2025 $9,625 Blocked 30%":
      - gridcell "585"
      - gridcell "[APP-1585] Implement lazy loading"
      - gridcell "⚡ Performance"
      - gridcell "Critical"
      - gridcell "Emily Jackson Emily Jackson":
        - img "Emily Jackson"
        - text: Emily Jackson
      - gridcell "4/19/2025"
      - gridcell "$9,625"
      - gridcell "Blocked"
      - gridcell "30%"
    - row "198 [WEB-1198] Configure security headers 🔒 Security High John Robinson John Robinson 4/19/2025 $250 In Progress 50%":
      - gridcell "198"
      - gridcell "[WEB-1198] Configure security headers"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "John Robinson John Robinson":
        - img "John Robinson"
        - text: John Robinson
      - gridcell "4/19/2025"
      - gridcell "$250"
      - gridcell "In Progress"
      - gridcell "50%"
    - row "761 [INFRA-1761] Add input sanitization (Sprint 24) 🔒 Security High Jessica Lopez Jessica Lopez 4/19/2025 $125 In Progress 47%":
      - gridcell "761"
      - gridcell "[INFRA-1761] Add input sanitization (Sprint 24)"
      - gridcell "🔒 Security"
      - gridcell "High"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "4/19/2025"
      - gridcell "$125"
      - gridcell "In Progress"
      - gridcell "47%"
    - row "155 [ADMIN-1155] Add drag-and-drop file upload (Sprint 23) ✨ Feature High Sophia Taylor Sophia Taylor 4/19/2025 $400 Blocked 16%":
      - gridcell "155"
      - gridcell "[ADMIN-1155] Add drag-and-drop file upload (Sprint 23)"
      - gridcell "✨ Feature"
      - gridcell "High"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "4/19/2025"
      - gridcell "$400"
      - gridcell "Blocked"
      - gridcell "16%"
    - row "648 [PROJ-1648] Add audit logging (Sprint 25) 🔒 Security Critical James Wilson James Wilson 4/20/2025 $7,800 Done 100%":
      - gridcell "648"
      - gridcell "[PROJ-1648] Add audit logging (Sprint 25)"
      - gridcell "🔒 Security"
      - gridcell "Critical"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "4/20/2025"
      - gridcell "$7,800"
      - gridcell "Done"
      - gridcell "100%"
    - row "501 [UI-1501] Create onboarding tutorial (Sprint 25) 📝 Documentation Critical Chris Martinez Chris Martinez 4/20/2025 $7,150 In Progress 45%":
      - gridcell "501"
      - gridcell "[UI-1501] Create onboarding tutorial (Sprint 25)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "4/20/2025"
      - gridcell "$7,150"
      - gridcell "In Progress"
      - gridcell "45%"
    - row "681 [INFRA-1681] Write performance optimization tips (Sprint 27) 📝 Documentation Critical Jessica Lopez Jessica Lopez 4/20/2025 $950 In Progress 37%":
      - gridcell "681"
      - gridcell "[INFRA-1681] Write performance optimization tips (Sprint 27)"
      - gridcell "📝 Documentation"
      - gridcell "Critical"
      - gridcell "Jessica Lopez Jessica Lopez":
        - img "Jessica Lopez"
        - text: Jessica Lopez
      - gridcell "4/20/2025"
      - gridcell "$950"
      - gridcell "In Progress"
      - gridcell "37%"
    - row "772 [APP-1772] Implement rate limiting (Performance Sprint) 🔒 Security Medium Priya Sharma Priya Sharma 4/21/2025 $7,900 Done 100%":
      - gridcell "772"
      - gridcell "[APP-1772] Implement rate limiting (Performance Sprint)"
      - gridcell "🔒 Security"
      - gridcell "Medium"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "4/21/2025"
      - gridcell "$7,900"
      - gridcell "Done"
      - gridcell "100%"
    - row "540 [CORE-1540] Configure Docker containers (Sprint 24) 🔧 DevOps High Alex Chen Alex Chen 4/21/2025 $625 In Progress 57%":
      - gridcell "540"
      - gridcell "[CORE-1540] Configure Docker containers (Sprint 24)"
      - gridcell "🔧 DevOps"
      - gridcell "High"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "4/21/2025"
      - gridcell "$625"
      - gridcell "In Progress"
      - gridcell "57%"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "$4,017,275 44%":
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$4,017,275"
      - gridcell
      - gridcell "44%"
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
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Navigation between pages', () => {
   4 |   test('should navigate between Home, Demo, and Docs without errors', async ({ page }) => {
   5 |     // Start on the home page
   6 |     await page.goto('/');
   7 |     
   8 |     // Verify we're on the home page
   9 |     await expect(page.locator('h1').first()).toContainText('AG Grid React Components');
  10 |     
  11 |     // Navigate to Demo
  12 |     await page.click('a[href="/demo"]');
  13 |     await page.waitForLoadState('networkidle');
  14 |     
  15 |     // Verify the grid is loaded
  16 |     await expect(page.locator('.ag-theme-quartz-dark')).toBeVisible();
  17 |     await expect(page.locator('.ag-header-row')).toBeVisible();
  18 |     
  19 |     // Navigate back to Home
  20 |     await page.click('a[href="/"]');
  21 |     await page.waitForLoadState('networkidle');
  22 |     
  23 |     // Verify we're back on home
  24 |     await expect(page.locator('text=Advanced Date Filtering')).toBeVisible();
  25 |     
  26 |     // Navigate to Demo again
  27 |     await page.click('a[href="/demo"]');
  28 |     await page.waitForLoadState('networkidle');
  29 |     
  30 |     // Verify the grid loads without errors
  31 |     await expect(page.locator('.ag-theme-quartz-dark')).toBeVisible();
  32 |     await expect(page.locator('.ag-header-row')).toBeVisible();
  33 |     
  34 |     // Check console for errors
  35 |     const consoleErrors: string[] = [];
  36 |     page.on('console', msg => {
  37 |       if (msg.type() === 'error') {
  38 |         consoleErrors.push(msg.text());
  39 |       }
  40 |     });
  41 |     
  42 |     // Navigate to docs and back
  43 |     await page.click('a[href="/docs"]');
  44 |     await page.waitForLoadState('networkidle');
  45 |     await expect(page.locator('text=Documentation')).toBeVisible();
  46 |     
  47 |     await page.click('a[href="/demo"]');
  48 |     await page.waitForLoadState('networkidle');
  49 |     
  50 |     // Final check for grid
  51 |     await expect(page.locator('.ag-theme-quartz-dark')).toBeVisible();
  52 |     
  53 |     // Verify no console errors
  54 |     expect(consoleErrors).toHaveLength(0);
  55 |   });
  56 |
  57 |   test('should maintain grid state when staying on demo page', async ({ page }) => {
  58 |     await page.goto('/demo');
  59 |     await page.waitForLoadState('networkidle');
  60 |     
  61 |     // Apply a filter
  62 |     await page.click('text=Due Date');
  63 |     await page.waitForTimeout(500);
  64 |     
  65 |     // Verify filter UI appears
  66 |     const filterDialog = page.locator('.ag-theme-quartz-dark .ag-filter');
> 67 |     await expect(filterDialog).toBeVisible();
     |                                ^ Error: expect.toBeVisible: Error: strict mode violation: locator('.ag-theme-quartz-dark .ag-filter') resolved to 11 elements:
  68 |     
  69 |     // Close filter
  70 |     await page.keyboard.press('Escape');
  71 |     
  72 |     // Grid should still be functional
  73 |     await expect(page.locator('.ag-header-row')).toBeVisible();
  74 |   });
  75 | });
```