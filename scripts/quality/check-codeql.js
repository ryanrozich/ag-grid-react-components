#!/usr/bin/env node

/**
 * Local CodeQL checker
 * Validates common security patterns before pushing
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot } from '../utils/ensure-project-root.mjs';

// Ensure we're in the project root
ensureProjectRoot('check-codeql.js');

const securityPatterns = [
  {
    name: 'Command Injection',
    pattern: /execSync\s*\(\s*`[^`]*\$\{[^}]*\}[^`]*`/g,
    message: 'Potential command injection: validate user input before using in shell commands',
    fix: 'Use parseInt() or other validation for numeric inputs'
  },
  {
    name: 'Unescaped RegExp',
    pattern: /new\s+RegExp\s*\(\s*[^,)]*\.replace\s*\(\s*\/[^/]+\/[^,)]*,\s*['"\\]+[^)]*\)/g,
    message: 'Incomplete regex escaping: use proper escaping function',
    fix: 'Use .replace(/[.*+?^${}()|[\\]\\\\]/g, \'\\\\$&\')'
  },
  {
    name: 'Workflow Inputs',
    pattern: /workflow_dispatch:\s*\n\s*inputs:/g,
    message: 'Workflow inputs can affect build security (CKV_GHA_7)',
    fix: 'Remove inputs or add exemption comment for non-build workflows'
  }
];

console.log('🔍 Running local CodeQL checks...\n');

const filesToCheck = execSync('git diff --cached --name-only', { encoding: 'utf8' })
  .split('\n')
  .filter(f => f && (f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.yml')));

if (filesToCheck.length === 0) {
  console.log('No staged files to check');
  process.exit(0);
}

let issues = 0;

for (const file of filesToCheck) {
  if (!fs.existsSync(file)) continue;

  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (const pattern of securityPatterns) {
    let match;
    while ((match = pattern.pattern.exec(content)) !== null) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      console.log(`\n❌ ${file}:${lineNum}`);
      console.log(`   ${pattern.name}: ${pattern.message}`);
      console.log(`   Fix: ${pattern.fix}`);
      console.log(`   Line: ${lines[lineNum - 1].trim()}`);
      issues++;
    }
  }
}

if (issues > 0) {
  console.log(`\n\n⚠️  Found ${issues} potential security issues`);
  console.log('Fix these before pushing to avoid CodeQL failures');
  process.exit(1);
} else {
  console.log('✅ No security issues found!');
}