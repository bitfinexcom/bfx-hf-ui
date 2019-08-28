'use strict'

const _isFinite = require('lodash/isFinite')

module.exports = (pool, exID, chanKey) => {
  const { subscriptions } = pool

  if (!subscriptions[exID]) {
    subscriptions[exID] = {}
  }

  if (!_isFinite(subscriptions[exID][chanKey])) {
    subscriptions[exID][chanKey] = 0
  }

  subscriptions[exID][chanKey] += 1
}
