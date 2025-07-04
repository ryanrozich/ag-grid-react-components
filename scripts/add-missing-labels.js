#!/usr/bin/env node

/**
 * Script to add missing required labels to issues
 * This ensures all issues have at least one label from each required category
 *
 * Usage: node scripts/add-missing-labels.js
 */

import { execSync } from 'child_process';

// Default labels to add if missing
const DEFAULT_LABELS = {
  type: 'enhancement',        // Default if no type label
  priority: 'priority: medium', // Default if no priority label
  area: 'area: components',    // Default if no area label
  // Don't add status - let it come from project
};

// Label categories
const LABEL_CATEGORIES = {
  type: ['bug', 'enhancement', 'documentation', 'question', 'good first issue', 'help wanted'],
  priority: ['priority: critical', 'priority: high', 'priority: medium', 'priority: low'],
  area: ['area: components', 'area: demo', 'area: build', 'area: ci/cd', 'area: testing', 'area: docs'],
  // Don't check status - will be synced from project
};

function getIssues() {
  try {
    const output = execSync('gh issue list --limit 100 --state open --json number,title,labels', {
      encoding: 'utf8'
    });
    return JSON.parse(output);
  } catch (error) {
    console.error('Failed to fetch issues:', error.message);
    process.exit(1);
  }
}

function checkMissingLabels(issue) {
  const currentLabels = issue.labels.map(l => l.name);
  const missing = {};

  // Check each category
  for (const [category, labels] of Object.entries(LABEL_CATEGORIES)) {
    const hasLabel = labels.some(label => currentLabels.includes(label));
    if (!hasLabel) {
      missing[category] = DEFAULT_LABELS[category];
    }
  }

  return missing;
}

async function main() {
  console.log('🏷️  Add Missing Labels to Issues\n');

  const issues = getIssues();
  console.log(`Found ${issues.length} open issues\n`);

  let updatedCount = 0;

  for (const issue of issues) {
    const missing = checkMissingLabels(issue);
    const missingCategories = Object.keys(missing);

    if (missingCategories.length > 0) {
      console.log(`\n#${issue.number}: ${issue.title}`);
      console.log(`  Missing: ${missingCategories.join(', ')}`);

      // Add missing labels
      const labelsToAdd = Object.values(missing);
      const addCommand = labelsToAdd.map(l => `--add-label "${l}"`).join(' ');

      try {
        execSync(`gh issue edit ${issue.number} ${addCommand}`, {
          stdio: 'pipe',
          encoding: 'utf8'
        });
        console.log(`  ✓ Added: ${labelsToAdd.join(', ')}`);
        updatedCount++;
      } catch (error) {
        console.error(`  ✗ Failed to update: ${error.message}`);
      }
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`✅ Complete! Updated ${updatedCount} issues.`);

  if (updatedCount === 0) {
    console.log('   All issues already have required labels.');
  } else {
    console.log('\n💡 Next step: Run bootstrap-project-sync.js to sync with project fields');
  }
}

main().catch(console.error);