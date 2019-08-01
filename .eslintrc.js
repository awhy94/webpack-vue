module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:vue/recommended",
  ],
  rules: {
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    camelcase: 'warn',
    indent: [2, 2, { SwitchCase: 1 }],
    radix: [2, "as-needed"],
    'import/first': 'warn',
    'import/no-extraneous-dependencies': [1, { devDependencies: true }],
    'import/extensions': [1, 'ignorePackages', { 'js': 'never' }],
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-bitwise': [0],
  },
  plugins: ["import", "vue"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
}