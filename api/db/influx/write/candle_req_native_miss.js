'use strict'

const influx = require('db/influx')

module.exports = ({ exID, symbol, timeframe }) => {
  influx.writePoints([{
    measurement: 'candle_requests_native_miss',
    fields: {
      count: 1,
    },

    tags: {
      exID,
      symbol,
      timeframe,
    },
  }])
}
