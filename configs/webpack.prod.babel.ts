/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import baseConfig from './webpack.common.babel';
import { getStyleConfig } from './utils';

const styleConfig = getStyleConfig(false);

const configuration: webpack.Configuration = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        molstar: {
          name: 'molstar',
          test: /[\\/]molstar[\\/]/,
          chunks: 'all',
        },
      },
    },
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
