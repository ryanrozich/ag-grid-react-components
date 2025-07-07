#!/usr/bin/env node

/**
 * Helper script to run .tsx files directly in Node.js ESM context
 * Usage: node run-tsx.js path/to/your/file.tsx
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Get current script directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const loaderPath = resolve(__dirname, 'loader.js');

// Ensure we have a file to run
if (process.argv.length < 3) {
  console.error('Please specify a TypeScript file to run');
  process.exit(1);
}

const targetFile = process.argv[2];

// Check if file exists
if (!fs.existsSync(targetFile)) {
  console.error(`File not found: ${targetFile}`);
  process.exit(1);
}

// Check if it's a TypeScript file
if (!['.ts', '.tsx', '.mts'].some(ext => targetFile.endsWith(ext))) {
  console.error('File must be a TypeScript file (.ts, .tsx, or .mts)');
  process.exit(1);
}

// Build the command arguments
const nodeArgs = [
  `--loader=${loaderPath}`,
  targetFile,
  ...process.argv.slice(3) // Pass any additional arguments
];

// Run the file with the custom loader
const nodeProcess = spawn('node', nodeArgs, { 
  stdio: 'inherit',
  shell: true
});

// Handle process exit
nodeProcess.on('close', (code) => {
  process.exit(code);
});