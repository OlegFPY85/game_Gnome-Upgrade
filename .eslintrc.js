module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'error',
    'no-plusplus': 'off',
    'max-len': ['error', { 
      code: 120, 
      ignoreComments: true,
      ignoreUrls: true,
    }],
  },
  ignorePatterns: ['dist/', 'node_modules/', 'webpack.config.js'],
};