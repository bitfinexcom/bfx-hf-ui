/* eslint-env mocha */
'use strict'

const testPoolExRecvData = require('../util/test_pool_ex_recv_data')

testPoolExRecvData('binance', [
  { r: 'BTCUSDT', w: 'BTCUSDT' },
  { r: 'ETHUSDT', w: 'ETHUSDT' },
  { r: 'LTCUSDT', w: 'LTCUSDT' },
  { r: 'EOSUSDT', w: 'EOSUSDT' }
], 70000)
