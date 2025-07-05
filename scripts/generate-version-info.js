#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getGitInfo() {
  try {
    // Get current commit hash
    const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const shortHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();

    // Get current branch
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

    // Get commit date
    const commitDate = execSync('git log -1 --format=%cd --date=iso', { encoding: 'utf8' }).trim();

    // Get latest tag
    let latestTag = 'v0.0.0';
    try {
      latestTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
    } catch (e) {
      // No tags found
    }

    // Count commits since last tag
    let commitsSinceTag = 0;
    try {
      commitsSinceTag = parseInt(
        execSync(`git rev-list ${latestTag}..HEAD --count`, { encoding: 'utf8' }).trim()
      );
    } catch (e) {
      // Error counting commits
    }

    // Check if working directory is clean
    const isDirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim() !== '';

    return {
      commitHash,
      shortHash,
      branch,
      commitDate,
      latestTag,
      commitsSinceTag,
      isDirty
    };
  } catch (error) {
    console.error('Error getting git info:', error.message);
    return null;
  }
}

function getPackageVersion() {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
  );
  return packageJson.version;
}

function getDeploymentContext() {
  // Check environment variables to determine context
  const isPR = process.env.GITHUB_EVENT_NAME === 'pull_request';
  const prNumber = process.env.GITHUB_PR_NUMBER || null;
  const isMainBranch = process.env.GITHUB_REF === 'refs/heads/main';
  const deployPath = process.env.DEPLOY_PATH || 'ag-grid-react-components';

  return {
    isPR,
    prNumber,
    isMainBranch,
    deployPath
  };
}

function generateVersionInfo() {
  const gitInfo = getGitInfo();
  const packageVersion = getPackageVersion();
  const deploymentContext = getDeploymentContext();
  const buildTime = new Date().toISOString();

  const versionInfo = {
    version: packageVersion,
    git: gitInfo,
    deployment: deploymentContext,
    buildTime,
    // Generate display strings
    displayVersion: gitInfo && gitInfo.commitsSinceTag > 0
      ? `v${packageVersion}+${gitInfo.commitsSinceTag}`
      : `v${packageVersion}`,
    displayLabel: deploymentContext.isPR
      ? `PR #${deploymentContext.prNumber}`
      : gitInfo?.branch !== 'main'
        ? gitInfo?.branch
        : gitInfo?.commitsSinceTag > 0
          ? 'unreleased'
          : 'latest'
  };

  // Write to file
  const outputPath = path.resolve(__dirname, '../src/demo/version-info.json');
  fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2) + '\n');

  console.log('✅ Version info generated:', versionInfo.displayVersion, `(${versionInfo.displayLabel})`);

  return versionInfo;
}

// Run if called directly
if (process.argv[1] === __filename) {
  generateVersionInfo();
}

export { generateVersionInfo };