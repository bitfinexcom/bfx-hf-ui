'use strict'

module.exports = (u = {}, mts) => ({
  open: +u.open,
  high: +u.high,
  low: +u.low,
  close: +u.close,
  volume: +u.volume,
  mts
})
