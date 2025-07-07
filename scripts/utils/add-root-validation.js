#!/usr/bin/env node

/**
 * Add project root validation to scripts
 */

import fs from 'fs';
import path from 'path';
import { ensureProjectRoot } from './ensure-project-root.mjs';

// Ensure we're in the project root
ensureProjectRoot('add-root-validation.js');

// Scripts to update
const scriptsToUpdate = [
  // Bot workflow scripts
  'scripts/bot-workflow/core/bot-checkpoint.js',
  'scripts/bot-workflow/core/bot-handoff.js',
  'scripts/bot-workflow/core/bot-resume-work.js',
  'scripts/bot-workflow/core/bot-status-all.js',
  'scripts/bot-workflow/coordinator/plan-feature.js',
  'scripts/bot-workflow/coordinator/assign-bot.js',
  'scripts/bot-workflow/coordinator/monitor-progress.js',
  'scripts/bot-workflow/worktree/setup-worktree.js',
  'scripts/bot-workflow/worktree/cleanup-worktree.js',
  
  // Release scripts
  'scripts/release/generate-changelog.js',
  'scripts/release/bump-version.js',
  'scripts/release/prepare-release.js',
  
  // Automation scripts
  'scripts/automation/monitoring/health-check.js',
  'scripts/automation/monitoring/workflow-performance.js',
  
  // Quality scripts (CommonJS)
  'scripts/quality/check-fonts.js',
  'scripts/quality/check-codeql.js',
  'scripts/quality/thorough-demo-check.js',
  'scripts/quality/validate-demo.js'
];

const importStatementCJS = `const { ensureProjectRoot } = require('${path.relative(process.cwd(), 'scripts/utils/ensure-project-root.cjs')}');`;
const importStatementESM = `import { ensureProjectRoot } from '${path.relative(process.cwd(), 'scripts/utils/ensure-project-root.mjs')}';`;

scriptsToUpdate.forEach(scriptPath => {
  if (!fs.existsSync(scriptPath)) {
    console.log(`⚠️  Skipping ${scriptPath} - file not found`);
    return;
  }
  
  let content = fs.readFileSync(scriptPath, 'utf8');
  const scriptName = path.basename(scriptPath);
  
  // Skip if already has the import
  if (content.includes('ensureProjectRoot')) {
    console.log(`✓ ${scriptPath} - already has project root validation`);
    return;
  }
  
  // Determine if ES module or CommonJS
  const isESM = content.includes('import ') && content.includes('from ');
  
  // Calculate relative path for import
  const relativePath = path.relative(path.dirname(scriptPath), 'scripts/utils');
  const importPath = isESM 
    ? `import { ensureProjectRoot } from '${relativePath}/ensure-project-root.mjs';`
    : `const { ensureProjectRoot } = require('${relativePath}/ensure-project-root.cjs');`;
  
  const ensureStatement = `\n// Ensure we're in the project root\nensureProjectRoot('${scriptName}');\n`;
  
  if (isESM) {
    // For ES modules, add after last import
    const lastImportMatch = content.match(/import[^;]+;[^\n]*\n/g);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      const insertPos = content.lastIndexOf(lastImport) + lastImport.length;
      content = content.slice(0, insertPos) + importPath + '\n' + ensureStatement + content.slice(insertPos);
    }
  } else {
    // For CommonJS, add after last require
    const requireMatches = [...content.matchAll(/const [^=]+ = require\([^)]+\);/g)];
    if (requireMatches.length > 0) {
      const lastRequire = requireMatches[requireMatches.length - 1];
      const insertPos = lastRequire.index + lastRequire[0].length;
      content = content.slice(0, insertPos) + '\n' + importPath + ensureStatement + content.slice(insertPos);
    }
  }
  
  fs.writeFileSync(scriptPath, content);
  console.log(`✅ Updated ${scriptPath}`);
});

console.log('\n✅ Project root validation added to scripts');
console.log('Scripts will now work correctly from any directory within the project');