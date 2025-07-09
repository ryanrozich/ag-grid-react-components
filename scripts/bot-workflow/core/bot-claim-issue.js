#!/usr/bin/env node

/**
 * Bot claims an issue and sets up development environment
 * Usage: node bot-claim-issue.js <issue-number>
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure we're in the project root
ensureProjectRoot('bot-claim-issue.js');

// Check for required environment variables
if (!process.env.GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error('❌ Usage: node bot-claim-issue.js <issue-number>');
  process.exit(1);
}

console.log(`🤖 Bot claiming issue #${issueNumber}...`);

async function claimIssue() {
  try {
    // Check if issue exists and is claimable
    console.log(`📋 Checking issue #${issueNumber}...`);
    const issueInfo = JSON.parse(
      execSync(`gh issue view ${issueNumber} --json state,labels,assignees`, { encoding: 'utf8' })
    );

    if (issueInfo.state !== 'OPEN') {
      throw new Error(`Issue #${issueNumber} is not open (state: ${issueInfo.state})`);
    }

    // Check if already claimed
    const hasAgentWIP = issueInfo.labels.some(label => label.name === 'agent:wip');
    if (hasAgentWIP) {
      throw new Error(`Issue #${issueNumber} is already claimed by another bot`);
    }

    // Check if it's marked for bot work
    const hasAgentTodo = issueInfo.labels.some(label => label.name === 'agent:todo');
    if (!hasAgentTodo) {
      console.warn(`⚠️  Issue #${issueNumber} is not labeled as 'agent:todo' - proceeding anyway`);
    }

    // Add claim comment to prevent race conditions
    console.log(`💬 Adding claim comment...`);
    const claimTime = new Date().toISOString();
    execSync(`gh issue comment ${issueNumber} --body "🤖 **Bot Claiming Issue**\n\nThis issue has been claimed by a bot at ${claimTime}.\n\n*Status: Setting up development environment...*"`, { stdio: 'inherit' });

    // Update labels
    console.log(`🏷️  Updating labels...`);
    // Remove agent:todo if present
    if (hasAgentTodo) {
      execSync(`gh issue edit ${issueNumber} --remove-label "agent:todo"`, { stdio: 'inherit' });
    }
    // Add agent:wip and status:in-progress
    execSync(`gh issue edit ${issueNumber} --add-label "agent:wip" --add-label "status: in-progress"`, { stdio: 'inherit' });

    // Get issue details for branch name
    const issueDetails = JSON.parse(
      execSync(`gh issue view ${issueNumber} --json title`, { encoding: 'utf8' })
    );

    // Create safe branch description from title
    const description = issueDetails.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);

    // Set up worktree
    console.log(`🌳 Setting up worktree...`);
    let worktreeInfo;
    try {
      const setupResult = execSync(
        `node ${path.join(__dirname, '../worktree/setup-worktree.js')} ${issueNumber} "${description}"`,
        { encoding: 'utf8', stdio: 'pipe' }
      );

      // Parse the last JSON output from setup-worktree
      // Look for JSON that starts with { and ends with } on its own line
      const lines = setupResult.split('\n');
      let jsonStr = '';
      let inJson = false;

      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line === '}' && !inJson) {
          jsonStr = '}' + jsonStr;
          inJson = true;
        } else if (inJson) {
          jsonStr = line + '\n' + jsonStr;
          if (line.startsWith('{')) {
            break;
          }
        }
      }

      if (jsonStr) {
        worktreeInfo = JSON.parse(jsonStr);
      }

      // If we couldn't parse JSON but the worktree exists, consider it successful
      if (!worktreeInfo) {
        // Check if worktree was created by looking for the directory
        const worktreePath = `${process.env.HOME}/ag-grid-worktrees/feature/${issueNumber}-${description}`;
        if (fs.existsSync(worktreePath)) {
          worktreeInfo = {
            success: true,
            worktree: worktreePath,
            branch: `feature/${issueNumber}-${description}`,
            botStateDir: path.join(worktreePath, '.bot')
          };
        }
      }
    } catch (error) {
      // Even if the command had warnings, check if worktree exists
      const worktreePath = `${process.env.HOME}/ag-grid-worktrees/feature/${issueNumber}-${description}`;
      if (fs.existsSync(worktreePath)) {
        worktreeInfo = {
          success: true,
          worktree: worktreePath,
          branch: `feature/${issueNumber}-${description}`,
          botStateDir: path.join(worktreePath, '.bot')
        };
      } else {
        throw new Error(`Failed to set up worktree: ${error.message}`);
      }
    }

    if (!worktreeInfo || !worktreeInfo.success) {
      throw new Error('Failed to set up worktree - no worktree information returned');
    }

    // Initialize bot state with issue context
    const botStateDir = worktreeInfo.botStateDir;
    const contextPath = path.join(botStateDir, 'context.json');
    const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));

    // Enhance context with issue information
    context.issue = parseInt(issueNumber);
    context.issueTitle = issueDetails.title;
    context.claimedAt = claimTime;
    context.status = 'claimed';

    fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

    // Update memory log
    const memoryPath = path.join(botStateDir, 'memory.md');
    const memoryContent = fs.readFileSync(memoryPath, 'utf8');
    fs.writeFileSync(
      memoryPath,
      memoryContent + `\n## ${claimTime}\n- Claimed issue #${issueNumber}: ${issueDetails.title}\n- Updated labels: removed agent:todo, added agent:wip\n`
    );

    // Final status comment
    console.log(`✅ Updating status...`);
    execSync(`gh issue comment ${issueNumber} --body "✅ **Setup Complete**\n\n- Branch: \`${worktreeInfo.branch}\`\n- Worktree: \`${worktreeInfo.worktree}\`\n- Status: Ready to begin development\n\nThe bot will now start working on this issue."`, { stdio: 'inherit' });

    console.log(`\n✅ Successfully claimed issue #${issueNumber}!`);
    console.log(`📁 Worktree: ${worktreeInfo.worktree}`);
    console.log(`🌿 Branch: ${worktreeInfo.branch}`);
    console.log(`\nBot can now begin development work.`);

    // Return success for automation
    return {
      success: true,
      issue: parseInt(issueNumber),
      branch: worktreeInfo.branch,
      worktree: worktreeInfo.worktree
    };

  } catch (error) {
    console.error(`\n❌ Error claiming issue:`, error.message);

    // Try to update issue with error status
    try {
      execSync(`gh issue comment ${issueNumber} --body "❌ **Failed to claim issue**\n\nError: ${error.message}\n\nThe bot was unable to claim this issue. Human intervention may be required."`);
    } catch (e) {
      // Ignore errors in error reporting
    }

    process.exit(1);
  }
}

// Run the claim process
claimIssue().then(result => {
  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(result, null, 2));
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});