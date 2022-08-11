process.env.DEBUG = 'bfx:hf:*'
process.env.DEBUG_TRACE = true

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const startHFServer = require('bfx-hf-server')
const os = require('os')
const { version } = require('../package.json')

const dir = `${os.homedir()}/.bitfinexhoney`

startHFServer({
  dataDir: dir,
  uiDBPath: `${dir}/ui.json`,
  algoDBPath: `${dir}/algos.json`,

  bfxWSURL: process.env.WS_URL,
  bfxRestURL: 'https://api.bitfinex.com/',
  bfxHostedWsUrl: process.env.HOSTED_WS_URL,
  strategyExecutionPath: `${dir}/strategy-executions.json`,

  bfxMetricsWsUrl: 'ws://localhost:9090',
  os: process.platform,
  releaseVersion: version,
  isRC: version.includes('rc'),

  // Data servers are started by individual scripts
  // hfBitfinexDBPath: `${__dirname}/db/hf-bitfinex.json`,
})
