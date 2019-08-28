'use strict'

const sentry = require('sentry')
const db = require('db/pg')
const hash = require('util/hash')
const validateParams = require('util/ws/validate_params')
const {
  notifySuccess, notifyError, notifyInternalError
} = require('util/ws/notify')

module.exports = async (server, ws, msg) => {
  if (!ws.user) {
    return notifyError(ws, 'Not authenticated')
  }

  const { d } = server
  const [, oldPassword, newPassword] = msg
  const validRequest = validateParams(ws, {
    oldPassword: { type: 'string', v: oldPassword },
    newPassword: { type: 'string', v: newPassword }
  })

  if (!validRequest) {
    return
  }

  const hashedOld = hash(oldPassword)
  const hashedNew = hash(newPassword)

  let user

  try {
    user = await db('users')
      .where({ id: ws.user.id, password: hashedOld })
      .first('*')
  } catch (e) {
    sentry.captureException(e)
    d('failed to query user with id/password: %s', e.message)
    return notifyInternalError(ws)
  }

  if (!user) {
    return notifyError(ws, 'Can\'t change password, old password incorrect')
  }

  try {
    await db('users')
      .where({ id: ws.user.id })
      .update({ password: hashedNew })
  } catch (e) {
    sentry.captureException(e)
    d('failed to update user password by id: %s', e.message)
    return notifyInternalError(ws)
  }

  let newUser

  try {
    newUser = await db('users')
      .where({ id: ws.user.id })
      .first('*')
  } catch (e) {
    sentry.captureException(e)
    d('failed to query user by id: %s', e.message)
    return notifyInternalError(ws)
  }

  ws.user = newUser

  notifySuccess(ws, 'Password updated')
}
