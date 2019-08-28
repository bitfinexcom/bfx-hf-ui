'use strict'

const sentry = require('sentry')
const sendOrders = require('./send_orders')
const {
  notifyInfo,
  notifyOrderCancelled,
  notifyErrorBinance
} = require('util/ws/notify')

module.exports = async (d, ws, binanceClient, symbol, orderId) => {
  notifyInfo(ws, 'Cancelling order on Binance')

  try {
    const res = await binanceClient.cancelOrder({ symbol, orderId })

    d('sucessfully cancelleed order [binance]')
    notifyOrderCancelled(ws, 'binance', {
      symbol: res.symbol,
      amount: res.side === 'SELL' ? -1 * res.origQty : res.origQty,
      price: res.price,
      type: res.type
    })
  } catch (error) {
    sentry.captureException(error)
    d('failed to cancel order [binance]')
    notifyErrorBinance(ws, error)
    return
  }

  try {
    await sendOrders(ws, 'binance', binanceClient)
  } catch (error) {
    sentry.captureException(error)
    d(`failed to send orders [binance]: ${error.message}`)
    notifyErrorBinance(ws, error)
  }
}
