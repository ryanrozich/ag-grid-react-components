#!/bin/bash

echo "🔧 Fixing markdown lint issues..."

# Fix MD040 - Add language specifiers to code blocks
# First, let's find all markdown files
find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" | while read -r file; do
  # Skip if file doesn't exist
  [ ! -f "$file" ] && continue
  
  # Create a temporary file
  temp_file="${file}.tmp"
  
  # Process the file line by line
  in_code_block=false
  while IFS= read -r line; do
    # Check if this is a code block start without language
    if [[ "$line" =~ ^'```'$ ]]; then
      # Default to bash for most code blocks
      echo '```bash' >> "$temp_file"
      in_code_block=true
    elif [[ "$line" =~ ^'```' ]] && [[ ! "$in_code_block" == true ]]; then
      # This already has a language specifier
      echo "$line" >> "$temp_file"
      in_code_block=true
    elif [[ "$line" =~ ^'```' ]] && [[ "$in_code_block" == true ]]; then
      # End of code block
      echo "$line" >> "$temp_file"
      in_code_block=false
    else
      echo "$line" >> "$temp_file"
    fi
  done < "$file"
  
  # Replace the original file
  mv "$temp_file" "$file"
done

# Fix specific files with known issues
echo "📝 Fixing specific markdown issues..."

# Fix .github/CONTRIBUTING.md
if [ -f ".github/CONTRIBUTING.md" ]; then
  sed -i.bak 's/^```$/```bash/g' .github/CONTRIBUTING.md
  rm .github/CONTRIBUTING.md.bak
fi

# Fix .github/PROJECT_SETUP.md
if [ -f ".github/PROJECT_SETUP.md" ]; then
  sed -i.bak 's/^```$/```yaml/g' .github/PROJECT_SETUP.md
  rm .github/PROJECT_SETUP.md.bak
fi

# Fix README.md - line 1095
if [ -f "README.md" ]; then
  # Use awk to fix specific line
  awk 'NR==1095 && /^```$/ {print "```typescript"; next} {print}' README.md > README.md.tmp
  mv README.md.tmp README.md
fi

# Fix docs/github-automation files
for file in docs/github-automation/*.md; do
  [ -f "$file" ] && sed -i.bak 's/^```$/```yaml/g' "$file" && rm "${file}.bak"
done

echo "✅ Markdown fixes applied!"