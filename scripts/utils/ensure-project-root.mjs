#!/usr/bin/env node

/**
 * Utility to ensure scripts are run from the project root directory (ES Module version)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Finds the project root by looking for package.json
 * @param {string} startDir - Starting directory (defaults to current working directory)
 * @returns {string|null} - Project root path or null if not found
 */
export function findProjectRoot(startDir = process.cwd()) {
  let currentDir = startDir;
  
  // Traverse up the directory tree
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      // Verify it's our project by checking the package name
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (packageJson.name === 'ag-grid-react-components') {
          return currentDir;
        }
      } catch (e) {
        // Invalid package.json, continue searching
      }
    }
    
    currentDir = path.dirname(currentDir);
  }
  
  return null;
}

/**
 * Ensures the script is run from the project root
 * Changes to project root if found, exits if not
 * @param {string} scriptName - Name of the calling script for error messages
 */
export function ensureProjectRoot(scriptName = 'Script') {
  const currentDir = process.cwd();
  const projectRoot = findProjectRoot(currentDir);
  
  if (!projectRoot) {
    console.error(`❌ Error: Could not find project root (no package.json with name 'ag-grid-react-components' found)`);
    console.error(`   ${scriptName} must be run from within the project directory`);
    process.exit(1);
  }
  
  if (currentDir !== projectRoot) {
    console.log(`📁 Changing to project root: ${projectRoot}`);
    process.chdir(projectRoot);
  }
  
  return projectRoot;
}

/**
 * Gets a path relative to the project root
 * @param {...string} pathSegments - Path segments to join
 * @returns {string} - Absolute path
 */
export function getProjectPath(...pathSegments) {
  const projectRoot = findProjectRoot();
  if (!projectRoot) {
    throw new Error('Could not find project root');
  }
  return path.join(projectRoot, ...pathSegments);
}

// For scripts that need __dirname equivalent in ES modules
export function getDirname(importMetaUrl) {
  return path.dirname(fileURLToPath(importMetaUrl));
}