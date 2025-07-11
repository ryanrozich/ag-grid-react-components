import puppeteer from "puppeteer";
import { ensureProjectRoot } from '../utils/ensure-project-root.mjs';

// Ensure we're in the project root
ensureProjectRoot('check-fonts.js');

const checkFonts = async () => {
  console.log("🔍 Checking font loading...");

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    const page = await browser.newPage();

    // Listen for console messages
    page.on("console", (msg) => {
      if (msg.type() === "error" && msg.text().includes("font")) {
        console.log("Font loading error:", msg.text());
      }
    });

    // Go to the demo page
    await page.goto("http://localhost:5174", {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Check if Fira Code is loaded
    const fontInfo = await page.evaluate(() => {
      // Check if Fira Code is in document.fonts
      const fonts = Array.from(document.fonts);
      const firaCodeFonts = fonts.filter((font) =>
        font.family.includes("Fira Code"),
      );

      // Try to detect if Fira Code is actually rendering
      const testElement = document.createElement("span");
      testElement.style.fontFamily = "Fira Code";
      testElement.style.position = "absolute";
      testElement.style.left = "-9999px";
      testElement.textContent = "Test";
      document.body.appendChild(testElement);

      const testWidth = testElement.offsetWidth;

      testElement.style.fontFamily = "monospace";
      const monoWidth = testElement.offsetWidth;

      document.body.removeChild(testElement);

      return {
        fontsLoaded: fonts.length,
        firaCodeLoaded: firaCodeFonts.length > 0,
        firaCodeFonts: firaCodeFonts.map((f) => ({
          family: f.family,
          status: f.status,
          style: f.style,
          weight: f.weight,
        })),
        widthTest: {
          firaCode: testWidth,
          monospace: monoWidth,
          different: testWidth !== monoWidth,
        },
      };
    });

    console.log("\n📊 Font Loading Analysis:");
    console.log(`Total fonts loaded: ${fontInfo.fontsLoaded}`);
    console.log(
      `Fira Code loaded: ${fontInfo.firaCodeLoaded ? "✅ Yes" : "❌ No"}`,
    );

    if (fontInfo.firaCodeFonts.length > 0) {
      console.log("\nFira Code fonts:");
      fontInfo.firaCodeFonts.forEach((font) => {
        console.log(
          `  ${font.family} - ${font.weight} ${font.style} (${font.status})`,
        );
      });
    }

    console.log("\nWidth test:");
    console.log(`  Fira Code width: ${fontInfo.widthTest.firaCode}px`);
    console.log(`  Monospace width: ${fontInfo.widthTest.monospace}px`);
    console.log(
      `  Different: ${fontInfo.widthTest.different ? "✅ Yes (font is loading)" : "❌ No (using fallback)"}`,
    );

    // Check network requests for font files
    const fontRequests = await page.evaluate(() => {
      return performance
        .getEntriesByType("resource")
        .filter(
          (entry) => entry.name.includes("font") || entry.name.includes("woff"),
        )
        .map((entry) => ({
          url: entry.name,
          duration: entry.duration,
          size: entry.transferSize,
        }));
    });

    if (fontRequests.length > 0) {
      console.log("\nFont network requests:");
      fontRequests.forEach((req) => {
        console.log(`  ${req.url.substring(0, 80)}...`);
        console.log(
          `    Duration: ${req.duration.toFixed(2)}ms, Size: ${req.size} bytes`,
        );
      });
    }
  } catch (error) {
    console.error("❌ Check failed:", error.message);
  } finally {
    await browser.close();
  }
};

checkFonts();
