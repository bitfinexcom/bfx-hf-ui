/* eslint-env mocha */
'use strict'

const sinon = require('sinon')
const assert = require('assert')
const _isEmpty = require('lodash/isEmpty')

const poolInit = require('ex_pool')
const poolReset = require('ex_pool/reset')

describe('ex_pool: reset', () => {
  it('closes all exchange client connections', () => {
    const pool = poolInit()
    const closeA = sinon.stub()
    const closeB = sinon.stub()

    pool.exchangeClients.a = { close: closeA }
    pool.exchangeClients.b = { close: closeB }

    poolReset(pool)

    assert(closeA.called)
    assert(closeB.called)
  })

  it('resets internal data structures', () => {
    const pool = poolInit()

    pool.exchangeClients.a = { close: () => {} }
    pool.subscriptions.a = 42
    pool.dataListeners.push(42)

    poolReset(pool)

    assert(_isEmpty(pool.exchangeClients))
    assert(_isEmpty(pool.subscriptions))
    assert(_isEmpty(pool.dataListeners))
  })
})
