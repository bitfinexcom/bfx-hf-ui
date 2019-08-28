'use strict'

const send = require('util/ws/send')

module.exports = (client, msg) => {
  const { userWS } = client
  const [, exID, data] = msg

  send(userWS, ['data.aos', exID, data])
}
