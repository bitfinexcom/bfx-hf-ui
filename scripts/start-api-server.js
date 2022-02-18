process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')
const os = require('os')

const dir = `${os.homedir()}/.honeyframework`

startHFServer({
  dataDir: dir,
  uiDBPath: `${dir}/ui.json`,
  algoDBPath: `${dir}/algos.json`,

  bfxWSURL: process.env.WS_URL,
  bfxRestURL: 'https://api.bitfinex.com/',
  bfxHostedWsUrl: process.env.HOSTED_WS_URL,

  // Data servers are started by individual scripts
  // hfBitfinexDBPath: `${__dirname}/db/hf-bitfinex.json`,
})
