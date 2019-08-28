'use strict'

module.exports = (exa, chanID, data) => {
  const { dataListeners } = exa

  for (let i = 0; i < dataListeners.length; i += 1) {
    dataListeners[i](chanID, data)
  }
}
