'use strict'

const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/bitfinex/util/tf_to_string')

module.exports = async (symbol, tf) => {
  return dbRL(async (db) => {
    return db(`bitfinex_candles_${tfToString(tf)}`)
      .where('symbol', symbol)
      .orderBy('mts', 'desc')
      .first('*')
  })
}
