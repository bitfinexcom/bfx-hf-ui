'use strict'

module.exports = (poolClient, ws) => {
  const { d, clients } = poolClient
  const exchanges = Object.keys(clients)
  let chanKey
  let exID

  for (let i = 0; i < exchanges.length; i += 1) {
    exID = exchanges[i]
    const chanKeys = Object.keys(clients[exID])

    for (let j = 0; j < chanKeys.length; j += 1) {
      chanKey = chanKeys[j]

      if (clients[exID][chanKey][ws.id]) {
        delete clients[exID][chanKey][ws.id]
        d('removed pool client %s from %s %s', ws.id, exID, chanKey)
      }
    }
  }
}
