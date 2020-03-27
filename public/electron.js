const { app } = require('electron') // eslint-disable-line
const fs = require('fs')
const os = require('os')
const path = require('path')
const { fork } = require('child_process')
const HFUIApplication = require('./lib/app')

const LOG_PATH = `${os.tmpdir()}`
const LOG_PATH_DS_BITFINEX = `${LOG_PATH}/ds-bitfinex-server.log`
const LOG_PATH_API_SERVER = `${LOG_PATH}/api-server.log`

const SCRIPT_PATH = `${__dirname}/../scripts`
const SCRIPT_PATH_DS_BITFINEX = `${SCRIPT_PATH}/start-ds-bitfinex.js`
const SCRIPT_PATH_API_SERVER = `${SCRIPT_PATH}/start-api-server.js`
const Store = require('electron-store')

const ui = new Store({
  cwd: `${os.homedir()}/.db`
})

const SCRIPT_SPAWN_OPTS = {
  env: { ELECTRON_RUN_AS_NODE: '1' },
}

const dsLogStream = fs.openSync(LOG_PATH_DS_BITFINEX, 'a')
const apiLogStream = fs.openSync(LOG_PATH_API_SERVER, 'a')

const childDSProcess = fork(path.resolve(SCRIPT_PATH_DS_BITFINEX), [], {
  ...SCRIPT_SPAWN_OPTS,
  stdio: [null, dsLogStream, dsLogStream, 'ipc'],
})

const childAPIProcess = fork(path.resolve(SCRIPT_PATH_API_SERVER), [], {
  ...SCRIPT_SPAWN_OPTS,
  stdio: [null, apiLogStream, apiLogStream, 'ipc'],
})

new HFUIApplication({ // eslint-disable-line
  app,
  onExit: () => {
    childAPIProcess.kill()
    childDSProcess.kill()
  },
})
