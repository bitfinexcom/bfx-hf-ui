const {
  app, BrowserWindow, protocol, Menu,
} = require('electron')

const path = require('path')
const url = require('url')

/*
const server = require('../scripts/start-server') // run server

const env = {
  ...process.env,
  ELECTRON_VERSION: process.versions.electron,
}
*/

let mainWindow

const intercept = require('intercept-stdout')
const fs = require('fs')

const unhookIntercept = intercept((txt) => {
  fs.appendFile(`${__dirname}/logs.log`, txt)
})

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
    const fileURL = request.url.substr(7) /* all urls start with 'file://' */

    callback({ path: path.normalize(`${__dirname}/${fileURL}`) })
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
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
    ],
  },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    unhookIntercept()
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
