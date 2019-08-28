'use strict'

const nonce = require('util/nonce')
const chanDataToKey = require('util/chan_data_to_key')

const recvTickerData = require('../recv_data/ticker')

module.exports = (exa, channelData) => {
  const { d, subs, unsubs, client } = exa
  const key = chanDataToKey(channelData)
  const [, market] = channelData
  const symbol = market.w
  const chanID = nonce()

  d('subscribing to ticker channel %s', symbol)

  subs[key] = chanID
  unsubs[key] = client.ws.ticker(
    symbol, (ticker) => recvTickerData(exa, chanID, ticker)
  )

  return chanID
}
