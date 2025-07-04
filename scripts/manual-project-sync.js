#!/usr/bin/env node

/**
 * Manual sync script that can run without GitHub Actions
 * Use this when workflows aren't available on main branch
 * 
 * Usage: GITHUB_TOKEN=ghp_xxx node scripts/manual-project-sync.js
 * Note: Token needs 'repo' and 'read:project' scopes
 */

import { execSync } from 'child_process';

// Check for token
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || execSync('gh auth token').toString().trim();

if (!GITHUB_TOKEN) {
  console.error('❌ No GitHub token found. Please set GITHUB_TOKEN or authenticate with gh CLI');
  process.exit(1);
}

console.log('🔄 Manual Project Sync\n');
console.log('This script requires a GitHub token with these scopes:');
console.log('  ✓ repo');
console.log('  ✓ read:project');
console.log('\nIf you get permission errors, update your token at:');
console.log('https://github.com/settings/tokens\n');
console.log('─'.repeat(50) + '\n');

// Run the bootstrap sync with the token
try {
  execSync('node scripts/bootstrap-project-sync.js', {
    stdio: 'inherit',
    env: { ...process.env, GITHUB_TOKEN }
  });
} catch (error) {
  console.error('\n❌ Sync failed. Please check your token permissions.');
  process.exit(1);
}