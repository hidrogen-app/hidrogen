const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevConfigs = require('../webpack.config')
const chalk = require('chalk')
const path = require('path')
const { exec, spawn } = require('child_process')
const { webpackCompiler } = require('./compile')
const { getPort } = require('../app/src/lib/port')

process.on('uncaughtException', err => {
  console.log(chalk.red(err))
  process.exit(1)
})

const startInProduction = () => {
  console.log(chalk.cyan('Starting Hidrogen in production mode...'))

  let binary
  if (process.platform === 'win32') {
    binary = path.resolve(__dirname, '..', 'dist', 'Hidrogen.exe')
  } else {
    console.log(chalk.red('I can\'t run on', process.platform))
    process.exit(1)
  }

  const runningApp = spawn(binary, [], {})
  runningApp.on('close', () => process.exit(0))
}

const startDevelopmentServer = () => {
  console.log(chalk.cyan('Starting development server...'))

  const server = express()
  const rendererConfig = webpackDevConfigs[1]
  const compiler = webpack(rendererConfig)
  const port = getPort()

  server.use(webpackDevMiddleware(compiler, {
    publicPath: `http://localhost:${port}/`
  }))

  server.use(webpackHotMiddleware(compiler))

  server.listen(port, 'localhost', err => {
    if (err) {
      console.log(chalk.red(err))
      process.exit(1)
    }

    console.log(chalk.cyan(`Development server running on http://localhost:${port}`))

    exec('npx electron .', err => {
      console.log(chalk.red(err))
    })
  })
}

const startWebpackDevServer = () => {
  console.log(chalk.cyan('Starting development server...'))
  
  let devServer
  try {
    devServer = new WebpackDevServer(webpackCompiler(), webpackDevConfigs[1].devServer)
  } catch (err) {
    console.log(chalk.red(err))
  }

  const port = getPort()

  devServer.listen(port, 'localhost', err => {
    if (err) {
      console.log(chalk.red(err))
    }

    console.log(chalk.cyan(`Development server running on http://localhost:${port}`))

    exec('npx electron .', err => {
      console.log(chalk.red(err))
    })
  })
}

process.env.NODE_ENV === 'production' ? startInProduction() : startWebpackDevServer()