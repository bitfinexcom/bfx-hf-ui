'use strict'

const notifyInfo = require('./info')
const notifyError = require('./error')
const notifySuccess = require('./success')
const notifyErrorBitfinex = require('./error_bitfinex')
const notifyErrorBinance = require('./error_binance')
const notifyOrderExecuted = require('./order_executed')
const notifyOrderCancelled = require('./order_cancelled')
const notifyInternalError = require('./internal_error')

module.exports = {
  notifyInfo,
  notifyError,
  notifySuccess,
  notifyErrorBitfinex,
  notifyErrorBinance,
  notifyOrderExecuted,
  notifyOrderCancelled,
  notifyInternalError
}
