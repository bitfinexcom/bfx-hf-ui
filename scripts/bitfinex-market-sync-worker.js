'use strict'

process.env.DEBUG = 'dtc:*,bfx:hf:*'

require('dotenv').config()
require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('dtc:exec:bitfinex-market-sync-worker')
const worker = require('workers/market_data_sync/bitfinex')

debug('starting')

try {
  worker()
} catch (e) {
  debug('error: %s', e.message)
}
