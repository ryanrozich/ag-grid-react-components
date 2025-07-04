# E2E Test Refactoring Example

## Before (Slow with fixed timeouts)

```typescript
await page.goto("/");
await page.waitForTimeout(2000); // Wait for page load

// Apply filter
await page.click(".date-filter-button");
await page.waitForTimeout(1000); // Wait for UI
await page.fill("input", "2024-01-01");
await page.waitForTimeout(1500); // Wait for filter to apply

// Check results
const gridRows = await page.locator(".ag-row");
await page.waitForTimeout(500);
expect(await gridRows.count()).toBe(10);
```

## After (Fast with smart waits)

```typescript
import { waitForGridReady, setDateFilterValue, getGridData } from "./utils/helpers";

await page.goto("/");
await waitForGridReady(page); // Waits only until grid is actually ready

// Apply filter
await page.click(".date-filter-button");
await setDateFilterValue(page, "2024-01-01"); // Handles all the waiting intelligently

// Check results - no arbitrary wait needed
const data = await getGridData(page);
expect(data).toHaveLength(10);
```

## Time Saved

- Before: 5000ms of fixed waiting
- After: ~500-1000ms (only waits as long as needed)
- **Saved: 4000-4500ms per test!**

With 100+ instances of waitForTimeout in the tests, this could save **6-8 minutes** of test execution time!
