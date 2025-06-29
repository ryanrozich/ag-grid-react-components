# Scripts Directory

This directory contains utility scripts for development, testing, and deployment.

## Scripts Overview

### Code Quality Scripts

- **`check-whitespace.sh`** - Checks for trailing whitespace in source files
- **`fix-whitespace.sh`** - Automatically removes trailing whitespace from source files

### Testing Scripts

- **`validate-demo.js`** - Validates that the demo application runs correctly
- **`test-filter-click.js`** - Tests filter clicking functionality in the demo
- **`test-ultra-minimal.js`** - Minimal test setup for debugging
- **`thorough-demo-check.js`** - Comprehensive demo validation
- **`diagnose-404.js`** - Diagnoses 404 errors in the demo
- **`test-code-block-fonts.js`** - Tests font loading in code blocks
- **`check-fonts.js`** - Verifies font files are loaded correctly

### Build & Deployment Scripts

- **`generate-og-image.js`** - Generates Open Graph social media preview images
- **`publish-local.sh`** - Publishes packages to local npm registry for testing
- **`run-tsx.js`** - Helper script to run TypeScript files directly
- **`loader.js`** - Module loader utility

## Usage

Most scripts can be run via npm scripts defined in package.json:

```bash
# Check for whitespace issues
npm run check:whitespace

# Fix whitespace issues
npm run fix:whitespace

# Validate demo
npm run test:browser
```

For direct execution:
```bash
# Shell scripts
./scripts/check-whitespace.sh

# Node scripts
node scripts/validate-demo.js
```