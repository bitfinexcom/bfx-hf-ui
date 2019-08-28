/* eslint-env mocha */
'use strict'

const assert = require('assert')
const sinon = require('sinon')

const poolInit = require('ex_pool')
const poolDecrementSubRefCount = require('ex_pool/decrement_sub_ref_count')
const capture = require('capture')

describe('ex_pool: decrement_sub_ref_count', () => {
  it('decrements the subscription ref count for the exchange/channel pair', () => {
    const pool = poolInit()

    pool.subscriptions['bitfinex'] = { 'channel_a': 2 }
    poolDecrementSubRefCount(pool, 'bitfinex', 'channel_a')

    assert.strictEqual(pool.subscriptions['bitfinex']['channel_a'], 1)
  })

  it('captures an exception if the sub ref count falls below zero', () => {
    const pool = poolInit()

    sinon.stub(capture, 'exception')
    pool.subscriptions['bitfinex'] = { 'channel_a': 0 }
    poolDecrementSubRefCount(pool, 'bitfinex', 'channel_a')

    assert(capture.exception.called)
    capture.exception.restore()
  })
})
