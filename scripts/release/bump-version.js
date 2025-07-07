#!/usr/bin/env node

/**
 * Smart version bumping with validation
 * Usage: node bump-version.js <major|minor|patch|prerelease|rc> [preid]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import readline from 'readline';
import { ensureProjectRoot } from '../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('bump-version.js');


// Parse arguments
const [releaseType, preid = 'rc'] = process.argv.slice(2);

if (!releaseType) {
  console.error(`❌ Usage: node bump-version.js <major|minor|patch|prerelease|rc> [preid]

Examples:
  node bump-version.js patch                    # 0.1.0 → 0.1.1
  node bump-version.js minor                    # 0.1.1 → 0.2.0
  node bump-version.js major                    # 0.2.0 → 1.0.0
  node bump-version.js rc                       # 0.2.0 → 0.2.1-rc.0
  node bump-version.js prerelease beta         # 0.2.0 → 0.2.1-beta.0
`);
  process.exit(1);
}

// Read current package.json
const packagePath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const currentVersion = packageJson.version;

console.log(`📦 Current version: ${currentVersion}`);

/**
 * Calculate next version
 */
function getNextVersion(current, type, preid) {
  let next;
  
  switch (type) {
    case 'major':
      next = semver.inc(current, 'major');
      break;
    case 'minor':
      next = semver.inc(current, 'minor');
      break;
    case 'patch':
      next = semver.inc(current, 'patch');
      break;
    case 'rc':
      // Special handling for RC
      if (current.includes('-rc.')) {
        // Increment existing RC
        next = semver.inc(current, 'prerelease', 'rc');
      } else {
        // Create new RC
        const base = semver.inc(current, 'patch');
        next = `${base}-rc.0`;
      }
      break;
    case 'prerelease':
      next = semver.inc(current, 'prerelease', preid);
      break;
    default:
      throw new Error(`Invalid release type: ${type}`);
  }
  
  return next;
}

/**
 * Check for uncommitted changes
 */
function checkWorkingDirectory() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status) {
      console.warn(`⚠️  Warning: You have uncommitted changes:`);
      console.warn(status);
      console.warn(`\nConsider committing or stashing these changes first.`);
      
      // Ask for confirmation
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      return new Promise((resolve) => {
        rl.question('Continue anyway? (y/N) ', (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y');
        });
      });
    }
    return Promise.resolve(true);
  } catch (error) {
    console.error('Error checking git status:', error.message);
    return Promise.resolve(false);
  }
}

/**
 * Get recent commits for changelog preview
 */
function getRecentCommits() {
  try {
    const lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    const commits = execSync(
      `git log ${lastTag}..HEAD --oneline --no-merges`,
      { encoding: 'utf8' }
    );
    
    return commits.trim().split('\n').filter(Boolean);
  } catch (error) {
    return [];
  }
}

/**
 * Main bump process
 */
async function bumpVersion() {
  try {
    // Check working directory
    const canContinue = await checkWorkingDirectory();
    if (!canContinue) {
      console.log('❌ Version bump cancelled');
      process.exit(1);
    }

    // Calculate next version
    const nextVersion = getNextVersion(currentVersion, releaseType, preid);
    
    if (!nextVersion || !semver.valid(nextVersion)) {
      throw new Error(`Invalid next version: ${nextVersion}`);
    }

    console.log(`📈 Next version: ${nextVersion}`);

    // Show what will be included
    const recentCommits = getRecentCommits();
    if (recentCommits.length > 0) {
      console.log(`\n📝 Commits since last release:`);
      recentCommits.slice(0, 10).forEach(commit => {
        console.log(`  ${commit}`);
      });
      if (recentCommits.length > 10) {
        console.log(`  ... and ${recentCommits.length - 10} more`);
      }
    }

    // Version validation
    console.log(`\n🔍 Validating version bump...`);
    
    // Check if version already exists
    try {
      execSync(`git rev-parse v${nextVersion}`, { stdio: 'ignore' });
      throw new Error(`Version ${nextVersion} already exists as a git tag`);
    } catch (e) {
      // Tag doesn't exist, which is good
    }

    // Check if it's a valid bump
    if (!semver.gt(nextVersion, currentVersion)) {
      throw new Error(`Next version (${nextVersion}) must be greater than current version (${currentVersion})`);
    }

    // Update package.json
    console.log(`\n📝 Updating package.json...`);
    packageJson.version = nextVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

    // Update package-lock.json if it exists
    const lockPath = path.join(process.cwd(), 'package-lock.json');
    if (fs.existsSync(lockPath)) {
      console.log(`📝 Updating package-lock.json...`);
      execSync('npm install --package-lock-only', { stdio: 'inherit' });
    }

    // Update other files that might contain version
    const filesToUpdate = [
      'README.md',
      'docs/getting-started.md'
    ];
    
    filesToUpdate.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        console.log(`📝 Updating ${file}...`);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update version patterns
        content = content.replace(
          new RegExp(`${currentVersion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'),
          nextVersion
        );
        
        // Update version badges
        content = content.replace(
          /version-[0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9.]+)?/g,
          `version-${nextVersion}`
        );
        
        fs.writeFileSync(filePath, content);
      }
    });

    // Generate version commit message
    const isPrerelease = nextVersion.includes('-');
    const commitType = isPrerelease ? 'chore' : 'release';
    const commitMessage = `${commitType}: bump version to ${nextVersion}`;

    console.log(`\n✅ Version bumped successfully!`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Review the changes:`);
    console.log(`   git diff`);
    console.log(`2. Commit the version bump:`);
    console.log(`   git add -A`);
    console.log(`   git commit -m "${commitMessage}"`);
    console.log(`3. Create and push tag:`);
    console.log(`   git tag -a v${nextVersion} -m "Version ${nextVersion}"`);
    console.log(`   git push origin main --tags`);
    
    if (releaseType === 'rc') {
      console.log(`4. Trigger RC workflow:`);
      console.log(`   gh workflow run release-candidate.yml -f version=${nextVersion}`);
    } else if (!isPrerelease) {
      console.log(`4. Trigger release workflow:`);
      console.log(`   gh workflow run release.yml`);
    }

    // Output for automation
    const result = {
      success: true,
      previousVersion: currentVersion,
      nextVersion: nextVersion,
      releaseType: releaseType,
      isPrerelease: isPrerelease,
      commitMessage: commitMessage
    };

    console.log(`\n🔧 Automation output:`);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(`\n❌ Error bumping version:`, error.message);
    process.exit(1);
  }
}

// Run the bump
bumpVersion().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});