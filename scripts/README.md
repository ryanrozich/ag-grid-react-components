# Scripts Directory

This directory contains scripts essential for the development and maintenance of ag-grid-react-components.

## Directory Structure

```
scripts/
├── dev/                    # Development utilities
├── quality/               # Code quality tools
├── build/                 # Build and release utilities
├── release/               # Release management
└── utils/                 # Shared utilities
```

## Scripts by Category

### Development Scripts (`/dev`)

| Script | Purpose | Usage |
|--------|---------|-------|
| `pre-push.sh` | Comprehensive pre-push validation | Automatically run by git pre-push hook |
| `pre-push-quick.sh` | Quick pre-push validation (skips tests) | `npm run pre-push:quick` |
| `validate-demo.js` | Validates demo functionality | `npm run test:browser` |
| `thorough-demo-check.js` | Comprehensive demo validation | `npm run test:thorough` |
| `test-filter-click.js` | Tests filter click functionality | `npm run test:filter-click` |

### Code Quality Scripts (`/quality`)

| Script | Purpose | Usage |
|--------|---------|-------|
| `check-whitespace.sh` | Checks for whitespace issues | `npm run check:whitespace` |
| `fix-whitespace.sh` | Fixes whitespace issues | `npm run fix:whitespace` |
| `check-codeql.js` | Validates CodeQL configuration | `npm run check:codeql` |
| `check-fonts.js` | Checks font usage in code blocks | Direct execution |
| `test-code-block-fonts.js` | Tests font rendering in code blocks | Direct execution |

### Build Scripts (`/build`)

| Script | Purpose | Usage |
|--------|---------|-------|
| `generate-version-info.js` | Generates version info for demos | Automatically run during build |
| `generate-og-image.js` | Generates Open Graph images | Direct execution |
| `publish-local.sh` | Publishes package locally for testing | Direct execution |

### Release Scripts (`/release`)

| Script | Purpose | Usage |
|--------|---------|-------|
| `bump-version.js` | Bumps package version | Part of release workflow |
| `generate-changelog.js` | Generates changelog entries | Part of release workflow |
| `prepare-release.js` | Prepares release artifacts | Part of release workflow |

### Utility Scripts (`/utils`)

| Script | Purpose | Usage |
|--------|---------|-------|
| `run-tsx.js` | Runs TypeScript files directly | `npm run run-tsx <file>` |
| `loader.js` | TypeScript loader for Node.js | Used by run-tsx.js |
| `ensure-project-root.mjs` | Ensures scripts run from project root | Imported by other scripts |

## Script Requirements

### Environment Variables

Most scripts don't require environment variables, but some GitHub-related scripts (now archived) required:
- `GITHUB_TOKEN`: For GitHub API access
- `NODE_ENV`: Development/production environment

### Dependencies

Scripts assume the following tools are installed:
- Node.js (v18+)
- npm (v10+)
- Git
- GitHub CLI (`gh`) for release scripts

## Best Practices

1. **Always run scripts from project root**: Most scripts use `ensure-project-root.mjs` to enforce this
2. **Use npm scripts when available**: Prefer `npm run <script>` over direct execution
3. **Check script headers**: Each script has a header comment explaining its purpose
4. **Test locally first**: Especially for scripts that modify files or interact with GitHub

## Archived Scripts

Many scripts have been moved to `scripts-archive/` (git-ignored) for historical reference:

- **Bot Automation** (`scripts-archive/bot-automation/`): GitHub project sync, bot workflows
- **One-Time Scripts** (`scripts-archive/one-time/`): Setup scripts, migrations, fixes

These scripts are preserved but not actively maintained. If you need functionality from an archived script, consider if it should be restored and updated.

## Adding New Scripts

When adding new scripts:

1. Place in the appropriate subdirectory
2. Add a header comment with purpose and usage
3. Update this README
4. Consider if it needs to be added to package.json
5. Use `ensure-project-root.mjs` for scripts that modify files
6. Follow existing patterns for error handling and logging