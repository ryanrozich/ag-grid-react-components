#!/usr/bin/env node

/**
 * Comprehensive script to fix ALL PR statuses (open and closed)
 */

import { execSync } from 'child_process';

async function main() {
  console.log('🔧 Fixing ALL PR statuses\n');
  
  // Get all PRs (open and closed)
  const allPRsJson = execSync('gh pr list --state all --limit 100 --json number,title,state,isDraft,labels,mergedAt', {
    encoding: 'utf8'
  });
  const allPRs = JSON.parse(allPRsJson);
  
  console.log(`Found ${allPRs.length} total PRs\n`);
  
  // All possible status labels
  const allStatusLabels = [
    'status: needs-triage',
    'status: triaging', 
    'status: backlog',
    'status: in-progress',
    'status: in-product-review',
    'status: done',
    'status: pr-in-progress',
    'status: in-code-review',
    'status: code-review-complete',
    'status: merged',
    'status: in-review' // old label
  ];
  
  let fixedCount = 0;
  
  for (const pr of allPRs) {
    const currentLabels = pr.labels.map(l => l.name);
    const currentStatusLabels = currentLabels.filter(l => allStatusLabels.includes(l));
    
    let correctStatus;
    
    // Determine correct status
    if (pr.state === 'MERGED' || pr.mergedAt) {
      correctStatus = 'status: merged';
    } else if (pr.state === 'CLOSED') {
      // Closed but not merged - remove all status labels
      correctStatus = null;
    } else {
      // Open PR
      correctStatus = pr.isDraft ? 'status: pr-in-progress' : 'status: in-code-review';
    }
    
    // Check if we need to fix this PR
    const hasCorrectStatus = correctStatus ? currentStatusLabels.includes(correctStatus) : currentStatusLabels.length === 0;
    const hasOnlyCorrectStatus = hasCorrectStatus && currentStatusLabels.length === (correctStatus ? 1 : 0);
    
    if (!hasOnlyCorrectStatus) {
      console.log(`\nPR #${pr.number}: ${pr.title}`);
      console.log(`  State: ${pr.state}${pr.mergedAt ? ' (merged)' : ''}${pr.isDraft ? ' (draft)' : ''}`);
      console.log(`  Current status labels: ${currentStatusLabels.join(', ') || 'none'}`);
      console.log(`  Should have: ${correctStatus || 'no status labels'}`);
      
      // Remove all status labels
      for (const label of allStatusLabels) {
        if (currentLabels.includes(label)) {
          try {
            execSync(`gh pr edit ${pr.number} --remove-label "${label}"`, {
              stdio: 'pipe',
              encoding: 'utf8'
            });
            console.log(`  ✓ Removed: ${label}`);
          } catch (e) {
            // Ignore errors - label might not exist
          }
        }
      }
      
      // Add correct status
      if (correctStatus) {
        try {
          execSync(`gh pr edit ${pr.number} --add-label "${correctStatus}"`, {
            stdio: 'pipe',
            encoding: 'utf8'
          });
          console.log(`  ✓ Added: ${correctStatus}`);
        } catch (error) {
          console.error(`  ✗ Failed to add ${correctStatus}: ${error.message}`);
        }
      }
      
      fixedCount++;
    }
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Fixed ${fixedCount} PRs!`);
  
  if (fixedCount === 0) {
    console.log('   All PRs already have correct status labels.');
  }
}

main().catch(console.error);