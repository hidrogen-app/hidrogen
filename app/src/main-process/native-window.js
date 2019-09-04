const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
const { BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const chalk = require('chalk')

const options = {
  width: 1450,
  height: 800,
  show: false,
  frame: false,
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false
  }
}

const localhost = 'http://localhost:3030/'
const productionDir = path.join(__dirname, '..', '..', 'build', 'index.html')

module.exports =
class NativeWindow extends BrowserWindow {
  constructor (args) {
    super(options)

    if (process.env.NODE_ENV === 'development') {
      this.installAdditionalDevTools()
      this.loadURL(localhost)
    } else {
      this.loadURL(url.format({
        protocol: 'file',
        pathname: 'index.html',
        slashes: true
      }))
    }

    

    /* if (args.dev) {
      this.installAdditionalDevTools()
      this.loadURL(localhost)
    } else {
      this.loadFile(productionDir)
    } */

    this.subscribeToEvents()
  }

  installAdditionalDevTools () {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(chalk.cyan(`Added DevTools extension: ${name}`)))
      .catch(err => console.log(chalk.red(`An error ocurred: ${err}`)))
  }

  subscribeToEvents () {
    this.on('ready-to-show', () => this.show())
  }

  sendToRenderer (channel, message) {
    this.webContents.send(channel) 
  }


}