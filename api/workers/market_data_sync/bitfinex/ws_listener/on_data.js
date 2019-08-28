'use strict'

const capture = require('capture')
const PI = require('p-iteration')
const debug = require('debug')('dtc:api:workers:market-data-sync:bfx:ws-listener:on-data')
const processRemoteCandles = require('util/process_remote_candles')
const fetchBitfinexCandles = require('db/query_candles/fetch_bitfinex')

const ex = require('./ex')
const upsertCandle = require('db/candles/bitfinex/upsert')

module.exports = async (chanID, candle) => {
  const channel = ex.getChannelData(chanID)

  if (!channel) {
    debug('warning: recv data for unknown channel %s: %j', chanID, candle)
    return
  }

  const { market, key } = channel
  const tf = key.split(':')[1]
  const lastCandleRes = await fetchBitfinexCandles({
    tf,
    market,
    order: 'desc',
    limit: 1,
  })

  try {
    const candles = processRemoteCandles(tf, [...lastCandleRes, candle], true)

    PI.forEachSeries(candles, async (candle) => {
      return upsertCandle(market.r, tf, candle)
    })
  } catch (e) {
    capture.exception(e)
  }
}
