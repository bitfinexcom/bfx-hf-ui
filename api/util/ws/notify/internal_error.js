'use strict'

const notifyError = require('./error')

module.exports = (ws) => {
  return notifyError(ws, 'Internal server error')
}
