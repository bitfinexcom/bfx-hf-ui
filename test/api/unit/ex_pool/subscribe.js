/* eslint-env mocha */
'use strict'

const sinon = require('sinon')
const assert = require('assert')

const poolInit = require('ex_pool')
const poolReset = require('ex_pool/reset')
const poolSubscribe = require('ex_pool/subscribe')
const chanDataToKey = require('util/chan_data_to_key')
const bfx = require('exchange_clients/bitfinex')

describe('ex_pool: subscribe', () => {
  const channel = ['trades', 'tBTCUSD']
  const chanKey = chanDataToKey(channel)

  it('adds the exchange client if it does not already exist', () => {
    const pool = poolInit()

    sinon.stub(bfx.prototype, 'openWS')
    sinon.stub(bfx.prototype, 'subscribe')

    return poolSubscribe({
      pool,
      channel,
      exID: 'bitfinex'
    }).then(() => {
      assert(pool.exchangeClients.bitfinex)
      assert(pool.exchangeClients.bitfinex.openWS.called)
      assert(pool.exchangeClients.bitfinex.subscribe.called)

      bfx.prototype.openWS.restore()
      bfx.prototype.subscribe.restore()

      poolReset(pool)
    })
  })

  it('calls subscribe on the exchange client only if the ref count is 0', () => {
    const pool = poolInit()

    sinon.stub(bfx.prototype, 'openWS')
    sinon.stub(bfx.prototype, 'subscribe')

    pool.subscriptions.bitfinex = { [chanKey]: 1 }

    return poolSubscribe({
      pool,
      channel,
      exID: 'bitfinex'
    }).then(() => {
      assert(pool.exchangeClients.bitfinex.subscribe.notCalled)

      bfx.prototype.openWS.restore()
      bfx.prototype.subscribe.restore()

      poolReset(pool)
    })
  })

  it('increments the subscription ref count', () => {
    const pool = poolInit()

    sinon.stub(bfx.prototype, 'openWS')
    sinon.stub(bfx.prototype, 'subscribe')

    pool.subscriptions.bitfinex = { [chanKey]: 1 }

    return poolSubscribe({
      pool,
      channel,
      exID: 'bitfinex'
    }).then(() => {
      assert.strictEqual(pool.subscriptions.bitfinex[chanKey], 2)

      bfx.prototype.openWS.restore()
      bfx.prototype.subscribe.restore()

      poolReset(pool)
    })
  })

  it('returns the exchange client channel ID', () => {
    const pool = poolInit()

    sinon.stub(bfx.prototype, 'openWS')
    sinon.stub(bfx.prototype, 'subscribe')
    sinon.stub(bfx.prototype, 'getChannelID').callsFake(() => 42)

    pool.subscriptions.bitfinex = { [chanKey]: 1 }

    return poolSubscribe({
      pool,
      channel,
      exID: 'bitfinex'
    }).then((chanID) => {
      assert.strictEqual(chanID, 42)

      bfx.prototype.openWS.restore()
      bfx.prototype.subscribe.restore()
      bfx.prototype.getChannelID.restore()

      poolReset(pool)
    })
  })
})
