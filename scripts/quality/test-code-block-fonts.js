import puppeteer from "puppeteer";

const testCodeBlockFonts = async () => {
  console.log("🔍 Testing code block font rendering...");

  const browser = await puppeteer.launch({
    headless: false, // Set to true for CI
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    const page = await browser.newPage();

    // Go to the demo page
    await page.goto("http://localhost:5173", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for code blocks to render
    await page.waitForSelector("pre code", { timeout: 10000 });

    // Get computed styles for all code elements
    const codeBlockStyles = await page.evaluate(() => {
      const codeElements = document.querySelectorAll("pre code");
      const results = [];

      codeElements.forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        const preStyle = window.getComputedStyle(element.closest("pre"));

        results.push({
          index,
          code: {
            fontFamily: computedStyle.fontFamily,
            fontSize: computedStyle.fontSize,
            fontWeight: computedStyle.fontWeight,
            display: computedStyle.display,
          },
          pre: {
            fontFamily: preStyle.fontFamily,
            fontSize: preStyle.fontSize,
            fontWeight: preStyle.fontWeight,
          },
          // Get the actual rendered font
          actualFont: (() => {
            // This is a trick to detect the actual rendered font
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            context.font = computedStyle.font;
            return context.font;
          })(),
          // Check if any parent has overriding styles
          parentStyles: (() => {
            let parent = element.parentElement;
            const overrides = [];
            while (parent && parent !== document.body) {
              const style = window.getComputedStyle(parent);
              if (style.fontFamily && style.fontFamily !== "inherit") {
                overrides.push({
                  element: parent.tagName,
                  className: parent.className,
                  fontFamily: style.fontFamily,
                });
              }
              parent = parent.parentElement;
            }
            return overrides;
          })(),
        });
      });

      return results;
    });

    console.log("\n📊 Code Block Font Analysis:");
    codeBlockStyles.forEach((style, index) => {
      console.log(`\n📦 Code Block ${index + 1}:`);
      console.log("  Code element:");
      console.log(`    Font Family: ${style.code.fontFamily}`);
      console.log(`    Font Size: ${style.code.fontSize}`);
      console.log(`    Font Weight: ${style.code.fontWeight}`);
      console.log(`    Display: ${style.code.display}`);
      console.log("  Pre element:");
      console.log(`    Font Family: ${style.pre.fontFamily}`);
      console.log(`    Font Size: ${style.pre.fontSize}`);
      console.log("  Actual rendered font:", style.actualFont);
      if (style.parentStyles.length > 0) {
        console.log("  ⚠️  Parent style overrides found:");
        style.parentStyles.forEach((parent) => {
          console.log(
            `    ${parent.element}.${parent.className}: ${parent.fontFamily}`,
          );
        });
      }
    });

    // Check if monospace fonts are being used
    const nonMonospaceBlocks = codeBlockStyles.filter((style) => {
      const fontFamily = style.code.fontFamily.toLowerCase();
      return (
        !fontFamily.includes("monospace") &&
        !fontFamily.includes("monaco") &&
        !fontFamily.includes("consolas") &&
        !fontFamily.includes("courier") &&
        !fontFamily.includes("fira code")
      );
    });

    if (nonMonospaceBlocks.length > 0) {
      console.log("\n❌ Found code blocks without monospace fonts!");
      process.exit(1);
    } else {
      console.log("\n✅ All code blocks are using monospace fonts");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
};

// Make sure dev server is running
console.log("⚠️  Make sure the dev server is running on http://localhost:5173");
console.log("   Run 'npm run dev' in another terminal\n");

testCodeBlockFonts();
