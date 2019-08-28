/* eslint-env mocha */
'use strict'

const testPoolExRecvData = require('../util/test_pool_ex_recv_data')

testPoolExRecvData('bitfinex', [
  { w: 'tBTCUSD' },
  { w: 'tLEOUSD' },
  { w: 'tETHUSD' },
  { w: 'tLTCUSD' },
  { w: 'tEOSUSD' }
], 20000)
