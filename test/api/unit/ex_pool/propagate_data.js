/* eslint-env mocha */
'use strict'

const sinon = require('sinon')
const assert = require('assert')

const poolInit = require('ex_pool')
const poolPropagateData = require('ex_pool/propagate_data')
const poolAddDataListener = require('ex_pool/add_data_listener')

describe('ex_pool: propagate_data', () => {
  it('passes the channel identifier and data to all data listeners', () => {
    const pool = poolInit()
    const listenerA = sinon.stub()
    const listenerB = sinon.stub()

    poolAddDataListener(pool, listenerA)
    poolAddDataListener(pool, listenerB)
    poolPropagateData(pool, 'bitfinex', 'channel_a', 42)

    assert(listenerA.calledWith('bitfinex', 'channel_a', 42))
    assert(listenerB.calledWith('bitfinex', 'channel_a', 42))
  })
})
