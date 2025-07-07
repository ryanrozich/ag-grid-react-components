#!/usr/bin/env node

/**
 * Shows status of all bot-managed work
 * Usage: node bot-status-all.js
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('bot-status-all.js');


// Configuration
const BOT_WORKSPACE_DIR = process.env.BOT_WORKSPACE_DIR || path.join(process.env.HOME, 'ag-grid-worktrees');

console.log(`📊 Bot Work Status Report`);
console.log(`========================\n`);

async function getWorkStatus() {
  const status = {
    active: [],
    stale: [],
    completed: []
  };

  try {
    // Get all open issues with agent labels
    console.log(`🔍 Checking issues...`);
    const issues = JSON.parse(
      execSync(`gh issue list --json number,title,labels,updatedAt --limit 50`, { encoding: 'utf8' })
    );

    const agentIssues = issues.filter(issue => 
      issue.labels.some(label => label.name.startsWith('agent:'))
    );

    // Get all open PRs with agent labels
    console.log(`🔍 Checking pull requests...`);
    const prs = JSON.parse(
      execSync(`gh pr list --json number,title,labels,updatedAt,isDraft,headRefName --limit 50`, { encoding: 'utf8' })
    );

    const agentPRs = prs.filter(pr => 
      pr.labels.some(label => label.name.startsWith('agent:'))
    );

    // Check worktrees
    console.log(`🔍 Checking worktrees...`);
    let worktrees = [];
    if (fs.existsSync(BOT_WORKSPACE_DIR)) {
      // Check both root and feature subdirectory
      const checkDirs = [BOT_WORKSPACE_DIR, path.join(BOT_WORKSPACE_DIR, 'feature')];
      
      for (const checkDir of checkDirs) {
        if (!fs.existsSync(checkDir)) continue;
        
        const dirs = fs.readdirSync(checkDir);
        for (const dir of dirs) {
          const worktreePath = path.join(checkDir, dir);
          const stat = fs.statSync(worktreePath);
          
          if (stat.isDirectory()) {
            const botStateDir = path.join(worktreePath, '.bot');
            
            if (fs.existsSync(botStateDir)) {
              try {
                const contextPath = path.join(botStateDir, 'context.json');
                if (fs.existsSync(contextPath)) {
                  const context = JSON.parse(
                    fs.readFileSync(contextPath, 'utf8')
                  );
                  worktrees.push({
                    path: worktreePath,
                    branch: dir,
                    context: context
                  });
                }
              } catch (e) {
                // Invalid context file
              }
            }
          }
        }
      }
    }

    // Process issues
    for (const issue of agentIssues) {
      const labels = issue.labels.map(l => l.name);
      const issueStatus = {
        number: issue.number,
        title: issue.title,
        labels: labels,
        updatedAt: issue.updatedAt,
        type: 'issue'
      };

      // Find associated PR
      const associatedPR = agentPRs.find(pr => {
        const branchMatch = pr.headRefName.match(/(\d+)/);
        return branchMatch && parseInt(branchMatch[1]) === issue.number;
      });

      if (associatedPR) {
        issueStatus.pr = associatedPR.number;
        issueStatus.prDraft = associatedPR.isDraft;
      }

      // Find worktree
      const worktree = worktrees.find(w => w.context.issue === issue.number);
      if (worktree) {
        issueStatus.worktree = worktree.branch;
        issueStatus.checkpoints = worktree.context.checkpoints || 0;
        issueStatus.lastCheckpoint = worktree.context.lastCheckpoint;
      }

      // Categorize
      const lastUpdate = new Date(issue.updatedAt);
      const hoursSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60);

      if (labels.includes('agent:done')) {
        status.completed.push(issueStatus);
      } else if (hoursSinceUpdate > 24) {
        status.stale.push(issueStatus);
      } else {
        status.active.push(issueStatus);
      }
    }

    // Sort by update time
    const sortByUpdate = (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);
    status.active.sort(sortByUpdate);
    status.stale.sort(sortByUpdate);
    status.completed.sort(sortByUpdate);

  } catch (error) {
    console.error(`Error gathering status:`, error.message);
  }

  return status;
}

function formatTime(dateString) {
  const date = new Date(dateString);
  const now = Date.now();
  const diff = now - date;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else {
    return 'recently';
  }
}

async function displayStatus() {
  const status = await getWorkStatus();

  // Active work
  if (status.active.length > 0) {
    console.log(`🟢 Active Work (${status.active.length})`);
    console.log(`─────────────────────────────`);
    
    for (const work of status.active) {
      console.log(`\n#${work.number}: ${work.title}`);
      console.log(`  Status: ${work.labels.filter(l => l.startsWith('agent:')).join(', ')}`);
      console.log(`  Updated: ${formatTime(work.updatedAt)}`);
      
      if (work.pr) {
        console.log(`  PR: #${work.pr}${work.prDraft ? ' (draft)' : ''}`);
      }
      
      if (work.worktree) {
        console.log(`  Worktree: ${work.worktree}`);
        if (work.checkpoints > 0) {
          console.log(`  Checkpoints: ${work.checkpoints} (last: ${formatTime(work.lastCheckpoint)})`);
        }
      }
    }
  }

  // Stale work
  if (status.stale.length > 0) {
    console.log(`\n\n🟡 Stale Work (>24h) (${status.stale.length})`);
    console.log(`─────────────────────────────`);
    
    for (const work of status.stale) {
      console.log(`\n#${work.number}: ${work.title}`);
      console.log(`  ⚠️  Last update: ${formatTime(work.updatedAt)}`);
      console.log(`  Status: ${work.labels.filter(l => l.startsWith('agent:')).join(', ')}`);
      
      if (work.pr) {
        console.log(`  PR: #${work.pr}${work.prDraft ? ' (draft)' : ''}`);
      }
    }
  }

  // Completed recently
  const recentCompleted = status.completed.slice(0, 5);
  if (recentCompleted.length > 0) {
    console.log(`\n\n✅ Recently Completed (${recentCompleted.length})`);
    console.log(`─────────────────────────────`);
    
    for (const work of recentCompleted) {
      console.log(`\n#${work.number}: ${work.title}`);
      console.log(`  Completed: ${formatTime(work.updatedAt)}`);
    }
  }

  // Summary
  console.log(`\n\n📈 Summary`);
  console.log(`─────────────────────────────`);
  console.log(`Active: ${status.active.length}`);
  console.log(`Stale: ${status.stale.length}`);
  console.log(`Completed: ${status.completed.length}`);
  
  // Worktree summary
  try {
    const worktreeList = execSync('git worktree list', { encoding: 'utf8' });
    const worktreeCount = worktreeList.split('\n').filter(Boolean).length - 1; // Exclude main
    console.log(`Worktrees: ${worktreeCount}`);
  } catch (e) {
    // Git command failed
  }

  console.log(`\n💡 Tips:`);
  console.log(`- Resume stale work: node scripts/bot-workflow/core/bot-resume-work.js <number>`);
  console.log(`- Check specific issue: gh issue view <number>`);
  console.log(`- View PR: gh pr view <number>`);
}

// Run the status report
displayStatus().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});