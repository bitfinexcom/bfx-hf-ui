'use strict'

const sentry = require('sentry')
const influx = require('db/influx')
const _isEqual = require('lodash/isEqual')
const removePoolClient = require('ws_clients/ex_pool/remove_client')
const validateParams = require('util/ws/validate_params')
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

  const poolMessage = ['unsub', exID, channelData]
  const { pc, d } = server

  if (!(ws.subscriptions || {})[exID]) {
    sentry.captureException(new Error(
      `tried to unsub from channel ${JSON.stringify(channelData)} when not on exchange ${exID}`
    ))

    return d(
      'warning: client %s tried to unsub from channel %j when not on exchange %s',
      ws.id, channelData, exID
    )
  }

  const subIndex = ws.subscriptions[exID].findIndex(cd => (
    _isEqual(cd, channelData)
  ))

  if (subIndex < 0) {
    sentry.captureException(new Error(
      `tried to unsub from non-subscribed channel on ${exID}: ${JSON.stringify(channelData)}`
    ))

    return d(
      'error: client %s tried to unsub from non-subscribed channel on %s: %j',
      ws.id, exID, channelData
    )
  }

  ws.subscriptions[exID].splice(subIndex, 1)

  removePoolClient(pc, exID, channelData, ws)
  pc.send(poolMessage)

  influx.writePoints([{
    measurement: 'channel_subscriptions',

    tags: {
      exID: exID,
      channel: chanDataToKey(channelData),
      type: 'unsubscribe',
    },

    fields: {
      count: -1,
    },
  }])
}
