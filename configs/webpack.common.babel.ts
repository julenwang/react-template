/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dayjs from 'dayjs';
import _ from 'lodash';
import DotenvWebpackPlugin from 'dotenv-webpack';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// @ts-expect-error: 该包没有类型定义
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import webpackPaths from './webpack.paths';
import packageJson from '../package.json';

// 将 .env 注入 process.env
dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const publishTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

const configuration: webpack.Configuration = {
  entry: {
    main: webpackPaths.webEntryPath,
  },
  output: {
    path: webpackPaths.webOutputPath,
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    alias: {
      '@': webpackPaths.srcPath,
    },
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: _.compact([isDev && 'react-refresh/babel']),
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // 仅编译，不进行类型检查
              transpileOnly: true,
            },
          },
        ],
      },
      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[hash][ext][query]',
        },
      },
      // Images
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[hash][ext][query]',
        },
      },
      // svg 作为url使用，同Images
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        resourceQuery: /url/, // *.svg?url
        generator: {
          filename: 'static/media/[hash][ext][query]',
        },
      },
      // Svg 作为react组件使用
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
        resourceQuery: { not: [/url/] },
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin({
      safe: true,
      systemvars: true,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: webpackPaths.publicPath, to: webpackPaths.webOutputPath, toType: 'dir' }],
    }),
    // 为每个 chunk 添加 banner
    new webpack.BannerPlugin({
      banner: `Last update: ${publishTime} \nVersion: ${packageJson.version} \n`,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: webpackPaths.htmlTemplatePath,
      // 将 process.env 注入到 ejs 模板
      templateParameters: process.env,
      publishTime,
      favicon: webpackPaths.faviconPath,
    }),
    // moment 替换为 dayjs
    new AntdDayjsWebpackPlugin(),
  ],
};

export default configuration;
