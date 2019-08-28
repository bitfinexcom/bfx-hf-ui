'use strict'

const TIME_FRAMES = require('util/candle_time_frames')
const BigN = require('bignumber.js')

module.exports = (mts, tf) => {
  const spacing = TIME_FRAMES[tf]
  const tradeMTS = new BigN(`${mts}`.split('.').join('').padEnd(17, '0')).div(10000).toNumber()
  return +tradeMTS - (tradeMTS % spacing)
}
