'use strict'

module.exports = (candle) => ([
  candle.mts, candle.open, candle.high, candle.low, candle.close, candle.volume
].join(','))
