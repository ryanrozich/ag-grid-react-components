# Test info

- Name: TestDemo >> should filter by exact date
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/TestDemo.spec.ts:38:3

# Error details

```
Error: locator.hover: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[col-id="date"] .ag-header-cell')

    at applyDateFilter (/Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/src/test-utils/agGridTestUtils.ts:69:22)
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/TestDemo.spec.ts:44:11
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
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
  - button "Filter PresetsNEW"
- textbox "Search tasks..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: Task type
  - img
- button "My Views":
  - img
  - text: My Views
  - img
- button "Filter view options":
  - img
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $41,053,175
- img
- paragraph: Average Progress
- paragraph: 46.2%
- img
- paragraph: Budget Remaining
- paragraph: $21,967,281
- grid:
  - rowgroup:
    - row "ID":
      - columnheader "ID"
  - rowgroup:
    - row "Column with Header Selection Task Status Priority Category Assignee Due Date % Delivered Value":
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
  - rowgroup:
    - row "PROJ-4058":
      - gridcell "PROJ-4058"
    - row "AUTH-1103":
      - gridcell "AUTH-1103"
    - row "APP-1140":
      - gridcell "APP-1140"
    - row "UI-8918":
      - gridcell "UI-8918"
    - row "AUTH-10075":
      - gridcell "AUTH-10075"
    - row "USER-4941":
      - gridcell "USER-4941"
    - row "PROJ-6311":
      - gridcell "PROJ-6311"
    - row "CORE-6549":
      - gridcell "CORE-6549"
    - row "USER-10388":
      - gridcell "USER-10388"
    - row "BACKEND-10914":
      - gridcell "BACKEND-10914"
    - row "BACKEND-7235":
      - gridcell "BACKEND-7235"
    - row "INFRA-8962":
      - gridcell "INFRA-8962"
    - row "DASH-10966":
      - gridcell "DASH-10966"
    - row "USER-1135":
      - gridcell "USER-1135"
    - row "USER-1369":
      - gridcell "USER-1369"
    - row "BACKEND-2340":
      - gridcell "BACKEND-2340"
    - row "CORE-2987":
      - gridcell "CORE-2987"
    - row "CORE-8199":
      - gridcell "CORE-8199"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Write component snapshot tests (Sprint 23) Todo Critical 🧪 Testing Marcus Williams Marcus Williams 8/30/2025 8% $4,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write component snapshot tests (Sprint 23)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/30/2025"
      - gridcell "8%"
      - gridcell "$4,300"
    - row "Press Space to toggle row selection (unchecked) Create security penetration tests (Q1 Goals) Todo Medium 🧪 Testing David Lee David Lee 9/11/2025 16% $400":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create security penetration tests (Q1 Goals)"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "9/11/2025"
      - gridcell "16%"
      - gridcell "$400"
    - row "Press Space to toggle row selection (unchecked) Configure security headers (Performance Sprint) In Progress Critical 🔒 Security Sophia Taylor Sophia Taylor 8/27/2025 32% $1,975":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure security headers (Performance Sprint)"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "8/27/2025"
      - gridcell "32%"
      - gridcell "$1,975"
    - row "Press Space to toggle row selection (unchecked) Write testing best practices (Sprint 23) In Progress High 📝 Documentation AW Amanda White 9/4/2025 46% $650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write testing best practices (Sprint 23)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "AW Amanda White"
      - gridcell "9/4/2025"
      - gridcell "46%"
      - gridcell "$650"
    - row "Press Space to toggle row selection (unchecked) Simplify complex conditionals Backlog Low ♻️ Refactor Marcus Williams Marcus Williams 10/4/2025 0% $750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Simplify complex conditionals"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "10/4/2025"
      - gridcell "0%"
      - gridcell "$750"
    - row "Press Space to toggle row selection (unchecked) Add multi-language support In Progress Low ✨ Feature Alex Chen Alex Chen 9/21/2025 30% $675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add multi-language support"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "9/21/2025"
      - gridcell "30%"
      - gridcell "$675"
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Q2 Planning) In Progress High 🐛 Bug Priya Sharma Priya Sharma 8/26/2025 55% $725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Q2 Planning)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "8/26/2025"
      - gridcell "55%"
      - gridcell "$725"
    - row "Press Space to toggle row selection (unchecked) Migrate to TypeScript strict mode In Review Critical ♻️ Refactor Alex Chen Alex Chen 8/26/2025 73% $350":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to TypeScript strict mode"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Alex Chen Alex Chen":
        - img "Alex Chen"
        - text: Alex Chen
      - gridcell "8/26/2025"
      - gridcell "73%"
      - gridcell "$350"
    - row "Press Space to toggle row selection (unchecked) Create troubleshooting guide (Performance Sprint) Backlog Low 📝 Documentation KZ Kevin Zhang 9/20/2025 0% $800":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create troubleshooting guide (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "📝 Documentation"
      - gridcell "KZ Kevin Zhang"
      - gridcell "9/20/2025"
      - gridcell "0%"
      - gridcell "$800"
    - row "Press Space to toggle row selection (unchecked) Migrate to TypeScript strict mode Backlog Medium ♻️ Refactor Michael Anderson Michael Anderson 9/10/2025 0% $5,775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to TypeScript strict mode"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/10/2025"
      - gridcell "0%"
      - gridcell "$5,775"
    - row "Press Space to toggle row selection (unchecked) Test cross-browser compatibility (Performance Sprint) Todo Low 🧪 Testing James Wilson James Wilson 10/1/2025 9% $6,475":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test cross-browser compatibility (Performance Sprint)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "10/1/2025"
      - gridcell "9%"
      - gridcell "$6,475"
    - row "Press Space to toggle row selection (unchecked) Simplify complex conditionals (Performance Sprint) Backlog High ♻️ Refactor Marcus Williams Marcus Williams 8/28/2025 0% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Simplify complex conditionals (Performance Sprint)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/28/2025"
      - gridcell "0%"
      - gridcell "$450"
    - row "Press Space to toggle row selection (unchecked) Implement service workers Backlog Low ⚡ Performance Ryan Thomas Ryan Thomas 10/3/2025 0% $525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement service workers"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "10/3/2025"
      - gridcell "0%"
      - gridcell "$525"
    - row "Press Space to toggle row selection (unchecked) Add export to PDF functionality (Security Audit) Backlog Low ✨ Feature James Wilson James Wilson 9/26/2025 0% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add export to PDF functionality (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/26/2025"
      - gridcell "0%"
      - gridcell "$100"
    - row "Press Space to toggle row selection (unchecked) Create deployment rollback Testing High 🔧 DevOps Sarah Johnson Sarah Johnson 8/30/2025 86% $4,375":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create deployment rollback"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/30/2025"
      - gridcell "86%"
      - gridcell "$4,375"
    - row "Press Space to toggle row selection (unchecked) Add progressive web app features (Sprint 27) Testing High ⚡ Performance Sarah Johnson Sarah Johnson 8/28/2025 91% $425":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add progressive web app features (Sprint 27)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "8/28/2025"
      - gridcell "91%"
      - gridcell "$425"
    - row "Press Space to toggle row selection (unchecked) Configure CDN distribution (Tech Debt) Backlog High 🔧 DevOps Chris Martinez Chris Martinez 8/30/2025 0% $100":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure CDN distribution (Tech Debt)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "8/30/2025"
      - gridcell "0%"
      - gridcell "$100"
    - row "Press Space to toggle row selection (unchecked) Split monolithic components (Sprint 27) Backlog Critical ♻️ Refactor Isabella Garcia Isabella Garcia 8/24/2025 0% $950":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Split monolithic components (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/24/2025"
      - gridcell "0%"
      - gridcell "$950"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,053,175":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,053,175"
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
   1 | /**
   2 |  * AG Grid Test Utilities
   3 |  *
   4 |  * These utilities help with testing AG Grid components by providing
   5 |  * easy access to the grid's API and common test operations.
   6 |  */
   7 |
   8 | import type { GridApi, IRowNode, FilterModel } from "ag-grid-community";
   9 | import type { Page } from "@playwright/test";
   10 |
   11 | interface GridTestData {
   12 |   api: GridApi;
   13 | }
   14 |
   15 | declare global {
   16 |   interface Window {
   17 |     __AG_GRID_TEST__: Record<string, GridTestData>;
   18 |   }
   19 | }
   20 |
   21 | /**
   22 |  * Gets the grid API for a specific grid ID
   23 |  */
   24 | export const getGridApi = (gridId: string) => {
   25 |   const grid = window.__AG_GRID_TEST__?.[gridId];
   26 |   if (!grid) {
   27 |     throw new Error(
   28 |       `Grid with ID "${gridId}" not found. Make sure AGGridTestHarness is properly set up.`,
   29 |     );
   30 |   }
   31 |   return grid.api;
   32 | };
   33 |
   34 | /**
   35 |  * Gets all row data from the grid
   36 |  */
   37 | export const getRowData = <TData = unknown>(gridId: string): TData[] => {
   38 |   const api = getGridApi(gridId);
   39 |   const rowData: TData[] = [];
   40 |   api.forEachNode((node: IRowNode<TData>) => {
   41 |     if (node.data) {
   42 |       rowData.push(node.data);
   43 |     }
   44 |   });
   45 |   return rowData;
   46 | };
   47 |
   48 | /**
   49 |  * Gets the current filter model from the grid
   50 |  */
   51 | export const getFilterModel = (gridId: string): FilterModel | null => {
   52 |   const api = getGridApi(gridId);
   53 |   return api.getFilterModel();
   54 | };
   55 |
   56 | /**
   57 |  * Applies a date filter to a specific column
   58 |  */
   59 | export const applyDateFilter = async (
   60 |   page: Page,
   61 |   _gridId: string, // Kept for backward compatibility, not used
   62 |   columnId: string,
   63 |   filterType: string,
   64 |   dateFrom: string,
   65 |   dateTo?: string,
   66 | ): Promise<void> => {
   67 |   // Open the filter menu
   68 |   const columnHeader = page.locator(`[col-id="${columnId}"] .ag-header-cell`);
>  69 |   await columnHeader.hover();
      |                      ^ Error: locator.hover: Test timeout of 30000ms exceeded.
   70 |   await columnHeader.locator(".ag-header-cell-menu-button").click();
   71 |
   72 |   // Wait for the filter to be visible
   73 |   await page.waitForSelector(".ag-filter-wrapper");
   74 |
   75 |   // Set the filter type if needed
   76 |   const filterSelect = page.locator(".ag-filter-select");
   77 |   if (await filterSelect.isVisible()) {
   78 |     await filterSelect.selectOption(filterType);
   79 |   }
   80 |
   81 |   // Set the date inputs
   82 |   const fromInput = page.locator('input[placeholder="From"]');
   83 |   await fromInput.fill(dateFrom);
   84 |
   85 |   if (dateTo) {
   86 |     const toInput = page.locator('input[placeholder="To"]');
   87 |     await toInput.fill(dateTo);
   88 |   }
   89 |
   90 |   // Apply the filter
   91 |   await page.click(".ag-filter-apply-panel-button");
   92 | };
   93 |
   94 | /**
   95 |  * Clears all filters from the grid
   96 |  */
   97 | export const clearAllFilters = (): void => {
   98 |   // Get all grids and clear filters from each
   99 |   Object.values(window.__AG_GRID_TEST__ || {}).forEach(({ api }) => {
  100 |     api.setFilterModel(null);
  101 |   });
  102 | };
  103 |
  104 | /**
  105 |  * Gets the displayed row count from the grid
  106 |  */
  107 | export const getDisplayedRowCount = (gridId: string): number => {
  108 |   const api = getGridApi(gridId);
  109 |   return api.getDisplayedRowCount();
  110 | };
  111 |
  112 | /**
  113 |  * Gets the selected rows from the grid
  114 |  */
  115 | export const getSelectedRows = <TData = unknown>(gridId: string): TData[] => {
  116 |   const api = getGridApi(gridId);
  117 |   return api.getSelectedRows();
  118 | };
  119 |
  120 | /**
  121 |  * Initializes the test environment
  122 |  * This should be called in the test setup file
  123 |  */
  124 | export const initTestEnvironment = (): void => {
  125 |   // Initialize the global test object if it doesn't exist
  126 |   if (typeof window !== "undefined" && !window.__AG_GRID_TEST__) {
  127 |     window.__AG_GRID_TEST__ = {};
  128 |   }
  129 | };
  130 |
  131 | // Initialize the test environment when this module is loaded
  132 | if (typeof window !== "undefined") {
  133 |   initTestEnvironment();
  134 | }
  135 |
```