# Headless UI Migration Plan: RC3 Strategy

## Overview

This document outlines the plan to create release/v0.2.0-rc3 based on the headless UI refactor, then selectively port valuable features from RC2.

## Current Situation

- **feat/headless-refactor branch**: Complete rewrite of components using headless UI pattern
- **Working commit**: 5d6af0c (stable, no infinite loop, filters working)
- **release/v0.2.0-rc2**: Has additional features but lacks the headless refactor
- **Problem**: The branches diverged significantly, making direct merging problematic

## Strategy

Use the headless refactor as the foundation (RC3) and selectively port features from RC2.

## Step-by-Step Plan

### Phase 1: Create RC3 Branch

1. [x] Checkout the stable headless commit (5d6af0c)
2. [x] Create new branch: `release/v0.2.0-rc3`
3. [ ] Push to origin
4. [x] Update version in package.json to 0.2.0-rc3

### Phase 2: Analyze RC2 Features

1. [ ] Generate diff between RC2 and headless refactor
2. [ ] Identify features unique to RC2:
   - [ ] CategorySelector component
   - [ ] Export functionality for filter presets
   - [ ] Scripts directory reorganization
   - [ ] Bug fixes not in headless refactor
   - [ ] Documentation updates
   - [ ] GitHub Actions improvements

### Phase 3: Prioritize Features to Port

1. [ ] Classify each RC2 feature:

   - **Must Have**: Critical functionality
   - **Nice to Have**: Improvements that add value
   - **Skip**: Superseded by headless refactor

2. [ ] For each "Must Have" feature:
   - [ ] Determine if it needs headless conversion
   - [ ] Estimate effort required
   - [ ] Create implementation plan

### Phase 4: Port Features to RC3

1. [ ] For each feature to port:
   - [ ] Create feature branch from RC3
   - [ ] Implement/convert to headless pattern
   - [ ] Test thoroughly
   - [ ] Create PR to RC3
   - [ ] Merge when ready

### Phase 5: Testing & Validation

1. [ ] Comprehensive testing of RC3
2. [ ] Verify all headless components work
3. [ ] Ensure no infinite loops
4. [ ] Validate ported features

## Features Analysis

### From RC2 Not in Headless Refactor

1. **CategorySelector Component** (NEW)

   - Status: New component added in RC2
   - Files: `src/components/CategorySelector/`
   - Action: Convert to headless pattern or skip if redundant
   - Priority: Medium

2. **FilterPresetManagerV2** (ENHANCED)

   - Status: Version 2 with grid-specific isolation
   - Features: Export functionality, category management
   - Files: `src/components/FilterPresetManagerV2/`
   - Action: Evaluate if needed with headless SavedViewsDropdown
   - Priority: Low (might be superseded)

3. **FilterPresets Components** (NEW)

   - Status: Complete preset system
   - Components: PresetManager, PresetSelector, SavePresetDialog, ShareButton
   - Files: `src/components/FilterPresets/`
   - Action: Evaluate overlap with SavedViewsDropdown
   - Priority: Low (likely superseded)

4. **Scripts Directory Reorganization**

   - Status: Cleaned up and reorganized in RC2
   - Change: Scripts moved to subdirectories (dev/, quality/, build/, etc.)
   - Action: Apply same organization to RC3
   - Priority: Low (housekeeping)

5. **GitHub Actions Improvements**

   - New workflows: bot-ci-integration, deploy-preview, rc-integration-deploy
   - Action: Port valuable workflows
   - Priority: Medium

6. **Bug Fixes from RC2**

   - State reset issue in DateFilter (#69)
   - Grand total row overlapping with date filter (#59)
   - Various infinite loop fixes
   - Action: Verify these are addressed in headless refactor
   - Priority: High (if still applicable)

7. **StackBlitz Examples**

   - Status: Infrastructure added for interactive examples
   - Action: Port to RC3
   - Priority: Medium (good for documentation)

8. **API Enhancements**
   - Simple data generator for demos
   - Test API utilities
   - Action: Port if needed
   - Priority: Low

## Technical Considerations

### Headless Pattern Requirements

When porting features from RC2:

1. Separate logic from presentation
2. Use compound component pattern
3. Implement proper TypeScript interfaces
4. Follow established headless conventions

### Potential Challenges

1. **State Management**: Ensure consistent patterns
2. **AG Grid Integration**: Maintain compatibility
3. **Type Safety**: Keep strict TypeScript compliance
4. **Testing**: Update tests for headless pattern

## Success Criteria

- [ ] All components follow headless pattern
- [ ] No infinite loops or performance issues
- [ ] Date filters work correctly
- [ ] All valuable RC2 features are ported
- [ ] Tests pass
- [ ] Documentation is updated

## Next Immediate Steps

1. Create RC3 branch from commit 5d6af0c
2. Generate detailed comparison between RC2 and headless refactor
3. Update this document with findings
4. Begin selective feature porting

## Notes

- The headless refactor is the foundation - we build on top of it
- Each ported feature must conform to headless patterns
- Document any decisions about what NOT to port and why

---

Last Updated: 2024-01-15
Status: Planning Phase
