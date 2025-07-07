#!/bin/bash

# Copy Examples Script
# 
# This script helps copy example configurations to your project.
# Usage: ./copy-examples.sh [all|config|testing|linting|labels|templates]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Target directory (parent of examples)
TARGET_DIR="$(dirname "$SCRIPT_DIR")"

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to copy with confirmation
copy_with_confirm() {
    local src=$1
    local dest=$2
    
    if [ -f "$dest" ]; then
        print_warn "File exists: $dest"
        read -p "Overwrite? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipped: $dest"
            return
        fi
    fi
    
    mkdir -p "$(dirname "$dest")"
    cp "$src" "$dest"
    print_info "Copied: $dest"
}

# Function to copy configuration files
copy_config() {
    print_info "Copying MADF configuration..."
    copy_with_confirm "$SCRIPT_DIR/madf.config.ts" "$TARGET_DIR/madf.config.ts"
    copy_with_confirm "$SCRIPT_DIR/CLAUDE.md" "$TARGET_DIR/CLAUDE.md"
}

# Function to copy testing configuration
copy_testing() {
    print_info "Copying testing configuration..."
    copy_with_confirm "$SCRIPT_DIR/testing/vitest.config.ts" "$TARGET_DIR/vitest.config.ts"
    copy_with_confirm "$SCRIPT_DIR/testing/playwright.config.ts" "$TARGET_DIR/playwright.config.ts"
    copy_with_confirm "$SCRIPT_DIR/testing/test-setup.ts" "$TARGET_DIR/tests/setup.ts"
    copy_with_confirm "$SCRIPT_DIR/testing/test-utils.tsx" "$TARGET_DIR/tests/utils.tsx"
}

# Function to copy linting configuration
copy_linting() {
    print_info "Copying linting configuration..."
    
    # Create .trunk directory if it doesn't exist
    mkdir -p "$TARGET_DIR/.trunk"
    
    copy_with_confirm "$SCRIPT_DIR/linting/trunk.yaml" "$TARGET_DIR/.trunk/trunk.yaml"
    copy_with_confirm "$SCRIPT_DIR/linting/.eslintrc.js" "$TARGET_DIR/.eslintrc.js"
    copy_with_confirm "$SCRIPT_DIR/linting/.prettierrc" "$TARGET_DIR/.prettierrc"
}

# Function to copy GitHub labels
copy_labels() {
    print_info "Copying GitHub configuration..."
    
    # Create .github directories
    mkdir -p "$TARGET_DIR/.github/ISSUE_TEMPLATE"
    
    copy_with_confirm "$SCRIPT_DIR/github/labels.json" "$TARGET_DIR/.github/labels.json"
    copy_with_confirm "$SCRIPT_DIR/github/issue-templates/bug_report.md" \
        "$TARGET_DIR/.github/ISSUE_TEMPLATE/bug_report.md"
    copy_with_confirm "$SCRIPT_DIR/github/issue-templates/feature_request.md" \
        "$TARGET_DIR/.github/ISSUE_TEMPLATE/feature_request.md"
    copy_with_confirm "$SCRIPT_DIR/github/pull_request_template.md" \
        "$TARGET_DIR/.github/pull_request_template.md"
}

# Function to copy component templates
copy_templates() {
    print_info "Copying component templates..."
    
    local template_dir="$TARGET_DIR/.madf/templates"
    mkdir -p "$template_dir"
    
    # Copy entire component template
    cp -r "$SCRIPT_DIR/templates/Component" "$template_dir/"
    print_info "Copied component template to $template_dir/Component"
    
    print_info ""
    print_info "To use the component template:"
    print_info "  cp -r $template_dir/Component src/components/YourComponentName"
    print_info "  Then rename 'ComponentName' to your actual component name"
}

# Function to copy all configurations
copy_all() {
    print_info "Copying all example configurations..."
    copy_config
    copy_testing
    copy_linting
    copy_labels
    copy_templates
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  all        Copy all example configurations"
    echo "  config     Copy MADF configuration files"
    echo "  testing    Copy testing configuration"
    echo "  linting    Copy linting configuration"
    echo "  labels     Copy GitHub labels and templates"
    echo "  templates  Copy component templates"
    echo ""
    echo "Example:"
    echo "  $0 all"
    echo "  $0 testing"
}

# Main script logic
case "${1:-}" in
    all)
        copy_all
        ;;
    config)
        copy_config
        ;;
    testing)
        copy_testing
        ;;
    linting)
        copy_linting
        ;;
    labels)
        copy_labels
        ;;
    templates)
        copy_templates
        ;;
    *)
        show_usage
        exit 1
        ;;
esac

print_info ""
print_info "Done! Remember to:"
print_info "  1. Update copied files with your project-specific values"
print_info "  2. Look for CUSTOMIZE comments in the files"
print_info "  3. Run 'npm install' if you added new dependencies"
print_info "  4. Commit the changes to your repository"