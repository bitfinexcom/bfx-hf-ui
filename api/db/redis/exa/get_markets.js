'use strict'

const getMarketsKey = require('./get_markets_key')
const get = require('../get')

module.exports = async (exchangeID) => {
  return get(getMarketsKey(exchangeID))
}
