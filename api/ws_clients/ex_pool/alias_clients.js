'use strict'

module.exports = (poolClient, exID, chanKey, chanID) => {
  const { d, clients } = poolClient

  if (!clients[exID]) clients[exID] = {}
  if (!clients[exID][chanKey]) return
  if (!clients[exID][`${chanID}`]) clients[exID][`${chanID}`] = {}

  const sockets = Object.keys(clients[exID][chanKey])
  let sID

  for (let i = 0; i < sockets.length; i += 1) {
    sID = sockets[i]
    clients[exID][`${chanID}`][sID] = clients[exID][chanKey][sID]

    d('aliased pool client %d for %s %s -> %s', sID, exID, chanKey, chanID)
  }
}
