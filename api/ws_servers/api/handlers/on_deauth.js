'use strict'

const sendError = require('util/ws/send_error')
const { notifySuccess } = require('util/ws/notify')

module.exports = async (server, ws, msg) => {
  if (!ws.user) {
    return sendError(ws, 'Not authenticated')
  }

  Object.values((ws.clients || {})).forEach(client => client.close())

  ws.clients = {}
  delete ws.user

  notifySuccess(ws, 'Logged out')
}
