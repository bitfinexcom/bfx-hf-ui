'use strict'

module.exports = (pool) => {
  Object.values(pool.exchangeClients).forEach((client) => {
    client.close()
  })

  pool.exchangeClients = {}
  pool.subscriptions = {}
  pool.dataListeners = []
}
