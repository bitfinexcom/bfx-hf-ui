const { BrowserWindow, ipcMain } = require('electron')
const logger = require('electron-log')

const wins = require('./windows')
const {
  hideWindow,
  showWindow,
  centerWindow,
} = require('./helpers/manage-window')

let intervalMarker

const _closeAllWindows = () => {
  const _wins = BrowserWindow.getAllWindows()
    .filter((win) => win !== wins.loadingWindow)

  const promises = _wins.map((win) => hideWindow(win))

  return Promise.all(promises)
}

const _setParentWindow = (noParent) => {
  if (wins.loadingWindow.isFocused()) {
    return
  }

  const win = BrowserWindow.getFocusedWindow()

  if (
    noParent
    || Object.values(wins).every((w) => w !== win)
  ) {
    wins.loadingWindow.setParentWindow(null)

    return
  }

  wins.loadingWindow.setParentWindow(win)
}

const _runProgressLoader = (opts = {}) => {
  const {
    win = wins.loadingWindow,
    isIndeterminateMode = false,
  } = { ...opts }

  if (
    !win
    || typeof win !== 'object'
    || win.isDestroyed()
  ) {
    return
  }
  if (isIndeterminateMode) {
    // Change to indeterminate mode when progress > 1
    win.setProgressBar(2)

    return
  }

  const fps = 50
  const duration = 3000 // ms
  const interval = duration / fps // ms
  const step = 1 / (duration / interval)
  let progress = 0

  intervalMarker = setInterval(() => {
    if (progress >= 1) {
      progress = 0
    }

    progress += step

    if (
      !win
      || typeof win !== 'object'
      || win.isDestroyed()
    ) {
      clearInterval(intervalMarker)

      return
    }

    win.setProgressBar(progress)
  }, interval).unref()
}

const _stopProgressLoader = (
  win = wins.loadingWindow,
) => {
  clearInterval(intervalMarker)

  if (
    !win
    || typeof win !== 'object'
    || win.isDestroyed()
  ) {
    return
  }

  // Remove progress bar when progress < 0
  win.setProgressBar(-1)
}

const _setLoadingDescription = (win, description) => {
  return new Promise((resolve) => {
    try {
      if (
        !win
        || typeof win !== 'object'
        || win.isDestroyed()
        || typeof description !== 'string'
      ) {
        resolve()

        return
      }

      ipcMain.once('loading:description-ready', (event, err) => {
        if (err) {
          logger.error('loading:description-ready error: ', err)
        }

        resolve()
      })

      win.webContents.send(
        'loading:description',
        description,
      )
    } catch (err) {
      logger.error('_setLoadingDescription error: ', err)

      resolve()
    }
  })
}

const showLoadingWindow = async (opts = {}) => {

  try {
    const {
      description = '',
      isRequiredToCloseAllWins = false,
      isNotRunProgressLoaderRequired = false,
      isIndeterminateMode = false,
      noParent = false,
    } = { ...opts }

    if (isRequiredToCloseAllWins) {
      _closeAllWindows()
    }

    if (
      !wins.loadingWindow
      || typeof wins.loadingWindow !== 'object'
      || wins.loadingWindow.isDestroyed()
    ) {
      await require('./window-creators')
      .createLoadingWindow()
    }

    _setParentWindow(isRequiredToCloseAllWins || noParent)

    if (!isNotRunProgressLoaderRequired) {
      _runProgressLoader({ isIndeterminateMode })
    }

    await _setLoadingDescription(
      wins.loadingWindow,
      description,
    )

    if (wins.loadingWindow.isVisible()) {
      return
    }

    centerWindow(wins.loadingWindow)

    return showWindow(wins.loadingWindow)

  } catch (err) {
    logger.error('showLoadingWindow error: ', err)
  }
}

const hideLoadingWindow = async (opts = {}) => {
  const {
    isRequiredToShowMainWin = false,
  } = { ...opts }

  if (isRequiredToShowMainWin) {
    await showWindow(wins.mainWindow)
  }

  // need to empty description
  await _setLoadingDescription(
    wins.loadingWindow,
    '',
  )
  _stopProgressLoader()

  return hideWindow(wins.loadingWindow)
}

module.exports = {
  showLoadingWindow,
  hideLoadingWindow,
}
