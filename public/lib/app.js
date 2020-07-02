const openWindow = require('./open_window')

const DEFAULT_MAX_WINDOWS = 6

/* @todo add proper logging */
class HFUIApplication {
  constructor(config = {}) {
    const { maxOpenWindows = DEFAULT_MAX_WINDOWS } = config

    this.config = config
    this.openWindows = 0
    this.maxOpenWindows = maxOpenWindows
    this.windows = []
  }

  getOpenWindowCount() {
    return this.openWindows
  }

  closeWindow(windowIndex) {
    if (windowIndex > this.windows.length) {
      console.error(`Tried to close unknown window ${windowIndex}`)
    }

    const win = this.windows[windowIndex]

    if (win) {
      win.close()
    } else {
      console.error(`Window ${windowIndex} not found`)
    }
  }

  openWindow(options = {}) {
    if (this.openWindows >= this.maxOpenWindows) {
      return
    }

    const win = openWindow(this, options)

    win.on('closed', this.onWindowClosed)

    this.windows.push(win)
  }

  onWindowClosed = () => {
    this.openWindows -= 1
  }
}

module.exports = HFUIApplication
