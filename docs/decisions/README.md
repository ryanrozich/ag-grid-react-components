# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the AG Grid React Components project.

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architecture decision made for the project, including the context, the decision, and its consequences.

## Current Decisions

### [001 - Single Package Approach](./001-single-package-approach.md)

**Date**: December 2024
**Status**: Accepted
**Summary**: Decision to use a single npm package instead of multiple modular packages, maintaining bundle size benefits through proper ESM exports and tree-shaking.

### [002 - Zod Schema Evaluation](./002-zod-evaluation.md)

**Date**: December 2024
**Status**: Rejected
**Summary**: Evaluation of using Zod for runtime validation. Decision was to continue with manual validation to avoid adding dependencies.

### [003 - Headless UI Evaluation](./003-headless-ui-evaluation.md)

**Date**: December 2024
**Status**: Rejected
**Summary**: Evaluation of using Headless UI for component accessibility. Decision was to maintain manual implementation to keep the library dependency-free.

## ADR Format

Each ADR should follow this format:

1. **Title**: Brief description of the decision
2. **Date**: When the decision was made
3. **Status**: Draft, Proposed, Accepted, Deprecated, or Superseded
4. **Context**: What is the issue that we're seeing that is motivating this decision?
5. **Decision**: What is the change that we're proposing and/or doing?
6. **Consequences**: What becomes easier or more difficult to do because of this change?
7. **Alternatives Considered**: What other options were evaluated?

## Creating a New ADR

1. Copy the template from an existing ADR
2. Number it sequentially (e.g., 004-feature-name.md)
3. Update this README with a summary of the new decision
