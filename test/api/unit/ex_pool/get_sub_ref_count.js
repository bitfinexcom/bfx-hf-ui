/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolGetSubRefCount = require('ex_pool/get_sub_ref_count')

describe('ex_pool: get_sub_ref_count', () => {
  it('returns the subscription reference count', () => {
    const pool = poolInit()

    pool.subscriptions['bitfinex'] = { 'channel_a': 42 }

    assert.strictEqual(poolGetSubRefCount(pool, 'bitfinex', 'channel_a'), 42)
  })

  it('returns 0 if the reference is unknown', () => {
    const pool = poolInit()
    assert.strictEqual(poolGetSubRefCount(pool, 'bitfinex', 'channel_a'), 0)
  })
})
