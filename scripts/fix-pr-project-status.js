#!/usr/bin/env node

/**
 * Script to fix PR project status for existing PRs
 * This ensures all PRs in the project have the correct status based on their state
 */

const { execSync } = require("child_process");

async function fixPRProjectStatus() {
  console.log("🔧 Fixing PR project status...\n");

  try {
    // Get all open PRs
    const prsJson = execSync(
      `gh pr list --json number,isDraft,state --limit 100`,
      { encoding: "utf8" }
    );
    const prs = JSON.parse(prsJson);

    console.log(`Found ${prs.length} open PRs\n`);

    for (const pr of prs) {
      console.log(`\nProcessing PR #${pr.number}...`);

      // Get current labels
      const labelsJson = execSync(
        `gh pr view ${pr.number} --json labels`,
        { encoding: "utf8" }
      );
      const { labels } = JSON.parse(labelsJson);
      const labelNames = labels.map(l => l.name);

      // Remove existing status labels
      const statusLabels = labelNames.filter(l => l.startsWith('status:'));
      for (const label of statusLabels) {
        console.log(`  Removing label: ${label}`);
        execSync(`gh pr edit ${pr.number} --remove-label "${label}"`, { stdio: 'pipe' });
      }

      // Add appropriate status label
      let newStatus;
      if (pr.isDraft) {
        newStatus = 'status: pr-in-progress';
      } else {
        // Check if it has approvals
        const reviewsJson = execSync(
          `gh pr view ${pr.number} --json reviews`,
          { encoding: "utf8" }
        );
        const { reviews } = JSON.parse(reviewsJson);
        const hasApproval = reviews.some(r => r.state === 'APPROVED');

        if (hasApproval) {
          newStatus = 'status: code-review-complete';
        } else {
          newStatus = 'status: in-code-review';
        }
      }

      console.log(`  Adding label: ${newStatus}`);
      execSync(`gh pr edit ${pr.number} --add-label "${newStatus}"`, { stdio: 'pipe' });

      console.log(`  ✅ Fixed PR #${pr.number}`);
    }

    console.log("\n✅ All PRs have been updated!");
    console.log("\nThe sync-labels-to-project workflow will now sync these labels to the project fields.");

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixPRProjectStatus();