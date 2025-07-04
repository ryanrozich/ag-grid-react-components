#!/usr/bin/env node

/**
 * Script to sync PR labels from their linked issues
 * This copies labels from issues to PRs that reference them
 * 
 * Usage: node scripts/sync-pr-labels-from-issues.js
 */

import { execSync } from 'child_process';

// Helper function to extract issue numbers from PR body
function extractIssueNumbers(body) {
  if (!body) return [];
  
  // Match various linking patterns
  const patterns = [
    /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*#(\d+)/gi,
    /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s*https:\/\/github\.com\/[^\/]+\/[^\/]+\/issues\/(\d+)/gi
  ];
  
  const numbers = new Set();
  for (const pattern of patterns) {
    const matches = body.matchAll(pattern);
    for (const match of matches) {
      numbers.add(parseInt(match[1]));
    }
  }
  
  return Array.from(numbers);
}

async function main() {
  console.log('🔄 Syncing PR Labels from Linked Issues\n');
  
  // Get all PRs (open and closed)
  let allPRs = [];
  
  try {
    // Get open PRs
    const openPRsJson = execSync('gh pr list --state open --limit 100 --json number,title,body,labels', {
      encoding: 'utf8'
    });
    const openPRs = JSON.parse(openPRsJson);
    
    // Get closed PRs
    const closedPRsJson = execSync('gh pr list --state closed --limit 100 --json number,title,body,labels', {
      encoding: 'utf8'
    });
    const closedPRs = JSON.parse(closedPRsJson);
    
    allPRs = [...openPRs, ...closedPRs];
  } catch (error) {
    console.error('Failed to fetch PRs:', error.message);
    process.exit(1);
  }
  
  console.log(`Found ${allPRs.length} PRs to process\n`);
  
  let updatedCount = 0;
  
  for (const pr of allPRs) {
    const linkedIssues = extractIssueNumbers(pr.body);
    
    if (linkedIssues.length === 0) {
      continue; // Skip PRs without linked issues
    }
    
    console.log(`\nPR #${pr.number}: ${pr.title}`);
    console.log(`  Linked issues: ${linkedIssues.join(', ')}`);
    
    // Get current PR labels
    const currentLabels = new Set(pr.labels.map(l => l.name));
    
    // Collect all labels from linked issues (excluding status labels)
    const allLabels = new Set();
    
    for (const issueNum of linkedIssues) {
      try {
        const issueJson = execSync(`gh issue view ${issueNum} --json labels`, {
          encoding: 'utf8'
        });
        const issue = JSON.parse(issueJson);
        
        issue.labels.forEach(label => {
          // Skip status labels - PRs have their own lifecycle
          if (!label.name.startsWith('status:')) {
            allLabels.add(label.name);
          }
        });
        
        console.log(`  Issue #${issueNum} labels: ${issue.labels.map(l => l.name).join(', ')}`);
      } catch (error) {
        console.error(`  ✗ Failed to fetch issue #${issueNum}: ${error.message}`);
      }
    }
    
    // Find labels to add (ones from issues that PR doesn't have)
    const labelsToAdd = [];
    for (const label of allLabels) {
      if (!currentLabels.has(label)) {
        labelsToAdd.push(label);
      }
    }
    
    // Apply new labels
    if (labelsToAdd.length > 0) {
      const addCommand = labelsToAdd.map(l => `--add-label "${l}"`).join(' ');
      
      try {
        execSync(`gh pr edit ${pr.number} ${addCommand}`, {
          stdio: 'pipe',
          encoding: 'utf8'
        });
        console.log(`  ✓ Added labels: ${labelsToAdd.join(', ')}`);
        updatedCount++;
      } catch (error) {
        console.error(`  ✗ Failed to update PR: ${error.message}`);
      }
    } else {
      console.log('  ✓ Already has all issue labels');
    }
  }
  
  console.log('\n' + '─'.repeat(50));
  console.log(`✅ Complete! Updated ${updatedCount} PRs.`);
  
  if (updatedCount === 0) {
    console.log('   All PRs already have labels from their linked issues.');
  }
}

main().catch(console.error);