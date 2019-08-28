'use strict'

const { AOHost } = require('bfx-hf-algo')
const {
  PingPong, Iceberg, TWAP, AccumulateDistribute, MACrossover
} = require('bfx-hf-algo')

module.exports = ({ apiKey, apiSecret, adapter, db }) => {
  const host = new AOHost({
    db,
    adapter,
    aos: [PingPong, Iceberg, TWAP, AccumulateDistribute, MACrossover]
  })

  host.connect()

  return host
}
