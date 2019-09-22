// eslint-disable-next-line
// if (require('electron-squirrel-startup')) return
require('electron-squirrel-startup')

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const os = require('os').platform()
const { getLaunchArguments } = require('./cli')
const AutoUpdater = require('./auto-updater')
const NativeWindow = require('./native-window')
// const { log } = require('./log')

require('dotenv/config')

const args = getLaunchArguments(process.argv)
const startTime = Date.now()


let nativeWindow
// log('info', '[main] App is starting...')

const autoUpdater = new AutoUpdater(app.getVersion(), process.env.UPDATE_FEED_URL)
autoUpdater.initialize()
// log('info', '[main] Initializing autoUpdater...')

if (process.env.DISABLE_HARDWARE_ACCELERATION || args.disableHardwareAcceleration) {
  app.disableHardwareAcceleration()
}

app.on('ready', () => {
  nativeWindow = new NativeWindow()

  // log('info', '[main] App is ready!')

  autoUpdater.onUpdateDownloaded(() => nativeWindow.sendToRenderer('update-downloaded'))

  ipcMain.on('get-cli-args', () => {
    console.log('hit CLI Args')
    nativeWindow.sendToRenderer('retured-cli-args', args)
  })
})

app.on('activate', () => {
  if (nativeWindow === null) {
    nativeWindow = new NativeWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('quit-and-install-update', () => autoUpdater.quitAndInstall())

