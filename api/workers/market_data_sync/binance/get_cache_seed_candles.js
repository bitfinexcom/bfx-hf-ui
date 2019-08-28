'use strict'

const _reverse = require('lodash/reverse')
const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/binance/util/tf_to_string')

module.exports = async (symbol, tf) => {
  const candles = await dbRL((db) => {
    return db(`binance_candles_${tfToString(tf)}`)
      .where('symbol', symbol)
      .orderBy('mts', 'desc')
      .limit(5000)
      .select('*')
  })

  return _reverse(candles)
}
