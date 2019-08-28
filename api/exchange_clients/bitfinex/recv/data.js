'use strict'

const dataHandlers = require('./data_handlers')

module.exports = (exa, msg) => {
  const { ws, d, channelMap, dataListeners } = exa
  const [ chanID, potentialHB ] = msg

  if (potentialHB === 'hb') { // don't pass heartbeats
    return
  }

  const channel = channelMap[`${chanID}`]

  if (!channel) {
    d('error, recv data for unknown channel %s: %j', chanID, msg)
    d('unsubscribing...')

    ws.unsubscribe(chanID)
    return
  }

  const type = channel.channel

  if (!dataHandlers[type]) {
    return d('recv data for unknown channel type: %s', type)
  }

  const payloads = dataHandlers[type](exa, msg, channel)

  if (payloads.length === 0) {
    return
  }

  // bitfinex sends latest channel data immediately after subscribing
  // give subscription promises a chance to resolve
  setTimeout(() => {
    for (let i = 0; i < dataListeners.length; i += 1) {
      for (let j = 0; j < payloads.length; j += 1) {
        dataListeners[i](chanID, payloads[j])
      }
    }
  }, 0)
}
