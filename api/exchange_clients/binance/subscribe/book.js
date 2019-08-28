'use strict'

const nonce = require('util/nonce')
const chanDataToKey = require('util/chan_data_to_key')

const recvBookData = require('../recv_data/book')

module.exports = (exa, channelData) => {
  const { d, subs, unsubs, client } = exa
  const key = chanDataToKey(channelData)
  const [, market] = channelData
  const symbol = market.w
  const chanID = nonce()

  d('subscribing to book channel %s', symbol)

  subs[key] = chanID
  unsubs[key] = client.ws.partialDepth({
    symbol,
    level: 20
  }, (book) => recvBookData(exa, chanID, book))

  return chanID
}
