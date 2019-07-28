module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:vue/recommended",
  ],
  rules: {
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'import/first': 'warn',
    camelcase: 'warn'
  },
  plugins: ["import", "vue"],
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
}