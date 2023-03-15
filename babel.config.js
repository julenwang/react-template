module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.29',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    // 使用 ts-loader 编译，这个 preset 仅处理 @babel/register 的 ts 文件，如 webpack config
    '@babel/preset-typescript',
  ],
  plugins: ['babel-plugin-styled-components'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: true,
            },
          },
        ],
      ],
    },
  },
};
