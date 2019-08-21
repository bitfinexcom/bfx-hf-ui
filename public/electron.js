const {
  app, BrowserWindow, protocol, Menu, shell
} = require('electron')
const path = require('path')
const url = require('url')

const env = {
  ...process.env,
  ELECTRON_VERSION: process.versions.electron,
}

let mainWindow

const intercept = require('intercept-stdout')
const fs = require('fs')
const server = require('../scripts/start-server') // run server

const unhook_intercept = intercept((txt) => {
  fs.appendFile(`${__dirname }/logs.log`, txt, (err, res) => {})
})

const isExternalURL = url => url.startsWith('http:') || url.startsWith('https:')

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(url.format({
    pathname: 'index.html',
    protocol: 'file',
    slashes: true,
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7) /* all urls start with 'file://' */
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (err) => {
    if (err) console.error('Failed to register protocol')
  })
  const template = [{
    label: 'Application',
    submenu: [
      { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click() { app.quit() } },
    ],
  }, {
    label: 'Edit',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click() {
          app.quit()
          app.relaunch()
        },
      },
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      { label: 'Open Dev Tools', accelerator: 'CmdOrCtrl+Shift+I', click() {
         mainWindow.webContents.openDevTools() 
      } }
    ],
  },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  createWindow()
  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault()
    if (isExternalURL(url)) {
      shell.openExternal(url)
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    unhook_intercept()
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
