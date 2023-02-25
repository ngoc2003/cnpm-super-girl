module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
    // 'plugin:jsx-a11y/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: '.',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  plugins: ['import', 'react', 'jsx-a11y', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 0,
    'react/no-unescaped-entities': 0,
    'no-undef': 0,
    'no-unused-vars': 'off',
    'import/named': 0,
    'import/namespace': 0,
    'import/default': 0,
  },
};
