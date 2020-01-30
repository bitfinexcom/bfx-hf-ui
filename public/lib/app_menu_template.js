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
