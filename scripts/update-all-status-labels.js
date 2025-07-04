#!/usr/bin/env node

/**
 * Script to create/update all status labels for the new workflow
 */

import { execSync } from 'child_process';

const statusLabels = [
  // Issue statuses
  { name: 'status: needs-triage', color: 'e99695', description: 'New issue awaiting evaluation' },
  { name: 'status: triaging', color: 'ffd93d', description: 'Currently being evaluated and labeled' },
  { name: 'status: backlog', color: 'c5def5', description: 'Prioritized and ready for development' },
  { name: 'status: in-progress', color: '0e8a16', description: 'Issue actively being worked on' },
  { name: 'status: in-product-review', color: '9f7efe', description: 'Feature deployed, awaiting product review' },
  { name: 'status: done', color: '0e8a16', description: 'Issue completed and verified' },

  // PR statuses
  { name: 'status: pr-in-progress', color: 'fbca04', description: 'PR draft/WIP, not ready for review' },
  { name: 'status: in-code-review', color: '5319e7', description: 'PR ready, awaiting code review' },
  { name: 'status: code-review-complete', color: '6f42c1', description: 'Code approved, ready to merge' },
  { name: 'status: merged', color: '8250df', description: 'PR merged to main branch' }
];

console.log('🏷️  Creating/updating all status labels\n');

for (const label of statusLabels) {
  try {
    // Try to create first
    execSync(`gh label create "${label.name}" --color "${label.color}" --description "${label.description}"`, {
      stdio: 'pipe'
    });
    console.log(`✅ Created: ${label.name}`);
  } catch (error) {
    // If it exists, update it
    try {
      execSync(`gh label edit "${label.name}" --color "${label.color}" --description "${label.description}"`, {
        stdio: 'pipe'
      });
      console.log(`📝 Updated: ${label.name}`);
    } catch (updateError) {
      console.error(`❌ Failed: ${label.name}`);
    }
  }
}

// Remove old labels that are no longer needed
const oldLabels = ['status: in-review'];
console.log('\n🧹 Removing old labels...');

for (const label of oldLabels) {
  try {
    execSync(`gh label delete "${label}" --yes`, {
      stdio: 'pipe'
    });
    console.log(`🗑️  Removed: ${label}`);
  } catch (error) {
    console.log(`⚠️  Label ${label} doesn't exist or couldn't be removed`);
  }
}

console.log('\n✅ Status labels updated!');