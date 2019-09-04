const { EventEmitter } = require('events')
const { autoUpdater } = require('electron')

module.exports = class AutoUpdater extends EventEmitter {
  constructor (version, updateFeedURL) {
    super()
    this.version = version
    this.feedURL = updateFeedURL
  }

  initialize () {
    autoUpdater.on('error', (event, message) => { 
      console.log(message)
    })
    
    autoUpdater.setFeedURL({ url: 'https://drive.google.com/open?id=1bC2QXSq0-558LoVADilDhXBRI9F8z2iu' })
    autoUpdater.checkForUpdates()
  }

  onUpdateDownloaded(callback) {
    autoUpdater.on('update-downloaded', callback)
  }

  quitAndInstall() {
    autoUpdater.quitAndInstall()
  }
}