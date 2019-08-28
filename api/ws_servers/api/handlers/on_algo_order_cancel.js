'use strict'

const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')

module.exports = async (server, ws, msg) => {
  const [, exID, gid] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    gid: { type: 'string', v: gid }
  })

  if (!validRequest) {
    return
  }

  if (!ws.user) {
    return sendError(ws, 'Unauthorized')
  } else if (exID !== 'bitfinex' && exID !== 'binance') {
    return sendError(ws, 'Algo orders currently only enabled for Bitfinex and Binance')
  } else if (!ws.aoc) {
    return sendError(ws, 'Unauthorized')
  }

  ws.aoc.stopAO(exID, gid)
}
