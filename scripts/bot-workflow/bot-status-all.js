#!/usr/bin/env node
const { execSync } = require("child_process");

/**
 * Bot workflow: Show status of all bot-managed work
 * Usage: node scripts/bot-workflow/bot-status-all.js
 */

async function main() {
  console.log("🤖 Bot Workflow Status Overview\n");
  
  try {
    // Get all bot-managed PRs
    const botPrs = JSON.parse(
      execSync('gh pr list --label "bot-managed" --json number,title,headRefName,updatedAt,labels --limit 50', {
        encoding: "utf8"
      })
    );
    
    // Get all stalled PRs
    const stalledPrs = JSON.parse(
      execSync('gh pr list --label "bot-stalled" --json number,title,updatedAt --limit 50', {
        encoding: "utf8"
      })
    );
    
    // Get issues in backlog
    const backlogIssues = JSON.parse(
      execSync('gh issue list --label "status: backlog" --json number,title,assignees --limit 20', {
        encoding: "utf8"
      })
    );
    
    // Get available issues (backlog + unassigned)
    const availableIssues = backlogIssues.filter(issue => !issue.assignees.length);
    
    // Display bot-managed PRs
    if (botPrs.length > 0) {
      console.log("🔧 Active Bot Work:");
      botPrs.forEach(pr => {
        const lastUpdate = new Date(pr.updatedAt);
        const hoursAgo = Math.floor((Date.now() - lastUpdate) / (1000 * 60 * 60));
        const isStalled = pr.labels.some(l => l.name === "bot-stalled");
        
        console.log(`  PR #${pr.number}: ${pr.title}`);
        console.log(`    Branch: ${pr.headRefName}`);
        console.log(`    Last Update: ${hoursAgo}h ago ${isStalled ? '⚠️ STALLED' : '✅'}`);
        console.log("");
      });
    } else {
      console.log("🔧 No active bot work\n");
    }
    
    // Display stalled work
    if (stalledPrs.length > 0) {
      console.log("⚠️ Stalled Bot Work (needs attention):");
      stalledPrs.forEach(pr => {
        const lastUpdate = new Date(pr.updatedAt);
        const daysAgo = Math.floor((Date.now() - lastUpdate) / (1000 * 60 * 60 * 24));
        console.log(`  PR #${pr.number}: ${pr.title} (${daysAgo} days inactive)`);
      });
      console.log("");
    }
    
    // Display available issues
    if (availableIssues.length > 0) {
      console.log("📋 Available Issues for Bot Work:");
      availableIssues.forEach(issue => {
        console.log(`  Issue #${issue.number}: ${issue.title}`);
      });
      console.log("\n  💡 Use 'node scripts/bot-workflow/bot-claim-issue.js <number>' to claim");
    } else {
      console.log("📋 No available issues for bot work");
    }
    
    // Summary statistics
    console.log("\n📊 Summary:");
    console.log(`  Active bot PRs: ${botPrs.length}`);
    console.log(`  Stalled bot PRs: ${stalledPrs.length}`);
    console.log(`  Available issues: ${availableIssues.length}`);
    console.log(`  Total backlog: ${backlogIssues.length}`);
    
    // Suggested actions
    console.log("\n💡 Suggested Actions:");
    if (stalledPrs.length > 0) {
      console.log("  - Resume or handoff stalled PRs");
    }
    if (availableIssues.length > 0 && botPrs.length === 0) {
      console.log("  - Claim an available issue to start bot work");
    }
    if (botPrs.length > 0) {
      console.log("  - Check active PRs and checkpoint progress");
    }
    
  } catch (error) {
    console.error("❌ Error getting bot status:", error.message);
    process.exit(1);
  }
}

main();