'use strict'

const send = require('util/ws/send')

// TODO: Implement for bfx
module.exports = async (ws, exID, exClient) => {
  const orders = await exClient.getOrders()
  send(ws, ['data.orders', exID, orders])
}
