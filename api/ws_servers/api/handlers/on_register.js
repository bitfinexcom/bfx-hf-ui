'use strict'

const sentry = require('sentry')
const db = require('db/pg')
const hash = require('util/hash')
const sendError = require('util/ws/send_error')
const { notifyInternalError } = require('util/ws/notify')
const validateParams = require('util/ws/validate_params')

const sendAuthenticated = require('../send_authenticated')

module.exports = async (server, ws, msg) => {
  if (ws.user) {
    return sendError(ws, 'Already authenticated')
  }

  const { d } = server
  const [, username, password, email] = msg
  const validRequest = validateParams(ws, {
    username: { type: 'string', v: username },
    password: { type: 'string', v: password },
    email: { type: 'string', v: email }
  })

  if (!validRequest) {
    return
  }

  let existingUserByUsername

  try {
    existingUserByUsername = await db('users')
      .where({ username })
      .first('*')
  } catch (e) {
    sentry.captureException(e)
    d('failed to query user by username: %s', e.message)
    return notifyInternalError(e)
  }

  if (existingUserByUsername) {
    return sendError(ws, 'Username or email taken')
  }

  let existingUserByEmail

  try {
    existingUserByEmail = await db('users')
      .where({ email })
      .first('*')
  } catch (e) {
    sentry.captureException(e)
    d('failed to query user by email: %s', e.message)
    return notifyInternalError(e)
  }

  if (existingUserByEmail) {
    return sendError(ws, 'Username or email taken')
  }

  let user

  try {
    const res = await db('users')
      .returning('*')
      .insert({
        password: hash(password),
        username,
        email
      })
    user = res[0]
  } catch (e) {
    sentry.captureException(e)
    d('failed to insert user: %s', e.message)
    return notifyInternalError(e)
  }

  ws.user = user
  ws.aoc = server.openAlgoServerClient()
  ws.aoc.identify(ws, user.id)

  sendAuthenticated(ws, false)
}
