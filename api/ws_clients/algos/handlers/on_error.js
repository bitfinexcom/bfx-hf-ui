'use strict'

const sentry = require('sentry')
const { notifyError } = require('util/ws/notify')

module.exports = (client, msg) => {
  const { userWS } = client
  const [, error] = msg

  sentry.captureException(new Error(`algo server client recv error: ${error}`))

  if (!userWS) {
    return null
  }

  notifyError(userWS, error)
}
