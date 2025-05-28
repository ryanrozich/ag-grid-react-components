# Just Command Quick Reference

## Most Common Commands

```bash
just dev          # Start development server
just test         # Run tests
just pre-commit   # Format + quality checks before commit
```

## Development Workflow

```bash
# Morning startup
just update-deps  # Update dependencies
just dev-safe     # Quality checks + start dev

# During development
just test-watch   # Keep tests running
just check        # Check for issues
just fmt          # Fix formatting

# Before committing
just pre-commit   # Full quality check
```

## Helpful Commands

```bash
just                      # Show all commands
just new-component Button # Create component boilerplate
just show-architecture    # View component structure
just bundle-size          # Check build size
just test-file Button     # Test specific file
```

## Aliases

```bash
just qa    # Same as pre-commit
just ci    # Quality + build
```

## First Time Setup

```bash
brew install just    # Install just (macOS)
just install         # Install npm dependencies
just trunk-init      # Initialize Trunk
```
