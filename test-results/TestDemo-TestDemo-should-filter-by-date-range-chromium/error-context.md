# Test info

- Name: TestDemo >> should filter by date range
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/TestDemo.spec.ts:69:3

# Error details

```
Error: locator.hover: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[col-id="date"] .ag-header-cell')

    at applyDateFilter (/Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/src/test-utils/agGridTestUtils.ts:69:22)
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/TestDemo.spec.ts:82:11
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
- paragraph: $40,467,775
- img
- paragraph: Average Progress
- paragraph: 46.5%
- img
- paragraph: Budget Remaining
- paragraph: $21,833,099
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
    - row "CORE-5786":
      - gridcell "CORE-5786"
    - row "ADMIN-3165":
      - gridcell "ADMIN-3165"
    - row "FRONTEND-9134":
      - gridcell "FRONTEND-9134"
    - row "FRONTEND-5655":
      - gridcell "FRONTEND-5655"
    - row "PROJ-7767":
      - gridcell "PROJ-7767"
    - row "BACKEND-8366":
      - gridcell "BACKEND-8366"
    - row "API-8379":
      - gridcell "API-8379"
    - row "USER-10862":
      - gridcell "USER-10862"
    - row "FRONTEND-1627":
      - gridcell "FRONTEND-1627"
    - row "UI-3404":
      - gridcell "UI-3404"
    - row "USER-5689":
      - gridcell "USER-5689"
    - row "PROJ-6425":
      - gridcell "PROJ-6425"
    - row "APP-7012":
      - gridcell "APP-7012"
    - row "FRONTEND-7109":
      - gridcell "FRONTEND-7109"
    - row "API-8102":
      - gridcell "API-8102"
    - row "API-9441":
      - gridcell "API-9441"
    - row "API-1434":
      - gridcell "API-1434"
    - row "CORE-1729":
      - gridcell "CORE-1729"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Resolve CORS issue with external API In Progress Critical 🐛 Bug JL Jessica Lopez 8/27/2025 35% $10,525":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Resolve CORS issue with external API"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "JL Jessica Lopez"
      - gridcell "8/27/2025"
      - gridcell "35%"
      - gridcell "$10,525"
    - row "Press Space to toggle row selection (unchecked) Implement social media sharing Testing Low ✨ Feature Emma Davis Emma Davis 10/5/2025 88% $2,125":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement social media sharing"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "✨ Feature"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "10/5/2025"
      - gridcell "88%"
      - gridcell "$2,125"
    - row "Press Space to toggle row selection (unchecked) Test mobile responsiveness (Security Audit) Backlog Critical 🧪 Testing Isabella Garcia Isabella Garcia 8/28/2025 0% $150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test mobile responsiveness (Security Audit)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/28/2025"
      - gridcell "0%"
      - gridcell "$150"
    - row "Press Space to toggle row selection (unchecked) Create disaster recovery plan (Tech Debt) Todo Critical 🔧 DevOps Marcus Williams Marcus Williams 8/25/2025 6% $825":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create disaster recovery plan (Tech Debt)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🔧 DevOps"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "8/25/2025"
      - gridcell "6%"
      - gridcell "$825"
    - row "Press Space to toggle row selection (unchecked) Implement virtual scrolling Testing High ⚡ Performance Sarah Johnson Sarah Johnson 9/2/2025 88% $1,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement virtual scrolling"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/2/2025"
      - gridcell "88%"
      - gridcell "$1,000"
    - row "Press Space to toggle row selection (unchecked) Implement service workers (Q1 Goals) Testing High ⚡ Performance Ryan Thomas Ryan Thomas 8/28/2025 81% $200":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement service workers (Q1 Goals)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "8/28/2025"
      - gridcell "81%"
      - gridcell "$200"
    - row "Press Space to toggle row selection (unchecked) Set up infrastructure as code (Sprint 25) Todo High 🔧 DevOps Olivia Brown Olivia Brown 9/1/2025 18% $1,000":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up infrastructure as code (Sprint 25)"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/1/2025"
      - gridcell "18%"
      - gridcell "$1,000"
    - row "Press Space to toggle row selection (unchecked) Add database indexing In Progress Low ⚡ Performance Sarah Johnson Sarah Johnson 9/22/2025 37% $450":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add database indexing"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Sarah Johnson Sarah Johnson":
        - img "Sarah Johnson"
        - text: Sarah Johnson
      - gridcell "9/22/2025"
      - gridcell "37%"
      - gridcell "$450"
    - row "Press Space to toggle row selection (unchecked) Set up SSL certificates In Review Low 🔒 Security Marcus Williams Marcus Williams 9/6/2025 63% $4,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up SSL certificates"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/6/2025"
      - gridcell "63%"
      - gridcell "$4,900"
    - row "Press Space to toggle row selection (unchecked) Configure health checks (Security Audit) In Progress Medium 🔧 DevOps JR John Robinson 9/10/2025 48% $7,325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure health checks (Security Audit)"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "JR John Robinson"
      - gridcell "9/10/2025"
      - gridcell "48%"
      - gridcell "$7,325"
    - row "Press Space to toggle row selection (unchecked) Debug WebSocket connection timeout Backlog High 🐛 Bug Olivia Brown Olivia Brown 8/27/2025 0% $75":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Debug WebSocket connection timeout"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "8/27/2025"
      - gridcell "0%"
      - gridcell "$75"
    - row "Press Space to toggle row selection (unchecked) Fix broken unit tests in CI pipeline (Tech Debt) Blocked Low 🐛 Bug James Wilson James Wilson 9/6/2025 15% $18,800":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Fix broken unit tests in CI pipeline (Tech Debt)"
      - gridcell "Blocked"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/6/2025"
      - gridcell "15%"
      - gridcell "$18,800"
    - row "Press Space to toggle row selection (unchecked) Write deployment guide (Sprint 24) Backlog High 📝 Documentation Maya Patel Maya Patel 8/31/2025 0% $7,900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write deployment guide (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/31/2025"
      - gridcell "0%"
      - gridcell "$7,900"
    - row "Press Space to toggle row selection (unchecked) Test cross-browser compatibility In Progress High 🧪 Testing JL Jessica Lopez 8/29/2025 34% $9,050":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Test cross-browser compatibility"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "JL Jessica Lopez"
      - gridcell "8/29/2025"
      - gridcell "34%"
      - gridcell "$9,050"
    - row "Press Space to toggle row selection (unchecked) Simplify complex conditionals (Sprint 27) Testing Low ♻️ Refactor Marcus Williams Marcus Williams 9/15/2025 82% $900":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Simplify complex conditionals (Sprint 27)"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/15/2025"
      - gridcell "82%"
      - gridcell "$900"
    - row "Press Space to toggle row selection (unchecked) Add request batching (Q2 Planning) Backlog Medium ⚡ Performance Marcus Williams Marcus Williams 9/4/2025 0% $850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add request batching (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "Marcus Williams Marcus Williams":
        - img "Marcus Williams"
        - text: Marcus Williams
      - gridcell "9/4/2025"
      - gridcell "0%"
      - gridcell "$850"
    - row "Press Space to toggle row selection (unchecked) Create advanced search filters (Sprint 23) Todo Critical ✨ Feature James Wilson James Wilson 8/25/2025 13% $4,700":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create advanced search filters (Sprint 23)"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "8/25/2025"
      - gridcell "13%"
      - gridcell "$4,700"
    - row "Press Space to toggle row selection (unchecked) Migrate to TypeScript strict mode In Review High ♻️ Refactor Isabella Garcia Isabella Garcia 8/28/2025 71% $4,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to TypeScript strict mode"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/28/2025"
      - gridcell "71%"
      - gridcell "$4,025"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $40,467,775":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$40,467,775"
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