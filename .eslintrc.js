module.exports = {
  plugins: ['simple-import-sort'],
  parser: '@typescript-eslint/parser',
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  rules: {
    'no-empty-function': 'off',
    'arrow-parens': [0, 'never'],
    'simple-import-sort/sort': 'error',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
}
