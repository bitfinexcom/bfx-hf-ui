'use strict'

process.env.DEBUG = 'dtc:api*,bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const fs = require('fs')
const https = require('https')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const debug = require('debug')('dtc:api:service:ws')
const APIWSServer = require('ws_servers/api')
const { CrispStatusReporter } = require('crisp-status-reporter')

const {
  WSS_API_PORT, WSS_SSL, WSS_SSL_CERT, WSS_SSL_KEY, HF_DS_BITFINEX_URL,
  HF_DS_BINANCE_URL, HF_DS_KRAKEN_URL, EX_POOL_URL, ALGO_SERVER_URL,
  CRISP_TOKEN, CRISP_SERVICE_ID_WS_SERVER, CRISP_NODE_ID_WS_SERVER,
  CRISP_REPLICA_ID, CRISP_ENABLED,
} = process.env

if (cluster.isMaster) {
  debug('master ws cluster service running')

  if (+CRISP_ENABLED === 1) {
    debug('starting crisp reporter')

    const crispStatusReporter = new CrispStatusReporter({
      token: CRISP_TOKEN,
      service_id: CRISP_SERVICE_ID_WS_SERVER,
      node_id: CRISP_NODE_ID_WS_SERVER,
      replica_id: CRISP_REPLICA_ID,
      interval: 30,
    })

    process.on('exit', () => crispStatusReporter.end())
  }

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork()
  }
} else {
  const wssOpts = {}

  if (WSS_SSL !== 'true') {
    wssOpts.port = WSS_API_PORT
  } else {
    const cert = fs.readFileSync(WSS_SSL_CERT, 'utf8')
    const key = fs.readFileSync(WSS_SSL_KEY, 'utf8')
    const server = https.createServer({ key, cert })

    server.listen(WSS_API_PORT)
    wssOpts.server = server
  }

  const api = new APIWSServer({
    ...wssOpts,

    exPoolURL: EX_POOL_URL,
    algoServerURL: ALGO_SERVER_URL,
    hfDSBitfinexURL: HF_DS_BITFINEX_URL,
    hfDSBinanceURL: HF_DS_BINANCE_URL,
    hfDSKrakenURL: HF_DS_KRAKEN_URL
  })

  api.open()
}
