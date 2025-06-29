# NPM Publishing Setup for AG Grid React Components

## Package Names
All packages publish under the `@agrc` scope which is available on npm:
- @agrc/core
- @agrc/adapters
- @agrc/styles
- @agrc/compat

## Publishing Process

### Prerequisites
1. npm account created and logged in: `npm whoami` shows `ryanrozich`
2. 2FA enabled on npm account (requires OTP for publishing)

### Commands
```bash
# Dry run (test)
npm run publish:dry

# Publish beta
npm run publish:beta --otp=123456

# Publish stable
npm run publish:latest --otp=123456
```

### Package Configuration
Each package has:
- `"publishConfig": { "access": "public" }` for scoped packages
- Proper exports configuration for tree-shaking
- Files array to control what gets published
- prepublishOnly script to build before publish

### GitHub Actions
Created `.github/workflows/publish.yml` for automated releases:
- Triggers on GitHub releases or manual dispatch
- Builds all packages with Turbo
- Publishes to npm with proper tags
- Updates release notes

## Current Status
- Core package successfully built (37.3KB)
- All TypeScript compiled
- Ready to publish pending OTP
- First publish will be @agrc/core@2.0.0-beta.1

## Important Notes
- Always use --access public for scoped packages
- OTP required for each publish command
- Use beta tag for testing, latest for stable
- Bundle includes proper TypeScript definitions