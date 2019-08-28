'use strict'

const sentry = require('sentry')
const db = require('db/pg')
const validateParams = require('util/ws/validate_params')
const { notifyError, notifyInternalError } = require('util/ws/notify')

const sendStrategies = require('../send_strategies')
const sendAuthenticated = require('../send_authenticated')

module.exports = async (server, ws, msg) => {
  if (ws.user) {
    return notifyError(ws, 'Already authenticated')
  }

  const { d } = server
  const [, authToken] = msg
  const validRequest = validateParams(ws, {
    authToken: { type: 'string', v: authToken }
  })

  if (!validRequest) {
    return
  }

  let user

  try {
    user = await db('users')
      .where({ authToken })
      .first('*')
  } catch (e) {
    sentry.captureException(e)
    d('failed to query user with auth token: %s', e.message)
    return notifyInternalError(ws)
  }

  if (!user) {
    return notifyError(ws, 'Invalid auth token')
  }

  ws.user = user
  ws.aoc = server.openAlgoServerClient()
  ws.aoc.identify(ws, user.id)

  sendAuthenticated(ws, true)
  sendStrategies(ws)
}
