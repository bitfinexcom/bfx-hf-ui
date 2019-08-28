'use strict'

const influx = require('db/influx')
const validateParams = require('util/ws/validate_params')
const addPoolClient = require('ws_clients/ex_pool/add_client')
const chanDataToKey = require('util/chan_data_to_key')

module.exports = (server, ws, msg) => {
  const [, exID, channelData] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    channelData: { type: 'object', v: channelData }
  })

  if (!validRequest) {
    return
  }

  const poolMessage = ['sub', exID, channelData]
  const { pc } = server

  if (!ws.subscriptions) ws.subscriptions = {}
  if (!ws.subscriptions[exID]) ws.subscriptions[exID] = []

  ws.subscriptions[exID].push(channelData)

  addPoolClient(pc, exID, channelData, ws)
  pc.send(poolMessage)

  influx.writePoints([{
    measurement: 'channel_subscriptions',

    tags: {
      exID: exID,
      channel: chanDataToKey(channelData),
      type: 'subscribe',
    },

    fields: {
      count: 1,
    },
  }])
}
