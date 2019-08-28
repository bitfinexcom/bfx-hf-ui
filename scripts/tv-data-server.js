'use strict'

process.env.DEBUG = 'dtc:*'

require('dotenv').config()

const TVDataServer = require('tv_data_server')
const { TV_DATA_SERVER_PORT } = process.env

TVDataServer({
  port: TV_DATA_SERVER_PORT,
})
