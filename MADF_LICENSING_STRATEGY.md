# MADF Licensing Strategy

## Overview

For MADF, I recommend a **dual-licensing model** that balances open source adoption with commercial monetization.

## License Options Comparison

### 1. MIT License (Current)

**Pros:**

- Maximum adoption
- Simple, permissive
- Developer friendly

**Cons:**

- No monetization path
- Competitors can use freely
- No control over usage

### 2. GPL/AGPL

**Pros:**

- Forces open source contributions
- Prevents proprietary forks

**Cons:**

- Scares away enterprises
- Complex compliance
- Limited adoption

### 3. Apache 2.0 + Commercial (Recommended)

**Pros:**

- Enterprise friendly
- Patent protection
- Clear contribution rules
- Allows dual licensing

**Cons:**

- Slightly more complex than MIT
- Requires license management

### 4. BSL (Business Source License)

**Pros:**

- Converts to open source after time
- Prevents competition
- Clear commercial terms

**Cons:**

- Less known
- May confuse users
- Not OSI approved

## Recommended Strategy: Dual Licensing

### Core (Apache 2.0)

- Basic agent orchestration
- GitHub integration
- CLI tool (limited features)
- Community plugins

### Commercial License

- Cloud orchestration
- > 3 concurrent agents
- Analytics dashboard
- Enterprise plugins
- Priority support
- SLA guarantees

## Implementation Plan

### 1. License Structure

```
/
├── LICENSE                 # Main commercial license
├── LICENSE-APACHE         # For open source components
├── NOTICE                 # Copyright notices
└── packages/
    ├── core/
    │   └── package.json   # "license": "Apache-2.0"
    ├── cli/
    │   └── package.json   # "license": "Apache-2.0"
    └── cloud/
        └── package.json   # "license": "SEE LICENSE"
```

### 2. Code Separation

```typescript
// Open source component
// SPDX-License-Identifier: Apache-2.0
export class BasicOrchestrator {
  // Free features
}

// Commercial component
// SPDX-License-Identifier: Proprietary
export class CloudOrchestrator {
  // Paid features
}
```

### 3. License Enforcement

```typescript
class LicenseManager {
  async validate(): Promise<boolean> {
    const agents = await this.countActiveAgents();

    if (agents <= 3) {
      return true; // Free tier
    }

    return await this.validateCommercialLicense();
  }
}
```

### 4. Feature Flags

```typescript
export const FEATURES = {
  // Open source
  BASIC_ORCHESTRATION: true,
  GITHUB_INTEGRATION: true,
  LOCAL_EXECUTION: true,

  // Commercial only
  CLOUD_ORCHESTRATION: license.isCommercial(),
  ANALYTICS_DASHBOARD: license.isCommercial(),
  UNLIMITED_AGENTS: license.isCommercial(),
  ENTERPRISE_SUPPORT: license.isEnterprise(),
};
```

## Legal Considerations

### 1. CLA (Contributor License Agreement)

- Require for all contributions
- Allows relicensing if needed
- Protects IP rights

### 2. Trademark Protection

- Register "MADF" trademark
- Register "Coalesce Labs" trademark
- Define usage guidelines

### 3. Terms of Service

- Define commercial usage
- Limit liability
- Set support expectations

### 4. Privacy Policy

- Explain telemetry (commercial)
- Data handling practices
- GDPR compliance

## Migration Path

### For Existing MIT Users

1. Grandfather current users
2. Provide migration guide
3. Offer discount for early adopters
4. Set sunset date for MIT version

### Communication Plan

```markdown
# MADF is Evolving!

We're moving to a dual-license model to ensure MADF's long-term sustainability:

✅ **Core remains open source** (Apache 2.0)
✅ **Free for small teams** (up to 3 agents)
✅ **New advanced features** for Pro users
✅ **Better support** with commercial backing

## What This Means

### For Open Source Users

- Keep using MADF free forever
- Contribute under Apache 2.0
- Access to core features

### For Commercial Users

- Unlock unlimited agents
- Get cloud orchestration
- Priority support
- Influence roadmap
```

## Revenue Protection

### 1. License Keys

```typescript
// Simple license key validation
interface LicenseKey {
  id: string;
  company: string;
  tier: "pro" | "enterprise";
  agents: number;
  expires: Date;
  signature: string;
}
```

### 2. Phone Home (Optional)

- Validate license periodically
- Track usage metrics
- Detect violations
- Must be transparent

### 3. Open Core Strategy

- Keep core valuable enough to attract users
- Make commercial features compelling
- Clear feature differentiation
- No artificial limitations

## Success Examples

### Similar Models

1. **GitLab**: Open core with enterprise features
2. **Elastic**: Dual license after AWS competition
3. **Sentry**: Open source with SaaS model
4. **Grafana**: AGPL with commercial option
5. **MongoDB**: SSPL for protection

### Key Lessons

- Be transparent about changes
- Grandfather existing users
- Keep core genuinely useful
- Add real value in commercial
- Build community trust

## Action Items

1. **Immediate**: Run `update-madf-license.sh`
2. **This Week**:
   - Set up CLA bot
   - Create license validation
   - Update documentation
3. **This Month**:
   - Launch commercial tiers
   - Set up payment processing
   - Create enterprise sales process
4. **This Quarter**:
   - Register trademarks
   - Formalize legal structure
   - Launch customer success

## Conclusion

Dual licensing gives you the best of both worlds:

- **Open source**: Community, adoption, contributions
- **Commercial**: Revenue, sustainability, advanced features

This model has proven successful for many developer tools and positions MADF for long-term success.
