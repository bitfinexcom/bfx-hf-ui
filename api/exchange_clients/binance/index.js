'use strict'

const Binance = require('binance-api-node').default
const debug = require('debug')('dtc:api-ex-pool:exchanges:binance')
const PromiseThrottle = require('promise-throttle')
const Promise = require('bluebird')
const _isFunction = require('lodash/isFunction')

const chanDataToKey = require('util/chan_data_to_key')

const orderTransformer = require('./transformers/order')
const balanceTransformer = require('./transformers/balance')
const candleTransformer = require('./transformers/candle')

const subscribeHandlers = require('./subscribe')
const getMarkets = require('./get_markets')

class BinanceEchangeConnection {
  constructor (opts = {}) {
    this.d = debug
    this.client = Binance(opts)
    this.subs = {}
    this.unsubs = {} // [chanKey]: unsubFunc
    this.userUnsubs = []
    this.dataListeners = []
    this.candleChannelData = {}
    this.lastFinalCandleForChannel = {}
  }

  onData (cb) {
    this.dataListeners.push(cb)
  }

  async subscribe (channelData) {
    const [type] = channelData

    if (subscribeHandlers[type]) {
      return subscribeHandlers[type](this, channelData)
    }

    throw new Error(`recv sub for unknown channel type: ${type}`)
  }

  unsubscribe (channelData) {
    const key = chanDataToKey(channelData)

    if (!this.unsubs[key]) {
      throw new Error('tried to unsub from unknown channel')
    }

    debug('unsubscribing from channel %j', channelData)

    const chanID = this.subs[key]

    this.unsubs[key]()

    delete this.unsubs[key]
    delete this.subs[key]

    return chanID
  }

  isSubscribed (channelData) {
    const key = chanDataToKey(channelData)
    return !!this.unsubs[key]
  }

  getChannelID (channelData) {
    const key = chanDataToKey(channelData)
    return this.subs[key]
  }

  async getMarkets () {
    return getMarkets()
  }

  // Stub needed for compatbility
  close () {
    Object.values(this.unsubs).forEach(unsub => unsub())
    this.userUnsubs.forEach(unsub => _isFunction(unsub) && unsub())

    this.unsubs = {}
    this.userUnsubs = []
  }

  async userStream (cb) {
    this.userUnsubs.push(this.client.ws.user(cb))
  }

  async getBalances () {
    const info = await this.client.accountInfo()
    const { balances } = info
    return balances.map(balanceTransformer)
  }

  async getOrders () {
    const orders = await this.client.openOrders()
    return orders.map(orderTransformer)
  }

  async submitOrder (packet) {
    return this.client.order(packet)
  }

  async cancelOrder ({ symbol, orderId }) {
    return this.client.cancelOrder({ symbol, orderId })
  }

  static getCandleTimeFrames () {
    return [
      '1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d',
      '3d', '1w', '1M'
    ]
  }

  static transformCandle (candle, mts) {
    if (!mts) {
      throw new Error('mts required')
    }

    return candleTransformer(candle, mts)
  }

  static transformOrder (order) {
    return orderTransformer(order)
  }

  static getWSThrottler () {
    return new PromiseThrottle({
      requestsPerSecond: 600 / 60.0, // 1200 from binance docs, a bit lower
      promiseImplementation: Promise
    })
  }
}

BinanceEchangeConnection.id = 'binance'

module.exports = BinanceEchangeConnection
