'use strict'

const getLastCandleKey = require('./get_last_candle_key')
const get = require('../get')

module.exports = async (exchangeID) => {
  return get(getLastCandleKey(exchangeID))
}
