'use strict'

const sentry = require('@sentry/node')

// TODO: Move dsn into env var
sentry.init({
  dsn: 'https://dd125e915a714f2581bcc5369289d885@sentry.datsusara-crypto.com/2'
})

module.exports = sentry
