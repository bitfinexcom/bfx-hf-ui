'use strict'

const Influx = require('influx')

module.exports = new Influx.InfluxDB({
  host: 'localhost',
  database: 'dtc',
  schema: [{
    measurement: 'candle_requests',

    fields: {
      count: Influx.FieldType.INTEGER,
      duration: Influx.FieldType.INTEGER,
    },

    tags: [
      'exID',
      'symbol',
      'timeframe',
    ]
  }, {
    measurement: 'errors',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: [],
  }, {
    measurement: 'channel_subscriptions',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['exID', 'channel', 'type'],
  }, {
    measurement: 'order_submits',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['exID']
  }, {
    measurement: 'order_cancellations',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['exID']
  }, {
    measurement: 'api_clients',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['server'],
  }, {
    measurement: 'candle_requests_native_miss',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['exID', 'symbol', 'timeframe']
  }, {
    measurement: 'candle_requests_redis_hit',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['exID', 'symbol', 'timeframe']
  }, {
    measurement: 'trades',

    fields: {
      count: Influx.FieldType.INTEGER,
    },

    tags: ['exID', 'symbol']
  }]
})
