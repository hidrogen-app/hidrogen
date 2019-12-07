const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/register')

const root = path.resolve(__dirname)
const buildPath = path.resolve(__dirname, 'out')

const config = {
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  stats: 'none',
  devServer: {
    contentBase: path.join(__dirname, 'out'),
    open: false,
    compress: true,
    stats: 'none',
    noInfo: true,
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp4)$/,
        use: [{
            loader: 'file-loader',
            options: {}
        }]
      },
      {
        test: /\.(ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: path.join(buildPath, 'fonts')
          }
        }]
      }
    ]
  },
  plugins: [
    /* new HtmlWebpackPlugin({
      template: path.resolve(root, 'app', 'static', 'index.html'),
      chunks: ['renderer']
    }) */
  ],

  // Reload on file change.
  watch: true,
  // Map errors to source file.
  devtool: 'source-map'
}

const main = merge({}, config, {
  entry: { main: path.resolve(__dirname, 'app', 'src', 'main-process', 'main.js') },
  target: 'electron-main'
})

const renderer = merge({}, config, {
  entry: { renderer: path.resolve(__dirname, 'app', 'src', 'ui', 'index.js') },
  target: 'electron-renderer'
})

module.exports = [ main, renderer ]