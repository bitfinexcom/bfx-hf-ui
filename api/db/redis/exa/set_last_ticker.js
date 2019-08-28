'use strict'

const debug = require('debug')('dtc:dtc-db-redis:exa:set-last-ticker')
const getLastTickerKey = require('./get_last_ticker_key')
const set = require('../set')

module.exports = async (exchangeID, ticker = {}) => {
  debug('updating last ticker for exa %s with %j', exchangeID, ticker)
  return set(getLastTickerKey(exchangeID), ticker)
}
