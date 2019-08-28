'use strict'

const Promise = require('bluebird')
const _last = require('lodash/last')
const chanDataToKey = require('util/chan_data_to_key')
const chanDataToSubscribePacket = require('./util/chan_data_to_subscribe_packet')

module.exports = async (exa, channelData) => {
  const { d, subs, ws, pendingSubs } = exa
  const cdKey = chanDataToKey(channelData)

  if (subs[cdKey]) {
    return subs[cdKey] // return existing chanId
  }

  const [ type ] = channelData
  const filter = chanDataToSubscribePacket(channelData)

  if (filter === null) {
    throw new Error(`unknown channel type: ${type}`)
  }

  d('subscribing to channel %j', channelData)

  const p = new Promise((resolve) => {
    pendingSubs[cdKey] = [_last(channelData), resolve]
  })

  switch (type) {
    case 'candles': {
      ws.subscribeCandles(filter)
      break
    }

    case 'ticker': {
      ws.subscribeTicker(filter)
      break
    }

    case 'trades': {
      ws.subscribeTrades(filter)
      break
    }

    case 'book': {
      ws.subscribeOrderBook(...filter)
      break
    }

    default: {}
  }

  return p
}
