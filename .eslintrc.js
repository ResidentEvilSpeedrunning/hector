'use strict';

module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // for loops should not be restricted
    'no-restricted-syntax': ['off'],

    // this is a NodeJS app
    'no-console': ['off'],

    // we use mongo
    'no-underscore-dangle': ['off'],

    'no-await-in-loop': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: './src',
      },
    },
  },
};
