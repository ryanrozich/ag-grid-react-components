#!/usr/bin/env node

/**
 * Bot saves progress checkpoint
 * Usage: node bot-checkpoint.js "checkpoint message"
 * Must be run from within the worktree directory
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('bot-checkpoint.js');


// Get checkpoint message
const message = process.argv.slice(2).join(' ');

if (!message) {
  console.error('❌ Usage: node bot-checkpoint.js "checkpoint message"');
  process.exit(1);
}

console.log(`💾 Creating checkpoint: ${message}`);

try {
  // Check if we're in a worktree with bot state
  const botStateDir = path.join(process.cwd(), '.bot');
  if (!fs.existsSync(botStateDir)) {
    throw new Error('Not in a bot worktree directory (no .bot directory found)');
  }

  // Load context
  const contextPath = path.join(botStateDir, 'context.json');
  const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));

  // Get current git status
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  const gitDiff = execSync('git diff', { encoding: 'utf8' });
  const gitDiffStaged = execSync('git diff --staged', { encoding: 'utf8' });

  // Update checkpoint info
  const checkpointTime = new Date().toISOString();
  context.lastCheckpoint = checkpointTime;
  context.checkpointMessage = message;
  context.checkpoints = (context.checkpoints || 0) + 1;

  // Save current state
  const statePath = path.join(botStateDir, `checkpoint-${Date.now()}.json`);
  const checkpointData = {
    timestamp: checkpointTime,
    message: message,
    gitStatus: gitStatus,
    gitDiff: gitDiff,
    gitDiffStaged: gitDiffStaged,
    context: context
  };

  fs.writeFileSync(statePath, JSON.stringify(checkpointData, null, 2));
  console.log(`📄 Saved state to ${path.basename(statePath)}`);

  // Update context
  fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

  // Update memory log
  const memoryPath = path.join(botStateDir, 'memory.md');
  const memoryEntry = `\n## ${checkpointTime}\n- **Checkpoint**: ${message}\n`;

  // Add file changes summary if any
  if (gitStatus) {
    const changes = gitStatus.split('\n').filter(Boolean);
    memoryEntry + `- Files changed: ${changes.length}\n`;
    changes.forEach(change => {
      memoryEntry + `  - ${change}\n`;
    });
  }

  fs.appendFileSync(memoryPath, memoryEntry);

  // Stage all changes
  if (gitStatus) {
    console.log(`📦 Staging changes...`);
    execSync('git add -A', { stdio: 'inherit' });
  }

  // Commit with checkpoint message
  const commitMessage = `checkpoint: ${message}\n\nBot checkpoint #${context.checkpoints} for issue #${context.issue}`;
  console.log(`💬 Committing changes...`);

  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log(`✅ Changes committed`);
  } catch (e) {
    console.log(`ℹ️  No changes to commit`);
  }

  // Update checklist if it exists
  const checklistPath = path.join(botStateDir, 'checklist.md');
  if (fs.existsSync(checklistPath)) {
    console.log(`📋 Checklist found - remember to update task status`);
  }

  // If PR exists, update it
  if (context.pr) {
    console.log(`🔄 Updating PR #${context.pr}...`);
    try {
      // Push changes
      execSync(`git push origin ${context.branch}`, { stdio: 'inherit' });

      // Add checkpoint comment to PR
      execSync(`gh pr comment ${context.pr} --body "🔄 **Checkpoint**: ${message}\n\n- Checkpoint #${context.checkpoints}\n- Time: ${checkpointTime}\n- Commits: $(git rev-list --count HEAD)"`, { stdio: 'inherit' });
    } catch (e) {
      console.log(`⚠️  Could not update PR: ${e.message}`);
    }
  }

  console.log(`\n✅ Checkpoint saved successfully!`);
  console.log(`📊 Total checkpoints: ${context.checkpoints}`);
  console.log(`🕐 Last checkpoint: ${checkpointTime}`);

  // Output for automation
  const result = {
    success: true,
    checkpoint: context.checkpoints,
    message: message,
    timestamp: checkpointTime,
    hasChanges: !!gitStatus,
    issue: context.issue,
    branch: context.branch
  };

  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error(`\n❌ Error creating checkpoint:`, error.message);
  process.exit(1);
}