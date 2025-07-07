#!/usr/bin/env node

/**
 * Bot resumes work on an existing PR or issue
 * Usage: node bot-resume-work.js [pr-number|issue-number]
 * If no argument provided, tries to find the most recent bot work
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Ensure we're in the project root
ensureProjectRoot('bot-resume-work.js');


// Configuration
const BOT_WORKSPACE_DIR = process.env.BOT_WORKSPACE_DIR || path.join(process.env.HOME, 'ag-grid-worktrees');

// Parse arguments
const identifier = process.argv[2];

console.log(`🤖 Bot resuming work...`);

async function findWorkToResume() {
  if (identifier) {
    console.log(`🔍 Looking for PR/Issue #${identifier}...`);

    // Try as PR first
    try {
      const prInfo = JSON.parse(
        execSync(`gh pr view ${identifier} --json number,headRefName,state`, { encoding: 'utf8' })
      );

      if (prInfo.state === 'OPEN') {
        return {
          type: 'pr',
          number: prInfo.number,
          branch: prInfo.headRefName
        };
      }
    } catch (e) {
      // Not a PR or not found
    }

    // Try as issue
    try {
      const issueInfo = JSON.parse(
        execSync(`gh issue view ${identifier} --json number,state,labels`, { encoding: 'utf8' })
      );

      if (issueInfo.state === 'OPEN') {
        // Find associated branch/worktree
        const hasAgentWIP = issueInfo.labels.some(label => label.name === 'agent:wip');
        if (hasAgentWIP) {
          // Look for branch pattern
          const branchPattern = `feature/${issueInfo.number}-`;
          const branches = execSync('git branch -a', { encoding: 'utf8' })
            .split('\n')
            .map(b => b.trim())
            .filter(b => b.includes(branchPattern));

          if (branches.length > 0) {
            const branch = branches[0].replace(/^remotes\/origin\//, '');
            return {
              type: 'issue',
              number: issueInfo.number,
              branch: branch
            };
          }
        }
      }
    } catch (e) {
      // Not an issue or not found
    }
  } else {
    console.log(`🔍 Finding most recent bot work...`);

    // Find open PRs with bot labels
    try {
      const prs = JSON.parse(
        execSync(`gh pr list --json number,headRefName,labels --limit 10`, { encoding: 'utf8' })
      );

      const botPRs = prs.filter(pr =>
        pr.labels.some(label => label.name.startsWith('agent:'))
      );

      if (botPRs.length > 0) {
        return {
          type: 'pr',
          number: botPRs[0].number,
          branch: botPRs[0].headRefName
        };
      }
    } catch (e) {
      console.error('Could not list PRs:', e.message);
    }
  }

  return null;
}

async function resumeWork() {
  try {
    const work = await findWorkToResume();

    if (!work) {
      throw new Error('No work found to resume. Specify a PR or issue number.');
    }

    console.log(`✅ Found ${work.type} #${work.number} on branch ${work.branch}`);

    // Check if worktree exists
    const worktreePath = path.join(BOT_WORKSPACE_DIR, work.branch);

    if (!fs.existsSync(worktreePath)) {
      console.log(`⚠️  Worktree not found at ${worktreePath}`);
      console.log(`🌳 Setting up worktree...`);

      // Extract issue number from branch or use PR number
      const issueMatch = work.branch.match(/feature\/(\d+)-/);
      const issueNumber = issueMatch ? issueMatch[1] : work.number;

      execSync(
        `node ${path.join(__dirname, '../worktree/setup-worktree.js')} ${issueNumber}`,
        { stdio: 'inherit' }
      );
    }

    // Load bot context
    const botStateDir = path.join(worktreePath, '.bot');
    if (!fs.existsSync(botStateDir)) {
      throw new Error(`Bot state not found in worktree. This may not be a bot-managed branch.`);
    }

    const contextPath = path.join(botStateDir, 'context.json');
    const context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));

    // Update context with resume info
    context.lastResumed = new Date().toISOString();
    context.resumeCount = (context.resumeCount || 0) + 1;
    if (work.type === 'pr' && !context.pr) {
      context.pr = work.number;
    }

    fs.writeFileSync(contextPath, JSON.stringify(context, null, 2));

    // Show current status
    console.log(`\n📊 Current Status:`);
    console.log(`- Issue: #${context.issue}`);
    console.log(`- Branch: ${context.branch}`);
    console.log(`- Worktree: ${worktreePath}`);
    console.log(`- Checkpoints: ${context.checkpoints || 0}`);
    console.log(`- Last checkpoint: ${context.lastCheckpoint || 'None'}`);
    if (context.checkpointMessage) {
      console.log(`- Last message: "${context.checkpointMessage}"`);
    }

    // Check for pending changes
    process.chdir(worktreePath);
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    if (gitStatus) {
      console.log(`\n⚠️  Uncommitted changes detected:`);
      console.log(gitStatus);
    }

    // Show recent memory
    const memoryPath = path.join(botStateDir, 'memory.md');
    if (fs.existsSync(memoryPath)) {
      console.log(`\n📝 Recent memory entries:`);
      const memory = fs.readFileSync(memoryPath, 'utf8');
      const lines = memory.split('\n');
      const recentLines = lines.slice(-10).join('\n');
      console.log(recentLines);
    }

    // Show checklist status if exists
    const checklistPath = path.join(botStateDir, 'checklist.md');
    if (fs.existsSync(checklistPath)) {
      console.log(`\n📋 Checklist status:`);
      const checklist = fs.readFileSync(checklistPath, 'utf8');
      const tasks = checklist.match(/- \[[x ]\] .*/g) || [];
      const completed = tasks.filter(t => t.includes('[x]')).length;
      console.log(`Progress: ${completed}/${tasks.length} tasks completed`);
    }

    // Update memory log
    fs.appendFileSync(
      memoryPath,
      `\n## ${context.lastResumed}\n- Resumed work (resume #${context.resumeCount})\n- Current directory: ${worktreePath}\n`
    );

    console.log(`\n✅ Successfully resumed work!`);
    console.log(`📁 Working directory: ${worktreePath}`);
    console.log(`\nYou can now continue development.`);

    // Output for automation
    const result = {
      success: true,
      type: work.type,
      number: work.number,
      issue: context.issue,
      branch: context.branch,
      worktree: worktreePath,
      checkpoints: context.checkpoints || 0,
      hasUncommittedChanges: !!gitStatus
    };

    console.log(`\n🔧 Automation output:`);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(`\n❌ Error resuming work:`, error.message);
    process.exit(1);
  }
}

// Run the resume process
resumeWork().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});