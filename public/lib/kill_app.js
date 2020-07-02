const { app } = require('electron')
const _map = require('lodash/map')

const killApp = (scripts = []) => {
  _map(scripts, 'kill')

  if (process.platform !== 'darwin') {
    app.quit()
  }
}

module.exports = killApp
