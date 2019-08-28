'use strict'

module.exports = (pool, cb) => {
  const { dataListeners = [] } = pool
  dataListeners.push(cb)
}
