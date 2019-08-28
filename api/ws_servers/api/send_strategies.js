'use strict'

const sentry = require('sentry')
const db = require('db/pg')
const send = require('util/ws/send')
const clientStrategyFields = require('util/client_strategy_fields')
const { notifyInternalError } = require('util/ws/notify')

module.exports = async (ws) => {
  if (!ws.user) return

  let strategies

  try {
    strategies = await db('strategies')
      .where({ owner: ws.user.id })
      .select('*')
  } catch (e) {
    sentry.captureException(e)
    return notifyInternalError(ws)
  }

  const clientStrategies = strategies.map((s) => {
    const strategy = { id: s.id }

    clientStrategyFields.forEach(f => { strategy[f] = s[f] })

    return strategy
  })

  send(ws, ['data.strategies', clientStrategies])
}
