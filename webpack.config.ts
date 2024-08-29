import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';

module.exports = {
  entry: [
    './src/index.tsx',
  ],
  devServer: {
    static: './build',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    allowedHosts: [
      // Modify this if you use an alternate tunneling solution.
      '.ngrok.io',
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
      path.resolve(__dirname),
    ],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new HtmlWebpackPlugin({
      title: 'Mattermost Playbooks for Teams',
      hash: true,
    }),
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },
};
