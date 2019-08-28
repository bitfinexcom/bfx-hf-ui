'use strict'

const { writeCandleReq, writeCandleReqNativeMiss } = require('db/influx/write')

const fetchBitfinex = require('./fetch_bitfinex')
const fetchBinance = require('./fetch_binance')

module.exports = async ({ ws, hfDS, exID, market, tf, start, end }) => {
  const queryStart = Date.now()
  let candles = []

  if (exID === 'bitfinex') {
    candles = await fetchBitfinex({ market, tf, start, end })
  } else if (exID === 'binance') {
    candles = await fetchBinance({ market, tf, start, end })
  }

  if (candles.length === 0) { // fall back to HF DS
    writeCandleReqNativeMiss({
      exID,
      symbol: market.u,
      timeframe: tf,
    })

    if (!hfDS) {
      return candles
    }

    return hfDS.getCandles(ws, {
      symbol: market.r,
      exID,
      tf,
      start,
      end
    }, market.u).then((candles) => {
      writeCandleReq({
        duration: Date.now() - queryStart,
        exID,
        symbol: market.u,
        timeframe: tf,
      })

      return null
    })
  }

  writeCandleReq({
    duration: Date.now() - queryStart,
    exID,
    symbol: market.u,
    timeframe: tf,
  })

  return candles
}
