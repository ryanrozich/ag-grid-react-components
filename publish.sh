#!/bin/bash

echo "Publishing ag-grid-react-components v0.1.0 to NPM..."

# Check if logged in
if ! npm whoami &>/dev/null; then
    echo "Error: Not logged in to NPM. Please run 'npm login' first."
    exit 1
fi

# Skip tests and build since they already ran
echo "Skipping tests and build (already completed)..."

# Publish with public access
echo "Publishing to NPM registry..."
npm publish --access=public --no-git-tag-version

echo "Done!"