#!/usr/bin/env node
/**
 * Injects current git branch information into the built HTML
 * This helps with dynamic URL generation at runtime
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.warn('Could not determine git branch:', error.message);
    return 'main';
  }
}

function injectBranchInfo() {
  const branch = getCurrentBranch();
  const htmlPath = join(__dirname, '../dist-demo/index.html');

  try {
    let html = readFileSync(htmlPath, 'utf8');

    // Check if meta tag already exists
    if (!html.includes('name="git-branch"')) {
      // Inject branch info into the head
      const metaTag = `<meta name="git-branch" content="${branch}">`;
      html = html.replace('</head>', `  ${metaTag}\n  </head>`);

      writeFileSync(htmlPath, html);
      console.log(`✅ Injected branch info: ${branch}`);
    } else {
      console.log(`ℹ️  Branch meta tag already exists`);
    }
  } catch (error) {
    console.error('Error injecting branch info:', error);
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  injectBranchInfo();
}

export { getCurrentBranch, injectBranchInfo };