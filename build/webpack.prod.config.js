const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcsspxtoviewport = require('postcss-px-to-viewport');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].bundle.[chunkhash].js',
    path: BUILD_PATH,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': SRC_PATH,
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        compress: {
          drop_console: true,
        },
      },
    })],
    splitChunks: {
      // minSize: 0,
    },
    runtimeChunk: {
      name: 'manifest'
    }
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
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3,
              targets: '> 0.1%, last 4 major versions, iOS >= 8, Android >= 4',
              modules: false,
            }],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            ['@babel/plugin-proposal-decorators', {
              legacy: true,
            }],
            ['@babel/plugin-proposal-class-properties', {
              loose: true,
            }],
            ["import", {
              "libraryName": "vue-kit-test",
              "libraryDirectory": "dist",
            }]
          ],
        },
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
        ],
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
                cssnano({
                  preset: 'default',
                  autoprefixer: false,
                  'postcss-zindex': false,
                  'postcss-reduce-idents': false,
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
      {
        test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              context: SRC_PATH,
              name: '[path][name].[ext]?[hash:8]',
              outputPath: 'images/',
              // publicPath: `${PUBLIC_PATH}images/`,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?\S*)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              context: SRC_PATH,
              name: '[path][name].[ext]?[hash:8]',
              outputPath: 'others/',
              // publicPath: `${PUBLIC_PATH}others/`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'js/*.js',
        'css/*.css',
        'html/*.html',
      ],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '',
      filename: 'html/index.html',
      template: path.resolve(SRC_PATH, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].bundle.[chunkhash].css',
    }),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: path.resolve(BUILD_PATH, 'dll/vendors_prod.manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: [
        path.resolve(BUILD_PATH, 'dll/vendors_prod.*.js'),
      ],
      outputPath: './dll',
      publicPath: '../',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    // new webpack.HashedModuleIdsPlugin(),
  ],
};
