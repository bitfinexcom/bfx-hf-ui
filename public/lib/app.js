const url = require('url')
const path = require('path')
const {
  BrowserWindow, protocol, Menu, shell, ipcMain,
} = require('electron') // eslint-disable-line
const { autoUpdater } = require('electron-updater')
const logger = require("electron-log")

autoUpdater.logger = logger
autoUpdater.logger["transports"].file.level = "info"

const appMenuTemplate = require('./app_menu_template')

// TODO: set 30 min
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

    this.mainWindow.once('ready-to-show', () => {
      logger.log('ready-to-show: ');
      // if (process.platform !== 'darwin') {
      appUpdatesIntervalRef = setInterval(() => {
        logger.log('checking inside interval: ');
        autoUpdater.checkForUpdatesAndNotify();
      }, CHECK_APP_UPDATES_EVERY_MS);
      logger.info('appUpdatesIntervalRef: set: ', appUpdatesIntervalRef);
      // }
    });

    this.mainWindow.webContents.on('new-window', this.handleURLRedirect)

    ipcMain.on('app-closed', () => {
      logger.info('app-closed: ref: ', appUpdatesIntervalRef);
      clearInterval(appUpdatesIntervalRef)
      this.mainWindow.removeAllListeners('close')
      this.mainWindow.close()
    })

    ipcMain.on('restart_app', () => {
      autoUpdater.quitAndInstall();
      this.app.exit();
    });

    autoUpdater.on('update-available', () => {
      logger.info('update-available: ');
      this.mainWindow.webContents.send('update_available');
    });

    autoUpdater.on('update-downloaded', () => {
      logger.info('update-downloaded: ');
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
