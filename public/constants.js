const os = require('os')

const LOG_PATH = `${os.tmpdir()}/bfx-hf-ui-logs`
const LOG_PATH_DS_BITFINEX = `${LOG_PATH}/ds-bitfinex-server.log`
const LOG_PATH_API_SERVER = `${LOG_PATH}/api-server.log`

const SCRIPT_PATH = `${__dirname}/../scripts`
const SCRIPT_PATH_DS_BITFINEX = `${SCRIPT_PATH}/start-ds-bitfinex.js`
const SCRIPT_PATH_API_SERVER = `${SCRIPT_PATH}/start-api-server.js`

const LOCAL_STORE_CWD = `${os.homedir()}/.bitfinexhoney`

module.exports = {
  LOG_PATH,
  LOG_PATH_DS_BITFINEX,
  LOG_PATH_API_SERVER,
  SCRIPT_PATH,
  SCRIPT_PATH_DS_BITFINEX,
  SCRIPT_PATH_API_SERVER,
  LOCAL_STORE_CWD,
}
