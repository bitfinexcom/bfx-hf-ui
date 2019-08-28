'use strict'

const Binance = require('binance-api-node').default
const client = Binance()

module.exports = async () => {
  return client.exchangeInfo()
}
