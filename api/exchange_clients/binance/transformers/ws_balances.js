'use strict'

module.exports = (balances = {}) => {
  const symbols = Object.keys(balances)

  return symbols.map(sym => ([
    sym, // currency
    'exchange', // context
    (+balances[sym].available) + (+balances[sym].locked), // balance
    +balances[sym].available // available
  ]))
}
