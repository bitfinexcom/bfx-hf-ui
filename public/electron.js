const { app } = require('electron') // eslint-disable-line
const fs = require('fs')
const path = require('path')
const { fork } = require('child_process')
const HFUIApplication = require('./lib/app')
const {
  LOG_PATH,
  LOG_PATH_DS_BITFINEX,
  LOG_PATH_API_SERVER,
  SCRIPT_PATH_DS_BITFINEX,
  SCRIPT_PATH_API_SERVER,
  LOCAL_STORE_CWD
} = require('./constants')
const logger = require('electron-log')

const REQUIRED_PATHS = [LOCAL_STORE_CWD, LOG_PATH]

REQUIRED_PATHS.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
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
    childAPIProcess.kill('SIGKILL')
    childDSProcess.kill('SIGKILL')
  },
})
