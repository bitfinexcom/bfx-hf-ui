'use strict'

const notifyError = require('./error')

module.exports = (ws, error) => {
  const message = error.message.match(/ERROR:/)
    ? error.message.split('ERROR:')[1].trim()
    : error.message

  notifyError(ws, `Bitfinex error - ${message}`)
}
