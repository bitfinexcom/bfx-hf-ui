'use strict'

const debug = require('debug')('dtc:api:db-exa-meta-sync')

const exchangeClients = require('exchange_clients')
const sync = require('sync_meta')

module.exports = (syncIntervalMS) => {
  sync(exchangeClients).then(() => { // initial sync
    setInterval(() => {
      sync(exchangeClients).catch((err) => { // interval sync
        debug('error: %s', err.stack)
      })
    }, syncIntervalMS)
  }).catch((err) => {
    debug('error: %s', err.stack)
  })
}
