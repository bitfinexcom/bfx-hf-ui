/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isObject = require('lodash/isObject')
const _isFinite = require('lodash/isFinite')

module.exports = (candle) => {
  assert(_isObject(candle))
  assert(_isFinite(candle.high))
  assert(_isFinite(candle.low))
  assert(_isFinite(candle.open))
  assert(_isFinite(candle.close))
  assert(_isFinite(candle.volume))
  assert(_isFinite(candle.mts))
}
