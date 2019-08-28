'use strict'

const _isFinite = require('lodash/isFinite')
const capture = require('capture')

module.exports = (pool, exID, chanKey) => {
  const { subscriptions } = pool

  if (!subscriptions[exID]) return
  if (!_isFinite(subscriptions[exID][chanKey])) return

  subscriptions[exID][chanKey] -= 1

  if (subscriptions[exID][chanKey] < 0) {
    capture.exception('error: sub ref count below 0 for %s %s', exID, chanKey)
  }
}
