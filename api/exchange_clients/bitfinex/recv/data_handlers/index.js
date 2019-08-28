'use strict'

const auth = require('./auth')
const book = require('./book')
const candles = require('./candles')
const ticker = require('./ticker')
const trades = require('./trades')

module.exports = {
  auth,
  book,
  candles,
  ticker,
  trades
}
