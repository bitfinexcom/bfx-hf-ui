import _flatten from 'lodash/flatten'
import _uniq from 'lodash/uniq'

import bitfinexTFs from './time_frames/bitfinex'
import binanceTFs from './time_frames/binance'

const tfs = _uniq(_flatten([
  Object.values(bitfinexTFs),
  Object.values(binanceTFs),
]))

const SUFFIX_WIDTHS = {
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  D: 24 * 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  W: 14 * 24 * 60 * 60 * 1000,
  w: 14 * 24 * 60 * 60 * 1000,
  M: 30 * 24 * 60 * 60 * 1000,
}

const CANDLE_WIDTHS = {}

tfs.forEach((tf) => {
  const suffix = tf.substring(tf.length - 1)
  const value = +tf.substring(0, tf.length - 1)

  CANDLE_WIDTHS[tf] = value * SUFFIX_WIDTHS[suffix]
})

export default tf => CANDLE_WIDTHS[tf]
