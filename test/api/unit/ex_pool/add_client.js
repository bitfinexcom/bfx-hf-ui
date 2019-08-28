/* eslint-env mocha */
'use strict'

const assert = require('assert')
const sinon = require('sinon')

const capture = require('capture')
const poolInit = require('ex_pool')
const poolReset = require('ex_pool/reset')
const poolAddClient = require('ex_pool/add_client')
const poolHasClient = require('ex_pool/has_client')
const bfx = require('exchange_clients/bitfinex')

describe('ex_pool: add_client', () => {
  it('validates the exchange id', () => {
    const pool = poolInit()

    assert(!poolAddClient(pool, 'invalid'))
    assert(poolAddClient(pool, 'bitfinex'))

    poolReset(pool)
  })

  it('captures exception on invalid exchange id', () => {
    const pool = poolInit()
    sinon.stub(capture, 'exception')

    assert(!poolAddClient(pool, 'invalid'))
    assert(capture.exception.called)

    capture.exception.restore()
  })

  it('saves exchange client', () => {
    sinon.stub(bfx.prototype, 'openWS')

    const pool = poolInit()

    assert(!poolHasClient(pool, 'bitfinex'))
    poolAddClient(pool, 'bitfinex')
    assert(poolHasClient(pool, 'bitfinex'))

    bfx.prototype.openWS.restore()
    poolReset(pool)
  })

  it('calls openWS on exchange client after adding', () => {
    sinon.stub(bfx.prototype, 'openWS')

    const pool = poolInit()
    const bfxInstance = poolAddClient(pool, 'bitfinex')

    assert(bfxInstance.openWS.called)

    bfx.prototype.openWS.restore()
    poolReset(pool)
  })

  it('adds data listener to exchange client after adding', () => {
    const pool = poolInit()

    sinon.stub(bfx.prototype, 'openWS')
    sinon.stub(bfx.prototype, 'onData')

    const bfxInstance = poolAddClient(pool, 'bitfinex')

    assert(bfxInstance)
    assert(bfxInstance.onData.called)

    bfx.prototype.openWS.restore()
    bfx.prototype.onData.restore()
    poolReset(pool)
  })
})
