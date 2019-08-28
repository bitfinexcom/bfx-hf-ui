'use strict'

const { RESTv2 } = require('bfx-api-node-rest')
const PromiseThrottle = require('promise-throttle')

const FETCH_LIMIT = 5000
const client = new RESTv2()
const pt = new PromiseThrottle({
  requestsPerSecond: 8.0 / 60.0, // taken from docs (10ps)
  promiseImplementation: Promise
})

module.exports = async (symbol, tf, start) => {
  return pt.add(client.candles.bind(client, {
    symbol,
    timeframe: tf,
    query: {
      _bfx: 1,
      start,
      limit: FETCH_LIMIT,
      sort: 1
    }
  }))
}
