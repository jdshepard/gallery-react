const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')


const devSettings = {
  devtool: 'inline-source-map'
}

const commonModuleSettings = {
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

const clientConfig = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'build', 'public'),
    filename: 'client.js'
  }
}

const serverConfig = {
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
  }
}

const productionSettings = {
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}

module.exports = mode => {
  if (mode === "production") {
    console.log('production settings')
    return [merge(clientConfig, commonModuleSettings, productionSettings), merge(serverConfig, commonModuleSettings)]
  }
  console.log('dev settings')
  return [merge(clientConfig, devSettings, commonModuleSettings), merge(serverConfig, devSettings, commonModuleSettings)]
}
