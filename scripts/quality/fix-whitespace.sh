#!/bin/bash
# Fix whitespace issues in all text files

# Find all text files and remove trailing whitespace
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.css" -o -name "*.yml" -o -name "*.yaml" \) \
  -not -path "./node_modules/*" \
  -not -path "./dist/*" \
  -not -path "./.trunk/*" \
  -not -path "./coverage/*" \
  -not -path "./.git/*" \
  -exec sed -i '' 's/[[:space:]]*$//' {} \;

echo "Whitespace fixed in all text files"