import { test, expect } from "@playwright/test";

test("check for console errors with CategorySelector", async ({ page }) => {
  const errors: string[] = [];
  
  // Capture all console messages
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("AG Grid Enterprise License")) {
      errors.push(msg.text());
      console.log("Console error:", msg.text());
    }
  });
  
  page.on("pageerror", (error) => {
    errors.push(error.message);
    console.log("Page error:", error.message);
  });

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

  // Try to interact with CategorySelector
  const categoryInput = page.locator("#view-category");
  if (await categoryInput.isVisible()) {
    // Check if CategorySelector is actually rendered
    const componentInfo = await page.evaluate(() => {
      const input = document.querySelector("#view-category");
      const parent = input?.parentElement;
      const grandparent = parent?.parentElement;
      
      // Try to find React fiber
      const reactKey = input ? Object.keys(input).find(key => key.startsWith('__react')) : null;
      
      return {
        inputTagName: input?.tagName,
        inputType: (input as HTMLInputElement)?.type,
        parentClass: parent?.className,
        grandparentClass: grandparent?.className,
        hasReactFiber: !!reactKey,
        // Check if the input has expected event listeners
        hasOnFocus: !!(input as any)?.onfocus,
        hasOnChange: !!(input as any)?.onchange,
      };
    });
    
    console.log("Component info:", componentInfo);
    
    // Try different interactions
    await categoryInput.focus();
    await page.waitForTimeout(500);
    
    await categoryInput.click();
    await page.waitForTimeout(500);
    
    // Force a React re-render by changing props
    await page.evaluate(() => {
      const input = document.querySelector("#view-category") as HTMLInputElement;
      if (input) {
        // Dispatch React events
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, "");
          const event = new Event('input', { bubbles: true });
          input.dispatchEvent(event);
        }
      }
    });
    
    await page.waitForTimeout(500);
  }

  // Check for errors
  if (errors.length > 0) {
    console.log("Found errors:", errors);
  } else {
    console.log("No console errors found");
  }

  // Final check of dropdown state
  const dropdownState = await page.evaluate(() => {
    return {
      dropdownInDOM: !!document.querySelector("#category-dropdown"),
      dropdownInPortal: !!document.querySelector("#category-selector-portal #category-dropdown"),
      allPortals: Array.from(document.querySelectorAll("[id$='-portal']")).map(p => ({
        id: p.id,
        childCount: p.children.length
      }))
    };
  });
  
  console.log("Final dropdown state:", dropdownState);
  
  expect(errors).toHaveLength(0);
});