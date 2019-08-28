/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolGetSubRefCount = require('ex_pool/get_sub_ref_count')
const poolIncrementSubRefCount = require('ex_pool/increment_sub_ref_count')

describe('ex_pool: has_client', () => {
  it('initializes the reference counter with 0 if needed', () => {
    const pool = poolInit()
    poolIncrementSubRefCount(pool, 'bitfinex', 'channel_a')
    assert.strictEqual(poolGetSubRefCount(pool, 'bitfinex', 'channel_a'), 1)
  })

  it('increments the reference counter', () => {
    const pool = poolInit()
    pool.subscriptions['bitfinex'] = { 'channel_a': 1 }
    poolIncrementSubRefCount(pool, 'bitfinex', 'channel_a')
    assert.strictEqual(poolGetSubRefCount(pool, 'bitfinex', 'channel_a'), 2)
  })
})
