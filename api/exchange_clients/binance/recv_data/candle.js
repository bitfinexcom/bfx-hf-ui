'use strict'

const candleTransformer = require('../transformers/candle')
const propagateData = require('../propagate_data')
const candleWidth = require('../util/candle_width')

module.exports = (exa, chanID, candle) => {
  const { candleChannelData, lastFinalCandleForChannel } = exa
  const { isFinal } = candle
  const tf = candleChannelData[chanID][0]
  const last = lastFinalCandleForChannel[chanID]

  if (!isFinal && !last) {
    return // we need at least 1 final candle to get mts
  }

  const mts = isFinal
    ? candle.startTime
    : (last.openTime || last.startTime) + candleWidth(tf)

  propagateData(exa, chanID, candleTransformer(candle, mts))

  if (isFinal) {
    lastFinalCandleForChannel[chanID] = candle
  }
}
