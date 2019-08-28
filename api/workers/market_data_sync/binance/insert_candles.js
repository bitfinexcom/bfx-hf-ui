'use strict'

const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/binance/util/tf_to_string')

module.exports = async (symbol, tf, candles) => {
  return dbRL(async (db) => {
    return db.transaction(trx => {
      return db(`binance_candles_${tfToString(tf)}`)
        .insert(candles.map(c => ({
          symbol,
          mts: +c.openTime,
          open: `${c.open}`,
          close: `${c.close}`,
          high: `${c.high}`,
          low: `${c.low}`,
          volume: `${c.volume}`,
          key: `${symbol}-${c.openTime}`
        })))
        .transacting(trx)
        .then(trx.commit)
        .catch(trx.rollback)
    })
  })
}
