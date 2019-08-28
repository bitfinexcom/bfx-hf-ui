/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolGetClient = require('ex_pool/get_client')

describe('ex_pool: get_client', () => {
  it('returns exchange client by ID', () => {
    const pool = poolInit()

    pool.exchangeClients['test'] = 42

    assert.strictEqual(poolGetClient(pool, 'test'), 42)
  })
})
