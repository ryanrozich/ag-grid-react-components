#!/usr/bin/env node

/**
 * Script to fix PR statuses - removes issue statuses and adds appropriate PR statuses
 */

import { execSync } from 'child_process';

async function main() {
  console.log('🔧 Fixing PR statuses\n');

  // Get all open PRs
  const openPRsJson = execSync('gh pr list --state open --limit 100 --json number,title,labels,isDraft', {
    encoding: 'utf8'
  });
  const openPRs = JSON.parse(openPRsJson);

  console.log(`Found ${openPRs.length} open PRs\n`);

  const issueStatusLabels = [
    'status: needs-triage',
    'status: triaging',
    'status: backlog',
    'status: in-progress',
    'status: in-product-review',
    'status: done'
  ];

  for (const pr of openPRs) {
    const currentLabels = pr.labels.map(l => l.name);

    // Check if PR has any issue status labels
    const hasIssueStatus = currentLabels.some(label => issueStatusLabels.includes(label));

    if (hasIssueStatus) {
      console.log(`PR #${pr.number}: ${pr.title}`);

      // Remove all issue status labels
      for (const label of issueStatusLabels) {
        if (currentLabels.includes(label)) {
          try {
            execSync(`gh pr edit ${pr.number} --remove-label "${label}"`, {
              stdio: 'pipe',
              encoding: 'utf8'
            });
            console.log(`  ✓ Removed: ${label}`);
          } catch (e) {}
        }
      }

      // Add appropriate PR status
      const newStatus = pr.isDraft ? 'status: pr-in-progress' : 'status: in-code-review';

      try {
        execSync(`gh pr edit ${pr.number} --add-label "${newStatus}"`, {
          stdio: 'pipe',
          encoding: 'utf8'
        });
        console.log(`  ✓ Added: ${newStatus}`);
      } catch (error) {
        console.error(`  ✗ Failed to add ${newStatus}: ${error.message}`);
      }

      console.log('');
    }
  }

  console.log('✅ PR statuses fixed!');
}

main().catch(console.error);