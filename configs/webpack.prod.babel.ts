/* eslint-disable import/no-extraneous-dependencies */
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import { getStyleConfig } from './utils';
import baseConfig from './webpack.common.babel';

const styleConfig = getStyleConfig(false);

const configuration: webpack.Configuration = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    clean: true,
    // chunk name
    chunkFilename: 'static/js/[name].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: /@banner/,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: false,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
    }),
  ],
};

export default merge(baseConfig, configuration, styleConfig);
