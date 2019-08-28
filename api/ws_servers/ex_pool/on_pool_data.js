'use strict'

const send = require('util/ws/send')

module.exports = (server, exID, chanID, data) => {
  const { clients } = server

  let client
  let subs

  for (let i = 0; i < clients.length; i += 1) {
    client = clients[i]
    subs = client.subscriptions[exID]

    if (!subs) {
      continue
    }

    if (Object.keys(subs).find(cid => +cid === chanID)) {
      send(client, ['data', exID, chanID, data])
    }
  }
}
