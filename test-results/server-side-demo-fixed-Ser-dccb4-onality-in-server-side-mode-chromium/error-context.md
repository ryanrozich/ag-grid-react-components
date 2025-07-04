# Test info

- Name: Server-Side Demo Fixed >> should handle search functionality in server-side mode
- Location: /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo-fixed.spec.ts:97:3

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: locator('text="results"')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('text="results"')

    at /Users/ryan/code-repos/github/ryanrozich/ag-grid-react-components/tests/e2e/server-side-demo-fixed.spec.ts:112:50
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
- navigation:
  - button "Client-Side Data"
  - button "Server-Side DataAPI"
- button "Dismiss banner":
  - img
- heading "🚀 Server-Side Row Model Demo" [level=3]
- paragraph:
  - text: This demo uses AG Grid's Server-Side Row Model with a real API backend. Data is fetched on-demand as you scroll, filter, and sort. The API endpoint is
  - code: /api/tasks
- paragraph: "Total rows on server: 1,297"
- text: Total Tasks 1,297 From server Total Budget $33,540,676 Average Progress 49% Budget Remaining $16,630,295
- textbox "Search all columns...": bug
- text: 1,297 results
- grid:
  - rowgroup:
    - row "Task ID":
      - columnheader "Task ID"
    - row:
      - gridcell
  - rowgroup:
    - row "Title Status Priority Category Assignee Due Date":
      - columnheader "Title"
      - columnheader "Status"
      - columnheader "Priority"
      - columnheader "Category"
      - columnheader "Assignee"
      - columnheader "Due Date"
    - row "Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu Open Filter Menu":
      - gridcell "Open Filter Menu":
        - textbox "Title Filter Input"
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Status Filter Input" [disabled]
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Priority Filter Input" [disabled]
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Category Filter Input" [disabled]
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Assignee Filter Input"
        - button "Open Filter Menu"
      - gridcell "Open Filter Menu":
        - textbox "Due Date Filter Input" [disabled]
        - button "Open Filter Menu"
  - rowgroup:
    - row "TASK-1":
      - gridcell "TASK-1"
    - row "TASK-10":
      - gridcell "TASK-10"
    - row "TASK-29":
      - gridcell "TASK-29"
    - row "TASK-38":
      - gridcell "TASK-38"
    - row "TASK-47":
      - gridcell "TASK-47"
    - row "TASK-52":
      - gridcell "TASK-52"
    - row "TASK-62":
      - gridcell "TASK-62"
    - row "TASK-63":
      - gridcell "TASK-63"
    - row "TASK-70":
      - gridcell "TASK-70"
    - row "TASK-83":
      - gridcell "TASK-83"
    - row "TASK-84":
      - gridcell "TASK-84"
  - rowgroup:
    - row "The GB array is down, connect the haptic panel so we can navigate the CSS array! Todo Low 🐛 Bug Dr. Malcolm Sawayn Dr. Malcolm Sawayn 7/12/2025":
      - gridcell "The GB array is down, connect the haptic panel so we can navigate the CSS array!"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Dr. Malcolm Sawayn Dr. Malcolm Sawayn":
        - img "Dr. Malcolm Sawayn"
        - text: Dr. Malcolm Sawayn
      - gridcell "7/12/2025"
    - row "We need to parse the neural UTF8 system! In Review High 🐛 Bug Myrtle Fay Myrtle Fay 7/13/2025":
      - gridcell "We need to parse the neural UTF8 system!"
      - gridcell "In Review"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Myrtle Fay Myrtle Fay":
        - img "Myrtle Fay"
        - text: Myrtle Fay
      - gridcell "7/13/2025"
    - row "We need to synthesize the back-end AI feed! Backlog High 🐛 Bug Phillip Lynch-Schiller Phillip Lynch-Schiller 7/5/2025":
      - gridcell "We need to synthesize the back-end AI feed!"
      - gridcell "Backlog"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Phillip Lynch-Schiller Phillip Lynch-Schiller":
        - img "Phillip Lynch-Schiller"
        - text: Phillip Lynch-Schiller
      - gridcell "7/5/2025"
    - row "The SSL alarm is down, navigate the mobile sensor so we can program the JSON interface! In Review Low 🐛 Bug Mark Wolff Mark Wolff 6/21/2025":
      - gridcell "The SSL alarm is down, navigate the mobile sensor so we can program the JSON interface!"
      - gridcell "In Review"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Mark Wolff Mark Wolff":
        - img "Mark Wolff"
        - text: Mark Wolff
      - gridcell "6/21/2025"
    - row "We need to compress the primary TCP hard drive! Backlog Low 🐛 Bug Stewart Lubowitz Stewart Lubowitz 6/19/2025":
      - gridcell "We need to compress the primary TCP hard drive!"
      - gridcell "Backlog"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Stewart Lubowitz Stewart Lubowitz":
        - img "Stewart Lubowitz"
        - text: Stewart Lubowitz
      - gridcell "6/19/2025"
    - row "I'll hack the open-source CLI circuit, that should transmitter the SQL bus! In Progress Medium 🐛 Bug Joel Romaguera Joel Romaguera 6/25/2025":
      - gridcell "I'll hack the open-source CLI circuit, that should transmitter the SQL bus!"
      - gridcell "In Progress"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Joel Romaguera Joel Romaguera":
        - img "Joel Romaguera"
        - text: Joel Romaguera
      - gridcell "6/25/2025"
    - row "We need to override the primary ADP application! Todo Medium 🐛 Bug Dr. Alberto Little Dr. Alberto Little 6/25/2025":
      - gridcell "We need to override the primary ADP application!"
      - gridcell "Todo"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Dr. Alberto Little Dr. Alberto Little":
        - img "Dr. Alberto Little"
        - text: Dr. Alberto Little
      - gridcell "6/25/2025"
    - row "Try to input the GB monitor, maybe it will bypass the redundant hard drive! In Progress High 🐛 Bug Barbara Towne Barbara Towne 7/4/2025":
      - gridcell "Try to input the GB monitor, maybe it will bypass the redundant hard drive!"
      - gridcell "In Progress"
      - gridcell "High"
      - gridcell "🐛 Bug"
      - gridcell "Barbara Towne Barbara Towne":
        - img "Barbara Towne"
        - text: Barbara Towne
      - gridcell "7/4/2025"
    - row "If we copy the port, we can get to the AI panel through the auxiliary UTF8 driver! Todo Low 🐛 Bug Daniel Gottlieb Daniel Gottlieb 6/20/2025":
      - gridcell "If we copy the port, we can get to the AI panel through the auxiliary UTF8 driver!"
      - gridcell "Todo"
      - gridcell "Low"
      - gridcell "🐛 Bug"
      - gridcell "Daniel Gottlieb Daniel Gottlieb":
        - img "Daniel Gottlieb"
        - text: Daniel Gottlieb
      - gridcell "6/20/2025"
    - row "I'll index the online PNG bus, that should port the DRAM card! In Review Critical 🐛 Bug Jane Goyette Jane Goyette 6/28/2025":
      - gridcell "I'll index the online PNG bus, that should port the DRAM card!"
      - gridcell "In Review"
      - gridcell "Critical"
      - gridcell "🐛 Bug"
      - gridcell "Jane Goyette Jane Goyette":
        - img "Jane Goyette"
        - text: Jane Goyette
      - gridcell "6/28/2025"
    - row "We need to bypass the redundant CSS array! Blocked Medium 🐛 Bug Joey MacGyver-Dibbert Joey MacGyver-Dibbert 7/22/2025":
      - gridcell "We need to bypass the redundant CSS array!"
      - gridcell "Blocked"
      - gridcell "Medium"
      - gridcell "🐛 Bug"
      - gridcell "Joey MacGyver-Dibbert Joey MacGyver-Dibbert":
        - img "Joey MacGyver-Dibbert"
        - text: Joey MacGyver-Dibbert
      - gridcell "7/22/2025"
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup
  - rowgroup:
    - row "TOTAL":
      - gridcell "TOTAL"
  - rowgroup:
    - row "Grand Total":
      - gridcell "Grand Total"
      - gridcell
      - gridcell
      - gridcell
      - gridcell
      - gridcell
  - rowgroup
- tablist:
  - tab "Columns"
  - tab "Filters" [expanded]
- tabpanel "Filters":
  - textbox "Filter Columns Input"
  - text: Title Status Priority Category Assignee Due Date Progress Budget Spent Remaining
- status
- status
- status
- text: "API Status: /api"
```

# Test source

```ts
   12 |       if (msg.type() === "error") {
   13 |         const text = msg.text();
   14 |         // Ignore AG Grid license warnings
   15 |         if (!text.includes("AG Grid Enterprise License") && 
   16 |             !text.includes("License Key Not Found") &&
   17 |             !text.includes("***")) {
   18 |           criticalErrors.push(text);
   19 |         }
   20 |       }
   21 |     });
   22 |
   23 |     // Click on server-side tab
   24 |     await page.click('button:has-text("Server-Side Data")');
   25 |
   26 |     // Wait for the server-side demo to load
   27 |     await page.waitForLoadState("networkidle");
   28 |     await page.waitForTimeout(1000); // Give time for any errors to surface
   29 |
   30 |     // Check that no critical console errors occurred
   31 |     expect(criticalErrors).toHaveLength(0);
   32 |   });
   33 |
   34 |   test("should render server-side demo components", async ({ page }) => {
   35 |     // Switch to server-side tab
   36 |     await page.click('button:has-text("Server-Side Data")');
   37 |
   38 |     // Check that the banner is visible
   39 |     await expect(page.locator('text="Server-Side Row Model Demo"')).toBeVisible({ timeout: 10000 });
   40 |
   41 |     // Check that the API status is shown
   42 |     await expect(page.locator('text="API Status:"')).toBeVisible();
   43 |
   44 |     // Check that stats are displayed
   45 |     await expect(page.locator('text="Total Tasks"')).toBeVisible();
   46 |     await expect(page.locator('text="Total Budget"')).toBeVisible();
   47 |   });
   48 |
   49 |   test("should display the AG Grid with server-side data", async ({ page }) => {
   50 |     // Switch to server-side tab
   51 |     await page.click('button:has-text("Server-Side Data")');
   52 |
   53 |     // Wait for the grid to be visible
   54 |     const grid = page.locator(".ag-root-wrapper");
   55 |     await expect(grid).toBeVisible({ timeout: 10000 });
   56 |
   57 |     // Check that headers are visible
   58 |     await expect(page.locator(".ag-header-row")).toBeVisible();
   59 |
   60 |     // Check for specific server-side headers
   61 |     await expect(page.locator('.ag-header-cell-text:has-text("Task ID")')).toBeVisible();
   62 |     await expect(page.locator('.ag-header-cell-text:has-text("Title")')).toBeVisible();
   63 |     
   64 |     // Wait for data rows to appear
   65 |     await page.waitForSelector(".ag-row", { timeout: 10000 });
   66 |     
   67 |     // Verify data is loaded
   68 |     const rows = await page.locator(".ag-row").count();
   69 |     expect(rows).toBeGreaterThan(0);
   70 |   });
   71 |
   72 |   test("should not have incompatible status bar components", async ({ page }) => {
   73 |     // Monitor for specific AG Grid warnings
   74 |     let hasIncompatibleComponents = false;
   75 |     page.on("console", (msg) => {
   76 |       if (msg.type() === "warning") {
   77 |         const text = msg.text();
   78 |         if (text.includes("agTotalAndFilteredRowCountComponent") ||
   79 |             text.includes("agTotalRowCountComponent should only be used with the client side") ||
   80 |             text.includes("agFilteredRowCountComponent should only be used with the client side")) {
   81 |           hasIncompatibleComponents = true;
   82 |         }
   83 |       }
   84 |     });
   85 |
   86 |     // Switch to server-side tab
   87 |     await page.click('button:has-text("Server-Side Data")');
   88 |
   89 |     // Wait for the grid to render
   90 |     await page.waitForSelector(".ag-root-wrapper", { timeout: 10000 });
   91 |     await page.waitForTimeout(1000);
   92 |
   93 |     // Verify no incompatible components were used
   94 |     expect(hasIncompatibleComponents).toBe(false);
   95 |   });
   96 |
   97 |   test("should handle search functionality in server-side mode", async ({ page }) => {
   98 |     // Switch to server-side tab
   99 |     await page.click('button:has-text("Server-Side Data")');
  100 |
  101 |     // Wait for search input
  102 |     const searchInput = page.locator('input[placeholder="Search all columns..."]');
  103 |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  104 |
  105 |     // Type a search term
  106 |     await searchInput.fill("bug");
  107 |
  108 |     // Wait for debounce and check results
  109 |     await page.waitForTimeout(500);
  110 |     
  111 |     // Verify search is working by checking for results indicator
> 112 |     await expect(page.locator('text="results"')).toBeVisible();
      |                                                  ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  113 |   });
  114 |
  115 |   test("server-side data should be different from client-side", async ({ page }) => {
  116 |     // First check client-side headers
  117 |     await page.waitForSelector(".ag-header-cell-text");
  118 |     const clientHeaders = await page.locator(".ag-header-cell-text").allTextContents();
  119 |     
  120 |     // Switch to server-side
  121 |     await page.click('button:has-text("Server-Side Data")');
  122 |     await page.waitForTimeout(1000);
  123 |     
  124 |     // Check server-side headers
  125 |     await page.waitForSelector(".ag-header-cell-text");
  126 |     const serverHeaders = await page.locator(".ag-header-cell-text").allTextContents();
  127 |     
  128 |     // Headers should be different (Task ID vs ID, Title vs Task, etc.)
  129 |     expect(serverHeaders).toContain("Task ID");
  130 |     expect(serverHeaders).toContain("Title");
  131 |     expect(clientHeaders).not.toContain("Task ID");
  132 |     expect(clientHeaders).not.toContain("Title");
  133 |   });
  134 | });
```