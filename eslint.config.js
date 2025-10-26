import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: true,
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['functions', 'arrowFunctions'] }],

      // Import organization
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],

      // Code quality rules (no formatting - Prettier handles that)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  // Disable ESLint formatting rules (Prettier handles them)
  prettierConfig,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '*.config.js'],
  },
];
