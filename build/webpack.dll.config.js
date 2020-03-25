const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const envFlag = isProd ? 'prod' : 'dev';

const ROOT_PATH = path.resolve(__dirname, '../');
const BUILD_PATH = path.resolve(ROOT_PATH, isProd ? 'public' : 'dist');

const vendors = [
  'vue/dist/vue.esm.js',
  'vuex',
  'vue-router',
  'fastclick',
];
module.exports = {
  mode: isProd ? 'production' : 'development',
  context: ROOT_PATH,
  stats: {
    children: false,
  },
  entry: {
    [`vendors_${envFlag}`]: vendors,
  },
  output: {
    path: BUILD_PATH,
    filename: isProd ? 'dll/[name].[hash].js' : '[name].js',
    library: '[name]_library',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:
      isProd ? [
        'dll/*.js',
        'dll/*.json',
        'js/*.js',
        'css/*.css',
        'html/*.html',
      ] : [
        `vendors_${envFlag}.js`,
        `vendors_${envFlag}.manifest.json`,
      ],
    }),
    new webpack.DllPlugin({
      context: ROOT_PATH,
      name: '[name]_library',
      path: path.resolve(BUILD_PATH, isProd ? `dll/vendors_${envFlag}.manifest.json` : `vendors_${envFlag}.manifest.json`),
    }),
  ],
};
