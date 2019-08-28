'use strict'

const WSClient = require('ws_client')

const onData = require('./on_data')
const onError = require('./on_error')
const onSubscribed = require('./on_subscribed')
const onUnknownMessage = require('./on_unknown_message')

const POOL_RECONNECT_INTERVAL_MS = 5 * 1000

module.exports = class PoolClient extends WSClient {
  constructor ({ url }) {
    super({
      url,
      debugName: 'ex-pool',
      reconnectIntervalMS: POOL_RECONNECT_INTERVAL_MS,
      msgHandlers: {
        _: onUnknownMessage,

        data: onData,
        error: onError,
        subscribed: onSubscribed
      }
    })

    this.clients = {}
  }
}
