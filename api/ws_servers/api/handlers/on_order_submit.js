'use strict'

const influx = require('db/influx')
const _capitalize = require('lodash/capitalize')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')

const submitOrderBitfinex = require('../submit_order_bitfinex')
const submitOrderBinance = require('../submit_order_binance')

module.exports = async (server, ws, msg) => {
  const { d } = server
  const [, exID, packet] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    packet: { type: 'object', v: packet }
  })

  if (!validRequest) {
    return
  }

  if (!ws.user) {
    return sendError(ws, 'Unauthorized')
  } else if (exID !== 'bitfinex' && exID !== 'binance') {
    return sendError(ws, 'Unrecognised exchange, cannot submit order')
  } else if (!ws.clients[exID]) {
    return sendError(ws, `No client open for ${_capitalize(exID)}`)
  }

  switch (exID) {
    case 'bitfinex': {
      await submitOrderBitfinex(d, ws, ws.clients.bitfinex, packet)
      break
    }

    case 'binance': {
      await submitOrderBinance(d, ws, ws.clients.binance, packet)
      break
    }

    default: {
      d('unknown exID broke through: %s', exID)
    }
  }

  influx.writePoints([{
    measurement: 'order_submits',

    fields: {
      count: 1,
    },

    tags: {
      exID
    }
  }])
}
