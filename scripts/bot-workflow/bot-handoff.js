#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Bot workflow: Prepare work for human takeover
 * Usage: node scripts/bot-workflow/bot-handoff.js [reason]
 */

async function main() {
  const reason = process.argv.slice(2).join(" ") || "Ready for human review";
  
  console.log("🤝 Preparing bot work for human handoff...");
  
  try {
    // Check if we're in a bot branch
    const currentBranch = execSync('git branch --show-current', { encoding: "utf8" }).trim();
    if (!currentBranch.startsWith("bot/")) {
      console.error("❌ Not in a bot-managed branch");
      process.exit(1);
    }
    
    // Load bot context
    const botDir = ".bot";
    const contextPath = path.join(botDir, "context.json");
    
    if (!fs.existsSync(contextPath)) {
      console.error("❌ No bot context found");
      process.exit(1);
    }
    
    const context = JSON.parse(fs.readFileSync(contextPath, "utf8"));
    
    // Get current PR
    const prList = JSON.parse(
      execSync(`gh pr list --head ${currentBranch} --json number`, { encoding: "utf8" })
    );
    
    if (!prList.length) {
      console.error("❌ No PR found for current branch");
      process.exit(1);
    }
    
    const prNumber = prList[0].number;
    
    // Generate handoff summary
    console.log("📝 Generating handoff summary...");
    
    // Get recent commits
    const recentCommits = execSync('git log --oneline -10', { encoding: "utf8" }).trim();
    
    // Get changed files
    const changedFiles = execSync('git diff --name-only origin/main...HEAD', { encoding: "utf8" }).trim();
    
    // Load checklist status
    const checklistPath = path.join(botDir, "checklist.md");
    let checklistSummary = "No checklist found";
    if (fs.existsSync(checklistPath)) {
      const checklist = fs.readFileSync(checklistPath, "utf8");
      const totalTasks = (checklist.match(/- \[.\]/g) || []).length;
      const completedTasks = (checklist.match(/- \[x\]/g) || []).length;
      checklistSummary = `${completedTasks}/${totalTasks} tasks completed`;
    }
    
    const handoffSummary = `# 🤝 Bot Handoff Summary

## Issue: #${context.issue.number} - ${context.issue.title}
## PR: #${prNumber}
## Handoff Date: ${new Date().toISOString()}
## Reason: ${reason}

### Work Summary

**Duration:** ${getWorkDuration(context.workflow.started)}
**Last Activity:** ${new Date(context.workflow.lastUpdate).toLocaleString()}
**Current Phase:** ${context.workflow.phase}
**Progress:** ${checklistSummary}

### What Was Done

${context.progress.currentStep}

### Key Findings

${context.progress.findings && context.progress.findings.length > 0 
  ? context.progress.findings.map(f => `- ${f}`).join('\n')
  : '- No specific findings recorded'}

### Key Decisions

${context.progress.decisions && context.progress.decisions.length > 0
  ? context.progress.decisions.map(d => `- ${d}`).join('\n')
  : '- No specific decisions recorded'}

### Files Changed

\`\`\`
${changedFiles || 'No files changed yet'}
\`\`\`

### Recent Commits

\`\`\`
${recentCommits}
\`\`\`

### Next Steps for Human

${context.progress.nextSteps && context.progress.nextSteps.length > 0
  ? context.progress.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')
  : '1. Review bot work\n2. Complete remaining tasks\n3. Run tests and quality checks'}

### Bot Context

All bot work context is stored in the \`.bot/\` directory:
- \`context.json\` - Machine-readable state
- \`memory.md\` - Human-readable progress log
- \`checklist.md\` - Task checklist
- \`resume-summary.md\` - Last resume summary (if applicable)

### How to Continue

1. Review this handoff summary
2. Check the PR description and comments
3. Review \`.bot/memory.md\` for detailed progress
4. Check \`.bot/checklist.md\` for remaining tasks
5. Continue development as normal

---

_Bot work ended: ${new Date().toISOString()}_
`;
    
    // Save handoff summary
    const handoffPath = path.join(botDir, "handoff-summary.md");
    fs.writeFileSync(handoffPath, handoffSummary);
    
    // Update context for handoff
    context.workflow.handoffDate = new Date().toISOString();
    context.workflow.handoffReason = reason;
    context.workflow.phase = "handed-off";
    fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));
    
    // Commit handoff files
    console.log("💾 Saving handoff state...");
    execSync('git add .bot/', { encoding: "utf8" });
    execSync('git commit -m "bot: handoff to human - ' + reason.substring(0, 50) + '"', { encoding: "utf8" });
    execSync('git push', { encoding: "utf8" });
    
    // Update PR
    console.log("📝 Updating PR...");
    
    // Remove bot-managed label, add needs-human-review
    execSync(
      `gh pr edit ${prNumber} --remove-label "bot-managed" --add-label "needs-human-review"`,
      { encoding: "utf8" }
    );
    
    // Mark PR ready for review if it was draft
    const pr = JSON.parse(
      execSync(`gh pr view ${prNumber} --json isDraft`, { encoding: "utf8" })
    );
    
    if (pr.isDraft) {
      execSync(`gh pr ready ${prNumber}`, { encoding: "utf8" });
    }
    
    // Add handoff comment
    const handoffComment = `## 🤝 Bot Handoff

**Reason:** ${reason}
**Handoff Time:** ${new Date().toISOString()}

### Summary
- **Work Duration:** ${getWorkDuration(context.workflow.started)}
- **Progress:** ${checklistSummary}
- **Current Status:** ${context.progress.currentStep}

### For Human Reviewer
1. Review the handoff summary in \`.bot/handoff-summary.md\`
2. Check completed and remaining tasks in \`.bot/checklist.md\`
3. Review the full progress log in \`.bot/memory.md\`

The bot has completed its automated work. Human intervention is now required to:
- Review and refine the implementation
- Handle any complex decisions
- Complete remaining tasks
- Ensure code quality and tests

---
_Bot signing off. Good luck! 🤖👋_`;
    
    execSync(
      `gh pr comment ${prNumber} -b '${handoffComment.replace(/'/g, "'\"'\"'")}'`,
      { encoding: "utf8" }
    );
    
    console.log("\n✅ Handoff completed successfully!");
    console.log(`📋 PR #${prNumber} is ready for human review`);
    console.log(`📁 Handoff summary saved to: ${handoffPath}`);
    console.log("🏷️  Labels updated: -bot-managed +needs-human-review");
    
  } catch (error) {
    console.error("❌ Error during handoff:", error.message);
    process.exit(1);
  }
}

function getWorkDuration(startTime) {
  const start = new Date(startTime);
  const now = new Date();
  const hours = Math.floor((now - start) / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}, ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''}`;
}

main();