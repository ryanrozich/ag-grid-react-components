import { test } from "@playwright/test";

test("debug dropdown rendering and visibility", async ({ page }) => {
  // Navigate to demo
  await page.goto("http://localhost:5174/demo");
  await page.waitForLoadState("networkidle");

  // Go to Server-Side Data tab
  await page.click('button:has-text("Server-Side Data")');
  await page.waitForTimeout(2000);

  // Open SavedViewsManager
  await page.click("[data-saved-views-trigger]");
  await page.waitForTimeout(1000);

  // Click Save Current button
  await page.click('[data-action="save"]');
  await page.waitForTimeout(1000);

  // Debug the CategorySelector state
  const debugInfo = await page.evaluate(() => {
    const input = document.querySelector("#view-category") as HTMLInputElement;
    const listbox = document.querySelector("[role='listbox']");
    const portalContainers = Array.from(document.querySelectorAll("[id$='-portal']"));
    
    return {
      input: {
        exists: !!input,
        value: input?.value,
        focused: document.activeElement === input,
        ariaExpanded: input?.getAttribute("aria-expanded"),
        ariaControls: input?.getAttribute("aria-controls")
      },
      listbox: {
        exists: !!listbox,
        id: listbox?.id,
        style: listbox ? window.getComputedStyle(listbox) : null,
        innerHTML: listbox?.innerHTML?.substring(0, 200)
      },
      portals: portalContainers.map(p => ({
        id: p.id,
        childCount: p.children.length,
        innerHTML: p.innerHTML.substring(0, 100)
      })),
      activeElement: {
        tagName: document.activeElement?.tagName,
        id: document.activeElement?.id,
        className: document.activeElement?.className
      }
    };
  });
  
  console.log("Debug info:", JSON.stringify(debugInfo, null, 2));

  // Try to manually trigger the dropdown
  await page.evaluate(() => {
    const input = document.querySelector("#view-category") as HTMLInputElement;
    if (input) {
      // Dispatch focus event
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      
      // Try setting internal React state if possible
      const reactKey = Object.keys(input).find(key => key.startsWith('__react'));
      console.log("React key found:", reactKey);
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Check again after manual trigger
  const afterTrigger = await page.evaluate(() => {
    const dropdown = document.querySelector("#category-dropdown");
    const listbox = document.querySelector("[role='listbox']");
    
    return {
      dropdown: {
        exists: !!dropdown,
        visible: dropdown ? window.getComputedStyle(dropdown).display !== 'none' : false,
        innerHTML: dropdown?.innerHTML?.substring(0, 100)
      },
      listbox: {
        exists: !!listbox,
        visible: listbox ? window.getComputedStyle(listbox).display !== 'none' : false
      }
    };
  });
  
  console.log("After trigger:", JSON.stringify(afterTrigger, null, 2));
  
  await page.screenshot({ path: 'dropdown-rendering-debug.png', fullPage: true });
});