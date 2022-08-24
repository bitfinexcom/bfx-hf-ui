const fs = require('fs')
const os = require('os')
const path = require('path')

module.exports = () => {
  const filePath = path.resolve(
    os.homedir(),
    '.bitfinexhoney',
    'ui.json',
  )

  const settingsObject = JSON.parse(
    fs.readFileSync(filePath, { encoding: 'utf-8' }),
  )?.user_settings?.userSettings

  return settingsObject
}
