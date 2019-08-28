'use strict'

const sentry = require('sentry')

module.exports = (poolClient, msg) => {
  const { d } = poolClient
  const [, message] = msg

  sentry.captureException(new Error(`recv ex pool error: ${message}`))
  d('recv error: %s', message)
}
