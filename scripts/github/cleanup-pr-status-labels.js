#!/usr/bin/env node

/**
 * One-time cleanup script to remove status labels from PRs
 * PRs should get their status from the project automation, not from linked issues
 */

import { execSync } from 'child_process';

async function main() {
  console.log('🧹 Cleaning up PR status labels\n');

  // Get all PRs
  const openPRsJson = execSync('gh pr list --state open --limit 100 --json number,title,labels', {
    encoding: 'utf8'
  });
  const openPRs = JSON.parse(openPRsJson);

  console.log(`Found ${openPRs.length} open PRs\n`);

  let cleanedCount = 0;

  for (const pr of openPRs) {
    const statusLabels = pr.labels.filter(l => l.name.startsWith('status:'));

    if (statusLabels.length > 0) {
      console.log(`PR #${pr.number}: ${pr.title}`);
      console.log(`  Found status labels: ${statusLabels.map(l => l.name).join(', ')}`);

      // Remove all status labels
      for (const label of statusLabels) {
        try {
          execSync(`gh pr edit ${pr.number} --remove-label "${label.name}"`, {
            stdio: 'pipe',
            encoding: 'utf8'
          });
          console.log(`  ✓ Removed: ${label.name}`);
        } catch (error) {
          console.error(`  ✗ Failed to remove ${label.name}: ${error.message}`);
        }
      }

      cleanedCount++;
      console.log('');
    }
  }

  console.log('─'.repeat(50));
  console.log(`✅ Cleanup complete! Cleaned ${cleanedCount} PRs.`);
  console.log('\n💡 PRs will now get their status from project automation:');
  console.log('   - New PRs → "In Code Review" status');
  console.log('   - Code approved → "In Product Review" status');
  console.log('   - Merged PRs → "Done" status');
}

main().catch(console.error);