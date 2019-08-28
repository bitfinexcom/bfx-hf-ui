'use strict'

const notifyClients = require('./notify_clients')

module.exports = (poolClient, msg) => {
  const [, exID, chanID] = msg
  notifyClients(poolClient, exID, `${chanID}`, msg)
}
