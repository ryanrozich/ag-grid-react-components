#!/usr/bin/env node

/**
 * Creates all required labels in the repository
 * This ensures all labels referenced in the automation exist
 */

import { execSync } from 'child_process';

// All labels that should exist
const LABELS = [
  // Type labels
  { name: 'bug', color: 'd73a4a', description: 'Something isn\'t working' },
  { name: 'enhancement', color: 'a2eeef', description: 'New feature or request' },
  { name: 'documentation', color: '0075ca', description: 'Improvements or additions to documentation' },
  { name: 'question', color: 'd876e3', description: 'Further information is requested' },
  { name: 'good first issue', color: '7057ff', description: 'Good for newcomers' },
  { name: 'help wanted', color: '008672', description: 'Extra attention is needed' },

  // Priority labels
  { name: 'priority: critical', color: 'b60205', description: 'Must fix ASAP, blocking usage' },
  { name: 'priority: high', color: 'ff6666', description: 'Important, should be fixed soon' },
  { name: 'priority: medium', color: 'ffcc00', description: 'Normal priority' },
  { name: 'priority: low', color: '98fb98', description: 'Nice to have, can wait' },

  // Area labels
  { name: 'area: components', color: '1f77b4', description: 'Related to the React components' },
  { name: 'area: demo', color: 'ff7f0e', description: 'Related to the demo/showcase application' },
  { name: 'area: build', color: '2ca02c', description: 'Build tools, bundling, TypeScript config' },
  { name: 'area: ci/cd', color: 'd62728', description: 'GitHub Actions, deployment, automation' },
  { name: 'area: testing', color: '9467bd', description: 'Test suite, coverage, test infrastructure' },
  { name: 'area: docs', color: '8c564b', description: 'Documentation (README, API docs, guides)' },

  // Status labels
  { name: 'status: needs-triage', color: 'e99695', description: 'New issue awaiting evaluation' },
  { name: 'status: triaging', color: 'ffd93d', description: 'Currently being evaluated and labeled' },
  { name: 'status: backlog', color: 'c5def5', description: 'Prioritized and ready for development' },
  { name: 'status: in-progress', color: '0e8a16', description: 'Actively being worked on' },
  { name: 'status: in-code-review', color: '5319e7', description: 'PR submitted, under code review' },
  { name: 'status: in-product-review', color: '9f7efe', description: 'Code approved, under product review' },
  { name: 'status: done', color: '0e8a16', description: 'Completed and merged' },

  // Component labels
  { name: 'component: date-filter', color: 'bfd4f2', description: 'DateFilter/RelativeDateFilter components' },
  { name: 'component: quick-filter-dropdown', color: 'bfd4f2', description: 'QuickFilterDropdown component' },
  { name: 'component: active-filters', color: 'bfd4f2', description: 'ActiveFilters component' },
  { name: 'component: relative-date-filter', color: 'bfd4f2', description: 'RelativeDateFilter component' },
  { name: 'component: grid-state-utils', color: 'bfd4f2', description: 'Grid state persistence utilities' },
  { name: 'component: demo-app', color: 'bfd4f2', description: 'Demo application specific' },

  // Effort labels (matching project field values)
  { name: 'effort: xs', color: 'c2e0c6', description: 'Extra small (< 1 hour)' },
  { name: 'effort: s', color: 'd4e7c5', description: 'Small (1-4 hours)' },
  { name: 'effort: m', color: 'fef2c0', description: 'Medium (1-2 days)' },
  { name: 'effort: l', color: 'ffd8a8', description: 'Large (3-5 days)' },
  { name: 'effort: xl', color: 'f9d0c4', description: 'Extra large (1+ week)' },
];

function labelExists(labelName) {
  try {
    execSync(`gh label view "${labelName}"`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function createLabel(label) {
  try {
    const cmd = `gh label create "${label.name}" --color "${label.color}" --description "${label.description}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`✅ Created label: ${label.name}`);
  } catch (error) {
    console.error(`❌ Failed to create label ${label.name}: ${error.message}`);
  }
}

function updateLabel(label) {
  try {
    const cmd = `gh label edit "${label.name}" --color "${label.color}" --description "${label.description}"`;
    execSync(cmd, { stdio: 'pipe' });
    console.log(`📝 Updated label: ${label.name}`);
  } catch (error) {
    console.error(`❌ Failed to update label ${label.name}: ${error.message}`);
  }
}

async function main() {
  console.log('🏷️  Creating/Updating Repository Labels\n');

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const label of LABELS) {
    if (labelExists(label.name)) {
      // Update existing label to ensure color and description match
      updateLabel(label);
      updated++;
    } else {
      createLabel(label);
      created++;
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log('✅ Complete!');
  console.log(`   Created: ${created} labels`);
  console.log(`   Updated: ${updated} labels`);
  console.log(`   Total: ${LABELS.length} labels`);

  console.log('\n📋 Label categories now available:');
  console.log('   - Type (bug, enhancement, etc.)');
  console.log('   - Priority (critical, high, medium, low)');
  console.log('   - Area (components, demo, build, etc.)');
  console.log('   - Status (needs-triage through done)');
  console.log('   - Component (specific component labels)');
  console.log('   - Size (small, medium, large)');
}

main().catch(console.error);