'use strict'

const debug = require('debug')('dtc:dtc-db-redis:exa:set-last-candle')
const getLastCandleKey = require('./get_last_candle_key')
const set = require('../set')

module.exports = async (exchangeID, candle = {}) => {
  debug('updating last candle for exa %s with %j', exchangeID, candle)
  return set(getLastCandleKey(exchangeID), candle)
}
