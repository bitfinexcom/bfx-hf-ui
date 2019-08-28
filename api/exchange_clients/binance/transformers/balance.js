'use strict'

module.exports = (b = {}) => ([
  b.asset, // currency
  'exchange', // context
  (+b.free) + (+b.locked), // balance
  +b.free // available
])
