#!/usr/bin/env node

/**
 * Monitor progress of bot-assigned tasks
 * Usage: node monitor-progress.js [tracking-issue]
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('monitor-progress.js');


// Parse arguments
const [trackingIssue] = process.argv.slice(2);

console.log(`📊 Bot Task Progress Monitor`);
console.log(`${'═'.repeat(50)}\n`);

/**
 * Get all bot-assigned tasks
 */
async function getBotTasks(tracking) {
  const tasks = [];

  try {
    if (tracking) {
      // Get tasks linked to tracking issue
      console.log(`🔍 Checking tracking issue #${tracking}...`);
      const issueBody = JSON.parse(
        execSync(`gh issue view ${tracking} --json body`, { encoding: 'utf8' })
      ).body;

      // Extract linked issue numbers
      const issueMatches = issueBody.matchAll(/#(\d+)/g);
      for (const match of issueMatches) {
        const issueNum = parseInt(match[1]);
        if (issueNum !== parseInt(tracking)) {
          tasks.push(issueNum);
        }
      }
    } else {
      // Get all issues with agent labels
      console.log(`🔍 Finding all bot-assigned tasks...`);
      const issues = JSON.parse(
        execSync(`gh issue list --json number,title,labels,assignees,createdAt,updatedAt --limit 100`, { encoding: 'utf8' })
      );

      const agentIssues = issues.filter(issue =>
        issue.labels.some(l => l.name.startsWith('agent:'))
      );

      tasks.push(...agentIssues.map(i => i.number));
    }
  } catch (error) {
    console.error(`Error fetching tasks:`, error.message);
  }

  return tasks;
}

/**
 * Get detailed task status
 */
async function getTaskStatus(issueNumber) {
  try {
    const issue = JSON.parse(
      execSync(`gh issue view ${issueNumber} --json number,title,labels,state,createdAt,updatedAt,comments`, { encoding: 'utf8' })
    );

    // Determine status from labels
    const labels = issue.labels.map(l => l.name);
    let status = 'unknown';
    let progress = 0;

    if (labels.includes('agent:done')) {
      status = 'completed';
      progress = 100;
    } else if (labels.includes('agent:needs-review')) {
      status = 'review';
      progress = 90;
    } else if (labels.includes('agent:wip')) {
      status = 'in-progress';
      progress = 50;
    } else if (labels.includes('agent:todo')) {
      status = 'pending';
      progress = 0;
    } else if (labels.includes('agent:failed')) {
      status = 'failed';
      progress = -1;
    }

    // Check for PR
    let pr = null;
    const prComments = issue.comments.filter(c => 
      c.body.includes('pull request') || c.body.includes('/pull/')
    );
    
    if (prComments.length > 0) {
      const prMatch = prComments[0].body.match(/\/pull\/(\d+)/);
      if (prMatch) {
        pr = parseInt(prMatch[1]);
      }
    }

    // Look for checkpoints in comments
    const checkpoints = issue.comments.filter(c =>
      c.body.includes('Checkpoint') || c.body.includes('checkpoint')
    ).length;

    // Calculate time metrics
    const created = new Date(issue.createdAt);
    const updated = new Date(issue.updatedAt);
    const now = new Date();
    const ageHours = (now - created) / (1000 * 60 * 60);
    const idleHours = (now - updated) / (1000 * 60 * 60);

    return {
      number: issue.number,
      title: issue.title,
      status: status,
      progress: progress,
      labels: labels,
      pr: pr,
      checkpoints: checkpoints,
      ageHours: Math.round(ageHours),
      idleHours: Math.round(idleHours),
      state: issue.state
    };
  } catch (error) {
    console.error(`Error getting status for #${issueNumber}:`, error.message);
    return null;
  }
}

/**
 * Display progress visualization
 */
function displayProgress(statuses) {
  const grouped = {
    pending: [],
    'in-progress': [],
    review: [],
    completed: [],
    failed: []
  };

  // Group by status
  statuses.forEach(s => {
    if (s && grouped[s.status]) {
      grouped[s.status].push(s);
    }
  });

  // Display each group
  console.log(`📋 Task Status Overview\n`);

  // Pending
  if (grouped.pending.length > 0) {
    console.log(`⏳ Pending (${grouped.pending.length})`);
    grouped.pending.forEach(task => {
      console.log(`   #${task.number}: ${task.title}`);
      console.log(`      Age: ${task.ageHours}h`);
    });
    console.log('');
  }

  // In Progress
  if (grouped['in-progress'].length > 0) {
    console.log(`🔄 In Progress (${grouped['in-progress'].length})`);
    grouped['in-progress'].forEach(task => {
      console.log(`   #${task.number}: ${task.title}`);
      console.log(`      Checkpoints: ${task.checkpoints} | Idle: ${task.idleHours}h`);
      if (task.idleHours > 24) {
        console.log(`      ⚠️  No activity for ${task.idleHours}h`);
      }
    });
    console.log('');
  }

  // In Review
  if (grouped.review.length > 0) {
    console.log(`👀 In Review (${grouped.review.length})`);
    grouped.review.forEach(task => {
      console.log(`   #${task.number}: ${task.title}`);
      if (task.pr) {
        console.log(`      PR: #${task.pr}`);
      }
    });
    console.log('');
  }

  // Completed
  if (grouped.completed.length > 0) {
    console.log(`✅ Completed (${grouped.completed.length})`);
    grouped.completed.forEach(task => {
      console.log(`   #${task.number}: ${task.title}`);
    });
    console.log('');
  }

  // Failed
  if (grouped.failed.length > 0) {
    console.log(`❌ Failed (${grouped.failed.length})`);
    grouped.failed.forEach(task => {
      console.log(`   #${task.number}: ${task.title}`);
      console.log(`      ⚠️  Requires human intervention`);
    });
    console.log('');
  }

  // Summary metrics
  const total = statuses.length;
  const completed = grouped.completed.length;
  const inProgress = grouped['in-progress'].length + grouped.review.length;
  const pending = grouped.pending.length;
  const failed = grouped.failed.length;

  console.log(`${'─'.repeat(50)}`);
  console.log(`📈 Summary`);
  console.log(`   Total Tasks: ${total}`);
  console.log(`   Completed: ${completed} (${Math.round(completed/total*100)}%)`);
  console.log(`   In Progress: ${inProgress}`);
  console.log(`   Pending: ${pending}`);
  if (failed > 0) {
    console.log(`   Failed: ${failed} ⚠️`);
  }

  // Progress bar
  const progressBar = '█'.repeat(Math.round(completed/total*20)) + '░'.repeat(20 - Math.round(completed/total*20));
  console.log(`\n   Progress: [${progressBar}] ${Math.round(completed/total*100)}%`);

  // Warnings
  const stale = statuses.filter(s => s && s.status === 'in-progress' && s.idleHours > 24);
  if (stale.length > 0) {
    console.log(`\n⚠️  Warnings:`);
    console.log(`   ${stale.length} tasks have been idle for >24h`);
  }
}

/**
 * Generate actionable insights
 */
function generateInsights(statuses) {
  console.log(`\n💡 Insights & Actions\n`);

  // Stale tasks
  const stale = statuses.filter(s => 
    s && s.status === 'in-progress' && s.idleHours > 24
  );
  
  if (stale.length > 0) {
    console.log(`🔸 Stale Tasks (need attention):`);
    stale.forEach(task => {
      console.log(`   - #${task.number}: Idle for ${task.idleHours}h`);
      console.log(`     Action: node scripts/bot-workflow/core/bot-resume-work.js ${task.number}`);
    });
    console.log('');
  }

  // Failed tasks
  const failed = statuses.filter(s => s && s.status === 'failed');
  if (failed.length > 0) {
    console.log(`🔸 Failed Tasks (need human intervention):`);
    failed.forEach(task => {
      console.log(`   - #${task.number}: ${task.title}`);
      console.log(`     Action: gh issue view ${task.number}`);
    });
    console.log('');
  }

  // Ready to assign
  const ready = statuses.filter(s => s && s.status === 'pending');
  if (ready.length > 0) {
    console.log(`🔸 Ready for Bot Assignment:`);
    ready.slice(0, 3).forEach(task => {
      console.log(`   - #${task.number}: ${task.title}`);
      console.log(`     Action: node scripts/bot-workflow/coordinator/assign-bot.js ${task.number}`);
    });
    console.log('');
  }

  // Performance metrics
  const completed = statuses.filter(s => s && s.status === 'completed');
  if (completed.length > 0) {
    const avgTime = completed.reduce((sum, t) => sum + t.ageHours, 0) / completed.length;
    console.log(`📊 Performance Metrics:`);
    console.log(`   - Average completion time: ${Math.round(avgTime)}h`);
    console.log(`   - Tasks completed: ${completed.length}`);
  }
}

/**
 * Main monitoring function
 */
async function monitorProgress() {
  try {
    // Get tasks to monitor
    const tasks = await getBotTasks(trackingIssue);
    
    if (tasks.length === 0) {
      console.log('No bot tasks found to monitor.');
      return;
    }

    console.log(`Found ${tasks.length} tasks to monitor\n`);

    // Get detailed status for each task
    const statuses = [];
    for (const task of tasks) {
      const status = await getTaskStatus(task);
      if (status) {
        statuses.push(status);
      }
    }

    // Display progress
    displayProgress(statuses);

    // Generate insights
    generateInsights(statuses);

    // Output for automation
    const result = {
      timestamp: new Date().toISOString(),
      trackingIssue: trackingIssue ? parseInt(trackingIssue) : null,
      totalTasks: statuses.length,
      summary: {
        completed: statuses.filter(s => s.status === 'completed').length,
        inProgress: statuses.filter(s => s.status === 'in-progress').length,
        review: statuses.filter(s => s.status === 'review').length,
        pending: statuses.filter(s => s.status === 'pending').length,
        failed: statuses.filter(s => s.status === 'failed').length
      },
      tasks: statuses.map(s => ({
        number: s.number,
        status: s.status,
        idleHours: s.idleHours
      }))
    };

    console.log(`\n🔧 Automation output:`);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(`\n❌ Error monitoring progress:`, error.message);
    process.exit(1);
  }
}

// Run the monitor
monitorProgress().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});