const fs = require('fs')
const path = require('path')

module.exports = (app) => {
  const filePath = path.resolve(
    app.getPath('home'),
    '.bitfinexhoney',
    'ui.json',
  )

  const settingsObject = JSON.parse(
    fs.readFileSync(filePath, { encoding: 'utf-8' }),
  )?.user_settings?.userSettings

  return settingsObject
}
