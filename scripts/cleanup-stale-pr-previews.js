#!/usr/bin/env node

/**
 * Cleanup stale PR preview deployments from Cloudflare
 * This script removes workers and KV entries for PRs that have been merged/closed
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { Octokit } from '@octokit/rest';

const execAsync = promisify(exec);

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_OWNER = 'ryanrozich';
const GITHUB_REPO = 'ag-grid-react-components';
const CLOUDFLARE_KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID || '';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required');
  console.error('Run: export GITHUB_TOKEN=your_github_token');
  process.exit(1);
}

if (!CLOUDFLARE_KV_NAMESPACE_ID) {
  console.error('❌ CLOUDFLARE_KV_NAMESPACE_ID environment variable is required');
  process.exit(1);
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN
});

async function getAllPRNumbers() {
  console.log('📋 Fetching all PRs (open and closed)...');
  
  const allPRs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await octokit.pulls.list({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      state: 'all',
      per_page: 100,
      page
    });

    allPRs.push(...data);
    hasMore = data.length === 100;
    page++;
  }

  return allPRs;
}

async function getWorkersList() {
  console.log('🔍 Fetching list of deployed workers...');
  
  try {
    const { stdout } = await execAsync('wrangler deployments list');
    const lines = stdout.split('\n');
    
    // Extract worker names that match our PR pattern
    const prWorkers = [];
    const workerPattern = /ag-grid-demo-api-pr-(\d+)/;
    
    for (const line of lines) {
      const match = line.match(workerPattern);
      if (match) {
        prWorkers.push({
          name: match[0],
          prNumber: parseInt(match[1])
        });
      }
    }

    // Also check with wrangler workers list
    const { stdout: workersList } = await execAsync('npx wrangler workers list');
    const workersLines = workersList.split('\n');
    
    for (const line of workersLines) {
      const match = line.match(workerPattern);
      if (match) {
        const workerName = match[0];
        const prNumber = parseInt(match[1]);
        
        // Add if not already in list
        if (!prWorkers.find(w => w.name === workerName)) {
          prWorkers.push({ name: workerName, prNumber });
        }
      }
    }

    return prWorkers;
  } catch (error) {
    console.log('Could not fetch workers list automatically');
    return [];
  }
}

async function deleteWorker(workerName) {
  console.log(`  🗑️  Deleting worker: ${workerName}`);
  try {
    await execAsync(`npx wrangler delete "${workerName}" --force`);
    return true;
  } catch (error) {
    console.error(`  ❌ Failed to delete worker ${workerName}:`, error.message);
    return false;
  }
}

async function deleteKVEntry(prNumber) {
  console.log(`  🗑️  Deleting KV entry for PR #${prNumber}`);
  try {
    await execAsync(
      `wrangler kv key delete "ag-grid-react-components-pr-${prNumber}" ` +
      `--namespace-id="${CLOUDFLARE_KV_NAMESPACE_ID}" --force`
    );
    return true;
  } catch (error) {
    // KV entry might not exist
    if (error.message.includes('key not found')) {
      console.log(`  ℹ️  KV entry for PR #${prNumber} not found (already deleted)`);
    } else {
      console.error(`  ❌ Failed to delete KV entry for PR #${prNumber}:`, error.message);
    }
    return false;
  }
}

async function cleanupStalePreviews() {
  try {
    // Get all PRs
    const allPRs = await getAllPRNumbers();
    const openPRNumbers = new Set(
      allPRs
        .filter(pr => pr.state === 'open')
        .map(pr => pr.number)
    );
    
    console.log(`\n📊 Found ${openPRNumbers.size} open PRs`);
    console.log(`📊 Found ${allPRs.length - openPRNumbers.size} closed/merged PRs`);

    // Get all deployed workers
    const workers = await getWorkersList();
    console.log(`\n🔧 Found ${workers.length} PR preview workers`);

    if (workers.length === 0) {
      // Fallback: check for specific PR numbers from the screenshot
      const knownPRNumbers = [18, 35, 38, 40, 41];
      console.log('\n📌 Checking known PR numbers from recent deployments...');
      
      for (const prNumber of knownPRNumbers) {
        const pr = allPRs.find(p => p.number === prNumber);
        if (pr && pr.state === 'closed') {
          console.log(`\n🧹 Cleaning up stale preview for PR #${prNumber} (${pr.merged ? 'merged' : 'closed'})`);
          
          // Try to delete worker
          await deleteWorker(`ag-grid-demo-api-pr-${prNumber}`);
          
          // Delete KV entry
          await deleteKVEntry(prNumber);
        }
      }
    } else {
      // Clean up workers for closed PRs
      let cleanedCount = 0;
      
      for (const worker of workers) {
        const pr = allPRs.find(p => p.number === worker.prNumber);
        
        if (!pr) {
          console.log(`\n🧹 Cleaning up orphaned preview for PR #${worker.prNumber} (PR not found)`);
          await deleteWorker(worker.name);
          await deleteKVEntry(worker.prNumber);
          cleanedCount++;
        } else if (pr.state === 'closed') {
          console.log(`\n🧹 Cleaning up stale preview for PR #${worker.prNumber} (${pr.merged ? 'merged' : 'closed'})`);
          await deleteWorker(worker.name);
          await deleteKVEntry(worker.prNumber);
          cleanedCount++;
        } else {
          console.log(`\n✅ Keeping preview for PR #${worker.prNumber} (still open)`);
        }
      }

      console.log(`\n🎉 Cleanup complete! Removed ${cleanedCount} stale preview deployments`);
    }

    // Also check R2 bucket for stale files (optional, requires more setup)
    console.log('\n💡 Note: R2 bucket files need to be cleaned up separately using the Cloudflare dashboard or R2 API');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

// Check if wrangler is available
async function checkWranglerInstalled() {
  try {
    await execAsync('wrangler --version');
    return true;
  } catch {
    console.error('❌ Wrangler CLI not found. Please install it first:');
    console.error('   npm install -g wrangler');
    return false;
  }
}

async function main() {
  console.log('🧹 Cloudflare PR Preview Cleanup Script');
  console.log('=====================================\n');

  // Check prerequisites
  const hasWrangler = await checkWranglerInstalled();
  if (!hasWrangler) {
    process.exit(1);
  }

  // Check if logged in to Cloudflare
  try {
    await execAsync('wrangler whoami');
  } catch {
    console.error('❌ Not logged in to Cloudflare. Please run:');
    console.error('   wrangler login');
    process.exit(1);
  }

  await cleanupStalePreviews();
}

main().catch(console.error);