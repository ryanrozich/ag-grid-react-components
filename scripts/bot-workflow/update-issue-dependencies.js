#!/usr/bin/env node

/**
 * Updates issues with dependency information
 * This helps bots understand their relationships
 */

import { execSync } from 'child_process';

const DEPENDENCIES = {
  48: {
    depends: [47],
    blocking: [51, 52],
    contract: 'src/contracts/IFilterPresetUI.ts'
  },
  49: {
    depends: [47],
    blocking: [51, 52],
    contract: 'src/contracts/IPresetSharing.ts'
  },
  50: {
    depends: [47],
    blocking: [51, 52],
    contract: 'src/contracts/ISystemPresets.ts'
  },
  51: {
    depends: [47, 48, 49, 50],
    blocking: [52],
    contract: null
  },
  52: {
    depends: [47, 48, 49, 50, 51],
    blocking: [],
    contract: null
  }
};

async function updateDependencies() {
  console.log('📋 Updating issue dependencies...\n');

  for (const [issueNum, deps] of Object.entries(DEPENDENCIES)) {
    try {
      // Get current issue body
      const issue = JSON.parse(
        execSync(`gh issue view ${issueNum} --json body`, { encoding: 'utf8' })
      );
      
      let body = issue.body || '';
      
      // Add dependency section if not exists
      if (!body.includes('## Dependencies')) {
        body += '\n\n## Dependencies\n\n';
        
        if (deps.depends.length > 0) {
          body += `**Depends on:** ${deps.depends.map(n => `#${n}`).join(', ')}\n`;
        }
        
        if (deps.blocking.length > 0) {
          body += `**Blocking:** ${deps.blocking.map(n => `#${n}`).join(', ')}\n`;
        }
        
        if (deps.contract) {
          body += `**Contract:** \`${deps.contract}\`\n`;
        }
        
        body += '\n## Integration Notes\n\n';
        body += '- This issue is part of parallel development\n';
        body += '- Check contract file for interface definitions\n';
        body += '- Coordinate with dependent issues before major changes\n';
        
        // Update issue
        execSync(`gh issue edit ${issueNum} --body "${body.replace(/"/g, '\\"')}"`, 
          { stdio: 'inherit' });
        
        console.log(`✅ Updated issue #${issueNum} with dependencies`);
      } else {
        console.log(`⏭️  Issue #${issueNum} already has dependencies`);
      }
      
    } catch (error) {
      console.error(`❌ Error updating issue #${issueNum}:`, error.message);
    }
  }
  
  console.log('\n✅ Dependency update complete!');
}

updateDependencies();