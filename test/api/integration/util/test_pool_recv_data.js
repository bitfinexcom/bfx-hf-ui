/* eslint-env mocha */
'use strict'

const assert = require('assert')

const poolInit = require('ex_pool')
const poolReset = require('ex_pool/reset')
const poolSubscribe = require('ex_pool/subscribe')
const poolAddDataListener = require('ex_pool/add_data_listener')

module.exports = (done, exID, channels, asserters) => {
  const pool = poolInit()

  const channelIDs = channels.map(() => null)
  const recvData = channels.map(() => false)

  poolAddDataListener(pool, (dataExID, dataChanID, data) => {
    if (!channels.find(id => id !== null)) {
      throw new Error('recv data before subscribe promise resolved')
    }

    assert.strictEqual(dataExID, exID)

    const i = channelIDs.findIndex((chanID) => chanID === dataChanID)

    if (i < 0) {
      done(new Error(`recv data for unknown channel: ${dataChanID}`))
      poolReset(pool)
      return
    }

    asserters[i](data)
    recvData[i] = true

    if (!recvData.find(recv => !recv)) {
      poolReset(pool)
      done()
    }
  })

  channels.forEach((channel, i) => {
    poolSubscribe({
      pool,
      exID,
      channel
    }).then((chanID) => {
      channelIDs[i] = chanID
    })
  })
}
