// Test file to verify package structure before publishing

try {
  // Test core imports
  const core = await import("../packages/core/src/index.ts");
  console.log("✅ Core exports:", Object.keys(core));

  // Test adapters imports
  const adapters = await import("../packages/adapters/src/index.ts");
  console.log("✅ Adapters exports:", Object.keys(adapters));

  // Test compat imports
  const compat = await import("../packages/compat/src/index.ts");
  console.log("✅ Compat exports:", Object.keys(compat));

  console.log("\n✅ All packages are properly structured!");
} catch (error) {
  console.error("❌ Error:", error.message);
}
