#!/usr/bin/env node

/**
 * Sync issue status based on their state and associated PRs
 * - All issues should be at least in backlog (not needs-triage)
 * - Issues with PRs should reflect PR status
 */

import { execSync } from 'child_process';

console.log('🔄 Syncing issue statuses...\n');

// Get all open issues
const issuesJson = execSync('gh issue list --state all --limit 200 --json number,state,labels', { encoding: 'utf8' });
const issues = JSON.parse(issuesJson);

// Get all PRs
const prsJson = execSync('gh pr list --state all --limit 200 --json number,state,labels,body,title', { encoding: 'utf8' });
const prs = JSON.parse(prsJson);

// Create map of issue -> PRs
const issueToPRs = new Map();

// Find PRs that reference issues
prs.forEach(pr => {
  const references = [];

  // Check PR body for issue references
  const body = pr.body || '';
  const title = pr.title || '';
  const fullText = `${title} ${body}`;

  // Match issue references
  const patterns = [
    /(?:fixes?|closes?|resolves?|fix|close|resolve)\s+#(\d+)/gi,
    /(?:fixes?|closes?|resolves?|fix|close|resolve)\s+(?:https?:\/\/github\.com\/[^\/]+\/[^\/]+\/issues\/)(\d+)/gi
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(fullText)) !== null) {
      references.push(parseInt(match[1]));
    }
  });

  // Add PR to each referenced issue
  references.forEach(issueNum => {
    if (!issueToPRs.has(issueNum)) {
      issueToPRs.set(issueNum, []);
    }
    issueToPRs.get(issueNum).push(pr);
  });
});

// Helper to get current status label
function getCurrentStatus(labels) {
  const statusLabel = labels.find(l => l.name.startsWith('status:'));
  return statusLabel ? statusLabel.name : null;
}

// Helper to update status
async function updateStatus(issueNumber, oldStatus, newStatus) {
  try {
    // Remove old status if exists
    if (oldStatus) {
      execSync(`gh issue edit ${issueNumber} --remove-label "${oldStatus}"`, { stdio: 'pipe' });
    }

    // Add new status
    execSync(`gh issue edit ${issueNumber} --add-label "${newStatus}"`, { stdio: 'pipe' });

    console.log(`  ✓ #${issueNumber}: ${oldStatus || 'no status'} → ${newStatus}`);
    return true;
  } catch (error) {
    console.error(`  ✗ #${issueNumber}: Failed to update status`);
    return false;
  }
}

let updated = 0;

// Process each issue
for (const issue of issues) {
  // Skip closed/done issues
  if (issue.state === 'CLOSED' || issue.labels.some(l => l.name === 'status: done')) {
    continue;
  }

  const currentStatus = getCurrentStatus(issue.labels);
  let targetStatus = null;

  // Check if issue has associated PRs
  const associatedPRs = issueToPRs.get(issue.number) || [];

  if (associatedPRs.length > 0) {
    // Determine status based on PR states
    const openPRs = associatedPRs.filter(pr => pr.state === 'OPEN');
    const mergedPRs = associatedPRs.filter(pr => pr.state === 'MERGED');

    if (mergedPRs.length > 0) {
      // If any PR is merged, issue should be done
      targetStatus = 'status: done';
    } else if (openPRs.length > 0) {
      // Check PR status labels
      const prStatuses = openPRs.map(pr => getCurrentStatus(pr.labels)).filter(Boolean);

      if (prStatuses.includes('status: code-review-complete')) {
        targetStatus = 'status: in-product-review';
      } else if (prStatuses.includes('status: in-code-review')) {
        targetStatus = 'status: in-product-review';
      } else if (prStatuses.includes('status: pr-in-progress')) {
        targetStatus = 'status: in-progress';
      } else {
        // PR exists but no status, assume in progress
        targetStatus = 'status: in-progress';
      }
    }
  } else {
    // No PRs - ensure at least backlog status
    if (currentStatus === 'status: needs-triage' || !currentStatus) {
      targetStatus = 'status: backlog';
    }
  }

  // Update if needed
  if (targetStatus && targetStatus !== currentStatus) {
    if (await updateStatus(issue.number, currentStatus, targetStatus)) {
      updated++;
    }
  }
}

console.log('\n' + '─'.repeat(50));
console.log(`✅ Updated ${updated} issue statuses`);

// Show summary
console.log('\n📊 Status Summary:');
const statusCounts = {};
const updatedIssues = JSON.parse(execSync('gh issue list --state all --limit 200 --json labels', { encoding: 'utf8' }));
updatedIssues.forEach(issue => {
  const status = getCurrentStatus(issue.labels) || 'no status';
  statusCounts[status] = (statusCounts[status] || 0) + 1;
});

Object.entries(statusCounts).sort().forEach(([status, count]) => {
  console.log(`  ${status}: ${count}`);
});