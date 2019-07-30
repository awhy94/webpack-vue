const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcsspxtoviewport = require('postcss-px-to-viewport');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');

module.exports = {
  mode: 'development',
  context: ROOT_PATH,
  stats: {
    children: false,
  },
  entry: {
    app: path.resolve(SRC_PATH, 'app.js'),
  },
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].bundle.[hash].js',
    path: BUILD_PATH,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': SRC_PATH,
    },
  },
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ],
            },
          },
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
                // cssnano({
                //   preset: 'default',
                //   autoprefixer: false,
                //   'postcss-zindex': false,
                //   'postcss-reduce-idents': false,
                // }),
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
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'js/*.js',
        'css/*.css',
      ],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'html/index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].bundle.[hash].css',
    }),
  ],
};
