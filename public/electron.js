const { app, BrowserWindow, protocol } = require('electron')
const path = require('path')
const url = require('url')

require('../scripts/start-server') // run server

const env = {
  ...process.env,
  ELECTRON_VERSION: process.versions.electron,
}

let mainWindow

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
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
