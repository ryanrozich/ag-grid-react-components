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
3. [x] Push to origin
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
   - Action: **SKIP** - Already recreated in headless refactor
   - Priority: N/A

2. **FilterPresetManagerV2** (ENHANCED)

   - Status: Version 2 with grid-specific isolation
   - Features: Export functionality, category management
   - Files: `src/components/FilterPresetManagerV2/`
   - Action: **SKIP** - Superseded by headless SavedViewsDropdown
   - Priority: N/A

3. **FilterPresets Components** (NEW)

   - Status: Complete preset system
   - Components: PresetManager, PresetSelector, SavePresetDialog, ShareButton
   - Files: `src/components/FilterPresets/`
   - Action: **SKIP** - Superseded by headless implementation
   - Priority: N/A

4. **Scripts Directory Reorganization**

   - Status: Cleaned up and reorganized in RC2
   - Change: Scripts moved to subdirectories (dev/, quality/, build/, etc.)
   - Action: **PORT** - Easy to implement, good housekeeping
   - Priority: Medium

5. **GitHub Actions Improvements**

   - New workflows: bot-ci-integration, deploy-preview, rc-integration-deploy
   - Action: **PORT** - Valuable for CI/CD
   - Priority: Medium

6. **Bug Fixes from RC2**

   - State reset issue in DateFilter (#69)
   - Grand total row overlapping with date filter (#59)
   - Various infinite loop fixes
   - Action: **ANALYZE** - Check if already fixed in headless, port if still relevant
   - Priority: High

7. **StackBlitz Examples**

   - Status: Infrastructure added for interactive examples
   - Action: **PORT** - User priority, wants to work on this
   - Priority: High

8. **API Enhancements**
   - Simple data generator for demos
   - Test API utilities
   - Action: **PORT** - No conflicts with headless refactor
   - Priority: Medium

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

1. ~~Create RC3 branch from commit 5d6af0c~~ ✅
2. ~~Update migration plan with user feedback~~ ✅
3. Port features in priority order:
   - First: StackBlitz infrastructure (user priority)
   - Second: Scripts directory reorganization
   - Third: GitHub Actions improvements
   - Fourth: API enhancements
   - Fifth: Analyze and port relevant bug fixes

## Independent Execution Plan

Based on user feedback, proceed with the following:

### Priority 1: StackBlitz Examples (High)

- Port the StackBlitz infrastructure from RC2
- Set up example configurations
- Ensure no conflicts with current headless implementation

### Priority 2: Scripts Directory Reorganization (Medium)

- Analyze RC2's scripts organization
- Apply same structure to RC3
- Update package.json scripts as needed

### Priority 3: GitHub Actions Improvements (Medium)

- Port bot-ci-integration workflow
- Port deploy-preview workflow
- Port rc-integration-deploy workflow

### Priority 4: API Enhancements (Medium)

- Port simple data generator
- Port test API utilities
- Ensure compatibility with demo

### Priority 5: Bug Fix Analysis (High)

- Create detailed list of RC2 bug fixes
- Test each scenario in current branch
- Port only fixes that are still relevant

## Notes

- The headless refactor is the foundation - we build on top of it
- Each ported feature must conform to headless patterns
- Document any decisions about what NOT to port and why

---

Last Updated: 2025-01-15
Status: Active Development - RC3 branch created, ready for feature porting
