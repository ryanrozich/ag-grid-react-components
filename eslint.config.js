import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        // project: "./tsconfig.json", // Removed to avoid issues with test files
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLSelectElement: "readonly",
        URL: "readonly",
        PopStateEvent: "readonly",
        navigator: "readonly",
        // Node.js globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        NodeJS: "readonly",
        // Testing globals
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        vi: "readonly",
        test: "readonly",
        // React
        React: "readonly",
      },
    },
    rules: {
      ...tsPlugin.configs["recommended"].rules,
      ...reactPlugin.configs["recommended"].rules,
      ...reactHooksPlugin.configs["recommended"].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Disable no-undef for TypeScript files as TypeScript handles this
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Override rules for test files - allow `any` type
  {
    files: [
      "**/*.test.{ts,tsx}",
      "**/*.spec.{ts,tsx}",
      "**/test/**/*.{ts,tsx}",
      "**/tests/**/*.{ts,tsx}",
      "**/__tests__/**/*.{ts,tsx}",
      "**/test-utils/**/*.{ts,tsx}",
      "src/utils/*.test.ts",
      "src/components/**/*.test.tsx",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Also relax some other rules for tests if needed
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  // Override for AG Grid workaround files where `any` is needed
  {
    files: [
      "**/agGridWorkaround.ts",
      "**/agGridWorkaround.test.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // Override for demo files where `any` is acceptable for examples
  {
    files: [
      "src/demo/**/*.{ts,tsx}",
      "**/filter-test.tsx",
      "**/working-demo*.tsx",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Turn off in demos
      "react/no-unescaped-entities": "off", // Demo text can have quotes
      "react-hooks/exhaustive-deps": "warn", // Downgrade to warning
    },
  },
  // Override for components dealing with complex AG Grid types
  {
    files: [
      "**/ActiveFilters/**/*.tsx",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Complex AG Grid filter models
    },
  },
  // Configuration for API directory JavaScript files
  {
    files: ["api/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        URL: "readonly",
        Response: "readonly",
        setTimeout: "readonly",
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "*.config.js",
      "scripts/**",
    ],
  },
];
