'use strict'

const sentry = require('sentry')
const {
  notifyInfo,
  notifyOrderCancelled,
  notifyErrorBitfinex
} = require('util/ws/notify')

module.exports = async (d, ws, bfxClient, symbol, id) => {
  notifyInfo(ws, 'Cancelling order on Bitfinex')

  try {
    const order = await bfxClient.cancelOrder(id)

    d('sucessfully cancelled order [bitfinex]')
    notifyOrderCancelled(ws, 'bitfinex', {
      amount: order[7],
      symbol: order[3],
      price: order[16],
      type: order[8]
    })
  } catch (error) {
    sentry.captureException(error)
    d('failed to cancel order [bitfinex]')
    notifyErrorBitfinex(ws, error)
  }
}
