#!/usr/bin/env node

/**
 * Show overview of all milestones and their progress
 */

import { execSync } from 'child_process';

// Get all milestones using API
const repoInfo = execSync('gh repo view --json nameWithOwner', { encoding: 'utf8' });
const { nameWithOwner } = JSON.parse(repoInfo);
const [owner, repo] = nameWithOwner.split('/');

const milestonesJson = execSync(`gh api repos/${owner}/${repo}/milestones?state=all&per_page=100`, { encoding: 'utf8' });
const milestones = JSON.parse(milestonesJson).map(m => ({
  number: m.number,
  title: m.title,
  state: m.state.toUpperCase(),
  description: m.description,
  dueOn: m.due_on,
  closedAt: m.closed_at,
  openIssues: m.open_issues,
  closedIssues: m.closed_issues
}));

// Get all issues with milestones
const issuesJson = execSync('gh issue list --state all --limit 200 --json number,state,milestone,labels', { encoding: 'utf8' });
const issues = JSON.parse(issuesJson);

// Get all PRs with milestones
const prsJson = execSync('gh pr list --state all --limit 200 --json number,state,milestone,labels', { encoding: 'utf8' });
const prs = JSON.parse(prsJson);

console.log('🎯 Milestone Overview\n');

// Group milestones by state
const openMilestones = milestones.filter(m => m.state === 'OPEN').sort((a, b) => {
  const aVersion = a.title.match(/v(\d+)\.(\d+)\.(\d+)/);
  const bVersion = b.title.match(/v(\d+)\.(\d+)\.(\d+)/);
  if (!aVersion || !bVersion) return 0;

  // Compare versions
  for (let i = 1; i <= 3; i++) {
    if (parseInt(aVersion[i]) !== parseInt(bVersion[i])) {
      return parseInt(aVersion[i]) - parseInt(bVersion[i]);
    }
  }
  return 0;
});

const closedMilestones = milestones.filter(m => m.state === 'CLOSED');

// Show open milestones
if (openMilestones.length > 0) {
  console.log('📂 Open Milestones:\n');

  for (const milestone of openMilestones) {
    // Count items in this milestone
    const milestoneIssues = issues.filter(i => i.milestone?.number === milestone.number);
    const milestonePRs = prs.filter(p => p.milestone?.number === milestone.number);

    const openItems = [...milestoneIssues, ...milestonePRs].filter(item =>
      item.state === 'OPEN' || item.state === 'open'
    );
    const closedItems = [...milestoneIssues, ...milestonePRs].filter(item =>
      item.state === 'CLOSED' || item.state === 'closed' || item.state === 'MERGED' || item.state === 'merged'
    );

    const total = openItems.length + closedItems.length;
    const progress = total > 0 ? Math.round((closedItems.length / total) * 100) : 0;

    console.log(`  #${milestone.number}: ${milestone.title}`);
    console.log(`  Progress: ${progress}% (${closedItems.length}/${total} completed)`);
    console.log(`  📋 Issues: ${milestoneIssues.length} | 🔄 PRs: ${milestonePRs.length}`);

    if (milestone.dueOn) {
      const dueDate = new Date(milestone.dueOn);
      const today = new Date();
      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      console.log(`  📅 Due: ${dueDate.toLocaleDateString()} (${daysLeft} days)`);
    }

    // Show what's left
    if (openItems.length > 0) {
      console.log(`  ⏳ Remaining:`);
      const bugs = openItems.filter(item => item.labels.some(l => l.name === 'bug'));
      const features = openItems.filter(item => item.labels.some(l => l.name === 'enhancement'));
      const other = openItems.length - bugs.length - features.length;

      if (bugs.length > 0) console.log(`     🐛 ${bugs.length} bugs`);
      if (features.length > 0) console.log(`     ✨ ${features.length} features`);
      if (other > 0) console.log(`     📄 ${other} other items`);
    }

    console.log('');
  }
}

// Show closed milestones summary
if (closedMilestones.length > 0) {
  console.log('\n✅ Completed Milestones:\n');

  for (const milestone of closedMilestones.slice(0, 5)) {
    const closedDate = milestone.closedAt ? new Date(milestone.closedAt).toLocaleDateString() : 'Unknown';
    console.log(`  ${milestone.title} (closed ${closedDate})`);
  }
}

// Suggest next actions
console.log('\n💡 Quick Actions:');
console.log('  Create milestone:  node scripts/create-milestone.js v0.1.0 "First Public Release"');
console.log('  Assign items:      node scripts/assign-to-milestone.js <milestone-number>');
console.log('  View in GitHub:    gh browse issues');