'use strict'

process.env.DEBUG = 'dtc:*'

require('dotenv').config()

const debug = require('debug')('dtc:exec:binance-market-sync-worker')
const worker = require('workers/market_data_sync/binance')

debug('starting')

try {
  worker()
} catch (e) {
  debug('error: %s', e.message)
}
