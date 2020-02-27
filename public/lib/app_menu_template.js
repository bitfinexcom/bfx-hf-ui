const open = require('open')

module.exports = app => ([{
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
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
    { type: 'separator' },
    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
  ],
}, {
  label: 'Diagnostics',
  submenu: [{
    label: 'Open Logs Folder',
    click: () => {
      open(`${__dirname}/../../logs`).catch((e) => {
        console.error(`failed to open logs folder: ${e.message}`)
      })
    },
  }],
}])
