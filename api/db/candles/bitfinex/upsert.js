'use strict'

const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/bitfinex/util/tf_to_string')
const upsert = require('db/pg/upsert')

module.exports = async (symbol, tf, c) => {
  return dbRL(async (db) => {
    return upsert({
      db,
      path: `bitfinex_candles_${tfToString(tf)}`,
      index: 'key',
      indexMatches: ['key'],
      doc: {
        symbol,
        mts: `${c.mts}`,
        open: `${c.open}`,
        close: `${c.close}`,
        high: `${c.high}`,
        low: `${c.low}`,
        volume: `${c.volume}`,
        key: `${symbol}-${c.mts}`
      }
    })
  })
}
