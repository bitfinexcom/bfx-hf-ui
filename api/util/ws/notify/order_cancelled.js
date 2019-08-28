'use strict'

const _capitalize = require('lodash/capitalize')
const notifySuccess = require('./success')

module.exports = (ws, exID, order) => {
  const { amount, symbol, price, type } = order

  notifySuccess(ws, [
    'Cancelled', _capitalize(exID), type, amount > 0 ? 'BUY' : 'SELL',
    'order on', `${symbol}:`, +amount, '@', price
  ].join(' '))
}
