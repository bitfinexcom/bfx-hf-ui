'use strict'

module.exports = (b = []) => ([
  b[1], // currency
  b[0], // context
  b[2], // balance
  b[4] // available
])
