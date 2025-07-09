# Test info

- Name: Server-Side Demo Fixed >> should render server-side demo components
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-demo-fixed.spec.ts:38:3

# Error details

```
Error: Timed out 10000ms waiting for expect(locator).toBeVisible()

Locator: locator('text="Server-Side Row Model Demo"')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 10000ms
  - waiting for locator('text="Server-Side Row Model Demo"')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-demo-fixed.spec.ts:43:69
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
   3 | test.describe("Server-Side Demo Fixed", () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto("http://localhost:5173/demo");
   6 |   });
   7 |
   8 |   test("should switch to server-side tab without critical errors", async ({
   9 |     page,
   10 |   }) => {
   11 |     // Start monitoring console errors
   12 |     const criticalErrors: string[] = [];
   13 |     page.on("console", (msg) => {
   14 |       if (msg.type() === "error") {
   15 |         const text = msg.text();
   16 |         // Ignore AG Grid license warnings
   17 |         if (
   18 |           !text.includes("AG Grid Enterprise License") &&
   19 |           !text.includes("License Key Not Found") &&
   20 |           !text.includes("***")
   21 |         ) {
   22 |           criticalErrors.push(text);
   23 |         }
   24 |       }
   25 |     });
   26 |
   27 |     // Click on server-side tab
   28 |     await page.click('button:has-text("Server-Side Data")');
   29 |
   30 |     // Wait for the server-side demo to load
   31 |     await page.waitForLoadState("networkidle");
   32 |     await page.waitForTimeout(1000); // Give time for any errors to surface
   33 |
   34 |     // Check that no critical console errors occurred
   35 |     expect(criticalErrors).toHaveLength(0);
   36 |   });
   37 |
   38 |   test("should render server-side demo components", async ({ page }) => {
   39 |     // Switch to server-side tab
   40 |     await page.click('button:has-text("Server-Side Data")');
   41 |
   42 |     // Check that the banner is visible
>  43 |     await expect(page.locator('text="Server-Side Row Model Demo"')).toBeVisible(
      |                                                                     ^ Error: Timed out 10000ms waiting for expect(locator).toBeVisible()
   44 |       { timeout: 10000 },
   45 |     );
   46 |
   47 |     // Check that the API status is shown
   48 |     await expect(page.locator('text="API Status:"')).toBeVisible();
   49 |
   50 |     // Check that stats are displayed
   51 |     await expect(page.locator('text="Total Tasks"')).toBeVisible();
   52 |     await expect(page.locator('text="Total Budget"')).toBeVisible();
   53 |   });
   54 |
   55 |   test("should display the AG Grid with server-side data", async ({ page }) => {
   56 |     // Switch to server-side tab
   57 |     await page.click('button:has-text("Server-Side Data")');
   58 |
   59 |     // Wait for the grid to be visible
   60 |     const grid = page.locator(".ag-root-wrapper");
   61 |     await expect(grid).toBeVisible({ timeout: 10000 });
   62 |
   63 |     // Check that headers are visible
   64 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   65 |
   66 |     // Check for specific server-side headers
   67 |     await expect(
   68 |       page.locator('.ag-header-cell-text:has-text("Task ID")'),
   69 |     ).toBeVisible();
   70 |     await expect(
   71 |       page.locator('.ag-header-cell-text:has-text("Title")'),
   72 |     ).toBeVisible();
   73 |
   74 |     // Wait for data rows to appear
   75 |     await page.waitForSelector(".ag-row", { timeout: 10000 });
   76 |
   77 |     // Verify data is loaded
   78 |     const rows = await page.locator(".ag-row").count();
   79 |     expect(rows).toBeGreaterThan(0);
   80 |   });
   81 |
   82 |   test("should not have incompatible status bar components", async ({
   83 |     page,
   84 |   }) => {
   85 |     // Monitor for specific AG Grid warnings
   86 |     let hasIncompatibleComponents = false;
   87 |     page.on("console", (msg) => {
   88 |       if (msg.type() === "warning") {
   89 |         const text = msg.text();
   90 |         if (
   91 |           text.includes("agTotalAndFilteredRowCountComponent") ||
   92 |           text.includes(
   93 |             "agTotalRowCountComponent should only be used with the client side",
   94 |           ) ||
   95 |           text.includes(
   96 |             "agFilteredRowCountComponent should only be used with the client side",
   97 |           )
   98 |         ) {
   99 |           hasIncompatibleComponents = true;
  100 |         }
  101 |       }
  102 |     });
  103 |
  104 |     // Switch to server-side tab
  105 |     await page.click('button:has-text("Server-Side Data")');
  106 |
  107 |     // Wait for the grid to render
  108 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
  109 |     await page.waitForTimeout(1000);
  110 |
  111 |     // Verify no incompatible components were used
  112 |     expect(hasIncompatibleComponents).toBe(false);
  113 |   });
  114 |
  115 |   test("should handle search functionality in server-side mode", async ({
  116 |     page,
  117 |   }) => {
  118 |     // Switch to server-side tab
  119 |     await page.click('button:has-text("Server-Side Data")');
  120 |
  121 |     // Wait for search input
  122 |     const searchInput = page.locator(
  123 |       'input[placeholder="Search all columns..."]',
  124 |     );
  125 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  126 |
  127 |     // Type a search term
  128 |     await searchInput.fill("bug");
  129 |
  130 |     // Wait for debounce and check results
  131 |     await page.waitForTimeout(500);
  132 |
  133 |     // Verify search is working by checking for results indicator
  134 |     await expect(page.locator('text="results"')).toBeVisible();
  135 |   });
  136 |
  137 |   test("server-side data should be different from client-side", async ({
  138 |     page,
  139 |   }) => {
  140 |     // First check client-side headers
  141 |     await page.waitForSelector(".ag-header-cell-text");
  142 |     const clientHeaders = await page
  143 |       .locator(".ag-header-cell-text")
```