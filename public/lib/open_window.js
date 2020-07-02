const { Menu, BrowserWindow } = require('electron')
const _defaultsDeep = require('lodash/defaultsDeep')
const appMenuTemplate = require('./app_menu_template')

const DEFAULT_WINDOW_OPTIONS = {
  // width: 1500,
  // height: 850,
  fullscreen: true,
  darkTheme: true,
  sandbox: true,
  webgl: true,
  safeDialogs: true,
  spellcheck: true,
  experimentalFeatures: true,
}

const openWindow = (HFUI, options = {}) => {
  const win = new BrowserWindow(_defaultsDeep(options, DEFAULT_WINDOW_OPTIONS))
  win.loadURL('file://index.html')

  /**
   * Sets whether the window menu bar should hide itself automatically. Once
   * set the menu bar will only show when users press the single Alt key.
   */
  win.setAutoHideMenuBar(true)

  /**
   * Prevents the window contents from being captured by other apps.
   */
  win.setContentProtection(true)

  /**
   * Sets whether the window should be visible on all workspaces.
   */
  win.setVisibleOnAllWorkspaces(true)

  win.setMenu(Menu.buildFromTemplate(appMenuTemplate(HFUI)))

  return win
}

module.exports = openWindow
