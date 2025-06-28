import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
    },

    rules: {
      complexity: ['error', 11],
      camelcase: 'off',
      'class-methods-use-this': 'off',
      'lines-between-class-members': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',

      '@typescript-eslint/naming-convention': [
        'error',
        // {
        //   selector: 'variable',
        //   format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
        // },
        // {
        //   selector: 'property',
        //   format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
        // },
        {
          selector: 'method',
          format: ['camelCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
      ],

      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          tabWidth: 2,
          trailingComma: 'all',
          bracketSpacing: true,
          singleQuote: true,
          semi: true,
        },
      ],
    },
  },
];
