module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', { 'code': 100 }],
    'semi': [2, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
