'use strict'

const WSServer = require('ws_server')

const send = require('util/ws/send')
const onIdentify = require('./handlers/on_identify')
const onSubmit = require('./handlers/on_submit')
const onCancel = require('./handlers/on_cancel')
const onOpen = require('./handlers/on_open')
const onClose = require('./handlers/on_close')
const onStatus = require('./handlers/on_status')
const parseHostKey = require('./util/parse_host_key')

module.exports = class AlgoServer extends WSServer {
  constructor ({
    port,
    hfPSQLConnectionURL
  }) {
    super({
      port,
      debugName: 'algos',
      msgHandlers: {
        identify: onIdentify,
        submit: onSubmit,
        cancel: onCancel,
        open: onOpen,
        close: onClose,
        status: onStatus
      }
    })

    this.hfPSQLConnectionURL = hfPSQLConnectionURL
    this.clients = {}
    this.hosts = {}
  }

  broadcast (userID, data) {
    console.log(Object.values(this.clients).map(ws => ws.userID))
    Object.values(this.clients).forEach((ws) => {
      if (ws.userID === userID) {
        send(ws, data)
      }
    })
  }

  onWSSConnection (ws) {
    super.onWSSConnection(ws)
    this.clients[ws.id] = ws
  }

  onWSClose (ws) {
    super.onWSClose(ws)
    delete this.clients[ws.id]
  }

  getHostsForUser (userID) {
    const hostKeys = Object.keys(this.hosts)

    return hostKeys
      .map(parseHostKey)
      .filter((key) => key.userID === userID)
      .map(({ exID }) => exID)
  }
}
