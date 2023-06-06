const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;

const production = process.env.NODE_ENV === 'production';

module.exports = {
  entry: { myAppName: path.resolve(__dirname, 'index.js') },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: production ? '[name].[contenthash].js' : '[name].js',
    publicPath: production ? '/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|gif|jpg)$/,
        exclude: /fonts/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(css)$/,
        use: [production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
      },

      // loading SASS/SCSS
      {
        test: /\.(s[ca]ss)$/,
        exclude: /node_modules/,
        use: [production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.tsx', '.ts', '.scss'],
    alias: {
      api: path.resolve(__dirname, 'src/api/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      components: path.resolve(__dirname, 'src/components/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      data: path.resolve(__dirname, 'src/data/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      router: path.resolve(__dirname, 'src/router/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      store: path.resolve(__dirname, 'src/store/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      types: path.resolve(__dirname, 'src/types/'),
    },
  },
  plugins: [
    new WebpackMildCompile(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Izi Work',
      template: './public/index.html',
      favicon: './public/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  devServer: {
    port: 3001,
    hot: true,
    https: false,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://www.example.com',
        changeOrigin: true,
      },
    },
  },
  mode: production ? 'production' : 'development',
};
