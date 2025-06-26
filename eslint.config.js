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
