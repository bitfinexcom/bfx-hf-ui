'use strict'

const hasClient = require('./has_client')
const addClient = require('./add_client')
const getClient = require('./get_client')
const getSubscriptionRefCount = require('./get_sub_ref_count')
const incrementSubscriptionRefCount = require('./increment_sub_ref_count')
const chanDataToKey = require('util/chan_data_to_key')

module.exports = async ({ pool, exID, channel }) => {
  if (!hasClient(pool, exID)) {
    addClient(pool, exID)
  }

  const ex = getClient(pool, exID)
  const chanKey = chanDataToKey(channel)
  const ref = getSubscriptionRefCount(pool, exID, chanKey)

  if (!ex.isSubscribed(channel) && ref === 0) {
    await ex.subscribe(channel)
  }

  incrementSubscriptionRefCount(pool, exID, chanKey)

  return ex.getChannelID(channel)
}
