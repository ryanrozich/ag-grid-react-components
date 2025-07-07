#!/usr/bin/env node

/**
 * Convert CommonJS scripts to ES Modules
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { ensureProjectRoot } from './ensure-project-root.mjs';

// Ensure we're in the project root
ensureProjectRoot('convert-to-esm.js');

// Find all .js files in scripts directory (excluding node_modules and already ESM files)
const scriptFiles = glob.sync('scripts/**/*.js', {
  ignore: [
    'scripts/utils/ensure-project-root.cjs',
    'scripts/utils/convert-to-esm.js',
    'scripts/quality/*.js', // These are already ESM
    'scripts/build/*.js', // These are already ESM
    '**/node_modules/**'
  ]
});

console.log(`Found ${scriptFiles.length} scripts to convert to ESM\n`);

scriptFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Skip if already ESM
  if (content.includes('import ') && content.includes(' from ')) {
    console.log(`✓ ${filePath} - already ESM`);
    return;
  }

  // Convert require statements to import
  content = content.replace(
    /const\s+{\s*([^}]+)\s*}\s*=\s*require\(['"]([^'"]+)['"]\);?/g,
    'import { $1 } from \'$2\';'
  );

  content = content.replace(
    /const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g,
    'import $1 from \'$2\';'
  );

  // Fix path and fs imports (they need specific syntax)
  content = content.replace(
    /import path from 'path';/g,
    'import path from \'path\';'
  );

  content = content.replace(
    /import fs from 'fs';/g,
    'import fs from \'fs\';'
  );

  // Update ensure-project-root import
  content = content.replace(
    /from\s+['"]([^'"]*\/)?ensure-project-root\.cjs['"]/g,
    'from \'$1ensure-project-root.mjs\''
  );

  // Convert module.exports to export
  content = content.replace(
    /module\.exports\s*=\s*{([^}]+)}/g,
    'export {$1}'
  );

  content = content.replace(
    /module\.exports\s*=\s*(\w+);?/g,
    'export default $1;'
  );

  // Add file extension to local imports
  content = content.replace(
    /from\s+['"](\.\.?\/[^'"]+)(?<!\.m?js)['"]/g,
    (match, importPath) => {
      // Don't add extension if it's a directory with index.js
      if (fs.existsSync(path.join(path.dirname(filePath), importPath, 'index.js'))) {
        return `from '${importPath}'`;
      }
      // Add .js extension
      return `from '${importPath}.js'`;
    }
  );

  // Handle __dirname usage
  if (content.includes('__dirname')) {
    // Add import for fileURLToPath if not present
    if (!content.includes('fileURLToPath')) {
      const importInsertPoint = content.match(/import[^;]+;\n/g);
      if (importInsertPoint) {
        const lastImport = importInsertPoint[importInsertPoint.length - 1];
        const insertPos = content.lastIndexOf(lastImport) + lastImport.length;
        content = content.slice(0, insertPos) +
          `import { fileURLToPath } from 'url';\n` +
          content.slice(insertPos);
      }
    }

    // Add __dirname definition after imports
    const importsEnd = content.lastIndexOf('import');
    if (importsEnd !== -1) {
      const lineEnd = content.indexOf('\n', importsEnd);
      if (!content.includes('const __dirname')) {
        content = content.slice(0, lineEnd + 1) +
          '\nconst __dirname = path.dirname(fileURLToPath(import.meta.url));\n' +
          content.slice(lineEnd + 1);
      }
    }
  }

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Converted ${filePath} to ESM`);
  } else {
    console.log(`⚠️  ${filePath} - no changes needed`);
  }
});

// Also delete the .cjs file since we won't need it
if (fs.existsSync('scripts/utils/ensure-project-root.cjs')) {
  fs.unlinkSync('scripts/utils/ensure-project-root.cjs');
  console.log('\n🗑️  Removed scripts/utils/ensure-project-root.cjs (no longer needed)');
}

console.log('\n✅ Conversion to ESM complete!');
console.log('All scripts now use modern ES modules.');