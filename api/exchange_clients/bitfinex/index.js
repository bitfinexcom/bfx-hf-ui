'use strict'

const Promise = require('bluebird')
const PromiseThrottle = require('promise-throttle')
const { WS2Manager } = require('bitfinex-api-node')
const { RESTv2 } = require('bfx-api-node-rest')
const debug = require('debug')('dtc:api-ex-pool:exchanges:bitfinex')

const chanDataToKey = require('util/chan_data_to_key')

const orderTransformer = require('./transformers/order')
const balanceTransformer = require('./transformers/balance')
const candleTransformer = require('./transformers/candle')

const recvMessage = require('./recv/message')
const getMarkets = require('./get_markets')
const unsubscribe = require('./unsubscribe')
const subscribe = require('./subscribe')

class BitfinexEchangeConnection {
  constructor () {
    this.d = debug
    this.ws = null
    this.rest = new RESTv2()
    this.channelMap = {}
    this.subs = {} // { [cdKey]: chanId }
    this.pendingSubs = {} //
    this.dataListeners = []
    this.books = {}
    this.lastBookPacketSent = {}
  }

  openWS (args = {}) {
    this.ws = new WS2Manager({
      autoReconnect: true,
      reconnectDelay: 10 * 1000,
      ...args
    })

    this.ws.on('message', (msg) => recvMessage(this, msg))
    this.ws.on('error', this.onWSError.bind(this))
    this.ws.on('auth', this.onWSAuth.bind(this))
  }

  onWSAuth () {
    this.channelMap['0'] = { channel: 'auth' }
  }

  openSocket () {
    if (this.ws) {
      this.ws.openSocket()
    } else {
      debug('ws not initialized, cannot open socket')
    }
  }

  close () {
    if (this.ws) {
      this.ws.close()
    } else {
      debug('ws not initialized, cannot close sockets')
    }
  }

  on (event, handler) {
    if (this.ws) {
      this.ws.on(event, handler)
    } else {
      debug('ws not initialized, cannot assign event handler')
    }
  }

  onData (cb) {
    this.dataListeners.push(cb)
  }

  async submitOrder (packet) {
    const socket = this.ws.getAuthenticatedSocket()
    return socket.ws.submitOrder(packet)
  }

  async cancelOrder (id) {
    const socket = this.ws.getAuthenticatedSocket()
    return socket.ws.cancelOrder(id)
  }

  onWSError (err) {
    debug('error: %s', err.message)
  }

  async subscribe (channelData) {
    return subscribe(this, channelData)
  }

  unsubscribe (channelData) {
    return unsubscribe(this, channelData)
  }

  isSubscribed (channelData) {
    return !!this.getChannelID(channelData)
  }

  getChannelID (channelData) {
    const cdKey = chanDataToKey(channelData)
    return this.subs[cdKey]
  }

  getChannelData (chanID) {
    return this.channelMap[`${chanID}`]
  }

  getMarkets () {
    return getMarkets()
  }

  static getCandleTimeFrames () {
    return [
      '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '7D', '14D', '1M'
    ]
  }

  static transformCandle (candle) {
    return candleTransformer(candle)
  }

  static transformBalance (balance) {
    return balanceTransformer(balance)
  }

  static transformBalances (balances) {
    return balances.map(balanceTransformer)
  }

  static transformOrder (order) {
    return orderTransformer(order)
  }

  static transformOrders (orders) {
    return orders.map(orderTransformer)
  }

  static getWSThrottler () {
    return new PromiseThrottle({
      requestsPerSecond: 100 / 60.0,
      promiseImplementation: Promise
    })
  }
}

BitfinexEchangeConnection.id = 'bitfinex'

module.exports = BitfinexEchangeConnection
