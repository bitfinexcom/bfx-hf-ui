'use strict'

const notifyError = require('./error')

module.exports = (ws, error) => {
  notifyError(ws, `Binance error - ${error.message}`)
}
