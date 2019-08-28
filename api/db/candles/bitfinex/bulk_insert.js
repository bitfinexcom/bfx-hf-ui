'use strict'

const _chunk = require('lodash/chunk')
const PI = require('p-iteration')

const dbRL = require('db/pg_rate_limited')
const tfToString = require('exchange_clients/bitfinex/util/tf_to_string')

module.exports = async (symbol, tf, candles, transformed) => {
  return dbRL(async (db) => {
    return PI.forEachSeries(_chunk(candles, 1000), async (chunk) => {
      return db.transaction(trx => {
        return db(`bitfinex_candles_${tfToString(tf)}`)
          .insert(chunk.map(c => ({
            symbol,
            mts: `${transformed ? c.mts : c[0]}`,
            open: `${transformed ? c.open : c[1]}`,
            close: `${transformed ? c.close : c[2]}`,
            high: `${transformed ? c.high : c[3]}`,
            low: `${transformed ? c.low : c[4]}`,
            volume: `${transformed ? c.volume : c[5]}`,
            key: `${symbol}-${transformed ? c.mts : c[0]}`
          })))
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      })
    })
  })
}