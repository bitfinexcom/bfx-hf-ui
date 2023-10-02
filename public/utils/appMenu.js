const { Menu, shell } = require('electron')
const os = require('os')
const url = require('url')
// const { app } = require('electron')

const {
  LOG_PATH,
  LOG_PATH_DS_BITFINEX,
  LOG_PATH_API_SERVER,
} = require('../constants')

const RC_KEYWORD = '-rc'
const isElectronDebugMode = process.env.REACT_APP_ELECTRON_DEBUG === 'true'

const DEBUG_MENU = [
  {
    label: 'Toggle Developer Tools',
    accelerator: (function getKeys() {
      const platform = os.platform()
      if (platform === 'darwin') {
        return 'Alt+Command+I'
      }
      return 'Ctrl+Shift+I'
    }()),
    click(item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    },
  },
  {
    label: 'Reload',
    accelerator: 'Command+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.webContents.loadURL(
          url.format({
            pathname: 'index.html',
            protocol: 'file',
            slashes: true,
          }),
        )
      }
    },
  },
  {
    label: 'Pendo Visual Design Studio',
    click: async (_, focusedWindow) => {
      if (focusedWindow) {
        await focusedWindow.webContents.executeJavaScript(
          'window.pendo?.designerv2.launchInAppDesigner()',
        )
      }
    },
  },
]

const getTemplate = ({ app, sendOpenSettingsModalMessage }) => {
  const appVersion = app.getVersion()
  const isRCMode = appVersion && appVersion.includes(RC_KEYWORD)

  return [
    {
      label: 'Application',
      submenu: [
        {
          label: 'Open settings',
          click: sendOpenSettingsModalMessage,
        },
        {
          label: 'Toggle fullscreen',
          role: 'togglefullscreen',
          accelerator: (function getKeys() {
            const platform = os.platform()
            if (platform === 'darwin') {
              return 'Cmd+F11'
            }
            return 'F11'
          }()),
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      label: 'Diagnostics',
      submenu: [
        {
          label: 'Open Logs Folder',
          click: () => {
            shell.openPath(LOG_PATH).catch((e) => {
              console.error(`failed to open logs folder: ${e.message}`)
            })
          },
        },
        {
          label: 'Open Data Server Log',
          click: () => {
            shell.openPath(LOG_PATH_DS_BITFINEX).catch((e) => {
              console.error(
                `failed to open data server log file: ${e.message}`,
              )
            })
          },
        },
        {
          label: 'Open API Server Log',
          click: () => {
            shell.openPath(LOG_PATH_API_SERVER).catch((e) => {
              console.error(`failed to open api server log file: ${e.message}`)
            })
          },
        },
        ...(isRCMode || isElectronDebugMode ? DEBUG_MENU : []),
      ],
    },
  ]
}

const createAppMenu = (params) => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(getTemplate(params)))
}

module.exports = {
  createAppMenu,
}
