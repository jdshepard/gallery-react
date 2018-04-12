var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./app/index.js'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.css$/,
        loader: ['style-loader', 'css-loader'],
        include: path.join(__dirname, 'app', 'styles')
      },
      {
        test: /.svg$/,
        loader: 'svg-loader'
      }
    ]
  }
}
