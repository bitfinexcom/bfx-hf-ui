'use strict'

const PI = require('p-iteration')
const tfToString = require('../lib/exchange_clients/bitfinex/util/tf_to_string')
const tfs = [
  '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '7D', '14D', '1M'
]

exports.up = function (knex, Promise) {
  return PI.forEachSeries(tfs, (tf) => {
    return knex.schema.createTable(`bitfinex_candles_${tfToString(tf)}`, function (table) {
      table.increments('id')

      table.string('symbol', 10).notNullable()
      table.string('open', 20).notNullable()
      table.string('high', 20).notNullable()
      table.string('low', 20).notNullable()
      table.string('close', 20).notNullable()
      table.string('volume', 32).notNullable()
      table.decimal('mts', null).notNullable()
      table.string('key', 27).notNullable().unique()

      table.index(['symbol', 'mts'])
    })
  })
}

exports.down = function (knex, Promise) {
  return PI.forEachSeries(tfs, (tf) => {
    return knex.schema.dropTable(`bitfinex_candles_${tfToString(tf)}`)
  })
}
