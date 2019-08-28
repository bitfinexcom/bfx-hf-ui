'use strict'

const BitfinexEchangeConnection = require('./bitfinex')
const BinanceExchangeConnection = require('./binance')

module.exports = [
  BitfinexEchangeConnection,
  BinanceExchangeConnection,
]
