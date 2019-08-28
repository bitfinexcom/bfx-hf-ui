/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolClearSubRefCount = require('ex_pool/clear_sub_ref_count')

describe('ex_pool: clear_sub_ref_count', () => {
  it('clears the subscription ref count for the exchange/channel pair', () => {
    const pool = poolInit()

    pool.subscriptions['bitfinex'] = { 'channel_a': 1 }
    poolClearSubRefCount(pool, 'bitfinex', 'channel_a')

    assert(!pool.subscriptions['bitfinex']['channel_a'])
  })
})
