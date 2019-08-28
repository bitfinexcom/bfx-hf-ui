'use strict'

const Binance = require('binance-api-node').default
const PromiseThrottle = require('promise-throttle')

const FETCH_LIMIT = 1000
const client = Binance()
const pt = new PromiseThrottle({
  requestsPerSecond: 100 / 60.0, // taken from docs (1200 per min weighted)
  promiseImplementation: Promise
})

module.exports = async (symbol, tf, start) => {
  return pt.add(client.candles.bind(client, {
    symbol,
    interval: tf,
    limit: FETCH_LIMIT,
    startTime: start,
  }))
}
