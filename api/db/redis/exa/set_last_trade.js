'use strict'

const debug = require('debug')('dtc:dtc-db-redis:exa:set-last-trade')
const getLastTradeKey = require('./get_last_trade_key')
const set = require('../set')

module.exports = async (exchangeID, trade = {}) => {
  debug('updating last trade for exa %s with %j', exchangeID, trade)
  return set(getLastTradeKey(exchangeID), trade)
}
