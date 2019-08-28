'use strict'

const PI = require('p-iteration')

const { getMarkets: getMarketsRedis } = require('db/redis')
const EXCHANGE_ADAPTERS = require('exchange_clients')
const send = require('util/ws/send')
const PoolClient = require('ws_clients/ex_pool')
const HFDSClient = require('ws_clients/hf_ds')
const AlgoServerClient = require('ws_clients/algos')
const WSServer = require('ws_server')
const removePoolClient = require('ws_clients/ex_pool/remove_client')

const onAuth = require('./handlers/on_auth')
const onAuthWithToken = require('./handlers/on_auth_with_token')
const onDeauth = require('./handlers/on_deauth')
const onRegister = require('./handlers/on_register')
const onChangePassword = require('./handlers/on_change_password')
const onSubscribe = require('./handlers/on_subscribe')
const onUnsubscribe = require('./handlers/on_unsubscribe')
const onCandleRequest = require('./handlers/on_candle_request')
const onSaveStrategy = require('./handlers/on_save_strategy')
const onSaveAPICredentials = require('./handlers/on_save_api_credentials')
const onClearAPICredentials = require('./handlers/on_clear_api_credentials')
const onSpawnAPIClient = require('./handlers/on_spawn_api_client')
const onOrderSubmit = require('./handlers/on_order_submit')
const onOrderCancel = require('./handlers/on_order_cancel')
const onAlgoOrderSubmit = require('./handlers/on_algo_order_submit')
const onAlgoOrderCancel = require('./handlers/on_algo_order_cancel')
const onChangePlan = require('./handlers/on_change_plan')

const VERSION = 1

module.exports = class APIWSServer extends WSServer {
  constructor ({
    port,
    server,
    hfDSBitfinexURL,
    hfDSBinanceURL,
    exPoolURL,
    algoServerURL
  }) {
    super({
      port,
      server,
      debugName: 'api',
      msgHandlers: {
        auth: onAuth,
        'auth.token': onAuthWithToken,
        deauth: onDeauth,
        register: onRegister,
        change_password: onChangePassword,

        subscribe: onSubscribe,
        unsubscribe: onUnsubscribe,

        'get.candles': onCandleRequest,

        'strategy.save': onSaveStrategy,
        'api_credentials.save': onSaveAPICredentials,
        'api_credentials.clear': onClearAPICredentials,
        'api_client.spawn': onSpawnAPIClient,
        'order.submit': onOrderSubmit,
        'order.cancel': onOrderCancel,
        'algo_order.submit': onAlgoOrderSubmit,
        'algo_order.cancel': onAlgoOrderCancel,

        'change_plan': onChangePlan
      }
    })

    this.algoServerURL = algoServerURL
    this.pc = new PoolClient({ url: exPoolURL })
    this.hfDSClients = {
      bitfinex: new HFDSClient({ id: 'bitfinex', url: hfDSBitfinexURL }),
      binance: new HFDSClient({ id: 'binance', url: hfDSBinanceURL }),
    }
  }

  openAlgoServerClient () {
    return new AlgoServerClient({ url: this.algoServerURL })
  }

  async sendInitialConnectionData (ws) {
    send(ws, ['info.version', VERSION])
    send(ws, ['info.exchanges', EXCHANGE_ADAPTERS.map(({ id }) => id)])

    return PI.forEach(EXCHANGE_ADAPTERS, async ({ id }) => {
      return getMarketsRedis(id).then((markets) => {
        send(ws, ['info.markets', id, markets])
      })
    }).catch((err) => {
      this.d('error sending markets to client: %s', err.stack)
    })
  }

  async onWSSConnection (ws) {
    super.onWSSConnection(ws)

    ws.clients = {}
    ws.user = null

    await this.sendInitialConnectionData(ws)
  }

  onWSClose (ws) {
    super.onWSClose(ws)

    Object.keys(ws.clients).forEach(exID => {
      if (ws.aoc) {
        ws.aoc.closeHost(exID)
      }

      ws.clients[exID].close()
    })

    if (ws.aoc) {
      ws.aoc.close()
    }

    removePoolClient(this.pc, ws)

    const subExchanges = Object.keys(ws.subscriptions || {})

    subExchanges.forEach((exID) => {
      ws.subscriptions[exID].forEach((channelData) => {
        this.pc.send(['unsub', exID, channelData])
      })
    })

    ws.client = {}
  }
}
