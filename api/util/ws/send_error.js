'use strict'

const send = require('./send')

module.exports = (ws, msg) => {
  console.trace(msg)
  send(ws, ['error', msg])
}
