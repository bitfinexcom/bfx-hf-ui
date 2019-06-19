const {
  app, BrowserWindow, protocol, Menu,
} = require('electron')
const path = require('path')
const url = require('url')
const { fork } = require('child_process')
const { clipboard } = require('electron')

const keyCodes = {
  V: 86,
}


const env = {
  ...process.env,
  ELECTRON_VERSION: process.versions.electron,
}
const serverPath = path.join(__dirname, '../scripts/start-server.js')
let ipc = null

const runServer = () => {
  ipc = fork(serverPath, [], {
    env,
    cwd: process.cwd(),
    silent: false,
  })
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

app.on('ready', () => {
  try {
    runServer()
  } catch (err) {
    return console.log(err)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
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
