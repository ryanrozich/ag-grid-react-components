#!/usr/bin/env node

/**
 * Bot claim issue template
 * Usage: node bot-claim.js <issue-number>
 *
 * TODO: Customize this script for your project:
 * 1. Update label names to match your project
 * 2. Modify worktree location if needed
 * 3. Add project-specific initialization
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Parse arguments
const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("❌ Usage: node bot-claim.js <issue-number>");
  process.exit(1);
}

// Configuration - TODO: Update these for your project
const TODO_LABEL = "agent:todo";
const WIP_LABEL = "agent:wip";
const BOT_WORKSPACE =
  process.env.BOT_WORKSPACE || path.join(process.env.HOME, "bot-worktrees");

console.log(`🤖 Bot claiming issue #${issueNumber}...`);

/**
 * Check if issue can be claimed
 */
function checkIssue() {
  try {
    const issue = JSON.parse(
      execSync(`gh issue view ${issueNumber} --json state,labels,assignees`, {
        encoding: "utf8",
      }),
    );

    if (issue.state !== "OPEN") {
      throw new Error("Issue is not open");
    }

    const hasTodoLabel = issue.labels.some((l) => l.name === TODO_LABEL);
    if (!hasTodoLabel) {
      throw new Error(`Issue missing ${TODO_LABEL} label`);
    }

    if (issue.assignees.length > 0) {
      throw new Error("Issue already assigned");
    }

    return issue;
  } catch (error) {
    console.error(`❌ Cannot claim issue: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Create worktree for development
 */
function setupWorktree() {
  const branchName = `bot/issue-${issueNumber}`;
  const worktreePath = path.join(BOT_WORKSPACE, branchName);

  // Create workspace directory
  if (!fs.existsSync(BOT_WORKSPACE)) {
    fs.mkdirSync(BOT_WORKSPACE, { recursive: true });
  }

  // Create worktree
  console.log(`🌳 Creating worktree at ${worktreePath}...`);
  execSync(`git worktree add ${worktreePath} -b ${branchName}`);

  // Initialize bot state
  const botDir = path.join(worktreePath, ".bot");
  fs.mkdirSync(botDir, { recursive: true });

  // Create initial state
  const state = {
    issueNumber,
    branchName,
    claimedAt: new Date().toISOString(),
    status: "claimed",
  };

  fs.writeFileSync(
    path.join(botDir, "state.json"),
    JSON.stringify(state, null, 2),
  );

  return worktreePath;
}

/**
 * Update issue labels and assignment
 */
function updateIssue() {
  console.log(`🏷️  Updating issue labels...`);

  // Remove TODO label, add WIP label
  execSync(
    `gh issue edit ${issueNumber} --remove-label "${TODO_LABEL}" --add-label "${WIP_LABEL}"`,
  );

  // Self-assign (if bot has permissions)
  try {
    execSync(`gh issue edit ${issueNumber} --add-assignee @me`);
  } catch (e) {
    console.log("⚠️  Could not self-assign (may need permissions)");
  }

  // Add comment
  const comment = `🤖 Bot has claimed this issue and started working on it.

Branch: \`bot/issue-${issueNumber}\`
Status: Work in progress

I'll post updates as I make progress.`;

  execSync(`gh issue comment ${issueNumber} --body "${comment}"`);
}

/**
 * Main execution
 */
async function main() {
  try {
    // Check issue
    const issue = checkIssue();
    console.log(`✅ Issue #${issueNumber}: ${issue.title}`);

    // Setup worktree
    const worktreePath = setupWorktree();
    console.log(`✅ Worktree created`);

    // Update issue
    updateIssue();
    console.log(`✅ Issue updated`);

    // Success message
    console.log(`
🎉 Successfully claimed issue #${issueNumber}!

Next steps:
1. cd ${worktreePath}
2. Start implementing the feature
3. Use 'node scripts/bot-workflow/bot-checkpoint.js' to save progress
4. Create PR when ready
`);
  } catch (error) {
    console.error(`❌ Failed to claim issue: ${error.message}`);
    process.exit(1);
  }
}

// Run
main();
