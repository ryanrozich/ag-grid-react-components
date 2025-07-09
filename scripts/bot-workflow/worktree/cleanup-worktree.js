#!/usr/bin/env node

/**
 * Cleanup a git worktree after bot work is complete
 * Usage: node cleanup-worktree.js <branch-name>
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('cleanup-worktree.js');


// Configuration
const BOT_WORKSPACE_DIR = process.env.BOT_WORKSPACE_DIR || path.join(process.env.HOME, 'ag-grid-worktrees');

// Parse arguments
const [branchName] = process.argv.slice(2);

if (!branchName) {
  console.error('❌ Usage: node cleanup-worktree.js <branch-name>');
  console.error('   Example: node cleanup-worktree.js feature/123-add-timezone');
  process.exit(1);
}

const worktreePath = path.join(BOT_WORKSPACE_DIR, branchName);

console.log(`🧹 Cleaning up worktree for branch: ${branchName}`);
console.log(`📁 Worktree path: ${worktreePath}`);

try {
  // Check if worktree exists
  if (!fs.existsSync(worktreePath)) {
    console.log(`⚠️  Worktree not found at ${worktreePath}`);
    console.log(`   Running git worktree prune anyway...`);
    execSync(`git worktree prune`);
  } else {
    // Save any important state before cleanup
    const botStateDir = path.join(worktreePath, '.bot');
    if (fs.existsSync(botStateDir)) {
      console.log(`💾 Saving bot state before cleanup...`);

      // Read final state
      const contextPath = path.join(botStateDir, 'context.json');
      if (fs.existsSync(contextPath)) {
        const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
        context.cleanedUpAt = new Date().toISOString();

        // Save to main repo's cleanup log
        const cleanupLogDir = path.join(process.cwd(), '.bot-cleanup-logs');
        if (!fs.existsSync(cleanupLogDir)) {
          fs.mkdirSync(cleanupLogDir, { recursive: true });
        }

        const logFile = path.join(cleanupLogDir, `${branchName.replace(/\//g, '-')}.json`);
        fs.writeFileSync(logFile, JSON.stringify(context, null, 2));
        console.log(`📋 Saved cleanup log to ${logFile}`);
      }
    }

    // Remove worktree directory
    console.log(`🗑️  Removing worktree directory...`);
    execSync(`rm -rf ${worktreePath}`);
  }

  // Prune worktree references
  console.log(`🌳 Pruning worktree references...`);
  execSync(`git worktree prune`);

  // Check if branch was merged
  let branchMerged = false;
  try {
    execSync(`git branch --merged | grep -q "${branchName}"`);
    branchMerged = true;
  } catch (e) {
    // Branch not merged or doesn't exist
  }

  if (branchMerged) {
    console.log(`🔀 Branch ${branchName} has been merged`);

    // Delete local branch
    console.log(`🗑️  Deleting local branch...`);
    try {
      execSync(`git branch -d ${branchName}`);
    } catch (e) {
      console.log(`⚠️  Could not delete local branch (might not exist locally)`);
    }

    // Delete remote branch
    console.log(`🗑️  Deleting remote branch...`);
    try {
      execSync(`git push origin --delete ${branchName}`);
    } catch (e) {
      console.log(`⚠️  Could not delete remote branch (might not exist or no permissions)`);
    }
  } else {
    console.log(`⚠️  Branch ${branchName} has not been merged - keeping branch`);
  }

  // List remaining worktrees
  console.log(`\n📋 Remaining worktrees:`);
  execSync(`git worktree list`, { stdio: 'inherit' });

  console.log(`\n✅ Worktree cleanup complete!`);

  // Output JSON for automation
  const result = {
    success: true,
    branch: branchName,
    worktree: worktreePath,
    branchDeleted: branchMerged
  };

  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error(`\n❌ Error cleaning up worktree:`, error.message);
  process.exit(1);
}