# Test info

- Name: TestDemo >> should clear all filters
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/TestDemo.spec.ts:104:3

# Error details

```
Error: locator.hover: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[col-id="date"] .ag-header-cell')

    at applyDateFilter (/Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/src/test-utils/agGridTestUtils.ts:69:22)
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/TestDemo.spec.ts:109:11
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
- paragraph: $41,135,300
- img
- paragraph: Average Progress
- paragraph: 45.7%
- img
- paragraph: Budget Remaining
- paragraph: $22,277,779
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
    - row "BACKEND-5505":
      - gridcell "BACKEND-5505"
    - row "UI-1226":
      - gridcell "UI-1226"
    - row "CORE-1784":
      - gridcell "CORE-1784"
    - row "FRONTEND-3490":
      - gridcell "FRONTEND-3490"
    - row "CORE-6313":
      - gridcell "CORE-6313"
    - row "APP-8004":
      - gridcell "APP-8004"
    - row "AUTH-1831":
      - gridcell "AUTH-1831"
    - row "UI-4561":
      - gridcell "UI-4561"
    - row "AUTH-5441":
      - gridcell "AUTH-5441"
    - row "INFRA-7167":
      - gridcell "INFRA-7167"
    - row "DATA-8452":
      - gridcell "DATA-8452"
    - row "ADMIN-8816":
      - gridcell "ADMIN-8816"
    - row "DATA-8830":
      - gridcell "DATA-8830"
    - row "APP-10020":
      - gridcell "APP-10020"
    - row "DATA-10433":
      - gridcell "DATA-10433"
    - row "WEB-10519":
      - gridcell "WEB-10519"
    - row "PROJ-1399":
      - gridcell "PROJ-1399"
    - row "WEB-2073":
      - gridcell "WEB-2073"
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) Configure load balancer (Q2 Planning) Testing High 🔧 DevOps AW Amanda White 9/2/2025 83% $675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure load balancer (Q2 Planning)"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "AW Amanda White"
      - gridcell "9/2/2025"
      - gridcell "83%"
      - gridcell "$675"
    - row "Press Space to toggle row selection (unchecked) Correct CSS overflow in sidebar (Performance Sprint) In Progress High 🐛 Bug David Lee David Lee 8/26/2025 40% $2,850":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Correct CSS overflow in sidebar (Performance Sprint)"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "David Lee David Lee":
        - img "David Lee"
        - text: David Lee
      - gridcell "8/26/2025"
      - gridcell "40%"
      - gridcell "$2,850"
    - row "Press Space to toggle row selection (unchecked) Implement auto-scaling (Sprint 27) Todo Low 🔧 DevOps Ryan Thomas Ryan Thomas 9/30/2025 7% $600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement auto-scaling (Sprint 27)"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Ryan Thomas Ryan Thomas":
        - img "Ryan Thomas"
        - text: Ryan Thomas
      - gridcell "9/30/2025"
      - gridcell "7%"
      - gridcell "$600"
    - row "Press Space to toggle row selection (unchecked) Optimize database queries (Q1 Goals) Backlog Medium ♻️ Refactor Sophia Taylor Sophia Taylor 9/9/2025 0% $18,500":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Optimize database queries (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Sophia Taylor Sophia Taylor":
        - img "Sophia Taylor"
        - text: Sophia Taylor
      - gridcell "9/9/2025"
      - gridcell "0%"
      - gridcell "$18,500"
    - row "Press Space to toggle row selection (unchecked) Consolidate duplicate code (Sprint 26) Testing Medium ♻️ Refactor JR John Robinson 9/14/2025 94% $1,650":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Consolidate duplicate code (Sprint 26)"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "JR John Robinson"
      - gridcell "9/14/2025"
      - gridcell "94%"
      - gridcell "$1,650"
    - row "Press Space to toggle row selection (unchecked) Write API contract tests (Sprint 27) Backlog Critical 🧪 Testing Maya Patel Maya Patel 8/27/2025 0% $750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Write API contract tests (Sprint 27)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/27/2025"
      - gridcell "0%"
      - gridcell "$750"
    - row "Press Space to toggle row selection (unchecked) Migrate to new testing framework (Sprint 25) Backlog Critical ♻️ Refactor JR John Robinson 8/27/2025 0% $19,025":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Migrate to new testing framework (Sprint 25)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "JR John Robinson"
      - gridcell "8/27/2025"
      - gridcell "0%"
      - gridcell "$19,025"
    - row "Press Space to toggle row selection (unchecked) Set up staging environment In Review High 🔧 DevOps Michael Anderson Michael Anderson 9/1/2025 63% $150":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up staging environment"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Michael Anderson Michael Anderson":
        - img "Michael Anderson"
        - text: Michael Anderson
      - gridcell "9/1/2025"
      - gridcell "63%"
      - gridcell "$150"
    - row "Press Space to toggle row selection (unchecked) Implement API key rotation Backlog Low 🔒 Security James Wilson James Wilson 9/6/2025 0% $3,500":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement API key rotation"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "James Wilson James Wilson":
        - img "James Wilson"
        - text: James Wilson
      - gridcell "9/6/2025"
      - gridcell "0%"
      - gridcell "$3,500"
    - row "Press Space to toggle row selection (unchecked) Document component props In Progress High 📝 Documentation Olivia Brown Olivia Brown 9/1/2025 54% $10,750":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Document component props"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "📝 Documentation"
      - gridcell "Olivia Brown Olivia Brown":
        - img "Olivia Brown"
        - text: Olivia Brown
      - gridcell "9/1/2025"
      - gridcell "54%"
      - gridcell "$10,750"
    - row "Press Space to toggle row selection (unchecked) Implement dark mode toggle (Security Audit) In Review Medium ✨ Feature Emma Davis Emma Davis 9/5/2025 69% $325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Implement dark mode toggle (Security Audit)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "9/5/2025"
      - gridcell "69%"
      - gridcell "$325"
    - row "Press Space to toggle row selection (unchecked) Add audit logging (Sprint 24) Backlog High 🔒 Security Maya Patel Maya Patel 8/27/2025 0% $2,075":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add audit logging (Sprint 24)"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "Maya Patel Maya Patel":
        - img "Maya Patel"
        - text: Maya Patel
      - gridcell "8/27/2025"
      - gridcell "0%"
      - gridcell "$2,075"
    - row "Press Space to toggle row selection (unchecked) Set up penetration testing Todo Medium 🔒 Security Isabella Garcia Isabella Garcia 8/30/2025 17% $7,675":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Set up penetration testing"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Isabella Garcia Isabella Garcia":
        - img "Isabella Garcia"
        - text: Isabella Garcia
      - gridcell "8/30/2025"
      - gridcell "17%"
      - gridcell "$7,675"
    - row "Press Space to toggle row selection (unchecked) Create load testing scenarios (Tech Debt) In Review Medium 🧪 Testing Chris Martinez Chris Martinez 9/6/2025 73% $5,600":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create load testing scenarios (Tech Debt)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "Chris Martinez Chris Martinez":
        - img "Chris Martinez"
        - text: Chris Martinez
      - gridcell "9/6/2025"
      - gridcell "73%"
      - gridcell "$5,600"
    - row "Press Space to toggle row selection (unchecked) Create disaster recovery plan (Q1 Goals) Backlog Low 🔧 DevOps KZ Kevin Zhang 9/14/2025 0% $19,725":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create disaster recovery plan (Q1 Goals)"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "KZ Kevin Zhang"
      - gridcell "9/14/2025"
      - gridcell "0%"
      - gridcell "$19,725"
    - row "Press Space to toggle row selection (unchecked) Create security penetration tests (Q1 Goals) In Review Medium 🧪 Testing DK Daniel Kim 9/5/2025 78% $8,550":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Create security penetration tests (Q1 Goals)"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "DK Daniel Kim"
      - gridcell "9/5/2025"
      - gridcell "78%"
      - gridcell "$8,550"
    - row "Press Space to toggle row selection (unchecked) Configure firewall rules (Sprint 26) Backlog Medium 🔒 Security Priya Sharma Priya Sharma 9/2/2025 0% $325":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Configure firewall rules (Sprint 26)"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Priya Sharma Priya Sharma":
        - img "Priya Sharma"
        - text: Priya Sharma
      - gridcell "9/2/2025"
      - gridcell "0%"
      - gridcell "$325"
    - row "Press Space to toggle row selection (unchecked) Add internationalization tests (Q2 Planning) Backlog Critical 🧪 Testing Emma Davis Emma Davis 8/25/2025 0% $3,575":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell "Add internationalization tests (Q2 Planning)"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "Emma Davis Emma Davis":
        - img "Emma Davis"
        - text: Emma Davis
      - gridcell "8/25/2025"
      - gridcell "0%"
      - gridcell "$3,575"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row:
      - gridcell
  - rowgroup:
    - row "Press Space to toggle row selection (unchecked) $41,135,300":
      - gridcell "Press Space to toggle row selection (unchecked)":
        - checkbox "Press Space to toggle row selection (unchecked)"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "$41,135,300"
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