const webpack = require('webpack')
const configs = require('../webpack.config')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const { exec, execSync } = require('child_process')

const root = path.join(__dirname, '..')
const outDir = path.join(root, 'out')

const webpackCompiler = () => {
  try {
    const compiler = webpack(configs)
    compiler.hooks.done.tap('done', async stats => {
      const messages = stats.toJson({
        all: false,
        warnings: false,
        errors: true
      })

      // This is a 'hack' to compile Stylus code into CSS when compiling the rest of the
      // app (js files) into bundles. In a near future we should tell Webpack to also
      // compile .styl files.
      exec('stylus -c app/styles/app.styl --out out/app.css', err => {
        if (err) {
          console.log(chalk.red(err))
          console.log()
          process.exit(1)
        }

        // copyDependencies()

        if (!messages.errors.length) {
          console.log(chalk.green('Bundles were compiled successfully! :D'))
        } else {
          console.log(chalk.red('I couldn\'t compile the app...'))
          console.log(messages.errors.join('\n\n'))
          return
        }
      })
    })

    compiler.hooks.invalid.tap('invalid', () => {
      console.log(chalk.cyan('Compiling...'))
    })

    return compiler
  } catch (err) {
    console.log(chalk.red('Dude, something went wrong...'))
    console.log(err.message || err)
    process.exit(1)
  }
}

const copyDependencies = () => {
  const packageJson = require(path.resolve(root, 'package.json'))
  // We need to change the "main" property because 'app/src/main-process/main.js'
  // doesn't exists anymore. All main-process files are bundled into 'main.js' by
  // Webpack. See 'webpack.config.js'.
  packageJson.main = './main.js'

  // We aren't going to run scripts from this directory, so it's useless to keep
  // the 'scripts' property in this package.json.
  delete packageJson.scripts

  fs.writeFileSync(path.resolve(outDir, 'package.json'), JSON.stringify(packageJson))

  const indexHtml = path.resolve(root, 'app', 'static', 'index.html')
  // OPTIMIZE: Prevent copying 'index.html' if it already exists.
  fs.copyFileSync(indexHtml, path.join(outDir, 'index.html'))

  // We don't want to install all of the project's dependencies everytime we run 
  // 'npm run compile', then we check if those dependencies are installed.
  //
  // The problem with this is that we need to run 'npm install' in the out/ directory
  // if we have installed a new dependency, unless we run 'npm run build'. In this case
  // both the package.json and the dependencies will be fully updated.
  if (!fs.existsSync(path.resolve(outDir, 'node_modules'))) {
    console.log(chalk.cyan('Copying dependencies...'))
    execSync('npm install', { cwd: outDir, env: process.env })
  }
}

console.log(chalk.cyan('Compiling bundles...'))
webpackCompiler().run()

module.exports = { webpackCompiler }

