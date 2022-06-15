const open = require('open')
const os = require('os')
const url = require('url')

const {
  LOG_PATH,
  LOG_PATH_DS_BITFINEX,
  LOG_PATH_API_SERVER,
} = require('../constants')

const RC_KEYWORD = '-rc'

const RC_MENUS = [
  {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      const platform = os.platform()
      if (platform === 'darwin') {
        return 'Alt+Command+I';
      }
      return 'Ctrl+Shift+I';
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools();
      }
    }
  },
  {
    label: 'Reload',
    accelerator: 'Command+R',
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.webContents.loadURL(url.format({
          pathname: 'index.html',
          protocol: 'file',
          slashes: true,
        }))
      }
    }
  }
]

module.exports = (app) => {
  const appVersion = process.env.npm_package_version
  const isRCMode = appVersion && appVersion.includes(RC_KEYWORD)

  return [
    {
      label: 'Application',
      submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit()
        },
      }],
    }, {
      label: 'Edit',
      submenu: [
        {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
        {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
        {type: 'separator'},
        {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
        {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
        {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
        {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'},
      ],
    }, {
      label: 'Diagnostics',
      submenu: [{
        label: 'Open Logs Folder',
        click: () => {
          open(LOG_PATH).catch((e) => {
            console.error(`failed to open logs folder: ${e.message}`)
          })
        },
      }, {
        label: 'Open Data Server Log',
        click: () => {
          open(LOG_PATH_DS_BITFINEX).catch((e) => {
            console.error(`failed to open data server log file: ${e.message}`)
          })
        },
      }, {
        label: 'Open API Server Log',
        click: () => {
          open(LOG_PATH_API_SERVER).catch((e) => {
            console.error(`failed to open api server log file: ${e.message}`)
          })
        },
      },
        ...(isRCMode ? RC_MENUS : []),
      ]
    }
  ]
}
