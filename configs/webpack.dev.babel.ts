/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import baseConfig from './webpack.common.babel';
import webpackPaths from './webpack.paths';
import { getStyleConfig } from './utils';

// const port = process.env.PORT || 8008;
const styleConfig = getStyleConfig(true);

const configuration: webpack.Configuration = {
  mode: 'development',
  entry: {
    main: webpackPaths.devWebEntryPath,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  devServer: {
    // port,
    // allowedHosts: 'all',
    // https: true,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: '/',
    },
    historyApiFallback: true,
  },
};

export default merge(baseConfig, configuration, styleConfig);
