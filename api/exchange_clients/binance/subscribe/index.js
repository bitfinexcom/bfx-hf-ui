'use strict'

const candles = require('./candles')
const trades = require('./trades')
const ticker = require('./ticker')
const book = require('./book')

module.exports = {
  candles,
  trades,
  book,
  ticker
}
