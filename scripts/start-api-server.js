process.env.DEBUG = 'bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')

startHFServer({
  uiDBPath: `${__dirname}/../db/ui.json`,
  algoDBPath: `${__dirname}/../db/algos.json`,

  // Data servers are started by individual scripts
  hfBitfinexDBPath: `${__dirname}/../db/hf-bitfinex.json`,
  hfBinanceDBPath: `${__dirname}/../db/hf-binance.json`,
})
