'use strict'

const _isFinite = require('lodash/isFinite')

module.exports = (pool, exID, chanKey) => {
  const { subscriptions } = pool
  const ref = (subscriptions[exID] || {})[chanKey]
  return _isFinite(ref) ? ref : 0
}
