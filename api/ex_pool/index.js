'use strict'

const debug = require('debug')

module.exports = () => ({
  d: debug('dtc:api:ex-pool'),
  exchangeClients: {},
  subscriptions: {},
  dataListeners: []
})
