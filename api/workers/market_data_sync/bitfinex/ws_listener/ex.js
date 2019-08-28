'use strict'

const EXA = require('exchange_clients/bitfinex')
const ex = new EXA()

ex.openWS()

module.exports = ex
