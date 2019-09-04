const packager = require('electron-packager')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const { execSync } = require('child_process')

const root = path.join(__dirname, '..')
const outDir = path.join(root, 'out')
const distDir = path.join(__dirname, '..', '..', 'hidrogen-dist18')

const buildOptions = {
  dir: outDir,
  out: distDir,
  arch: 'x64',
  platform: 'win32',
  prune: true,
  asar: true,
  quiet: false,
  overwrite: true,
  icon: path.join(root, 'app', 'static', 'images', 'hidrogen.ico'),
  electronVersion: '5.0.2',
  tmpdir: false,
  win32metadata: {
    CompanyName: 'Hidrogen',
    FileDescription: 'Steam will surrender',
    ProductName: 'Hidrogen'
  }
}

const copyDependencies = () => {
  const package = require(path.join(root, 'package.json'))

  if (process.env.NODE_ENV === 'production') {
    delete package.devDependencies
  }

  package.main = './main.js'
  delete package.scripts
  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(package))

  const indexHtml = path.resolve(root, 'app', 'static', 'index.html')
  fs.copyFileSync(indexHtml, path.join(outDir, 'index.html'))

  fs.removeSync(path.join(outDir, 'node_modules'))
  execSync('npm install', { cwd: outDir, env: process.env })
}

const build = async () => {
  try {
    await packager(buildOptions)
    console.log(chalk.green('\nHidrogen was successfully built! :D'))
  } catch (err) {
    console.log(chalk.red('Oh no, something went wrong:\n'))
    console.log(chalk.red(err))
    process.exit(1)
  }
}

console.log(chalk.cyan('Removing old build...'))
fs.removeSync(distDir)

console.log(chalk.cyan('Copying dependencies...'))
copyDependencies()

console.log(chalk.cyan('Building...'))
build()