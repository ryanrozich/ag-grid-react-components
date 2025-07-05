#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Bot workflow: Claim an issue and set up work environment
 * Usage: node scripts/bot-workflow/bot-claim-issue.js [issue-number]
 */

async function main() {
  const issueNumber = process.argv[2];
  
  if (!issueNumber) {
    // Find an available issue
    console.log("🔍 Finding available issues...");
    const issues = JSON.parse(
      execSync('gh issue list --label "status: backlog" --json number,title,assignees,labels', {
        encoding: "utf8"
      })
    );
    
    const availableIssues = issues.filter(issue => !issue.assignees.length);
    
    if (!availableIssues.length) {
      console.log("❌ No available issues found");
      process.exit(1);
    }
    
    console.log("\n📋 Available issues:");
    availableIssues.forEach(issue => {
      console.log(`  #${issue.number}: ${issue.title}`);
    });
    
    console.log("\n💡 Run with issue number to claim: node scripts/bot-workflow/bot-claim-issue.js <number>");
    process.exit(0);
  }
  
  // Validate issue number
  const validIssueNumber = parseInt(issueNumber, 10);
  if (isNaN(validIssueNumber) || validIssueNumber <= 0) {
    console.error("❌ Invalid issue number");
    process.exit(1);
  }
  
  console.log(`\n🤖 Bot claiming issue #${validIssueNumber}...`);
  
  try {
    // Check if issue exists and is available
    const issue = JSON.parse(
      execSync(`gh issue view ${validIssueNumber} --json number,title,assignees,labels,state`, {
        encoding: "utf8"
      })
    );
    
    if (issue.state !== "OPEN") {
      console.error("❌ Issue is not open");
      process.exit(1);
    }
    
    if (issue.assignees.length > 0) {
      console.error("❌ Issue is already assigned");
      process.exit(1);
    }
    
    // Add claiming comment (acts as a lock)
    console.log("📝 Adding claim comment...");
    execSync(
      `gh issue comment ${validIssueNumber} -b "🤖 Bot claiming this issue for automated work.\\n\\nStarting analysis..."`,
      { encoding: "utf8" }
    );
    
    // Self-assign
    console.log("👤 Self-assigning issue...");
    const currentUser = JSON.parse(
      execSync('gh api user', { encoding: "utf8" })
    );
    execSync(`gh issue edit ${validIssueNumber} --add-assignee "${currentUser.login}"`);
    
    // Update labels
    console.log("🏷️  Updating labels...");
    execSync(
      `gh issue edit ${validIssueNumber} --remove-label "status: backlog" --add-label "status: in-progress" --add-label "bot-managed"`,
      { encoding: "utf8" }
    );
    
    // Create feature branch
    const branchName = `bot/${validIssueNumber}-${issue.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50)}`;
    console.log(`\n🌿 Creating branch: ${branchName}`);
    
    // Ensure we're on main and up to date
    execSync('git checkout main && git pull origin main', { encoding: "utf8" });
    execSync(`git checkout -b ${branchName}`, { encoding: "utf8" });
    
    // Set up bot context directory
    console.log("📁 Setting up bot context...");
    const botDir = ".bot";
    if (!fs.existsSync(botDir)) {
      fs.mkdirSync(botDir, { recursive: true });
    }
    
    // Create initial context
    const context = {
      issue: {
        number: validIssueNumber,
        title: issue.title,
        labels: issue.labels.map(l => l.name)
      },
      workflow: {
        started: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        phase: "initial",
        branchName: branchName
      },
      progress: {
        currentStep: "Issue claimed and branch created",
        nextSteps: [
          "Analyze issue requirements",
          "Research codebase",
          "Plan implementation",
          "Start development"
        ],
        findings: [],
        decisions: []
      }
    };
    
    fs.writeFileSync(
      path.join(botDir, "context.json"),
      JSON.stringify(context, null, 2)
    );
    
    // Create memory log
    const memoryContent = `# Bot Memory Log - Issue #${validIssueNumber}

## ${issue.title}

### Started: ${new Date().toISOString()}

### Progress Log:

- **${new Date().toISOString()}**: Issue claimed, branch created
- Ready to begin analysis

### Issue Context:
\`\`\`
${JSON.stringify(issue, null, 2)}
\`\`\`
`;
    
    fs.writeFileSync(path.join(botDir, "memory.md"), memoryContent);
    
    // Create checklist
    const checklistContent = `# Implementation Checklist - Issue #${validIssueNumber}

## Pre-Implementation
- [ ] Analyze issue requirements
- [ ] Research existing codebase
- [ ] Identify affected components
- [ ] Plan implementation approach
- [ ] Write initial tests (TDD)

## Implementation
- [ ] Implement core functionality
- [ ] Update/add tests
- [ ] Handle edge cases
- [ ] Add error handling

## Quality Assurance
- [ ] Run tests locally
- [ ] Run linting
- [ ] Run type checking
- [ ] Test manually
- [ ] Update documentation

## Finalization
- [ ] Clean up code
- [ ] Update PR description
- [ ] Request review
`;
    
    fs.writeFileSync(path.join(botDir, "checklist.md"), checklistContent);
    
    // Commit bot context
    console.log("💾 Saving initial context...");
    execSync('git add .bot/', { encoding: "utf8" });
    execSync('git commit -m "bot: initialize work context for issue #' + validIssueNumber + '"', { encoding: "utf8" });
    
    // Push branch
    console.log("📤 Pushing branch...");
    execSync(`git push -u origin ${branchName}`, { encoding: "utf8" });
    
    // Create draft PR
    console.log("🔄 Creating draft PR...");
    const prBody = `---
bot-context:
  issue: ${validIssueNumber}
  started: ${new Date().toISOString()}
  last-update: ${new Date().toISOString()}
  phase: initial
---

## 🤖 Bot-Managed PR

This PR is being worked on by an automated bot.

**Linked Issue:** Fixes #${validIssueNumber}

### Current Status: 🚧 Initial Setup

### Progress Tracking
- [x] Issue claimed
- [x] Branch created
- [x] PR opened
- [ ] Requirements analyzed
- [ ] Implementation planned
- [ ] Development started

### Bot Commands
- \`/bot status\` - Get current bot status
- \`/bot resume\` - Resume work after interruption
- \`/bot handoff\` - Prepare for human takeover

### Work Context
Bot context is stored in \`.bot/\` directory for persistence.

---
_This PR is managed by the automated workflow bot._
`;
    
    execSync(
      `gh pr create --draft --title "WIP: #${validIssueNumber} - ${issue.title}" --body '${prBody.replace(/'/g, "'\"'\"'")}'`,
      { encoding: "utf8" }
    );
    
    console.log("\n✅ Successfully claimed issue #" + validIssueNumber);
    console.log("📍 Branch: " + branchName);
    console.log("🔧 Next: Run 'node scripts/bot-workflow/bot-checkpoint.js' to save progress");
    
  } catch (error) {
    console.error("❌ Error claiming issue:", error.message);
    
    // Try to clean up
    try {
      execSync('git checkout main', { encoding: "utf8", stdio: "ignore" });
    } catch {}
    
    process.exit(1);
  }
}

main();