#!/usr/bin/env node

/**
 * Script to clean up Cloudflare deployments for merged PRs
 * This removes R2 objects, KV entries, and API workers for PRs that have been merged
 */

import { execSync } from "child_process";

// Check required environment variables
const requiredEnvVars = [
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_KV_NAMESPACE_ID",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

console.log("🔍 Finding merged PRs with deployments...\n");

// Get all closed PRs
let mergedPRs;
try {
  const prsJson = execSync(
    'gh pr list --state closed --limit 100 --json number,mergedAt,title',
    { encoding: "utf8" }
  );
  const allPRs = JSON.parse(prsJson);
  mergedPRs = allPRs.filter((pr) => pr.mergedAt !== null);
  console.log(`Found ${mergedPRs.length} merged PRs to check\n`);
} catch (error) {
  console.error("❌ Failed to fetch PRs:", error.message);
  process.exit(1);
}

// List all KV keys to find PR deployments
let prDeployments;
try {
  const kvListOutput = execSync(
    `wrangler kv key list --namespace-id="${process.env.CLOUDFLARE_KV_NAMESPACE_ID}" --remote`,
    { encoding: "utf8" }
  );
  const kvKeys = JSON.parse(kvListOutput);

  // Filter for PR deployment keys
  prDeployments = kvKeys
    .map((key) => key.name)
    .filter((name) => name.match(/^ag-grid-react-components-pr-\d+$/))
    .map((name) => {
      const prNumber = parseInt(name.match(/pr-(\d+)$/)[1]);
      return { name, prNumber };
    });

  console.log(`Found ${prDeployments.length} PR deployments in KV store\n`);
} catch (error) {
  console.error("❌ Failed to list KV keys:", error.message);
  process.exit(1);
}

// Find deployments for merged PRs
const mergedPRNumbers = new Set(mergedPRs.map((pr) => pr.number));
const deploymentsToClean = prDeployments.filter((deployment) =>
  mergedPRNumbers.has(deployment.prNumber)
);

if (deploymentsToClean.length === 0) {
  console.log("✅ No merged PR deployments found to clean up!");
  process.exit(0);
}

console.log(`🧹 Found ${deploymentsToClean.length} merged PR deployments to clean:\n`);
deploymentsToClean.forEach((d) => {
  const pr = mergedPRs.find((pr) => pr.number === d.prNumber);
  console.log(`  - PR #${d.prNumber}: ${pr.title}`);
});

// Ask for confirmation
console.log("\n⚠️  This will permanently delete these deployments!");
console.log("Press Ctrl+C to cancel, or wait 5 seconds to continue...\n");

// Wait 5 seconds
execSync("sleep 5");

// Clean up each deployment
let cleaned = 0;
let failed = 0;

for (const deployment of deploymentsToClean) {
  const { name: deployPath, prNumber } = deployment;
  console.log(`\n🗑️  Cleaning PR #${prNumber} deployment...`);

  try {
    // 1. Delete R2 objects
    console.log("  - Deleting R2 objects...");
    try {
      execSync(
        `wrangler r2 object delete "rozich-demos/${deployPath}/" --remote --recursive`,
        { stdio: "pipe" }
      );
      console.log("    ✅ R2 objects deleted");
    } catch (error) {
      console.log("    ⚠️  No R2 objects found or already deleted");
    }

    // 2. Delete KV entry
    console.log("  - Deleting KV entry...");
    execSync(
      `wrangler kv key delete "${deployPath}" --namespace-id="${process.env.CLOUDFLARE_KV_NAMESPACE_ID}" --remote`,
      { stdio: "pipe" }
    );
    console.log("    ✅ KV entry deleted");

    // 3. Delete API worker
    const workerName = `ag-grid-demo-api-pr-${prNumber}`;
    console.log(`  - Deleting API worker: ${workerName}...`);
    try {
      execSync(`wrangler delete "${workerName}" --remote`, { stdio: "pipe" });
      console.log("    ✅ API worker deleted");
    } catch (error) {
      console.log("    ⚠️  API worker not found or already deleted");
    }

    cleaned++;
    console.log(`✅ PR #${prNumber} deployment cleaned up!`);
  } catch (error) {
    failed++;
    console.error(`❌ Failed to clean PR #${prNumber}:`, error.message);
  }
}

console.log(`\n📊 Summary:`);
console.log(`  - ${cleaned} deployments successfully cleaned`);
console.log(`  - ${failed} deployments failed`);
console.log(`\n✨ Cleanup complete!`);