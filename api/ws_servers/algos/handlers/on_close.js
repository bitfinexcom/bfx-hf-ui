'use strict'

const sentry = require('sentry')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')
const getHostKey = require('../util/get_host_key')

module.exports = (server, ws, msg) => {
  const { d, hosts } = server
  const [, userID, exID] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    userID: { type: 'number', v: userID }
  })

  if (!validRequest) {
    return
  }

  if (!ws.userID) {
    return sendError(ws, 'Not identified')
  } else if (ws.userID !== userID) {
    sentry.captureException(new Error(
      `tried to close host for user that differs from ws ident (${userID})`
    ))

    d('tried to close host for user that differs from ws ident (%s)', userID)
    return sendError(ws, 'Unauthorised')
  }

  const key = getHostKey(userID, exID)
  const host = hosts[key]

  if (!host) {
    return // host not running
  }

  if (host.aosRunning()) {
    return send(ws, ['persisting', userID, exID])
  }

  host.close()
  delete hosts[key]

  d('closed host for user %s on exchange %s', userID, exID)
  send(ws, ['closed', userID, exID])
}
