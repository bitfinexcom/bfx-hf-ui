'use strict'

const chanDataToKey = require('util/chan_data_to_key')
const chanDataToSubscribePacket = require('./util/chan_data_to_subscribe_packet')

module.exports = (exa, channelData) => {
  const { d, ws, subs, channelMap } = exa

  const cdKey = chanDataToKey(channelData)
  const chanID = subs[cdKey]

  if (!chanID) {
    throw new Error('tried to unsub from unknown channel')
  }

  d('unsubscribing from channel %s', chanID)

  const filter = chanDataToSubscribePacket(channelData)

  switch (channelData[0]) {
    case 'candles': {
      ws.managedUnsubscribe('candles', filter)
      break
    }

    case 'ticker': {
      ws.managedUnsubscribe('ticker', filter)
      break
    }

    case 'trades': {
      ws.managedUnsubscribe('trades', filter)
      break
    }

    case 'book': {
      ws.managedUnsubscribe('book', filter[0])
      break
    }

    default: {
      throw new Error('unknown channel type: %j', channelData)
    }
  }

  delete subs[cdKey]
  delete channelMap[`${chanID}`]

  return chanID
}
