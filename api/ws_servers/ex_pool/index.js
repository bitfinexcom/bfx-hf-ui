'use strict'

const poolInit = require('ex_pool')
const poolAddDataListener = require('ex_pool/add_data_listener')
const poolUnsubscribe = require('ex_pool/unsubscribe')
const WSServer = require('ws_server')
const onPoolData = require('./on_pool_data')
const onSubscribe = require('./on_subscribe')
const onUnsubscribe = require('./on_unsubscribe')

module.exports = class ExchangePoolServer extends WSServer {
  constructor ({ port }) {
    super({
      port,
      debugName: 'ex-pool',
      msgHandlers: {
        'sub': onSubscribe,
        'unsub': onUnsubscribe
      }
    })

    this.pool = poolInit()
    this.clients = []

    poolAddDataListener(this.pool, onPoolData.bind(this, this))
  }

  onWSSConnection (ws) {
    super.onWSSConnection(ws)

    ws.subscriptions = {} // [exchange]: { [chanID]: channelData, ... }
    this.clients.push(ws)
  }

  async onWSClose (ws) {
    super.onWSClose(ws)

    const subExchanges = Object.keys(ws.subscriptions)
    let exID
    let subs

    for (let i = 0; i < subExchanges.length; i += 1) {
      exID = subExchanges[i]
      subs = Object.values(ws.subscriptions[exID])

      for (let j = 0; j < subs.length; j += 1) {
        try {
          await poolUnsubscribe({
            exID,
            pool: this.pool,
            channel: subs[j],
            force: true
          })
        } catch (e) {
          this.d('error unsubscribing from %s %d: %s', exID, subs[j], e.stack)
        }
      }
    }
  }
}
