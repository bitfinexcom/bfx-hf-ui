'use strict'

const sentry = require('sentry')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const poolUnsubscribe = require('ex_pool/unsubscribe')

module.exports = async (server, ws, msg) => {
  const { d, pool } = server
  const [, exID, channel] = msg

  let chanID

  try {
    chanID = await poolUnsubscribe({ pool, exID, channel })
  } catch (err) {
    sentry.captureException(err)
    d('error unsubscribing from %s %j: %s', exID, channel, err.stack)
    return sendError(ws, 'internal error subscribing')
  }

  delete ws.subscriptions[exID][`${chanID}`]
  send(ws, ['unsubscribed', exID, chanID, channel])
}
