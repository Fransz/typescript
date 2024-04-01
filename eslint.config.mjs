// @ts-check
import path from "node:path"
import { fileURLToPath } from "node:url";
import jsdoc from 'eslint-plugin-jsdoc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals'

console.log(path.dirname(fileURLToPath(import.meta.url)))
const cfg = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  jsdoc.configs['flat/recommended'],
  {
    ignores: ['**/*.js', '**/eslint.config.mjs'],
  },
  {
    plugins: { jsdoc: jsdoc },
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
      },
      globals: {
      ...globals.browser,
      ...globals.node,
      },
    },
  },
);

export default cfg
