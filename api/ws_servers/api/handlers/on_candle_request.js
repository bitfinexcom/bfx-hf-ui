'use strict'

const capture = require('capture')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')
const queryCandles = require('db/query_candles')
const { notifyInternalError } = require('util/ws/notify')

module.exports = async (server, ws, msg) => {
  const { hfDSClients } = server
  const [, exID, market, tf, start, end] = msg
  const valid = validateParams(ws, {
    exID: { type: 'string', v: exID },
    market: { type: 'object', v: market },
    tf: { type: 'string', v: tf },
    start: { type: 'number', v: start },
    end: { type: 'number', v: end }
  })

  if (!valid) {
    return
  }

  const hfDS = hfDSClients[exID]

  if (!hfDS) {
    return sendError(ws, `unknown exchange: ${exID}`)
  }

  let candles

  try {
    candles = await queryCandles({ ws, exID, market, tf, start, end, hfDS })
  } catch (e) {
    capture.exception(e)
    return notifyInternalError(ws)
  }

  if (candles === null) {
    return // already sent by ds
  }

  send(ws, ['data.candles', exID, market.u, tf, start, end, candles.map(c => ({
    open: +c.open,
    high: +c.high,
    low: +c.low,
    close: +c.close,
    volume: +c.volume,
    mts: +c.mts
  }))])
}
