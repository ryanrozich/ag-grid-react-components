#!/usr/bin/env node

/**
 * Bot creates a pull request and updates issue labels
 * Usage: node bot-create-pr.js [options]
 * Must be run from within the worktree directory
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log(`🚀 Creating pull request...`);

try {
  // Check if we're in a worktree with bot state
  const botStateDir = path.join(process.cwd(), '.bot');
  if (!fs.existsSync(botStateDir)) {
    throw new Error('Not in a bot worktree directory (no .bot directory found)');
  }

  // Load context
  const contextPath = path.join(botStateDir, 'context.json');
  const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));

  if (!context.issue) {
    throw new Error('No issue number found in bot context');
  }

  // Get the current branch
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

  // Push to origin if not already pushed
  console.log(`📤 Pushing to origin...`);
  try {
    execSync(`git push -u origin ${currentBranch}`, { stdio: 'inherit' });
  } catch (e) {
    console.log(`ℹ️  Branch may already be pushed`);
  }

  // Parse command line arguments
  const args = process.argv.slice(2);
  let title = '';
  let body = '';

  // Simple argument parsing
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--title' && args[i + 1]) {
      title = args[i + 1];
      i++;
    } else if (args[i] === '--body' && args[i + 1]) {
      body = args[i + 1];
      i++;
    }
  }

  // If no title provided, use a default based on the issue
  if (!title) {
    const issueInfo = JSON.parse(
      execSync(`gh issue view ${context.issue} --json title`, { encoding: 'utf8' })
    );
    title = issueInfo.title;
  }

  // If no body provided, create a default one
  if (!body) {
    body = `Closes #${context.issue}\\n\\nImplemented as per issue specifications.`;
  }

  // Create the PR
  console.log(`📝 Creating PR for issue #${context.issue}...`);
  const prCommand = `gh pr create --title "${title}" --body "${body}" --base main`;

  let prUrl = '';
  try {
    const output = execSync(prCommand, { encoding: 'utf8' });
    // Extract PR URL from output
    const urlMatch = output.match(/https:\/\/github\.com\/[^\s]+\/pull\/\d+/);
    if (urlMatch) {
      prUrl = urlMatch[0];
      const prNumber = prUrl.match(/\/pull\/(\d+)/)[1];
      context.pr = parseInt(prNumber);
      console.log(`✅ PR #${prNumber} created: ${prUrl}`);
    }
  } catch (e) {
    console.error(`❌ Failed to create PR: ${e.message}`);
    throw e;
  }

  // Update context with PR info
  fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

  // Update issue labels: remove agent:wip, add agent:needs-review and status:in-code-review
  console.log(`🏷️  Updating issue labels...`);
  try {
    // Remove agent:wip label from issue
    execSync(`gh issue edit ${context.issue} --remove-label "agent:wip"`, { stdio: 'inherit' });
    console.log(`✅ Removed 'agent:wip' label from issue #${context.issue}`);

    // Add both agent and status labels to issue
    execSync(`gh issue edit ${context.issue} --add-label "agent:needs-review" --add-label "status: in-code-review"`, { stdio: 'inherit' });
    console.log(`✅ Added 'agent:needs-review' and 'status: in-code-review' labels to issue #${context.issue}`);

    // Also add labels to the PR
    if (context.pr) {
      console.log(`🏷️  Adding labels to PR #${context.pr}...`);
      execSync(`gh pr edit ${context.pr} --add-label "agent:needs-review" --add-label "status: in-code-review"`, { stdio: 'inherit' });
      console.log(`✅ Added 'agent:needs-review' and 'status: in-code-review' labels to PR #${context.pr}`);
    }
  } catch (e) {
    console.warn(`⚠️  Could not update labels: ${e.message}`);
  }

  // Update memory log
  const memoryPath = path.join(botStateDir, 'memory.md');
  const timestamp = new Date().toISOString();
  const memoryEntry = `\n## ${timestamp}\n- **PR Created**: #${context.pr} - ${title}\n- URL: ${prUrl}\n- Labels updated: removed 'agent:wip', added 'agent:needs-review'\n`;
  fs.appendFileSync(memoryPath, memoryEntry);

  console.log(`\n✅ Pull request created successfully!`);
  console.log(`📊 Issue: #${context.issue}`);
  console.log(`🔗 PR: ${prUrl}`);
  console.log(`🏷️  Labels updated`);

  // Output for automation
  const result = {
    success: true,
    issue: context.issue,
    pr: context.pr,
    url: prUrl,
    branch: currentBranch
  };

  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error(`\n❌ Error creating PR:`, error.message);
  process.exit(1);
}