#!/usr/bin/env node

/**
 * Create a new milestone with semantic versioning
 * Usage: node scripts/create-milestone.js <version> <title> [description]
 * Example: node scripts/create-milestone.js v0.1.0 "First Public Release" "Initial stable release with core components"
 */

import { execSync } from 'child_process';

const [,, version, title, description] = process.argv;

if (!version || !title) {
  console.error('Usage: node scripts/create-milestone.js <version> <title> [description]');
  console.error('Example: node scripts/create-milestone.js v0.1.0 "First Public Release"');
  process.exit(1);
}

// Ensure version starts with 'v'
const versionTag = version.startsWith('v') ? version : `v${version}`;

// Parse semantic version
const versionMatch = versionTag.match(/v(\d+)\.(\d+)\.(\d+)(-.*)?/);
if (!versionMatch) {
  console.error('Invalid version format. Use semantic versioning: v0.1.0, v1.0.0, etc.');
  process.exit(1);
}

const [, major, minor, patch, prerelease] = versionMatch;
const versionType = major === '0' && minor === '0' ? 'patch' : 
                   major === '0' ? 'minor' : 
                   'major';

// Build full title
const fullTitle = `${versionTag}: ${title}`;

// Build description
let fullDescription = description || '';

// Add version type guidance
const guidance = {
  patch: '\n\n**Patch Release Guidelines:**\n- Bug fixes only\n- No new features\n- No breaking changes\n- Update patch version (0.0.X)',
  minor: '\n\n**Minor Release Guidelines:**\n- New features allowed\n- Backward compatible changes\n- Bug fixes included\n- Update minor version (0.X.0)',
  major: '\n\n**Major Release Guidelines:**\n- Breaking changes allowed\n- Major new features\n- API changes\n- Update major version (X.0.0)'
};

fullDescription += guidance[versionType];

// Add checklist
fullDescription += '\n\n**Release Checklist:**\n';
fullDescription += '- [ ] All issues/PRs completed\n';
fullDescription += '- [ ] Tests passing\n';
fullDescription += '- [ ] Documentation updated\n';
fullDescription += '- [ ] CHANGELOG.md updated\n';
fullDescription += '- [ ] Version bumped in package.json\n';
fullDescription += '- [ ] Release notes drafted\n';

try {
  // Get repo info
  const repoInfo = execSync('gh repo view --json nameWithOwner', { encoding: 'utf8' });
  const { nameWithOwner } = JSON.parse(repoInfo);
  const [owner, repo] = nameWithOwner.split('/');
  
  // Create milestone using API
  const milestoneData = {
    title: fullTitle,
    description: fullDescription
  };
  
  const output = execSync(
    `gh api repos/${owner}/${repo}/milestones --method POST --field title="${fullTitle}" --field description="${fullDescription}"`,
    { encoding: 'utf8' }
  );
  
  const createdMilestone = JSON.parse(output);
  
  console.log(`✅ Created milestone: ${fullTitle}`);
  console.log(`   Version: ${versionTag} (${versionType} release)`);
  console.log(`   Number: #${createdMilestone.number}`);
  console.log(`\n💡 To assign issues: gh issue edit <number> --milestone ${createdMilestone.number}`);
  console.log(`   To view: ${createdMilestone.html_url}`);
  
} catch (error) {
  console.error('Failed to create milestone:', error.message);
  process.exit(1);
}