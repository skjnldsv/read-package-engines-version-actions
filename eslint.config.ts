import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
// noinspection SpellCheckingInspection
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig({
  files: ['src/*.ts', 'src/**/*.ts'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    prettierRecommended,
  ],
});
