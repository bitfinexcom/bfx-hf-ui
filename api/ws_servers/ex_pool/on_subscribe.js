'use strict'

const sentry = require('sentry')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const poolSubscribe = require('ex_pool/subscribe')

module.exports = async (server, ws, msg) => {
  const { pool, d } = server
  const [, exID, channel] = msg

  let chanID

  try {
    chanID = await poolSubscribe({ pool, exID, channel })
  } catch (err) {
    sentry.captureException(err)
    d('error subscribing to %s %j: %s', exID, channel, err.stack)
    return sendError(ws, 'Internal error subscribing')
  }

  if (!ws.subscriptions[exID]) {
    ws.subscriptions[exID] = {}
  }

  ws.subscriptions[exID][`${chanID}`] = channel
  send(ws, ['subscribed', exID, chanID, channel])
}
