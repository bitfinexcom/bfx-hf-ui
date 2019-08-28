'use strict'

const PI = require('p-iteration')
const { getMarkets } = require('db/redis')

module.exports = async (EXA, cb) => {
  const markets = await getMarkets(EXA.id)
  const tfs = EXA.getCandleTimeFrames()

  await PI.forEachSeries(markets, async (market) => {
    await PI.forEachSeries(tfs, async (tf) => {
      return cb(market, tf)
    })
  })
}
