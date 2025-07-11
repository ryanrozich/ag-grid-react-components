#!/bin/bash

# Script for local testing of npm publishing
# This does a dry run to verify everything is set up correctly

set -e

echo "🔍 Checking npm login status..."
npm whoami || (echo "❌ Not logged in to npm. Run 'npm login' first." && exit 1)

echo "📦 Building all packages..."
npx turbo run build

echo "🧪 Running tests..."
npm run test:unit

echo "✅ Running type checks..."
npm run typecheck

echo "📋 Package versions:"
echo "Core: $(cat packages/core/package.json | grep '"version"' | cut -d'"' -f4)"
echo "Adapters: $(cat packages/adapters/package.json | grep '"version"' | cut -d'"' -f4)"
echo "Styles: $(cat packages/styles/package.json | grep '"version"' | cut -d'"' -f4)"
echo "Compat: $(cat packages/compat/package.json | grep '"version"' | cut -d'"' -f4)"

echo ""
echo "📝 Dry run results:"
echo "-------------------"

# Dry run for each package
for package in core adapters styles compat; do
  echo ""
  echo "Package: @agrc/$package"
  cd packages/$package
  npm pack --dry-run
  cd ../..
done

echo ""
echo "✅ Dry run complete!"
echo ""
echo "To publish for real, run:"
echo "  npm run publish:beta    # Publish with beta tag"
echo "  npm run publish:latest  # Publish as latest"
echo ""
echo "Or publish manually:"
echo "  cd packages/core && npm publish --access public --tag beta"