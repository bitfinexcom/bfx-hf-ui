'use strict'

const dbRL = require('db/pg_rate_limited')
const binanceTFToString = require('exchange_clients/binance/util/tf_to_string')
const CANDLE_TIME_FRAME_WIDTHS = require('util/candle_time_frames')
const { writeCandleReqRedisHit } = require('db/influx/write')
const candleFromRedis = require('db/redis/candle_from_redis')
const { rLRANGE } = require('db/redis')
const fetch = require('./fetch')

module.exports = async ({
  market, tf, start, end, limit, order = 'asc', orderBy = 'mts',
}) => {
  /*
  let candles = []

  if ( // redis stores last 5k candles per tf
    (Date.now() - end < CANDLE_TIME_FRAME_WIDTHS[tf]) &&
    ((start - end) / CANDLE_TIME_FRAME_WIDTHS[tf] <= 5000)
  ) {
    const redisCandles = await rLRANGE(`binance_candles_${market.r}_${tf}`, 0, -1)
    candles = redisCandles.map(candleFromRedis).filter(c => (
      c.mts >= start && c.mts <= end
    ))
  }

  if (candles.length > 0) {
    writeCandleReqRedisHit({
      exID: 'binance',
      symbol: market.u,
      timeframe: tf,
    })

    return candles
  }
  */

  // fall back on psql
  return fetch({
    table: `binance_candles_${binanceTFToString(tf)}`,
    market,
    start,
    end,
    limit,
    order,
    orderBy,
  })
}
