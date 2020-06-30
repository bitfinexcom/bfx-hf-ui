process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')
const os = require('os')
const fs = require('fs')
var dir = `${os.homedir()}/.honeyframework`;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

startHFServer({
  uiDBPath: `${dir}/ui.json`,
  algoDBPath: `${dir}/algos.json`,
  // Data servers are started by individual scripts
  // hfBitfinexDBPath: `${__dirname}/db/hf-bitfinex.json`,
  // hfBinanceDBPath: `${__dirname}/db/hf-binance.json`,
})
