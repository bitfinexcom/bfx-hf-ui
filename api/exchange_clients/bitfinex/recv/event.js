'use strict'

const chanKeytoData = require('util/chan_key_to_data')

/**
 * Notifies pending subscription promises of resolved chanID for 'subscribed'
 * events.
 *
 * @param {Object} msg - incoming ws2 message
 */
module.exports = (exa, msg) => {
  const { pendingSubs, subs, channelMap } = exa
  const { event: eventName } = msg

  if (eventName !== 'subscribed') {
    return
  }

  const pendingSubsKeys = Object.keys(pendingSubs)

  let pendingSubMatches
  let pendingSubData
  let pendingSubKeys
  let key

  for (let i = 0; i < pendingSubsKeys.length; i += 1) {
    pendingSubMatches = true
    pendingSubData = chanKeytoData(pendingSubsKeys[i])
    pendingSubKeys = Object.keys(pendingSubData)

    for (let j = 0; j < pendingSubKeys.length; j += 1) {
      key = pendingSubKeys[j]

      if (key === 'type' && pendingSubData[key] !== msg.channel) {
        pendingSubMatches = false
        break
      }

      if (key === 'type') {
        continue
      }

      if (msg[key] !== pendingSubData[key]) {
        pendingSubMatches = false
        break
      }
    }

    if (pendingSubMatches) {
      subs[pendingSubsKeys[i]] = msg.chanId // NOTE: assigned multiple times

      channelMap[`${msg.chanId}`] = {
        ...msg,
        market: pendingSubs[pendingSubsKeys[i]][0],
      }

      pendingSubs[pendingSubsKeys[i]][1](msg.chanId)
    }
  }
}
