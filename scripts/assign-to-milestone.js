#!/usr/bin/env node

/**
 * Assign issues/PRs to milestones based on their labels and type
 * Usage: node scripts/assign-to-milestone.js [milestone-number]
 */

import { execSync } from 'child_process';

const [,, milestoneNumber] = process.argv;

// Get repo info
const repoInfo = execSync('gh repo view --json nameWithOwner', { encoding: 'utf8' });
const { nameWithOwner } = JSON.parse(repoInfo);
const [owner, repo] = nameWithOwner.split('/');

// Get all open milestones using API
const milestonesJson = execSync(`gh api repos/${owner}/${repo}/milestones?state=open&per_page=100`, { encoding: 'utf8' });
const milestones = JSON.parse(milestonesJson).map(m => ({
  number: m.number,
  title: m.title
}));

if (milestones.length === 0) {
  console.error('No open milestones found. Create one with: node scripts/create-milestone.js');
  process.exit(1);
}

// If no milestone specified, show list and exit
if (!milestoneNumber) {
  console.log('📍 Open Milestones:\n');
  milestones.forEach(m => {
    console.log(`  #${m.number}: ${m.title}`);
  });
  console.log('\nUsage: node scripts/assign-to-milestone.js <milestone-number>');
  process.exit(0);
}

// Find the milestone
const milestone = milestones.find(m => m.number === parseInt(milestoneNumber));
if (!milestone) {
  console.error(`Milestone #${milestoneNumber} not found`);
  process.exit(1);
}

console.log(`\n🎯 Assigning items to milestone: ${milestone.title}\n`);

// Determine milestone type from title
const versionMatch = milestone.title.match(/v(\d+)\.(\d+)\.(\d+)/);
if (!versionMatch) {
  console.log('⚠️  Milestone doesn\'t follow version format, will assign all types');
}

const [, major, minor, patch] = versionMatch || [null, '0', '0', '0'];
const isPatchRelease = patch !== '0' && parseInt(patch) > 0;
const isMinorRelease = !isPatchRelease;

// Get all open issues and PRs
const issuesJson = execSync('gh issue list --state open --limit 100 --json number,title,labels,milestone', { encoding: 'utf8' });
const issues = JSON.parse(issuesJson);

const prsJson = execSync('gh pr list --state open --limit 100 --json number,title,labels,milestone', { encoding: 'utf8' });
const prs = JSON.parse(prsJson);

let assigned = 0;

// Helper to check if item should be assigned
function shouldAssign(item, isPR = false) {
  // Already has a milestone
  if (item.milestone) return false;

  const labels = item.labels.map(l => l.name);
  const isBug = labels.includes('bug');
  const isFeature = labels.includes('enhancement');

  // For patch releases, only bugs
  if (isPatchRelease && !isBug) return false;

  // For minor releases, features and bugs
  if (isMinorRelease && !isBug && !isFeature) return false;

  // Check status - only assign if ready
  const hasBacklogStatus = labels.includes('status: backlog');
  const hasInProgressStatus = labels.includes('status: in-progress');
  const hasPRInProgress = labels.includes('status: pr-in-progress');
  const hasInCodeReview = labels.includes('status: in-code-review');

  return hasBacklogStatus || hasInProgressStatus || hasPRInProgress || hasInCodeReview;
}

// Process issues
console.log('📋 Checking issues...\n');
for (const issue of issues) {
  const labels = issue.labels.map(l => l.name);
  const type = labels.includes('bug') ? '🐛 bug' : '✨ feature';

  // Debug logging
  if (issue.milestone) {
    console.log(`  ⏭️  #${issue.number} (${type}): Already has milestone`);
  } else if (shouldAssign(issue)) {
    try {
      execSync(`gh issue edit ${issue.number} --milestone "${milestone.title}"`, {
        stdio: 'pipe'
      });
      console.log(`  ✓ #${issue.number} (${type}): ${issue.title}`);
      assigned++;
    } catch (error) {
      console.error(`  ✗ #${issue.number}: Failed to assign - ${error.message}`);
    }
  } else {
    const isBug = labels.includes('bug');
    const isFeature = labels.includes('enhancement');
    const hasBacklogStatus = labels.includes('status: backlog');
    const hasInProgressStatus = labels.includes('status: in-progress');
    console.log(`  ⏭️  #${issue.number} (${type}): Skipped - bug:${isBug} feat:${isFeature} backlog:${hasBacklogStatus} progress:${hasInProgressStatus}`);
  }
}

// Process PRs
console.log('\n🔄 Checking PRs...\n');
for (const pr of prs) {
  if (shouldAssign(pr, true)) {
    try {
      execSync(`gh pr edit ${pr.number} --milestone "${milestone.title}"`, {
        stdio: 'pipe'
      });
      console.log(`  ✓ PR #${pr.number}: ${pr.title}`);
      assigned++;
    } catch (error) {
      console.error(`  ✗ PR #${pr.number}: Failed to assign`);
    }
  }
}

console.log('\n' + '─'.repeat(50));
console.log(`✅ Assigned ${assigned} items to milestone ${milestone.title}`);