'use strict'

module.exports = (pool, exID) => {
  const { exchangeClients } = pool
  return exchangeClients[exID]
}
