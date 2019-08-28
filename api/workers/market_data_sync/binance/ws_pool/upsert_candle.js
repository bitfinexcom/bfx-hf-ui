'use strict'

const upsert = require('db/pg/upsert')
const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/binance/util/tf_to_string')

module.exports = async (symbol, tf, candle) => {
  return dbRL((db) => {
    return upsert({
      db,
      path: `binance_candles_${tfToString(tf)}`,
      index: 'key',
      indexMatches: ['key'],
      doc: {
        symbol,
        key: `${symbol}-${candle.mts}`,
        ...candle,
      },
    })
  })
}