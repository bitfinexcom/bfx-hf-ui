'use strict'

const debug = require('debug')('dtc:api:workers:trade-stats:bfx')
const PI = require('p-iteration')
const { getMarkets } = require('db/redis')
const EXA = require('exchange_clients/bitfinex')
const { writeTrade } = require('db/influx/write')

module.exports = async () => {
  const bfx = new EXA()
  const ptWS = EXA.getWSThrottler()
  const markets = await getMarkets(EXA.id)

  bfx.onData(async (chanID, data) => {
    const channel = bfx.getChannelData(chanID)

    if (!channel) {
      debug('recv trade for unknown channel: %s', chanID)
      return
    }

    const { market } = channel

    await writeTrade({
      exID: 'bitfinex',
      symbol: market.u,
    })
  })

  bfx.openWS()

  await PI.forEachSeries(markets, async (market) => {
    return ptWS.add(async () => {
      return bfx.subscribe(['trades', market])
    })
  })
}
