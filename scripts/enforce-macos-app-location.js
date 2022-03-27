const { app, dialog } = require('electron')

const productName = 'The Honey Framework'
const {
  showLoadingWindow,
  hideLoadingWindow,
} = require('./change-loading-win-visibility-state')

module.exports = async () => {
  if (
    process.env.NODE_ENV === 'development1'
    || process.platform !== 'darwin'
  ) {
    return
  }
  if (app.isInApplicationsFolder()) {
    return
  }

  const clickedButtonIndex = dialog.showMessageBoxSync({
    type: 'error',
    message: 'Move to Applications folder?',
    detail: `${productName} must live in the Applications folder to be able to run correctly.`,
    buttons: [
      'Move to Applications folder',
      `Quit ${productName}`,
    ],
    defaultId: 0,
    cancelId: 1,
  })

  if (clickedButtonIndex === 1) {
    app.quit()

    return
  }

  await showLoadingWindow({
    description: 'Moving the app...',
    isRequiredToCloseAllWins: true,
    isIndeterminateMode: true,
  })

  app.moveToApplicationsFolder({
    conflictHandler: (conflict) => {
      if (conflict === 'existsAndRunning') {
        dialog.showMessageBoxSync({
          type: 'error',
          message: `Another version of ${productName} is currently running. Quit it, then launch this version of the app again.`,
          buttons: [
            'OK',
          ],
        })

        app.quit()
      }

      return true
    },
  })

  await hideLoadingWindow()
}
