const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {
  mode: 'production',
  context: ROOT_PATH,
  stats: {
    children: false,
  },
  entry: {
    app: path.resolve(SRC_PATH, 'app.js'),
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: BUILD_PATH,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
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
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['js/*.js'],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'html/index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    }),
  ]
}