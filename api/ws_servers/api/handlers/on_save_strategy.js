'use strict'

const sentry = require('sentry')
const db = require('db/pg')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const clientStrategyFields = require('util/client_strategy_fields')
const { notifyInternalError } = require('util/ws/notify')

module.exports = async (server, ws, msg) => {
  const { d } = server

  if (!ws.user) {
    return sendError(ws, 'User not authenticated')
  }

  const [, strategy] = msg
  const strategyModel = {}

  clientStrategyFields.forEach(field => {
    strategyModel[field] = strategy[field] || ''
  })

  let id

  if (strategy.id) {
    id = strategy.id

    try {
      await db('strategies')
        .where({ id, owner: ws.user.id })
        .update(strategyModel)
    } catch (e) {
      sentry.captureException(e)
      d('failed to update strategy by id/owner: %s', e.message)
      return notifyInternalError(ws)
    }
  } else {
    try {
      id = await db('strategies')
        .returning('id')
        .insert({
          id,
          owner: ws.user.id,
          ...strategyModel
        })
    } catch (e) {
      sentry.captureException(e)
      d('failed to create strategy: %s', e.message)
      return notifyInternalError(ws)
    }

    strategy.id = id
  }

  send(ws, ['data.strategy', id, strategy])
}
