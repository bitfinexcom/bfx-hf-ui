'use strict'

const capture = require('capture')
const getClient = require('./get_client')
const hasClient = require('./has_client')
const getSubscriptionRefCount = require('./get_sub_ref_count')
const clearSubscriptionRefCount = require('./clear_sub_ref_count')
const decrementSubscriptionRefCount = require('./decrement_sub_ref_count')
const chanDataToKey = require('util/chan_data_to_key')

// TODO: Verify return null is treated as error (used to throw)
module.exports = async ({ pool, exID, channel, force }) => {
  if (!hasClient(pool, exID)) {
    capture.exception('tried to unsub from unknown exchange: %s', exID)
    return null
  }

  const ex = getClient(pool, exID)
  const chanKey = chanDataToKey(channel)

  if (!ex.isSubscribed(channel)) {
    capture.exception(
      'tried to unsubscribe from non-subscribed channel: %s %j',
      exID, channel
    )

    return null
  }

  if (force) {
    clearSubscriptionRefCount(pool, exID, chanKey)
  } else {
    decrementSubscriptionRefCount(pool, exID, chanKey)
  }

  const ref = getSubscriptionRefCount(pool, exID, chanKey)

  if (ref === 0) {
    return ex.unsubscribe(channel)
  } else {
    return ex.getChannelID(channel)
  }
}
