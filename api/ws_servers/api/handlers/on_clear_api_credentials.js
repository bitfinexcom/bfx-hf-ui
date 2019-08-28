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
  const [, exID] = msg
  const validRequest = validateParams(ws, {
    exID: { type: 'string', v: exID }
  })

  if (!validRequest) {
    return
  } else if (!ws.user) {
    return sendError(ws, 'Unauthorized')
  } else if (!validExchange(exID)) {
    return sendError(ws, 'Unrecognised exchange, cannot clear API credentials')
  }

  try {
    await db('users')
      .where({ id: ws.user.id })
      .update({
        [`${exID}APIKey`]: null,
        [`${exID}APISecret`]: null,
        [`${exID}APIControl`]: null
      })
  } catch (e) {
    sentry.captureException(e)
    d('failed to clear API credentials for user: %s', e.message)
    return notifyInternalError(e)
  }

  delete ws.user[`${exID}APIKey`]
  delete ws.user[`${exID}APISecret`]
  delete ws.user[`${exID}APIControl`]

  notifySuccess(ws, `Cleared API credentials for ${_capitalize(exID)}`)
  send(ws, ['data.api_credentials', exID, '', ''])
}
