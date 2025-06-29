# Publishing Checklist for AG Grid React Components

## Pre-Publishing Setup

### 1. NPM Account Setup

- [ ] Create npm account at https://www.npmjs.com/signup
- [ ] Login: `npm login`
- [ ] Enable 2FA for publishing (recommended)

### 2. Package Naming Strategy

Since `ag-grid-react-components` is already taken on npm, consider:

- `@ryanrozich/ag-grid-react-components` (scoped package)
- `ag-grid-react-toolkit`
- `ag-grid-react-extensions`
- `agrc` (short, memorable)

### 3. Scope Configuration

For the modular approach, use a scope:

```bash
# Option 1: Personal scope
@ryanrozich/ag-grid-react-components

# Option 2: Organization scope (create org on npm)
@agrc/core
@agrc/adapters
@agrc/styles
```

## Implementation Steps

### Phase 1: Monorepo Setup

```bash
# 1. Create workspace structure
mkdir -p packages/{core,adapters,styles,compat}

# 2. Update root package.json
{
  "name": "@agrc/workspace",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}

# 3. Install workspace tools
npm install -D turbo
```

### Phase 2: Package Configuration

Each package needs:

1. Proper `package.json` with:

   - name, version, description
   - main, module, types entries
   - peerDependencies
   - files array
   - repository, homepage, bugs URLs

2. Build configuration
3. TypeScript configuration
4. README.md

### Phase 3: Publishing Configuration

```json
// packages/core/package.json
{
  "name": "@agrc/core",
  "version": "2.0.0-beta.1",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

### Phase 4: Automated Publishing

GitHub Actions workflow for:

- Build all packages
- Run tests
- Publish to npm on release
- Update changelog

## Publishing Commands

### Manual Publishing

```bash
# First time setup
npm login

# Publish a package
cd packages/core
npm publish --access public

# Publish with beta tag
npm publish --tag beta
```

### Automated Publishing

```bash
# Using changeset
npx changeset
npx changeset version
npx changeset publish
```

## Package Structure

```
ag-grid-react-components/
├── packages/
│   ├── core/                 # @agrc/core
│   │   ├── src/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   ├── adapters/            # @agrc/adapters
│   │   ├── react-datepicker/
│   │   ├── compression/
│   │   └── package.json
│   ├── styles/              # @agrc/styles
│   │   ├── core.css
│   │   └── package.json
│   └── compat/              # @agrc/compat (v1 compatibility)
│       └── package.json
├── package.json             # Workspace root
├── turbo.json              # Build orchestration
└── .changeset/             # Version management
```

## Version Strategy

- `2.0.0-beta.x`: Beta releases for testing
- `2.0.0-rc.x`: Release candidates
- `2.0.0`: Stable release
- Use semantic versioning strictly

## Documentation Requirements

1. **README.md** for each package
2. **Migration guide** in root
3. **API documentation**
4. **Examples repository**
5. **Changelog** maintenance

## Quality Gates

Before publishing:

- [ ] All tests pass
- [ ] Bundle size verified
- [ ] TypeScript builds clean
- [ ] Documentation updated
- [ ] Examples work
- [ ] Breaking changes documented

## Marketing & Announcement

1. **GitHub Release** with highlights
2. **Twitter/X announcement**
3. **Blog post** (optional)
4. **AG Grid community forum**
5. **Reddit** (r/reactjs, r/javascript)
6. **Dev.to article**

## Legal Considerations

- [ ] License file (MIT) in each package
- [ ] Copyright headers
- [ ] No proprietary code
- [ ] Dependencies properly licensed

## Recommended Timeline

1. **Week 1-2**: Implement core packages
2. **Week 3**: Beta release for feedback
3. **Week 4**: Fix issues, improve based on feedback
4. **Week 5**: Release candidates
5. **Week 6**: Stable 2.0.0 release

## NPM Best Practices

1. Use `npm pack` to preview package
2. Test installation in fresh project
3. Include only necessary files
4. Minimize dependencies
5. Provide good keywords for discovery
6. Use npm scripts for common tasks
7. Consider npm provenance for security

## Success Metrics

- Downloads per week
- GitHub stars
- Bundle size reduction reports
- Community feedback
- Adoption in production
