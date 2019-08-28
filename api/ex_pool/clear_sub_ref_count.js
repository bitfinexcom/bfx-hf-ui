'use strict'

module.exports = (pool, exID, chanKey) => {
  const { subscriptions } = pool
  delete (subscriptions[exID] || {})[chanKey]
}
