const readonly = 'readonly';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.min.js'],
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        confirm: readonly,
        document: readonly,
        localStorage: readonly,
        window: readonly,
      },
    },
    rules: {
      'array-callback-return': 'error',
      'eqeqeq': ['error', 'always'],
      'no-console': 'error',
      'no-duplicate-imports': 'error',
      'no-implicit-coercion': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
    },
  },
];
