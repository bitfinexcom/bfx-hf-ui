'use strict'

const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/binance/util/tf_to_string')

module.exports = async (symbol, tf) => {
  return dbRL(async (db) => {
    return db(`binance_candles_${tfToString(tf)}`)
      .where('symbol', symbol)
      .orderBy('mts', 'desc')
      .first('*')
  })
}
