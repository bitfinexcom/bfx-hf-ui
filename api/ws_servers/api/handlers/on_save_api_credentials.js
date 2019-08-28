'use strict'

const _capitalize = require('lodash/capitalize')

const sentry = require('sentry')
const db = require('db/pg')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')
const { notifyInternalError, notifySuccess } = require('util/ws/notify')
const validExchange = require('util/valid_exchange')

module.exports = async (server, ws, msg) => {
  const { d } = server
  const [, exID, cryptedAPIKey, cryptedAPISecret, cryptedAPIControl] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID },
    cryptedAPIKey: { type: 'string', v: cryptedAPIKey },
    cryptedAPISecret: { type: 'string', v: cryptedAPISecret },
    cryptedAPIControl: { type: 'string', v: cryptedAPIControl }
  })

  if (!validRequest) {
    return
  } else if (!ws.user) {
    return sendError(ws, 'Unauthorized')
  } else if (!validExchange(exID)) {
    return sendError(ws, 'Unrecognised exchange, cannot save API credentials')
  }

  try {
    await db('users')
      .where({ id: ws.user.id })
      .update({
        [`${exID}APIKey`]: cryptedAPIKey,
        [`${exID}APISecret`]: cryptedAPISecret,
        [`${exID}APIControl`]: cryptedAPIControl
      })
  } catch (e) {
    sentry.captureException(e)
    d('failed to save API credentials for user: %s', e.message)
    return notifyInternalError(e)
  }

  ws.user[`${exID}APIKey`] = cryptedAPIKey
  ws.user[`${exID}APISecret`] = cryptedAPISecret
  ws.user[`${exID}APIControl`] = cryptedAPIControl

  notifySuccess(ws, `Encrypted API credentials saved for ${_capitalize(exID)}`)
  send(ws, ['data.api_credentials', exID, cryptedAPIKey, cryptedAPISecret])
}
