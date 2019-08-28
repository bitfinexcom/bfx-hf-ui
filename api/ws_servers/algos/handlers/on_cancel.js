'use strict'

const sentry = require('sentry')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')

const getHostKey = require('../util/get_host_key')

module.exports = async (server, ws, msg) => {
  const { d, hosts } = server
  const [, userID, exID, gid] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    userID: { type: 'number', v: userID },
    gid: { type: 'string', v: gid }
  })

  if (!validRequest) {
    return
  } else if (!ws.userID) {
    return sendError(ws, 'Not identified')
  } else if (ws.userID !== userID) {
    sentry.captureException(new Error(
      `tried to submit AO for user that differs from ws ident (${userID})`
    ))

    d('tried to submit AO for user that differs from ws ident (%s)', userID)
    return sendError(ws, 'Unauthorised')
  }

  const key = getHostKey(userID, exID)
  const host = hosts[key]

  if (!host) {
    sentry.captureException(new Error(
      `Host not open for user ${userID} on exchange ${exID}`
    ))

    return sendError(ws, `Host not open for user ${userID} on exchange ${exID}`)
  }

  if (!host.getAOInstance(gid)) {
    sentry.captureException(new Error(
      'Requested algo order not running, cannot stop'
    ))

    return sendError(ws, 'Requested algo order not running, cannot stop')
  }

  await host.stopAO(gid)

  d('stopped AO for user %s on exchange %s [%s]', userID, exID, gid)
}
