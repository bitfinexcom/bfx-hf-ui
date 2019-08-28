'use strict'

const _isFinite = require('lodash/isFinite')
const _flatten = require('lodash/flatten')
const BinanceExchangeConnection = require('exchange_clients/binance')
const {
  notifyInfo, notifyError, notifyOrderExecuted, notifySuccess,
} = require('util/ws/notify')
const sendError = require('util/ws/send_error')
const send = require('util/ws/send')
const capture = require('capture')
const BigN = require('bignumber.js')

const rejectReasonTransformer = require('exchange_clients/binance/transformers/reject_reason')
const wsBalancesTransformer = require('exchange_clients/binance/transformers/ws_balances')
const sendBalances = require('./send_balances')
const sendOrders = require('./send_orders')

module.exports = (ws, apiKey, apiSecret) => {
  const client = new BinanceExchangeConnection({
    apiKey,
    apiSecret
  })

  send(ws, ['data.client', 'binance', 2])
  notifyInfo(ws, 'Binance connection prepared for orders')

  // TODO: Refactor plm
  // TODO: Use handlebars templates for notifications
  client.userStream((msg) => {
    const { eventType } = msg

    if (eventType === 'account') {
      const { balances = {} } = msg
      send(ws, ['data.balances', 'binance', wsBalancesTransformer(balances)])
      return
    }

    if (eventType !== 'executionReport') {
      console.log(msg)
      return
    }

    if (msg.orderStatus === 'FILLED') {
      send(ws, [
        'data.order.close',
        'binance',
        BinanceExchangeConnection.transformOrder(msg)
      ])

      notifyOrderExecuted(ws, 'binance', {
        amount: +msg.quantity * (msg.side === 'SELL' ? -1 : 1),
        price: new BigN(msg.price).toString(10),
        symbol: msg.symbol,
        type: msg.orderType,
      })
    } else if (msg.orderStatus === 'PARTIALLY_FILLED') {
      send(ws, [
        'data.order',
        'binance',
        BinanceExchangeConnection.transformOrder(msg)
      ])

      notifySuccess(ws, _flatten([
        'Binance order partially filled on', msg.symbol, msg.side,
        _isFinite(+msg.price) && +msg.price > 0 && [
          +msg.quantity, '@', new BigN(msg.price).toString(10)
        ]
      ]).filter(t => !!t).join(' '))
    } else if (msg.orderStatus === 'NEW') {
      send(ws, [
        'data.order',
        'binance',
        BinanceExchangeConnection.transformOrder(msg)
      ])

      notifySuccess(ws, _flatten([
        'Binance order created on', msg.symbol, msg.side,
        _isFinite(+msg.price) && +msg.price > 0 && [
          +msg.quantity, '@', new BigN(msg.price).toString(10)
        ]
      ]).filter(t => !!t).join(' '))
    } else if (msg.orderStatus === 'REJECTED') {
      const { orderRejectReason } = msg
      const humanReason = rejectReasonTransformer(orderRejectReason)

      notifyError(ws, _flatten([
        'Binance order cancelled on', msg.symbol, msg.side,
        _isFinite(+msg.price) && +msg.price > 0 && [
          +msg.quantity, '@', new BigN(msg.price).toString(10)
        ], `: ${humanReason}`,
      ]).filter(t => !!t).join(' '))
    } else if (msg.orderStatus === 'CANCELED') {
      send(ws, [
        'data.order.close',
        'binance',
        BinanceExchangeConnection.transformOrder(msg)
      ])

      notifyInfo(ws, _flatten([
        'Binance order cancelled on', msg.symbol, msg.side,
        _isFinite(+msg.price) && +msg.price > 0 && [
          +msg.quantity, '@', new BigN(msg.price).toString(10)
        ],
      ]).filter(t => !!t).join(' '))
    }
  })

  sendBalances(ws, 'binance', client).catch((e) => {
    capture.exception(e)
    sendError(ws, `Failed to update Binance balances: ${e.message}`)
  })

  sendOrders(ws, 'binance', client).catch((e) => {
    capture.exception(e)
    sendError(ws, `Failed to update Binance orders: ${e.message}`)
  })

  return client
}
