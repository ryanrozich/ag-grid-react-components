#!/usr/bin/env node

/**
 * Quick script to add the new code/product review status labels
 */

import { execSync } from 'child_process';

const newLabels = [
  { name: 'status: in-code-review', color: '5319e7', description: 'PR submitted, under code review' },
  { name: 'status: in-product-review', color: '9f7efe', description: 'Code approved, under product review' }
];

console.log('🏷️  Adding new status labels\n');

for (const label of newLabels) {
  try {
    execSync(`gh label create "${label.name}" --color "${label.color}" --description "${label.description}"`, {
      stdio: 'inherit'
    });
    console.log(`✅ Created: ${label.name}`);
  } catch (error) {
    console.log(`⚠️  Label ${label.name} might already exist`);
  }
}

console.log('\n✅ Done!');