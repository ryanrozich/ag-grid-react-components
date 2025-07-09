# Test info

- Name: Server-Side Demo >> should display correct column headers for server-side
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-demo.spec.ts:52:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('.ag-header-cell-text:has-text("Task ID")')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('.ag-header-cell-text:has-text("Task ID")')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-demo.spec.ts:64:7
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
- button "Dismiss banner":
  - img
- heading "🚀 Server-Side Row Model Demo" [level=3]
- paragraph:
  - text: This demo uses AG Grid's Server-Side Row Model with a real API backend. Data is fetched on-demand as you scroll, filter, and sort. The API endpoint is
  - code: /api/tasks
- paragraph: "Total rows on server: 10,000"
- textbox "Search all columns..."
- img
- text: 10,000 results
- button "Quick filter options":
  - text: Filter by due date...
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
- paragraph: $252,592,083
- img
- paragraph: Average Progress
- paragraph: 50.0%
- img
- paragraph: Budget Remaining
- paragraph: $128,025,318
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
    - row "TASK-12":
      - gridcell "TASK-12"
    - row "TASK-13":
      - gridcell "TASK-13"
    - row "TASK-14":
      - gridcell "TASK-14"
    - row "TASK-15":
      - gridcell "TASK-15"
    - row "TASK-16":
      - gridcell "TASK-16"
    - row "TASK-17":
      - gridcell "TASK-17"
    - row "TASK-18":
      - gridcell "TASK-18"
    - row "TASK-19":
      - gridcell "TASK-19"
  - rowgroup:
    - row "If we quantify the bandwidth, we can get to the CLI panel through the auxiliary SCSI array! In Review High ✨ Feature BL Billie Lebsack-Ullrich 7/6/2025 78% $33,621":
      - gridcell "If we quantify the bandwidth, we can get to the CLI panel through the auxiliary SCSI array!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "BL Billie Lebsack-Ullrich"
      - gridcell "7/6/2025"
      - gridcell "78%"
      - gridcell "$33,621"
    - row "The RSS application is down, parse the wireless port so we can calculate the VGA microchip! In Progress Low 🔒 Security DP Dominic Fadel PhD 7/15/2025 10% $30,271":
      - gridcell "The RSS application is down, parse the wireless port so we can calculate the VGA microchip!"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "DP Dominic Fadel PhD"
      - gridcell "7/15/2025"
      - gridcell "10%"
      - gridcell "$30,271"
    - row "If we synthesize the driver, we can get to the PNG hard drive through the redundant SSD circuit! Testing Low ♻️ Refactor FW Franklin Wuckert 6/29/2025 30% $35,876":
      - gridcell "If we synthesize the driver, we can get to the PNG hard drive through the redundant SSD circuit!"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "♻️ Refactor"
      - gridcell "FW Franklin Wuckert"
      - gridcell "6/29/2025"
      - gridcell "30%"
      - gridcell "$35,876"
    - row "calculating the monitor won't do anything, we need to index the virtual HDD program! In Progress Low ⚡ Performance WP Wendy Parker 7/21/2025 68% $46,401":
      - gridcell "calculating the monitor won't do anything, we need to index the virtual HDD program!"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "WP Wendy Parker"
      - gridcell "7/21/2025"
      - gridcell "68%"
      - gridcell "$46,401"
    - row "If we compress the matrix, we can get to the UDP program through the primary FTP system! Backlog Medium ⚡ Performance BA Bernadette Armstrong 7/23/2025 64% $24,867":
      - gridcell "If we compress the matrix, we can get to the UDP program through the primary FTP system!"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "BA Bernadette Armstrong"
      - gridcell "7/23/2025"
      - gridcell "64%"
      - gridcell "$24,867"
    - row "You can't quantify the monitor without generating the bluetooth SSL array! In Review Medium ⚡ Performance AN Alberto Nolan 7/15/2025 96% $46,985":
      - gridcell "You can't quantify the monitor without generating the bluetooth SSL array!"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "AN Alberto Nolan"
      - gridcell "7/15/2025"
      - gridcell "96%"
      - gridcell "$46,985"
    - row "If we reboot the bandwidth, we can get to the USB protocol through the optical UDP alarm! Backlog Low 🧪 Testing KJ Kevin Johnston 6/24/2025 35% $34,775":
      - gridcell "If we reboot the bandwidth, we can get to the USB protocol through the optical UDP alarm!"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "KJ Kevin Johnston"
      - gridcell "6/24/2025"
      - gridcell "35%"
      - gridcell "$34,775"
    - row "If we program the alarm, we can get to the EXE sensor through the neural HEX driver! Testing Medium ✨ Feature BV Brandon Nitzsche V 7/13/2025 62% $20,999":
      - gridcell "If we program the alarm, we can get to the EXE sensor through the neural HEX driver!"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "BV Brandon Nitzsche V"
      - gridcell "7/13/2025"
      - gridcell "62%"
      - gridcell "$20,999"
    - row "compressing the microchip won't do anything, we need to index the digital VGA pixel! Todo Medium ✨ Feature FB Floyd Bins 7/5/2025 22% $11,521":
      - gridcell "compressing the microchip won't do anything, we need to index the digital VGA pixel!"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "FB Floyd Bins"
      - gridcell "7/5/2025"
      - gridcell "22%"
      - gridcell "$11,521"
    - row "The HDD port is down, compress the redundant capacitor so we can bypass the COM bandwidth! Testing Medium 📝 Documentation MJ Miss Doris Thiel Jr. 7/4/2025 35% $17,399":
      - gridcell "The HDD port is down, compress the redundant capacitor so we can bypass the COM bandwidth!"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "📝 Documentation"
      - gridcell "MJ Miss Doris Thiel Jr."
      - gridcell "7/4/2025"
      - gridcell "35%"
      - gridcell "$17,399"
    - row "I'll hack the haptic HDD capacitor, that should protocol the GB alarm! Blocked High 🔒 Security CG Chad Greenfelder 6/25/2025 90% $6,076":
      - gridcell "I'll hack the haptic HDD capacitor, that should protocol the GB alarm!"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🔒 Security"
      - gridcell "CG Chad Greenfelder"
      - gridcell "6/25/2025"
      - gridcell "90%"
      - gridcell "$6,076"
    - row "If we back up the array, we can get to the EXE capacitor through the wireless SSL bus! In Review Medium ♻️ Refactor AR Al Reinger 7/20/2025 51% $4,612":
      - gridcell "If we back up the array, we can get to the EXE capacitor through the wireless SSL bus!"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "AR Al Reinger"
      - gridcell "7/20/2025"
      - gridcell "51%"
      - gridcell "$4,612"
    - row "Use the haptic TLS sensor, then you can hack the back-end sensor! Backlog Medium 🧪 Testing LM Luther Mertz 7/12/2025 2% $43,205":
      - gridcell "Use the haptic TLS sensor, then you can hack the back-end sensor!"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "🧪 Testing"
      - gridcell "LM Luther Mertz"
      - gridcell "7/12/2025"
      - gridcell "2%"
      - gridcell "$43,205"
    - row "The ASCII protocol is down, transmit the bluetooth monitor so we can synthesize the HTTP pixel! Done High ⚡ Performance TH Tom Howe-Mosciski 6/23/2025 59% $19,848":
      - gridcell "The ASCII protocol is down, transmit the bluetooth monitor so we can synthesize the HTTP pixel!"
      - gridcell "Done"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "TH Tom Howe-Mosciski"
      - gridcell "6/23/2025"
      - gridcell "59%"
      - gridcell "$19,848"
    - row "Try to calculate the SMS hard drive, maybe it will input the wireless transmitter! Blocked Critical 🧪 Testing MK Mr. Ignacio Koepp 7/19/2025 95% $45,628":
      - gridcell "Try to calculate the SMS hard drive, maybe it will input the wireless transmitter!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🧪 Testing"
      - gridcell "MK Mr. Ignacio Koepp"
      - gridcell "7/19/2025"
      - gridcell "95%"
      - gridcell "$45,628"
    - row "Try to generate the SSD alarm, maybe it will navigate the digital circuit! Blocked Critical 🐛 Bug MF Mindy Feest-White 7/3/2025 38% $36,524":
      - gridcell "Try to generate the SSD alarm, maybe it will navigate the digital circuit!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "MF Mindy Feest-White"
      - gridcell "7/3/2025"
      - gridcell "38%"
      - gridcell "$36,524"
    - row "Try to calculate the UDP firewall, maybe it will synthesize the bluetooth microchip! Testing High ♻️ Refactor NH Nellie Hand 7/5/2025 72% $1,315":
      - gridcell "Try to calculate the UDP firewall, maybe it will synthesize the bluetooth microchip!"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "NH Nellie Hand"
      - gridcell "7/5/2025"
      - gridcell "72%"
      - gridcell "$1,315"
    - row "We need to connect the wireless ADP transmitter! In Review High ✨ Feature SW Stella Waelchi 6/20/2025 7% $28,529":
      - gridcell "We need to connect the wireless ADP transmitter!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "✨ Feature"
      - gridcell "SW Stella Waelchi"
      - gridcell "6/20/2025"
      - gridcell "7%"
      - gridcell "$28,529"
    - row "Try to index the SSL feed, maybe it will bypass the online monitor! Testing High ♻️ Refactor DP Dr. Iris Pagac 7/31/2025 76% $48,033":
      - gridcell "Try to index the SSL feed, maybe it will bypass the online monitor!"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "♻️ Refactor"
      - gridcell "DP Dr. Iris Pagac"
      - gridcell "7/31/2025"
      - gridcell "76%"
      - gridcell "$48,033"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "TOTAL":
      - gridcell "TOTAL"
  - rowgroup:
    - row "Grand Total 50% $252,592,083":
      - gridcell "Grand Total"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "50%"
      - gridcell "$252,592,083"
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
   3 | test.describe("Server-Side Demo", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto("http://localhost:5173/demo");
   6 |   });
   7 |
   8 |   test("should switch to server-side tab without errors", async ({ page }) => {
   9 |     // Start monitoring console errors
   10 |     const consoleErrors: string[] = [];
   11 |     page.on("console", (msg) => {
   12 |       if (msg.type() === "error") {
   13 |         consoleErrors.push(msg.text());
   14 |       }
   15 |     });
   16 |
   17 |     // Click on server-side tab
   18 |     await page.click('button:has-text("Server-Side Data")');
   19 |
   20 |     // Wait for the server-side demo to load
   21 |     await page.waitForSelector('text="Server-Side Row Model Demo"', {
   22 |       timeout: 5000,
   23 |     });
   24 |
   25 |     // Check that no console errors occurred
   26 |     expect(consoleErrors).toHaveLength(0);
   27 |   });
   28 |
   29 |   test("should load server-side data correctly", async ({ page }) => {
   30 |     // Switch to server-side tab
   31 |     await page.click('button:has-text("Server-Side Data")');
   32 |
   33 |     // Wait for the demo to load
   34 |     await page.waitForSelector('text="Server-Side Row Model Demo"');
   35 |
   36 |     // Check that the API health check shows
   37 |     await expect(page.locator('text="API Status:"')).toBeVisible();
   38 |
   39 |     // Check that the grid is rendered
   40 |     const grid = page.locator(".ag-root-wrapper");
   41 |     await expect(grid).toBeVisible();
   42 |
   43 |     // Wait for data to load (look for task IDs)
   44 |     await page.waitForSelector('[col-id="taskId"]', { timeout: 10000 });
   45 |
   46 |     // Verify that data rows are present
   47 |     const rows = page.locator(".ag-row");
   48 |     const rowCount = await rows.count();
   49 |     expect(rowCount).toBeGreaterThan(0);
   50 |   });
   51 |
   52 |   test("should display correct column headers for server-side", async ({
   53 |     page,
   54 |   }) => {
   55 |     // Switch to server-side tab
   56 |     await page.click('button:has-text("Server-Side Data")');
   57 |
   58 |     // Wait for the grid to load
   59 |     await page.waitForSelector(".ag-header-cell");
   60 |
   61 |     // Check for server-side specific column headers
   62 |     await expect(
   63 |       page.locator('.ag-header-cell-text:has-text("Task ID")'),
>  64 |     ).toBeVisible();
      |       ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   65 |     await expect(
   66 |       page.locator('.ag-header-cell-text:has-text("Title")'),
   67 |     ).toBeVisible();
   68 |     await expect(
   69 |       page.locator('.ag-header-cell-text:has-text("Budget")'),
   70 |     ).toBeVisible();
   71 |     await expect(
   72 |       page.locator('.ag-header-cell-text:has-text("Spent")'),
   73 |     ).toBeVisible();
   74 |   });
   75 |
   76 |   test("should not show agTotalAndFilteredRowCountComponent error", async ({
   77 |     page,
   78 |   }) => {
   79 |     // Monitor for specific AG Grid error
   80 |     let hasSpecificError = false;
   81 |     page.on("console", (msg) => {
   82 |       if (
   83 |         msg.type() === "error" &&
   84 |         msg.text().includes("agTotalAndFilteredRowCountComponent")
   85 |       ) {
   86 |         hasSpecificError = true;
   87 |       }
   88 |     });
   89 |
   90 |     // Switch to server-side tab
   91 |     await page.click('button:has-text("Server-Side Data")');
   92 |
   93 |     // Wait for the grid to render
   94 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 5000 });
   95 |
   96 |     // Give it a moment to ensure any errors would have fired
   97 |     await page.waitForTimeout(1000);
   98 |
   99 |     // Check that the specific error did not occur
  100 |     expect(hasSpecificError).toBe(false);
  101 |   });
  102 |
  103 |   test("should handle search functionality", async ({ page }) => {
  104 |     // Switch to server-side tab
  105 |     await page.click('button:has-text("Server-Side Data")');
  106 |
  107 |     // Wait for the search input
  108 |     const searchInput = page.locator(
  109 |       'input[placeholder="Search all columns..."]',
  110 |     );
  111 |     await expect(searchInput).toBeVisible();
  112 |
  113 |     // Type in search
  114 |     await searchInput.fill("bug");
  115 |
  116 |     // Wait for the grid to update (debounced)
  117 |     await page.waitForTimeout(500);
  118 |
  119 |     // Verify that results are filtered
  120 |     await expect(page.locator('text="results"')).toBeVisible();
  121 |   });
  122 |
  123 |   test("should display server stats", async ({ page }) => {
  124 |     // Switch to server-side tab
  125 |     await page.click('button:has-text("Server-Side Data")');
  126 |
  127 |     // Wait for stats to load
  128 |     await page.waitForSelector('text="Total Tasks"');
  129 |
  130 |     // Check that all stats are displayed
  131 |     await expect(page.locator('text="Total Tasks"')).toBeVisible();
  132 |     await expect(page.locator('text="Total Budget"')).toBeVisible();
  133 |     await expect(page.locator('text="Average Progress"')).toBeVisible();
  134 |     await expect(page.locator('text="Budget Remaining"')).toBeVisible();
  135 |   });
  136 | });
  137 |
```