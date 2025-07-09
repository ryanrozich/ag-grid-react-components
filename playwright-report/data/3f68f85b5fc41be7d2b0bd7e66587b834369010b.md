# Test info

- Name: Server-Side Demo >> should handle search functionality
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-demo.spec.ts:103:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text="results"')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text="results"')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-demo.spec.ts:120:50
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
- paragraph: "Total rows on server: 1,226"
- textbox "Search all columns...": bug
- img
- text: 1,226 results
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
- paragraph: 1,226
- img
- paragraph: Total Budget
- paragraph: $31,204,370
- img
- paragraph: Average Progress
- paragraph: 51.0%
- img
- paragraph: Budget Remaining
- paragraph: $15,826,443
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
    - row "TASK-16":
      - gridcell "TASK-16"
    - row "TASK-20":
      - gridcell "TASK-20"
    - row "TASK-48":
      - gridcell "TASK-48"
    - row "TASK-55":
      - gridcell "TASK-55"
    - row "TASK-57":
      - gridcell "TASK-57"
    - row "TASK-78":
      - gridcell "TASK-78"
    - row "TASK-81":
      - gridcell "TASK-81"
    - row "TASK-83":
      - gridcell "TASK-83"
    - row "TASK-89":
      - gridcell "TASK-89"
    - row "TASK-99":
      - gridcell "TASK-99"
    - row "TASK-113":
      - gridcell "TASK-113"
    - row "TASK-114":
      - gridcell "TASK-114"
    - row "TASK-132":
      - gridcell "TASK-132"
    - row "TASK-137":
      - gridcell "TASK-137"
    - row "TASK-141":
      - gridcell "TASK-141"
    - row "TASK-154":
      - gridcell "TASK-154"
    - row "TASK-182":
      - gridcell "TASK-182"
    - row "TASK-208":
      - gridcell "TASK-208"
    - row "TASK-226":
      - gridcell "TASK-226"
  - rowgroup:
    - row "Try to generate the SSD alarm, maybe it will navigate the digital circuit! Blocked Critical 🐛 Bug MF Mindy Feest-White 7/3/2025 38% $36,524":
      - gridcell "Try to generate the SSD alarm, maybe it will navigate the digital circuit!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "MF Mindy Feest-White"
      - gridcell "7/3/2025"
      - gridcell "38%"
      - gridcell "$36,524"
    - row "Try to synthesize the SQL transmitter, maybe it will compress the back-end panel! Blocked Low 🐛 Bug BS Boyd Smitham 7/13/2025 65% $31,722":
      - gridcell "Try to synthesize the SQL transmitter, maybe it will compress the back-end panel!"
      - gridcell "Blocked"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "BS Boyd Smitham"
      - gridcell "7/13/2025"
      - gridcell "65%"
      - gridcell "$31,722"
    - row "calculating the hard drive won't do anything, we need to transmit the neural SCSI monitor! Blocked Medium 🐛 Bug MW Marsha Walter 7/9/2025 70% $22,430":
      - gridcell "calculating the hard drive won't do anything, we need to transmit the neural SCSI monitor!"
      - gridcell "Blocked"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "MW Marsha Walter"
      - gridcell "7/9/2025"
      - gridcell "70%"
      - gridcell "$22,430"
    - row "Try to bypass the API program, maybe it will override the neural system! Done Critical 🐛 Bug EC Evelyn Cruickshank 7/13/2025 54% $13,181":
      - gridcell "Try to bypass the API program, maybe it will override the neural system!"
      - gridcell "Done"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "EC Evelyn Cruickshank"
      - gridcell "7/13/2025"
      - gridcell "54%"
      - gridcell "$13,181"
    - row "The HDD panel is down, index the primary bus so we can program the SMS panel! Blocked Low 🐛 Bug HL Howard Luettgen 6/30/2025 18% $17,953":
      - gridcell "The HDD panel is down, index the primary bus so we can program the SMS panel!"
      - gridcell "Blocked"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "HL Howard Luettgen"
      - gridcell "6/30/2025"
      - gridcell "18%"
      - gridcell "$17,953"
    - row "quantifying the pixel won't do anything, we need to copy the back-end VGA monitor! Testing Critical 🐛 Bug CM Cory Beahan-Dietrich MD 7/22/2025 43% $29,681":
      - gridcell "quantifying the pixel won't do anything, we need to copy the back-end VGA monitor!"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "CM Cory Beahan-Dietrich MD"
      - gridcell "7/22/2025"
      - gridcell "43%"
      - gridcell "$29,681"
    - row "Use the online FTP array, then you can bypass the multi-byte interface! In Progress Critical 🐛 Bug PW Phil Wolff 6/30/2025 75% $24,815":
      - gridcell "Use the online FTP array, then you can bypass the multi-byte interface!"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "PW Phil Wolff"
      - gridcell "6/30/2025"
      - gridcell "75%"
      - gridcell "$24,815"
    - row "The SSD program is down, parse the bluetooth port so we can connect the UDP sensor! Todo Critical 🐛 Bug EV Elijah Volkman 7/8/2025 70% $30,311":
      - gridcell "The SSD program is down, parse the bluetooth port so we can connect the UDP sensor!"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "EV Elijah Volkman"
      - gridcell "7/8/2025"
      - gridcell "70%"
      - gridcell "$30,311"
    - row "Use the virtual TCP bandwidth, then you can program the 1080p protocol! In Review Critical 🐛 Bug BB Brooke Beahan 8/5/2025 6% $45,890":
      - gridcell "Use the virtual TCP bandwidth, then you can program the 1080p protocol!"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "BB Brooke Beahan"
      - gridcell "8/5/2025"
      - gridcell "6%"
      - gridcell "$45,890"
    - row "overriding the feed won't do anything, we need to override the mobile JSON port! Backlog Critical 🐛 Bug MT Mr. Alberto Tromp-Gerlach 7/18/2025 43% $4,960":
      - gridcell "overriding the feed won't do anything, we need to override the mobile JSON port!"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "MT Mr. Alberto Tromp-Gerlach"
      - gridcell "7/18/2025"
      - gridcell "43%"
      - gridcell "$4,960"
    - row "We need to compress the mobile HTTP microchip! Backlog Critical 🐛 Bug BG Blanca Goldner 7/14/2025 23% $31,631":
      - gridcell "We need to compress the mobile HTTP microchip!"
      - gridcell "Backlog"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "BG Blanca Goldner"
      - gridcell "7/14/2025"
      - gridcell "23%"
      - gridcell "$31,631"
    - row "The ASCII driver is down, parse the redundant capacitor so we can override the SMS microchip! In Review Critical 🐛 Bug BW Bethany Windler 7/13/2025 50% $10,734":
      - gridcell "The ASCII driver is down, parse the redundant capacitor so we can override the SMS microchip!"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "BW Bethany Windler"
      - gridcell "7/13/2025"
      - gridcell "50%"
      - gridcell "$10,734"
    - row "You can't bypass the matrix without hacking the virtual COM hard drive! Testing Low 🐛 Bug RP Roberto Paucek 6/29/2025 69% $1,183":
      - gridcell "You can't bypass the matrix without hacking the virtual COM hard drive!"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "RP Roberto Paucek"
      - gridcell "6/29/2025"
      - gridcell "69%"
      - gridcell "$1,183"
    - row "We need to navigate the virtual XSS bandwidth! In Review Medium 🐛 Bug KT Kristi Turner 6/30/2025 26% $38,559":
      - gridcell "We need to navigate the virtual XSS bandwidth!"
      - gridcell "In Review"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "KT Kristi Turner"
      - gridcell "6/30/2025"
      - gridcell "26%"
      - gridcell "$38,559"
    - row "calculating the circuit won't do anything, we need to input the online IP hard drive! Blocked Critical 🐛 Bug MM Mae Mosciski 7/4/2025 64% $24,470":
      - gridcell "calculating the circuit won't do anything, we need to input the online IP hard drive!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "MM Mae Mosciski"
      - gridcell "7/4/2025"
      - gridcell "64%"
      - gridcell "$24,470"
    - row "You can't reboot the driver without transmitting the 1080p RSS application! In Review High 🐛 Bug DD Dr. Sean Dibbert 7/2/2025 86% $35,841":
      - gridcell "You can't reboot the driver without transmitting the 1080p RSS application!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "DD Dr. Sean Dibbert"
      - gridcell "7/2/2025"
      - gridcell "86%"
      - gridcell "$35,841"
    - row "If we quantify the program, we can get to the UDP hard drive through the optical SSL pixel! Blocked Critical 🐛 Bug DL Dolores Littel 7/15/2025 73% $38,214":
      - gridcell "If we quantify the program, we can get to the UDP hard drive through the optical SSL pixel!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "DL Dolores Littel"
      - gridcell "7/15/2025"
      - gridcell "73%"
      - gridcell "$38,214"
    - row "I'll calculate the open-source TCP circuit, that should bandwidth the SQL bus! Blocked Critical 🐛 Bug DM Dr. Alan Moen 7/9/2025 33% $40,705":
      - gridcell "I'll calculate the open-source TCP circuit, that should bandwidth the SQL bus!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "DM Dr. Alan Moen"
      - gridcell "7/9/2025"
      - gridcell "33%"
      - gridcell "$40,705"
    - row "transmitting the panel won't do anything, we need to parse the haptic HTTP panel! Done High 🐛 Bug GK Guadalupe Kris 8/5/2025 37% $33,707":
      - gridcell "transmitting the panel won't do anything, we need to parse the haptic HTTP panel!"
      - gridcell "Done"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "GK Guadalupe Kris"
      - gridcell "8/5/2025"
      - gridcell "37%"
      - gridcell "$33,707"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "TOTAL":
      - gridcell "TOTAL"
  - rowgroup:
    - row "Grand Total 51% $31,204,370":
      - gridcell "Grand Total"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "51%"
      - gridcell "$31,204,370"
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
   64 |     ).toBeVisible();
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
> 120 |     await expect(page.locator('text="results"')).toBeVisible();
      |                                                  ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
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