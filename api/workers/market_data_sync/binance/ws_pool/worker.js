'use strict'

require('bfx-hf-util/lib/catch_uncaught_errors')

const debug = require('debug')('dtc:api:workers:market-data-sync:binance:ws-pool:worker')
const _isString = require('lodash/isString')
const PI = require('p-iteration')

const capture = require('capture')
const EXA = require('exchange_clients/binance')
const candleWidth = require('exchange_clients/binance/util/candle_width')
const upsertCandle = require('./upsert_candle')
const fetchBinanceCandles = require('db/query_candles/fetch_binance')
const processRemoteCandles = require('util/process_remote_candles')

const ex = new EXA()
const lastFinalCandleForKey = {}

const onCandle = async (rawCandle) => {
  const { symbol, interval, isFinal } = rawCandle
  const last = lastFinalCandleForKey[`${symbol}-${interval}`]

  if (!isFinal && !last) {
    return false // we need at least 1 final candle to get mts
  }

  const mts = isFinal
    ? rawCandle.startTime
    : (last.openTime || last.startTime) + candleWidth(interval)

  if (isFinal) {
    lastFinalCandleForKey[`${symbol}-${interval}`] = rawCandle
  }

  debug('recv candle for %s:%s', interval, symbol)

  const candle = EXA.transformCandle(rawCandle, mts)
  const lastCandleRes = await fetchBinanceCandles({
    tf: interval,
    market: { r: symbol },
    order: 'desc',
    limit: 1,
  })

  const [lastCandle] = lastCandleRes
  let candlesToInsert

  try {
    candlesToInsert = lastCandle.mts === candle.mts
      ? [candle]
      : processRemoteCandles(interval, [lastCandle, candle], true)

    PI.forEachSeries(candlesToInsert, async (candle) => {
      return upsertCandle(symbol, interval, candle)
    })
  } catch (e) {
    capture.exception(e)
  }

  return true
}

process.on('message', (msg = {}) => {
  const { symbol, tf } = msg

  if (!_isString(symbol) || !_isString(tf)) {
    debug('recv malformed message: %j', msg)
    return
  }

  debug('subscribing to candles channel %s:%s', symbol, tf)

  ex.client.ws.candles(symbol, tf, (candle) => {
    onCandle(candle).then((inserted) => {
      if (inserted) {
        debug('inserted candle into %s:%s', symbol, tf)
      }
    }).catch((e) => {
      capture.exception(e)
    })
  })
})
