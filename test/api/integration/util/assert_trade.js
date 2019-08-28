/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')

module.exports = (trade) => {
  assert(_isObject(trade))
  assert(_isFinite(trade.price))
  assert(_isFinite(trade.amount))
  assert(_isFinite(trade.mts))
}
