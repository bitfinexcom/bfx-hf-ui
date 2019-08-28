'use strict'

const debug = require('debug')('dtc:api:workers:market-data-sync:binance:finish-sync')
const redisRPUSH = require('db/redis/rpush')
const redisDEL = require('db/redis/del')
const candleToRedis = require('db/redis/candle_to_redis')

const { addSyncTask } = require('./ws_pool')
const getCacheSeedCandles = require('./get_cache_seed_candles')

module.exports = async (symbol, tf) => {
  /*
  debug('seeding redis cache')

  const seedCandles = await getCacheSeedCandles(symbol, tf)
  const redisKey = `binance_candles_${symbol}_${tf}`

  await redisDEL(redisKey)
  await redisRPUSH(redisKey, ...seedCandles.map(candleToRedis))
  */

  addSyncTask(symbol, tf)
}
