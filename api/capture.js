'use strict'

const debug = require('debug')('dtc:api:capture-exception')
const { sprintf } = require('sprintf-js')

const sentry = require('sentry')
const influx = require('db/influx')
const { SENTRY_ENABLED } = process.env

const exception = (err, ...args) => {
  const str = args.length > 0
    ? sprintf(err, ...args)
    : err instanceof Error
      ? err.message
      : err

  debug(err instanceof Error ? err.stack : str)

  if (+SENTRY_ENABLED === 1) {
    sentry.withScope((scope) => {
      Object.keys(err.tags || {}).forEach((tagName) => {
        scope.setTag(tagName, err.tags[tagName])
      })

      sentry.captureException(err instanceof Error ? err : new Error(err))
    })
  }

  influx.writePoints([{
    measurement: 'errors',
    tags: {},
    fields: {
      count: 1,
    },
  }])
}

module.exports = { exception }
