'use strict'

const influx = require('db/influx')

module.exports = ({ exID, symbol }) => {
  influx.writePoints([{
    measurement: 'trades',
    fields: {
      count: 1,
    },

    tags: {
      exID,
      symbol,
    },
  }])
}
