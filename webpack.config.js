var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  {
    devtool: 'inline-source-map',
    entry: './app/index.js',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'client.bundle.js'
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loader: 'babel-loader',
          include: path.join(__dirname, 'app'),
          exclude: /node_modules/,
          query: {
            presets: ['env', 'react']
          }
        },
        {
          test: /.css$/,
          loader: ['style-loader', 'css-loader'],
          include: path.join(__dirname, 'app', 'styles')
        },
        {
          test: /.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  },
  // https://stackoverflow.com/a/37391247
  {
    devtool: 'inline-source-map',
    entry: './app/server/index.js',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs'
    },
    externals: [ /^(?!\.|\/).+/i, ],
    target: 'node',
    // https://github.com/webpack-contrib/css-loader/issues/447
    node: {
      fs: 'empty',
      net: 'empty'
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loader: 'babel-loader',
          include: path.join(__dirname, 'app'),
          exclude: /node_modules/,
          query: {
            presets: ['env', 'react']
          }
        },
        {
          test: /.css$/,
          loader: ['style-loader', 'css-loader'],
          include: path.join(__dirname, 'app', 'styles')
        },
        {
          test: /.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  }
]
