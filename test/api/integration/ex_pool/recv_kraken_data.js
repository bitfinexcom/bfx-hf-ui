/* eslint-env mocha */
'use strict'

const testPoolExRecvData = require('../util/test_pool_ex_recv_data')

testPoolExRecvData('kraken', [
  { r: 'XBTUSD' },
  { r: 'ETHUSD' },
  { r: 'LTCUSD' },
  { r: 'EOSUSD' },
  { r: 'ADAUSD' }
], 70000)
