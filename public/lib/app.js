const url = require('url')
const path = require('path')
const {
  BrowserWindow, protocol, shell, ipcMain, dialog,
} = require('electron')
const {
  NsisUpdater,
  AppImageUpdater
} = require('electron-updater')
const logger = require('electron-log')
const enforceMacOSAppLocation = require('../../scripts/enforce-macos-app-location')
const BfxMacUpdater = require('../../scripts/auto-updater/bfx.mac.updater')
const {
  showLoadingWindow,
  hideLoadingWindow,
} = require('../../scripts/change-loading-win-visibility-state')
const { createAppMenu } = require('../utils/appMenu')
const { createAppTray } = require('../utils/tray')
const syncReadUserSettings = require('../utils/syncReadUserSettings')

const isElectronDebugMode = process.env.REACT_APP_ELECTRON_DEBUG === 'true'

const updaterOptions = {
  provider: 'github',
  owner: 'tarcisiozf',
  repo: 'bfx-hf-ui',
}

let autoUpdater

switch (process.platform) {
  case 'darwin': {
    autoUpdater = new BfxMacUpdater(updaterOptions)
    autoUpdater.addInstallingUpdateEventHandler(() => {
      return showLoadingWindow({
        description: 'Updating...',
        isRequiredToCloseAllWins: true,
      })
    })
    break
  }
  case 'win32': {
    autoUpdater = new NsisUpdater(updaterOptions)
    break
  }
  default: {
    autoUpdater = new AppImageUpdater(updaterOptions)
    break
  }
}

autoUpdater.allowPrerelease = false
autoUpdater.logger = logger
autoUpdater.logger.transports.file.level = 'info'
autoUpdater.autoDownload = false

const CHECK_APP_UPDATES_EVERY_MS = 30 * 60 * 1000 // 30 min
let appUpdatesIntervalRef = null
module.exports = class HFUIApplication {
  static createWindow() {
    const fullscreen = syncReadUserSettings()?.fullScreen

    const win = new BrowserWindow({
      width: 1500,
      height: 850,
      minHeight: 600,
      minWidth: 1200,
      icon: path.resolve(__dirname, '../icon.png'),
      show: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
      fullscreen,
    })

    win.loadURL(
      url.format({
        pathname: 'index.html',
        protocol: 'file',
        slashes: true,
      }),
    )

    return win
  }

  static handleURLRedirect(event, _url) {
    event.preventDefault()
    shell.openExternal(_url)
  }

  constructor({ app, onExit }) {
    this.mainWindow = null
    this.tray = null
    this.onExitCB = onExit
    this.app = app

    this.onReady = this.onReady.bind(this)
    this.onActivate = this.onActivate.bind(this)
    this.onAllWindowsClosed = this.onAllWindowsClosed.bind(this)
    this.onMainWindowClosed = this.onMainWindowClosed.bind(this)
    this.sendOpenSettingsModalMessage = this.sendOpenSettingsModalMessage.bind(this)

    const isLocked = app.requestSingleInstanceLock()

    if (!isLocked) {
      app.quit()
    } else {
      app.on('second-instance', () => {
        if (this.mainWindow) {
          this.mainWindow.show()
          this.mainWindow.focus()
          dialog.showErrorBox(
            'Bitfinex Honey',
            'Application has been already launched',
          )
        }
      })
    }

    // increase memory size
    app.commandLine.appendSwitch('js-flags', '--max-old-space-size=2048')
    app.on('ready', this.onReady)
    app.on('window-all-closed', this.onAllWindowsClosed)
    app.on('activate', this.onActivate)
    app.on('before-quit', () => {
      if (this.mainWindow) {
        this.mainWindow.removeAllListeners('close')
        this.mainWindow.close()
      }
    })
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

        const shouldHideOnClose = syncReadUserSettings()?.hideOnClose
        if (shouldHideOnClose) {
          this.mainWindow.hide()
        } else {
          this.mainWindow.webContents.send('app-close')
        }
      }
    })

    this.mainWindow.on('hide', () => {
      this.mainWindow.webContents.send('app_hidden')
      this.mainWindow.once('show', () => this.mainWindow.webContents.send('app_restored'))
    })

    this.mainWindow.once('ready-to-show', () => {
      autoUpdater.checkForUpdates()

      appUpdatesIntervalRef = setInterval(() => {
        autoUpdater.checkForUpdates()
      }, CHECK_APP_UPDATES_EVERY_MS)
    })

    this.mainWindow.webContents.on(
      'new-window',
      HFUIApplication.handleURLRedirect,
    )

    this.mainWindow.webContents.once('did-finish-load', () => {
      const isFullscreen = this.mainWindow.isFullScreen()

      if (isFullscreen) {
        this.mainWindow.webContents.send('app_fullscreen_changed', { fullscreen: true })
      }
    })

    this.mainWindow.on('enter-full-screen', () => {
      this.mainWindow.webContents.send('app_fullscreen_changed', { fullscreen: true })
    })

    this.mainWindow.on('leave-full-screen', () => {
      this.mainWindow.webContents.send('app_fullscreen_changed', { fullscreen: false })
    })

    ipcMain.on('app_should_restored', () => {
      this.mainWindow.show()
    })

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

    ipcMain.on('app_change_fullscreen', (_, { fullscreen }) => {
      this.mainWindow.setFullScreen(fullscreen)
    })

    ipcMain.on('download_update', () => {
      autoUpdater.downloadUpdate()
    })

    autoUpdater.on('update-available', (args) => {
      this.mainWindow.webContents.send('update_available', args)
    })

    autoUpdater.on('download-progress', (args) => {
      this.mainWindow.webContents.send('update_in_progress', args)
    })

    autoUpdater.on('update-downloaded', (info) => {
      const { downloadedFile } = { ...info }
      if (autoUpdater instanceof BfxMacUpdater) {
        autoUpdater.setDownloadedFilePath(downloadedFile)
      }

      this.mainWindow.webContents.send('update_downloaded', info)
    })

    autoUpdater.on('error', async (err) => {
      try {
        // Skip error when can't get code signature on mac
        if (/Could not get code signature/gi.test(err.toString())) {
          return
        }

        this.mainWindow.webContents.send('update_error')
        await hideLoadingWindow({ isRequiredToShowMainWin: false })
      } catch (_err) {
        logger.error('autoUpdater error: ', _err)
      }
    })
  }

  sendOpenSettingsModalMessage() {
    const isVisible = this.mainWindow.isVisible()
    if (!isVisible) {
      this.mainWindow.show()
    }
    this.mainWindow.webContents.send('open_settings')
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

    createAppMenu({
      app: this.app,
      sendOpenSettingsModalMessage: this.sendOpenSettingsModalMessage,
    })

    this.spawnMainWindow()

    this.tray = createAppTray({
      win: this.mainWindow,
      sendOpenSettingsModalMessage: this.sendOpenSettingsModalMessage,
    })
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
