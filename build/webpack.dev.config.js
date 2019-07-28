const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': SRC_PATH,
    }
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  module: {
    rules: [{
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    }),
  ]
}