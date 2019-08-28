'use strict'

const _last = require('lodash/last')
const debug = require('debug')('dtc:api:workers:market-data-sync:bfx:loop')
const processRemoteCandles = require('util/process_remote_candles')
const fetchCandles = require('./fetch_candles')
const insertCandles = require('db/candles/bitfinex/bulk_insert')
const { subscribe } = require('./ws_listener')
const capture = require('capture')
const CANDLE_WIDTHS = require('util/candle_time_frames')

const WS_CANDLE_SNAPSHOT_SIZE = 240

module.exports = async (firstCandleMTS, market, tf) => {
  const symbol = market.r
  let lastCandleMTS = firstCandleMTS

  // WS channel returns a snapshot on connect, so if we aren't too far behind we
  // can connect directly and take advantage of the snapshot
  if (Date.now() - firstCandleMTS < CANDLE_WIDTHS[tf] * WS_CANDLE_SNAPSHOT_SIZE) {
    debug('snapshot will account for discrepancy, skipping REST sync')
    await subscribe(tf, market)
    return
  }

  while (true) {
    debug(
      'fetching candles for %s %s from %s',
      symbol, tf, new Date(lastCandleMTS).toLocaleString()
    )

    let candles

    try {
      candles = await fetchCandles(symbol, tf, lastCandleMTS + 1)
    } catch (e) {
      capture.exception(e)
      break
    }

    if (candles.length > 0) {
      try {
        await insertCandles(symbol, tf, processRemoteCandles(tf, candles, false))
        lastCandleMTS = _last(candles)[0]
        debug('inserted %s candles into %s', candles.length, tf)
      } catch (e) {
        capture.exception(e)
      }
    }

    if (candles.length < 100) { // fetch limit is 5k
      debug('sync for %s %s finished, subscribing...', symbol, tf)
      await subscribe(tf, market)
      break
    }
  }
}
