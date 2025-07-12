# Test info

- Name: SavedViewsManager Headless Component E2E Tests >> Can save and display a view
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/saved-views-manager-headless.spec.ts:133:3

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
    49 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components-worktrees/feat/v2-headless-components/tests/e2e/saved-views-manager-headless.spec.ts:166:71
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
- paragraph: "Total rows on server: 649"
- textbox "Search all columns..."
- img
- button "Quick filter options":
  - text: All Time
  - img
- button "Quick filter options":
  - text: Critical Bugs
  - img
- button "Quick filter options":
  - text: Preset filters
  - img
- button "Saved Views" [expanded]:
  - img
  - text: Saved Views
- text: "649 results Category: Bug"
- button "Remove Category filter": ×
- text: "Priority: Critical, High"
- button "Remove Priority filter": ×
- button "Clear all filters": Clear all
- img
- paragraph: Number of Tasks
- paragraph: "649"
- img
- paragraph: Total Budget
- paragraph: $16,428,052
- img
- paragraph: Average Progress
- paragraph: 50.0%
- img
- paragraph: Budget Remaining
- paragraph: $8,210,950
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
    - row "TASK-60":
      - gridcell "TASK-60"
    - row "TASK-66":
      - gridcell "TASK-66"
    - row "TASK-67":
      - gridcell "TASK-67"
    - row "TASK-88":
      - gridcell "TASK-88"
    - row "TASK-102":
      - gridcell "TASK-102"
    - row "TASK-105":
      - gridcell "TASK-105"
    - row "TASK-111":
      - gridcell "TASK-111"
    - row "TASK-117":
      - gridcell "TASK-117"
    - row "TASK-119":
      - gridcell "TASK-119"
    - row "TASK-122":
      - gridcell "TASK-122"
    - row "TASK-129":
      - gridcell "TASK-129"
    - row "TASK-130":
      - gridcell "TASK-130"
    - row "TASK-140":
      - gridcell "TASK-140"
    - row "TASK-178":
      - gridcell "TASK-178"
    - row "TASK-184":
      - gridcell "TASK-184"
    - row "TASK-198":
      - gridcell "TASK-198"
    - row "TASK-245":
      - gridcell "TASK-245"
    - row "TASK-266":
      - gridcell "TASK-266"
    - row "TASK-298":
      - gridcell "TASK-298"
  - rowgroup:
    - row "The RSS microchip is down, synthesize the wireless capacitor so we can connect the AGP matrix! In Review Critical 🐛 Bug Rosalie Wiza-Beatty Rosalie Wiza-Beatty 7/16/2025 86% $36,547":
      - gridcell "The RSS microchip is down, synthesize the wireless capacitor so we can connect the AGP matrix!"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Rosalie Wiza-Beatty Rosalie Wiza-Beatty":
        - img "Rosalie Wiza-Beatty"
        - text: Rosalie Wiza-Beatty
      - gridcell "7/16/2025"
      - gridcell "86%"
      - gridcell "$36,547"
    - row "indexing the pixel won't do anything, we need to quantify the neural CLI system! Blocked Critical 🐛 Bug Dr. Jacquelyn Pouros Dr. Jacquelyn Pouros 7/10/2025 36% $49,256":
      - gridcell "indexing the pixel won't do anything, we need to quantify the neural CLI system!"
      - gridcell "Blocked"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Dr. Jacquelyn Pouros Dr. Jacquelyn Pouros":
        - img "Dr. Jacquelyn Pouros"
        - text: Dr. Jacquelyn Pouros
      - gridcell "7/10/2025"
      - gridcell "36%"
      - gridcell "$49,256"
    - row "If we index the matrix, we can get to the RSS monitor through the wireless FTP firewall! Testing Critical 🐛 Bug Pamela VonRueden III Pamela VonRueden III 6/28/2025 98% $37,116":
      - gridcell "If we index the matrix, we can get to the RSS monitor through the wireless FTP firewall!"
      - gridcell "Testing"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Pamela VonRueden III Pamela VonRueden III":
        - img "Pamela VonRueden III"
        - text: Pamela VonRueden III
      - gridcell "6/28/2025"
      - gridcell "98%"
      - gridcell "$37,116"
    - row "We need to parse the digital SQL bandwidth! In Progress High 🐛 Bug Misty Nolan Misty Nolan 7/2/2025 47% $43,281":
      - gridcell "We need to parse the digital SQL bandwidth!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Misty Nolan Misty Nolan":
        - img "Misty Nolan"
        - text: Misty Nolan
      - gridcell "7/2/2025"
      - gridcell "47%"
      - gridcell "$43,281"
    - row "We need to input the haptic EXE capacitor! Testing High 🐛 Bug Dr. Jonathan Schuppe Dr. Jonathan Schuppe 7/26/2025 98% $9,096":
      - gridcell "We need to input the haptic EXE capacitor!"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Dr. Jonathan Schuppe Dr. Jonathan Schuppe":
        - img "Dr. Jonathan Schuppe"
        - text: Dr. Jonathan Schuppe
      - gridcell "7/26/2025"
      - gridcell "98%"
      - gridcell "$9,096"
    - row "If we reboot the driver, we can get to the SMTP array through the open-source XML capacitor! Todo High 🐛 Bug Willard Gerhold Willard Gerhold 7/22/2025 76% $47,375":
      - gridcell "If we reboot the driver, we can get to the SMTP array through the open-source XML capacitor!"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Willard Gerhold Willard Gerhold":
        - img "Willard Gerhold"
        - text: Willard Gerhold
      - gridcell "7/22/2025"
      - gridcell "76%"
      - gridcell "$47,375"
    - row "You can't override the interface without backing up the open-source OCR program! Backlog High 🐛 Bug Dr. Blake Pfannerstill Dr. Blake Pfannerstill 7/19/2025 65% $41,783":
      - gridcell "You can't override the interface without backing up the open-source OCR program!"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Dr. Blake Pfannerstill Dr. Blake Pfannerstill":
        - img "Dr. Blake Pfannerstill"
        - text: Dr. Blake Pfannerstill
      - gridcell "7/19/2025"
      - gridcell "65%"
      - gridcell "$41,783"
    - row "We need to transmit the open-source FTP system! Todo Critical 🐛 Bug Mary Upton I Mary Upton I 7/11/2025 57% $7,945":
      - gridcell "We need to transmit the open-source FTP system!"
      - gridcell "Todo"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Mary Upton I Mary Upton I":
        - img "Mary Upton I"
        - text: Mary Upton I
      - gridcell "7/11/2025"
      - gridcell "57%"
      - gridcell "$7,945"
    - row "Try to hack the PNG matrix, maybe it will calculate the 1080p panel! Blocked High 🐛 Bug Austin Sporer-Fisher Austin Sporer-Fisher 7/3/2025 16% $9,310":
      - gridcell "Try to hack the PNG matrix, maybe it will calculate the 1080p panel!"
      - gridcell "Blocked"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Austin Sporer-Fisher Austin Sporer-Fisher":
        - img "Austin Sporer-Fisher"
        - text: Austin Sporer-Fisher
      - gridcell "7/3/2025"
      - gridcell "16%"
      - gridcell "$9,310"
    - row "I'll bypass the haptic HDD card, that should pixel the SCSI pixel! Backlog High 🐛 Bug Ruby Lueilwitz Ruby Lueilwitz 7/1/2025 7% $17,807":
      - gridcell "I'll bypass the haptic HDD card, that should pixel the SCSI pixel!"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Ruby Lueilwitz Ruby Lueilwitz":
        - img "Ruby Lueilwitz"
        - text: Ruby Lueilwitz
      - gridcell "7/1/2025"
      - gridcell "7%"
      - gridcell "$17,807"
    - row "indexing the microchip won't do anything, we need to navigate the bluetooth API array! Todo High 🐛 Bug Jake Kassulke Jake Kassulke 7/9/2025 14% $21,200":
      - gridcell "indexing the microchip won't do anything, we need to navigate the bluetooth API array!"
      - gridcell "Todo"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Jake Kassulke Jake Kassulke":
        - img "Jake Kassulke"
        - text: Jake Kassulke
      - gridcell "7/9/2025"
      - gridcell "14%"
      - gridcell "$21,200"
    - row "Use the virtual AGP monitor, then you can calculate the digital bandwidth! In Progress High 🐛 Bug Lillian Medhurst V Lillian Medhurst V 7/3/2025 5% $11,775":
      - gridcell "Use the virtual AGP monitor, then you can calculate the digital bandwidth!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Lillian Medhurst V Lillian Medhurst V":
        - img "Lillian Medhurst V"
        - text: Lillian Medhurst V
      - gridcell "7/3/2025"
      - gridcell "5%"
      - gridcell "$11,775"
    - row "Use the wireless SQL card, then you can compress the digital application! In Progress High 🐛 Bug Rachael Ledner Sr. Rachael Ledner Sr. 7/5/2025 25% $6,022":
      - gridcell "Use the wireless SQL card, then you can compress the digital application!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Rachael Ledner Sr. Rachael Ledner Sr.":
        - img "Rachael Ledner Sr."
        - text: Rachael Ledner Sr.
      - gridcell "7/5/2025"
      - gridcell "25%"
      - gridcell "$6,022"
    - row "The TCP feed is down, index the wireless protocol so we can generate the EXE driver! Done High 🐛 Bug Mr. Jack Brekke Mr. Jack Brekke 7/11/2025 98% $29,051":
      - gridcell "The TCP feed is down, index the wireless protocol so we can generate the EXE driver!"
      - gridcell "Done"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Mr. Jack Brekke Mr. Jack Brekke":
        - img "Mr. Jack Brekke"
        - text: Mr. Jack Brekke
      - gridcell "7/11/2025"
      - gridcell "98%"
      - gridcell "$29,051"
    - row "Try to transmit the JSON driver, maybe it will hack the 1080p firewall! In Progress Critical 🐛 Bug Derek Senger I Derek Senger I 7/5/2025 15% $38,655":
      - gridcell "Try to transmit the JSON driver, maybe it will hack the 1080p firewall!"
      - gridcell "In Progress"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Derek Senger I Derek Senger I":
        - img "Derek Senger I"
        - text: Derek Senger I
      - gridcell "7/5/2025"
      - gridcell "15%"
      - gridcell "$38,655"
    - row "programming the driver won't do anything, we need to synthesize the redundant JBOD array! In Review High 🐛 Bug Shelia Wisoky Shelia Wisoky 6/19/2025 100% $6,149":
      - gridcell "programming the driver won't do anything, we need to synthesize the redundant JBOD array!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Shelia Wisoky Shelia Wisoky":
        - img "Shelia Wisoky"
        - text: Shelia Wisoky
      - gridcell "6/19/2025"
      - gridcell "100%"
      - gridcell "$6,149"
    - row "If we compress the system, we can get to the COM firewall through the 1080p DRAM program! In Progress High 🐛 Bug Alicia Kautzer Alicia Kautzer 6/15/2025 29% $6,844":
      - gridcell "If we compress the system, we can get to the COM firewall through the 1080p DRAM program!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Alicia Kautzer Alicia Kautzer":
        - img "Alicia Kautzer"
        - text: Alicia Kautzer
      - gridcell "6/15/2025"
      - gridcell "29%"
      - gridcell "$6,844"
    - row "Try to parse the COM alarm, maybe it will copy the back-end application! Testing High 🐛 Bug Manuel McCullough Manuel McCullough 8/2/2025 46% $42,652":
      - gridcell "Try to parse the COM alarm, maybe it will copy the back-end application!"
      - gridcell "Testing"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Manuel McCullough Manuel McCullough":
        - img "Manuel McCullough"
        - text: Manuel McCullough
      - gridcell "8/2/2025"
      - gridcell "46%"
      - gridcell "$42,652"
    - row "I'll calculate the digital TCP feed, that should card the SMS capacitor! In Progress High 🐛 Bug Lorenzo Renner Lorenzo Renner 7/8/2025 90% $13,021":
      - gridcell "I'll calculate the digital TCP feed, that should card the SMS capacitor!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Lorenzo Renner Lorenzo Renner":
        - img "Lorenzo Renner"
        - text: Lorenzo Renner
      - gridcell "7/8/2025"
      - gridcell "90%"
      - gridcell "$13,021"
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
- textbox "View Name": Bug Filter View
- text: Description (optional)
- textbox "Description (optional)": Shows only bug-related tasks
- text: Category
- textbox "Category"
- button "Save View" [disabled]
- button "Cancel"
```

# Test source

```ts
   66 |     const panel = page.locator("[data-saved-views-panel]");
   67 |     await expect(panel).toBeVisible();
   68 |
   69 |     // Check panel structure
   70 |     await expect(panel.locator("[data-saved-views-title]")).toHaveText(
   71 |       "Saved Views",
   72 |     );
   73 |     await expect(panel.locator("[data-saved-views-close]")).toBeVisible();
   74 |     await expect(panel.locator("[data-saved-views-actions]")).toBeVisible();
   75 |     await expect(panel.locator("[data-saved-views-list]")).toBeVisible();
   76 |
   77 |     // Check empty state
   78 |     await expect(panel.locator("[data-empty-message]")).toHaveText(
   79 |       "No saved views yet",
   80 |     );
   81 |
   82 |     // Close the panel
   83 |     await page.click("[data-saved-views-close]");
   84 |     await expect(panel).not.toBeVisible();
   85 |   });
   86 |
   87 |   test("Save view dialog opens and validates input", async ({ page }) => {
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
> 166 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
      |                                                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  188 |     await dialog.locator('[data-action="save"][data-primary="true"]').click();
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
```