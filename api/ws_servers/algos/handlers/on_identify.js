'use strict'

const sentry = require('sentry')
const send = require('util/ws/send')
const sendError = require('util/ws/send_error')
const validateParams = require('util/ws/validate_params')
const exClients = require('exchange_clients')

const getHostKey = require('../util/get_host_key')

const EX_IDS = exClients.map(exc => exc.id)

module.exports = (server, ws, msg) => {
  const { hosts } = server
  const [, userID] = msg
  const validRequest = validateParams(ws, {
    userID: { type: 'number', v: userID }
  })

  if (!validRequest) {
    return
  }

  if (ws.userID) {
    sentry.captureException(new Error(`Already identified as ${userID}`))
    return sendError(ws, `Already identified as ${userID}`)
  }

  ws.userID = userID

  send(ws, ['identified', userID])

  EX_IDS.forEach((exID) => {
    const key = getHostKey(userID, exID)
    const host = hosts[key]

    if (!host) {
      return
    }

    const instances = host.getAOInstances()
    const activeInstances = instances.filter((aoInstance) => {
      const { state = {} } = aoInstance
      const { active } = state
      return active
    })

    if (activeInstances.length === 0) {
      return
    }

    send(ws, ['data.aos', exID, activeInstances.map((aoInstance) => {
      const { state = {} } = aoInstance
      const { gid, name, args, label } = state
      return [gid, name, label, args]
    })])
  })
}
