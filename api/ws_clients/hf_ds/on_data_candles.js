'use strict'

const send = require('util/ws/send')

// NOTE: Data server symbol may differ from the requested symbol
module.exports = (dsClient, msg) => {
  const { d, candleRequests, candlePromises } = dsClient
  const [, exID,, tf,, start, end, reqID, candles] = msg
  const ws = candleRequests[reqID]
  const symbol = reqID.split('-')[1]

  if (!ws) {
    return d('recv candle data for unknown req ID: %s', reqID)
  }

  send(ws, ['data.candles', exID, symbol, tf, start, end, candles])

  candlePromises[reqID](candles)

  delete candleRequests[reqID]
  delete candlePromises[reqID]
}
