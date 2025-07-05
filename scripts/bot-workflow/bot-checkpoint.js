#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Bot workflow: Save current work progress
 * Usage: node scripts/bot-workflow/bot-checkpoint.js "Progress message"
 */

async function main() {
  const progressMessage = process.argv.slice(2).join(" ") || "Checkpoint progress";
  
  console.log("💾 Saving bot checkpoint...");
  
  try {
    // Check if we're in a bot branch
    const currentBranch = execSync('git branch --show-current', { encoding: "utf8" }).trim();
    if (!currentBranch.startsWith("bot/")) {
      console.error("❌ Not in a bot-managed branch");
      process.exit(1);
    }
    
    // Check for bot context
    const botDir = ".bot";
    const contextPath = path.join(botDir, "context.json");
    
    if (!fs.existsSync(contextPath)) {
      console.error("❌ No bot context found. Run bot-claim-issue.js first");
      process.exit(1);
    }
    
    // Load and update context
    const context = JSON.parse(fs.readFileSync(contextPath, "utf8"));
    context.workflow.lastUpdate = new Date().toISOString();
    context.progress.currentStep = progressMessage;
    
    // Save updated context
    fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));
    
    // Update memory log
    const memoryPath = path.join(botDir, "memory.md");
    const memoryContent = fs.readFileSync(memoryPath, "utf8");
    const progressEntry = `- **${new Date().toISOString()}**: ${progressMessage}\n`;
    
    // Insert progress entry after "### Progress Log:"
    const updatedMemory = memoryContent.replace(
      /### Progress Log:\n/,
      `### Progress Log:\n\n${progressEntry}`
    );
    
    fs.writeFileSync(memoryPath, updatedMemory);
    
    // Get current PR number
    const prList = JSON.parse(
      execSync(`gh pr list --head ${currentBranch} --json number,state`, { encoding: "utf8" })
    );
    
    if (!prList.length) {
      console.error("❌ No PR found for current branch");
      process.exit(1);
    }
    
    const prNumber = prList[0].number;
    
    // Update PR description with latest status
    console.log(`📝 Updating PR #${prNumber}...`);
    
    const prBody = JSON.parse(
      execSync(`gh pr view ${prNumber} --json body`, { encoding: "utf8" })
    ).body;
    
    // Update the YAML frontmatter
    const updatedPrBody = prBody.replace(
      /last-update: .+/,
      `last-update: ${new Date().toISOString()}`
    ).replace(
      /phase: \w+/,
      `phase: ${context.workflow.phase || 'development'}`
    );
    
    // Update PR
    execSync(
      `gh pr edit ${prNumber} --body '${updatedPrBody.replace(/'/g, "'\"'\"'")}'`,
      { encoding: "utf8" }
    );
    
    // Stage and commit changes
    console.log("📦 Committing checkpoint...");
    
    // Stage all changes
    execSync('git add -A', { encoding: "utf8" });
    
    // Check if there are changes to commit
    const status = execSync('git status --porcelain', { encoding: "utf8" });
    
    if (status.trim()) {
      execSync(
        `git commit -m "bot: checkpoint - ${progressMessage.substring(0, 50)}${progressMessage.length > 50 ? '...' : ''}"`,
        { encoding: "utf8" }
      );
      
      // Push changes
      console.log("📤 Pushing checkpoint...");
      execSync('git push', { encoding: "utf8" });
      
      // Add comment to PR
      execSync(
        `gh pr comment ${prNumber} -b "🤖 **Bot Checkpoint**\\n\\n${progressMessage}\\n\\n_Last updated: ${new Date().toISOString()}_"`,
        { encoding: "utf8" }
      );
    } else {
      console.log("ℹ️  No changes to commit");
    }
    
    console.log("✅ Checkpoint saved successfully");
    console.log(`📍 Progress: ${progressMessage}`);
    
  } catch (error) {
    console.error("❌ Error saving checkpoint:", error.message);
    process.exit(1);
  }
}

main();