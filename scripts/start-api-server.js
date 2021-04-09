process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')
const os = require('os')

const dir = `${os.homedir()}/.honeyframework`

startHFServer({
  uiDBPath: `${dir}/ui.json`,
  algoDBPath: `${dir}/algos.json`,

  bfxWSURL: 'wss://api.staging.bitfinex.com/ws/2',
  bfxRestURL: 'https://api.staging.bitfinex.com',

  // Data servers are started by individual scripts
  // hfBitfinexDBPath: `${__dirname}/db/hf-bitfinex.json`,
})
