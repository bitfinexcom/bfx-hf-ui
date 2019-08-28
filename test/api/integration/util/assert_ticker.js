/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')

module.exports = (ticker) => {
  assert(_isObject(ticker))
  assert(_isFinite(ticker.bid))
  assert(_isFinite(ticker.ask))
  assert(_isFinite(ticker.dailyChange))
  assert(_isFinite(ticker.dailyChangePerc))
  assert(_isFinite(ticker.lastPrice))
  assert(_isFinite(ticker.volume))
  assert(_isFinite(ticker.high))
  assert(_isFinite(ticker.low))
}
