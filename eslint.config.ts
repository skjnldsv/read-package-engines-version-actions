import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
// noinspection SpellCheckingInspection
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import typeScriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default defineConfig({
  files: ['src/*.ts', 'src/**/*.ts'],
  extends: [
    js.configs.recommended,
    tseslint.configs.eslintRecommended,
    tseslint.configs.recommended,
    prettierRecommended,
  ],
  languageOptions: {
    parser: typeScriptParser,
    globals: {
      ...globals.node,
      ...globals.es2015,
      ...globals.jest,
    },
  },
});
