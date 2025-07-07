/**
 * ESLint Configuration Example
 *
 * Comprehensive ESLint setup for TypeScript/React projects with strict rules.
 * CUSTOMIZE: Adjust rules based on your team's preferences.
 */

module.exports = {
  root: true,

  // Parser configuration
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json', './tsconfig.node.json'], // CUSTOMIZE: Your TS configs
    tsconfigRootDir: __dirname,
  },

  // Environment settings
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },

  // Extends configurations
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier', // Must be last to override other configs
  ],

  // Plugins
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import', 'unused-imports'],

  // Settings
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  // Rule configurations - CUSTOMIZE based on your standards
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
    ],

    // React rules
    'react/prop-types': 'off', // Using TypeScript
    'react/react-in-jsx-scope': 'off', // React 17+
    'react/jsx-uses-react': 'off', // React 17+
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-no-useless-fragment': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
    'react/hook-use-state': 'error',
    'react/no-array-index-key': 'warn',

    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // Import rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error', // Prefer named exports
    'unused-imports/no-unused-imports': 'error',

    // General rules
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
    ],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],

    // Accessibility rules
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/anchor-is-valid': 'error',
  },

  // Override configurations for specific files
  overrides: [
    // Test files
    {
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}', '**/test-*.{ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-default-export': 'off',
      },
    },

    // Configuration files
    {
      files: ['*.config.{js,ts}', '.*rc.js'],
      rules: {
        'import/no-default-export': 'off',
      },
    },

    // Demo/example files
    {
      files: ['**/demo/**', '**/examples/**'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],

  // Files to ignore
  ignorePatterns: ['dist', 'build', 'coverage', 'node_modules', '*.min.js', '*.d.ts', 'generated'],
};
