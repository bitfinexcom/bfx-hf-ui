process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')
const os = require('os')

startHFServer({
  uiDBPath: `${os.homedir()}/.hfdb/ui.json`,
  algoDBPath: `${os.homedir()}/.hfdb/algos.json`,
  // Data servers are started by individual scripts
  hfBitfinexDBPath: `${os.homedir()}/.hfdb/hf-bitfinex.json`,
  hfBinanceDBPath: `${os.homedir()}/.hfdb/hf-binance.json`,
})
