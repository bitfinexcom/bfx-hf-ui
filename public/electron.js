const { app } = require('electron')
const HFUIApplication = require('./lib/app')
const registerFileURLHandler = require('./util/register_file_handler')
const launchScripts = require('./lib/launch_scripts')
const killApp = require('./lib/kill_app')

const SCRIPT_NAMES = ['start-ds-bitfinex.js', 'start-api-server.js']
const scripts = launchScripts(SCRIPT_NAMES)

// TODO: Move this into DB/add ability to modify from UI
const MAX_WINDOWS = 6

const HFUI = new HFUIApplication({ maxWindows: MAX_WINDOWS })

app.whenReady().then(() => {
  registerFileURLHandler()

  HFUI.openWindow()
}).catch((e) => {
  console.error(`HF UI failed to start: ${e.stack}`)

  killApp(scripts)
})

app.on('window-all-closed', () => {
  console.info('clean exit')

  killApp(scripts)
})
