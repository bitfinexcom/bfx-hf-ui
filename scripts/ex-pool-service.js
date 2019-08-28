'use strict'

process.env.DEBUG = '*'

require('dotenv').config()

const ExchangePoolServer = require('ws_servers/ex_pool')
const { EX_POOL_PORT } = process.env

const s = new ExchangePoolServer({
  port: EX_POOL_PORT
})

s.open()
