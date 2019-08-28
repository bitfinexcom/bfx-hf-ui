'use strict'

const capture = require('capture')
const nonce = require('util/nonce')
const chanDataToKey = require('util/chan_data_to_key')

const recvTradeData = require('../recv_data/trade')
const sentInitialTradeData = require('../send_initial_data/trade')

module.exports = (exa, channelData) => {
  const { d, subs, unsubs, client } = exa
  const key = chanDataToKey(channelData)
  const [, market] = channelData
  const symbol = market.w
  const chanID = nonce()

  d('subscribing to trades channel %s', symbol)

  subs[key] = chanID
  unsubs[key] = client.ws.trades(
    symbol, (trade) => recvTradeData(exa, chanID, trade)
  )

  setTimeout(() => {
    sentInitialTradeData(exa, channelData, chanID).catch((err) => {
      capture.exception(err)
    })
  }, 0)

  return chanID
}
