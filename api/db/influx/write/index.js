'use strict'

const writeCandleReqRedisHit = require('./candle_req_redis_hit')
const writeCandleReqNativeMiss = require('./candle_req_native_miss')
const writeCandleReq = require('./candle_req')
const writeTrade = require('./trade')

module.exports = {
  writeCandleReqRedisHit,
  writeCandleReqNativeMiss,
  writeCandleReq,
  writeTrade,
}
