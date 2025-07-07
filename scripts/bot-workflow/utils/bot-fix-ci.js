#!/usr/bin/env node

/**
 * Bot attempts to fix CI failures automatically
 * Usage: node bot-fix-ci.js <pr-number>
 * Must be run from within the worktree directory
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse arguments
const prNumber = process.argv[2];

if (!prNumber) {
  console.error('❌ Usage: node bot-fix-ci.js <pr-number>');
  process.exit(1);
}

console.log(`🔧 Bot attempting to fix CI failures for PR #${prNumber}...`);

/**
 * Get CI check runs for a PR
 */
async function getCIStatus(pr) {
  try {
    const checks = JSON.parse(
      execSync(`gh pr checks ${pr} --json name,state,conclusion`, { encoding: 'utf8' })
    );

    return checks;
  } catch (error) {
    console.error('Failed to get CI status:', error.message);
    return [];
  }
}

/**
 * Attempt to fix formatting issues
 */
async function fixFormatting() {
  console.log(`🎨 Attempting to fix formatting...`);

  try {
    // Run format fix
    execSync('npm run format:fix', { stdio: 'inherit' });

    // Check if there are changes
    const changes = execSync('git diff --name-only', { encoding: 'utf8' });

    if (changes) {
      console.log(`✅ Fixed formatting in ${changes.split('\n').filter(Boolean).length} files`);
      return true;
    } else {
      console.log(`ℹ️  No formatting changes needed`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to fix formatting:`, error.message);
    return false;
  }
}

/**
 * Attempt to fix linting issues
 */
async function fixLinting() {
  console.log(`🔍 Attempting to fix linting issues...`);

  try {
    // Run lint fix
    execSync('npm run lint:fix', { stdio: 'inherit' });

    // Check if there are changes
    const changes = execSync('git diff --name-only', { encoding: 'utf8' });

    if (changes) {
      console.log(`✅ Fixed linting in ${changes.split('\n').filter(Boolean).length} files`);
      return true;
    } else {
      console.log(`ℹ️  No linting changes needed`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to fix linting:`, error.message);
    return false;
  }
}

/**
 * Attempt to fix whitespace issues
 */
async function fixWhitespace() {
  console.log(`📐 Attempting to fix whitespace...`);

  try {
    // Run whitespace fix
    execSync('npm run fix:whitespace', { stdio: 'inherit' });

    // Check if there are changes
    const changes = execSync('git diff --name-only', { encoding: 'utf8' });

    if (changes) {
      console.log(`✅ Fixed whitespace issues`);
      return true;
    } else {
      console.log(`ℹ️  No whitespace issues found`);
      return false;
    }
  } catch (error) {
    console.error(`Failed to fix whitespace:`, error.message);
    return false;
  }
}

/**
 * Analyze test failures
 */
async function analyzeTestFailures() {
  console.log(`🧪 Analyzing test failures...`);

  try {
    // Run tests and capture output
    const testOutput = execSync('npm run test:unit 2>&1', { encoding: 'utf8' }).toString();

    // Parse common test failure patterns
    const failurePatterns = {
      typeError: /TypeError: Cannot read property/g,
      importError: /Cannot find module/g,
      assertionError: /AssertionError/g,
      timeoutError: /Timeout/g
    };

    const analysis = {
      failures: [],
      suggestions: []
    };

    Object.entries(failurePatterns).forEach(([type, pattern]) => {
      const matches = testOutput.match(pattern);
      if (matches) {
        analysis.failures.push({
          type: type,
          count: matches.length
        });
      }
    });

    // Generate suggestions
    if (analysis.failures.some(f => f.type === 'importError')) {
      analysis.suggestions.push('Check import paths and install missing dependencies');
    }

    if (analysis.failures.some(f => f.type === 'typeError')) {
      analysis.suggestions.push('Add null checks and validate data types');
    }

    return analysis;
  } catch (error) {
    // Tests failed, which is expected
    return {
      failures: [{ type: 'general', count: 1 }],
      suggestions: ['Review test output for specific failures']
    };
  }
}

/**
 * Attempt to fix type errors
 */
async function fixTypeErrors() {
  console.log(`📝 Checking for type errors...`);

  try {
    // Run typecheck and capture output
    const output = execSync('npm run typecheck 2>&1', { encoding: 'utf8' }).toString();

    // Look for common type errors
    if (output.includes('is not assignable to type')) {
      console.log(`⚠️  Type errors detected - manual intervention required`);
      return false;
    }

    console.log(`✅ No type errors found`);
    return true;
  } catch (error) {
    // Type errors exist
    const output = error.stdout?.toString() || error.message;

    // Extract error count
    const errorMatch = output.match(/Found (\d+) error/);
    const errorCount = errorMatch ? parseInt(errorMatch[1]) : 'unknown';

    console.log(`❌ Found ${errorCount} type errors`);
    console.log(`   These require manual fixing`);

    return false;
  }
}

/**
 * Main CI fix function
 */
async function fixCI() {
  try {
    // Get current CI status
    console.log(`\n📊 Checking CI status...`);
    const checks = await getCIStatus(prNumber);

    const failedChecks = checks.filter(c => c.conclusion === 'failure');

    if (failedChecks.length === 0) {
      console.log(`✅ All CI checks are passing!`);
      return;
    }

    console.log(`\n❌ Found ${failedChecks.length} failing checks:`);
    failedChecks.forEach(check => {
      console.log(`   - ${check.name}`);
    });

    // Track what was fixed
    const fixes = {
      formatting: false,
      linting: false,
      whitespace: false,
      tests: false,
      types: false
    };

    // Attempt fixes based on failed checks
    console.log(`\n🔧 Attempting automatic fixes...\n`);

    if (failedChecks.some(c => c.name.toLowerCase().includes('format'))) {
      fixes.formatting = await fixFormatting();
    }

    if (failedChecks.some(c => c.name.toLowerCase().includes('lint'))) {
      fixes.linting = await fixLinting();
    }

    if (failedChecks.some(c => c.name.toLowerCase().includes('whitespace'))) {
      fixes.whitespace = await fixWhitespace();
    }

    if (failedChecks.some(c => c.name.toLowerCase().includes('type'))) {
      fixes.types = await fixTypeErrors();
    }

    if (failedChecks.some(c => c.name.toLowerCase().includes('test'))) {
      const testAnalysis = await analyzeTestFailures();
      console.log(`\n📋 Test failure analysis:`);
      testAnalysis.failures.forEach(f => {
        console.log(`   - ${f.type}: ${f.count} failures`);
      });
      console.log(`\n💡 Suggestions:`);
      testAnalysis.suggestions.forEach(s => {
        console.log(`   - ${s}`);
      });
    }

    // Check if any fixes were made
    const changesApplied = Object.values(fixes).some(f => f === true);

    if (changesApplied) {
      console.log(`\n✅ Applied automatic fixes!`);

      // Commit and push changes
      console.log(`\n📤 Committing and pushing fixes...`);
      execSync('git add -A', { stdio: 'inherit' });
      execSync(`git commit -m "bot: fix CI failures\n\nAutomatically fixed:\n${Object.entries(fixes).filter(([_, v]) => v).map(([k, _]) => `- ${k}`).join('\n')}"`, { stdio: 'inherit' });

      // Get branch name
      const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
      execSync(`git push origin ${branch}`, { stdio: 'inherit' });

      // Add comment to PR
      const comment = `🤖 **CI Fix Applied**

I've automatically fixed the following issues:
${Object.entries(fixes).filter(([_, v]) => v).map(([k, _]) => `- ✅ ${k}`).join('\n')}

The fixes have been committed and pushed. CI should re-run automatically.`;

      execSync(`gh pr comment ${prNumber} --body "${comment.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });

    } else {
      console.log(`\n⚠️  No automatic fixes could be applied`);

      // Add comment about manual intervention needed
      const comment = `🤖 **CI Fix Attempt**

I analyzed the CI failures but could not apply automatic fixes.

**Failed checks:**
${failedChecks.map(c => `- ❌ ${c.name}`).join('\n')}

**Manual intervention required for:**
${Object.entries(fixes).filter(([_, v]) => v === false).map(([k, _]) => `- ${k}`).join('\n')}

Please review the CI logs and fix the issues manually.`;

      execSync(`gh pr comment ${prNumber} --body "${comment.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    }

    // Update bot state
    const botStateDir = path.join(process.cwd(), '.bot');
    if (fs.existsSync(botStateDir)) {
      const memoryPath = path.join(botStateDir, 'memory.md');
      const memoryEntry = `\n## ${new Date().toISOString()}\n- Attempted CI fixes for PR #${prNumber}\n- Fixed: ${Object.entries(fixes).filter(([_, v]) => v).map(([k, _]) => k).join(', ') || 'none'}\n`;
      fs.appendFileSync(memoryPath, memoryEntry);
    }

    // Output for automation
    const result = {
      success: changesApplied,
      pr: parseInt(prNumber),
      failedChecks: failedChecks.length,
      fixes: fixes,
      timestamp: new Date().toISOString()
    };

    console.log(`\n🔧 Automation output:`);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(`\n❌ Error fixing CI:`, error.message);
    process.exit(1);
  }
}

// Run the CI fix
fixCI().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});