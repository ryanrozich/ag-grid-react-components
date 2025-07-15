#!/bin/bash

# Fix trailing whitespace in all tracked files
echo "Fixing trailing whitespace in all tracked files..."

# Get all tracked files
files=$(git ls-files)

# Track how many files we fixed
fixed_count=0

# Fix each file
for file in $files; do
  if [[ -f "$file" ]]; then
    # Create a temporary backup
    cp "$file" "$file.bak"

    # Skip binary files
    if file -b "$file" | grep -q "text"; then
      # Remove trailing whitespace
      # This works on macOS and Linux
      if sed -i '' 's/[[:space:]]*$//' "$file" 2>/dev/null; then
        # Check if file actually changed
        if ! cmp -s "$file" "$file.bak"; then
          echo "✅ Fixed: $file"
          ((fixed_count++))
        fi
      else
        # Fallback for systems where sed -i '' doesn't work
        sed 's/[[:space:]]*$//' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
        if ! cmp -s "$file" "$file.bak"; then
          echo "✅ Fixed: $file"
          ((fixed_count++))
        fi
      fi
    fi

    # Remove backup
    rm -f "$file.bak"
  fi
done

if [ $fixed_count -gt 0 ]; then
  echo ""
  echo "✅ Fixed whitespace issues in $fixed_count files!"
else
  echo "✅ No whitespace issues found!"
fi