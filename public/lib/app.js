const url = require('url')
const path = require('path')
const {
  BrowserWindow,
  protocol,
  Menu,
  shell,
  ipcMain,
  Tray,
  nativeImage,
} = require('electron')
const { autoUpdater: _autoUpdater } = require('electron-updater')
const logger = require('electron-log')
const appMenuTemplate = require('./app_menu_template')
const trayMenuTemplate = require('./tray_menu_template')
const enforceMacOSAppLocation = require('../../scripts/enforce-macos-app-location')
const BfxMacUpdater = require('../../scripts/auto-updater/bfx.mac.updater')
const {
  showLoadingWindow,
  hideLoadingWindow,
} = require('../../scripts/change-loading-win-visibility-state')

const isElectronDebugMode = process.env.REACT_APP_ELECTRON_DEBUG === 'true'

let autoUpdater = _autoUpdater

if (process.platform === 'darwin') {
  autoUpdater = new BfxMacUpdater()
  autoUpdater.addInstallingUpdateEventHandler(() => {
    return showLoadingWindow({
      description: 'Updating...',
      isRequiredToCloseAllWins: true,
    })
  })
}

autoUpdater.allowPrerelease = false
autoUpdater.logger = logger
autoUpdater.logger.transports.file.level = 'info'

const CHECK_APP_UPDATES_EVERY_MS = 30 * 60 * 1000 // 30 min
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

    win.loadURL(
      url.format({
        pathname: 'index.html',
        protocol: 'file',
        slashes: true,
      }),
    )

    const img = nativeImage.createFromPath(
      path.resolve(__dirname, '../trayIcon.png'),
    )
    const tray = new Tray(img)
    tray.setContextMenu(Menu.buildFromTemplate(trayMenuTemplate(win)))

    return win
  }

  static handleURLRedirect(event, _url) {
    event.preventDefault()
    shell.openExternal(_url)
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
      autoUpdater.checkForUpdatesAndNotify()
      appUpdatesIntervalRef = setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify()
      }, CHECK_APP_UPDATES_EVERY_MS)
    })

    this.mainWindow.webContents.on(
      'new-window',
      HFUIApplication.handleURLRedirect,
    )

    ipcMain.on('app-closed', () => {
      if (appUpdatesIntervalRef) {
        clearInterval(appUpdatesIntervalRef)
      }
      if (this.mainWindow) {
        this.mainWindow.removeAllListeners('close')
        this.mainWindow.close()
      }
    })

    ipcMain.on('restart_app', () => {
      autoUpdater.quitAndInstall(false, true)
    })

    ipcMain.on('clear_app_update_timer', () => {
      if (appUpdatesIntervalRef) {
        clearInterval(appUpdatesIntervalRef)
      }
    })

    autoUpdater.on('update-available', () => {
      this.mainWindow.webContents.send('update_available')
    })

    autoUpdater.on('update-downloaded', (info) => {
      const { downloadedFile } = { ...info }
      if (autoUpdater instanceof BfxMacUpdater) {
        autoUpdater.setDownloadedFilePath(downloadedFile)
      }

      this.mainWindow.webContents.send('update_downloaded')
    })

    autoUpdater.on('error', async (err) => {
      try {
        // Skip error when can't get code signature on mac
        if (/Could not get code signature/gi.test(err.toString())) {
          return
        }

        await hideLoadingWindow({ isRequiredToShowMainWin: false })
      } catch (_err) {
        logger.error('autoUpdater error: ', _err)
      }
    })
  }

  async onReady() {
    protocol.interceptFileProtocol(
      'file',
      (request, callback) => {
        const fileURL = request.url.substr(7) // all urls start with 'file://'
        const pathfinal = path.normalize(`${__dirname}/../${fileURL}`)
        callback({ path: pathfinal })
      },
      (err) => {
        if (err) {
          logger.error('Failed to register protocol')
        }
      },
    )

    if (!isElectronDebugMode) {
      await enforceMacOSAppLocation()
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(appMenuTemplate(this.app)))

    this.spawnMainWindow()
  }

  async onActivate() {
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
