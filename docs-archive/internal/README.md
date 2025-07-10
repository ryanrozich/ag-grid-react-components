# Internal Documentation

This directory contains internal documentation, legacy materials, and archived content that is not part of the public-facing documentation.

## Directory Structure

### `/archive`

Contains older documentation and planning documents that may still have historical value:

- Implementation plans
- Debug notes
- Refactoring TODOs
- Testing documentation

### `/legacy`

Contains documentation from previous versions or architectural approaches:

- Bundle optimization plans
- Modularization documentation (from when multi-package was considered)
- Migration guides for older versions
- Code review reports
- Publishing and deployment guides

### `/ryans_notes`

Personal development notes and screenshots from the project development process.

## Important Notes

- These documents are **not** part of the public API documentation
- They may contain outdated or superseded information
- They are retained for historical context and reference
- New feature documentation should go in the main `/docs` folder
- Architectural decisions should go in `/docs/decisions`

## When to Use This Folder

Place documentation here when:

1. It's no longer relevant to current users
2. It documents abandoned approaches
3. It contains internal implementation details
4. It's personal notes or work-in-progress documentation

Do **not** place here:

1. Current API documentation
2. Active architectural decisions
3. User-facing guides
4. Current deployment documentation
