'use strict'

const PI = require('p-iteration')
const { getMarkets } = require('db/redis')

module.exports = async (EXA, cb) => {
  const markets = await getMarkets(EXA.id)
  const tfs = EXA.getCandleTimeFrames()

  await PI.forEach(markets, async (market) => {
    await PI.forEach(tfs, async (tf) => {
      return cb(market, tf)
    })
  })
}
