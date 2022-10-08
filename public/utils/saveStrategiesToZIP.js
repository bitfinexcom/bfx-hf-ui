const { dialog } = require('electron')
const path = require('path')
const AdmZip = require('adm-zip')

module.exports = (app, mainWindow, strategies) => {
  const savePath = dialog.showSaveDialogSync(mainWindow, {
    title: 'Export strategies to...',
    message: 'Export strategies to...',
    defaultPath: path.join(
      app.getPath('downloads'),
      'BitfinexHoney_strategies.zip',
    ),
  })

  if (!savePath) {
    mainWindow.webContents.send('app_save_all_strategies.result', {
      isSuccess: false,
    })
    return
  }

  const zip = new AdmZip()

  strategies.forEach((strategy) => {
    const filename = `${strategy.label}_${new Date(strategy.savedTs)
      .toLocaleString()}.json`.replace(/\//g, '_')

    zip.addFile(filename, Buffer.from(JSON.stringify(strategy)), 'utf-8')
  })

  zip
    .writeZipPromise(savePath)
    .then(() => {
      mainWindow.webContents.send('app_save_all_strategies.result', {
        isSuccess: true,
      })
    })
    .catch(() => mainWindow.webContents.send('app_save_all_strategies.result', {
      isSuccess: false,
    }))
}
