const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/index.ts' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      watch: true,
    },
    historyApiFallback: {
      index: '/src/index.html',
    },
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
      fs: false,
    },
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
      // 'handlebars' : 'handlebars/dist/handlebars.js',

      // core: path.resolve(__dirname, 'src/core'),
      // pages: path.resolve(__dirname, 'src/pages'),
      // components: path.resolve(__dirname, 'src/components'),
      // img: path.resolve(__dirname, 'src/image'),
      // routes: path.resolve(__dirname, 'src/routes'),
      // types: path.resolve(__dirname, 'src/types'),
      // vendor: path.resolve(__dirname, 'src/vendor'),
      // variables: path.resolve(__dirname, 'src/variables'),
      // utils: path.resolve(__dirname, 'src/utils'),
      // styles: path.resolve(__dirname, 'src/styles'),
      // api: path.resolve(__dirname, 'src/Api'),
      // services: path.resolve(__dirname, 'src/services'),
    },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       use: [
  //         {
  //           loader: 'ts-loader',
  //           options: {
  //             configFile: path.resolve(__dirname, 'tsconfig.json'),
  //           },
  //         },
  //       ],
  //       exclude: /(node_modules)/,
  //     },
  //     {
  //       test: /\.js$/,
  //       use: 'babel-loader',
  //       exclude: /node_modules/,
  //     },
  //     {
  //       test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webp)$/,
  //       type: 'asset/resource',
  //     },
  //     {
  //       test: /\.(sa|sc|c)ss$/,
  //       use: [
  //         {
  //           loader: MiniCssExtractPlugin.loader,
  //           options: {},
  //         },
  //         'css-loader',
  //         'postcss-loader',
  //         'sass-loader',
  //       ],
  //     },
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'dist/index.html',
    }),
  ],
};
