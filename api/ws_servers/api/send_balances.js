'use strict'

const send = require('util/ws/send')

// TODO: Implement for bfx
module.exports = async (ws, exID, exClient) => {
  const balances = await exClient.getBalances()
  send(ws, ['data.balances', exID, balances])
}
