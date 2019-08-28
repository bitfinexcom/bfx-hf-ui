'use strict'

module.exports = (u = []) => ({
  open: u[1],
  high: u[3],
  low: u[4],
  close: u[2],
  volume: u[5],
  mts: u[0]
})
