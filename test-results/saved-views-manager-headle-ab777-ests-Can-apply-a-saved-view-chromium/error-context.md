# Test info

- Name: SavedViewsManager Headless Component E2E Tests >> Can apply a saved view
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/saved-views-manager-headless.spec.ts:181:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-save-view-dialog]').locator('[data-action="save"][data-primary="true"]')
    - locator resolved to <button disabled data-action="save" data-primary="true">Save View</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    50 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/saved-views-manager-headless.spec.ts:188:71
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
  - button "Show version details": v0.1.0+35 feat/headless-refactor
  - img
  - text: MIT License
  - link "GitHub":
    - /url: https://github.com/ryanrozich/ag-grid-react-components
    - img
    - text: GitHub
- heading "Project Tasks" [level=1]
- paragraph: Manage and track your team's progress
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
- button "Dismiss banner":
  - img
- heading "🚀 Server-Side Row Model Demo" [level=3]
- paragraph:
  - text: This demo uses AG Grid's Server-Side Row Model with a real API backend. Data is fetched on-demand as you scroll, filter, and sort. The API endpoint is
  - code: /api/tasks
- paragraph: "Total rows on server: 10,000"
- textbox "Search all columns..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: Task type
  - img
- button "Quick filter options":
  - text: Preset filters
  - img
- button "Saved Views" [expanded]:
  - img
  - text: Saved Views
- text: 10,000 results
- img
- paragraph: Number of Tasks
- paragraph: 10,000
- img
- paragraph: Total Budget
- paragraph: $255,599,465
- img
- paragraph: Average Progress
- paragraph: 50.0%
- img
- paragraph: Budget Remaining
- paragraph: $126,627,916
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
    - row "If we hack the circuit, we can get to the DNS microchip through the redundant HEX bus! Blocked Medium ♻️ Refactor Ricardo Stark Ricardo Stark 6/26/2025 1% $36,368":
      - gridcell "If we hack the circuit, we can get to the DNS microchip through the redundant HEX bus!"
      - gridcell "Blocked"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Ricardo Stark Ricardo Stark":
        - img "Ricardo Stark"
        - text: Ricardo Stark
      - gridcell "6/26/2025"
      - gridcell "1%"
      - gridcell "$36,368"
    - row "I'll quantify the cross-platform HDD driver, that should card the USB interface! In Review High 🔧 DevOps Marco Senger Marco Senger 6/22/2025 22% $9,689":
      - gridcell "I'll quantify the cross-platform HDD driver, that should card the USB interface!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🔧 DevOps"
      - gridcell "Marco Senger Marco Senger":
        - img "Marco Senger"
        - text: Marco Senger
      - gridcell "6/22/2025"
      - gridcell "22%"
      - gridcell "$9,689"
    - row "Use the bluetooth SSL card, then you can override the cross-platform card! In Progress High 🧪 Testing Mabel Weber Mabel Weber 7/20/2025 66% $6,404":
      - gridcell "Use the bluetooth SSL card, then you can override the cross-platform card!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🧪 Testing"
      - gridcell "Mabel Weber Mabel Weber":
        - img "Mabel Weber"
        - text: Mabel Weber
      - gridcell "7/20/2025"
      - gridcell "66%"
      - gridcell "$6,404"
    - row "If we input the driver, we can get to the SMTP system through the redundant COM circuit! Todo High ⚡ Performance Miss Betsy Donnelly Miss Betsy Donnelly 7/10/2025 26% $20,589":
      - gridcell "If we input the driver, we can get to the SMTP system through the redundant COM circuit!"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "⚡ Performance"
      - gridcell "Miss Betsy Donnelly Miss Betsy Donnelly":
        - img "Miss Betsy Donnelly"
        - text: Miss Betsy Donnelly
      - gridcell "7/10/2025"
      - gridcell "26%"
      - gridcell "$20,589"
    - row "You can't bypass the bus without transmitting the online OCR feed! Done Low 🧪 Testing Erin Ortiz Erin Ortiz 7/15/2025 3% $39,329":
      - gridcell "You can't bypass the bus without transmitting the online OCR feed!"
      - gridcell "Done"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Erin Ortiz Erin Ortiz":
        - img "Erin Ortiz"
        - text: Erin Ortiz
      - gridcell "7/15/2025"
      - gridcell "3%"
      - gridcell "$39,329"
    - row "The SMTP bus is down, navigate the back-end protocol so we can program the IP bandwidth! Done Low 🐛 Bug Lorraine Jakubowski Lorraine Jakubowski 7/14/2025 96% $20,389":
      - gridcell "The SMTP bus is down, navigate the back-end protocol so we can program the IP bandwidth!"
      - gridcell "Done"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Lorraine Jakubowski Lorraine Jakubowski":
        - img "Lorraine Jakubowski"
        - text: Lorraine Jakubowski
      - gridcell "7/14/2025"
      - gridcell "96%"
      - gridcell "$20,389"
    - row "We need to program the mobile ASCII pixel! Blocked Low 🔧 DevOps Miss Yvette Reilly Miss Yvette Reilly 7/2/2025 77% $4,795":
      - gridcell "We need to program the mobile ASCII pixel!"
      - gridcell "Blocked"
      - gridcell "Low"
      - gridcell "🔧 DevOps"
      - gridcell "Miss Yvette Reilly Miss Yvette Reilly":
        - img "Miss Yvette Reilly"
        - text: Miss Yvette Reilly
      - gridcell "7/2/2025"
      - gridcell "77%"
      - gridcell "$4,795"
    - row "If we quantify the transmitter, we can get to the SSL protocol through the multi-byte SSD protocol! Blocked Low 🧪 Testing Dr. Jon Purdy Dr. Jon Purdy 7/8/2025 25% $30,005":
      - gridcell "If we quantify the transmitter, we can get to the SSL protocol through the multi-byte SSD protocol!"
      - gridcell "Blocked"
      - gridcell "Low"
      - gridcell "🧪 Testing"
      - gridcell "Dr. Jon Purdy Dr. Jon Purdy":
        - img "Dr. Jon Purdy"
        - text: Dr. Jon Purdy
      - gridcell "7/8/2025"
      - gridcell "25%"
      - gridcell "$30,005"
    - row "I'll generate the optical SMTP program, that should port the DRAM bus! Todo Critical ✨ Feature Lance Hessel Lance Hessel 7/7/2025 72% $15,939":
      - gridcell "I'll generate the optical SMTP program, that should port the DRAM bus!"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "✨ Feature"
      - gridcell "Lance Hessel Lance Hessel":
        - img "Lance Hessel"
        - text: Lance Hessel
      - gridcell "7/7/2025"
      - gridcell "72%"
      - gridcell "$15,939"
    - row "transmitting the monitor won't do anything, we need to program the open-source EXE interface! Blocked Medium 🔧 DevOps Dwight Wiegand Dwight Wiegand 7/10/2025 72% $7,325":
      - gridcell "transmitting the monitor won't do anything, we need to program the open-source EXE interface!"
      - gridcell "Blocked"
      - gridcell "Medium"
      - gridcell "🔧 DevOps"
      - gridcell "Dwight Wiegand Dwight Wiegand":
        - img "Dwight Wiegand"
        - text: Dwight Wiegand
      - gridcell "7/10/2025"
      - gridcell "72%"
      - gridcell "$7,325"
    - row "The PCI feed is down, back up the back-end transmitter so we can bypass the AI program! Backlog Medium ✨ Feature Betsy Brown Betsy Brown 7/26/2025 1% $41,793":
      - gridcell "The PCI feed is down, back up the back-end transmitter so we can bypass the AI program!"
      - gridcell "Backlog"
      - gridcell "Medium"
      - gridcell "✨ Feature"
      - gridcell "Betsy Brown Betsy Brown":
        - img "Betsy Brown"
        - text: Betsy Brown
      - gridcell "7/26/2025"
      - gridcell "1%"
      - gridcell "$41,793"
    - row "If we back up the bandwidth, we can get to the XSS interface through the open-source HEX circuit! In Progress Medium ⚡ Performance Mr. Shawn Hettinger Jr. Mr. Shawn Hettinger Jr. 7/24/2025 83% $28,411":
      - gridcell "If we back up the bandwidth, we can get to the XSS interface through the open-source HEX circuit!"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "⚡ Performance"
      - gridcell "Mr. Shawn Hettinger Jr. Mr. Shawn Hettinger Jr.":
        - img "Mr. Shawn Hettinger Jr."
        - text: Mr. Shawn Hettinger Jr.
      - gridcell "7/24/2025"
      - gridcell "83%"
      - gridcell "$28,411"
    - row "We need to back up the digital SSL protocol! Todo Medium 🔒 Security Shane Ankunding IV Shane Ankunding IV 6/27/2025 61% $32,088":
      - gridcell "We need to back up the digital SSL protocol!"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Shane Ankunding IV Shane Ankunding IV":
        - img "Shane Ankunding IV"
        - text: Shane Ankunding IV
      - gridcell "6/27/2025"
      - gridcell "61%"
      - gridcell "$32,088"
    - row "You can't copy the matrix without synthesizing the digital IB system! In Progress Low ⚡ Performance Sue Crist Sue Crist 7/29/2025 79% $4,630":
      - gridcell "You can't copy the matrix without synthesizing the digital IB system!"
      - gridcell "In Progress"
      - gridcell "Low"
      - gridcell "⚡ Performance"
      - gridcell "Sue Crist Sue Crist":
        - img "Sue Crist"
        - text: Sue Crist
      - gridcell "7/29/2025"
      - gridcell "79%"
      - gridcell "$4,630"
    - row "The AI sensor is down, hack the open-source card so we can navigate the PCI capacitor! In Progress Critical ♻️ Refactor Stephanie Steuber Stephanie Steuber 7/14/2025 90% $18,938":
      - gridcell "The AI sensor is down, hack the open-source card so we can navigate the PCI capacitor!"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "♻️ Refactor"
      - gridcell "Stephanie Steuber Stephanie Steuber":
        - img "Stephanie Steuber"
        - text: Stephanie Steuber
      - gridcell "7/14/2025"
      - gridcell "90%"
      - gridcell "$18,938"
    - row "Try to transmit the TLS transmitter, maybe it will input the redundant port! Testing Low 🔒 Security Tim McDermott DDS Tim McDermott DDS 6/20/2025 45% $19,390":
      - gridcell "Try to transmit the TLS transmitter, maybe it will input the redundant port!"
      - gridcell "Testing"
      - gridcell "Low"
      - gridcell "🔒 Security"
      - gridcell "Tim McDermott DDS Tim McDermott DDS":
        - img "Tim McDermott DDS"
        - text: Tim McDermott DDS
      - gridcell "6/20/2025"
      - gridcell "45%"
      - gridcell "$19,390"
    - row "Use the cross-platform JBOD sensor, then you can calculate the mobile bandwidth! Blocked Medium ♻️ Refactor Bill Hills Bill Hills 7/20/2025 62% $29,810":
      - gridcell "Use the cross-platform JBOD sensor, then you can calculate the mobile bandwidth!"
      - gridcell "Blocked"
      - gridcell "Medium"
      - gridcell "♻️ Refactor"
      - gridcell "Bill Hills Bill Hills":
        - img "Bill Hills"
        - text: Bill Hills
      - gridcell "7/20/2025"
      - gridcell "62%"
      - gridcell "$29,810"
    - row "I'll navigate the wireless SSL program, that should array the UDP microchip! Blocked Critical 🔒 Security Cynthia Gleichner Cynthia Gleichner 7/20/2025 65% $49,241":
      - gridcell "I'll navigate the wireless SSL program, that should array the UDP microchip!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🔒 Security"
      - gridcell "Cynthia Gleichner Cynthia Gleichner":
        - img "Cynthia Gleichner"
        - text: Cynthia Gleichner
      - gridcell "7/20/2025"
      - gridcell "65%"
      - gridcell "$49,241"
    - row "If we navigate the array, we can get to the XML program through the auxiliary ASCII panel! Testing Medium 🔒 Security Miss Eula Ullrich Miss Eula Ullrich 6/20/2025 66% $4,712":
      - gridcell "If we navigate the array, we can get to the XML program through the auxiliary ASCII panel!"
      - gridcell "Testing"
      - gridcell "Medium"
      - gridcell "🔒 Security"
      - gridcell "Miss Eula Ullrich Miss Eula Ullrich":
        - img "Miss Eula Ullrich"
        - text: Miss Eula Ullrich
      - gridcell "6/20/2025"
      - gridcell "66%"
      - gridcell "$4,712"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "TOTAL":
      - gridcell "TOTAL"
  - rowgroup:
    - row "Grand Total 50% $255,599,465":
      - gridcell "Grand Total"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell "50%"
      - gridcell "$255,599,465"
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters"
- status
- status
- status
- text: "API Status: /api"
- heading "Saved Views" [level=3]
- button "Close saved views":
  - img
- button "Save Current":
  - img
  - text: Save Current
- button "Export":
  - img
  - text: Export
- button "Import":
  - img
  - text: Import
- paragraph: No saved views yet
- paragraph: Save your current filters to create a view
- heading "Save Current View" [level=2]
- text: View Name
- textbox "View Name": Test Tasks View
- text: Description (optional)
- textbox "Description (optional)"
- text: Category
- textbox "Category"
- button "Save View" [disabled]
- button "Cancel"
```

# Test source

```ts
   88 |     // Open SavedViewsManager
   89 |     await page.click("[data-saved-views-trigger]");
   90 |
   91 |     // Wait for panel to be visible
   92 |     await page.waitForSelector("[data-saved-views-panel]", {
   93 |       state: "visible",
   94 |     });
   95 |
   96 |     // Click Save Current button
   97 |     await page.click('[data-action="save"]');
   98 |
   99 |     // Wait for dialog to appear
  100 |     await page.waitForSelector("[data-save-view-dialog]", {
  101 |       state: "visible",
  102 |       timeout: 10000,
  103 |     });
  104 |
  105 |     // Check that dialog is visible
  106 |     const dialog = page.locator("[data-save-view-dialog]");
  107 |     await expect(dialog).toBeVisible();
  108 |
  109 |     // Check dialog structure
  110 |     await expect(dialog.locator("[data-dialog-title]")).toHaveText(
  111 |       "Save Current View",
  112 |     );
  113 |     await expect(dialog.locator("[data-field-input]")).toBeVisible();
  114 |     await expect(dialog.locator("[data-field-textarea]")).toBeVisible();
  115 |
  116 |     // Check that save button is disabled when name is empty
  117 |     const saveButton = dialog.locator(
  118 |       '[data-action="save"][data-primary="true"]',
  119 |     );
  120 |     await expect(saveButton).toBeDisabled();
  121 |
  122 |     // Type a view name
  123 |     await dialog.locator("[data-field-input]").fill("Test View");
  124 |
  125 |     // Save button should now be enabled
  126 |     await expect(saveButton).toBeEnabled();
  127 |
  128 |     // Close dialog
  129 |     await dialog.locator('[data-action="cancel"]').click();
  130 |     await expect(dialog).not.toBeVisible();
  131 |   });
  132 |
  133 |   test("Can save and display a view", async ({ page }) => {
  134 |     // Wait for grid to be fully loaded
  135 |     await page.waitForSelector(".ag-header-cell", {
  136 |       state: "visible",
  137 |       timeout: 10000,
  138 |     });
  139 |
  140 |     // Apply a filter using the quick filter dropdown instead
  141 |     const taskTypeFilter = page.locator('button:has-text("Task type")');
  142 |     if (await taskTypeFilter.isVisible()) {
  143 |       await taskTypeFilter.click();
  144 |       await page.waitForTimeout(500);
  145 |       // Select an option from the dropdown
  146 |       const bugOption = page.locator('text="Critical Bugs"').first();
  147 |       if (await bugOption.isVisible()) {
  148 |         await bugOption.click();
  149 |       }
  150 |     }
  151 |
  152 |     // Open SavedViewsManager
  153 |     await page.click("[data-saved-views-trigger]");
  154 |
  155 |     // Click Save Current
  156 |     await page.click('[data-action="save"]');
  157 |
  158 |     // Fill in the form
  159 |     const dialog = page.locator("[data-save-view-dialog]");
  160 |     await dialog.locator("[data-field-input]").fill("Bug Filter View");
  161 |     await dialog
  162 |       .locator("[data-field-textarea]")
  163 |       .fill("Shows only bug-related tasks");
  164 |
  165 |     // Save the view
  166 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
  167 |
  168 |     // Dialog should close
  169 |     await expect(dialog).not.toBeVisible();
  170 |
  171 |     // Check that the view appears in the list
  172 |     const viewItem = page
  173 |       .locator("[data-view-item]")
  174 |       .filter({ hasText: "Bug Filter View" });
  175 |     await expect(viewItem).toBeVisible();
  176 |
  177 |     // View should not be active initially
  178 |     await expect(viewItem).not.toHaveAttribute("data-active", "true");
  179 |   });
  180 |
  181 |   test("Can apply a saved view", async ({ page }) => {
  182 |     // First save a view
  183 |     await page.click("[data-saved-views-trigger]");
  184 |     await page.click('[data-action="save"]');
  185 |
  186 |     const dialog = page.locator("[data-save-view-dialog]");
  187 |     await dialog.locator("[data-field-input]").fill("Test Tasks View");
> 188 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
      |                                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  189 |
  190 |     // Reload to clear any state
  191 |     await page.reload();
  192 |     await page.waitForSelector(".ag-theme-custom", { timeout: 10000 });
  193 |     await page.click("text=Server-Side Data");
  194 |     await page.waitForSelector("[data-saved-views-trigger]", { timeout: 5000 });
  195 |
  196 |     // Apply the saved view
  197 |     await page.click("[data-saved-views-trigger]");
  198 |     await page.click('[data-view-button]:has-text("Test Tasks View")');
  199 |
  200 |     // Check that the view is now active
  201 |     const viewItem = page
  202 |       .locator("[data-view-item]")
  203 |       .filter({ hasText: "Test Tasks View" });
  204 |     await expect(viewItem).toHaveAttribute("data-active", "true");
  205 |
  206 |     // Check that the indicator appears
  207 |     await expect(
  208 |       page.locator("[data-saved-views-trigger] [data-indicator]"),
  209 |     ).toBeVisible();
  210 |   });
  211 |
  212 |   test("Can set a default view", async ({ page }) => {
  213 |     // Save a view first
  214 |     await page.click("[data-saved-views-trigger]");
  215 |     await page.click('[data-action="save"]');
  216 |
  217 |     const dialog = page.locator("[data-save-view-dialog]");
  218 |     await dialog.locator("[data-field-input]").fill("Default View");
  219 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
  220 |
  221 |     // Set as default
  222 |     await page.hover("[data-view-item]");
  223 |     await page.click('[data-action="set-default"]');
  224 |
  225 |     // Check that the star indicator appears
  226 |     await expect(page.locator("[data-default-indicator]")).toBeVisible();
  227 |   });
  228 |
  229 |   test("Can delete a saved view", async ({ page }) => {
  230 |     // Save a view first
  231 |     await page.click("[data-saved-views-trigger]");
  232 |     await page.click('[data-action="save"]');
  233 |
  234 |     const dialog = page.locator("[data-save-view-dialog]");
  235 |     await dialog.locator("[data-field-input]").fill("View to Delete");
  236 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
  237 |
  238 |     // Delete the view
  239 |     await page.hover("[data-view-item]");
  240 |
  241 |     // Handle confirmation dialog
  242 |     page.on("dialog", (dialog) => dialog.accept());
  243 |     await page.click('[data-action="delete"]');
  244 |
  245 |     // View should be removed
  246 |     await expect(page.locator("[data-view-item]")).not.toBeVisible();
  247 |     await expect(page.locator("[data-empty-message]")).toBeVisible();
  248 |   });
  249 |
  250 |   test("Export and import functionality", async ({ page }) => {
  251 |     // Save a view
  252 |     await page.click("[data-saved-views-trigger]");
  253 |     await page.click('[data-action="save"]');
  254 |
  255 |     const dialog = page.locator("[data-save-view-dialog]");
  256 |     await dialog.locator("[data-field-input]").fill("Export Test View");
  257 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
  258 |
  259 |     // Test export button
  260 |     await page.click("[data-saved-views-trigger]");
  261 |     const exportButton = page.locator('[data-action="export"]');
  262 |     await expect(exportButton).toBeEnabled();
  263 |
  264 |     // Set up download listener
  265 |     const downloadPromise = page.waitForEvent("download");
  266 |     await exportButton.click();
  267 |     const download = await downloadPromise;
  268 |
  269 |     // Verify filename pattern
  270 |     expect(download.suggestedFilename()).toMatch(
  271 |       /saved-views-\d{4}-\d{2}-\d{2}\.json/,
  272 |     );
  273 |
  274 |     // Test import button
  275 |     const importButton = page.locator('[data-action="import"]');
  276 |     await expect(importButton).toBeVisible();
  277 |   });
  278 |
  279 |   test("CategorySelector in save dialog works", async ({ page }) => {
  280 |     // Open save dialog
  281 |     await page.click("[data-saved-views-trigger]");
  282 |     await page.click('[data-action="save"]');
  283 |
  284 |     // Check that CategorySelector is present
  285 |     const categorySelector = page.locator("#view-category");
  286 |     await expect(categorySelector).toBeVisible();
  287 |
  288 |     // Click to open dropdown
```