'use strict'

const capture = require('capture')
const nonce = require('util/nonce')
const chanDataToKey = require('util/chan_data_to_key')

const recvCandleData = require('../recv_data/candle')
const sendInitialCandleData = require('../send_initial_data/candle')

module.exports = (exa, channelData) => {
  const key = chanDataToKey(channelData)
  const [, tf, market] = channelData
  const symbol = market.w
  const chanID = nonce()
  const {
    d, candleChannelData, subs, unsubs, client
  } = exa

  d('subscribing to candles channel %s:%s', symbol, tf)

  candleChannelData[chanID] = [tf, symbol]
  subs[key] = chanID
  unsubs[key] = client.ws.candles(
    symbol, tf, (candle) => recvCandleData(exa, chanID, candle)
  )

  setTimeout(() => {
    sendInitialCandleData(exa, channelData, chanID).catch((err) => {
      capture.exception(err)
    })
  }, 0)

  return chanID
}
