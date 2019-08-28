'use strict'

process.env.DEBUG = 'dtc:api*,bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const AlgoServer = require('ws_servers/algos')
const { ALGO_SERVER_PORT, PSQL_CONNECTION } = process.env

const as = new AlgoServer({
  port: ALGO_SERVER_PORT,
  hfPSQLConnectionURL: PSQL_CONNECTION
})

as.open()
