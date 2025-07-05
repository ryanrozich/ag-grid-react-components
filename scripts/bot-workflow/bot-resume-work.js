#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Bot workflow: Resume work on an existing bot-managed PR
 * Usage: node scripts/bot-workflow/bot-resume-work.js [pr-number]
 */

async function main() {
  const prNumber = process.argv[2];
  
  console.log("🔍 Finding bot-managed work to resume...");
  
  try {
    let targetPr;
    
    if (prNumber) {
      // Resume specific PR
      const pr = JSON.parse(
        execSync(`gh pr view ${prNumber} --json number,title,headRefName,body,labels`, {
          encoding: "utf8"
        })
      );
      
      if (!pr.labels.some(l => l.name === "bot-managed")) {
        console.error("❌ PR #" + prNumber + " is not bot-managed");
        process.exit(1);
      }
      
      targetPr = pr;
    } else {
      // Find bot-managed PRs
      const prs = JSON.parse(
        execSync('gh pr list --label "bot-managed" --json number,title,headRefName,body,updatedAt', {
          encoding: "utf8"
        })
      );
      
      if (!prs.length) {
        console.log("❌ No bot-managed PRs found");
        process.exit(1);
      }
      
      console.log("\n📋 Bot-managed PRs:");
      prs.forEach(pr => {
        const lastUpdate = new Date(pr.updatedAt);
        const hoursAgo = Math.floor((Date.now() - lastUpdate) / (1000 * 60 * 60));
        console.log(`  PR #${pr.number}: ${pr.title} (updated ${hoursAgo}h ago)`);
      });
      
      if (prs.length === 1) {
        targetPr = prs[0];
        console.log(`\n🎯 Resuming PR #${targetPr.number}`);
      } else {
        console.log("\n💡 Run with PR number to resume: node scripts/bot-workflow/bot-resume-work.js <number>");
        process.exit(0);
      }
    }
    
    // Switch to PR branch
    console.log(`\n🌿 Switching to branch: ${targetPr.headRefName}`);
    execSync('git fetch origin', { encoding: "utf8" });
    execSync(`git checkout ${targetPr.headRefName}`, { encoding: "utf8" });
    execSync('git pull origin ' + targetPr.headRefName, { encoding: "utf8" });
    
    // Load bot context
    const botDir = ".bot";
    const contextPath = path.join(botDir, "context.json");
    
    if (!fs.existsSync(contextPath)) {
      console.error("❌ No bot context found in branch");
      process.exit(1);
    }
    
    const context = JSON.parse(fs.readFileSync(contextPath, "utf8"));
    
    // Display current status
    console.log("\n📊 Current Status:");
    console.log("  Issue: #" + context.issue.number + " - " + context.issue.title);
    console.log("  Phase: " + context.workflow.phase);
    console.log("  Last Step: " + context.progress.currentStep);
    console.log("  Last Update: " + new Date(context.workflow.lastUpdate).toLocaleString());
    
    // Show next steps
    if (context.progress.nextSteps && context.progress.nextSteps.length > 0) {
      console.log("\n📝 Next Steps:");
      context.progress.nextSteps.forEach((step, i) => {
        console.log(`  ${i + 1}. ${step}`);
      });
    }
    
    // Check checklist progress
    const checklistPath = path.join(botDir, "checklist.md");
    if (fs.existsSync(checklistPath)) {
      const checklist = fs.readFileSync(checklistPath, "utf8");
      const totalTasks = (checklist.match(/- \[.\]/g) || []).length;
      const completedTasks = (checklist.match(/- \[x\]/g) || []).length;
      console.log(`\n✅ Progress: ${completedTasks}/${totalTasks} tasks completed`);
    }
    
    // Show recent findings
    if (context.progress.findings && context.progress.findings.length > 0) {
      console.log("\n🔍 Recent Findings:");
      context.progress.findings.slice(-3).forEach(finding => {
        console.log(`  - ${finding}`);
      });
    }
    
    // Update PR comment
    console.log("\n💬 Adding resume comment...");
    execSync(
      `gh pr comment ${targetPr.number} -b "🤖 **Bot Resuming Work**\\n\\nResumed at: ${new Date().toISOString()}\\nCurrent phase: ${context.workflow.phase}\\nLast step: ${context.progress.currentStep}"`,
      { encoding: "utf8" }
    );
    
    // Create resume summary file for reference
    const resumeSummary = `# Resume Summary - ${new Date().toISOString()}

## PR: #${targetPr.number}
## Issue: #${context.issue.number} - ${context.issue.title}

### Current State:
- Phase: ${context.workflow.phase}
- Last Step: ${context.progress.currentStep}
- Branch: ${targetPr.headRefName}

### Context Loaded:
\`\`\`json
${JSON.stringify(context, null, 2)}
\`\`\`

### Ready to Continue:
1. Review the checklist in \`.bot/checklist.md\`
2. Check recent changes with \`git log --oneline -10\`
3. Review memory log in \`.bot/memory.md\`
4. Continue with next steps listed above
`;
    
    fs.writeFileSync(".bot/resume-summary.md", resumeSummary);
    
    console.log("\n✅ Successfully resumed work on PR #" + targetPr.number);
    console.log("📁 Bot context loaded from .bot/");
    console.log("💡 Use 'cat .bot/resume-summary.md' for detailed context");
    console.log("🔧 Use 'node scripts/bot-workflow/bot-checkpoint.js' to save progress");
    
  } catch (error) {
    console.error("❌ Error resuming work:", error.message);
    process.exit(1);
  }
}

main();