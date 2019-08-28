'use strict'

const _isObject = require('lodash/isObject')
const chanDataToKey = require('util/chan_data_to_key')

module.exports = (poolClient, exID, chanDataOrID, ws) => {
  const { d, clients } = poolClient
  const key = _isObject(chanDataOrID)
    ? chanDataToKey(chanDataOrID)
    : `${chanDataOrID}`

  if (!clients[exID]) clients[exID] = {}
  if (!clients[exID][key]) clients[exID][key] = {}
  if (clients[exID][key][ws.id]) return

  d('added pool client %s to %s %s', ws.id, exID, key)
  clients[exID][key][ws.id] = ws
}
