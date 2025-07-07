#!/usr/bin/env node

/**
 * Checks if a milestone is ready for release candidate
 * Validates all integration criteria
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../../..');

async function checkReleaseReadiness(milestone) {
  console.log(`🚀 Release Readiness Check for: ${milestone}\n`);

  const checks = {
    allIssuesClosed: false,
    allPRsMerged: false,
    testsPass: false,
    noTypeErrors: false,
    documentationComplete: false,
    integrationTestsExist: false,
    e2eTestsPass: false,
    contractsImplemented: false
  };

  try {
    // 1. Check all issues are closed
    console.log('📋 Checking issues...');
    const openIssues = JSON.parse(
      execSync(`gh issue list --milestone "${milestone}" --state open --json number,title`, 
        { encoding: 'utf8' })
    );
    checks.allIssuesClosed = openIssues.length === 0;
    console.log(`   ${checks.allIssuesClosed ? '✅' : '❌'} All issues closed (${openIssues.length} open)`);

    // 2. Check all PRs are merged
    console.log('\n🔀 Checking pull requests...');
    const openPRs = JSON.parse(
      execSync(`gh pr list --state open --json number,title,labels`, { encoding: 'utf8' })
    );
    
    // Filter for PRs related to this milestone
    const milestonePRs = openPRs.filter(pr => 
      pr.labels.some(label => label.name.includes('agent:'))
    );
    checks.allPRsMerged = milestonePRs.length === 0;
    console.log(`   ${checks.allPRsMerged ? '✅' : '❌'} All PRs merged (${milestonePRs.length} open)`);

    // 3. Check tests pass
    console.log('\n🧪 Checking tests...');
    try {
      execSync('npm run test:unit -- --reporter=json', { 
        cwd: rootDir,
        stdio: 'pipe' 
      });
      checks.testsPass = true;
      console.log('   ✅ All unit tests pass');
    } catch (e) {
      console.log('   ❌ Unit tests failing');
    }

    // 4. Check TypeScript
    console.log('\n📝 Checking TypeScript...');
    try {
      execSync('npm run typecheck', { 
        cwd: rootDir,
        stdio: 'pipe' 
      });
      checks.noTypeErrors = true;
      console.log('   ✅ No TypeScript errors');
    } catch (e) {
      console.log('   ❌ TypeScript errors found');
    }

    // 5. Check documentation
    console.log('\n📚 Checking documentation...');
    const docFiles = [
      'README.md',
      'docs/FILTER_PRESETS_API.md',
      'llms.txt'
    ];
    
    let docsComplete = true;
    for (const doc of docFiles) {
      const exists = fs.existsSync(path.join(rootDir, doc));
      if (!exists) {
        docsComplete = false;
        console.log(`   ❌ Missing: ${doc}`);
      }
    }
    checks.documentationComplete = docsComplete;
    if (docsComplete) {
      console.log('   ✅ Core documentation complete');
    }

    // 6. Check integration tests
    console.log('\n🔗 Checking integration tests...');
    const integrationTestPattern = '**/FilterPreset*.integration.test.{ts,tsx}';
    try {
      const integrationTests = execSync(
        `find ${rootDir}/src -name "*.integration.test.ts" -o -name "*.integration.test.tsx" | wc -l`,
        { encoding: 'utf8' }
      ).trim();
      checks.integrationTestsExist = parseInt(integrationTests) > 0;
      console.log(`   ${checks.integrationTestsExist ? '✅' : '❌'} Integration tests exist (${integrationTests} found)`);
    } catch (e) {
      console.log('   ❌ Could not check integration tests');
    }

    // 7. Check E2E tests
    console.log('\n🎭 Checking E2E tests...');
    try {
      execSync('npm run test:e2e -- --project=chromium --reporter=json', {
        cwd: rootDir,
        stdio: 'pipe',
        timeout: 60000
      });
      checks.e2eTestsPass = true;
      console.log('   ✅ E2E tests pass');
    } catch (e) {
      console.log('   ❌ E2E tests failing or not found');
    }

    // 8. Check contracts
    console.log('\n📄 Checking contracts...');
    const contractsDir = path.join(rootDir, 'src/contracts');
    if (fs.existsSync(contractsDir)) {
      const contracts = fs.readdirSync(contractsDir);
      checks.contractsImplemented = contracts.length > 0;
      console.log(`   ${checks.contractsImplemented ? '✅' : '❌'} Contracts defined (${contracts.length} found)`);
    } else {
      console.log('   ❌ No contracts directory found');
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 RELEASE READINESS SUMMARY');
    console.log('='.repeat(50));

    const passedChecks = Object.values(checks).filter(v => v).length;
    const totalChecks = Object.keys(checks).length;
    const percentage = Math.round((passedChecks / totalChecks) * 100);

    console.log(`\nStatus: ${passedChecks}/${totalChecks} checks passed (${percentage}%)\n`);

    for (const [check, passed] of Object.entries(checks)) {
      console.log(`${passed ? '✅' : '❌'} ${formatCheckName(check)}`);
    }

    // Release decision
    console.log('\n🎯 Release Decision:');
    if (percentage === 100) {
      console.log('✅ READY FOR RELEASE CANDIDATE');
      console.log('\nNext steps:');
      console.log('1. Create release branch: git checkout -b release/filter-presets-v1');
      console.log('2. Run full test suite: npm run test:all');
      console.log('3. Build production: npm run build');
      console.log('4. Create release PR: gh pr create --base main --label "release"');
    } else if (percentage >= 80) {
      console.log('🟡 ALMOST READY - Address remaining issues');
    } else {
      console.log('❌ NOT READY - Significant work remaining');
    }

    // Generate release notes preview
    if (percentage >= 80) {
      console.log('\n📝 Release Notes Preview:');
      console.log('───────────────────────');
      
      const mergedPRs = JSON.parse(
        execSync(`gh pr list --state merged --limit 20 --json number,title,mergedAt`, 
          { encoding: 'utf8' })
      );
      
      const featurePRs = mergedPRs.filter(pr => 
        pr.title.toLowerCase().includes('filter preset') ||
        pr.title.includes('#47') || pr.title.includes('#48') ||
        pr.title.includes('#49') || pr.title.includes('#50') ||
        pr.title.includes('#51') || pr.title.includes('#52')
      );

      console.log('\n### ✨ New Features');
      featurePRs.forEach(pr => {
        console.log(`- ${pr.title} (#${pr.number})`);
      });
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

function formatCheckName(check) {
  return check
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, str => str.toUpperCase());
}

// Get milestone from command line
const milestone = process.argv[2] || 'Filter Presets v1';
checkReleaseReadiness(milestone);