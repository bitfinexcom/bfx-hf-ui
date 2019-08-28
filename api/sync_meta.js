'use strict'

const PI = require('p-iteration')
const debug = require('debug')('dtc:db-exa-meta-sync:sync')
const { setMarkets: setMarketsRedis } = require('db/redis')

module.exports = async (exas) => {
  return PI.forEach(exas, async (EXA) => {
    const { id } = EXA
    const exaClient = new EXA()

    debug('fetching market list for exa %s', id)
    const markets = await exaClient.getMarkets()
    debug('fetched %d markets for exa %s', markets.length, id)

    return setMarketsRedis(id, markets)
  })
}
