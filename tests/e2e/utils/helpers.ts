import { Page } from "@playwright/test";

/**
 * Wait for AG Grid to be fully loaded and ready
 */
export async function waitForGridReady(page: Page) {
  // Wait for the grid wrapper to be visible
  await page.waitForSelector(".ag-root-wrapper", { state: "visible" });

  // Wait for the grid API to be available and have rows
  await page.waitForFunction(() => {
    const api = (window as any).gridApi;
    return api && typeof api.getDisplayedRowCount === "function";
  });
}

/**
 * Wait for grid to have a specific number of rows
 */
export async function waitForGridRowCount(page: Page, expectedCount: number) {
  await page.waitForFunction((count) => {
    const api = (window as any).gridApi;
    return api && api.getDisplayedRowCount() === count;
  }, expectedCount);
}

/**
 * Wait for filter to be applied and grid to update
 */
export async function waitForFilterUpdate(page: Page) {
  // Wait for any pending filter operations
  await page.waitForFunction(() => {
    const api = (window as any).gridApi;
    if (!api) return false;

    // Check if any async operations are pending
    return !api.isAnyFilterPresent || api.isAnyFilterPresent();
  });

  // Small delay to ensure UI has updated
  await page.waitForTimeout(100);
}

/**
 * Click and wait for navigation or state change
 */
export async function clickAndWaitForResponse(
  page: Page,
  selector: string,
  waitForSelector?: string,
) {
  const clickPromise = page.click(selector);

  if (waitForSelector) {
    await Promise.all([
      clickPromise,
      page.waitForSelector(waitForSelector, { state: "visible" }),
    ]);
  } else {
    await clickPromise;
  }
}

/**
 * Wait for date picker to be ready
 */
export async function waitForDatePickerReady(page: Page) {
  await page.waitForSelector(".react-datepicker", { state: "visible" });
  // Date picker animations
  await page.waitForTimeout(200);
}

/**
 * Type text with a small delay between keystrokes (more reliable than fill)
 */
export async function typeWithDelay(
  page: Page,
  selector: string,
  text: string,
  delay = 50,
) {
  await page.click(selector);
  await page.type(selector, text, { delay });
}

/**
 * Wait for network to be idle (better than arbitrary timeouts)
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  try {
    await page.waitForLoadState("networkidle", { timeout });
  } catch {
    // Network might not go completely idle, that's OK
  }
}

/**
 * Get grid data as array
 */
export async function getGridData(page: Page): Promise<any[]> {
  return await page.evaluate(() => {
    const api = (window as any).gridApi;
    if (!api) return [];

    const rowData: any[] = [];
    api.forEachNodeAfterFilterAndSort((node: any) => {
      rowData.push(node.data);
    });
    return rowData;
  });
}

/**
 * Set a specific date in the date filter
 */
export async function setDateFilterValue(
  page: Page,
  dateString: string,
  inputSelector = 'input[type="text"]',
) {
  await page.fill(inputSelector, "");
  await page.fill(inputSelector, dateString);
  await page.keyboard.press("Enter");
  await waitForFilterUpdate(page);
}
