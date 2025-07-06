#!/usr/bin/env node

/**
 * Script to create labels used by the smart preview deployment system
 */

const { execSync } = require("child_process");

const labels = [
  {
    name: "deploy-preview",
    description: "Force deployment of PR preview",
    color: "0E8A16"  // Green
  },
  {
    name: "skip-preview",
    description: "Skip PR preview deployment",
    color: "FBCA04"  // Yellow
  },
  {
    name: "has-preview",
    description: "PR has a deployed preview",
    color: "1D76DB"  // Blue
  }
];

async function createLabels() {
  console.log("🏷️  Creating smart preview deployment labels...\n");

  for (const label of labels) {
    try {
      // Check if label exists
      try {
        execSync(`gh label view "${label.name}"`, { stdio: 'pipe' });
        console.log(`✓ Label "${label.name}" already exists`);
        continue;
      } catch (e) {
        // Label doesn't exist, create it
      }

      // Create label
      execSync(
        `gh label create "${label.name}" --description "${label.description}" --color "${label.color}"`,
        { stdio: 'inherit' }
      );
      console.log(`✅ Created label "${label.name}"`);
    } catch (error) {
      console.error(`❌ Failed to create label "${label.name}":`, error.message);
    }
  }

  console.log("\n✅ All labels processed!");
}

createLabels();