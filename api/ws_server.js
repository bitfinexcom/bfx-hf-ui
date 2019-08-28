'use strict'

const WS = require('ws')
const sentry = require('sentry')
const Debug = require('debug')
const _isArray = require('lodash/isArray')

const influx = require('db/influx')
const nonce = require('util/nonce')
const sendError = require('util/ws/send_error')

const INFLUX_COUNT_INTERVAL_MS = 10 * 1000

module.exports = class WSServer {
  constructor ({ server, port, debugName, msgHandlers }) {
    this.d = Debug(`dtc:api:ws-server:${debugName}`)
    this._msgHandlers = msgHandlers

    this._influxCountInterval = null
    this._wss = null
    this._server = server
    this._port = port
    this._name = debugName
  }

  open () {
    if (this._wss) {
      throw new Error('already open')
    }

    if (this._port) {
      this.d('starting on port %d', this._port)
    } else {
      this.d('starting up')
    }

    this._wss = new WS.Server({
      server: this._server,
      port: this._port
    })

    this._wss.on('connection', this.onWSSConnection.bind(this))

    this._influxCountInterval = setInterval(() => {
      influx.writePoints([{
        measurement: 'api_clients',
        fields: {
          count: this._wss.clients.size
        },

        tags: {
          server: this._name,
        }
      }])
    }, INFLUX_COUNT_INTERVAL_MS)
  }

  close () {
    if (!this._wss) {
      throw new Error('already closed')
    }

    clearInterval(this._influxCountInterval)
    this._influxCountInterval = null
    this._wss.close()
    this._wss = null
  }

  onWSSConnection (ws) {
    ws.id = nonce()
    ws.on('message', this.onWSMessage.bind(this, ws))
    ws.on('close', this.onWSClose.bind(this, ws))

    this.d('client %s connected', ws.id)
  }

  onWSClose (ws) {
    this.d('client %s disconnected', ws.id)
  }

  onWSMessage (ws, msgJSON) {
    let msg

    try {
      msg = JSON.parse(msgJSON)
    } catch (e) {
      sentry.captureException(new Error('invalid message JSON'))
      return sendError(ws, 'invalid message JSON')
    }

    if (!_isArray(msg)) {
      sentry.captureException(new Error('message not array'))
      return sendError(ws, 'message not array')
    }

    this.handleWSMessage(ws, msg)
  }

  handleWSMessage (ws, msg) {
    const [type] = msg
    const handler = this._msgHandlers[type]

    if (handler) {
      handler(this, ws, msg)
    }
  }
}
