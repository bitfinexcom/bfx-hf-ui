'use strict'

const path = require('path')
const fs = require('fs')
const { spawn } = require('child_process')
const { MacUpdater } = require('electron-updater')
const extract = require('extract-zip')

const { rootPath: appDir } = require('electron-root-path')
const logger = require('electron-log')
class BfxMacUpdater extends MacUpdater {
  constructor (...args) {
    super(...args)

    this.quitAndInstallCalled = false
    this.quitHandlerAdded = false

    this.EVENT_INSTALLING_UPDATE = 'EVENT_INSTALLING_UPDATE'

    this.installingUpdateEventHandlers = []
    this._logger === logger
  }

  setDownloadedFilePath (downloadedFilePath) {
    this.downloadedFilePath = downloadedFilePath
  }

  getDownloadedFilePath () {
    return this.downloadedFilePath
  }

  addInstallingUpdateEventHandler (handler) {
    this.installingUpdateEventHandlers.push(handler)
  }

  async install (isSilent, isForceRunAfter) {
    try {
      if (this.quitAndInstallCalled) {
        return false
      }

      this.quitAndInstallCalled = true

      if (!isSilent) {
        await this.dispatchInstallingUpdate()
      }

      const downloadedFilePath = this.getDownloadedFilePath()

      const root = path.join(appDir, '../../..')
      const dist = path.join(root, '..')
      const productName = 'The Honey Framework'
      const exec = path.join(root, 'Contents/MacOS/' + productName)

      await fs.promises.rmdir(root, { recursive: true, force: true })


      await extract(
        downloadedFilePath,
        {
          dir: dist,
          defaultDirMode: '0o777',
          defaultFileMode: '0o777'
        }
      )

      if (!isForceRunAfter) {
        return true
      }

      spawn(exec, [], {
        detached: true,
        stdio: 'ignore',
        env: {
          ...process.env
        }
      }).unref()
      return true
    } catch (err) {
      // this.dispatchError(err)

      return false
    }
  }

  async asyncQuitAndInstall (isSilent, isForceRunAfter) {
    const isInstalled = await this.install(
      isSilent,
      isSilent
        ? isForceRunAfter
        : true
    )

    if (isInstalled) {
      setImmediate(() => this.app.quit())

      return
    }

    this.quitAndInstallCalled = false
  }

  quitAndInstall (...args) {
    const downloadedFilePath = this.getDownloadedFilePath()

    if (!fs.existsSync(downloadedFilePath)) {
      return
    }
    if (path.extname(downloadedFilePath) !== '.zip') {
      return super.quitAndInstall(...args)
    }

    return this.asyncQuitAndInstall(...args)
  }

  async dispatchInstallingUpdate () {
    this.emit(this.EVENT_INSTALLING_UPDATE)

    for (const handler of this.installingUpdateEventHandlers) {
      if (typeof handler !== 'function') {
        return
      }

      await handler()
    }
  }

  dispatchUpdateDownloaded (...args) {
    super.dispatchUpdateDownloaded(...args)

    this.addQuitHandler()
  }

  addQuitHandler () {
    if (
      this.quitHandlerAdded ||
      !this.autoInstallOnAppQuit
    ) {
      return
    }

    this.quitHandlerAdded = true

    this.app.onQuit((exitCode) => {
      if (exitCode === 0) {
        return
      }

    })

    // Need to use this.app.app prop due this.app is ElectronAppAdapter
    this.app.app.once('will-quit', (e) => {
      if (this.quitAndInstallCalled) {
        return
      }

      e.preventDefault()
      this.install(true, true).then((isInstalled) => {
        if (isInstalled) {
          setImmediate(() => this.app.quit())

          return
        }

        setImmediate(() => this.app.app.exit(1))
      })
    })
  }
}

module.exports = BfxMacUpdater
