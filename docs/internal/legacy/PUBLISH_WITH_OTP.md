# Publishing with OTP (One-Time Password)

NPM requires a one-time password for publishing. Here's how to provide it:

## Get your OTP

1. Open your authenticator app (Google Authenticator, Authy, etc.)
2. Find the NPM entry
3. Copy the 6-digit code

## Publish with OTP

Run this command, replacing `123456` with your actual 6-digit code:

```bash
# For core package
cd packages/core
npm publish --access public --tag beta --otp=123456

# For adapters
cd ../adapters
npm publish --access public --tag beta --otp=123456

# For styles
cd ../styles
npm publish --access public --tag beta --otp=123456

# For compat
cd ../compat
npm publish --access public --tag beta --otp=123456
```

## Or use the script with OTP

From the root directory:

```bash
# Example with your OTP
npm run publish:core -- --otp=123456
```

## Success!

Once published, your packages will be live at:

- https://www.npmjs.com/package/@agrc/core
- https://www.npmjs.com/package/@agrc/adapters
- https://www.npmjs.com/package/@agrc/styles
- https://www.npmjs.com/package/@agrc/compat

## Test installation

```bash
# In a new directory
mkdir test-agrc && cd test-agrc
npm init -y
npm install @agrc/core@beta
```
