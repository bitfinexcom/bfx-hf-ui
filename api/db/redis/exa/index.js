'use strict'

const getLastTicker = require('./get_last_ticker')
const getLastCandle = require('./get_last_candle')
const getLastTrade = require('./get_last_trade')
const getMarkets = require('./get_markets')
const setMarkets = require('./set_markets')
const setLastTrade = require('./set_last_trade')
const setLastCandle = require('./set_last_candle')
const setLastTicker = require('./set_last_ticker')

module.exports = {
  getLastTicker,
  getLastCandle,
  getLastTrade,
  getMarkets,
  setMarkets,
  setLastTrade,
  setLastCandle,
  setLastTicker
}
