'use strict'

const debug = require('debug')('dtc:api:workers:market-data-sync:binance:loop')
const _last = require('lodash/last')
const capture = require('capture')

const fetchCandles = require('./fetch_candles')
const insertCandles = require('./insert_candles')
const onFinishSync = require('./on_finish_sync')

module.exports = async (firstCandleMTS, market, tf) => {
  const symbol = market.r
  let lastCandleMTS = firstCandleMTS

  while (true) {
    debug(
      'fetching candles for %s %s from %s',
      symbol, tf, new Date(lastCandleMTS).toLocaleString()
    )

    let candles = []

    try {
      candles = await fetchCandles(symbol, tf, lastCandleMTS + 1)
    } catch (e) {
      capture.exception(e)
    }

    if (candles.length > 0) {
      try {
        await insertCandles(symbol, tf, candles)
        debug('inserted %s candles into %s', candles.length, tf)
        lastCandleMTS = _last(candles).openTime
      } catch (e) {
        capture.exception(e)
      }
    }

    if (candles.length < 1000) { // fetch limit is 1k
      debug('sync for %s %s finished', symbol, tf)
      await onFinishSync(symbol, tf)
      break
    }
  }
}
