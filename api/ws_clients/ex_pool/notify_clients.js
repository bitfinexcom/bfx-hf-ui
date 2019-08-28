'use strict'

const send = require('util/ws/send')

module.exports = (poolClient, exID, chanKey, msg) => {
  const { clients } = poolClient

  if (!clients[exID]) {
    return
  } else if (!clients[exID][chanKey]) {
    return
  }

  const sockets = Object.values(clients[exID][chanKey])
  sockets.forEach(ws => send(ws, msg))
}
