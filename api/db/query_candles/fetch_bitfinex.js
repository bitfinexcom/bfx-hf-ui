'use strict'

const bfxTFToString = require('exchange_clients/bitfinex/util/tf_to_string')
const fetch = require('./fetch')

module.exports = async ({
  market, tf, start, end, limit, order = 'asc', orderBy = 'mts',
}) => {
  return fetch({
    table: `bitfinex_candles_${bfxTFToString(tf)}`,
    market,
    start,
    end,
    limit,
    order,
    orderBy,
  })
}
