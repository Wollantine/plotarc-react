const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    contentBase: './'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Plotarc',
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?|\.tsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(png|svg|jpg|gif)$/, loader: "file-loader" },
      { test: /\.(eot|ttf|svg|woff|woff2)$/, loader: "file-loader" },
      { test: /\.css$/, loader: "css-loader" },
    ]
  }
};
