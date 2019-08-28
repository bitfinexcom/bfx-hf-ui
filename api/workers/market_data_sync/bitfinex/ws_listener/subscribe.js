'use strict'

const EXA = require('exchange_clients/bitfinex')
const ex = require('./ex')

const ptWS = EXA.getWSThrottler()

module.exports = async (tf, market) => {
  return ptWS.add(async () => {
    return ex.subscribe(['candles', tf, market])
  })
}
