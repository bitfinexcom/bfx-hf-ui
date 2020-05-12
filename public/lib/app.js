const url = require('url')
const path = require('path')
const {
  BrowserWindow, protocol, Menu,
} = require('electron') // eslint-disable-line

const appMenuTemplate = require('./app_menu_template')

module.exports = class HFUIApplication {
  static createWindow() {
    const win = new BrowserWindow({ width: 1280, height: 720 })

    win.loadURL(url.format({
      pathname: 'index.html',
      protocol: 'file',
      slashes: true,
    }))

    return win
  }

  constructor({ app, onExit }) {
    this.mainWindow = null
    this.onExitCB = onExit
    this.app = app

    this.onReady = this.onReady.bind(this)
    this.onAllWindowsClosed = this.onAllWindowsClosed.bind(this)
    this.onMainWindowClosed = this.onMainWindowClosed.bind(this)

    app.on('ready', this.onReady)
    app.on('window-all-closed', this.onAllWindowsClosed)
  }

  spawnMainWindow() {
    if (this.mainWindow !== null) {
      return
    }

    this.mainWindow = HFUIApplication.createWindow()
    this.mainWindow.on('closed', this.onMainWindowClosed)
  }

  onReady() {
    protocol.interceptFileProtocol('file', (request, callback) => {
      const fileURL = request.url.substr(7) // all urls start with 'file://'
      callback({ path: path.normalize(`${__dirname}/../${fileURL}`) })
    }, (err) => {
      if (err) {
        console.error('Failed to register protocol')
      }
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(appMenuTemplate(this.app)))

    this.spawnMainWindow()
  }

  onMainWindowClosed() {
    this.mainWindow = null
  }

  onAllWindowsClosed() {
    if (process.platform !== 'darwin') {
      this.app.quit()
    }

    if (this.onExitCB) {
      this.onExitCB()
    }
  }
}
