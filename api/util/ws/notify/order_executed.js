'use strict'

const _flatten = require('lodash/flatten')
const _isFinite = require('lodash/isFinite')
const _capitalize = require('lodash/capitalize')
const notifySuccess = require('./success')

module.exports = (ws, exID, order) => {
  const { amount, symbol, price, type } = order

  notifySuccess(ws, _flatten([
    'Executed', _capitalize(exID), type, amount > 0 ? 'BUY' : 'SELL',
    'order on', `${symbol}`,
    _isFinite(+amount) && _isFinite(+price) && +price > 0 && [+amount, '@', price]
  ]).filter(t => !!t).join(' '))
}
