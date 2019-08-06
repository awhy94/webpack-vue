const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcsspxtoviewport = require('postcss-px-to-viewport');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const devServerConfig = require('./webpack.dev.server.config');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  mode: 'development',
  context: ROOT_PATH,
  entry: {
    app: path.resolve(SRC_PATH, 'app.js'),
  },
  output: {
    filename: '[name].js',
    path: BUILD_PATH,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': SRC_PATH,
    },
  },
  devServer: devServerConfig,
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 2 versions'],
                }),
                postcsspxtoviewport({
                  viewportWidth: 750,
                  viewportHeight: 1334,
                  unitPrecision: 3,
                  viewportUnit: 'vw',
                  selectorBlackList: ['.ignore-vw', '.hairlines'],
                  minPixelValue: 1,
                  mediaQuery: false,
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    }),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: path.resolve(BUILD_PATH, 'vendors_dev.manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(BUILD_PATH, 'vendors_dev.js'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
};
