#!/bin/bash

# Check for trailing whitespace in all tracked files
echo "Checking for trailing whitespace..."

# Get all tracked files
files=$(git ls-files)

# Track if we found any issues
found_issues=false

# Check each file for trailing whitespace
for file in $files; do
  if [[ -f "$file" ]]; then
    # Skip binary files
    if file -b "$file" | grep -q "text"; then
      # Check for trailing whitespace (spaces or tabs at end of line)
      if grep -l '[[:space:]]$' "$file" > /dev/null 2>&1; then
        echo "❌ Trailing whitespace found in: $file"
        # Show the lines with issues
        grep -n '[[:space:]]$' "$file" | head -5
        found_issues=true
      fi

      # Check for blank lines with whitespace
      if grep -l '^[[:space:]]\+$' "$file" > /dev/null 2>&1; then
        echo "❌ Blank lines with whitespace found in: $file"
        grep -n '^[[:space:]]\+$' "$file" | head -5
        found_issues=true
      fi
    fi
  fi
done

if [ "$found_issues" = true ]; then
  echo ""
  echo "❌ Whitespace issues found! Please fix them before committing."
  echo "💡 Tip: You can fix them automatically with:"
  echo "   npm run fix:whitespace"
  exit 1
else
  echo "✅ No whitespace issues found!"
  exit 0
fi