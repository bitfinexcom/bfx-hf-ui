'use strict'

module.exports = (pool, exID, chanID, data) => {
  const { dataListeners = [] } = pool

  for (let i = 0; i < dataListeners.length; i += 1) {
    dataListeners[i](exID, chanID, data)
  }
}
