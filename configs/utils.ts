/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';

export function getStyleConfig(isDev: boolean): Pick<webpack.Configuration, 'module' | 'plugins'> {
  const suffixLoaders = [
    {
      loader: 'style-loader',
      options: {
        injectType: 'singletonStyleTag',
      },
    },
    'css-loader',
    'postcss-loader',
  ];
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [...suffixLoaders],
        },
        {
          test: /\.less$/,
          use: [
            ...suffixLoaders,
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [...suffixLoaders, { loader: 'sass-loader' }],
        },
      ],
    },
  };
}
