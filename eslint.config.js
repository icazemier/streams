import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

// Flat config, in ESM: this package is "type": "module", which is what the old
// .eslintrc.js could not be. ESLint 9 dropped the eslintrc format entirely, so
// this is also what the upgrade off ESLint 8 required.
export default tsEslint.config(
    {
        ignores: ['dist/**', 'temp/**', 'assets/**', 'output.log'],
    },
    eslint.configs.recommended,
    {
        files: ['**/*.ts'],
        extends: tsEslint.configs.recommended,
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
    prettierRecommended
);
