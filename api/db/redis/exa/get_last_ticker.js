'use strict'

const getLastTickerKey = require('./get_last_ticker_key')
const get = require('../get')

module.exports = async (exchangeID) => {
  return get(getLastTickerKey(exchangeID))
}
