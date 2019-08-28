'use strict'

module.exports = (u = {}) => ({
  bid: +u.bestBid,
  ask: +u.bestAsk,
  dailyChange: +u.priceChange,
  dailyChangePerc: +u.priceChangePercent / 100,
  lastPrice: +u.curDayClose,
  volume: +u.volume,
  high: +u.high,
  low: +u.low
})
