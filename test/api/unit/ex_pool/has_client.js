/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolHasClient = require('ex_pool/has_client')

describe('ex_pool: has_client', () => {
  it('returns true if the pool has the requested client', () => {
    const pool = poolInit()
    pool.exchangeClients['bitfinex'] = 42
    assert(poolHasClient(pool, 'bitfinex'))
  })

  it('returns false if the pool does not have the requested client', () => {
    const pool = poolInit()
    assert(!poolHasClient(pool, 'bitfinex'))
  })
})
