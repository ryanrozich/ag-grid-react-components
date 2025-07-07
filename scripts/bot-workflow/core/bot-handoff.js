#!/usr/bin/env node

/**
 * Bot prepares work for human takeover
 * Usage: node bot-handoff.js "reason for handoff"
 * Must be run from within the worktree directory
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('bot-handoff.js');


// Get handoff reason
const reason = process.argv.slice(2).join(' ');

if (!reason) {
  console.error('❌ Usage: node bot-handoff.js "reason for handoff"');
  console.error('   Example: node bot-handoff.js "Need decision on API design"');
  process.exit(1);
}

console.log(`🤝 Preparing handoff: ${reason}`);

try {
  // Check if we're in a worktree with bot state
  const botStateDir = path.join(process.cwd(), '.bot');
  if (!fs.existsSync(botStateDir)) {
    throw new Error('Not in a bot worktree directory (no .bot directory found)');
  }

  // Load context
  const contextPath = path.join(botStateDir, 'context.json');
  const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));

  // Ensure all changes are committed
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  if (gitStatus) {
    console.log(`📦 Committing pending changes...`);
    execSync('git add -A', { stdio: 'inherit' });
    execSync(`git commit -m "bot: checkpoint before handoff\n\nReason: ${reason}"`, { stdio: 'inherit' });
  }

  // Push all changes
  console.log(`🔄 Pushing changes...`);
  execSync(`git push origin ${context.branch}`, { stdio: 'inherit' });

  // Create or update PR if needed
  let prNumber = context.pr;
  
  if (!prNumber) {
    console.log(`📝 Creating pull request...`);
    const prResult = execSync(
      `gh pr create --title "WIP: Issue #${context.issue}" --body "🤖 Bot-created PR for issue #${context.issue}\n\n**Status**: Needs human review\n**Reason**: ${reason}" --draft`,
      { encoding: 'utf8' }
    );
    
    // Extract PR number from output
    const prMatch = prResult.match(/\/pull\/(\d+)/);
    if (prMatch) {
      prNumber = parseInt(prMatch[1]);
      context.pr = prNumber;
      fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));
    }
  }

  // Generate handoff summary
  console.log(`📋 Generating handoff summary...`);
  
  const handoffTime = new Date().toISOString();
  const commitCount = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
  const filesChanged = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);

  // Read memory log for summary
  const memoryPath = path.join(botStateDir, 'memory.md');
  const memoryContent = fs.readFileSync(memoryPath, 'utf8');

  // Read checklist if exists
  let checklistSummary = '';
  const checklistPath = path.join(botStateDir, 'checklist.md');
  if (fs.existsSync(checklistPath)) {
    const checklist = fs.readFileSync(checklistPath, 'utf8');
    const tasks = checklist.match(/- \[[x ]\] .*/g) || [];
    const completed = tasks.filter(t => t.includes('[x]')).length;
    checklistSummary = `\n### 📋 Progress\n- Completed: ${completed}/${tasks.length} tasks\n\n${checklist}`;
  }

  // Create handoff document
  const handoffDoc = `# 🤝 Bot Handoff Summary

**Issue**: #${context.issue}${context.issueTitle ? ` - ${context.issueTitle}` : ''}
**PR**: #${prNumber || 'Not created yet'}
**Branch**: \`${context.branch}\`
**Handoff Time**: ${handoffTime}
**Reason**: ${reason}

## 📊 Work Summary
- Total commits: ${commitCount}
- Total checkpoints: ${context.checkpoints || 0}
- Files changed: ${filesChanged.length}
- Work started: ${context.claimedAt || context.createdAt}
- Last checkpoint: ${context.lastCheckpoint || 'None'}

## 📝 Files Modified
${filesChanged.map(f => `- ${f}`).join('\n')}

${checklistSummary}

## 🧠 Bot Memory Log
${memoryContent}

## 🚨 Handoff Reason
${reason}

## 🎯 Next Steps
The human developer should:
1. Review the changes made by the bot
2. Address the handoff reason: "${reason}"
3. Continue development or provide guidance
4. Update labels and PR status as needed

## 🔧 To Resume Bot Work
\`\`\`bash
node scripts/bot-workflow/core/bot-resume-work.js ${prNumber || context.issue}
\`\`\`
`;

  // Save handoff document
  const handoffPath = path.join(botStateDir, 'HANDOFF.md');
  fs.writeFileSync(handoffPath, handoffDoc);
  console.log(`📄 Created handoff document: ${handoffPath}`);

  // Update context
  context.status = 'handoff';
  context.handoffAt = handoffTime;
  context.handoffReason = reason;
  fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

  // Update PR description with handoff info
  if (prNumber) {
    console.log(`🔄 Updating PR #${prNumber}...`);
    
    const prBody = `🤖 Bot-created PR for issue #${context.issue}

## 🤝 Handoff Required
**Status**: Needs human review
**Reason**: ${reason}
**Time**: ${handoffTime}

## 📊 Summary
- Commits: ${commitCount}
- Checkpoints: ${context.checkpoints || 0}
- Files changed: ${filesChanged.length}

## 📝 Handoff Details
See \`.bot/HANDOFF.md\` for complete handoff documentation.

## 🎯 Next Steps
1. Review the bot's work
2. Address: "${reason}"
3. Continue development or provide guidance

---
*This PR was created by an automated bot and requires human intervention.*`;

    execSync(`gh pr edit ${prNumber} --body "${prBody.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    
    // Add labels
    execSync(`gh pr edit ${prNumber} --add-label "needs-human-review"`, { stdio: 'inherit' });
    
    // Add comment
    execSync(`gh pr comment ${prNumber} --body "🤝 **Handoff to Human Developer**\n\n**Reason**: ${reason}\n\n@${process.env.GITHUB_REPOSITORY_OWNER || 'owner'} - This PR needs your attention.\n\nSee \`.bot/HANDOFF.md\` for detailed handoff information."`, { stdio: 'inherit' });
  }

  // Update issue
  console.log(`🔄 Updating issue #${context.issue}...`);
  execSync(`gh issue comment ${context.issue} --body "🤝 **Bot Handoff**\n\n**Reason**: ${reason}\n**PR**: #${prNumber || 'Not created'}\n**Time**: ${handoffTime}\n\nThe bot has prepared a handoff for human review. See the PR for details."`, { stdio: 'inherit' });
  
  // Update issue labels
  execSync(`gh issue edit ${context.issue} --add-label "agent:needs-review" --remove-label "agent:wip"`, { stdio: 'inherit' });

  console.log(`\n✅ Handoff prepared successfully!`);
  console.log(`📋 Issue: #${context.issue}`);
  if (prNumber) {
    console.log(`🔗 PR: #${prNumber}`);
  }
  console.log(`📄 Handoff document: .bot/HANDOFF.md`);
  console.log(`\nThe human developer has been notified.`);

  // Output for automation
  const result = {
    success: true,
    issue: context.issue,
    pr: prNumber,
    branch: context.branch,
    reason: reason,
    handoffTime: handoffTime,
    filesChanged: filesChanged.length,
    commits: parseInt(commitCount)
  };

  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error(`\n❌ Error preparing handoff:`, error.message);
  process.exit(1);
}