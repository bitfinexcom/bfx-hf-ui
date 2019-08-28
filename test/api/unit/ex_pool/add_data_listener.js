/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolAddDataListener = require('ex_pool/add_data_listener')

describe('ex_pool: add_data_listener', () => {
  it('adds the callback to the internal listeners array', () => {
    const pool = poolInit()
    const cb = () => {}

    poolAddDataListener(pool, cb)

    const { dataListeners } = pool

    assert.strictEqual(dataListeners.length, 1)
    assert.strictEqual(dataListeners[0], cb)
  })
})
