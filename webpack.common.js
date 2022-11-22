const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Heylynx-bundle.js',
    clean: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      src: path.resolve(__dirname, './src'),
      store: path.resolve(__dirname, './src/store'),
      components: path.resolve(__dirname, './src/components'),
      core: path.resolve(__dirname, './src/core'),
      helpers: path.resolve(__dirname, './src/helpers'),
      pages: path.resolve(__dirname, './src/pages'),
      images: path.resolve(__dirname, './src/images'),
      icons: path.resolve(__dirname, './src/icons'),
      data: path.resolve(__dirname, './src/data'),
      utils: path.resolve(__dirname, './src/utils'),
      api: path.resolve(__dirname, './src/api'),
      services: path.resolve(__dirname, './src/services'),
      tests: path.resolve(__dirname, './src/tests'),
      handlebars: 'handlebars/dist/handlebars.js',
    },
    fallback: {
      fs: false,
    },
    extensions: ['.ts', '.js', '.json'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '**.*',
          context: path.resolve(__dirname, 'src', 'assets'),
          to: './assets',
        },
      ],
    }),
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
              transpileOnly: true,
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:svg|png|jpg|jpeg|webp|ico)$/i,
        use: [
          {
            loader: 'file-loader?name=assets/img/[name].[ext]',
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
