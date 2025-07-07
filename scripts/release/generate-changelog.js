#!/usr/bin/env node

/**
 * Generate changelog from git commits and GitHub data
 * Usage: node generate-changelog.js --from=<tag> --to=<tag> --version=<version>
 */

import { execSync  } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ensureProjectRoot  } from '../utils/ensure-project-root.mjs';
// Ensure we're in the project root
ensureProjectRoot('generate-changelog.js');


// Parse command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key.replace('--', '')] = value;
  return acc;
}, {});

const {
  from = '',
  to = 'HEAD',
  version = 'Unreleased',
  rc = false,
  milestone = ''
} = args;

console.log(`📝 Generating changelog for ${version}...`);

/**
 * Get commits between two refs
 */
function getCommits(fromRef, toRef) {
  try {
    const range = fromRef ? `${fromRef}..${toRef}` : toRef;
    const format = '%H|%s|%b|%an|%ae';
    
    const output = execSync(
      `git log ${range} --format="${format}" --no-merges`,
      { encoding: 'utf8' }
    );

    return output
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [hash, subject, body, authorName, authorEmail] = line.split('|');
        return { hash, subject, body, authorName, authorEmail };
      });
  } catch (error) {
    console.error('Error getting commits:', error.message);
    return [];
  }
}

/**
 * Get PRs merged in the commit range
 */
function getMergedPRs(fromRef, toRef) {
  try {
    const range = fromRef ? `${fromRef}..${toRef}` : toRef;
    
    // Get merge commits
    const mergeCommits = execSync(
      `git log ${range} --format="%H %s" --grep="Merge pull request" --grep="(#"`,
      { encoding: 'utf8' }
    );

    const prs = [];
    const prPattern = /#(\d+)/g;
    
    mergeCommits.split('\n').forEach(line => {
      const matches = line.matchAll(prPattern);
      for (const match of matches) {
        prs.push(parseInt(match[1]));
      }
    });

    return [...new Set(prs)]; // Remove duplicates
  } catch (error) {
    return [];
  }
}

/**
 * Get PR details from GitHub
 */
async function getPRDetails(prNumbers) {
  const details = [];
  
  for (const prNumber of prNumbers) {
    try {
      const pr = JSON.parse(
        execSync(`gh pr view ${prNumber} --json number,title,author,labels,milestone`, {
          encoding: 'utf8'
        })
      );
      details.push(pr);
    } catch (error) {
      console.warn(`Could not fetch details for PR #${prNumber}`);
    }
  }
  
  return details;
}

/**
 * Categorize commits by type
 */
function categorizeCommits(commits) {
  const categories = {
    features: [],
    fixes: [],
    performance: [],
    refactor: [],
    docs: [],
    tests: [],
    chore: [],
    other: []
  };

  commits.forEach(commit => {
    const { subject } = commit;
    const lowerSubject = subject.toLowerCase();

    if (lowerSubject.startsWith('feat:') || lowerSubject.startsWith('feat(')) {
      categories.features.push(commit);
    } else if (lowerSubject.startsWith('fix:') || lowerSubject.startsWith('fix(')) {
      categories.fixes.push(commit);
    } else if (lowerSubject.startsWith('perf:') || lowerSubject.startsWith('perf(')) {
      categories.performance.push(commit);
    } else if (lowerSubject.startsWith('refactor:') || lowerSubject.startsWith('refactor(')) {
      categories.refactor.push(commit);
    } else if (lowerSubject.startsWith('docs:') || lowerSubject.startsWith('docs(')) {
      categories.docs.push(commit);
    } else if (lowerSubject.startsWith('test:') || lowerSubject.startsWith('test(')) {
      categories.tests.push(commit);
    } else if (lowerSubject.startsWith('chore:') || lowerSubject.startsWith('chore(')) {
      categories.chore.push(commit);
    } else {
      categories.other.push(commit);
    }
  });

  return categories;
}

/**
 * Get milestone details
 */
async function getMilestoneDetails(milestoneNumber) {
  if (!milestoneNumber) return null;
  
  try {
    const milestone = JSON.parse(
      execSync(`gh api repos/{owner}/{repo}/milestones/${milestoneNumber}`, {
        encoding: 'utf8'
      })
    );
    
    // Get issues in milestone
    const issues = JSON.parse(
      execSync(`gh issue list --milestone "${milestone.title}" --state all --json number,title,state,labels --limit 100`, {
        encoding: 'utf8'
      })
    );
    
    return { milestone, issues };
  } catch (error) {
    console.warn(`Could not fetch milestone details`);
    return null;
  }
}

/**
 * Format commit for changelog
 */
function formatCommit(commit, prDetails = []) {
  const { hash, subject, authorName } = commit;
  const shortHash = hash.substring(0, 7);
  
  // Check if this commit is associated with a PR
  const pr = prDetails.find(pr => 
    subject.includes(`#${pr.number}`) || 
    subject.includes(`(#${pr.number})`)
  );
  
  let entry = `- ${subject}`;
  
  if (pr) {
    entry += ` ([#${pr.number}](../../pull/${pr.number}))`;
  }
  
  entry += ` (${shortHash})`;
  
  // Add author if not a bot
  if (!authorName.includes('bot')) {
    entry += ` - @${authorName}`;
  }
  
  return entry;
}

/**
 * Generate changelog content
 */
async function generateChangelog() {
  // Get commits
  const commits = getCommits(from, to);
  console.log(`Found ${commits.length} commits`);

  // Get PR details
  const prNumbers = getMergedPRs(from, to);
  const prDetails = await getPRDetails(prNumbers);
  console.log(`Found ${prDetails.length} merged PRs`);

  // Get milestone details
  const milestoneDetails = await getMilestoneDetails(milestone);

  // Categorize commits
  const categories = categorizeCommits(commits);

  // Build changelog
  let changelog = '';

  // Header
  if (rc) {
    changelog += `## 🚀 Release Candidate ${version}\n\n`;
    changelog += `This is a pre-release version for testing.\n\n`;
  } else {
    changelog += `## ${version}\n\n`;
  }

  // Date
  changelog += `_${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}_\n\n`;

  // Milestone summary if available
  if (milestoneDetails) {
    const { milestone, issues } = milestoneDetails;
    const completed = issues.filter(i => i.state === 'CLOSED').length;
    const total = issues.length;
    
    changelog += `### 📊 Milestone: ${milestone.title}\n\n`;
    changelog += `Progress: ${completed}/${total} issues completed\n\n`;
  }

  // Breaking changes (if any)
  const breakingChanges = commits.filter(c => 
    c.body.toLowerCase().includes('breaking change') ||
    c.subject.includes('!')
  );
  
  if (breakingChanges.length > 0) {
    changelog += `### ⚠️ Breaking Changes\n\n`;
    breakingChanges.forEach(commit => {
      changelog += formatCommit(commit, prDetails) + '\n';
    });
    changelog += '\n';
  }

  // Features
  if (categories.features.length > 0) {
    changelog += `### ✨ Features\n\n`;
    categories.features.forEach(commit => {
      changelog += formatCommit(commit, prDetails) + '\n';
    });
    changelog += '\n';
  }

  // Bug fixes
  if (categories.fixes.length > 0) {
    changelog += `### 🐛 Bug Fixes\n\n`;
    categories.fixes.forEach(commit => {
      changelog += formatCommit(commit, prDetails) + '\n';
    });
    changelog += '\n';
  }

  // Performance improvements
  if (categories.performance.length > 0) {
    changelog += `### ⚡ Performance Improvements\n\n`;
    categories.performance.forEach(commit => {
      changelog += formatCommit(commit, prDetails) + '\n';
    });
    changelog += '\n';
  }

  // Other changes (if not too many)
  const otherChanges = [
    ...categories.refactor,
    ...categories.docs,
    ...categories.tests,
    ...categories.chore
  ];
  
  if (otherChanges.length > 0 && otherChanges.length <= 10) {
    changelog += `### 🔧 Other Changes\n\n`;
    otherChanges.forEach(commit => {
      changelog += formatCommit(commit, prDetails) + '\n';
    });
    changelog += '\n';
  }

  // Contributors
  const contributors = new Set();
  commits.forEach(commit => {
    if (!commit.authorEmail.includes('bot')) {
      contributors.add(commit.authorName);
    }
  });
  
  if (contributors.size > 0) {
    changelog += `### 👥 Contributors\n\n`;
    changelog += `Thanks to: ${Array.from(contributors).join(', ')}\n\n`;
  }

  // Stats
  changelog += `### 📈 Stats\n\n`;
  changelog += `- ${commits.length} commits\n`;
  changelog += `- ${prDetails.length} pull requests\n`;
  changelog += `- ${contributors.size} contributors\n`;
  
  if (categories.features.length > 0) {
    changelog += `- ${categories.features.length} new features\n`;
  }
  if (categories.fixes.length > 0) {
    changelog += `- ${categories.fixes.length} bug fixes\n`;
  }

  return changelog;
}

// Generate and output changelog
generateChangelog()
  .then(changelog => {
    console.log(changelog);
    
    // Also save to file if requested
    if (args.output) {
      fs.writeFileSync(args.output, changelog);
      console.error(`\n✅ Changelog saved to ${args.output}`);
    }
  })
  .catch(error => {
    console.error('Error generating changelog:', error);
    process.exit(1);
  });