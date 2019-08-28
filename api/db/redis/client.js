'use strict'

const Redis = require('redis')
const debug = require('debug')('dtc:db-redis:client')

const client = Redis.createClient()

client.on('error', (err) => {
  debug('error: %s', err)
})

module.exports = client
