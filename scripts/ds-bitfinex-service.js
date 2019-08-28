'use strict'

process.env.DEBUG = 'dtc:*,bfx:*'

require('bfx-hf-util/lib/catch_uncaught_errors')
require('dotenv').config()

const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const HFDB = require('bfx-hf-models')
const HFDBSQLAdapter = require('bfx-hf-models-adapter-sql')
const { schema: HFDBBitfinexSchema } = require('bfx-hf-ext-plugin-bitfinex')
const debug = require('debug')('dtc:api:service:ds-bitfinex')

const DataServer = require('bfx-hf-data-server')

const { PSQL_CONNECTION, HF_DS_BITFINEX_PORT } = process.env

if (cluster.isMaster) {
  debug('master bitfinex data server cluster service running')

  for (let i = 0; i < Math.max(4, numCPUs); i += 1) {
    cluster.fork()
  }
} else {
  const db = new HFDB({
    schema: HFDBBitfinexSchema,
    adapter: HFDBSQLAdapter({
      connection: PSQL_CONNECTION,
      clientType: 'pg'
    })
  })

  debug('starting data server on port %s', HF_DS_BITFINEX_PORT)

  const ds = new DataServer({
    port: HF_DS_BITFINEX_PORT,
    db
  })

  ds.open()
}
