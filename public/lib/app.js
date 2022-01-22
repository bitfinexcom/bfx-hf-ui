const url = require('url')
const path = require('path')
const {
  BrowserWindow, protocol, Menu, shell, ipcMain,
} = require('electron') // eslint-disable-line
const logger = require('electron-log')

const appMenuTemplate = require('./app_menu_template')

const { autoUpdater } = require('electron-updater')
autoUpdater.logger = logger
autoUpdater.logger["transports"].file.level = "info"

// @TODO: set back 30 min
const CHECK_APP_UPDATES_EVERY_MS = 2 * 60 * 1000 // 30 min
let appUpdatesIntervalRef = null

module.exports = class HFUIApplication {
  static createWindow() {
    const win = new BrowserWindow({
      width: 1500,
      height: 850,
      icon: path.resolve(__dirname, '../icon.png'),
      show: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
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

    this.mainWindow.once('ready-to-show', () => {
      // @TODO: hide updates for mac, until code-signing support is added
      // if (process.platform !== 'darwin') {
      autoUpdater.checkForUpdatesAndNotify();
      appUpdatesIntervalRef = setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify();
      }, CHECK_APP_UPDATES_EVERY_MS);
      // }
    });

    this.mainWindow.webContents.on('new-window', this.handleURLRedirect)

    ipcMain.on('app-closed', () => {
      if(appUpdatesIntervalRef) {
        clearInterval(appUpdatesIntervalRef)
      }
      this.mainWindow.removeAllListeners('close')
      this.mainWindow.close()
    })

    ipcMain.on('restart_app', () => {
      autoUpdater.quitAndInstall();
      this.app.exit();
    });

    ipcMain.on('clear_app_update_timer', () => {
      if(appUpdatesIntervalRef) {
        clearInterval(appUpdatesIntervalRef)
      }
    });

    autoUpdater.on('update-available', () => {
      this.mainWindow.webContents.send('update_available');
    });

    autoUpdater.on('update-downloaded', () => {
      this.mainWindow.webContents.send('update_downloaded');
    });
  }

  handleURLRedirect(event, url) {
    event.preventDefault()
    shell.openExternal(url)
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
