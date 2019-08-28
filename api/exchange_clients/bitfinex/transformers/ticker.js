'use strict'

module.exports = (u = []) => ({
  bid: u[0],
  ask: u[2],
  dailyChange: u[4],
  dailyChangePerc: u[5],
  lastPrice: u[6],
  volume: u[7],
  high: u[8],
  low: u[9]
})
