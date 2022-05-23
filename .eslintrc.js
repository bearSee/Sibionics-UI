
module.exports = {
  root: true,
  env: {
      node: true,
  },
  parserOptions: {
      parser: 'babel-eslint'
  },
  extends: [
      'plugin:vue/strongly-recommended',
      '@vue/airbnb',
  ],
  rules: {
      'no-console': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-bitwise': ['error', { 'allow': ['~'] }],
      'linebreak-style': [0 ,'error', 'windows'],
      'prefer-destructuring': 'off',
      'no-mixed-operators': 'off',
      'func-names': 'off',
      'no-param-reassign': 'off',
      indent: 'off',
      'max-len': ['warn', 200],
      'import/extensions': ['error', 'always', {
          js: 'never',
          vue: 'never',
      }],
      'vue/script-indent': ['warn', 4],
      'vue/html-indent': ['warn', 2],
      'vue/html-closing-bracket-newline': 'off',
      'import/no-extraneous-dependencies': ['error', {
          optionalDependencies: ['test/unit/index.js'],
      }],
  },
};
