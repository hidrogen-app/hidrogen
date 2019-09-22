const { remote } = window.require('electron')

export class NativeWindowController {
  constructor () {
    this.browserWindow = remote.getCurrentWindow()
  }

  minimize = () => {
    this.browserWindow.minimize()
  }

  maximize = () => {
    this.browserWindow.maximize()
  }

  restore = () => {
    this.browserWindow.restore()
  }

  toggle = () => {
    if (this.browserWindow.isMaximized()) {
      this.restore()
    } else {
      this.maximize()
    }
  }

  close = () => {
    // remote.app.quit()
    this.browserWindow.close()
  }
}

