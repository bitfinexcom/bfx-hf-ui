'use strict'

module.exports = (rawCandle) => {
  const candle = rawCandle.split(',')

  return {
    mts: +candle[0],
    open: +candle[1],
    high: +candle[2],
    low: +candle[3],
    close: +candle[4],
    volume: +candle[5],
  }
}
