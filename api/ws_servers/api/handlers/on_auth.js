'use strict'

const sentry = require('sentry')
const db = require('db/pg')
const hash = require('util/hash')
const genAuthToken = require('util/gen_auth_token')
const validateParams = require('util/ws/validate_params')
const { notifyError, notifyInternalError } = require('util/ws/notify')

const sendStrategies = require('../send_strategies')
const sendAuthenticated = require('../send_authenticated')

module.exports = async (server, ws, msg) => {
  if (ws.user) {
    return notifyError(ws, 'Already authenticated')
  }

  const { d } = server
  const [, username, password, passAuthToken] = msg
  const validRequest = validateParams(ws, {
    passAuthToken: { type: 'bool', v: passAuthToken },
    username: { type: 'string', v: username },
    password: { type: 'string', v: password }
  })

  if (!validRequest) {
    return
  }

  const hashedPassword = hash(password)
  let user

  try {
    user = await db('users')
      .where({ username, password: hashedPassword })
      .first('*')
  } catch (e) {
    sentry.captureException(e)
    d('failed to query user with username/password: %s', e.message)
    return notifyInternalError(ws)
  }

  if (!user) {
    return notifyError(ws, 'Invalid username or password')
  }

  if (passAuthToken) {
    const authToken = genAuthToken(user)

    try {
      await db('users')
        .where({ id: user.id })
        .update({ authToken })
    } catch (e) {
      sentry.captureException(e)
      d('failed to upate user auth token by ID: %s', e.message)
      return notifyInternalError(ws)
    }

    user.authToken = authToken
  }

  ws.user = user
  ws.aoc = server.openAlgoServerClient()
  ws.aoc.identify(ws, user.id)

  sendAuthenticated(ws, passAuthToken)
  sendStrategies(ws)
}
