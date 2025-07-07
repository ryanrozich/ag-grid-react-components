#!/usr/bin/env node

/**
 * Checks integration readiness for a milestone
 * Identifies dependencies, conflicts, and integration order
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CONTRACTS_DIR = 'src/contracts';

async function checkIntegration(milestone) {
  console.log(`🔍 Integration Check for Milestone: ${milestone}\n`);

  try {
    // Get all issues in milestone
    const issues = JSON.parse(
      execSync(`gh issue list --milestone "${milestone}" --json number,title,labels,body,state --limit 100`, 
        { encoding: 'utf8' })
    );

    // Get all PRs
    const prs = JSON.parse(
      execSync(`gh pr list --json number,title,state,mergeable,headRefName,labels --limit 100`, 
        { encoding: 'utf8' })
    );

    // Build dependency graph
    const dependencies = {};
    const contracts = {};
    
    for (const issue of issues) {
      const deps = extractDependencies(issue.body || '');
      dependencies[issue.number] = deps;
      
      const contract = extractContract(issue.body || '');
      if (contract) {
        contracts[issue.number] = contract;
      }
    }

    // Check PR readiness
    console.log('📋 PR Status:');
    console.log('─────────────');
    
    for (const issue of issues) {
      const pr = prs.find(p => {
        const issueMatch = p.headRefName.match(/(\d+)/);
        return issueMatch && parseInt(issueMatch[1]) === issue.number;
      });
      
      if (pr) {
        const status = pr.mergeable ? '✅' : '❌';
        console.log(`${status} #${issue.number}: ${issue.title}`);
        console.log(`   PR #${pr.number} - ${pr.state} ${pr.mergeable ? '(ready to merge)' : '(conflicts!)'}`);
      } else if (issue.state === 'OPEN') {
        console.log(`⏳ #${issue.number}: ${issue.title} (no PR yet)`);
      } else {
        console.log(`✅ #${issue.number}: ${issue.title} (closed)`);
      }
      
      // Show dependencies
      if (dependencies[issue.number].length > 0) {
        console.log(`   Depends on: ${dependencies[issue.number].join(', ')}`);
      }
    }

    // Check contracts
    console.log('\n📄 Contract Status:');
    console.log('──────────────────');
    
    for (const [issueNum, contractFile] of Object.entries(contracts)) {
      const contractPath = path.join(CONTRACTS_DIR, contractFile);
      const exists = fs.existsSync(contractPath);
      console.log(`${exists ? '✅' : '❌'} #${issueNum}: ${contractFile}`);
    }

    // Suggest merge order
    console.log('\n🔄 Suggested Integration Order:');
    console.log('─────────────────────────────');
    
    const order = topologicalSort(dependencies);
    order.forEach((issueNum, index) => {
      const issue = issues.find(i => i.number === issueNum);
      if (issue) {
        console.log(`${index + 1}. #${issueNum}: ${issue.title}`);
      }
    });

    // Integration readiness
    console.log('\n🎯 Integration Readiness:');
    console.log('───────────────────────');
    
    const ready = issues.filter(i => {
      const pr = prs.find(p => {
        const match = p.headRefName.match(/(\d+)/);
        return match && parseInt(match[1]) === i.number;
      });
      return pr && pr.mergeable && pr.state === 'OPEN';
    });
    
    const notReady = issues.filter(i => i.state === 'OPEN' && !ready.includes(i));
    
    console.log(`✅ Ready to merge: ${ready.length}`);
    console.log(`⏳ Still in progress: ${notReady.length}`);
    
    if (ready.length > 0) {
      console.log('\n💡 Next steps:');
      console.log('1. Review and merge PRs in the suggested order');
      console.log('2. Run integration tests after each merge');
      console.log('3. Update dependent PRs if needed');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

function extractDependencies(body) {
  const deps = [];
  const depMatch = body.match(/\*\*Depends on:\*\*\s*(.+)/i);
  if (depMatch) {
    const matches = depMatch[1].matchAll(/#(\d+)/g);
    for (const match of matches) {
      deps.push(parseInt(match[1]));
    }
  }
  return deps;
}

function extractContract(body) {
  const contractMatch = body.match(/\*\*Contract:\*\*\s*`(.+)`/i);
  return contractMatch ? contractMatch[1] : null;
}

function topologicalSort(dependencies) {
  const visited = new Set();
  const result = [];
  
  function visit(node) {
    if (visited.has(node)) return;
    visited.add(node);
    
    const deps = dependencies[node] || [];
    for (const dep of deps) {
      visit(dep);
    }
    
    result.push(node);
  }
  
  for (const node of Object.keys(dependencies)) {
    visit(parseInt(node));
  }
  
  return result;
}

// Get milestone from command line
const milestone = process.argv[2];
if (!milestone) {
  console.error('Usage: node bot-integration-check.js "Milestone Name"');
  process.exit(1);
}

checkIntegration(milestone);