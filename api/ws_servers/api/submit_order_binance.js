'use strict'

const sendOrders = require('./send_orders')
const sendBalances = require('./send_balances')
const sentry = require('sentry')
const {
  notifyInfo,
  notifyOrderExecuted,
  notifyErrorBinance
} = require('util/ws/notify')

module.exports = async (d, ws, binanceClient, orderPacket) => {
  notifyInfo(ws, 'Submitting order to Binance')

  try {
    // const res = await binanceClient.submitOrder(orderPacket)
    await binanceClient.submitOrder(orderPacket)

    d('sucessfully submitted order [binance]')

    /*
    notifyOrderExecuted(ws, 'binance', {
      symbol: res.symbol,
      amount: res.side === 'SELL' ? -1 * res.origQty : res.origQty,
      price: res.price,
      type: res.type
    })
    */
  } catch (error) {
    d('failed to submit order [binance]')
    notifyErrorBinance(ws, error)
    return
  }

  try {
    await sendBalances(ws, 'binance', binanceClient)
  } catch (error) {
    sentry.captureException(error)
    d(`failed to send balances [binance]: ${error.message}`)
    notifyErrorBinance(ws, error)
  }

  try {
    await sendOrders(ws, 'binance', binanceClient)
  } catch (error) {
    sentry.captureException(error)
    d(`failed to send orders [binance]: ${error.message}`)
    notifyErrorBinance(ws, error)
  }
}
