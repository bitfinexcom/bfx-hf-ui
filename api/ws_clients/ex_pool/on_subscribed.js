'use strict'

const chanDataToKey = require('util/chan_data_to_key')
const notifyClients = require('./notify_clients')
const aliasClients = require('./alias_clients')

module.exports = (poolClient, msg) => {
  const [, exID, chanID, chanData] = msg
  const chanKey = chanDataToKey(chanData)

  notifyClients(poolClient, exID, chanKey, msg)
  aliasClients(poolClient, exID, chanKey, chanID) // add alias by chanID
}
