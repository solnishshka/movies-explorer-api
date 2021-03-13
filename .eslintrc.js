module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-unused-vars': ['error', { args: 'none' }],
  },
};
