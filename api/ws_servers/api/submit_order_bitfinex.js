'use strict'

const {
  notifyInfo,
  notifyOrderExecuted,
  notifyErrorBitfinex
} = require('util/ws/notify')

module.exports = async (d, ws, bfxClient, orderPacket) => {
  notifyInfo(ws, 'Submitting order to Bitfinex')

  try {
    // const order = await bfxClient.submitOrder(orderPacket)
    await bfxClient.submitOrder(orderPacket)

    d('sucessfully submitted order [bitfinex]')

    /*
    notifyOrderExecuted(ws, 'bitfinex', {
      amount: order[7],
      symbol: order[3],
      price: order[16],
      type: order[8]
    })
    */
  } catch (error) {
    d('failed to submit order [bitfinex]')
    notifyErrorBitfinex(ws, error)
  }
}
