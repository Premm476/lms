/* eslint-env node */
/* globals process */
import { FlatCompat } from '@eslint/eslintrc';
import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.config({
    extends: ['plugin:@next/next/recommended']
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      '@next/next': nextPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
        process: true,
        module: true,
        require: true,
        DefaultSession: true
      },
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn'
    }
  },
  {
    ignores: [
      '.next',
      'node_modules',
      'dist',
      'build',
      'coverage'
    ]
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/types/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off'
    }
  }
];
