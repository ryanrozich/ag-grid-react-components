#!/usr/bin/env node

/**
 * Setup a git worktree for bot development
 * Usage: node setup-worktree.js <issue-number> <description>
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('setup-worktree.js');


// Configuration
const BOT_WORKSPACE_DIR = process.env.BOT_WORKSPACE_DIR || path.join(process.env.HOME, 'ag-grid-worktrees');
const DEFAULT_BRANCH = process.env.BOT_DEFAULT_BRANCH || 'main';

// Parse arguments
const [issueNumber, description] = process.argv.slice(2);

if (!issueNumber) {
  console.error('❌ Usage: node setup-worktree.js <issue-number> [description]');
  process.exit(1);
}

// Generate branch name
const safeBranchName = description 
  ? `feature/${issueNumber}-${description.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  : `feature/issue-${issueNumber}`;

const worktreePath = path.join(BOT_WORKSPACE_DIR, safeBranchName);

console.log(`🌳 Setting up worktree for issue #${issueNumber}`);
console.log(`📁 Workspace: ${BOT_WORKSPACE_DIR}`);
console.log(`🌿 Branch: ${safeBranchName}`);

try {
  // Ensure workspace directory exists
  if (!fs.existsSync(BOT_WORKSPACE_DIR)) {
    console.log(`📁 Creating workspace directory...`);
    fs.mkdirSync(BOT_WORKSPACE_DIR, { recursive: true });
  }

  // Fetch latest from origin
  console.log(`🔄 Fetching latest from origin...`);
  execSync(`git fetch origin ${DEFAULT_BRANCH}`, { stdio: 'inherit' });

  // Check if branch already exists
  let branchExists = false;
  try {
    execSync(`git show-ref --verify --quiet refs/heads/${safeBranchName}`);
    branchExists = true;
  } catch (e) {
    // Branch doesn't exist, which is fine
  }

  if (!branchExists) {
    // Create branch from main
    console.log(`🌿 Creating branch ${safeBranchName} from ${DEFAULT_BRANCH}...`);
    execSync(`git branch ${safeBranchName} origin/${DEFAULT_BRANCH}`);
  }

  // Check if worktree already exists
  if (fs.existsSync(worktreePath)) {
    console.log(`⚠️  Worktree already exists at ${worktreePath}`);
    console.log(`   Removing old worktree...`);
    execSync(`rm -rf ${worktreePath}`);
    execSync(`git worktree prune`);
  }

  // Create worktree
  console.log(`🌳 Creating worktree...`);
  execSync(`git worktree add ${worktreePath} ${safeBranchName}`);

  // Initialize bot state directory
  const botStateDir = path.join(worktreePath, '.bot');
  if (!fs.existsSync(botStateDir)) {
    console.log(`🤖 Initializing bot state directory...`);
    fs.mkdirSync(botStateDir);
    
    // Create initial context file
    const context = {
      issue: parseInt(issueNumber),
      branch: safeBranchName,
      worktree: worktreePath,
      createdAt: new Date().toISOString(),
      status: 'initialized'
    };
    
    fs.writeFileSync(
      path.join(botStateDir, 'context.json'),
      JSON.stringify(context, null, 2)
    );
    
    // Create initial memory file
    fs.writeFileSync(
      path.join(botStateDir, 'memory.md'),
      `# Bot Memory Log - Issue #${issueNumber}\n\n## ${new Date().toISOString()}\n- Initialized worktree for issue #${issueNumber}\n- Branch: ${safeBranchName}\n- Worktree: ${worktreePath}\n`
    );
  }

  // Install dependencies in worktree
  console.log(`📦 Installing dependencies in worktree...`);
  execSync(`cd ${worktreePath} && npm ci`, { stdio: 'inherit' });

  console.log(`\n✅ Worktree setup complete!`);
  console.log(`\n📍 Working directory: ${worktreePath}`);
  console.log(`🌿 Branch: ${safeBranchName}`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${worktreePath}`);
  console.log(`  # Start working on issue #${issueNumber}`);

  // Output JSON for automation
  const result = {
    success: true,
    issue: parseInt(issueNumber),
    branch: safeBranchName,
    worktree: worktreePath,
    botStateDir: botStateDir
  };
  
  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(result, null, 2));

} catch (error) {
  console.error(`\n❌ Error setting up worktree:`, error.message);
  process.exit(1);
}