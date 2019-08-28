'use strict'

const _last = require('lodash/last')
const capture = require('capture')

const candleTransformer = require('../transformers/candle')
const propagateData = require('../propagate_data')

module.exports = async (exa, channelData, chanID) => {
  const { client, lastFinalCandleForChannel } = exa
  const [, tf, market] = channelData
  const symbol = market.r
  let recentCandles

  try {
    recentCandles = await client.candles({
      symbol,
      interval: tf
    })
  } catch (e) {
    e.tags = { symbol, tf }
    capture.exception(e)
    return
  }

  const candle = _last(recentCandles)

  lastFinalCandleForChannel[chanID] = recentCandles[recentCandles.length - 2]
  propagateData(exa, chanID, candleTransformer(candle, candle.openTime))
}
