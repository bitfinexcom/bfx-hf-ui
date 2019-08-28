'use strict'

process.env.DEBUG = 'dtc:*,bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('dtc:exec:bitfinex-trade-statistics-worker')
const worker = require('workers/trade_statistics/bitfinex')
const capture = require('capture')

debug('running...')

const run = async () => {
  return worker()
}

try {
  run()
} catch (e) {
  capture.exception(e)
}
