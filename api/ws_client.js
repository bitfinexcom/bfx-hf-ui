'use strict'

const sentry = require('sentry')
const WS = require('ws')
const Debug = require('debug')
const _isArray = require('lodash/isArray')
const _isEmpty = require('lodash/isEmpty')

const send = require('util/ws/send')

module.exports = class WSClient {
  constructor ({
    url,
    debugName,
    msgHandlers,
    reconnectIntervalMS = 5 * 1000
  }) {
    this._url = url
    this._msgHandlers = msgHandlers

    this._ws = null
    this._preOpenMessageBuffer = []
    this.d = Debug(`dtc:api:ws-client:${debugName}`)

    this.openConnection()
    setInterval(this.watchdog.bind(this), reconnectIntervalMS)
  }

  send (msg) {
    if (!this._ws || this._ws.readyState !== 1) {
      this._preOpenMessageBuffer.push(msg)
      return
    }

    send(this._ws, msg)
  }

  watchdog () {
    if (this._ws && this._ws.readyState < 2) {
      return
    }

    this.openConnection()
  }

  close () {
    if (this._ws) {
      this._ws.close()
    }
  }

  openConnection () {
    if (this._ws) {
      this._ws.close()
    }

    this.d('connecting to %s', this._url)

    this._ws = new WS(this._url)
    this._ws.on('open', this.onWSOpen.bind(this))
    this._ws.on('close', this.onWSClose.bind(this))
    this._ws.on('message', this.onWSMessage.bind(this))
    this._ws.on('error', this.onWSError.bind(this))
  }

  onWSOpen () {
    this.d('connected')

    if (_isEmpty(this._preOpenMessageBuffer)) {
      return
    }

    this.d('flushing %d pre-open messages', this._preOpenMessageBuffer.length)

    this._preOpenMessageBuffer.forEach((msg) => {
      send(this._ws, msg)
    })

    this._preOpenMessageBuffer = []
  }

  onWSClose () {
    this.d('disconnected')
  }

  onWSError (err) {
    sentry.captureException(err)
    this.d('connection error: %s', err.message)
  }

  onWSMessage (msgJSON) {
    let msg

    try {
      msg = JSON.parse(msgJSON)
    } catch (e) {
      return this.d('recv malformed message: %s', msgJSON)
    }

    if (!_isArray(msg)) {
      return this.d('recv non-array message: %j', msg)
    }

    this.handleWSMessage(msg)
  }

  handleWSMessage (msg) {
    const [type] = msg
    const handler = this._msgHandlers[type]

    if (handler) {
      handler(this, msg)
    } else if (this._msgHandlers._) {
      this._msgHandlers._(this, msg)
    }
  }
}
