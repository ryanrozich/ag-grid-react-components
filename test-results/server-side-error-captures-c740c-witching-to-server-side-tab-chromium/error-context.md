# Test info

- Name: captures console errors when switching to server-side tab
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-error.spec.ts:3:1

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 8
Received array:  [{"text": "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "type": "error"}, {"text": "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "type": "error"}, {"text": "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "type": "error"}, {"text": "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "type": "error"}, {"text": "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "type": "error"}, {"text": "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "type": "error"}, {"text": "* All AG Grid Enterprise features are unlocked for trial.                                                                  *", "type": "error"}, {"text": "* If you want to hide the watermark please email info@ag-grid.com for a trial license key.                                 *", "type": "error"}]
    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-datefilter-fix/tests/e2e/server-side-error.spec.ts:53:18
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
   3 | test("captures console errors when switching to server-side tab", async ({
   4 |   page,
   5 | }) => {
   6 |   // Collect all console messages
   7 |   const consoleMessages: { type: string; text: string }[] = [];
   8 |
   9 |   page.on("console", (msg) => {
  10 |     consoleMessages.push({
  11 |       type: msg.type(),
  12 |       text: msg.text(),
  13 |     });
  14 |   });
  15 |
  16 |   // Navigate to demo page
  17 |   await page.goto("http://localhost:5173/demo");
  18 |
  19 |   // Wait for initial page load
  20 |   await page.waitForLoadState("networkidle");
  21 |
  22 |   // Click on the server-side tab
  23 |   await page.click('button:has-text("Server-Side Data")');
  24 |
  25 |   // Wait a bit for any errors to appear
  26 |   await page.waitForTimeout(2000);
  27 |
  28 |   // Check for console errors (excluding AG Grid license warnings)
  29 |   const errors = consoleMessages.filter(
  30 |     (msg) =>
  31 |       msg.type === "error" &&
  32 |       !msg.text.includes("AG Grid Enterprise License") &&
  33 |       !msg.text.includes("License Key Not Found") &&
  34 |       !msg.text.includes("***"),
  35 |   );
  36 |
  37 |   console.log("Actual errors found:", errors.length);
  38 |   errors.forEach((error, index) => {
  39 |     console.log(`Error ${index + 1}:`, error.text);
  40 |   });
  41 |
  42 |   // Also check warnings
  43 |   const warnings = consoleMessages.filter((msg) => msg.type === "warning");
  44 |   console.log("\nWarnings found:", warnings.length);
  45 |   warnings.forEach((warning, index) => {
  46 |     console.log(`Warning ${index + 1}:`, warning.text);
  47 |   });
  48 |
  49 |   // Take a screenshot for debugging
  50 |   await page.screenshot({ path: "server-side-error.png", fullPage: true });
  51 |
  52 |   // This test is expected to fail so we can see the errors
> 53 |   expect(errors).toHaveLength(0);
     |                  ^ Error: expect(received).toHaveLength(expected)
  54 | });
  55 |
```