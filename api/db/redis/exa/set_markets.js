'use strict'

const Promise = require('bluebird')
const debug = require('debug')('dtc:dtc-db-redis:exa:set-markets')

const getMarketsKey = require('./get_markets_key')
const redis = require('../client')

module.exports = async (exchangeID, markets = []) => {
  const key = getMarketsKey(exchangeID)

  debug(
    'updating markets list for exa %s with %d markets',
    exchangeID, markets.length
  )

  return new Promise((resolve, reject) => {
    const marketsJSON = JSON.stringify(markets)

    redis.set(key, marketsJSON, (err) => {
      if (err) {
        return reject(new Error(err))
      }

      resolve()
    })
  })
}
