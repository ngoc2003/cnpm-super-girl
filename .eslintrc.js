module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-mixed-spaces-and-tabs': 0,
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-underscore-dangle': 0,
    'react/jsx-no-bind': [
      'error',
      { ignoreDOMComponents: true, allowFunctions: true },
    ],
    indent: 'off',
    'no-tabs': 0,
    'no-console': 0,
  },
};
