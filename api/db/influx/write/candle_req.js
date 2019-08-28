'use strict'

const influx = require('db/influx')

module.exports = ({ duration, exID, symbol, timeframe }) => {
  influx.writePoints([{
    measurement: 'candle_requests',
    fields: {
      count: 1,
      duration,
    },

    tags: {
      exID,
      symbol,
      timeframe,
    },
  }])
}
