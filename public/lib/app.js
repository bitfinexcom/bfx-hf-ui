const url = require('url')
const path = require('path')
const _omit = require('lodash/omit')
const _includes = require('lodash/includes')
const {
  BrowserWindow, protocol, Menu, shell, ipcMain, session,
} = require('electron') // eslint-disable-line

const appMenuTemplate = require('./app_menu_template')

module.exports = class HFUIApplication {
  static createWindow() {
    const win = new BrowserWindow({
      width: 1500,
      height: 850,
      icon: path.resolve(__dirname, '../icon.png'),
      show: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })

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
    this.onActivate = this.onActivate.bind(this)
    this.onAllWindowsClosed = this.onAllWindowsClosed.bind(this)
    this.onMainWindowClosed = this.onMainWindowClosed.bind(this)

    // increase memory size
    app.commandLine.appendSwitch('js-flags', '--max-old-space-size=2048')
    app.on('ready', this.onReady)
    app.on('window-all-closed', this.onAllWindowsClosed)
    app.on('activate', this.onActivate)
  }

  spawnMainWindow() {
    if (this.mainWindow !== null) {
      return
    }

    this.mainWindow = HFUIApplication.createWindow()
    this.mainWindow.on('closed', this.onMainWindowClosed)
    this.mainWindow.on('close', (e) => {
      if (this.mainWindow !== null) {
        e.preventDefault()
        this.mainWindow.webContents.send('app-close')
      }
    })
    this.mainWindow.webContents.on('new-window', this.handleURLRedirect)

    ipcMain.on('app-closed', () => {
      this.mainWindow.removeAllListeners('close')
      this.mainWindow.close()
    })
  }

  handleURLRedirect(event, url) {
    event.preventDefault()
    shell.openExternal(url)
  }

  onReady() {

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      let responseHeaders = { ...details.responseHeaders }

      // for chart-iframe ignore CSP error
      const chartUrl = 'https://hchart.bitfinex.com'
      if(details?.url && _includes(details.url, chartUrl)) {
        responseHeaders = _omit(details.responseHeaders, 'content-security-policy')
      }

      callback({
        responseHeaders,
      })
    })

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

  onActivate() {
    this.spawnMainWindow()
  }

  onMainWindowClosed() {
    this.mainWindow = null
  }

  onAllWindowsClosed() {
    this.onExitCB()
    this.app.quit()
  }
}
