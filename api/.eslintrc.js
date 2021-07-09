module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    'comma-dangle': ['error', 'never'],
    'camelcase': 0,
    'class-methods-use-this': 0,
    'eol-last': ['error', 'always'],
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 1,
    'import/extensions': [
      '.js',
      '.ts'
    ],
    'lines-between-class-members': 0,
    'linebreak-style': 0,
    'semi': 'error',
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'no-extra-semi': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'ts': 'never'
      }
    ],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    '@typescript-eslint/explicit-module-boundary-types': 'error'
  },
  env: {
    'mocha': true
  }
};