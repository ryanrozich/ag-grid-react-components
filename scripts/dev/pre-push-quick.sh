#!/bin/bash

# Quick pre-push script for non-UI changes
# Skips E2E tests for faster feedback

set -e

echo "🚀 Running quick pre-push checks (no E2E)..."
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to handle errors
handle_error() {
    echo -e "${RED}❌ Pre-push checks failed!${NC}"
    echo -e "${YELLOW}Fix the issues above before pushing.${NC}"
    exit 1
}

# Trap errors
trap handle_error ERR

# 1. Run format and lint checks
echo -e "${BLUE}📝 Running format and lint checks...${NC}"
npm run lint:fix
npm run check:whitespace

# 2. Run TypeScript checks
echo -e "${BLUE}🔍 Running TypeScript checks...${NC}"
npm run typecheck

# 3. Run unit tests
echo -e "${BLUE}🧪 Running unit tests...${NC}"
npm run test:unit

# 4. Build check
echo -e "${BLUE}📦 Running build check...${NC}"
npm run build

echo ""
echo -e "${GREEN}✅ Quick pre-push checks passed!${NC}"
echo -e "${YELLOW}⚠️  Warning: E2E tests were skipped!${NC}"
echo -e "${YELLOW}Only use this for non-UI changes. Run 'npm run pre-push' for full checks.${NC}"