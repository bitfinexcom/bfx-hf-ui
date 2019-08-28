'use strict'

const getLastTradeKey = require('./get_last_trade_key')
const get = require('../get')

module.exports = async (exchangeID) => {
  return get(getLastTradeKey(exchangeID))
}
