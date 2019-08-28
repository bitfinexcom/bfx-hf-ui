'use strict'

const EXCHANGES = require('exchange_clients')

module.exports = (exID) => {
  return EXCHANGES.find(a => a.id === exID)
}
