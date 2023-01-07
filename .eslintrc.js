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
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-underscore-dangle': 0,
    'react/jsx-no-bind': [
      'error',
      {
        ignoreDOMComponents: true,
        allowFunctions: true,
        allowArrowFunctions: true,
      },
    ],
    indent: 'off',
    camelcase: 'off',
    'react/jsx-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'global-require': 0,
    'object-curly-newline': 'off',
    'jsx-quotes': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'no-tabs': 0,
    'no-console': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-unescaped-entities': 0,
    'operator-linebreak': 0,
    'no-await-in-loop': 0,
  },
};
