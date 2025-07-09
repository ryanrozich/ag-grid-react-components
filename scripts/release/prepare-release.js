#!/usr/bin/env node

/**
 * Prepare a release by validating everything is ready
 * Usage: node prepare-release.js [version]
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('prepare-release.js');


// Parse arguments
const [version] = process.argv.slice(2);

console.log(`🚀 Preparing release${version ? ` ${version}` : ''}...`);
console.log(`${'═'.repeat(50)}\n`);

/**
 * Run validation checks
 */
const checks = {
  gitStatus: {
    name: 'Git working directory clean',
    check: () => {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return !status;
    },
    fix: 'Commit or stash your changes'
  },

  onMainBranch: {
    name: 'On main branch',
    check: () => {
      const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
      return branch === 'main';
    },
    fix: 'Switch to main branch: git checkout main'
  },

  upToDate: {
    name: 'Branch up to date with origin',
    check: () => {
      execSync('git fetch', { stdio: 'ignore' });
      const local = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const remote = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
      return local === remote;
    },
    fix: 'Pull latest changes: git pull origin main'
  },

  testsPass: {
    name: 'All tests passing',
    check: () => {
      try {
        execSync('npm run test:unit', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Fix failing tests'
  },

  buildSucceeds: {
    name: 'Build succeeds',
    check: () => {
      try {
        execSync('npm run build', { stdio: 'ignore' });
        return fs.existsSync('dist');
      } catch {
        return false;
      }
    },
    fix: 'Fix build errors'
  },

  lintPasses: {
    name: 'No lint errors',
    check: () => {
      try {
        execSync('npm run lint', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Run: npm run lint:fix'
  },

  typecheckPasses: {
    name: 'No TypeScript errors',
    check: () => {
      try {
        execSync('npm run typecheck', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Fix TypeScript errors'
  },

  changelogExists: {
    name: 'CHANGELOG.md exists',
    check: () => {
      return fs.existsSync('CHANGELOG.md');
    },
    fix: 'Create CHANGELOG.md'
  },

  npmAuth: {
    name: 'NPM authentication configured',
    check: () => {
      try {
        execSync('npm whoami', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Run: npm login'
  },

  githubAuth: {
    name: 'GitHub CLI authenticated',
    check: () => {
      try {
        execSync('gh auth status', { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    },
    fix: 'Run: gh auth login'
  }
};

/**
 * Check milestone status
 */
async function checkMilestone() {
  try {
    // Get current version from package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const targetVersion = version || packageJson.version;

    // Find milestone
    const milestones = JSON.parse(
      execSync('gh api repos/{owner}/{repo}/milestones --jq "."', { encoding: 'utf8' })
    );

    const milestone = milestones.find(m =>
      m.title.includes(targetVersion) ||
      m.title === `v${targetVersion}`
    );

    if (milestone) {
      const openIssues = milestone.open_issues;
      const closedIssues = milestone.closed_issues;
      const total = openIssues + closedIssues;
      const progress = total > 0 ? Math.round((closedIssues / total) * 100) : 0;

      return {
        found: true,
        milestone,
        progress,
        ready: openIssues === 0
      };
    }

    return { found: false };
  } catch (error) {
    console.warn('Could not check milestone status');
    return { found: false };
  }
}

/**
 * Get release preview
 */
async function getReleasePreview() {
  try {
    // Get last tag
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();

    // Count commits since last release
    const commitCount = parseInt(
      execSync(`git rev-list ${lastTag}..HEAD --count`, { encoding: 'utf8' }).trim()
    );

    // Get contributors
    const contributors = execSync(
      `git log ${lastTag}..HEAD --format="%an" | sort -u`,
      { encoding: 'utf8' }
    ).trim().split('\n').filter(Boolean);

    // Get PR count
    const prCount = execSync(
      `git log ${lastTag}..HEAD --grep="Merge pull request" --oneline | wc -l`,
      { encoding: 'utf8' }
    ).trim();

    return {
      lastTag,
      commitCount,
      contributorCount: contributors.length,
      prCount: parseInt(prCount),
      contributors
    };
  } catch (error) {
    return null;
  }
}

/**
 * Run all checks
 */
async function runChecks() {
  console.log(`🔍 Running release preparation checks...\n`);

  const results = [];
  let allPassed = true;

  for (const [key, check] of Object.entries(checks)) {
    process.stdout.write(`  ${check.name}... `);

    try {
      const passed = await check.check();
      results.push({ ...check, key, passed });

      if (passed) {
        console.log('✅');
      } else {
        console.log('❌');
        allPassed = false;
      }
    } catch (error) {
      console.log('❌');
      results.push({ ...check, key, passed: false, error: error.message });
      allPassed = false;
    }
  }

  // Check milestone
  console.log(`\n📊 Checking milestone status...`);
  const milestoneStatus = await checkMilestone();

  if (milestoneStatus.found) {
    console.log(`  Milestone: ${milestoneStatus.milestone.title}`);
    console.log(`  Progress: ${milestoneStatus.progress}% (${milestoneStatus.milestone.closed_issues}/${milestoneStatus.milestone.closed_issues + milestoneStatus.milestone.open_issues})`);

    if (!milestoneStatus.ready) {
      console.log(`  ⚠️  Warning: ${milestoneStatus.milestone.open_issues} issues still open`);
      allPassed = false;
    } else {
      console.log(`  ✅ All issues closed`);
    }
  } else {
    console.log(`  ℹ️  No milestone found for version ${version || 'current'}`);
  }

  // Get release preview
  console.log(`\n📈 Release preview...`);
  const preview = await getReleasePreview();

  if (preview) {
    console.log(`  Last release: ${preview.lastTag}`);
    console.log(`  Commits: ${preview.commitCount}`);
    console.log(`  Pull requests: ${preview.prCount}`);
    console.log(`  Contributors: ${preview.contributorCount}`);
  }

  // Summary
  console.log(`\n${'═'.repeat(50)}`);

  if (allPassed) {
    console.log(`\n✅ All checks passed! Ready to release.\n`);

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const currentVersion = packageJson.version;

    console.log(`📦 Current version: ${currentVersion}`);
    console.log(`\n🎯 Next steps:`);
    console.log(`1. Bump version:`);
    console.log(`   node scripts/release/bump-version.js <major|minor|patch>`);
    console.log(`2. Generate changelog:`);
    console.log(`   node scripts/release/generate-changelog.js --from=${preview?.lastTag} --version=X.Y.Z`);
    console.log(`3. Create release:`);
    console.log(`   npm run release`);

    if (currentVersion.includes('-')) {
      console.log(`\n💡 Tip: This looks like a pre-release version.`);
      console.log(`   Consider using: npm run release:patch`);
    }
  } else {
    console.log(`\n❌ Some checks failed. Please fix the issues before releasing.\n`);

    const failed = results.filter(r => !r.passed);
    console.log(`Failed checks:`);
    failed.forEach(check => {
      console.log(`  • ${check.name}`);
      console.log(`    Fix: ${check.fix}`);
      if (check.error) {
        console.log(`    Error: ${check.error}`);
      }
    });
  }

  // Output for automation
  const output = {
    ready: allPassed,
    checks: results.map(r => ({
      name: r.name,
      passed: r.passed,
      key: r.key
    })),
    milestone: milestoneStatus,
    preview: preview
  };

  console.log(`\n🔧 Automation output:`);
  console.log(JSON.stringify(output, null, 2));

  process.exit(allPassed ? 0 : 1);
}

// Run the preparation
runChecks().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});