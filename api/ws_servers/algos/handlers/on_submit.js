'use strict'

const sentry = require('sentry')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')

const getHostKey = require('../util/get_host_key')
const validateAO = require('../util/validate_ao')

module.exports = async (server, ws, msg) => {
  const { d, hosts } = server
  const [, userID, exID, aoID, packet] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    userID: { type: 'number', v: userID },
    aoID: { type: 'string', v: aoID },
    packet: { type: 'object', v: packet }
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
      `ao host not open for user ${userID} on exchange ${exID}`
    ))

    return sendError(ws, `Host not open for user ${userID} on exchange ${exID}`)
  }

  const validationError = validateAO(host, aoID, packet)

  if (validationError) {
    return sendError(ws, validationError)
  }

  try {
    const gid = await host.startAO(aoID, packet)
    d('started AO for user %s on exchange %s [%s]', userID, exID, gid)
  } catch (e) {
    sentry.captureException(e)
    d('error starting AO %s for %s: %s', aoID, exID, e.stack)
    return sendError(ws, 'Failed to start algo order')
  }
}
