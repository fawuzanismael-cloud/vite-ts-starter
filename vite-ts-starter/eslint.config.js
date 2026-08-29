import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        // Type-aware linting: resolves each file to its tsconfig automatically.
        // allowDefaultProject covers root-level JS config files (this one included)
        // that aren't part of tsconfig.json's `include`.
        projectService: {
          allowDefaultProject: ['*.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Project-specific overrides can go here.
    },
  },
  {
    // Root-level JS config files run outside the app's tsconfig, so they get
    // basic (non-type-aware) linting only.
    files: ['*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  // Keep this last so it can disable any stylistic rules that conflict with Prettier.
  eslintConfigPrettier,
);
