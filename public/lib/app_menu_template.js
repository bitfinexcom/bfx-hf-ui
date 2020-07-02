const { app } = require('electron')
const open = require('open')

/* @todo decide shortcuts */
const APP_MENU_TEMPLATE = HFUI => {
  const windowIndex = HFUI.getOpenWindowCount()

  return [{
    label: 'Application',
    submenu: [{
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.quit()
      },
    }],
  }, {
    label: 'Window',
    submenu: [{
      label: 'Open New Window',
      click: () => HFUI.openWindow()
    }, {
      label: 'Close Window',
      click: () => HFUI.closeWindow(windowIndex)
    }]
  }, {
    label: 'Edit',
    submenu: [
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
  }]
}

module.exports = APP_MENU_TEMPLATE
